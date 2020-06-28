mui.init();
mui('.mui-content .mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

function addUpkeep() {
	mui.openWindow({
		url: 'addPayReturn.html',
		id: 'addPayReturn'
	});
}

function exit() {
	mui.openWindow({
		url: 'updPayReturn.html',
		id: 'updPayReturn',
		extras: {
			pid: 1
		}
	});
}

function home() {
	mui.openWindow({
		url: '../Index.html',
		id: 'cost'
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
		var param={address:$("#searchInput").value};
		select(param);
	}
}
function list(id) {
	// $.ajax({
	// 	url: 'http://127.0.0.1:8081/zDelivery/getDeliveryOne',
	// 	type: 'post',
	// 	dataType: 'json',
	// 	data:{pid:id},
	// 	success: function(e) {
			// $("#ul").append(
			// "<div class='mui-card'>"+
			// 	"<div class='mui-card-header'>"+e.pname+"</div>"+
			// 	"<div class='mui-card-content'>"+
			// 		"<p style='left: 0;'>回访方式："+e.way+"</p>"+
			// 		"<div class='mui-card-content-inner'>"+e.describe +
			// 		"</div>"+
			// 	"</div>"+
			// 	"<div class='mui-card-footer'>"+
			// 		"<P>"+e.writetime+"</P>"+
			// 		"<P>"+e.moperator+"</P>"+
			// 	"</div>"+
			// "</div>"
			// );
	// 	}
	// })
	mui("#popover").popover('toggle', document.getElementById("div"));
}
function del(id){
	mui.toast(id);
	mui.confirm('确定要删除此数据吗，确认？', 'Hello MUI', ['取消','确认'], function(e) {
		if (e.index == 1) {
			
			// $.ajax({
			// 	url: 'http://127.0.0.1:8081/zDelivery/delDelivery',
			// 	type: 'post',
			// 	dataType: 'json',
			// 	data:{pid:id},
			// 	success: function(e) {
			// 		if(e){
			//  		mui.toast("删除成功！");
			// 			index=$(this).parents(".list-li").index();
			// 			$(".list-li").eq(index-1).remove();
			// 		}else{
			// 			mui.toast("删除失败！");
			// 		}
			// 	}
			// })
		}
	})
}
$(function(){
	select(null);
})
function select(param){
	$.ajax({
		url: 'http://127.0.0.1:8081/zDelivery/getDelivery',
		type: 'post',
		dataType: 'json',
		data:param,
		success: function(e) {
			$(e).each(function(){
				$("#ul").append("<li class='mui-table-view-cell mui-media list-li'>"+
							"<div class='mui-slider-right mui-disabled'>"+
								"<a class='mui-btn mui-btn-grey mui-icon' onclick='exit("+this.pid+")'>编辑</a>"+
								"<a class='mui-btn mui-btn-red mui-icon' onclik='del("+this.pid+")'>删除</a>"+
							"</div>"+
							"<div class='mui-slider-handle' onclick='list("+this.pid+")'>"+
								"<div class='mui-table-cell'>"+
								"<div class='mui-media-body'>"+
									"<span>回访客户：</span>"+this.pname+
									"<p>回访方式："+this.way+"</p>"+
									"<p style='width: 200px;' class='mui-ellipsis'>"+this.describe+"</p>"+
								"</div>"+
							"</div>"+
							"<p style='position: absolute;margin-top: -20px;right: 0;'>"+this.writetime+"</p>"+
							"</div>"+
				"</li>");
				});
		}
	})
}