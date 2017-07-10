//分享链接
var mainVar={},userInfo={},DO=document,DB=document.body,winW=window.innerWidth,winH=window.innerHeight;
var search=getSearch();
var openid=search.openid
var url = window.location.href;
var curIndex=0;
var totalNumber=0;
var rightNumber=0;
var userInfo={};
var topic_right='';
var topic_id='';


if(!openid){
	toWXSQ()
}
function toWXSQ($url){
    localStorage.clear()
    var url=$url||location.href;
    HOST.AD='//qa-mb.mtq.tvm.cn'
    location.replace(HOST.AD+"/yyyoauth?wx_token=33580c57d3c86f07&redirecturl="+encodeURIComponent(url))
}

$(function() {

mainVar.box=mainBox;
//倒计时
mainVar.num=30;
mainVar.selList={};
mainVar.sunmitFlag=true;
mainVar.slidFlag=true;
mainVar.bgFlag=true;



loadImg();
mainVar.dialog=new confirmAlert()
//禁止页面上下滑动露出微信的黑色背景
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
		btn_music_play();

		mainVar.dialog.clock()
	}
})

function btn_music_play(){
	btn_music.src='media/btn.mp3'
	btn_music.volume=0.9
	btn_music.play();
}
function bg_music_play(){
	$("#sound_img").attr("src", "img/sounds_01.png");
	$("#sound_control").removeClass("clockwise-pause").addClass("clockwise-rotate");
	buy_music.src="media/bg.mp3"
	buy_music.play();
}

