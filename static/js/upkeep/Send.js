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

function exit() {
	mui.openWindow({
		url: 'updSend.html',
		id: 'updSend',
		extras: {
			id: 1
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
	}
}

function details() {
	mui.openWindow({
		url: 'payReturn.html',
		id: 'payReturn'
	});
}
function list(id){
	mui.toast(id);
	mui("#popover").popover('toggle', document.getElementById("div"));
}

