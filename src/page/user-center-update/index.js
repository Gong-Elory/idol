'use strict';
require('./index.scss');
require('page/common/nav/index.js')
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js');
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
		this.bindEvent();
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
	},
	bindEvent:function(){
		var _this = this;
		$('.panel-body').on('click','.btn-submit',function(){
			var userinfo = {
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val())
			};
			
			var validateResult = _this.validateForm(userinfo);
			if(validateResult.status){
				_user.updateUserInfo(userinfo,function(res,msg){
					_req.successTips(msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					_req.errorTips(errMsg);
				});
			}else{
				_req.errorTips(validateResult.msg);
			}
		})
	},
	//验证字段信息
	validateForm: function(formdata){
		var result = {
				status: false,
				msg: ''
			}

		if(!_req.validate(formdata.phone,'phone')){
			result.msg = "手机号格式不正确";
			return result;
		}

		if(!_req.validate(formdata.email,'email')){
			result.msg = "邮箱格式不正确";
			return result;
		}

		if(!_req.validate(formdata.question,'require')){
			result.msg = "密码提示问题不能为空";
			return result;
		}

		if(!_req.validate(formdata.answer,'require')){
			result.msg = "答案不能为空";
			return result;
		}


		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};

$(function(){
	page.init();
});