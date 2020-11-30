const path = require("path");

// Generate HTML file and include compiled JS file in script tag
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	// React entry file
	entry: "./src/index.jsx",

	// Compiled react app in single JS file
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "index_bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},

			// Allow import css files in react components
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000,
		hot: true,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
	resolve: {
		extensions: [".js", ".jsx"],
	},
};
