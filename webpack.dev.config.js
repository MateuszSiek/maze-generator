const path = require('path');

module.exports = {
	entry  : './src/index.js',
	output : {
		filename: 'maze-generator.js',
		path    : path.resolve(__dirname, 'dist')
	}
};