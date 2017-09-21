'use strict';
var _req = require('util/idol_common_tools.js');

var _cart = {
	getCartCount: function(resolve,reject){
		_req.request({
			url: _req.getServerUrl('/cart/get_cart_product_count_do'),
			success: resolve,
			error: reject
		})
	}
}

module.exports = _cart;