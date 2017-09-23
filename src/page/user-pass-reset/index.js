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
	data : {
		username: '',
		question: '',
		token: '',
		answer: '',
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad(){
		this.loadStepUsername();
	},
	//加载第1步
	loadStepUsername: function(){
		$('.step-username').show();
	},
	//加载第2步
	loadStepQuestion: function(){
		formError.hideError();
		$('.step-username').hide().siblings('.step-question').show()
						   .find('.question').text(this.data.question);
	},
	//加载第3步
	loadStepNewpass: function(){
		formError.hideError();
		$('.step-question').hide().siblings('.step-newpass').show();
	},
	bindEvent: function(){
		var _this = this;
		//登录按钮的点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val())
			if(username){
				_user.getQuestion(username,function(res){
				_this.data.username = username;
				_this.data.question = res;
				_this.loadStepQuestion();
				},function(errMsg){
					formError.showError(errMsg);
				})
			}else{
				formError.showError('请输入用户名');
			}
		});

		//回答问题后下一步点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val())
			if(answer){
				_user.checkAnswer({
					//密码提示问题答案
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				},function(res){
				//成功后，获得token
				_this.data.answer = answer;
				_this.data.token = res;
				_this.loadStepNewpass();
				},function(errMsg){
					formError.showError(errMsg);
				})
			}else{
				formError.showError('请输入答案');
			}
		});

		$('#submit-newpass').click(function(){
			console.log('happ');
			var password = $.trim($('#usernewpass').val());
			//密码不不为空则提交
			if(password && password.length >=6){
				console.log(password)
				_user.resetPassword({
					//密码提示问题答案
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				},function(res){
				//成功后
				window.location.href = './result.html?type=pass-reset'
				},function(errMsg){
					formError.showError(errMsg);
				})
			}else{
				formError.showError('请输入至少6位密码');
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
				window.location.href = _req.getUrlParam('redirect') || './index.html';React.Component
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