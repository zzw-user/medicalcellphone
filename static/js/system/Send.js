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
		select({aftertype:1});
	}else{
		select({address:data,aftertype:1});
	}
　　　　mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
　　}, 1500);
}
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
function addUpkeep() {
	mui.openWindow({
		url: 'addSend.html',
		id: 'systemaddSend'
	});
}
function exit(id) {
	mui.openWindow({
		url: 'updSend.html',
		id: 'systemupdSend',
		extras: {
			did: id
		}
	});
}
function record() {
	mui.openWindow({
		url: 'Record.html',
		id: 'systemRecord'
	});
};
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
// 搜索事件,获取搜索关键词
function enterSearch(event) {
	if (event.keyCode == 13) { //用户点击回车的事件号为13
		var keyword = document.getElementById('searchInput').value;
		var param={address:keyword,aftertype:1};
		select(param);
	}
}
function details() {
	mui.openWindow({
		url: 'payReturn.html',
		id: 'payReturn'
	});
}
function list(id) {
	mui.ajax(localStorage.getItem('adminurl')+'/zDelivery/getDeliveryOne',{
	    data:{
			did:id
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
	        $("#content").html("");
	        $("#content").append("<div class='mui-card'>"+
	        			"<div class='mui-card-header'>"+e.coding+"</div>"+
	        			"<div class='mui-card-content'>"+
	        				"<div class='mui-card-content-inner'>"+
	        					e.address+
	        				"</div>"+
	        			"</div>"+
	        			"<div class='mui-card-footer'>"+
	        				"<P>"+e.deliverytime+"</P>"+
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
function del(id){
	mui.confirm('确定要删除此数据吗，确认？', 'Hello MUI', ['取消','确认'], function(e) {
		if (e.index == 1) {
			mui.ajax(localStorage.getItem('adminurl')+'/zDelivery/delDelivery',{
			    data:{
					did:id
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
						var data =document.getElementById("searchInput").value;
						if(data=="" || data==null){
							select({aftertype:1});
						}else{
							select({address:data,aftertype:1});
						}
						mui.toast("删除成功！");
			        	// index=$(this).parents(".list-li").index();
			        	// $(".list-li").eq(index-1).remove();
			        	
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
	select({aftertype:1});
})
function select(param){
	mui.ajax(localStorage.getItem('adminurl')+'/zDelivery/getDelivery',{
	    data:param ,
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
	        		$("#ul").append("<li class='mui-table-view-cell mui-media list-li'>"+
	        					"<div class='mui-slider-right mui-disabled'>"+
	        						"<a class='mui-btn mui-btn-grey mui-icon' onclick='exit("+this.did+")'>编辑</a>"+
	        						"<a class='mui-btn mui-btn-red mui-icon' onclick='del("+this.did+")'>删除</a>"+
	        					"</div>"+
	        					"<div class='mui-slider-handle' onclick='list("+this.did+")'>"+
	        						"<div class='mui-table-cell'>"+
	        							"<div class='mui-media-body'>"+
	        								"<span>产品编码</span>"+this.coding+
	        								"<p>安装人："+this.moperator+"</p>"+
	        							"<p style='width: 200px;' class='mui-ellipsis'>"+this.address+"</p>"+
	        							"</div>"+
	        						"</div>"+
	        						"<p style='position: absolute;margin-top: -20px;right: 0;'>"+this.deliverytime+"</p>"+
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