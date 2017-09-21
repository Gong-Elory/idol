/*
* @Author: Elory
* @Date:   2017-09-20 22:22:47
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-20 22:32:20
*/
'use stirct';
var _req = require('util/idol_common_tools.js');
var _user = {
	logout: function(resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/logout.do'),
			method: 'post',
			success: resolve,
			error: reject,
		});
	},
	checkLogin: function(resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/get_user_info.do'),
			method: 'post',
			success: resolve,
			error: reject,
		});
	},

}

module.exports = _user;