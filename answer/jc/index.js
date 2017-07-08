//分享链接
var mainVar={},userInfo={},DO=document,DB=document.body,winW=window.innerWidth,winH=window.innerHeight;
var url = window.location.href;
var productName = '中国新富人群洞察报告';
var productImg = getRootPath() + "/img/logo.png";
var productDesc = '《中国新富人群洞察报告》，有“财花”的最新标准！';
var curIndex=0;
var appid = "wxa7018ce027ce9f16";




$(function() {

mainVar.box=mainBox;
//倒计时
mainVar.num=30;



loadImg();
mainVar.dialog=new confirmAlert()
//这个是禁止页面上下滑动露出微信的黑色背景
// $('body').on('touchmove touchstart', function (event) { 
// 	event.preventDefault(); 
// });
stopWXPageMove()
function stopWXPageMove(){
	var overscroll = function(el) {
	  	el.addEventListener('touchstart', function() {
		    var top = el.scrollTop
			    , totalScroll = el.scrollHeight
			    , currentScroll = top + el.offsetHeight;
			    //If we're at the top or the bottom of the containers
			    //scroll, push up or down one pixel.
			    //
			    //this prevents the scroll from "passing through" to
			    //the body.
			    if(top === 0) {
			      el.scrollTop = 1;
			    } else if(currentScroll === totalScroll) {
			      el.scrollTop = top - 1;
			    }
		  	});
		  el.addEventListener('touchmove', function(evt) {
		    //if the content is actually scrollable, i.e. the content is long enough
		    //that scrolling can occur
		    if(el.offsetHeight < el.scrollHeight)
		      evt._isScroller = true;
		  });
	}
	overscroll(document.querySelector('.loading_div'));
	document.body.addEventListener('touchmove', function(evt) {
		 //In this case, the default behavior is scrolling the body, which
		 //would result in an overflow.  Since we don't want that, we preventDefault.
		if(!evt._isScroller) {
		    evt.preventDefault();
		}
	});
}
var bgMusic = document.getElementById("buy_music");
	document.addEventListener("WeixinJSBridgeReady", function () {
		WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
			bgMusic.play();
		});
}, false);
	bgMusic.volume=0.7
//背景音
$("#sound_control").bind('touchstart', function() {
	if($(this).hasClass("clockwise-rotate")) {
		$("#sound_img").attr("src", "img/sounds_02.png");
		$("#sound_control").removeClass("clockwise-rotate").addClass("clockwise-pause");
		bgMusic.pause();
	} else {
		$("#sound_img").attr("src", "img/sounds_01.png");
		$("#sound_control").removeClass("clockwise-pause").addClass("clockwise-rotate");
		bgMusic.play();
	}
});
//星星闪
pageOneStarAdd()
function pageOneStarAdd(){
	var ani='twinkling'
	$.each($(".slide_page_1 .star"),function(index,item){
		setTimeout(function(){
			ani=ani=='twinkling'?'twinkling1':'twinkling'
			$(".slide_page_1 .star"+(index+1)).addClass(ani)
		},300)
	})
}

$(".page_2_btn").bind('click',function(){
	if(!$(".clock_dialog").length){
		btn_music.src='media/btn.mp3'
		btn_music.volume=0.9
		btn_music.play();

		mainVar.dialog.clock()
	}
})








