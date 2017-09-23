'use strict';
require('./index.scss');
require('page/common/nav/index.js')
require('page/common/header/index.js')
var navSide = require('page/common/nav-side/index.js');
var _req = require('util/idol_common_tools.js');
var _user = require('service/user-service.js');


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
			name: 'user-pass-update',
		})
	},
	bindEvent:function(){
		var _this = this;
		$('.panel-body').on('click','.btn-submit',function(){
			var userinfo = {
				password: $.trim($('#oldpass').val()),
				passwordNew: $.trim($('#newpass').val()),
				passwordConfirm: $.trim($('#passconfirm').val()),
			};
			
			var validateResult = _this.validateForm(userinfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordOld: userinfo.password,
					passwordNew: userinfo.passwordNew
				},function(res,msg){
					_req.successTips(msg);
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
		//原密码是否为空
		if(!_req.validate(formdata.password,'require')){
			result.msg = "原密码不能为空";
			return result;
		}

		if(!formdata.passwordNew || formdata.passwordNew.length < 6){
			result.msg = "密码长度不得小于6位";
			return result;
		}

		if(formdata.passwordNew !== formdata.passwordConfirm){
			result.msg = "两次输入的密码不一致";
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