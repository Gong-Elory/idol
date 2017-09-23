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
		$('#username').blur(function(){

			var username = $.trim($(this).val());
			//为空不验证
			if(!username) return;
			_user.checkUsername(username,function(res){
				formError.hideError();
			},function(errMsg){
				formError.showError(errMsg);
			});
		});
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
			passwordConfirm: $.trim($('#password-cfm').val()),
			phone: $.trim($('#phonenum').val()),
			email: $.trim($('#email').val()),
			question: $.trim($('#ques').val()),
			answer: $.trim($('#answer').val())
		};

		//表单验证结果
		var validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
			},function(errMsg){
				formError.showError(errMsg);
			});
		}else{
			formError.showError(validateResult.msg)
		}
	},
	formValidate : function(formdata){
			var result = {
				status: false,
				msg: ''
			}

			if(!_req.validate(formdata.username,'require')){
				result.msg = "用户名不能为空";
				return result;
			}

			if(!_req.validate(formdata.password,'require')){
				result.msg = "密码不能为空";
				return result;
			}

			if(formdata.password.length < 6){
				result.msg = "密码不能小于6位";
				return result;
			}

			if(formdata.password != formdata.passwordConfirm){
				console.log(formdata.password,formdata.passwordConfirm);
				result.msg = "两次输入密码不一致";
				return result;
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