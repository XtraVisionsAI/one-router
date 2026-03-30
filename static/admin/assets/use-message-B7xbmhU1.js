import { w as a, a as n, i, bJ as t, aE as o } from "./index-YqbknKjl.js";
function m(e, s) {
  return a(e, (u) => {
    u !== void 0 && (s.value = u);
  }), n(() => e.value === void 0 ? s.value : e.value);
}
function p() {
  const e = i(t, null);
  return e === null && o("use-message", "No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."), e;
}
export {
  m as a,
  p as u
};
