'use strict';
var _req = require('util/idol_common_tools.js');

var _cart = {
	getCartCount: function(resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		})
	},
	addToCart: function(productInfo,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/add.do'),
			data: productInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	/*获取购物车列表*/
	getCartList: function(resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/list.do'),
			success: resolve,
			error: reject
		})
	},
	//选择购物车商品
	selectProduct: function(productId,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/select.do'),
			data: {
				productId: productId,
			},
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	unselectProduct: function(productId,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/un_select.do'),
			data: {
				productId: productId,
			},
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	unselectAllProduct: function(resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/un_select_all.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	selectAllProduct: function(resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/select_all.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//更新购物车商品数量
	updateProduct: function(productInfo,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/update.do'),
			data: productInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	/*删除指定商品*/
	deleteProduct: function(productIds,resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/delete_product.do'),
			data: {
				productIds: productIds,
			},
			method: 'POST',
			success: resolve,
			error: reject
		})
	}


}

module.exports = _cart;