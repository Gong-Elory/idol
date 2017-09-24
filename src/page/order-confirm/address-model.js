/*
* @Author: Elory
* @Date:   2017-09-23 16:40:35
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-23 16:50:20
*/
'use strict';
var _req = require('util/idol_common_tools.js');
var _city = require('util/cities/index.js');
var _address = require('service/address-service.js');
var addMdltemplate = require('./address-model.string');

var addressModule = {
	show: function(option){
		this.option = option;
		this.option.data = option.data || {};
		this.$modelWrap = $('.model-wrap');

		/*渲染页面*/
		this.loadModel();
		/*绑定事件*/
		this.bindEvent();

	},
	hide: function(){
		this.$modelWrap.empty();
	},
	loadModel: function(){
		var addressModuleHtml = _req.renderHtml(addMdltemplate,{
			isUpdate: this.option.isUpdate,
			data: this.option.data
		})
		this.$modelWrap.html(addressModuleHtml);
		/*加载省份*/
		this.loadProvince();
	},
	loadProvince: function(){
		var provinces = _city.getProvinces() || [],
			$provinceSelect = this.$modelWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));
		/*如果更新地址，并且有省份信息*/
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCitys(this.option.data.receiverProvince);
		}
	},
	/**
	 * [loadCity 加载城市信息]
	 * @return {[type]} [description]
	 */
	loadCitys: function(proname){
		var $citySelect = this.$modelWrap.find('#receiver-city');
		var cities = _city.getCity(proname) || [];
		$citySelect.html(this.getSelectOption(cities));
		/*如果更新地址，并且有城市信息*/
		if(this.option.isUpdate && this.option.data.receiverCity){
			if(!this.option.onlyChange){
				$citySelect.val(this.option.data.receiverCity);
			}
			this.option.onlyChange = false;	
		}
	},
	/**
	 * [getSelectOption description]
	 * @param  {[type]} arr [description]
	 * @return {[type]} html[description]
	 */
	getSelectOption: function(arr){
		var html = '<option value="" selected>请选择</option>';
		for(var i=0,len=arr.length;i<len;i++){
			html += '<option value="'+ arr[i] +'">'+arr[i]+'</option>'
		}
		return html;
	},
	bindEvent: function(){
		var _this = this;
		/*省份城市的二级联动*/
		this.$modelWrap.find('#receiver-province').change(function(){
			var selectProvince = $(this).val();
			/*在改动的时候，不再更新为用户原本的城市*/
			_this.option.onlyChange = true;
			_this.loadCitys(selectProvince);
		})

		this.$modelWrap.find('.address-btn').click(function(){
			var receInfo = _this.getInfo();
			var isUpdate = _this.option.isUpdate;
			/* 使用新地址并且验证通过 */
			if(!isUpdate && receInfo.status){
				_address.save(receInfo.data,function(res){
					_req.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' 
						&& _this.option.onSuccess(res);
				},function(errMsg){
					_req.errorTips(errMsg || '好像哪里不对了')
				})
			}else if(isUpdate && receInfo.status){
				/*更新收件人并且验证通过*/
				_address.update(receInfo.data,function(res){
					_req.successTips('地址修改成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' 
						&& _this.option.onSuccess(res);
				},function(errMsg){
					_req.errorTips(errMsg || '好像哪里不对了')
				})
			}else{
				_req.errorTips(receInfo.errMsg || '好像哪里不对了')
			}
		})
		/*保证点击内容区不冒泡*/
		this.$modelWrap.find('.model-container').click(function(e){
			e.stopPropagation();
		})
		/*关闭弹窗*/
		this.$modelWrap.find('.close').click(function(){
			_this.hide();
		})



	},
	/* 获取表单里收件人信息方法 */
	getInfo:function(){
		var recvInfo = {},
			result = {
				status: false,

			};
		recvInfo.receiverName = $.trim(this.$modelWrap.find('#receiver-name').val());
		recvInfo.receiverProvince = $.trim(this.$modelWrap.find('#receiver-province').val());
		recvInfo.receiverCity = $.trim(this.$modelWrap.find('#receiver-city').val());
		recvInfo.receiverAddress = $.trim(this.$modelWrap.find('#receiver-address').val());
		recvInfo.receiverPhone = $.trim(this.$modelWrap.find('#receiver-phone').val());
		recvInfo.receiverZip = $.trim(this.$modelWrap.find('#receiver-zip').val());

		if(this.option.isUpdate){
			recvInfo.id = this.$modelWrap.find('#receiver-id').val();
		}

		if(!recvInfo.receiverName){
			result.errMsg = '请输入收件人姓名';
		}else if(!recvInfo.receiverProvince){
			result.errMsg = '请选择收件人所在省份';
		}else if(!recvInfo.receiverCity){
			result.errMsg = '请选择收件人城市';
		}else if(!recvInfo.receiverAddress){
			result.errMsg = '请输入收件人详细地址';
		}else if(!recvInfo.receiverPhone){
			result.errMsg = '请输入收件人手机号';
		}else if(recvInfo.receiverPhone.length !== 11){
			result.errMsg = '请输入11位手机号';
		}else{
			/*所有验证都通过*/	
			result.status = true;
			result.data = recvInfo;
		}

		return result;

	}
};

module.exports = addressModule;
