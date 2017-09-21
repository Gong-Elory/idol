/*
* @Author: Elory
* @Date:   2017-09-20 18:28:35
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-20 20:42:17
*/
'use strict';
var Hogan = require('hogan');
var conf = {
	serverHost: ''
};
var _req = {
	_self : this,
	request: function(param){
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function(res){
				//请求成功
				if(1 === res.status){
					typeof param.success === 'function' && param.success(res.data);
				}
				//没有登录态
				else if(10 === res.status){
					_self.doLogin();
				}
				//请求数据错误
				else if(0 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error: function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},

	doLogin: function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//获取服务器地址
	getServerUrl: function(path){
		return conf.serverHost + path;
	},
	getUrlParam: function(name){
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		console.log(result);
		return result ? decodeURIComponent(result[2]) :　null;
	},
	//渲染HTML模板
	renderHtml: function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);
			return result;
	},
	successTips: function(msg){
		alert(msg || '操作成功');
	},
	errorTips: function(msg){
		alert(msg || '哪里出错啦');
	},
	//字段验证
	validate: function(val,type){
		var val = $.trim(val);
		//非空验证
		if('require' === type){
			return !!val;
		}

		//手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}

		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	goHome: function(){
		window.location.href = './index.html';
	}
}

module.exports = _req;