var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: {
		"chartIQ": "./src/app.jsx"
	},
	output: {
		publicPath:'/dist/',
		path: path.resolve(__dirname, './dist'),
		filename: "[name].js"
	},
	module: {
		loaders: [{
			exclude: [/node_modules/, "/chartiq/"],
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-1']
			}
		}]
	},
	devServer: {
		port: 3000,
		compress: true,
		inline: true,
		stats: 'minimal'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
