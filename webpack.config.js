/*
* @Author: Elory
* @Date:   2017-09-20 13:43:15
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-23 16:38:19
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getHtmlConfig = function(name,title){
	return new HtmlWebpackPlugin({
				template: './src/view/'+name+'.html',
				filename: 'view/'+name+'.html',
				title: title,
				inject: true,
				hash: true,
				chunks: ['common',name]
			})
}
//环境变量的配置 dev online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var config = {
	devtool:'cheap-source-map',
	entry: {
		'common': ['./src/page/common/index.js',],
		'index': ['./src/page/index/index.js'],
		'list': ['./src/page/list/index.js'],
		'detail': ['./src/page/detail/index.js'],
		'cart': ['./src/page/cart/index.js'],
		'order-confirm': ['./src/page/order-confirm/index.js'],
		'order-list': ['./src/page/order-list/index.js'],
		'order-detail': ['./src/page/order-detail/index.js'],
		'user-login':['./src/page/user-login/index.js'],
		'user-center':['./src/page/user-center/index.js'],
		'user-center-update':['./src/page/user-center-update/index.js'],
		'user-register':['./src/page/user-register/index.js'],
		'user-pass-reset':['./src/page/user-pass-reset/index.js'],
		'user-pass-update':['./src/page/user-pass-update/index.js'],
		'result':['./src/page/result/index.js'],

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
				test:/\.(string)$/,
				loader: 'html-loader'
			},
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
	resolve:{
		alias: {
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image',
			node_modules: __dirname + '/node_modules',
		}
	},
	plugins:[
		//独立通用模块到指定文件夹下
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		//把CSS单独打包到文件
		new ExtractTextPlugin("css/[name].css"),
		getHtmlConfig('user-login',"用户登录"),
		getHtmlConfig('user-center',"个人中心"),
		getHtmlConfig('user-center-update',"修改个人信息"),
		getHtmlConfig('index',"首页"),
		getHtmlConfig('detail',"商品详情"),
		getHtmlConfig('cart',"购物车"),
		getHtmlConfig('order-confirm',"订单确认"),
		getHtmlConfig('order-detail',"订单详情"),
		getHtmlConfig('order-list',"订单列表"),
		getHtmlConfig('list',"商品列表"),
		getHtmlConfig('result',"操作结果"),
		getHtmlConfig('user-register',"用户注册"),
		getHtmlConfig('user-pass-reset',"找回密码"),
		getHtmlConfig('user-pass-update',"修改密码"),
		
	]
}

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:9000');
}

module.exports = config;