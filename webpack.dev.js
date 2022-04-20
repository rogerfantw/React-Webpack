//* npm i react react-dom
//* npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react
//* npm i -D webpack webpack-cli sass style-loader css-loader sass-loader mini-css-extract-plugin html-webpack-plugin
//* npm i -D webpack-dev-server

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const htmlSource = ["bundle", "home"] // ! HTML 設定
const html = htmlSource.map(n => (
	new HtmlWebpackPlugin({
		filename: `${n}/index.html`,
		template: `./src/views/${n}.html`,
		chunks: [`${n}`]
	})
))

module.exports = {
	mode: "development", // "development" | "production"
	entry: {  // ! JS 設定
		bundle: path.resolve(__dirname, "src/index.js"),
		home: path.resolve(__dirname, "src/home.js"),
	},
	output: {
		filename: "[name]/[name].[fullhash:8].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		hot: true,
		port: 8080,
	},
	devtool: "source-map",
	plugins: [
		...html,
		new MiniCssExtractPlugin({ // ! scss 的關聯在 JS中 設定
			filename: "[name]/[name].[fullhash:8].css",
		}),
	],
	module: {
		rules: [  // ! 各 loader 設定
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "img/[name].[contenthash:8][ext]"
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "font/[name][ext]"
				}
			},
		],
	},
};
