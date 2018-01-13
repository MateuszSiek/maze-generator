const path = require('path');
const uglifyJs = require('uglifyjs-webpack-plugin');

module.exports = {
	entry  : './src/index.js',
	output : {
		filename: 'maze-generator.min.js',
		path    : path.resolve(__dirname, 'dist')
	},
	plugins: [
		new uglifyJs()
	]
};