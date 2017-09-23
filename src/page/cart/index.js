/*
* @Author: Elory
* @Date:   2017-09-23 10:46:53
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-23 16:10:21
*/
'use strict';
require('./index.scss');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _req = require('util/idol_common_tools.js');
var _cart = require('service/cart-service.js');
var template = require('./index.string');

var page = {
	data:{

	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		$('.page-wrap').on('click','.cart-select',function(){
			var $this = $(this);
			var productId = $this.parents('.cart-table').data('product-id');
			console.log(productId);
			//判断选中状态
			if($this.is(':checked')){
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}else{
				_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
		});

		$('.page-wrap').on('click','.cart-select-all',function(){
			var $this = $(this);
				//判断选中状态
				if($this.is(':checked')){
					_cart.selectAllProduct(function(res){
						_this.renderCart(res);
					},function(errMsg){
						_this.showCartError();
					});
				}else{
					_cart.unselectAllProduct(function(res){
						_this.renderCart(res);
					},function(errMsg){
						_this.showCartError();
					});
				}
		});

		/*商品数量的变化*/
		$('.page-wrap').on('click','.count-btn',function(){
			var $this = $(this),
			$pCount = $this.siblings('.count-input'),
			currCount = parseInt($pCount.val(),10),
			type = $this.hasClass('plus') ? 'plus' : 'minus',
			productId = $this.parents('.cart-table').data('product-id'),
			minCount = 1,
			maxCount = parseInt($pCount.data('max'),10),
			newCount = 0;

			if(type == 'plus'){
				if(currCount >= maxCount){
					_req.errorTips('该商品数达到上限');
					return;
				}

				newCount = currCount + 1;
			}else if(type == 'minus'){
				if(currCount <= minCount){
					return ;
				}

				newCount = currCount - 1;
			}
			/*更新购物车商品数量*/
			_cart.updateProduct({
				productId : productId,
				count: newCount
			},function(res){
				_this.renderCart(res);
			},function(errMsg){
				_this.showCartError();
			})
		});

		/*删除单个商品*/
		$('.page-wrap').on('click','.cart-del',function(){
			if(window.confirm('确认删除该商品？')){
				var $this = $(this);
				var productId = $this.parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		/*删除选中商品*/
		
		$('.page-wrap').on('click','.del-selected',function(){
			if(window.confirm('确认删除选中的商品吗？')){
				var $this = $(this);
				var productIds = [];
				var $selectedItem = $('.cart-select:checked');
				for(var i=0,iLen = $selectedItem.length;i < iLen; i++){
					/*循环查找选中的prd*/
					productIds.push($($selectedItem[i])
						.parents('.cart-table').data('product-id'));
				}
				if(productIds.length){
					_this.deleteCartProduct(productIds.join(','));
				}else{
					_req.errorTips('没有选中任何商品');

				}
			}
		});

		$('.page-wrap').on('click','.btn-submit',function(){
			console.log(_this.data.cartInfo);
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = './confrim.html';
			}else{
				_req.errorTips('您还没有选中任何商品');
			}
		});
	},
	loadCart:function(){
		var _this = this;
		/*获取购物车列表*/
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		})
	},
	renderCart: function(data){
		this.filter(data);
		this.data.cartInfo = data;
		/*生产html*/
		var cartHtml  = _req.renderHtml(template,data);
		$(".page-wrap").html(cartHtml);
		/*通知购物车更新数量*/

		nav.loadCartCount();

	},
	filter: function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	showCartError: function(){
		$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新一下试试！</p>')
	},
	/*删除指定商品*/
	/*productId用逗号分隔*/
	deleteCartProduct: function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});
	}
};

$(function(){
	page.init();
});