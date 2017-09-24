'use strict';
var _req = require('util/idol_common_tools.js');

var _order = {
	/*获取地址列表*/
	getAddressList: function(resolve,reject){
		_req.request({
			url: _req.getServerUrl('/shipping/list.do'),
			data:{
				pageSize: 50
			},
			success: resolve,
			error: reject
		})
	},
	/*新建收件地址*/
	save: function(addrInfo,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/shipping/add.do'),
			data:addrInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	getAddress: function(shippingId,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/shipping/select.do'),
			data:{
				shippingId: shippingId
			},
			success: resolve,
			error: reject
		})
	},
	/*更新收件人*/
	update: function(addrInfo,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/shipping/update.do'),
			data: addrInfo,
			success: resolve,
			error: reject
		})
	},
	/*删除地址*/
	deleteAddress: function(shippingId,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/shipping/del.do'),
			data: {
				shippingId:shippingId
			},
			success: resolve,
			error: reject
		})
	}
}

module.exports = _order;