/*
* @Author: Elory
* @Date:   2017-09-21 12:52:25
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-21 15:01:10
*/
'use strict';
require('./index.scss');

require('page/common/nav-simple/index.js');
var _req = require('util/idol_common_tools.js');

$(function(){
	var type = _req.getUrlParam('type') || 'default';
		$('.'+type+'-success').show(); 
})
