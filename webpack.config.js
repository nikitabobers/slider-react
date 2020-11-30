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
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin()],
	resolve: {
		extensions: [".js", ".jsx"],
	},
};
