import defineConfig from '@xv-shared/eslint-config'

export default defineConfig(
  {
    vue: true,
    typescript: true,
    unocss: false,
    markdown: false,
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.d.ts', 'stats.html']
  },
  {
    rules: {
      // Vue 3 supports v-model:argument syntax — disable Vue 2 rule.
      'vue/no-v-model-argument': 'off',
      // Empty template root is valid for redirect-only pages.
      'vue/valid-template-root': 'off'
    }
  },
  {
    files: ['vite.config.ts'],
    rules: {
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': 'off',
      'ts/no-unused-vars': 'off',
      'sort-imports': 'off'
    }
  }
)
