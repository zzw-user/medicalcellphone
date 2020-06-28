mui.init();

function retrun() {
	window.history.go(-1);
}
mui.plusReady(function() {
	var data = plus.webview.currentWebview();
	mui.toast(data.id);
})

function getAddress() {
	var dealerid = $("input[name='dealerid']").val();
	window.location.href = "https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=跳转的链接&key=应用的KEY&referer=应用名称";
}
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

