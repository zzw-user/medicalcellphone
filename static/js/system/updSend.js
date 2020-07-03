mui.init();

function retrun() {
	window.history.go(-1);
}

$(function() {
	var did;
	mui.plusReady(function() {
		var data = plus.webview.currentWebview();
		did = data.did;
		mui.toast(data.did);
		mui.toast(did);
	});
	mui.post('http://127.0.0.1:8080/zInstallrecord/getMpuser',{
			
		},function(data){
			$("#operator").append("<option value='0'>请选择</opton>")
			$(data).each(function(){
				$("#operator").append("<option value='"+this.mpid+"'>"+this.realname+"</opton>")
			})
		},'json'
	);
	$.ajax({
		url: 'http://127.0.0.1:8080/zDelivery/getDeliveryOne',
		type: 'post',
		dataType: 'json',
		data: {
			did: 3
		},
		success: function(e) {
			$("#did").val(e.did);
			$("#operator").val(e.operator);
			$("#coding").val(e.coding);
			$("#phone").val(e.phone);
			$("#address").val(e.address);
		}
	})
})

function getAddress() {
	var dealerid = $("input[name='dealerid']").val();
	window.location.href = "https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=跳转的链接&key=应用的KEY&referer=应用名称";
}
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
function submit(){
	var did =$("#did").val();
	var operator =$("#operator").val();
	var coding =$("#coding").val();
	var phone =$("#phone").val();
	var address =$("#address").val();
	var phone_pattern = /(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/;
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
	if(operator ==0 || address ==""){
		mui.alert('必填项，不能为空', '系统提示', function() {
		    $('#operator').focus();
		});
		return false;
	}
	$.ajax({
		url: 'http://127.0.0.1:8080/zDelivery/updDelivery',
		type: 'post',
		dataType: 'text',
		data: {
			did:did,operator:operator,coding:coding,phone:phone,address:address
		},
		success: function(e) {
			if(e){
				mui.toast("修改完成！");
			}else{
				mui.toast("修改失败！"); 
			}
		}
	})
}
