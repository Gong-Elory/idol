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
	}
}

module.exports = _cart;