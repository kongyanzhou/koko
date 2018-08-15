
import axios from 'axios';

var common = {

	// 请求接口
	requestInterface: function (params){
		var _interface_url = params.url; // 接口地址
		if (!_interface_url) { return false; }
		
		var _request_type = params.type ? params.type : 'POST'; // 请求类型 post or get 默认 POST
        var _data_type = params.dataType ? params.dataType : 'JSON'; // 返回数据类型, 默认为JSON
        var _parameter = params.parameter; // 请求接口需要的参数
        var _timeout = params.timeout ? params.timeout : 999999; // 接口请求超时时间
        var _headers = params.headers ? params.headers : {'Content-Type':'application/x-www-form-urlencoded'}; // 请求头
		
		axios({
			method: _request_type,
			url: _interface_url,
			params: _parameter,
			headers: _headers,
			timeout: _timeout,
			responseType: _data_type,
			// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  			// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
			baseURL:'http://t.lanchenglv.com/tp5demo/index.php/',
		}).then(function(res){
			if(res.status == 200){
				if(params.successFun){
					params.successFun(res.data,res);
				}
			}else{
				if (data.error) {
					params.errorFun(error);
				}else{
					console.log('接口返回错误');
				}
			}
		}).catch(function (error){
			if (params.errorFun) {
				params.errorFun(error);
			}else{
				console.log('AJAX请求出错'+error);
			}
		});
			
	},

	/*
	** 用途：传入范围,在范围内生成随机数
	** 输入：Min：最小数	Max：最大数
	** 返回：随机数
	*/
	GetRandomNum: function (Min,Max) {
		var Range = Max - Min;
		var Rand = Math.random();
		return(Min + Math.round(Rand * Range));
	},
};

// 接口域名地址

// p测试环境：pkoldata.kolstore.com
// m测试环境：mwww.koldata.cn
var IfLocalEnv =  window.location.host.indexOf("localhost") == "0";
common.getApiUrl = window.location.host.indexOf("localhost") == "0" ? "http://pkoldata.kolstore.com" : window.location.origin;


export default common;

































