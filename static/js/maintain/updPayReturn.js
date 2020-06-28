mui.init();

function retrun() {
	window.history.go(-1);
}
mui.plusReady(function() {
	var data = plus.webview.currentWebview();
	mui.toast(data.id);
})
