'use strict';
require('./index.scss');
require('page/common/nav/index.js')
require('page/common/header/index.js')
var _req = require('util/idol_common_tools.js');
var _prd = require('service/prd-service.js');
var _cart = require('service/cart-service.js');
var template = require('./index.string');

var page = {
	data:{
		productId: _req.getUrlParam('productId') || '',
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		//没有id，跳回首页
		if(!this.data.productId){
			_req.goHome();
		}
		this.loadDetail();
	},
	//加载详情数据
	loadDetail:function(){
		var html = '';
		var _this = this;
		var $pagewrap = $('.page-wrap');
		$pagewrap.html('<div class="loading"></div>')
		//请求DETAIL
		_prd.getProductDetail(this.data.productId,function(res){
			_this.filter(res);
			_this.data.detailInfo = res;
			console.log(res);
			html = _req.renderHtml(template,res);
			$pagewrap.html(html);
		},function(errMsg){
			$pagewrap.html('<p class="err-tip">Opps！此商品找不到了</p>');
		})
	},
	bindEvent:function(){
		var _this = this;
		$('.page-wrap').on('mouseenter','.p-img-item',function(){
			var imgUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src',imgUrl);
		});
		$('.page-wrap').on('mouseleave','.p-img-item',function(){
			var imgUrl = $('.p-img-list').find('.p-img:eq(0)').attr('src');
			$('.main-img').attr('src',imgUrl);
		});

		/*count 操作*/
		$('.page-wrap').on('click','.p-count-btn',function(){
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';
			var $pCount = $('.p-count');
			var currCount = parseInt($pCount.val(),10); 
			var minCount = 1;
			var maxCount = _this.data.detailInfo.stock || 1;

			if(type === 'plus'){
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			}else if(type === 'minus'){
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		})

		/*count 操作*/
		$('.page-wrap').on('click','.cart-add',function(){
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			},function(res){
				window.location.href ='./result.html?type=cart-add'
			},function(errMsg){
				_req.errorTips(errMsg);
			})
		})


	},
	filter: function(data){
		data.subImages = data.subImages.split(',');

	}
};

$(function(){
	page.init();
});