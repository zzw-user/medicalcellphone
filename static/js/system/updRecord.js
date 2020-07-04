mui.init();
mui.plusReady(function() {

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
		mui.ajax(localStorage.getItem('adminurl') + '/zInstallrecord/getRecordOne', {
			data: {
				rid: rid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 15000, //超时时间设置为10秒；
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
				$("#rid").val(e.rid);
				$("#operator").val(e.operator);
				$("#coding").val(e.coding);
				$("#address").val(e.address);
				$("#installationtime").val(e.installationtime);
				document.getElementById("prePhotos2").src = beforeinstallation;
				document.getElementById("sufPhotos2").src = afterinstallation;
				var status = $("input[name='status']");
				for (var i = 0; i < status.length; i++) {
					if (e.status == status[i].value) {
						status[i].checked = true;
					}
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.alert('服务器连接超时，请稍后再试');
			}
		});
	});
	mui.post(localStorage.getItem('adminurl') + '/zInstallrecord/getMpuser', {

	}, function(data) {
		$("#operator").append("<option value='0'>请选择</opton>")
		$(data).each(function() {
			$("#operator").append("<option value='" + this.mpid + "'>" + this.realname + "</opton>")
		})
	}, 'json');
})
//获取时间
function getDate() {
	var dDate = new Date();
	var minDate = new Date();
	minDate.setFullYear(2000, 0, 1);
	var maxDate = new Date();
	maxDate.setFullYear(2020, 11, 31);
	plus.nativeUI.pickDate(
		function(e) {
			var d = e.date;
			document.getElementById("installationtime").value = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			// mui.toast('您选择的时间是：' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日');
		},
		function(e) {
			mui.toast('请选择')
		}, {
			title: '请选择',
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		}
	)
};
var regexImageFiler;
var imgReaderl = new FileReader();
regexImageFiler = /^(?:image\/bmp|image\/png|image\/jpeg|image\/jpg|\/gif)$/i;
imgReaderl.onload = function(evt) {
	$("#prePhotos2").attr("src", evt.target.result);
}
$("#prePhotos").change(function() {
	var imgfFile = $("#prePhotos").prop("files")[0];
	if (!regexImageFiler.test(imgfFile.type)) {
		mui.toast("选择有效图片");
	}
	imgReaderl.readAsDataURL(imgfFile);
})

var imgReader2 = new FileReader();
imgReader2.onload = function(evt) {
	$("#sufPhotos2").attr("src", evt.target.result);
}
$("#sufPhotos").change(function() {
	var imgfFile = $("#sufPhotos").prop("files")[0];
	if (!regexImageFiler.test(imgfFile.type)) {
		mui.toast("选择有效图片");
	}
	imgReader2.readAsDataURL(imgfFile);
});

// function Image(obj){
// 	var editButtons = new Array();
// 	editButtons.push({title:"拍照上传",style:"default"});
// 	editButtons.push({title:"从相册选择",style:"default"});
// 	plus.nativeUI.actionSheet( {
// 		cancel:"取消",
// 		buttons:editButtons
// 	}, function(e){
// 		var index = e.index;
// 		switch (index){
// 			case 1:
// 				captureImage(obj);//拍照
// 				break;
// 			case 2:
// 				selectImage(obj);//相册选择
// 				break;
// 		}
// 	});
// };
// //拍照
// function captureImage(obj){
// 	var cmr = plus.camera.getCamera(2);
// 	cmr.captureImage(
// 		function(path){
// 			//将图片地址转换
// 			plus.io.resolveLocalFileSystemURL(path , function(entry){
// 				var newPath = entry.toLocalURL() + "?version=" + Math.random();
// 				loadImage(obj,newPath);
// 			});
// 		},
// 		function(error){
// 			mui.toast(error.message);
// 		},
// 		{
// 			filename: "_documents/"
// 		}
// 	);

// }

// //选择图片
// function selectImage(obj){
// 	plus.gallery.pick(function(path){
// 		loadImage(obj,path);
// 	}, function(e){
// 		mui.toast("没有选择图片.");
// 	});
// }

// //确定选择图片
// function loadImage(obj,path){
// 	obj.src = path;
// 	if(window.imageDisable == true){
// 		obj.cropper("enable");
// 	}
// 	obj.cropper("replace" , path);
//  };
function submit() {
	var operator =$("#operator").val();
	var address =$("#address").val();
	var installationtime =$("#installationtime").val();
	if (operator == 0) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#operator').focus();
		});
		return false;
	}
	if (address == "" || address == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#address').focus();
		});
		return false;
	}
	if (installationtime == "" || installationtime == null) {
		mui.alert('必填项，不能为空', '系统提示', function() {
			$('#installationtime').focus();
		});
		return false;
	}
	var statusinput = $("input[name='status']");
	var status;
	for (var i = 0; i < statusinput.length; i++) {
		if (statusinput[i].checked) {
			status=statusinput[i].value;
		}
	}
	var formData = new FormData();
	formData.append("rid", $("#rid").val());
	formData.append("operator", $("#operator").val());
	formData.append("coding", $("#coding").val());
	formData.append("status",status);
	formData.append("file", $("#prePhotos")[0].files[0]);
	formData.append("filetwo", $("#sufPhotos")[0].files[0]);
	formData.append("address",  $("#address").val());
	formData.append("time", $("#installationtime").val());
	mui.ajax(localStorage.getItem('adminurl') + '/zInstallrecord/updRecordImg',{
	    data:formData,
	    dataType: 'json', //服务器返回json格式数据
	        type: 'post', //HTTP请求类型
	        timeout: 150000, //超时时间设置为15秒；
			processData: false,
			contentType: false,
	    beforeSend: function() {
	        showLoading();
	    },
	    complete: function() {
	        hideLoading();
	    },
	    success: function(e) {
	      if(e){
	      	mui.toast("修改完成！");
	      }else{
	      	mui.toast("修改失败！"); 
	      }
	    },
	    error: function(xhr, type, errorThrown) {
	        mui.alert('服务器连接超时，请稍后再试');
	    }
	});
}
