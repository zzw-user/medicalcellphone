mui.init();

function retrun() {
	window.history.go(-1);
}

$(function() {
	var pid;
	mui.plusReady(function() {
		var data = plus.webview.currentWebview();
		pid = data.pid;
		mui.toast(data.pid);
		mui.toast(pid);
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
		url: 'http://127.0.0.1:8080/zPayare/getPayOne',
		type: 'post',
		dataType: 'json',
		data: {
			pid: 1
		},
		success: function(e) {
			$("#pid").val(e.pid);
			$("#pname").val(e.pname);
			$("#way").val(e.way);
			$("#describe ").val(e.describe );
			$("#writetime").val(e.writetime);
			$("#operator").val(e.operator);
		}
	})
})

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
	$.ajax({
		url: 'http://127.0.0.1:8080/zPayare/updPay',
		type: 'post',
		dataType: 'text',
		data: {
			pid:pid,operator:operator,pname:pname,way:way,describe:describe,writetime:writetime
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