const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json'],
    },
  },
});