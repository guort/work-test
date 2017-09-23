wx.ready(function(){
	
	wx.onMenuShareTimeline({
	    title: productDesc, // 分享标题
	    link: url, // 分享链接
	    imgUrl: productImg, // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    	shareSuc();
	    },
	    fail: function (res) {
            showAlert("提示","分享失败");
        },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    	shareCancel();
	    }
	});
	
	wx.onMenuShareAppMessage({
	    title: productName, // 分享标题
	    desc: productDesc, // 分享描述
	    link: url, // 分享链接
	    imgUrl: productImg, // 分享图标
	    type: 'link', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    	shareSuc();
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    	shareCancel();
	    }
	});
	
	wx.onMenuShareQZone({
	    title: productName, // 分享标题
	    desc: productDesc, // 分享描述
	    link: url, // 分享链接
	    imgUrl: productImg, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    	shareSuc();
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    	shareCancel();
	    }
	});
	
	//微博
	wx.onMenuShareWeibo({
	    title: productName, // 分享标题
	    desc: productDesc, // 分享描述
	    link: url, // 分享链接
	    imgUrl: productImg, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    	shareSuc();
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    	shareCancel();
	    }
	});
	
	wx.onMenuShareQQ({
	    title: productName, // 分享标题
	    desc: productDesc, // 分享描述
	    link: url, // 分享链接
	    imgUrl: productImg, // 分享图标
	    success: function () {
	    	// 用户确认分享后执行的回调函数
	    	shareSuc();
	    },
	    cancel: function () { 
	       // 用户取消分享后执行的回调函数
	    	shareCancel();
	    }
	});
});

wx.error(function(res){
	$(".share").hide();
});

function shareSuc() {
	$(".share").hide();
}

function shareCancel() {
	$(".share").hide();
}

function getTicket() {
	var ticket = '';
	var url = "http://www.waytl.com/rich/dispatcher/app/common/ticket?appid=" + appid;
	$.ajax({
		type: "post",
		url: url,
		async: false,
		success: function(data) {
			if(data.code == '10000') {
				ticket = data.data;
			} else {
				ticket =  "";
			}
		}
	});
	return ticket;
}

//得到随机字符串
function getNonceStr() {
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var noceStr = "";
    for (i = 0; i < 32; i++) {
        noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    oldNonceStr = noceStr.toString();
    return noceStr;
}

function getRootPath() {
    //获取当前网址
    var curWwwPath = window.document.location.href;
   
    //获取主机地址之后的目录
    var pathName = window.document.location.pathname;
    
    //获取主机地址
    var pos = curWwwPath.indexOf(pathName);
    var localhostPath = curWwwPath.substring(0, pos);
    
    //获取带"/"的项目名
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    
    return (localhostPath + projectName);
}
