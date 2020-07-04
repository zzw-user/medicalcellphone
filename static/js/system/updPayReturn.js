mui.init();

function retrun() {
	window.history.go(-1);
}

$(function() {
	var pid;
	mui.plusReady(function() {
		var data = plus.webview.currentWebview();
		pid = data.pid;
		mui.ajax(localStorage.getItem('adminurl')+'/zPayare/getPayOne',{
		    data:{
				pid:pid
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
		    	$("#pid").val(e.pid);
		    	$("#pname").val(e.pname);
		    	$("#way").val(e.way);
		    	$("#describe ").val(e.describe );
		    	$("#writetime").val(e.writetime);
		    	$("#operator").val(e.operator);
		    },
		    error: function(xhr, type, errorThrown) {
		        mui.alert('服务器连接超时，请稍后再试');
		    }
		});
	});
	mui.post(localStorage.getItem('adminurl')+'/zInstallrecord/getMpuser',{
			
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
			document.getElementById("writetime").value = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
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

function submit(){
	var pid=$("#pid").val();
	var pname=$("#pname").val();
	var way=$("#way").val();
	var describe=$("#describe ").val();
	var writetime=$("#writetime").val();
	var operator=$("#operator").val();
	if (pname == "" || pname == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#pname').focus();
		});
		return false;
	};
	if (operator == 0) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#operator').focus();
		});
		return false;
	};
	if (way == "" || way == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#way').focus();
		});
		return false;
	};
	if (writetime == '' || writetime==null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#writetime').focus();
		});
		return false;
	};
	if (describe == "" || describe == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#cost').focus();
		});
		return false;
	};
	mui.ajax(localStorage.getItem('adminurl')+'/zPayare/updPay',{
	    data:{
			pid:pid,operator:operator,pname:pname,way:way,describe:describe,time:writetime
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