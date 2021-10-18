export default {
  babel: {
    compileEnhancements: false,
    compileAsTests: [
      'test/helpers/**/*.ts'
    ]
  },
  extensions: [
    'ts'
  ],
  files: [
    'test/**/*.test.ts'
  ],
  require: [
    'esm',
    'ts-node/register',
    'tsconfig-paths/register'
  ]
}
