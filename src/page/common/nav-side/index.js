/*
* @Author: Elory
* @Date:   2017-09-20 21:30:45
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-21 12:50:55
*/
'use strict';
require('./index.scss');
var _req = require('util/idol_common_tools.js');
var templateIndex = require('./index.string');
var navSide = {
	option: {
		name: '',
		navList: [
			{name: 'user-center',desc:'个人中心',href:'./user-center.html'},
			{name: 'order-list',desc:'我的订单',href:'./order-list.html'},
			{name: 'pass-update',desc:'修改密码',href:'./pass-update.html'},
			{name: 'about',desc:'关于IDOL',href:'./about.html'}
		]
	},
	init: function(option){
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav: function(){
		//计算active数据
		for(var i=0,len=this.option.navList.length;i<len;i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;
			}
		}

		//渲染数据
		var navHtml = _req.renderHtml(templateIndex,{
			navList: this.option.navList
		});

		$('.nav-side').html(navHtml);
	}
};

module.exports = navSide;