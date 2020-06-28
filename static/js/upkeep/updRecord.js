mui.init();
mui.plusReady(function () {
    
})
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

function list(id) {
	mui.toast(id);
	mui("#popover").popover('toggle', document.getElementById("div"));
};
// 搜索事件,获取搜索关键词
function enterSearch(event) {
	if (event.keyCode == 13) { //用户点击回车的事件号为13
		var keyword = document.getElementById('searchInput').value;
		mui.toast(keyword);
	}
};

function retrun() {
	window.history.go(-1);
};

function getDate() {
	var dDate = new Date();
	var minDate = new Date();
	minDate.setFullYear(1990, 0, 1);
	var maxDate = new Date();
	maxDate.setFullYear(2100, 11, 31);
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
};
function Image(){
mui.toast("图片");
}