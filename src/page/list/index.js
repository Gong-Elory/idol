'use strict';
require('./index.scss');
require('page/common/nav/index.js')
require('page/common/header/index.js')
var _req = require('util/idol_common_tools.js');
var _prd = require('service/prd-service.js');
var template = require('./index.string');
var Pagination = require('util/pagination/index.js');

var formError = {
	showError: function(errMsg){
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hideError: function(){
		$('.error-item').hide().find('.error-msg').text('');
	}
}


var page = {
	data:{
		listParam:{
			keyword: _req.getUrlParam('keyword') || '',
			categoryId: _req.getUrlParam('categaryId') || '',
			orderBy: _req.getUrlParam('orderBy') || 'default',
			pageNum: _req.getUrlParam('pageNum') || 1,
			pageSize: _req.getUrlParam('pageSize') || 20,
		}
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').click(function(){
			_this.data.listParam.pageNum = 1;
			var $this = $(this);
			if($this.data('type') === 'default'){
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';

				}
			}else if($this.data('type') === 'price'){
				$this.addClass('active')
					 .siblings('.sort-item').removeClass('active asc desc');
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			//重新加载列表
			_this.loadList();
		});
		
	},
	//加载数据
	loadList: function(){
		var listHtml ='', 
			_this = this,
			listParam = this.data.listParam,
			$pListCon = $('.p-list-con');

		$pListCon.html('<div class="loading"></div>');


		listParam.categoryId 
		? (delete listParam.keyword) 
		: (delete listParam.categoryId);

		_prd.getProductList(listParam,function(res){
			listHtml = _req.renderHtml(template,{
				list: res.list,
			});
			
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages,
				
			});

		},function(errMsg){
			_req.errorTips(errMsg);

		})
	},
	// 加载分页信息
	loadPagination:function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container: $('.pagination'),
			onSelectPage: function(page){
				_this.data.listParam.pageNum = page;
				_this.loadList()
			}
		}));
	}
};

$(function(){
	page.init();
});