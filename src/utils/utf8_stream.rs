//! Incremental UTF-8 decoding for streamed (SSE) byte bodies.
//!
//! An HTTP body arrives in arbitrary byte chunks: a multibyte character (CJK,
//! emoji) can straddle a chunk boundary. Decoding each chunk on its own either
//! drops the whole chunk (`str::from_utf8(..).ok()`) or turns both halves into
//! U+FFFD (`String::from_utf8_lossy`), corrupting text and — when the lost
//! bytes include a frame separator — whole SSE frames.
//!
//! [`Utf8StreamDecoder`] carries an incomplete trailing sequence over to the
//! next chunk and only emits complete characters. Truly invalid bytes are
//! replaced with U+FFFD (like `from_utf8_lossy`) without stalling the stream.

/// Stateful chunk-by-chunk UTF-8 decoder. Holds at most 3 pending bytes (the
/// incomplete prefix of one character) between calls.
#[derive(Debug, Default)]
pub struct Utf8StreamDecoder {
    pending: Vec<u8>,
}

impl Utf8StreamDecoder {
    pub fn new() -> Self {
        Self::default()
    }

    /// Decode `chunk` (prefixed by any carried-over bytes) and append the
    /// complete text to `out`. An incomplete sequence at the end is kept for
    /// the next call.
    pub fn push(&mut self, chunk: &[u8], out: &mut String) {
        let owned;
        let mut bytes: &[u8] = if self.pending.is_empty() {
            chunk
        } else {
            let mut joined = std::mem::take(&mut self.pending);
            joined.extend_from_slice(chunk);
            owned = joined;
            &owned
        };
        loop {
            match std::str::from_utf8(bytes) {
                Ok(s) => {
                    out.push_str(s);
                    return;
                }
                Err(e) => {
                    let valid = e.valid_up_to();
                    // The first `valid` bytes are valid UTF-8 by definition.
                    out.push_str(std::str::from_utf8(&bytes[..valid]).unwrap_or_default());
                    match e.error_len() {
                        // Invalid sequence in the middle: replace and go on.
                        Some(len) => {
                            out.push(char::REPLACEMENT_CHARACTER);
                            bytes = &bytes[valid + len..];
                        }
                        // Incomplete sequence at the end: carry it over.
                        None => {
                            self.pending.extend_from_slice(&bytes[valid..]);
                            return;
                        }
                    }
                }
            }
        }
    }

    /// Convenience form of [`Self::push`] returning the decoded text.
    pub fn decode(&mut self, chunk: &[u8]) -> String {
        let mut out = String::new();
        self.push(chunk, &mut out);
        out
    }

    /// End of stream: flush a dangling incomplete sequence as U+FFFD.
    pub fn finish(&mut self, out: &mut String) {
        if !self.pending.is_empty() {
            self.pending.clear();
            out.push(char::REPLACEMENT_CHARACTER);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn decode_split(input: &[u8], at: &[usize]) -> String {
        let mut d = Utf8StreamDecoder::new();
        let mut out = String::new();
        let mut prev = 0;
        for &i in at {
            d.push(&input[prev..i], &mut out);
            prev = i;
        }
        d.push(&input[prev..], &mut out);
        d.finish(&mut out);
        out
    }

    #[test]
    fn split_at_every_byte_offset() {
        let text = "data: {\"t\":\"你好🙂é世界\"}\n\n";
        let bytes = text.as_bytes();
        for i in 0..=bytes.len() {
            assert_eq!(decode_split(bytes, &[i]), text, "split at {i}");
        }
    }

    #[test]
    fn byte_by_byte() {
        let text = "a🙂b中c";
        let bytes = text.as_bytes();
        let cuts: Vec<usize> = (1..bytes.len()).collect();
        assert_eq!(decode_split(bytes, &cuts), text);
    }

    #[test]
    fn every_pair_of_offsets() {
        let text = "🙂中🙂";
        let bytes = text.as_bytes();
        for i in 0..=bytes.len() {
            for j in i..=bytes.len() {
                assert_eq!(decode_split(bytes, &[i, j]), text, "split at {i},{j}");
            }
        }
    }

    #[test]
    fn invalid_bytes_are_replaced_without_stalling() {
        let mut d = Utf8StreamDecoder::new();
        assert_eq!(d.decode(b"a\xffb"), "a\u{FFFD}b");
        // A lone continuation byte followed by more text.
        assert_eq!(d.decode(b"\x80c"), "\u{FFFD}c");
        // An invalid lead byte must not be carried over forever.
        assert_eq!(d.decode(b"\xc3("), "\u{FFFD}(");
        assert_eq!(d.decode(b"ok"), "ok");
    }

    #[test]
    fn dangling_tail_flushed_on_finish() {
        let mut d = Utf8StreamDecoder::new();
        let emoji = "🙂".as_bytes();
        assert_eq!(d.decode(&emoji[..2]), "");
        let mut out = String::new();
        d.finish(&mut out);
        assert_eq!(out, "\u{FFFD}");
        assert_eq!(d.decode(b"x"), "x");
    }
}
