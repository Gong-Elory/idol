'use strict';


require('./index.scss');
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js')
var _req = require('util/idol_common_tools.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');



var page = {
	data:{
		orderNumber: _req.getUrlParam('orderNumber')
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		//初始化左侧菜单
		navSide.init({
			name: 'order-list',
		})
		this.loadDetail();
	},
	// 加载订单详情
	loadDetail: function(){
		var orderDetailHtml = "";
		var _this = this;
		var $detailCon = $('.content');
		$detailCon.html('<div class="loading"></div>')
		_order.getOrderDetail(this.data.orderNumber,function(res){
			/*渲染HTML*/
			_this.dataFilter(res);
			orderDetailHtml = _req.renderHtml(templateIndex,res);
			$detailCon.html(orderDetailHtml);
		},function(errMsg){
			$detailCon.html('<p class="err-tip">'+errMsg+'</p>')
		});

	},
	bindEvent: function(){
		var _this = this;
		$('.page-wrap').on('click','.order-cancel',function(){
				if(window.confirm('确认要取消订单吗？')){
				_order.cancelOrder(_this.data.orderNumber,function(res){
					_req.successTips('订单取消成功');
					_this.loadDetail();
				},function(errMsg){
					_req.errTips(errMsg);
				});
			}
		})

	},
	dataFilter:function(data){
		data.needPay = data.status == 10
		data.isCancelable = data.status == 10
	}
};

$(function(){
	page.init();
});