//滑动
slideFun()
function slideFun(){
	var pageNum = $(".slide_page").length;
	var clientHeight = document.body.clientWidth;
	var el = document.querySelector('.slide_div');
	var startPosition, endPosition;
	var deltaY = 0;
	
	el.addEventListener('touchstart', function (e) {
		deltaY=0;
        var touch = e.touches[0];
        startPosition = {
            y: touch.pageY
        }
    });
    el.addEventListener('touchmove', function (e) {
        var touch = e.touches[0];
        endPosition = {
            y: touch.pageY
        }
        deltaY = endPosition.y - startPosition.y;
    });
    el.addEventListener('touchend', function (e) {
        
		if(/*startPosition.y < (clientHeight * 0.4) && */deltaY > 10) {
			//上一页
			if(curIndex == 0) {
				return;
			} else {
				curIndex--;
				console.info("curIndex -- ");
				$(".slide_page_" + (curIndex + 1)).removeClass("hide").addClass("moveFromTop").addClass("current");
				$(".slide_page_" + (curIndex + 2)).addClass('moveToBottom');
				
				$(".slide_page_" + (curIndex + 2)).on('webkitAnimationEnd', function() {
	                $(".slide_page_" + (curIndex + 1)).removeClass('moveFromTop');
	                $(".slide_page_" + (curIndex + 2)).removeClass('moveToBottom').removeClass('current').addClass('hide');
	                $(".slide_page_" + (curIndex + 2)).off('webkitAnimationEnd');
	            });
			}
		} else if(/*startPosition.y > (clientHeight * 0.75) && */deltaY < -10) {
			//下一页
			if(curIndex == (pageNum - 1)) {
				return;
			} else {
				curIndex++;
				$(".slide_page_" + curIndex).addClass('moveToTop').removeClass('moveFromBottom');
           		$(".slide_page_" + (curIndex + 1)).removeClass('hide').addClass('moveFromBottom').addClass('current');
            	$(".slide_page_" + curIndex).on('webkitAnimationEnd', function() {
                	$(".slide_page_" + curIndex).removeClass('moveToTop').removeClass('current').addClass('hide');
                	$(".slide_page_" + (curIndex + 1)).removeClass('moveFromBottom');
                	$(".slide_page_" + curIndex).off('webkitAnimationEnd');
            	});
            	
			}
		}
    });
    $(".next_page").bind("touchend", function() {
    	if(curIndex == (pageNum - 1)) {
				return;
		} else {
			curIndex++;
			console.info("curIndex ++ ");
			$(".slide_page_" + curIndex).addClass('moveToTop').removeClass('moveFromBottom');
       		$(".slide_page_" + (curIndex + 1)).removeClass('hide').addClass('moveFromBottom').addClass('current');
        	$(".slide_page_" + curIndex).on('webkitAnimationEnd', function() {
            	$(".slide_page_" + curIndex).removeClass('moveToTop').removeClass('current').addClass('hide');
            	$(".slide_page_" + (curIndex + 1)).removeClass('moveFromBottom');
            	$(".slide_page_" + curIndex).off('webkitAnimationEnd');
        	});
		}
    });
}

	




