/*
* @Author: Elory
* @Date:   2017-09-20 13:43:15
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-20 17:42:54
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getHtmlConfig = function(name){
	return new HtmlWebpackPlugin({
				template: './src/view/'+name+'.html',
				filename: 'view/'+name+'.html',
				inject: true,
				hash: true,
				chunks: ['common',name]
			})
}
//环境变量的配置 dev online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var config = {
	entry: {
		'common': ['./src/page/common/index.js',],
		'index': ['./src/page/index/index.js'],
		'login':['./src/page/login/index.js']
	},
	output: {
		path: './dist',
		publicPath: '/dist/',
		filename: 'js/[name].app.js'
	},
	externals: {
		'jquery': 'window.jQuery',
	},
	module:{
		loaders: [
			{
				test: /\.(scss|css)$/,
				loader: ExtractTextPlugin.extract("style","css!sass")
			},
			{
				test: /\.(gif|png|jpg|JPG|svg|bmp|woff|ttf|eot)\??.*$/,
				loader: 'url-loader?limit=100&name=resource/[name].[ext]'
			}
		]
	},
	plugins:[
		//独立通用模块到指定文件夹下
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		//把CSS单独打包到文件
		new ExtractTextPlugin("css/[name].css"),
		getHtmlConfig('login'),
		getHtmlConfig('index')
		
	]
}

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:9000');
}

module.exports = config;