'use strict';

require('./index.scss')
var templatePagination = require('./index.string');
var _req = require('util/idol_common_tools.js');
var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container : null,
		pageNum : 1,
		pageRange: 3,
		onSelectPage: null,
	}

	$('.pagination').on('click','.pg-item',function(){
		var $this = $(this);
		// 如果是禁用或正当前按钮，不做处理
		if($this.hasClass('active') || $this.hasClass('disabled')){
			return ;
		}

		typeof _this.option.onSelectPage === 'function' 
			?  _this.option.onSelectPage($this.data('value')) : null;
	})
}

Pagination.prototype.render = function(userOption){
	this.option = $.extend({},this.defaultOption,userOption);
	//判断容器是否合法
	if(!(this.option.container) instanceof jQuery){
		return;
	}
	// 判断是否只有一页
	if(!this.option.pages <=1){
		return;
	}

	//渲染分页
	this.option.container.html(this.getPaginationHtml())
};

Pagination.prototype.getPaginationHtml = function(){
	var html = '';
	var pageArray = [];
	var option = this.option;
	var start = (option.pageNum - option.pageRange) > 0 ? option.pageNum - option.pageRange : 1;
	var end =(option.pageNum + option.pageRange) > option.pages ? option.pages :option.pageNum + option.pageRange;
	var total = 2 * option.pageRange + 1;
	if(end < total){
		end = option.pages > total ? total : option.pages;
	}

	pageArray.push({
		name: '上一页',
		value: this.option.prePage,
		disabled: !this.option.hasPreviousPage
	});

	for(var i= start; i <= end; i++){
		pageArray.push({
			name: i,
			value: i,
			active: (i === option.pageNum),
		})
	}

	pageArray.push({
		name: '下一页',
		value: this.option.nextPage,
		disabled: !this.option.hasNextPage
	});
	html = _req.renderHtml(templatePagination,{
		pageArray: pageArray,
		pageNum: option.pageNum,
		pages: option.pages
	})
	return html;


}

module.exports = Pagination;