mui.init()

function retrun() {
	window.history.go(-1);
}
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
$(function() {
	var cid;
	mui.plusReady(function() {
		var data = plus.webview.currentWebview();
		cid = data.cid;
		mui.toast(data.cid);
		mui.toast(cid);
	})
	// $.ajax({
	// 	url: 'http://127.0.0.1:8081/zDelivery/getDeliveryOne',
	// 	type: 'post',
	// 	dataType: 'json',
	// 	data: {
	// 		cid: cid
	// 	},
	// 	success: function(e) {
	// 		$("#cid").val(e.cid);
	// 		$("#operator").val(e.operator);
	// 		$("#coding").val(e.pcoding);
	// 		$("#dataentryclerk").val(e.dataentryclerk);
	// 		$("#address").val(e.address);
	//		$("#inputtime").val(e.inputtime);
	// $("#phone").val(e.phone);
	// $("#cost").val(e.cost);
	// 	}
	// })
})

function submit() {
	var cid = $("#cid").value;
	var operator = $("#operator").value;
	var coding = $("#coding").value;
	var phone = $("#phone").value;
	var address = $("#address").value;
	var dataentryclerk = $("#dataentryclerk").value;
	var inputtime = $("#inputtime").value;
	var cost = $("#cost").value;
	var phone_pattern = /(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/;
	if (operator == 0) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#operator').focus();
		});
		return false;
	}
	if (address == "" || address == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#address').focus();
		});
		return false;
	}
	if (dataentryclerk == "" || address == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#dataentryclerk').focus();
		});
		return false;
	}
	if (phone == '') {
		mui.alert('请输入手机号', '系统提示', function() {
			$('#phone').focus();
		});
		return false;
	}
	if (!phone_pattern.test(phone)) {
		mui.alert('请输入正确的手机号', '系统提示', function() {
			$('#phone').focus();
		});
		return false;
	}
	if (cost == "" || address == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#cost').focus();
		});
		return false;
	}
	if (inputtime = "" || address == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#inputtime').focus();
		});
		return false;
	}
	// $.ajax({
	// 	url: 'http://127.0.0.1:8081/zDelivery/updDelivery',
	// 	type: 'post',
	// 	dataType: 'text',
	// 	data: {
	// 		cid:cid,operator:operator,coding:coding,phone:phone,address:address,inputtime:inputtime,dataentryclerk:dataentryclerk,cost:cost
	// 	},
	// 	success: function(e) {
	// 		if(e){
	// 			mui.toast("修改完成！");
	// 		}else{
	// 			mui.toast("修改失败！"); 
	// 		}
	// 	}
	// })
}
