const path = require('path');

module.exports = {
  entry: './main.js', // Change this path to your main JavaScript file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), // Change this path to where you want the bundled file to be generated
  },
  devServer: {
    contentBase: './public', // Change this path to your public directory
    port: 3000, // Change this port as needed
  },
};
