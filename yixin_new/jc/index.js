var mainVar={},userInfo={},DO=document,DB=document.body,winW=window.innerWidth,winH=window.innerHeight;
var search=getSearch();
var openid=search.openid;
var url = window.location.href;
var curIndex=0;
var scoreArr={};
var shareInfo={
	title:'',
	icon:'http://qa-h5.mtq.tvm.cn/yao/guort/yixin_new/img/share_logo_new.jpg',
	resources:location.href,
	link:location.href,
	desc:'我是搭讪界的老司机，快来试试你能答对几道题！'
};
$(function() {

mainVar.box=mainBox;
//倒计时
mainVar.num=60;
mainVar.score=0;
mainVar.slidFlag=true;

var bgMusic = document.getElementById("buy_music");
bgMusic.volume=0.6;
var sys=getOS();
if(sys!='android'){
	document.addEventListener("WeixinJSBridgeReady", function () {
		WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
				// alert('ios系统音频加载准备')
				bgMusic.play();
				setTimeout(function(){
					bgMusic.pause();
				},100)
				// score_music.play();
				// setTimeout(function(){
				// 	score_music.pause();
				// },100)
			});
	}, false);
}
loadImg();
mainVar.dialog=new confirmAlert();
mainVar.dialogBox=document.querySelector('.confirmBox_dialog_grt');
//禁止页面上下滑动露出微信的黑色背景
// stopWXPageMove()
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
	};
	overscroll(document.querySelector('.loading_div'));
	// overscroll(mainBox);
	document.body.addEventListener('touchmove', function(evt) {
		 //In this case, the default behavior is scrolling the body, which
		 //would result in an overflow.  Since we don't want that, we preventDefault.
		if(!evt._isScroller) {
		    evt.preventDefault();
		}
	});
}
	

mainBox.addEventListener('scroll',function(){
	var top=mainBox.scrollTop;
	if(top>150){
		$('.toBottom').hide();
	}else{
		$('.toBottom').show();
	}
});


	
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
function bgMusicPause(){
	$("#sound_img").attr("src", "img/sounds_02.png");
	$("#sound_control").removeClass("clockwise-rotate").addClass("clockwise-pause");
	bgMusic.pause();
}
function bgMusicPlay(){
	$("#sound_img").attr("src", "img/sounds_01.png");
	$("#sound_control").removeClass("clockwise-pause").addClass("clockwise-rotate");
	bgMusic.play();
}


function btn_music_play(){
	btn_music.src='media/btn.mp3';
	btn_music.volume=0.9;
	btn_music.play();
}
function score_music_play(){
    score_music.volume=1;
    score_music.play();
}
//背景音从头播放
function bg_music_play(){
	$("#sound_img").attr("src", "img/sounds_01.png");
	$("#sound_control").removeClass("clockwise-pause").addClass("clockwise-rotate");
	buy_music.src="media/bg.mp3";
	buy_music.play();
}