var nonce = getNonceStr();
var timeStamp = new Date().getTime();
var jsapi_ticket = getTicket();
var signStr = hex_sha1("jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonce + "&timestamp=" + timeStamp + "&url=" + window.location.href);
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appid, // 必填，公众号的唯一标识
    timestamp: timeStamp, // 必填，生成签名的时间戳
    nonceStr: nonce, // 必填，生成签名的随机串
    signature: signStr,// 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQZone','onMenuShareWeibo','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});




//加载图片
function loadImg() {
	var imageUrls = [];
	$(".slide_div").find("img").each(function() {
		imageUrls.push($(this).attr("src"));
	});
	
	var loadedImages = 0;
	var imgNumber = imageUrls.length;
	if(imgNumber == 0) {
		imgNumber = 1;
	}

	$('.slide_div').imagesLoaded(function() {
		setTimeout(function() {
			$("#loading").addClass("moveToTop");
			$(".slide_div").show();
			$(".slide_page_1").show().addClass("moveFromBottom").one("webkitAnimationEnd animationend", function () {
				$(".slide_page_1").removeClass("moveFromBottom");
				$("#loading").remove();
			});
		}, 500);
	}).progress(function(instance, image) {
		loadedImages++;
		var persent = Math.ceil(loadedImages / imgNumber * 100);
		$(".load3").find("span").html(persent + "%");
	});
}





//倒计时
mainVar.dialog.extend('clock',function($num){
    var CSS='\
        .clock_dialog{width:100%;height:100%;overflow:hidden;position:relative;}\
        .clock_dialog .clock_pan{width:4.25em;height:4.25em;background-size:100% 100%;background-image:url(img/clock_pan.png);position:absolute;top:3.45em;left:50%;-webkit-transform:translateX(-50%);line-height:4.25em;text-align:center;}\
        .clock_dialog .clock_pan .clock_zhen{width:0.3em;height:2.68em;position:absolute;top:-0.7em;left:51%;-webkit-transform:translateX(-50%);}\
        .clock_dialog .clock_pan b{font-size:1.9em;font-weight:700;color:#fff;position:relative;z-index:2;}\
        .clock_dialog .clock_fly{width:1.3em;height:0.8em;position: absolute;top:3.06em;left:0.55em;}\
        .clock_dialog .clock_left{width:2.33em;height:3.05em;position:absolute;top:6.03em;left:0.46em;}\
        .clock_dialog .clock_right{width:0.66em;height:0.69em;position:absolute;top:3.8em;right:0.4em;}\
        .clock_dialog .clock_rightb{width:0.8em;height:0.42em;position:absolute;top:8.45em;right:0.85em;}\
        .clock_dialog .clock_ball{width:1.03em;height:0.7em;position:absolute;top:7em;right:0.32em;}\
        .clock_dialog .clock_star_1{width:0.43em;height:0.39em;position:absolute;top:2.7em;right:1.14em;}\
        .clock_dialog .clock_star_2{width:0.23em;height:0.27em;position:absolute;top:1.6em;left:1.89em;}\
        .clock_dialog .clock_star_3{width:0.23em;height:0.27em;position:absolute;top:8.69em;left:1.66em;}\
        .clock_dialog .clock_star_4{width:0.23em;height:0.27em;position:absolute;top:7.76em;right:1.3em;}\
        '
    if(!this.temporary.css['clock']){
        setStyle(CSS);
        this.temporary.css['clock']=true;
    };
    setTimeout(function(){
    	bgMusic.pause();
    	$(".clock_tit").removeClass('hide');
    	clock_music.play();
    },300)
    var html,timer=null,num=$num||5
		html='<div class="clock_dialog black">\
			<div class="clock_pan">\
				<img src="img/clock_zhen.png" class="clock_zhen">\
				<b id="five_num">'+num+'</b>\
			</div>\
			<img src="img/clock_fly.png" class="clock_fly twinkling">\
			<img src="img/clock_left.png" class="clock_left">\
			<img src="img/clock_right.png" class="clock_right">\
			<img src="img/clock_rightb.png" class="clock_rightb">\
			<img src="img/clock_ball.png" class="clock_ball swing_left_right">\
			<img src="img/clock_star.png" class="clock_star_1 clockwise-rotate">\
			<img src="img/clock_star2.png" class="clock_star_2">\
			<img src="img/clock_star2.png" class="clock_star_3 flytoleft">\
			<img src="img/clock_star.png" class="clock_star_4">\
		</div>'
    this.open({
         name:'clock'
        ,html:html
        ,bgClose:0
        ,bgColor:0
        ,dialogClose:0
        ,fun:function(){
        	if(timer)clearInterval(timer)
        	timer=setInterval(function(){
        		num--;
        		five_num.innerHTML=num;
        		if(num<=0){
        			clock_music.pause();

        			clearInterval(timer)
        		}
        	},1000) 
        }
        ,openFunTime:400
        ,animate:'moveFromBottom'
        ,closeFun:function(){}
        ,closeFunTime:300
        ,closeAnimate:'movetobottom'
        ,deldialogTime:0
    })
})

//最新弹窗3.0（改版关闭弹窗逻辑）
function confirmAlert(){
	var _this=this,temporary={'css':{},"options":{}},bgBox,wBox=mainVar.box||document.body,isColor=false,isFirstDom=null,confirmBox=null,dialogCon={},closeFlag=true;
	
	this.example=function($num){
        var CSS='\
        .example_dialog{width:6.2em;border-radius:0.1em;background-color:#f0f0f0;position:absolute;top:50%;left:50%;margin-top:-2.88em;margin-left:-3.1em;padding-bottom:1.4em;}\
        '
        if(!this.temporary.css['example']){
            setStyle(CSS);
            this.temporary.css['example']=true;
        };
        var html='<div class="example_dialog"></div>'
        this.open({
             name:'example'						//名称（必填）
            ,html:html 							//内容
            ,bgClose:1							//点击背景关闭（0，1）
            ,bgColor:1							//背景颜色（0，1）
            ,dialogClose:0						//点击弹窗本身关闭（0，1）
            ,fun:function(){}					//open后的回调函数
            ,openFunTime:400					//执行open回调的时间点（延迟）
            ,animate:'slideInRight'				//open弹窗的动画效果（有默认）
            ,closeFun:function(){mainVar.dialog.example()}				//close回调函数
            ,closeFunTime:300					//执行close回调的时间点（延迟）
            ,closeAnimate:'slideOutRight'		//close弹窗的动画效果（有默认）
            ,deldialogTime:0
        })  
    }
	this.btnAnimation=function(elem){
		elem.classList.add('but_animation');
		elem.addEventListener('webkitAnimationEnd',function(){
			elem.classList.remove('but_animation');
		},false);
	};
	this.init=function(){
		var css='\
		.confirmBox_dialog_grt{display:none;width:100%;height:100%;position:absolute;top:0;left:0;z-index:100;}\
		.confirm_Dialog_Box{width:100%;height:100%;position:absolute;top:0;left:0;z-index:100;}\
		.confirm_Dialog_Box .content_Dialog_Box{width:100%;height:100%;opacity:1;}\
		.confirm_Dialog_Box b{vertical-align:top;}\
		.but_animation{-webkit-transform:scale(1);-webkit-animation:but_animation 600ms ease 1}\
		@-webkit-keyframes but_animation{\
		  0%{-webkit-transform:scale(.9);}\
		  50%{-webkit-transform:scale(1.1)}\
		  100%{-webkit-transform:scale(1)}\
		}\
		@-webkit-keyframes slideInRight {0% {opacity:1;transform: translate3d(100%, 0, 0);visibility: visible;}100% {opacity:1;transform: translate3d(0, 0, 0);}}\
        @-webkit-keyframes slideOutRight {from {opacity:1;transform: translate3d(0, 0, 0);}to {opacity:1;visibility: hidden;transform: translate3d(100%, 0, 0);}}\
        .slideInRight {animation-name: slideInRight;animation-duration: 300ms;animation-fill-mode: both;}\
        .slideOutRight {animation-name: slideOutRight;animation-duration: 400ms;animation-fill-mode: both;}\
		.dialog-in-1{-webkit-animation:dialog-in-1 400ms ease-out forwards;}\
		@-webkit-keyframes dialog-in-1{\
		      0% {-webkit-transform:scale(0,0);opacity:0;}\
		    60% {-webkit-transform:scale(1.2,1.2);}\
		   100% {-webkit-transform:scale(1,1);opacity:1;}\
		}\
		.dialog-out-1{-webkit-animation:dialog-out-1 300ms ease-in forwards;}\
		@-webkit-keyframes dialog-out-1{\
			   0% {-webkit-transform:scale(1,1);opacity:1;}\
			  40% {-webkit-transform:scale(1.2,1.2);}\
			 100% {-webkit-transform:scale(0,0);opacity:0;}\
		}\
		@media screen and (min-width:320px) and (max-width:359px){\
			.confirm_Dialog_Box{font-size:50px;}\
		}\
		@media screen and (min-width:360px) and (max-width:374px){\
			.confirm_Dialog_Box{font-size:56.25px;}\
		}\
		@media screen and (min-width:375px) and (max-width:413px){\
			.confirm_Dialog_Box{font-size:58.5938px;}\
		}\
		@media screen and (min-width:414px){\
			.confirm_Dialog_Box{font-size:64.6875px;}\
		}\
		'
		setStyle(css)
		confirmBox=createNode(wBox,'div',{className:'confirmBox_dialog_grt'},'p3')
		this.eventEntrust({ele:confirmBox,event:'click',fun:function(e){
			var $acton=arguments[0],$t=this
			switch($acton){
                case 'close-dialog':
                	mainVar.dialog.close({'t':$t,'name':arguments[1],'animate':arguments[2]})
                break;
                case 'close-dialog-demo':
                	mainVar.dialog.close({'t':$t,'name':arguments[1],'animate':arguments[2]})
                break;
			}
		}})
		_this.temporary=temporary
	}
	this.open=function($opt){
		var opt=$opt||{},bgColor=opt.bgColor||0,bgClose=opt.bgClose||0,dialogClose=opt.dialogClose||0,html=opt.html||"",contentBox,bgCss='',name=opt.name||'dialog-grt',ele=confirmBox,selfbg=opt.selfbg||false,fun=opt.fun,animate=opt.animate||'dialog-in-1',openFunTime=opt.openFunTime||300,closeAnimate=opt.closeAnimate||""
		ele.style.display='block';
		bgBox=createNode(ele,'div',{className:'confirm_Dialog_Box',action:(bgClose?'close-dialog.,'+name+'.,'+closeAnimate:'')},'p3')
		contentBox=createNode(bgBox,'div',{className:'content_Dialog_Box '+animate,html:html},'p3')
		if(!dialogCon[name]){
			dialogCon[name]=[contentBox]
		}else{
			dialogCon[name].unshift(contentBox)
		}
		if(!_this.temporary["options"][name]){
			_this.temporary["options"][name]=[opt]
		}else{
			_this.temporary["options"][name].unshift(opt)
		}
		if(!isFirstDom){isFirstDom=bgBox}
		if(bgColor&&!isColor){confirmBox.style.backgroundColor='rgba(0,0,0,.7)';isColor=true;}
		if(selfbg&&!isColor){bgBox.style.backgroundColor='rgba(0,0,0,.7)'}
		if(dialogClose){
			contentBox.children[0].setAttribute('action','close-dialog.,'+name+'.,'+closeAnimate);
		}else{
			if(bgClose)contentBox.children[0].setAttribute('action',name+"-00");
		}
		setTimeout(function(){//回调函数
			isFun(fun)
		},openFunTime)
	}
	this.close=function($opt){
		if(!closeFlag){closeFlag=true;return;}closeFlag=false;
		var opt=$opt||{},ele=opt.t,name=opt.name,c,openOption,thisCloseOpt,finalAnimate=opt.animate,finalFunction=opt.fun,finalDelTime=opt.delTime,finalFunctionTime=opt.closeTime
		if(name){
			openOption=temporary["options"][name]||[];
			thisCloseOpt=openOption[0]?openOption.shift():{}
			finalAnimate=finalAnimate?finalAnimate:(thisCloseOpt['closeAnimate']||'dialog-out-1');
			finalFunction=finalFunction?finalFunction:(thisCloseOpt['closeFun']||function(){});
			finalFunctionTime=finalFunctionTime?finalFunctionTime:(thisCloseOpt['closeFunTime']||300);
			finalDelTime=finalDelTime?finalDelTime:(thisCloseOpt['deldialogTime']||400);
			if(dialogCon[name]){
				c=dialogCon[name].shift();
				if(c)c.className='content_Dialog_Box '+finalAnimate
				setTimeout(function(){
					closeFlag=true
		    		var p=c?c.parentNode:false
		    		if(p===isFirstDom){
		    			isColor=false;
		    			isFirstDom=null;
		    		}
		    		if(p)removeNode(p)
		    		if(confirmBox.childElementCount==0){
		    			confirmBox.style.backgroundColor='rgba(0,0,0,0)'
		    			confirmBox.style.display='none'
		    		}
		    	},(finalDelTime||400))
			}else{
				closebyele()
			}
			closeActionFun()
		}else{
			closebyele()
			closeActionFun()
		}
		function closebyele(){//关闭弹窗（没有name情况，最好都加上name）
			if(ele.setAttribute)ele.setAttribute('action','')
			do{
				if(ele.nodeType!==1)break;
			    if(ele.className.indexOf('content_Dialog_Box')>=0)break; 
			}while(ele=ele.parentNode)
			ele.className='content_Dialog_Box '+(finalAnimate||'dialog-out-1')
			setTimeout(function(){
	    		closeFlag=true
	    		var p=ele.parentNode
	    		if(p===isFirstDom){
	    			isColor=false;
	    			isFirstDom=null;
	    		}
	    		if(p)removeNode(p)
	    		if(confirmBox.childElementCount==0){
	    			confirmBox.style.backgroundColor='rgba(0,0,0,0)'
	    			confirmBox.style.display='none'
	    		}
	    	},(finalDelTime||400))
		}
		function closeActionFun(){//执行回调函数
			setTimeout(function(){
				isFun(finalFunction)
			},(finalFunctionTime||300))
		}
	}//事件代理
	this.eventEntrust=function($opt){
		var ele=$opt.ele,
			event=$opt.event,
			action=$opt.action||"action",
			split=$opt.splitStr||".,";
		addEvent(ele,event,function(e){
			var ele=e.srcElement||e.target,
				attribute,
				argument,
				a1,
				fun=typeof($opt.fun)==="function"?$opt.fun:function(){};	
			do{
				if(ele.nodeType!==1)break
				if(attribute=ele.getAttribute(action))break			
				}
			while(ele=ele.parentNode);								
			if(attribute){						
				fun.apply(ele,attribute.split(split))
			}			
		});	
	};
	this.extend=function($name,$fun){
		if(!$name){
			alert('添加函数失败')
			return
		}
		_this[$name]=$fun
	}
	this.init();
}



});

