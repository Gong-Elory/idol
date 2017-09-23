'use stirct';
var _req = require('util/idol_common_tools.js');
var _prd = {
	getProductList: function(listParam,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/product/list.do'),
			method: 'POST',
			data: listParam,
			success: resolve,
			error: reject,
		});
	},
	getProductDetail: function(productId,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/product/detail.do'),
			data:{
				productId: productId
			},
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},


}

module.exports = _prd;