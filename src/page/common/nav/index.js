/*
* @Author: Elory
* @Date:   2017-09-20 22:06:28
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-21 10:20:17
*/
'use strict'
require('./index.scss');
var _req = require('util/idol_common_tools.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
	init: function(){
		this.bindEvent();
		// 记住这里记得开放
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent: function(){
		//登录点击事件
		$('.js-login').click(function(){
			_req.doLogin()
		});
		//注册点击事件
		$('.js-regis').click(function(){
			window.location.href = './register.html';
		});
		//退出点击事件
		$('.js-logout').click(function(){
			/**
			 * 当点击退出时，像后台发送数据：主要是标志位的重置
			 */
			_user.logout(function(res){
				//重新加载的时候会再次向后台请求数据，验证是否登录
				window.location.reload();
			},function(errMsg){
				_req.errorTips(errMsg)
			});
		})

	},
	loadUserInfo: function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide()
								.siblings('.logined').show()
								.find('.username').text(res.username);
			
			},function(errMsg){
				_req.errorTips(errMsg)
			});
	},
	loadCartCount: function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		},function(errMsg){
			$(".nav .cart-count").text(0);
		})
	}
}

// module.exports = nav.init();
module.exports = nav;