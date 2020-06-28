mui.init()

function retrun() {
	window.history.go(-1);
}
mui.plusReady(function() {
	var data = plus.webview.currentWebview();
	mui.toast(data.id);
})
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
