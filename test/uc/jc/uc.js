var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight
,mainVar={temporary:{}}
,search=getSearch()
,ST_user=localStorage.getItem("userInfo")
,userInfo=toObject(ST_user)||{}
;
mainVar.box=createNode(DB,'div',{className:'mainbox',style:'background-image:url(img/bg.jpg);'},'p3')

init()
function init(){
	var yeBox=createNode(mainVar.box,'div',{className:'yeBox',style:'background-image:url(img/hdye.png);',html:'<div class="num"><b id="get_num">501</b><b class="dw">元</b></div>'},'p3')
		,lqBox=createNode(mainVar.box,'div',{className:'lqBox',html:'<div class="lq1"><input type="number" name="tel" id="tel" placeholder="请输入手机号"><button action="lq">立即领取</button></div>'},'p3')
		tips=createNode(mainVar.box,'div',{className:'tips',html:'<div class="tit"><b>活动说明</b></div><ul><li><b>领取余额可在电视红包APP中使用</b></li><li><b>请使用领取红包输入的手机号登录电视红包APP</b></li><li><b>下载APP，成为电视红包会员可尊享五大会员权益</b></li></ul>'},'p3')
		;
	// showLoading()	
	mainVar.dialog=new confirmAlert()
	// mainVar.dialog.init();
	mainVar.dialog.extend('alert',function($opt){
		var CSS='#confirm_dialog1{width:5.36em;height:3.25em;position:absolute;left:50%;top:50%;margin-top:-1.62em;margin-left:-2.68em;background-color:#f9f7fa;border-radius:5px;}\
		#confirm_dialog1 .cont{height:2.16em;padding:0 0.5em;text-align:center;overflow:hidden;}\
		#confirm_dialog1 .cont b{vertical-align:top;}\
		#confirm_dialog1 .cont .c1{margin-top:0.8em;line-height:0.6em;}\
		#confirm_dialog1 .cont .c1 b{font-size:0.3em;color:#000;}\
		#confirm_dialog1 .close{height:1.09em;border-top:1px solid #666;line-height:1.09em;color:#0067bf;text-align:center;}\
		#confirm_dialog1 .close b{font-size:0.35em;}'

		if(!this.temporary.css['alert']){
			setStyle(CSS);
			this.temporary.css['alert']=true;
		};
		var opt=$opt||{},type=opt.type||1,cont=''
		switch(type){
			case 1:
				cont='<b>请输入正确手机号</b>'
			break;
			case 2:
				cont='<b>领取时间过期了</b>'
			break;
			case 3:
				cont='<b>已注册手机号不可领取</b><br/><b>请重新输入</b>'
			break;
		}
		var html='<div id="confirm_dialog1">\
			<div class="cont"><div class="c1">'+cont+'</div></div>\
			<div class="close" action="close-dialog"><b>确认</b></div>\
		</div>'
		this.open({
			name:'confirm',
			html:html,
			bgColor:1,
			bgClose:0
		})

	})
	
}
function regPhone(){
	var phoneNum=tel.value,reg=/^\d{11}$/,lqbox=mainVar.box.querySelector('.lqBox')
	if(reg.test(phoneNum)){
		lqbox.innerHTML='<div class="lq2"><div class="c1"><img src="img/dui.jpg"><b>领取成功</b></div>\
		<div class="c2"><b>已存入您的'+hidPhoneNum(phoneNum)+'电视红包账户</b></div>\
		<div class="c3"><b>使用此号码登录即可享用</b></div>\
		<div class="c4" action="download"><img src="img/uc_downl.jpg"></div>\
		</div>'
	}else{
		mainVar.dialog.confirm({type:1})
	}
}
function hidPhoneNum($num){
	var num=$num||''
	return num.replace(/(\d{3})(\d{4})(\d{4})+/,'$1****$3')
}
addEvent(DB,'click',function(e){
        docAction(e,{action:'action',fun:function($t,$action){
            var action=$action.split(".,"),numNode,imgNode,num,a
                switch(action[0]){
                    case 'lq':
                    	regPhone()
                    break;
                    case 'download':
                    	alert('跳转')
                    break;
            }
        }
    })
})
function docAction(e,$opt){
  	var ele=e.srcElement||e.target,opt=$opt||{},_action=opt.action||"action",attribute,argument,a1;       
	do{
        if(ele.nodeType!==1)break;
        if(attribute=ele.getAttribute(_action))break; 
        }while(ele=ele.parentNode)          
    if(attribute){              
        isFun(opt.fun,ele,attribute)
    }
}
function confirmAlert(){
	var _this=this,temporary={'css':{}},bgBox,wBox=mainVar.box||document.body,isColor=false,isFirstDom=null;
	this.confirm=function($opt){
		var CSS='#confirm_dialog{width:5.36em;height:3.25em;position:absolute;left:50%;top:50%;margin-top:-1.62em;margin-left:-2.68em;background-color:#f9f7fa;border-radius:5px;}\
		#confirm_dialog b{vertical-align:top;}\
		#confirm_dialog .cont{height:2.16em;padding:0 0.5em;text-align:center;overflow:hidden;}\
		#confirm_dialog .cont b{vertical-align:top;}\
		#confirm_dialog .cont .c1{margin-top:0.8em;line-height:0.6em;}\
		#confirm_dialog .cont .c1 b{font-size:0.3em;color:#000;}\
		#confirm_dialog .close{height:1.09em;border-top:1px solid #666;line-height:1.09em;color:#0067bf;text-align:center;}\
		#confirm_dialog .close b{font-size:0.35em;}'
		if(!temporary.css['confirm']){
			setStyle(CSS);
			temporary.css['confirm']=true;
		};
		var opt=$opt||{},type=opt.type||1,cont=''
		switch(type){
			case 1:
				cont='<b>请输入正确手机号</b>'
			break;
			case 2:
				cont='<b>领取时间过期了</b>'
			break;
			case 3:
				cont='<b>已注册手机号不可领取</b><br/><b>请重新输入</b>'
			break;
		}
		var html='<div id="confirm_dialog">\
			<div class="cont"><div class="c1">'+cont+'</div></div>\
			<div class="close" action="close-dialog"><b>确认</b></div>\
		</div>'
		this.open({
			name:'confirm',
			html:html,
			bgColor:1,
			bgClose:1
		})

	}
	this.init=function(){
		var css='.confirm_Dialog_Box{width:100%;height:100%;position:absolute;top:0;left:0;z-index:100;}\
		.confirm_Dialog_Box .content_Dialog_Box{width:100%;height:100%;opacity:0;}\
		.confirm_Dialog_Box b{vertical-align:top;}\
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
			.confirm_Dialog_Box{font-size:42.667px;}\
		}\
		@media screen and (min-width:360px) and (max-width:374px){\
			.confirm_Dialog_Box{font-size:48px;}\
		}\
		@media screen and (min-width:375px) and (max-width:413px){\
			.confirm_Dialog_Box{font-size:50px;}\
		}\
		@media screen and (min-width:414px){\
			.confirm_Dialog_Box{font-size:55.2px;}\
		}\
		'
		setStyle(css)
		this.eventEntrust({ele:wBox,event:'click',fun:function(){
			var $acton=arguments[0],$t=this
			switch($acton){
                case 'close-dialog':
                	mainVar.dialog.close($t)
                break;
			}
		}})
		this.temporary=temporary
	}
	this.open=function($opt){
		var opt=$opt||{},bgColor=opt.bgColor||0,bgClose=opt.bgClose||0,html=opt.html||"",contentBox,bgCss='',name=opt.name||'dialog-grt',ele=opt.ele||mainVar.box||document.body
		bgBox=createNode(ele,'div',{className:'confirm_Dialog_Box'},'p3')
		contentBox=createNode(bgBox,'div',{className:'content_Dialog_Box dialog-in-1',action:(bgClose?'close-dialog':''),html:html},'p3')
		if(!isFirstDom){isFirstDom=bgBox}
		if(bgColor&&!isColor){
			isFirstDom.style.backgroundColor='rgba(0,0,0,.7)'
			isColor=true;
		}
		if(bgClose)contentBox.children[0].setAttribute('action',name+"-00");
	}
	this.close=function($t){
		var ele=$t,p
		if($t.setAttribute)$t.setAttribute('action','')
		do{
			if(ele.nodeType!==1)break;
		    if(ele.className.indexOf('content_Dialog_Box')>=0)break; 
		}while(ele=ele.parentNode)
		ele.className='content_Dialog_Box dialog-out-1'
		setTimeout(function(){
    		var p=ele.parentNode
    		if(p===isFirstDom){
    			isColor=false;
    			isFirstDom=null;
    		}
    		removeNode(p)
    	},400)
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
		_this[$name]=$fun
	}
	this.init();

}

//显示loading
function showLoading(options){
	var options=options||{}
	if(!mainVar.loading){
		var css='.loadingScreen{position:absolute;top:0;left:0;height:100%;width:100%;background:rgba(0,0,0,'+(options.opacity||.2)+');z-index:'+(options.zIndex||10000)+';}.loading{background:url(//a-h5.mtq.tvm.cn/yao/common/img/loading.gif) no-repeat center center;height:25px;width:25px;position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);background-color:rgba(0,0,0,.8);padding:15px;background-size:25px 25px;box-sizing:content-box;border-radius:8px;}';
	setStyle(css);
	mainVar.loading=createNode(DB,'div',{className:"loadingScreen",html:'<div class="loading"></div>'});
	}else{
		mainVar.loading.style.display='block';
	};
};
//隐藏loading
function hideLoading(){
	if(mainVar.loading){
		mainVar.loading.style.display='none';
	};
};

