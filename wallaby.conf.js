module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.js',
      '!src/**/__tests__/*.spec.js',
      '!src/**/*.spec.js',
      '!src/index.js'
    ],

    tests: ['src/**/__tests__/*.spec.js'],
    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',
    // for node.js tests you need to set env property as well
    // https://wallabyjs.com/docs/integration/node.html
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  }
}
