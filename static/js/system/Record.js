mui.init({
　　pullRefresh: {
　　　　container: '#refreshContainer', //要操作的容器，可选择到的都行，#Id,.Class都行
　　　　down: {
　　　　　　style:'circle',
　　　　　　color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
　　　　　　height:'150px',//可选,默认50px.下拉刷新控件的高度,
　　　　　　range:'100px', //可选 默认100px,控件可下拉拖拽的范围
　　　　　　offset:'0', //可选 默认0px,下拉刷新控件的起始位置
　　　　　　auto: false,//可选,默认false.首次加载自动上拉刷新一次
　　　　　　callback: pulldownRefresh
　　　　}
　　}
});
function pulldownRefresh() {
　　setTimeout(function() {
	var data =document.getElementById("searchInput").value;
	if(data=="" || data==null){
		select(null);
	}else{
		select({address:data});
	}
　　　　mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
　　}, 1500);
}
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

function exit(id) {
	mui.openWindow({
		url: 'updRecord.html',
		id: 'systemupdRecord',
		extras: {
			rid : id
		}
	});
}
function cost() {
	mui.openWindow({
		url: 'cost.html',
		id: 'systemcost'
	});
};
function home() {
	mui.openWindow({
		url: '../index.html',
		id: 'systemindex'
	});
}
function payReturn() {
	mui.openWindow({
		url: 'payReturn.html',
		id: 'systempayReturn'
	});
}
function send() {
	mui.openWindow({
		url: 'Send.html',
		id: 'systemSend'
	});
};


function assess(id) {
	mui.prompt('请输入你对此的评估', '不错', '评估', ['取消', '确认'], function(e) {
		if (e.index == 1) {
			mui.ajax(localStorage.getItem('adminurl')+'/zInstallrecord/updRecord',{
			    data:{
					rid:id,assess:e.value
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
			    		mui.toast("评估完成！");
			    	}
			    },
			    error: function(xhr, type, errorThrown) {
			        mui.alert('服务器连接超时，请稍后再试');
			    }
			});
		}
	})
}
function list(id){
	mui.ajax(localStorage.getItem('adminurl')+'/zInstallrecord/getRecordOne',{
	    data:{
			rid:id
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
			var beforeinstallation="../../images/iconfont-tianjia.png";
			var afterinstallation="../../images/iconfont-tianjia.png";
			if(e.afterinstallation!=null && e.afterinstallation!=""){
				afterinstallation="https://zzwzz-1302574033.cos.ap-nanjing.myqcloud.com/"+e.afterinstallation;
			};
			if(e.beforeinstallation!=null && e.beforeinstallation!=""){
				beforeinstallation="https://zzwzz-1302574033.cos.ap-nanjing.myqcloud.com/"+e.beforeinstallation;
			};
	    	$("#content").html("");
	    	$("#content").append("<div class='mui-card'>"+
	    				"<div class='mui-card-header'>"+e.coding+"</div>"+
	    				"<div class='mui-card-content'>"+
	    					"<div class='mui-card-content-inner'>"+
	    						e.address+
	    					"</div>"+
	    					"<div>"+
	    						"<p>安装前图片</p>"+
	    						"<img src='"+beforeinstallation+"' width='80' height='80'/>"+
	    						"<p>安装后图片</p>"+
	    						"<img src='"+afterinstallation+"' width='80' height='80'/>"+
								"<p>评估："+e.assess+"<p>"+
	    					"</div>"+
	    				"</div>"+
	    				"<div class='mui-card-footer'>"+
	    					"<P>"+e.installationtime+"</P>"+
	    					"<P>"+e.moperator+"</P>"+
	    				"</div>"+
	    			"</div>");
	    },
	    error: function(xhr, type, errorThrown) {
	        mui.alert('服务器连接超时，请稍后再试');
	    }
	});
	mui("#popover").popover('toggle', document.getElementById("div"));
}
// 搜索事件,获取搜索关键词
function enterSearch(event) {
	if (event.keyCode == 13) { //用户点击回车的事件号为13
		var keyword = document.getElementById('searchInput').value;
		var param={address:keyword};
		select(param);
	}
}
function del(id){
	mui.confirm('确定要删除此数据吗，确认？', 'Hello MUI', ['取消','确认'], function(e) {
		if (e.index == 1) {
			mui.ajax(localStorage.getItem('adminurl')+'/zInstallrecord/delRecord',{
			    data:{
					rid:id
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
			    	mui.toast("删除成功！");
			    		// index=$(this).parents(".list-li").index();
			    		// $(".list-li").eq(index-1).remove();
			    		var data =document.getElementById("searchInput").value;
			    		if(data=="" || data==null){
			    			select(null)
			    		}else{
			    			select({address:data});
			    		}
			    	}else{
			    		mui.toast("删除失败！");
			    	}
			    },
			    error: function(xhr, type, errorThrown) {
			        mui.alert('服务器连接超时，请稍后再试');
			    }
			});
		}
	})
}
$(function(){
	select(null);
})
function select(param){
	mui.ajax(localStorage.getItem('adminurl')+'/zInstallrecord/getRecord',{
	    data:param,
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
	    	$("#ul").html("");
			$("#message").hide();
			$("#message").html("");
	    	if(e.length>0){
	    		$(e).each(function(){
	    			var status;
	    			if(this.status==1){
	    				status="未完成";
	    			}
	    			if(this.status==2){
	    				status="处理中";
	    			}
	    			if(this.status==3){
	    				status="已完成";
	    			}
	    			$("#ul").append("<li class='mui-table-view-cell mui-media list-li'>"+
	    						"<div class='mui-slider-right mui-disabled'>"+
	    							"<a class='mui-btn mui-btn-grey mui-icon' onclick='exit("+this.rid+")'>编辑</a>"+
	    							"<a class='mui-btn mui-btn-yellow mui-icon' onclick='assess("+this.rid+")'>评估</a>"+
	    							"<a class='mui-btn mui-btn-red mui-icon' onclick='del("+this.rid+")'>删除</a>"+
	    						"</div>"+
	    						"<div class='mui-slider-handle' onclick='list("+this.rid+")'>"+
	    						"	<p style='position: absolute;right: 0;'>"+status+"</p>"+
	    							"<div class='mui-table-cell'>"+
	    								"<div class='mui-media-body'>"+
	    									"<span>产品编码 </span>"+this.coding+
	    									"<p>安装人："+this.moperator+"</p>"+
	    								"<p style='width: 200px;' class='mui-ellipsis'>"+this.address+"</p>"+
	    								"</div>"+
	    							"</div>"+
	    							"<p style='position: absolute;margin-top: -20px;right: 0;'>"+this.installationtime+"</p>"+
	    						"</div>"+
	    			"</li>");
	    		});
	    	}else{
				$("#message").show();
	    		$("#message").html("无数据");
			}
	    },
	    error: function(xhr, type, errorThrown) {
	        mui.alert('服务器连接超时，请稍后再试');
	    }
	});
}