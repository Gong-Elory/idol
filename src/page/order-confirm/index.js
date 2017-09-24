/*
* @Author: Elory
* @Date:   2017-09-23 16:40:35
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-23 16:50:20
*/
'use strict';
require('./index.scss');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _req = require('util/idol_common_tools.js');
var _address = require('service/address-service.js');
var _order = require('service/order-service.js');
var addressModule = require('./address-model.js');
var prdtemplate = require('./product-list.string');
var addtemplate = require('./address-list.string');

var page = {
	data:{
		selectAddressId : null,
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadAddressList();
		this.loadProductList();
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
		/*地址选择*/
		$('.address-con').on('click','.address-item',function(){
			$(this).addClass('active')
				   .siblings('.address-item').removeClass('active');
			_this.data.selectAddressId = $(this).data('id');
			console.log(_this.data.selectAddressId);
		})

		$('.prd-con').on('click','.order-submit',function(){
			var shippingId = _this.data.selectAddressId;
			if(shippingId){
				_order.createOrder({
					shippingId: shippingId,
				},function(res){
					window.location.href = './payment.html?orderNumber='+ res.orderNo;
				},function(errMsg){
					_req.errorTips(errMsg);
				})
			}else{
				_req.errorTips('请选择地址后再提交')
			}
		})

		$('.address-con').on('click','.address-add',function(){
			addressModule.show({
				isUpdate: false,
				onSuccess: function(){
					_this.loadAddressList();
				}
			});
		})

		/* 地址的编辑 */
		$('.address-con').on('click','.address-update',function(e){
			e.stopPropagation();
			var shippingId = parseInt($(this).parents('.address-item').data('id'),10);
			_address.getAddress(shippingId,function(res){
				addressModule.show({
					isUpdate: true,
					data: res,
					onSuccess: function(){
						_this.loadAddressList();
					}
				});
			},function(errMsg){
				_req.errorTips(errMsg);
			})
		})
		/*地址删除*/
		$('.address-con').on('click','.address-delete',function(e){
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
			if(window.confirm("确认删除该地址吗？")){
				_address.deleteAddress(id,function(res){
					_this.loadAddressList();
				},function(errMsg){
					_req.errTips(errMsg);

				})
			}
			
		})

	},
	loadAddressList: function(){

		var _this = this;
		$('.prd-con').html('<div class="loading"></div>');
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			console.log(res.list);
			var AddressListHtml = _req.renderHtml(addtemplate,res);
			$('.address-con').html(AddressListHtml);
		},function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
		})
	},
	loadProductList: function(){

		var _this = this;
		$('.prd-con').html('<div class="loading"></div>');
		_order.getProductList(function(res){
			var productListHtml = _req.renderHtml(prdtemplate,res);
			$('.prd-con').html(productListHtml);
		},function(errMsg){
			$('.prd-con').html('<p class="err-tip">'+ (errMsg || '订单加载失败，请刷新后重试')+'</p>');
		})
	},
	/*处理地址列表选中状态*/
	addressFilter: function(data){
		if(this.data.selectAddressId){
			var selectedAddrFlag = false;
			for(var i=0,len=data.list.length;i<len;i++){

				if(data.list[i].id === this.data.selectAddressId){
					data.list[i].isActive = true;
					selectedAddrFlag = true;
				}
			}
			/*如果以前选中的地址已经被删除了，则把选中id删除*/
			if(!selectedAddrFlag){
				this.data.selectAddressId = null;
			}
		}
	}
};

$(function(){
	page.init();
});