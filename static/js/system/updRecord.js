mui.init();
mui.plusReady(function () {
    
})
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

function retrun() {
	window.history.go(-1);
};

$(function() {
	var rid;
	mui.plusReady(function() {
		var data = plus.webview.currentWebview();
		rid = data.rid;
		mui.toast(data.rid);
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
		url: 'http://127.0.0.1:8080/zInstallrecord/getRecordOne',
		type: 'post',
		dataType: 'json',
		data: {
			rid: 1
		},
		success: function(e) {
			$("#rid").val(e.rid);
			$("#operator").val(e.operator);
			$("#coding").val(e.coding);
			$("#address").val(e.address);
			$("#installationtime").val(e.installationtime);
			var status = $("input[name='status']");
			for(var i=0; i<status.length;i++){
				if(e.status==status[i].value){
					status[i].checked=true;
				}
			}
		}
	})
})

function getDate() {
	var dDate = new Date();
	var minDate = new Date();
	minDate.setFullYear(1990, 0, 1);
	var maxDate = new Date();
	maxDate.setFullYear(2100, 11, 31);
	mui.plusReady(function () {
	    plus.nativeUI.pickDate(
	    		function(e) {
	    			var d = e.data;
	    			mui.toast('您选中的日期是' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
	    		},
	    		function(e) {
	    
	    		}, {
	    			title: "请选择日期",
	    			date: dDate,
	    			minDate: minDate,
	    			maxDate: maxDate
	    		}
	    	)
	})
};
function Image(){
mui.toast("图片");
};
function submit(){
	var rid =$("#rid").val();
	var operator =$("#operator").val();
	var coding =$("#coding").val();
	var status =$("#input[name='status']").val();
	var address =$("#address").val();
	var installationtime =$("#installationtime").val();
	if(operator ==0){
		mui.alert('必填项，不能为空', '系统提示', function() {
		    $('#operator').focus();
		});
		return false;
	}
	if(address =="" || address ==null){
		mui.alert('必填项，不能为空', '系统提示', function() {
		    $('#operator').focus();
		});
		return false;
	}
	if(installationtime=="" || installationtime==null){
		mui.alert('必填项，不能为空', '系统提示', function() {
		    $('#operator').focus();
		});
		return false;
	}
	$.ajax({
		url: 'http://127.0.0.1:8080/zInstallrecord/updRecord',
		type: 'post',
		dataType: 'text',
		data: {
			rid:rid,operator:operator,coding:coding,status:status,address:address,installationtime:installationtime
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