$('#share_yd_dialog').bind('click',function(){
	$('#share_yd_dialog').hide()
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
        console.log(mainVar.slidFlag)
        if(!mainVar.slidFlag){
			setTimeout(function(){
				// mainVar.slidFlag=true
			},150)
			return
		}
		mainVar.slidFlag=false
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


// var nonce = getNonceStr();
// var timeStamp = new Date().getTime();
// var jsapi_ticket = getTicket();
// var signStr = hex_sha1("jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonce + "&timestamp=" + timeStamp + "&url=" + window.location.href);
// wx.config({
//     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: appid, // 必填，公众号的唯一标识
//     timestamp: timeStamp, // 必填，生成签名的时间戳
//     nonceStr: nonce, // 必填，生成签名的随机串
//     signature: signStr,// 必填，签名，见附录1
//     jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQZone','onMenuShareWeibo','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// });

var shareInfo={
	title:'中企动力移动门户',
	icon:'http://qa-h5.mtq.tvm.cn/yao/guort/answer/img/share_logo.png',
	resources:location.href,
	link:location.href.replace(/\?.*/,''),
	desc:'划重点，考到60分儿，算你入门儿互联网'
}
wxShare(shareInfo)


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


//倒计时页
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
    	bgMusicPause();
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
        			mainVar.dialog.cutdown()
        			mainVar.dialog['selText'](20)
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
//全局30秒倒计时
mainVar.dialog.extend('cutdown',function($num){
	var number=$num||30;
	mainVar.cutTimer=setInterval(function(){
		number--;
		cut_num.innerHTML=number;
		if(number<=0){
			endFun()
			clearInterval(mainVar.cutTimer)
		}
	},1000)
	//暂停
	mainVar.pasueCutTimer=function(){
		if(mainVar.cutTimer)clearInterval(mainVar.cutTimer)
	}
	//继续倒计时
	mainVar.continueCutTimer=function(){
		if(mainVar.cutTimer)clearInterval(mainVar.cutTimer)
		if(number==0)return	
		mainVar.cutTimer=setInterval(function(){
			number--;
			cut_num.innerHTML=number;
			if(number<=0){
				endFun()
				clearInterval(mainVar.cutTimer)
			}
		},1000)
	}
	//回调函数
	function endFun(){
		mainVar.dialog.share()
	}
})
//选题
mainVar.dialog.extend('selText',function($num){
	if(mainVar.bgFlag){
		bg_music_play();
		mainVar.bgFlag=false
	}
	
	//题目数量
	var num=$num||20,number,randomNum,length,endFl=false;
	if(!mainVar.initSelNum){
		for(var i=0;i<33;i++){
			mainVar.selList[i+1]=true;
		}
		mainVar.initSelNum=true;
	}
	randomNum=Math.floor(Math.random()*33+1)
	if(totalNumber==0||totalNumber==1||totalNumber==2){
			randomNum=totalNumber+1
		}
	if(mainVar.selList[randomNum]){
		if(totalNumber>=num){
			mainVar.dialog.share()
			return
		}
		mainVar.selList[randomNum]=false;
		mainVar.sunmitFlag=true;
		mainVar.dialog.page1(randomNum)
	}else{
		for(var j=0;j<num;j++){
			if(mainVar.selList[j+1]){
				endFl=true;
			}
		}
		if(endFl){
			mainVar.dialog['selText']();
		}else{
			tishi('没有更多题目了',{showTime:2000})
		}
	}
})
//发送数据
mainVar.dialog.extend('sendDate',function($opt){
	$.ajax({
		type:'POST'
		,url:'http://47.95.7.100/index.php?s=api/add_update'
		,dataType:'json'
		,data:{
			openid:openid
			,nickname:'1'
			,image:'1'
			,topic_right:(topic_right.replace(/\|$/,''))
			,topic_id:topic_id.replace(/\|$/,'')
		}
		,success:function($data){
			mainVar.dialog.getRank()
		}
		,error:function(){
			mainVar.dialog.getRank()
		}
	})
})
//获取排名
mainVar.dialog.extend('getRank',function($opt){
	$.ajax({
		type:'POST'
		,url:'http://47.95.7.100/index.php?s=api/select_find_openid'
		,dataType:'json'
		,data:{
			openid:openid
			,act:'find_openid'
		}
		,success:function($data){
			var data=toObject($data),d,rownum
			d=data.data[0]||{}
			if(data.code==200){
				rownum=d.rownum||""
				if(user_rank)user_rank.innerHTML=rownum
			}
		}
		,error:function(){
			tishi('获取名次失败')
		}
	})
})
//答题页
mainVar.dialog.extend('page1',function($num){
    var CSS='\
        .page1_dialog{width:100%;height:100%}\
        '
    if(!this.temporary.css['page1']){
        setStyle(CSS);
        this.temporary.css['page1']=true;
    };
    $('.page_num').removeClass('hide');
    totalNumber++;
    var html="",h="",num=$num-1,iconHtml="",rightResult=ansList[num]['right']
	    mainVar.userSelect='';
	    mainVar.rightResult=rightResult;
	    page_qus_num.innerHTML=totalNumber+'/20';
	    topic_id+=(num+'|')
    	iconHtml='<img src="img/clock_fly.png" class="icon page_fly twinkling3">\
    			<img src="img/clock_star.png" class="icon page_star twotwinklingtwo">\
    			<img src="img/clock_star2.png" class="icon page_fly_star flytoleft">'
		h='<div class="qus_data">\
	    	<div class="li" action="select.,1"><div class="check_box"></div><div class="li_right"><p><b>'+ansList[num]['ans'][0]+'</b></p></div></div>\
	    	<div class="li" action="select.,2"><div class="check_box"></div><div class="li_right"><p><b>'+ansList[num]['ans'][1]+'</b></p></div></div>\
	    	<div class="li" action="select.,3"><div class="check_box"></div><div class="li_right"><p><b>'+ansList[num]['ans'][2]+'</b></p></div></div>\
	    	<div class="li" action="select.,4"><div class="check_box"></div><div class="li_right"><p><b>'+ansList[num]['ans'][3]+'</b></p></div></div>\
		</div>'

    	switch(num){
    		case 5:case 10:case 11:case 26:case 26:
    			iconHtml+=''
    		break;
    		default:
    			iconHtml+='<img src="img/page_left.png" class="icon page_left">\
    			<img src="img/page_1_plane.png" class="icon page_plane flytoleft2">\
    			<img src="img/page_glass.png" class="icon page_glass glassAni">'
    		break;
    	}
		html='<div class="page1_dialog page">\
			<div class="qus_tit">\
				<p><b>'+totalNumber+'. &nbsp;'+ansList[num].tit+'</b></p>\
			</div>'+h+'<div class="qus_btn" action="submit.,'+(num)+'"><b id="qus_btn">下一题</b></div>'+iconHtml+'\
			</div>'
    this.open({
         name:'page'+num
        ,html:html
        ,fun:function(){
        	var n=num
        	mainVar.continueCutTimer()
        	setTimeout(function(){
        		if(n==0)return
        		mainVar.dialog.close({'name':'page'+(n-1),'animate':'movetobottom'})
        	},400)
        }
        ,animate:'moveFromBottom'
        ,closeFun:function(){}
        ,closeAnimate:'movetobottom'
    })
})
//分享
mainVar.dialog.extend('share',function($num){
    var CSS='\
        .share_dialog{width:100%;height:100%;background-size:100% 100%;background-image:url(img/share_bg.png);}\
        .part1{margin-top:1em;padding-left:0.58em;text-align:left;}\
        .part1 p{height:0.5em;line-height:0.5em;}\
        .part1 p b{font-size:0.34em;}\
        .part1 p b.red{color:#d92b00;}\
        .l2{margin-bottom:0.4em;}\
        .l3{}\
        .share_dialog .l3 b{font-size:0.38em;}\
        .share_dialog .l4{margin-top:0.1em;text-align:right;}\
        .share_dialog .l4 b{font-size:0.62em;}\
        .shareImg{position:absolute;left:0;}\
        .sharebtn{width:2.28em;height:1.1em;position:absolute;bottom:0.7em;}\
        .share_l{left:0.6em;}\
        .share_r{right:0.6em;}\
        .share_4_head{width:1em;height:1.16em;top:3.14em;right:0.96em;}\
        .share_4_g{width:1.5em;height:0.44em;top:4.3em;right:1.19em;}\
        .share_4_xin{width:0.72em;height:0.72em;top:3.33em;right:2.37em;}\
        .share_4_b{width:4.9em;heihgt:0.84em;bottom:2.07em;left:50%;-webkit-transform:translateX(-50%);}\
        .share_3_head{width:1.44em;height:1.37em;top:3.7em;right:2.14em;}\
        .share_3_t{width:2.68em;height:1.79em;top:3.6em;right:0.56em;}\
        .share_3_ball{width:0.8em;height:0.6em;top:4.6em;left:1.13em;}\
        .share_3_icon1{width:0.78em;heihgt:0.42em;top:0.65em;right:1.24em;}\
        .share_3_icon2{width:0.52em;heihgt:0.36em;bottom:2.76em;right:1.1em;}\
        .share_3_icon3{width:0.74em;heihgt:0.43em;bottom:3.36em;right:0.52em;}\
        .share_3_icon4{width:0.64em;heihgt:0.37em;bottom:2.09em;left:0.78em;}\
        .share_2_hand{width:1.2em;height:1.36em;top:4.22em;right:1em;}\
        .share_2_d{width:0.39em;height:0.5em;top:4em;right:1.7em;}\
        .share_2_b{width:4.32em;height:1.48em;bottom:2.03em;left:50%;-webkit-transform:translateX(-50%);}\
        .share_2_ball{width:0.8em;height:0.67em;bottom:2.7em;left:2em;}\
        .share_2_ss{width:0.74em;height:0.76em;top:1.98em;right:0.57em;}\
        .share_icon_king{width:0.57em;height:0.52em;top:2.4em;right:0.53em;}\
        .share_icon_1{width:0.65em;height:0.37em;bottom:2.1em;left:1.15em;}\
        .share_icon_2{width:0.78em;height:0.48em;bottom:2.46em;right:1.67em;}\
        .share_icon_ball{width:0.79em;height:0.72em;top:4.76em;right:0.92em;}\
        .share_1_ball{width:0.8em;height:0.67em;top:3.72em;right:1.94em;}\
        '
    if(!this.temporary.css['share']){
        setStyle(CSS);
        this.temporary.css['share']=true;
    };
    $('.clock_tit').hide();
    $('.page_num').hide();
    bgMusicPause()
    score_music.play();
    mainVar.dialog.sendDate()
    var html="",num=$num,descHTML="",t1="",t2="",t3="",t4=""
    	console.log(rightNumber)
    	if(rightNumber<10){
    		num=4
    	}else if(rightNumber<20){
    		num=3
    	}else if(rightNumber<25){
    		num=2
    	}else{
    		num=1
    	}
    	switch(num){
    		case 1:
    			t1="恭喜您成为"
    			t2="网管界最强王者"
    			descHTML='<img src="img/share_1.png" class="shareImg" style="top:4.42em;height:2.36em;">'
    			t3='<img src="img/share_3_icon1.png" class="img_icon share_3_icon1">\
    				<img src="img/share_icon_king.png" class="img_icon share_icon_king twinkling">\
    				<img src="img/share_icon_1.png" class="img_icon share_icon_1">\
    				<img src="img/share_icon_2.png" class="img_icon share_icon_2">\
    				<img src="img/share_icon_ball.png" class="img_icon share_icon_ball">\
    				<img src="img/clock_ball.png" class="img_icon share_1_ball swing_left_right">'
    		break;
    		case 2:
    			t1="拜见"
    			t2="称职的网管大大"
    			descHTML='<img src="img/share_2.png" class="shareImg" style="top:4.5em;height:1.85em;">'
    			t3='<img src="img/share_2_hand.png" class="img_icon share_2_hand twinkling">\
    				<img src="img/share_2_d.png" class="img_icon share_2_d">\
    				<img src="img/share_2_b.png" class="img_icon share_2_b">\
    				<img src="img/clock_ball.png" class="img_icon share_2_ball swing_left_right">\
    				<img src="img/share_2_ss.png" class="img_icon share_2_ss">\
    				<img src="img/share_3_icon1.png" class="img_icon share_3_icon1">'
    		break;
    		case 3:
    			t1="你好"
    			t2="网管界小学生"
    			descHTML='<img src="img/share_3.png" class="shareImg" style="bottom:2.85em;height:1.4em;">'
    			t3='<img src="img/share_3_head.png" class="img_icon share_3_head threeheartwo">\
    			<img src="img/share_3_t.png" class="img_icon share_3_t">\
    			<img src="img/clock_ball.png" class="img_icon share_3_ball">\
    			<img src="img/share_3_icon1.png" class="img_icon share_3_icon1">\
    			<img src="img/share_3_icon2.png" class="img_icon share_3_icon2">\
    			<img src="img/share_3_icon1.png" class="img_icon share_3_icon3">\
    			<img src="img/share_3_icon1.png" class="img_icon share_3_icon4">'
    		break;
    		case 4:
    			t1=""
    			t2="网管界最渣王者"	
    			descHTML='<img src="img/share_4.png" class="shareImg" style="top:4.4em;height:2.36em;">'
    			t3='<img src="img/share_4_head.png" class="img_icon share_4_head threeheartwo">\
	    			<img src="img/share_4_xin.png" class="img_icon share_4_xin">\
	    			<img src="img/share_4_b.png" class="img_icon share_4_b">\
	    			<img src="img/share_4_g.png" class="img_icon share_4_g">'
    		break;
    		default:
    			t1=""
    			t2="网管界最渣王者"	
    			descHTML='<img src="img/share_4.png" class="shareImg" style="top:4.4em;height:2.36em;">'
    			t3='<img src="img/share_4_head.png" class="img_icon share_4_head threeheartwo">\
	    			<img src="img/share_4_xin.png" class="img_icon share_4_xin">\
	    			<img src="img/share_4_b.png" class="img_icon share_4_b">\
	    			<img src="img/share_4_g.png" class="img_icon share_4_g">\
	    			<img src="img/share_3_icon1.png" class="img_icon share_3_icon1">'
    		break;
    	}

    	shareInfo.desc='我是'+t2+'，快来试试你能答对几道题！'
    	setShare(shareInfo)

		html='<div class="share_dialog page">\
				<div class="part1">\
					<p class="l1"><b>共答对了</b><b class="red">&nbsp;'+rightNumber+'&nbsp;</b><b>题</b></p>\
					<p class="l2"><b>您的排名&nbsp;&nbsp;</b><b class="red" id="user_rank">1508</b><b>&nbsp;&nbsp;名</b></p>\
					<p class="l3" style="'+(num==4?'display:none;':'')+'"><b>'+t1+'</b></p>\
					<p class="l4"><b>“'+t2+'”</b></p>\
				</div>'+descHTML+'\
				<img src="img/share_sharebtn.png" class="sharebtn share_l" action="share">\
				<img src="img/share_againbtn.png" class="sharebtn share_r" action="again">'+t3+'</div>'
    this.open({
         name:'share'
        ,html:html
        ,fun:function(){}
        ,animate:'moveFromBottom'
        ,closeAnimate:'movetobottom'
    })
})
//引导
mainVar.dialog.extend('share_yd',function($num){
    var CSS='\
        .share_yd_dialog{width:100%;height:100%;background-color:rgba(0,0,0,.9);position:absolute;top:0;left:0;}.share_yd{width:100%;}'
    if(!this.temporary.css['share_yd']){
        setStyle(CSS);
        this.temporary.css['share_yd']=true;
    };
    var html,timer=null,num=$num||5
		html='<div class="share_yd_dialog">\
				<img src="img/share_yd.png" class="share_yd">\
			'
    this.open({
         name:'share_yd'
        ,html:html
        ,bgClose:0
        ,bgColor:0
        ,dialogClose:1
        ,fun:function(){}
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
            ,closeFun:function(){}				//close回调函数
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
                case 'submit':
                	if(!mainVar.sunmitFlag)return
                	mainVar.sunmitFlag=false;
                	mainVar.pasueCutTimer()	
                	var res=mainVar.userSelect.split('').sort().join('');
                	var zzz=mainVar.rightResult.split('');
                	mainVar.userSelect='';
                	// btn_music_play();
                	$('.check_box').removeClass('hasSelect')
                	//正确
                	if(res===mainVar.rightResult){
                		right_music.play()
                		rightNumber++;
                		topic_right+=(arguments[1]+"|")
                		var selectDom=$t.parentNode.querySelector('.qus_data').querySelectorAll('.check_box')
	                	for(var k=1;k<=4;k++){
	                		if(res.indexOf(k)>=0&&mainVar.rightResult.indexOf(k)>=0){
	                			selectDom[k-1].innerHTML='<img src="img/sel_r.png" class="lrbottomswing">'
	                		}
	                	}
	                	setTimeout(function(){
	                		mainVar.dialog.selText(20)
	                	},500)
                	}else{//错误
                		wrong_music.play()
                		var selButton=$t.querySelector('b')
	                	selButton.innerHTML='正确答案：'+mainVar.rightResult.replace('1','A').replace('2','B').replace('3','C').replace('4','D')
	                	setTimeout(function(){
	                		mainVar.dialog.selText(20)
	                	},1500)
                	}
                break;
                case 'select':
                	btn_music_play();
                	var s=arguments[1];
                	var dom=$t.querySelector('.check_box')
                	if(!$($t).hasClass('hasSelect')){
                		mainVar.userSelect+=s
                		$($t).addClass('hasSelect')
                		$(dom).html('<img src="img/sel_w.png" class="lrbottomswing">')
                	}else{
                		$($t).removeClass('hasSelect')
                		mainVar.userSelect=mainVar.userSelect.replace(s,'')
                		$(dom).html('')
                	}
                break;
                case 'again':
                	btn_music_play()
                	setTimeout(function(){
                		top.location.replace(url+'&a=123')
                	},200)
                break;
                case 'share':
                	btn_music_play();
                	share_yd_dialog.style.display='block'
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

