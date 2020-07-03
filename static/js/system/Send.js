mui.init();
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
function addUpkeep() {
	mui.openWindow({
		url: 'addSend.html',
		id: 'addSend'
	});
}
function exit(id) {
	mui.openWindow({
		url: 'updSend.html',
		id: 'updSend',
		extras: {
			did: id
		}
	});
}
function record() {
	mui.openWindow({
		url: 'Record.html',
		id: 'Record'
	});
};
function send() {
	mui.openWindow({
		url: 'Send.html',
		id: 'Send'
	});
};
function cost() {
	mui.openWindow({
		url: 'cost.html',
		id: 'cost'
	});
};
function home() {
	mui.openWindow({
		url: '../Index.html',
		id: 'cost'
	});
}
function payReturn() {
	mui.openWindow({
		url: 'payReturn.html',
		id: 'payReturn'
	});
}
// 搜索事件,获取搜索关键词
function enterSearch(event) {
	if (event.keyCode == 13) { //用户点击回车的事件号为13
		var keyword = document.getElementById('searchInput').value;
		mui.toast(keyword);
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
	$.ajax({
		url: 'http://127.0.0.1:8080/zDelivery/getDeliveryOne',
		type: 'post',
		dataType: 'json',
		data:{did:id},
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
		}
	})
	mui("#popover").popover('toggle', document.getElementById("div"));
}
function del(id){
	mui.toast(id);
	mui.confirm('确定要删除此数据吗，确认？', 'Hello MUI', ['取消','确认'], function(e) {
		if (e.index == 1) {
			
			$.ajax({
				url: 'http://127.0.0.1:8080/zDelivery/delDelivery',
				type: 'post',
				dataType: 'json',
				data:{did:id},
				success: function(e) {
					if(e){
			 		mui.toast("删除成功！");
						// index=$(this).parents(".list-li").index();
						// $(".list-li").eq(index-1).remove();
						var data =document.getElementById("searchInput").value;
						if(data=="" || datae==null){
							select({aftertype:1});
						}else{
							select({address:data,aftertype:1});
						}
					}else{
						mui.toast("删除失败！");
					}
				}
			})
		}
	})
}
$(function(){
	select({aftertype:1});
})
function select(param){
	$.ajax({
		url: 'http://127.0.0.1:8080/zDelivery/getDelivery',
		type: 'post',
		dataType: 'json',
		data:param,
		success: function(e) {
			$("#ul").html("");
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
				$(".mui-scroll").append("<p style='font-size:18px;padding:20px;text-align: center;'>无数据<p>");
			}
		}
	})
}