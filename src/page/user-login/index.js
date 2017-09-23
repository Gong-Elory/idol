/*
* @Author: Elory
* @Date:   2017-09-20 14:30:13
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-21 15:10:54
*/
'use strict';
require('./index.scss');

require('page/common/nav-simple/index.js');
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
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		//登录按钮的点击
		$('#submit').click(function(){
			_this.submit();
		})
		//
		$('user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		})
		
	},
	submit: function(){
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
		};

		var validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.login(formData,function(res){
				window.location.href = _req.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.showError(errMsg);
			});
		}else{
			formError.showError(validateResult.msg)
		}
	},
	formValidate : function(formdata){
		console.log('进来了');
		console.log(formdata);
			var result = {
				status: false,
				msg: ''
			}

			if(!_req.validate(formdata.username,'require')){
				result.msg = "用户名不能为空";
			}


			if(!_req.validate(formdata.password,'require')){
				result.msg = "密码不能为空";
			}

			result.status = true;
			result.msg = '验证通过';
			return result;
		}
};

$(function(){
	page.init();
});