$('.share_yd_bg').bind('click',function(){
	$('.share_yd_bg').hide();
});
//滑动
slideFun();
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
        };
        deltaY = endPosition.y - startPosition.y;
    });
    el.addEventListener('touchend', function (e) {
        if(!mainVar.slidFlag){
			setTimeout(function(){
				mainVar.slidFlag=true;
			},200);
			return false;
		}
		mainVar.slidFlag=false;
		if(/*startPosition.y < (clientHeight * 0.4) && */deltaY > 10) {
			//上一页
			if(curIndex == 0) {
				return false;
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
				return false;
			} else {
				return false;
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
	    		$('.sound').show();
				bgMusicPlay();
				$('.toBottom').show();
				// mainVar.dialog.cutdown(60)
				$('.slide_div').animate({opacity:'0'},500);
				$('.ans_page').show();
				setTimeout(function(){
					removeNode($('.slide_div')[0]);
				},600);
				return false;
		} else {
			// mainVar.dialog.cutThree(3)
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
wxShare(shareInfo);
//加载图片
function loadImg() {
	var imageUrls = [];
	$(".mainbox").find("img").each(function() {
		imageUrls.push($(this).attr("src"));
	});
	
	var loadedImages = 0;
	var imgNumber = imageUrls.length;
	if(imgNumber == 0) {
		imgNumber = 1;
	}

	$('.mainbox').imagesLoaded(function() {
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
//倒计时3秒
mainVar.dialog.extend('cutThree',function($num){
	var num=$num||3,timer=null;
	bgMusicPause();
	clock_music.play();
	cutNum.innerHTML=num;
	if(timer)clearInterval(timer);
	timer=setInterval(function(){
		num--;
		cutNum.innerHTML=num;
		if(num<=0){
			clock_music.pause();
			$('.sound').show();
			bgMusicPlay();
			$('.toBottom').show();
			// mainVar.dialog.cutdown(60)
			$('.slide_div').animate({opacity:'0'},500);
			$('.ans_page').show();
			setTimeout(function(){
				removeNode($('.slide_div')[0])
			},600);
			clearInterval(timer);
		}
	},1000);
});
//全局倒计时
mainVar.dialog.extend('cutdown',function($num){
	var number=$num||30;
	mainVar.cutTimer=setInterval(function(){
		number--;
		if(number<=0){
			endFun();
			clearInterval(mainVar.cutTimer);
		}
	},1000);
	//暂停
	mainVar.pasueCutTimer=function(){
		if(mainVar.cutTimer)clearInterval(mainVar.cutTimer);
	};
	//继续倒计时
	mainVar.continueCutTimer=function(){
		if(mainVar.cutTimer)clearInterval(mainVar.cutTimer);
		if(number==0)return	;
		mainVar.cutTimer=setInterval(function(){
			number--;
			if(number<=0){
				endFun();
				clearInterval(mainVar.cutTimer);
			}
		},1000);
	};
	//回调函数
	function endFun(){
		mainVar.dialog.share();
	}
});
//分享
mainVar.dialog.extend('share',function($num){
	// var CSS='.share_dialog{width:100%;height:100%;background-color:#cbb078;position:relative;}\
	// 	.share_dialog .share_bg{width:100%;display:block;}\
	// 	.share_dialog .center{width:6em;height:5.1em;position:absolute;top:2.97em;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);background-size:100% 100%;background-image:url(img/icon_jz.png);}\
	// 	.share_dialog .btn{width:1.9em;height:0.66em;display: block;position: absolute;bottom:0.8em;}\
	// 	.share_dialog .btn_share{left:0.8em;}\
	// 	.share_dialog .btn_download{right:0.8em;}\
	// 	.share_dialog .share_desc{width:100%;height:100%;position:absolute;top:0;left:0;}\
	// 	.share_dialog .ss{position:absolute;top:1.82em;left:3.35em;line-height:0.3em;}\
	// 	.share_dialog .ss b{font-size:0.3em;font-weight:600;color:#000;}\
	// 	.share_dialog .ch{position:absolute;top:2.25em;left:3.85em;line-height:0.35em;}\
	// 	.share_dialog .ch b{font-size:0.35em;font-weight:600;color:#000;}\
	// 	.share_dialog .center_desc{width:100%;line-height:0.2em;position:absolute;bottom:0.6em;left:0;text-align:center;}\
	// 	.share_dialog .center_desc b{font-size:0.16em;color:red;}';
	
 //    if(!this.temporary.css['share']){
 //        setStyle(CSS);
 //        this.temporary.css['share']=true;
 //    }
    var html,score,levalName="",descUrl="",positionStyle1="",positionStyle2="",score=getScore();
    	//测试
    	if($num)score=$num;
    	if(score<=30){
    		levalName='注孤生';
    		descUrl="img/share_1.png";
    	}else if(score<=60){
    		levalName='恋爱达人';
    		descUrl="img/share_2.png";
    	}else if(score<=80){
    		levalName='撩妹高手';
    		descUrl="img/share_3.png";
    		positionStyle1="top:1.55em;left:3.35em;";
    		positionStyle2="top:2em;left:3.95em;";
    	}else{
    		levalName='老司机';
    		descUrl="img/share_4.png";
    		positionStyle1="top:1.42em;left:3.35em;";
    		positionStyle2="top:1.85em;left:3.95em;";
    	}
		html='<div class="share_dialog">\
			<img src="img/icon_desk.jpg" class="share_bg">\
			<div class="center">\
				<img src="'+descUrl+'" class="share_desc">\
				<div class="ss threeheartwo" style="'+positionStyle1+'"><b id="user_score">'+score+'</b></div>\
				<div class="ch lrbottomswing" style="'+positionStyle2+'"><b>'+levalName+'</b></div>\
			</div>\
			<img src="img/btn_share.png" class="btn btn_share" action="btn_share">\
			<img src="img/btn_download.png" class="btn btn_download" action="btn_download">\
		</div>';
    this.open({
         name:'share'
        ,html:html
        ,bgClose:0
        ,bgColor:0
        ,dialogClose:0
        ,fun:function(){}
        ,openFunTime:400
        ,animate:'moveFromBottom'
        ,closeFun:function(){}
        ,closeFunTime:300
        ,closeAnimate:'movetobottom'
        ,deldialogTime:0
    })
});
function getScore(){
	for(var i=1;i<9;i++){
		var n=scoreArr[i]||0;
		mainVar.score+=parseInt(n);
	}
	return mainVar.score;
}
//事件代理
eventEntrust({ele:document.querySelector('.ans_page'),event:'click',fun:function(e){
	var $acton=arguments[0],$t=this;
	switch($acton){
        case 'again':
        	btn_music_play();
        	setTimeout(function(){
        		top.location.replace(url+'&a=123');
        	},200);
        break;
        case 'share':
        	btn_music_play();
        	share_yd_dialog.style.display='block';
        break;
        case 'select':case 'sel':
        	var t=arguments[1],s=arguments[2];
        	scoreArr[t]=s;
        	magnifyHeart(this);
        break;
        case 'commit':
        	if(mainVar.cutTimer)clearInterval(mainVar.cutTimer);
        	mainVar.dialog.share();
        break;
	}
}});
//放大心图标
function magnifyHeart(t){
	var heart=t.querySelector('span'),hearts=t.parentNode.querySelectorAll('span');
	for(var i=0;i<hearts.length;i++){
		$(hearts[i]).css({width:'0.3em',height:'0.3em',top:'0.05em',left:'0em'});
	}
	$(heart).css({width:'0.6em',height:'0.6em',top:'-0.1em',left:'-0.2em'});
	// $(heart).html('<img src="img/sel_r.png" class="sel_r lrbottomswing">')
}
//弹窗
function confirmAlert(){
	var _this=this,temporary={'css':{},"options":{}},bgBox,wBox=mainVar.box||document.body,isColor=false,isFirstDom=null,confirmBox=null,dialogCon={},closeFlag=true;
	this.btnAnimation=function(elem){
		elem.classList.add('but_animation');
		elem.addEventListener('webkitAnimationEnd',function(){
			elem.classList.remove('but_animation');
		},false);
	};
	this.init=function(){
		// var css='\
		// .confirmBox_dialog_grt{display:none;width:100%;height:100%;position:fixed;top:0;left:0;z-index:100;}\
		// .confirm_Dialog_Box{width:100%;height:100%;position:absolute;top:0;left:0;z-index:100;}\
		// .confirm_Dialog_Box .content_Dialog_Box{width:100%;height:100%;opacity:1;}\
		// .confirm_Dialog_Box b{vertical-align:top;}\
		// .but_animation{-webkit-transform:scale(1);-webkit-animation:but_animation 600ms ease 1}\
		// @-webkit-keyframes but_animation{\
		//   0%{-webkit-transform:scale(.9);}\
		//   50%{-webkit-transform:scale(1.1)}\
		//   100%{-webkit-transform:scale(1)}\
		// }\
		// @-webkit-keyframes slideInRight {0% {opacity:1;transform: translate3d(100%, 0, 0);visibility: visible;}100% {opacity:1;transform: translate3d(0, 0, 0);}}\
  //       @-webkit-keyframes slideOutRight {from {opacity:1;transform: translate3d(0, 0, 0);}to {opacity:1;visibility: hidden;transform: translate3d(100%, 0, 0);}}\
  //       .slideInRight {animation-name: slideInRight;animation-duration: 300ms;animation-fill-mode: both;}\
  //       .slideOutRight {animation-name: slideOutRight;animation-duration: 400ms;animation-fill-mode: both;}\
		// .dialog-in-1{-webkit-animation:dialog-in-1 400ms ease-out forwards;}\
		// @-webkit-keyframes dialog-in-1{\
		//       0% {-webkit-transform:scale(0,0);opacity:0;}\
		//     60% {-webkit-transform:scale(1.2,1.2);}\
		//    100% {-webkit-transform:scale(1,1);opacity:1;}\
		// }\
		// .dialog-out-1{-webkit-animation:dialog-out-1 300ms ease-in forwards;}\
		// @-webkit-keyframes dialog-out-1{\
		// 	   0% {-webkit-transform:scale(1,1);opacity:1;}\
		// 	  40% {-webkit-transform:scale(1.2,1.2);}\
		// 	 100% {-webkit-transform:scale(0,0);opacity:0;}\
		// }\
		// @media screen and (min-width:320px) and (max-width:359px){\
		// 	.confirm_Dialog_Box{font-size:50px;}\
		// }\
		// @media screen and (min-width:360px) and (max-width:374px){\
		// 	.confirm_Dialog_Box{font-size:56.25px;}\
		// }\
		// @media screen and (min-width:375px) and (max-width:413px){\
		// 	.confirm_Dialog_Box{font-size:58.5938px;}\
		// }\
		// @media screen and (min-width:414px){\
		// 	.confirm_Dialog_Box{font-size:64.6875px;}\
		// }';
		// setStyle(css);
		confirmBox=createNode(wBox,'div',{className:'confirmBox_dialog_grt'},'p3');
		this.eventEntrust({ele:confirmBox,event:'click',fun:function(e){
			var $acton=arguments[0],$t=this;
			switch($acton){
                case 'close-dialog':
                	mainVar.dialog.close({'t':$t,'name':arguments[1],'animate':arguments[2]});
                break;
                case 'close-dialog-demo':
                	mainVar.dialog.close({'t':$t,'name':arguments[1],'animate':arguments[2]});
                break;
                case 'btn_download':
                	location.href='http://www.yixin.im/';
                break;
                case 'btn_share':
                	$('.share_yd_bg').show();
                break;
			}
		}});
		_this.temporary=temporary;
		_this.dialogCon=dialogCon;
	};
	this.open=function($opt){
		var opt=$opt||{},bgColor=opt.bgColor||0,bgClose=opt.bgClose||0,dialogClose=opt.dialogClose||0,html=opt.html||"",contentBox,bgCss='',name=opt.name||'dialog-grt',ele=confirmBox,selfbg=opt.selfbg||false,fun=opt.fun,animate=opt.animate||'dialog-in-1',openFunTime=opt.openFunTime||300,closeAnimate=opt.closeAnimate||"",opacityLeve=opt.opacity||"0.7";
		ele.style.display='block';
		bgBox=createNode(ele,'div',{className:'confirm_Dialog_Box',action:(bgClose?'close-dialog.,'+name+'.,'+closeAnimate:'')},'p3');
		contentBox=createNode(bgBox,'div',{className:'content_Dialog_Box '+animate,html:html},'p3');
		if(!_this.dialogCon[name]){
			_this.dialogCon[name]=[contentBox];
		}else{
			_this.dialogCon[name].unshift(contentBox);
		}
		if(!_this.temporary["options"][name]){
			_this.temporary["options"][name]=[opt];
		}else{
			_this.temporary["options"][name].unshift(opt);
		}
		if(!isFirstDom){isFirstDom=bgBox;}
		if(bgColor&&!isColor){confirmBox.style.backgroundColor='rgba(0,0,0,'+opacityLeve+')';isColor=true;}
		if(selfbg&&!isColor){bgBox.style.backgroundColor='rgba(0,0,0,'+opacityLeve+')';}
		if(dialogClose){
			contentBox.children[0].setAttribute('action','close-dialog.,'+name+'.,'+closeAnimate);
		}else{
			if(bgClose)contentBox.children[0].setAttribute('action',name+"-00");
		}
		setTimeout(function(){//回调函数
			isFun(fun);
		},openFunTime);
	};
	this.close=function($opt){
		if(!closeFlag){closeFlag=true;return;}closeFlag=false;
		var opt=$opt||{},ele=opt.t,name=opt.name,c,openOption,thisCloseOpt,finalAnimate=opt.animate,finalFunction=opt.fun,finalDelTime=opt.delTime,finalFunctionTime=opt.closeTime;
		if(name){
			openOption=_this.temporary["options"][name]||[];
			thisCloseOpt=openOption[0]?openOption.shift():{};
			finalAnimate=finalAnimate?finalAnimate:(thisCloseOpt['closeAnimate']||'dialog-out-1');
			finalFunction=finalFunction?finalFunction:(thisCloseOpt['closeFun']||function(){});
			finalFunctionTime=finalFunctionTime?finalFunctionTime:(thisCloseOpt['closeFunTime']||300);
			finalDelTime=finalDelTime?finalDelTime:(thisCloseOpt['deldialogTime']||400);
			if(_this.dialogCon[name]){
				c=_this.dialogCon[name].shift();
				if(c)c.className='content_Dialog_Box '+finalAnimate;
				setTimeout(function(){
					closeFlag=true;
		    		var p=c?c.parentNode:false;
		    		if(p===isFirstDom){
		    			isColor=false;
		    			isFirstDom=null;
		    		}
		    		if(p)removeNode(p);
		    		if(confirmBox.childElementCount==0){
		    			confirmBox.style.backgroundColor='rgba(0,0,0,0)';
		    			confirmBox.style.display='none';
		    		}
		    	},(finalDelTime||400));
			}else{
				closebyele();
			}
			closeActionFun();
		}else{
			closebyele();
			closeActionFun();
		}
		function closebyele(){//关闭弹窗（没有name情况，最好都加上name）
			if(ele.setAttribute)ele.setAttribute('action','');
			do{
				if(ele.nodeType!==1)break;
			    if(ele.className.indexOf('content_Dialog_Box')>=0)break; 
			}while(ele=ele.parentNode);
			ele.className='content_Dialog_Box '+(finalAnimate||'dialog-out-1');
			setTimeout(function(){
	    		closeFlag=true;
	    		var p=ele.parentNode;
	    		if(p===isFirstDom){
	    			isColor=false;
	    			isFirstDom=null;
	    		}
	    		if(p)removeNode(p);
	    		if(confirmBox.childElementCount==0){
	    			confirmBox.style.backgroundColor='rgba(0,0,0,0)';
	    			confirmBox.style.display='none';
	    		}
	    	},(finalDelTime||400));
		}
		function closeActionFun(){//执行回调函数
			setTimeout(function(){
				isFun(finalFunction);
			},(finalFunctionTime||300));
		}
	};//事件代理
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
				if(ele.nodeType!==1)break;
				if(attribute=ele.getAttribute(action))break	;		
				}
			while(ele=ele.parentNode);								
			if(attribute){						
				fun.apply(ele,attribute.split(split));
			}			
		});	
	};
	this.extend=function($name,$fun){
		if(!$name){
			alert('添加函数失败');
			return;
		}
		_this[$name]=$fun;
	};
	this.init();
}
function eventEntrust($opt){
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
			if(ele.nodeType!==1)break;
			if(attribute=ele.getAttribute(action))break	;		
			}
		while(ele=ele.parentNode);								
		if(attribute){						
			fun.apply(ele,attribute.split(split));
		}			
	});	
};
});

