/*
* @Author: Elory
* @Date:   2017-09-21 09:36:36
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-21 10:16:12
*/
'use strict';
require('./index.scss');

var _req = require('util/idol_common_tools.js');

var header = {
	init: function(){
		this.bindEvent();
		this.onLoad();
	},
	onLoad: function(){
		var keyword = _req.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function(){
		var _this = this;
		//点击搜索按钮，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		})
		//输入回车后做搜索提交
		//过会儿做防抖处理
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	searchSubmit(){
		var keyword = $.trim($('#search-input').val());
		//提交的时候有查询关键字，调跳到list页
		if(keyword){
			window.location.href = './list.html?keyword='+ keyword;
		}else{
			//不然回首页
			_req.goHome();
		}
	}
}

header.init();