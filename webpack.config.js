const path = require('path');

module.exports = {
  entry: './browserUI/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  }
}
