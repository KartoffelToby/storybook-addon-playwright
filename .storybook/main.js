const path = require('path');
module.exports = {
  stories: ['../stories/*.stories.[tj]sx'],
  addons: [
    '@storybook/addon-controls',
    'storybook-dark-mode/register',
    path.resolve(__dirname, '../preset.js'),
  ],
  features: {
    storyStoreV7: true,
  },
};
