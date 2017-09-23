'use strict';
require('./index.scss');
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js')
var _req = require('util/idol_common_tools.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');


var formError = {
	showError: function(errMsg){
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hideError: function(){
		$('.error-item').hide().find('.error-msg').text('');
	}
}


var page = {
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		//初始化左侧菜单
		navSide.init({
			name: 'user-center',
		})
		this.loadUserInfo();
	},
	// 加载用户信息
	loadUserInfo: function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _req.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_req.errorTips(errMsg);
		})
	}
};

$(function(){
	page.init();
});