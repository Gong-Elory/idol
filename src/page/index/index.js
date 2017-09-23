/*
* @Author: Elory
* @Date:   2017-09-20 14:23:05
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-21 13:09:31
*/
'use strict';
require('./index.scss');
require('page/common/nav/index.js')
require('page/common/header/index.js')
var _req = require('util/idol_common_tools.js');
var _slider = require('util/slider/index.js');
var templateHtml =  require('./index.string');


$(function() {
	var bannerHtml = _req.renderHtml(templateHtml);
	$('.banner-con').html(bannerHtml);

    var $slider = $('.banner').unslider({
    	dots: true,
    });

    //幻灯片
    //
    $('.banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();

    })
});
