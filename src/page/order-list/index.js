'use strict';
require('./index.scss');
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js')
var _req = require('util/idol_common_tools.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');


var page = {
	data:{
		listParam: {
			pageNum: 1,
			pageSize: 10
		}
	},
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		this.loadOrderList();
		//初始化左侧菜单
		navSide.init({
			name: 'order-list',
		})
	},
	// 加载订单列表
	loadOrderList: function(){
		var orderListHtml = "";
		var _this = this;
		var $listCon = $('.order-list-con');
		$listCon.html('<div class="loading"></div>')
		_order.getOrderList(this.data.listParam,function(res){
			/*渲染HTML*/
			orderListHtml = _req.renderHtml(templateIndex,res);
			$listCon.html(orderListHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages,
			});
		},function(errMsg){
			$listCon.html('<p class="err-tip">加载订单失败，刷新后重试</p>')
		});

	},
	/*数据适配*/
	// 加载分页信息
	loadPagination:function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container: $('.pagination'),
			onSelectPage: function(page){
				_this.data.listParam.pageNum = page;
				_this.loadOrderList()
			}
		}));
	}
};

$(function(){
	page.init();
});