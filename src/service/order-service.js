/*
* @Author: Elory
* @Date:   2017-09-23 16:49:31
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-23 16:50:06
*/
'use strict';
var _req = require('util/idol_common_tools.js');

var _order = {
	getProductList: function(resolve,reject){
		_req.request({
			url: _req.getServerUrl('/order/get_order_cart_product.do'),
			success: resolve,
			error: reject
		})
	},
	/*提交订单*/
	createOrder:function(orderInfo,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/order/create.do'),
			data: orderInfo,
			success: resolve,
			error: reject
		})
	},
	/*获取订单列表*/
	getOrderList: function(listParam,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/order/list.do'),
			data: listParam,
			success: resolve,
			error: reject
		})
	},
	/*获取订单详情*/
	getOrderDetail: function(orderNum,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/order/detail.do'),
			data: {
				orderNo: orderNum,
			},
			success: resolve,
			error: reject
		})
	},
	/*取消订单*/
	cancelOrder: function(orderNum,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/order/cancel.do'),
			data: {
				orderNo: orderNum,
			},
			success: resolve,
			error: reject
		})
	}
}

module.exports = _order;