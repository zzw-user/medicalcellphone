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
		mui.ajax(localStorage.getItem('adminurl') + '/zCost/getCostOne', {
			data: {
				cid: cid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			beforeSend: function() {
				showLoading();
			},
			complete: function() {
				hideLoading();
			},
			success: function(e) {
				$("#cid").val(e.cid);
				$("#operator").val(e.operator);
				$("#coding").val(e.coding);
				$("#dataentryclerk").val(e.dataentryclerk);
				$("#address").val(e.address);
				$("#inputtime").val(e.inputtime);
				$("#phone").val(e.phone);
				$("#cost").val(e.cost);
			},
			error: function(xhr, type, errorThrown) {
				mui.alert('服务器连接超时，请稍后再试');
			}
		});
	});
	mui.post(localStorage.getItem('adminurl') + '/zInstallrecord/getMpuser',{
			
		},function(data){
			$("#operator").append("<option value='0'>请选择</opton>")
			$(data).each(function(){
				$("#operator").append("<option value='"+this.mpid+"'>"+this.realname+"</opton>")
			})
		},'json'
	);
})

//获取时间
function getDate() {
	var dDate = new Date();
	var minDate = new Date();
	minDate.setFullYear(2000, 0, 1);
	var maxDate = new Date();
	maxDate.setFullYear(2020, 11, 31);
	plus.nativeUI.pickDate(
		function(e) {
			var d = e.date;
			document.getElementById("inputtime").value = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			// mui.toast('您选择的时间是：' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日');
		},
		function(e) {
			mui.toast('请选择')
		}, {
			title: '请选择',
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		}
	)
};

function submit() {
	var cid = $("#cid").val();
	var operator = $("#operator").val();
	var coding = $("#coding").val();
	var phone = $("#phone").val();
	var address = $("#address").val();
	var dataentryclerk = $("#dataentryclerk").val();
	var inputtime = $("#inputtime").val();
	var cost = $("#cost").val();
	var phone_pattern = /(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/;
	if (operator == 0) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#operator').focus();
		});
		return false;
	};
	if (address == "" || address == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#address').focus();
		});
		return false;
	};
	if (dataentryclerk == "" || address == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#dataentryclerk').focus();
		});
		return false;
	};
	if (phone == '') {
		mui.alert('请输入手机号', '系统提示', function() {
			$('#phone').focus();
		});
		return false;
	};
	if (!phone_pattern.test(phone)) {
		mui.alert('请输入正确的手机号', '系统提示', function() {
			$('#phone').focus();
		});
		return false;
	};
	if (cost == "" || cost == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#cost').focus();
		});
		return false;
	};
	if (inputtime == "" || inputtime == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#inputtime').focus();
		});
		return false;
	};
	mui.ajax(localStorage.getItem('adminurl') + '/zCost/updCost', {
		data: {
			cid:cid,operator:operator,phone:phone,address:address,dataentryclerk:dataentryclerk,cost:cost,time:inputtime
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		beforeSend: function() {
			showLoading();
		},
		complete: function() {
			hideLoading();
		},
		success: function(e) {
			if(e){
				mui.toast("修改完成！");
			}else{
				mui.toast("修改失败！"); 
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.alert('服务器连接超时，请稍后再试');
		}
	});
}
