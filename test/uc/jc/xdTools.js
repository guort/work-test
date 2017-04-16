var HOST={
AD:"//mb.mtq.tvm.cn",
ADJS:"//tvmdata.oss-cn-hangzhou.aliyuncs.com",
API:"//count.yaotv.tvm.cn",
APICDN:"//q-cdn.mtq.tvm.cn",
BALANCE:"//ttye.yaotv.tvm.cn",
CARD:"//pmall.yaotv.tvm.cn",
CJ:"//cj.mtq.tvm.cn",
DOMAIN:"//pmall.yaotv.tvm.cn",
DOMAIN2:"http://pmall.yaotv.tvm.cn",
DSP:"//dsp.yaotv.tvm.cn",
DSPJS:"//e-cdn.yaotv.tvm.cn",
FAV:"//fav.yaotv.tvm.cn",
FR:"http://friends.yaotv.tvm.cn",
FL:"//h5-fl.apps.tvm.cn",
FOLDER:"//a-h5.mtq.tvm.cn/yao",
GOLDCOIN:"//coin.yaotv.tvm.cn",
GL:"//qa-nearby.yaotv.cn",
HJGY:"//wsq.yaotv.tvm.cn",
HUIYUAN:"//userapi.yaotv.tvm.cn/tvmyao/hz.html",
JBDH:"http://q.cdn.mtq.tvm.cn/adsmall/mobile/views/",
JIAGE:"//ad-cdn.yaotv.tvm.cn",
MALL:"mall.yaotv.tvm.cn",
MB:"//qc.yaotv.tvm.cn",
ORDER:"http://yaomall.tvm.cn/html/?q=deal/46497107fa23/0/order",
QQAPI:"//wximg.gtimg.com/shake_tv/include/js/jsapi.js",
QQHB:"//wximg.gtimg.com/shake_tv/include/js/jsapi_hongbao.js",
QX:"//userapi.yaotv.tvm.cn",
PRIZEPULL:"//order.yaotv.tvm.cn/open/prize/accept",
RESOURCE:"//a-h5.mtq.tvm.cn/yao/common/",
RTS:"//rts-opa.yaotv.tvm.cn",
SC:"//ucj.yaotv.tvm.cn",
SJYZ:"//qsms.yaotv.tvm.cn",
SOCKET:"//yao-socket.yaotv.tvm.cn",
TJ:"//ana.mtq.tvm.cn",
TX:"//tf.yaotv.tvm.cn",
USERAPI:"//userapi.yaotv.tvm.cn",
WS:"h5-socket.apps.tvm.cn:9092",
WSQ:"//wsq.yaotv.tvm.cn",
WSQCDN:"//q-cdn.mtq.tvm.cn",
WSQDZP:"//wsq.yaotv.tvm.cn",
WSQTURN:"//wsq.yaotv.tvm.cn",
WXAPI:"//res.wx.qq.com/open/js/jweixin-1.0.0.js",
WXAPIS:"//apis.map.qq.com/ws/geocoder/v1/",
YAO:"//yaotv.tvm.cn"
},PAGE={yid:'wx33dc1a5264b4e846',cid:1782,pt:'354e6b14b65b79ad'};
function setVAR($i){PAGE=G_PAGE[$i]||PAGE;PAGE.entrance="tv"}
function addEvent(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
function delEvent(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};
//取子元素
function getChildNodes(_,tag){
	var nodes=[],node=_.firstChild;
	if(tag){
		tag=tag.toUpperCase();
		while(node){ 
			if(tag==node.tagName)nodes.push(node);
			node=node.nextSibling;
		} 
	}else{
		while(node){ 
			if(node.tagName)nodes.push(node);
			node=node.nextSibling;
		} 
	}
		return (nodes==""?null:nodes); 	
	};

//取search
function getSearch(str){
	var s=str||location.search.substr(1),o={}
	if(s.length>2){
		var fg=s.indexOf("&amp;")>-1?"&amp;":"&",arr=(s!==""&&s.split(fg))||[""],arrL=arr.length-1,i=-1,key=null,v=null,a=null;
			do{
				var a=arr[++i].split("=");
				if(a){
						o[a[0]]=decodeURIComponent(a[1])
				}
			}while(i<arrL)	
		}
		return o	
	}	

//去两边空格	
function trim(str){
	var s=str||''
	return s.replace(/^\s+|\s+$/g,"")
	}
//移除node	
function removeNode(_){
	_&&_.parentNode.removeChild(_)
	}
//创建并返回element	
function createNode(_,tag,type,position){    
	var p=position||"p3"; 
	var node=(typeof(tag)=="string"?document.createElement(tag):tag)
		if(type)setAtt(node,type)
		switch(p){ 
			case "p1": 
				_.parentNode.insertBefore(node,_); 
				break; 
			case "p2": 
				_.insertBefore(node,_.firstChild); 
				break; 
			case "p3":
				_.appendChild(node)
				break; 
			case "p4":
				if(_.nextSibling)
					_.parentNode.insertBefore(node,_.nextSibling); 
				else 
					_.parentNode.appendChild(node); 
			break;
			default:
			var child=getChildNodes(_)
				if(child){
					if(child[p])_.insertBefore(node,child[p]); 
				}else{
				_.parentNode.insertBefore(node,_.nextSibling)
				}
			break
			 
		} 
	return node
 };	
//Array.prototype.typeOf="array";
//Object.prototype.typeOf="object"; 

//创建JSONP 
function setJsonp(action,callback,_){	
	var js=document.createElement("script"),_=_||document.documentElement;
	js.src=action;
	 _.appendChild(js);
	 js.onreadystatechange=js.onload=function(e){
		 var read=js.readyState;
		 if(read){
			if(read=="loaded")callback&&callback(1)
		 }else{
			 callback&&callback(1)
			 }
		 _.removeChild(js)	 
		 }
	js.onerror=err;
	function err(status){
		isFun(callback,0);
		_.removeChild(js)
	}
}

//设置对象属性
function setAtt(_,att,val){
	if(typeOf(att)=="object"){
		for(var i in att){
			if(att.propertyIsEnumerable(i))
				Att(i,att[i])	
			}
		}else{	
			Att(att,val)
		}
	function Att(att,val){
			switch(att){
				case "style":_.style.cssText=val;break;
				case "className":_.className=val;break;
				case "html":_.innerHTML=val;break;
				default:_.setAttribute(att,val);break
			}
		}	
	};
	
//返回对象类型	
function typeOf(_){
	var a=typeof(_);
		if(a==="object"){
			if(_===null){
				a=null
			}else if(_.setAttribute){
				a="DOM"
			}else if(_.shift){
				a="array"
			}
		}
	return a
};
//获取元素的相对屏幕位置
function getProperty(_){
	var w=_.offsetWidth,h=_.offsetHeight,l=0,t=0;	
	do{
		l+=_.offsetLeft;
		t+=_.offsetTop;		
		}while(_=_.offsetParent)
	return {width:w,height:h,left:l,top:t};	
	}
//创建xmlObj对象-----------------------------------
function xmlObj(){
	try{
		return (new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject('Microsoft.XMLHTTP'))
		}catch(e){
		return new XMLHttpRequest()
	}	}
function B(num){return +num<10?"0"+num:num}	
var timeStr=setItem("$Y;Y;$M;M;$D;D;$h;h;$m;m;$s;s");
//日期格式化
function formatTime(fra,$time,$type){
	var date=new Date($type?{"Unix":$time*1000,"UTC":$time-288e5}[$type]:$time);	
	if(!date.getTime())	return null;
 	var y=date.getFullYear(),m=date.getMonth()+1,d=date.getDate(),h=date.getHours(),m2=date.getMinutes(),s=date.getSeconds();
    var obj=timeStr,temp=obj,str2="",dataStr="",data={Y:y,$Y:y.toString().substr(2),$M:B(m),M:m,$D:B(d),D:d,$h:B(h),h:h,$m:B(m2),m:m2,$s:B(s),s:s};
	 switch(fra){
		case "toUTC":
			with(date)dataStr=Date.UTC(getFullYear(),getMonth(),getDate(),getHours(),getMinutes(),getSeconds())		
		break
		case "toUnix":
			dataStr=+date/1000^0
		break
		default:
		 for(var i=0,il=fra.length,t;i<il;){
			str=fra.charAt(i)
			if(temp=temp[str]){
				str2+=str;		
				if(temp.end){
					dataStr+=data[str2];
					str2="";
					temp=obj
					}
				}else{
					temp=obj;
					str2="";
					dataStr+=str
				}
			i++
			}
		break
		}
	return dataStr
}


//返回路径中的最后一层目录
function urlFolder($str){
	var s,a,l;
	if(!$str){
		s=location.pathname;
		s=location.origin+s.substr(0,s.lastIndexOf("/"))
		}else{
			l=$str.search(/[\#\?]/g)
			s=l>-1?$str.substr(0,l):$str
			s=s.substr(0,s.lastIndexOf("/"))
			}
	return s+"/"
	}			

//ajax方法
function setAjax(a,b,c,d,e){
		return new function(){
			var t=this,errRun=0;
			t.method=a||"get";      
			t.action=b;      
			t.async=(c!=undefined?c:true);  
			t.callBack=(typeof(e)=="function"?e:0)         
			t.data=d||null;	
			t.Open=t.Send=t.Test=t.Over=Function;
			t.Err=function(){xmlhttp=null}
			t.send=function(xmlCache){
			var	xmlhttp=xmlObj();
			    xmlhttp.open(t.method,t.action,t.async);
			  t.set&&t.set.call(xmlhttp);
			  if(t.method.toUpperCase()=="POST"){
					if(!t.set)xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");
				}
				function err(){
					t.stop();
					if(errRun)return;errRun=1;
					typeof(t.err)==="function"&&t.err()
					}
				  xmlhttp.onreadystatechange=function(){
					  if(xmlhttp.readyState===4){				
						  if(xmlhttp.status===200||xmlhttp.status===304){
								t.err=null								
							  if(t.callBack)t.callBack.call(xmlhttp,xmlhttp.responseText);//responseXML responseText
								xmlhttp=null;
						 }else{
							 xmlhttp=null;
							 err()
						 }
					  }
				  }				  
				  xmlhttp.send(t.data);
				  t.stop=function(){					
					xmlhttp&&xmlhttp.abort()
					}	
				setTimeout(function(){	
					if(t.err)err()
				},15000)						  
				};
			}	
		}
function setItem($c,$k,$o){		
	var k=$k||";",sl=$c.length,i=0,o=$o||{},it=o,t
	for(;i<sl;i++){
		t=$c.charAt(i)
		if(t!==k){
			if(it[t]){
				it=it[t];it.tag=$k;
			}else{
				it=it[t]={};it.tag=$k;
			}
		}else{
			it.end=true;		
			it=o;
		}
	}
	it.end=true	
	return o
}
function insertText(obj,str) {
	if (document.selection) {
		var sel = document.selection.createRange();
		sel.text=str;
	} else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
		var startPos=obj.selectionStart,
			endPos=obj.selectionEnd,
			cursorPos=startPos,
			tmpStr=obj.value;
		obj.value=tmpStr.substring(0,startPos)+str+tmpStr.substring(endPos,tmpStr.length);
		cursorPos+=str.length;
		obj.selectionStart=obj.selectionEnd=cursorPos;
	} else {
		obj.value += str;
	}
}
function moveEnd(obj){
	obj.focus();
	var len = obj.value.length;
	if (document.selection) {
		var sel = obj.createTextRange();
		sel.moveStart('character',len);
		sel.collapse();
		sel.select();
	} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
		obj.selectionStart = obj.selectionEnd = len;
	}
} 	
//千分制		
function qfz($n){
	return $n.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
	}
function noPop(e){
	e.preventDefault();
	e.stopPropagation();
	e.returnValue=false;
	e.cancelBubble=true
}
function xdAlbum(box,option){
	//初始化所有变量
		var isTouch=('ontouchstart' in window)
			,evtS="mousedown",evtM="mousemove",evtE="mouseup"
			,getTouchType=function(e,type){return e[type]},eve=function(e,type){return e[type]}
			,startY,endY
			,_t=this
			,_box=box				//盒子对象
			,_boxSty=_box.style			//设置盒子的变量
			,_option=option||{}			//设置参数	
			,_childs=_box.children
			,_childsCount=_childs.length
			,_origin=0		
			,_delay=300					//延时清零
			,_maxPoint=_option.maxPoint||_childsCount-1 //设置最大可显示的点
			,_minPoint=_option.minPoint||0
			,_X=0,_Y=0,_x=0,_y=0
			,arg=0.5
			,winW=window.innerWidth
			,winH=window.innerHeight
			,_startX,_startY
			,runTime=_option.runTime||500 //设置一个过度时间
			,_transition=_option.transition||'all '+runTime+'ms ease' //过渡属性设置
			,translateX=0
			,translateY=0
			,_move=0		//子对象默认不可移动
			,_scale=1		//默认缩放级别
			,_clickCount=0	//点击次数
			,_pointCount=0  //触摸点的数量
			;
			_t.restEnd=option.restEnd;
			if(isTouch){
				evtS="touchstart";evtM="touchmove";evtE="touchend";
				evt=function(e,type){return e.touches[0][type]};
				getTouchType=function(e,type){return e.changedTouches[0][type]}
			}	
			_t.handleEvent=function(e){
					_pointCount=_t.canScale?e.touches.length:1;
					switch(e.type){
						case evtS:
							touchStart(e);
							break;
						case evtM:	
							touchMove(e);										
							break;
						case evtE:
							touchEnd(e);					
							break;	
					}
					setTimeout(function(){_clickCount=0},_delay)					
				};	
				
			function touchStart(e){
						_t.run = true;
						_t.moveReady =false;
						_boxSty.webkitTransition="";							
						translateX=0;
						translateY=0;
						_x=0;_y=0;										
						_origin=0;
						_startX=getTouchType(e,'pageX');
						_startY=getTouchType(e,'pageY');
						_t.startTime =e.timeStamp
						}
			function touchMove(e){
				if(!_t.run)return false;					
					var pageX=getTouchType(e,'pageX')
					,pageY =getTouchType(e,'pageY')
					,distX=pageX-_startX	//计算移动水平与垂直的距离	
					,distY=pageY-_startY
					,absX=Math.abs(distX)
					,absY=Math.abs(distY);	
					if(absX>absY){ // 判断水平还是垂直
						var newX=_t.currentX+distX;				 
						setTranslate(newX);//正常移动
						_t.space=distX;//赋值移动变量
						_origin=distX>0?-1:1;//计算滑动的方向
						noPop(e)
					}else if(absY>absX){//垂直方向
					return 
						var newY=_t.currentY+distY;				 
						setTranslate(newY);//正常移动
						_t.space=distX;//赋值移动变量
						_origin=distY>0?-1:1;//计算滑动的方向
						noPop(e)			
						}
					}				
			function touchEnd(e){
					_t.run=false;
					var space=0,point=_t.currentPoint;
					_boxSty.webkitTransition=_transition;
					_boxSty.transition=_transition;					 					
					if(Math.abs(_t.space)>_t.range){							
						point=point+_origin						
						_t.moveToPoint(point<0?0:point>_maxPoint?_maxPoint:point)
					}else{
						_t.moveToPoint(_t.currentPoint)
					} 						
					_pointCount=0 				
				}									

			_t.toNext=function(){
					if(_t.currentPoint<_maxPoint)_t.moveToPoint(_t.currentPoint + 1)
				};
			_t.toPrev=function(){
					if(_t.currentPoint>_minPoint)_t.moveToPoint(_t.currentPoint - 1);
				};
			_t.moveToPoint=function(index){
					var space=-index*_t.distance;					
						setTranslate(space);
						_t.currentPoint=index;						
						_t.currentX=space;
						typeof _t.restEnd==="function"&&_t.restEnd.call(_t,index)		
				};
			_t.toPosition=function(index){
				_boxSty.webkitTransition="";
				_boxSty.transition="";
				var space=-index*_t.distance;				
					_t.currentPoint=index;						
					_t.currentX=space;
				 setTranslate(space,function(){
					 setTimeout(function(){_boxSty.webkitTransition=_transition},runTime)
					 })
				}				
			function setTranslate(x){					
					_boxSty.webkitTransform='translate3d('+x+'px, 0, 0)';					
				};
			 _t.noThing=function(){
					$.delEvent(box,evtS,T,false);
					$.delEvent(box,evtM,T,false);
					$.delEvent(box,evtE,T,false)	
				};
			_t.getPoints=function(point){
				return point?_t.maxPoint=point:_t.maxPoint
				}		
			function calcSqrt(x,y){			
				return Math.sqrt(Math.pow(x[0]-x[1],2)+Math.pow(y[0]-y[1],2))
				};				
			_t.currentPoint=_option.currentPoint||0;	
			_t.distance=_option.distance||_box.scrollWidth / (_childsCount);
			_t.toPosition(_t.currentPoint);															
			_t.range=_option.range||50;				
			_t.child=_childs[_t.currentPoint];		
			addEvent(box,evtS,_t,false);
			addEvent(box,evtM,_t,false);
			addEvent(box,evtE,_t,false);			
			typeof _option.done	=="function"&&_option.done.call(_t);
	};		
function wxApi(option){
		var wxData = option ||{},
			WeixinApi = (function(){
				"use strict";
				function weixinShareTimeline(data, callbacks){
					callbacks = callbacks ||{};
					var shareTimeline = function(theData){
						WeixinJSBridge.invoke('shareTimeline',{
							"appid": theData.appId,
							"img_url": theData.imgUrl,
							"link": theData.link,
							"desc": theData.desc,
							"title": theData.desc,
							"img_width": "640",
							"img_height": "640"
						}, function(resp){
							switch (resp.err_msg){
								case 'share_timeline:cancel':
									callbacks.cancel && callbacks.cancel(resp);
									break;
								case 'share_timeline:confirm':
								case 'share_timeline:ok':
									callbacks.confirm && callbacks.confirm(resp);
									break;
								case 'share_timeline:fail':
								default:
									callbacks.fail && callbacks.fail(resp);
									break;
							}
							callbacks.all && callbacks.all(resp);
						});
					};
					WeixinJSBridge.on('menu:share:timeline', function(argv){
						if (callbacks.async && callbacks.ready){
							window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
							if (window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0){
								window["_wx_loadedCb_"] = new Function();
							}
							callbacks.dataLoaded = function(newData){
								window["_wx_loadedCb_"](newData);
								shareTimeline(newData);
							};
							callbacks.ready && callbacks.ready(argv);
						} else{
							callbacks.ready && callbacks.ready(argv);
							shareTimeline(data);
						}
					});
				}
				function weixinSendAppMessage(data, callbacks){
					callbacks = callbacks ||{};
					var sendAppMessage = function(theData){
						WeixinJSBridge.invoke('sendAppMessage',{
							"appid": theData.appId,
							"img_url": theData.imgUrl,
							"link": theData.link,
							"desc": theData.desc,
							"title": theData.title,
							"img_width": "640",
							"img_height": "640"
						}, function(resp){
							switch (resp.err_msg){
								case 'send_app_msg:cancel':
									callbacks.cancel && callbacks.cancel(resp);
									break;
								case 'send_app_msg:confirm':
								case 'send_app_msg:ok':
									callbacks.confirm && callbacks.confirm(resp);
									break;
								case 'send_app_msg:fail':
								default:

									callbacks.fail && callbacks.fail(resp);
									break;
							}
							callbacks.all && callbacks.all(resp);
						});
					};
					WeixinJSBridge.on('menu:share:appmessage', function(argv){
						if (callbacks.async && callbacks.ready){
							window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function;
							if (window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0){
								window["_wx_loadedCb_"] = new Function;
							}
							callbacks.dataLoaded = function(newData){
								window["_wx_loadedCb_"](newData);
								sendAppMessage(newData);
							};
							callbacks.ready && callbacks.ready(argv);
						} else{
							callbacks.ready && callbacks.ready(argv);
							sendAppMessage(data);
						}
					});
				}
				function imagePreview(curSrc, srcList){
					if (!curSrc || !srcList || srcList.length == 0){
						return;
					}
					WeixinJSBridge.invoke('imagePreview',{
						'current': curSrc,
						'urls': srcList
					});
				}
				function showOptionMenu(){
					WeixinJSBridge.call('showOptionMenu');
				}
				function hideOptionMenu(){
					WeixinJSBridge.call('hideOptionMenu');
				}
				function showToolbar(){
					WeixinJSBridge.call('showToolbar');
				}
				function hideToolbar(){
					WeixinJSBridge.call('hideToolbar');
				}
				function getNetworkType(callback){
					if (callback && typeof callback == 'function'){
						WeixinJSBridge.invoke('getNetworkType',{}, function(e){
							callback(e.err_msg);
						});
					}
				}
				function closeWindow(){
					WeixinJSBridge.call("closeWindow");
				}

				function wxJsBridgeReady(readyCallback){
					if (readyCallback && typeof readyCallback == 'function'){
						var Api = this;
						var wxReadyFunc = function(){
							readyCallback(Api);
						};
						if (typeof window.WeixinJSBridge == "undefined"){
							if (document.addEventListener){
								document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
							} else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
								document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
							}
						} else{
							wxReadyFunc();
						}
					}
				}
				return{
					version: "2.0",
					ready: wxJsBridgeReady,
					shareToTimeline: weixinShareTimeline,
					shareToFriend: weixinSendAppMessage,
					showOptionMenu: showOptionMenu,
					hideOptionMenu: hideOptionMenu,
					showToolbar: showToolbar,
					hideToolbar: hideToolbar,
					getNetworkType: getNetworkType,
					imagePreview: imagePreview,
					closeWindow: closeWindow
				};
			})();
		WeixinApi.ready(function(Api){
			var wxCallbacks ={
				ready: function(){},
				cancel: function(resp){},
				fail: function(resp){},
				confirm: function(resp){
					typeof(wxData.add) === "function" && wxData.add()
				},
				all: function(resp, shareTo){}
			};
			Api.shareToFriend(wxData, wxCallbacks);
			Api.shareToTimeline(wxData, wxCallbacks);
		});
	} 	
function drawRound(options,endFun){
    var W=options.width,
      H=options.height,
	  data=options.data,
      centerX= W/2,
      centerY= H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings ={
        segmentShowStroke :true,
        segmentStrokeColor:"#0C1013",
        segmentStrokeWidth:20,
        baseColor: "rgba(0,0,0,0.7)",
        baseOffset:1,
        edgeOffset:1,//offset from edge of $this       
        animation : true,
        animationSteps:60,
        animationEasing:"easeInOutExpo", //"linear" ,//
        animateRotate : true       
      },	  
	  animationOptions={
        linear:function (t){
          return t;
        },
        easeInOutExpo:function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },		
	    $svg=options.ele,
        $paths=[],
        easingFunction =animationOptions[settings.animationEasing],
        cutoutRadius=W>>1,//外圆
        doughnutRadius=cutoutRadius-options.radiusWidth, //内圆
        segmentTotal = 0, 
      requestAnimFrame=function(){
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback,1000/60);
          };
      }();
	$svg.style.width=W+"px"
	$svg.setAttribute("height",H);
	$svg.setAttribute("viewBox","0 0 "+W+" "+H)
    for (var i=0,len = data.length,p; i < len; i++) {
		  segmentTotal+=data[i].value;
		  $paths[i]=document.createElementNS('http://www.w3.org/2000/svg','path')	 
		 p=$paths[i]   
//       p.setAttribute("stroke-width",settings.segmentStrokeWidth)
//       p.setAttribute("stroke",settings.segmentStrokeColor)
         p.setAttribute("fill",data[i].color)
         $svg.appendChild(p)
    }
    function drawPieSegments(animationDecimal) {
      var startRadius=-PI/2, 
	     //-90 degree
          rotateAnimation = 1;
      if (settings.animation && settings.animateRotate) rotateAnimation = animationDecimal;
      for (var i = 0, len = data.length; i < len; i++){
        var segmentAngle=rotateAnimation*((data[i].value/segmentTotal)*(PI*2)),
            endRadius = startRadius + segmentAngle,
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,			
            endX2 = centerX + cos(startRadius) * cutoutRadius,			
            endY2 = centerY + sin(startRadius) * cutoutRadius,			
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,			
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', startX2,startY2,//Draw line path(this line connects outer and innner arc paths)
          'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,//Draw inner arc path
          'Z'//Cloth path
        ];
		var d=cmd.join(' ')
        $paths[i].setAttribute("d",d);
        startRadius += segmentAngle;
      }
    }  
    function animateFrame(cnt) {
      var easeAdjustedAnimationPercent=(settings.animation)? CapValue(easingFunction(cnt), null, 0) : 1;	  
      drawPieSegments(easeAdjustedAnimationPercent);
    }
   (function(){
      var animFrameAmount = (settings.animation)? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1) : 1,
          cnt =(settings.animation)? 0 : 1;
      requestAnimFrame(function() {
          cnt+=animFrameAmount;
          animateFrame(cnt);
          if (cnt <= 1) {
            requestAnimFrame(arguments.callee);
          } else {
			 typeOf(endFun)==="function"&&endFun()
          }
      });
    }());	
    function Max(arr) {return Math.max.apply(null, arr);}
    function Min(arr) {return Math.min.apply(null, arr);}
    function isNumber(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
    function CapValue(valueToCap, maxValue, minValue){
      if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
      if (isNumber(minValue) && valueToCap < minValue) return minValue;
      return valueToCap;
    }
  };
  
/*提示用户*/		
//提示方法
function tishi($c,options){
	var opt=options||{},t=this,boxSty,bgSty,bg,box;
	if(!window.xdAlert){
		setStyle(".xdAlert_bg{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;background:rgba(0,0,0,.7);-webkit-transition:background 400ms ease;}.xdAlert_bg.display{display:block}.xdAlert_box{position:absolute;display:table;text-align:center;color:#fff;font-size:16px;background:rgba(0,0,0,.5);top:50%;left:50%;max-width:90%;-webkit-transform:translate3D(-50%,-50%,0);border-radius:6px;padding:10px;opacity:0;margin:-60px 0 0 0;box-sizing:border-box;-webkit-transition:margin 400ms ease,opacity 500ms ease;}.xdAlert_box.show{opacity:1;margin:0 0 0 0;}.xdAlert_box.MoveHide{-webkit-animation:iHidd 350ms forwards;}@-webkit-keyframes iShow{0%{opacity:0;margin:-60px 0 0 0}100%{opacity:1;margin:0 0 0 0}}@-webkit-keyframes iHidd{0%{opacity:1;margin:0 0 0 0;}100%{opacity:0;margin:-60px 0 0 0;}}")
		window.xdAlert={}
	}
	if(t===window){
		t=window.xdAlert
	}
	create()
	t.time&&clearTimeout(t.time);
	t.showTime=opt.showTime||1000;//默认显示时长，如果没设置在1秒后隐藏
	t.hiddFun=opt.hiddFun;
	t.show=show;
	t.hidd=hidd;
	t.bgSty=opt.bgSty;
	t.boxSty=opt.boxSty;
	bgSty=t.bg.style;
	boxSty=t.box.style;
	show();
	return t
function create(){
	if(!t.bg){
		t.bg=createNode(opt.box||document.body,"div",{className:"xdAlert_bg"},"p3");
		t.box=createNode(t.bg,"div",{className:"xdAlert_box"},"p2")
		}
	}		
function show($s,$fun){
	var content=$s||$c||"",type=typeOf(content);//显示当前内容，初始内容，空白内容
	if(t.bgSty)bgSty.cssText=t.bgSty;
	if(t.boxSty)boxSty.cssText=t.boxSty;
	if(type==="DOM")
	t.box.appendChild(content)
	else
	t.box.innerHTML=content
	t.bg.classList.add("display");
	setTimeout(function(){
		t.type="show";
		t.box.classList.add("show")
	},100)
	t.time=setTimeout(function(){hidd($fun)},t.showTime);
}		
function hidd($fun){
	t.box.classList.remove("show");
	t.time=setTimeout(function(){
		t.type="hidd";
		t.bg.classList.remove("display");
		},600);
	isFun($fun||t.hiddFun)
	}
}
//新提示方法
function mAlert(){
	var t={}
	setStyle('.mAlert_bg{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1001;-webkit-transition:background 400ms ease;}\
		.mAlert_bg.display{display:block}\
		.mAlert_box{position:absolute;display:table;text-align:center;color:#fff;font-size:16px;background:rgba(0,0,0,.5);top:50%;left:50%;max-width:90%;-webkit-transform:translate3D(-50%,-50%,0);border-radius:6px;padding:10px;opacity:0;margin:-60px 0 0 0;box-sizing:border-box;-webkit-transition:margin 400ms ease,opacity 500ms ease;}\
		.mAlert_box.show{opacity:1;margin:0 0 0 0;}\
		.mAlert_box.MoveHide{-webkit-animation:iHidd 350ms forwards;}\
		@-webkit-keyframes iShow{0%{opacity:0;margin:-60px 0 0 0}100%{opacity:1;margin:0 0 0 0}}\
		@-webkit-keyframes iHidd{0%{opacity:1;margin:0 0 0 0;}100%{opacity:0;margin:-60px 0 0 0;}}')
	t.bg=createNode(document.body,"div",{className:"mAlert_bg"},"p3");
	t.box=createNode(t.bg,"div",{className:"mAlert_box"},"p2")
	t.flag=true;//true 执行提示  false:不执行提示
	return function($c,$opt){
		var content=$c||'',opt=$opt||{},color=opt.color,bg=opt.bg||false,showTime=opt.showTime||1000,boxSty=t.box.style,bgSty=t.bg.style,boxCss=opt.boxCss,fun=opt.fun
		t.box.innerHTML=content;
		if(!t.flag)return
		t.flag=false	
		if(boxCss)boxSty.cssText=boxCss;
		if(color)boxSty.cssText='color:'+color+';';
		if(bg)bgSty.cssText='background-color:rgba(0,0,0,.7);';
		t.bg.classList.add("display");
		setTimeout(function(){
			t.type="show";
			t.box.classList.add("show")
		},100)
		t.time=setTimeout(function(){
			t.box.classList.remove("show");
			setTimeout(function(){
				t.bg.classList.remove("display");
				isFun(fun)
				t.flag=true;
			},400)
		},showTime);
	}
}
function t2s($t,$now){
	var t=($now-$t)/1000^0,s=""
	if(t>31536000){
		s=+n2t(t,[{v:31536000,u:"",hidd:1}])+"年前"
		}else if(t>2592000){
			s=+n2t(t,[{v:2592000,u:"",hidd:1}])+"月前"
			}else if(t>604800){
				s=+n2t(t,[{v:604800,u:"",hidd:1}])+"周前"
				}else if(t>86400){
					s=+n2t(t,[{v:86400,u:"",hidd:1}])+"天前"
					}else if(t>3600){
						s=+n2t(t,[{v:3600,u:"",hidd:1}])+"小时前"
						}else if(t>60){
							s=+n2t(t,[{v:60,u:"",hidd:1}])+"分钟前"
							}else if(t>0){
								s=t+"秒前"
								}else{
									s="刚刚"
									}
	return s
	}
function paopao($opt){
	var	divWidth=$opt.width
	,divHeight=$opt.height
	,className=$opt.className
	,frameLen=$opt.frameLen
	,runTime=$opt.runTime
	,frameImg=$opt.frameImg	
	,framePosition=$opt.framePosition||"center"
	,ele=createNode($opt.ele,"div",{className:"paopao "+(className||"")})
	,il=frameLen+1
	,i=0
	,space=divWidth
	,speed=1000/frameLen*runTime
	,sty=ele.style
	,time
	if($opt.style)sty.cssText=$opt.style;
	sty.pointerEvents="none";
	!className&&(sty.backgroundImage="url("+frameImg+")");
	sty.width=divWidth+"px";
	sty.height=divHeight+"px";
	sty.backgroundRepeat="no-repeat"
	sty.backgroundSize=(divWidth*frameLen)+"px auto";
	sty.backgroundPosition=-(i*space)+"px "+framePosition;
	time=setInterval(function(){
		if(i<il){
			sty.backgroundPosition=-(i*space)+"px "+framePosition;
			$opt.runFun&&isFun($opt.runFun,i);
			i++;
		}else{
			clearInterval(time)
			$opt.overFun&&isFun($opt.overFun)
			removeNode(ele)
			}
		},speed)
	}
/*
绑定事件委托
*/
function eventEntrust($opt){
var ele=$opt.ele,event=$opt.event,action=$opt.action||"action",split=$opt.splitStr||".,";
	addEvent(ele,event,function(e){
		var ele=e.srcElement||e.target,attribute,argument,a1,targetElem=ele,arr=[];	
		do{
			if(ele.nodeType!==1)break
			if(attribute=ele.getAttribute(action))break			
			}while(ele=ele.parentNode);								
		if(attribute){		
			arr=attribute.split(split);
			arr.push(targetElem);
			typeof($opt.fun)==="function"&&$opt.fun.apply(ele,arr);
		}
		$opt.stopPropagation&&e.stopPropagation();
		$opt.preventDefault&&e.preventDefault();				
	})	
}		
//去缓存随机数
function nocache(){
	return "nocache="+Math.random()
	}		
function calcNum($e,$n,$c,$f){
	var n=$n,c=$c,str="";																							
		tv=setInterval(function(){
			n--;			
			if(n>-1){	
				str=""+n;
				for(var i=str.length;i<c;i++){
					str="0"+str
					}						
			}else{		
				clearInterval(tv);				
				typeOf($f)==="function"&&$f()
			}			
			$e.innerHTML=str.replace(/(.)/g,"<b>$1</b>")
		},1000)																									
	}
function calcNum2($e,$n,$c,$f){
	var n=$n,c=$c,str="";																					
		tv=setInterval(function(){
			n--;
			if(n>-1){
				mins = Math.floor(n/60);
				sec = Math.floor(n%60);
				if(mins<10){mins="0"+mins;}else{mins=""+mins}	
				if(sec<10){sec="0"+sec}else{sec=""+sec}	
			}else{		
				clearInterval(tv);				
				typeOf($f)==="function"&&$f()
			}			
			$e.innerHTML=mins.replace(/(.)/g,"<b>$1</b>")+":"+sec.replace(/(.)/g,"<b>$1</b>")
		},1000)	
	}


//数字转倒计时间
function n2t($n,$fra){
	var a=$fra||[{v:86400,u:"天"},{v:3600,u:"小时"},{v:60,u:"分钟"},{v:1,u:"秒"}],al=a.length,i=0,t1,t2=$n,v,u,d,str="";
	for(;i<al;i++)d=a[i],v=d.v,u=d.u,str+=(t2>=v?(t1=t2/v^0,t2=t2%v,B(t1)+u):d.hidd?"":"00"+u)	
		return str
	}
function setStyle(css,_){
		var sty=document.createElement("style")
		sty.setAttribute("type","text/css");
		sty.styleSheet?sty.styleSheet.cssText=css:sty.innerHTML=css
		_?_.appendChild(sty):document.documentElement.firstChild.appendChild(sty);
};	
// 解析成对象
function toObject($data){return typeof($data)==="object"?$data:eval("("+$data+")")}
//返回系统标识
function getOS(){
		var OSA=["windows","ipad","ipod","iphone","android"],OSL=OSA.length,OS,UA=navigator.userAgent.toLowerCase()
		while(OS=OSA.shift())if(UA.indexOf(OS)>-1)break;
		return OS
	}	
//判断是否是function	
function isFun($fun){var a;
	return typeof($fun)==="function"?(a=[].slice.call(arguments),$fun.apply(a.shift(),a)):function(){}
	}
function setMoney($s){
	var b=""+$s;
	return b.replace(/(..)$/,".$1")
	}	
function isPhone($s){var s=+$s;return (s<18999999999&&s>13000000000)?1:0}	
function jsonJoin($o,$s){
	var i,s=$s||"&",r="",v
	for(i in $o){
		if($o.propertyIsEnumerable(i)){
			v=$o[i]
			r+=s+i+"="+(typeof v==="object"?JSON.stringify(v):v)
			}
		}
	return r.substr(1)	
	}
function wxShare($opt){
	var opt=$opt||{},DB=document.body;
	if(window.shaketv){
		shaketv.wxShare(
			opt.ico,
			opt.title,
			opt.desc,
			opt.link
			)
		}else{
		window.getWX=function($data){
			setJsonp("//res.wx.qq.com/open/js/jweixin-1.0.0.js",function(){
				wx.config({
				  debug:false,
				  appId:$data.appid,
				  timestamp: $data.timestamp,
				  nonceStr: $data.noncestr,
				  signature:$data.signature,
				  jsApiList:'checkJsApi,onMenuShareTimeline,onMenuShareAppMessage,onMenuShareQQ,onMenuShareWeibo,hideMenuItems,showMenuItems,hideAllNonBaseMenuItem,showAllNonBaseMenuItem,translateVoice,startRecord,stopRecord,onRecordEnd,playVoice,pauseVoice,stopVoice,uploadVoice,downloadVoice,chooseImage,previewImage,uploadImage,downloadImage,getNetworkType,openLocation,getLocation,hideOptionMenu,showOptionMenu,closeWindow,scanQRCode,chooseWXPay,openProductSpecificView,addCard,chooseCard,openCard'.split(",")
				 });
				wx.ready(function(){
					isFun($opt.strFun,wx);
					wx.onMenuShareAppMessage({
					  title:opt.title,
					  desc:opt.desc,
					  link:opt.link,
					  imgUrl:opt.icon,
					  trigger:function(res){isFun(opt.trigger)},
					  success:function(res){isFun(opt.success)},
					  cancel:function(res){isFun(opt.cancel)},
					  fail:function(res){isFun(opt.fail)}
					}); 
					wx.onMenuShareTimeline({
					  title:opt.desc,
					  link: opt.link,
					  imgUrl:opt.ico,
					  trigger:function(res){isFun(opt.trigger)},
					  success:function(res){isFun(opt.success)},
					  cancel:function(res){isFun(opt.cancel)},
					  fail:function(res){isFun(opt.fail)}
					});					
					})
				})
			}
			setJsonp(HOST.AD+"/ufo/signature?cb=getWX&url="+encodeURIComponent(opt.resources)+"&wx_token=46497107fa23")			
		}
}
function setSocket($opt){
	var i=0,errCount=5,t=this,sender=$opt.sender||"",channel=$opt.channel||"",js=$opt.js||"//a-h5.mtq.tvm.cn/yao/common/jc/sockjs-0.3.min.js";
	if(!window.SockJS)setJsonp(js,c);
	else c();	
	function c(){
		var so=new SockJS($opt.url)
		so.onopen=function(){
		    mainVar.openType=1;
			sendMsg('','sockjs:joinChannel')	
		};
		so.onmessage=function($data){
			$opt.onmessage($data.data)
			};
		so.onclose=function(){			
			so=null;
			mainVar.socketType=1;
			isFun($opt.onerr);
		};	
		t.sendMsg=function(msg){
			sendMsg(msg,"sockjs:sendMessage")
			};
		t.close=function(){so&&so.close()}
		function sendMsg(msg,event){
			so&&so.send(joinMsg(msg,event));
		}
	}
	function joinMsg(msg,event){
		return JSON.stringify({'channel':channel,'uuid':'','data':{message:encodeURIComponent(msg),sender:sender},'event':event})
	}
}
function docAction(e,$opt){
	var ele=e.srcElement||e.target,opt=$opt||{},_action=opt.action||"action",attribute,argument,a1;
		do{
			if(ele.nodeType!==1)break
			if(attribute=ele.getAttribute(_action))break			
			}while(ele=ele.parentNode)					
		if(attribute){							
			isFun(opt.fun,ele,attribute)
		}
	}
function getUserInfo($id,$fun){
	window.xxx=$fun;
	setJsonp(HOST.AD+"/ufo/puserinfo?wx_token=46497107fa23&openid="+$id+"&cb=xxx&"+nocache(),function(){setTimeout(function(){xxx=null},100)})
	}
function getUSER($i,$url,$u,$fun){	
	var d=setAjax("GET",HOST.RTS+"/userinfo/get?systoken=uuETOJuZ&"+$url+"&"+nocache())
	d.callBack=function($data){
		var data=toObject($data),channel,p,pos={};		
//		channel=data.channel_list;
//		if(channel){
//			for(var i in channel){
//				$u.channel=channel[i];
//				break
//				}
//			$u.cOut=+new Date
//			}
		if(data.status===true){
			data=data.data;
			if(p=data.address){
				pos.region="中国-"+p.provice+"-"+p.city+"-"+p.area;
				pos.address=p.street;
				pos.latitude=p.latitude;
				pos.longitude=p.longitude;
				pos.gps=p.latitude+","+p.longitude;
				pos.adcode=data.adcode;
			}
				$u.location=pos;
				data.age&&($u.age=+data.age);
				data.sex&&($u.sex=+data.sex);
				data.tvmid&&($u.tvmid=data.tvmid);			
				isFun($fun)
		}else{
			getUserInfo($u.ttdsbopenid,function($data){
				var data=toObject($data);
				if(data.err===false){
					data=data.msg;
					!$u.location&&($u.location={region:"0-0-0-0",latitude:"0",longitude:"0",gps:"0,0",adcode:0})
					$u.nickname=data.nickname;
					$u.weixin_avatar_url=data.avatar_url;
					$u.request="XD";
					$u.appToken=data.token;						
					isFun($fun)
					}
				})			
			}
			d=null;
			setUSER($u);
	}
	d.send()
}
function setUSER($u){
	localStorage.setItem("US"+$u.openid,JSON.stringify($u));
	}
function toSQ($opt){
	var UA=navigator.userAgent.toLowerCase(),userInfo=$opt.userInfo,search,url,openid,sig;
	userInfo.isWX=UA.indexOf("micromessenger")>0?1:0;
	//if(UA.indexOf("app_")!=0){
			var WVJBIframe=document.createElement('iframe'),time,count=0;
				window.WVJBCallbacks=[function(){}];
				WVJBIframe.style.display='none';
				WVJBIframe.src='wvjbscheme://__BRIDGE_LOADED__';
				document.documentElement.appendChild(WVJBIframe);
				g();
				function g(){
				  if(window.WebViewJavascriptBridge){
					  clearTimeout(time);
					  WebViewJavascriptBridge.callHandler("callNativeToDo",{action:"get_userinfo",data:{},callback:1},function($o){
						parseUS($o,"app")
					  })
						document.documentElement.removeChild(WVJBIframe);
						WVJBIframe=null;					  
				  }else{
					if(count<10){
						count++;
						time=setTimeout(g,50);
					}else{
						var u=toObject(localStorage.getItem("userInfo"))
						if(u){window.userInfo=u;
							isFun($opt.fun)
							}else{
								tishi("获取身份失败！",{showTime:9e8})
							}
						}
				  }
				}
			return
	//		}
	function parseUS($data,$item){
		var data=toObject($data),lat,lng;
		switch($item){
			case"app":
				userInfo.openid=data.ttopenid||data.tvmid;
				userInfo.sig=data.mtqsign;
				userInfo.tokenSig=data.wxTokenSig;
				userInfo.sigExpire=data.sigExpire;
				userInfo.nickname=data.nickname;
				userInfo.weixin_avatar_url=data.headimgurl;
				userInfo.tvmid=data.tvmid;
				userInfo.request="XD";
				userInfo.appToken=data.token;
				lat=data.latitude||"39.93299",lng=data.longitude||"116.45548"
				userInfo.location={lat:lat,lng:lng,region:"0-0-0-0",adcode:110100,gps:lat+","+lng}
				localStorage.setItem("userInfo",JSON.stringify(userInfo))
			break
			case"gzh":
			break
		}
			isFun($opt.fun)
	}					
}

 function qqDistance($opt){
	 var EARTH_RADIUS=6378137,latlng=($opt.from+","+$opt.to).split(",")
	 ,$lat1=latlng[0],$lng1=latlng[1],$lat2=latlng[2],$lng2=latlng[3]
	 ,radLat1 = toRad($lat1)
	 ,radLat2 = toRad($lat2)
	 ,a = radLat1 - radLat2
	 ,b = toRad($lng1) - toRad($lng2)
	 ,s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	  s = s*EARTH_RADIUS;
	  s = Math.round(s*10000)/10000;
	 isFun($opt.fun,s)
}
function toRad($a){
	return $a*Math.PI/180
}
function displayY8(){
	var Y8=document.getElementById("Y8")
	if(!Y8){
		Y8=createNode(document.body,"div",{id:"Y8",className:"Y8",html:"<div class='Y8mask' action='hidd'><img src='img/y8_info.png' action='down'></div><ul><li class='icoBox'><img src='img/y8_ico.png' class='ico'></li><li><img src='img/y8_down.png' class='down' action='display'></li><li action='close'><img src='img/y8_close.png' class='close'></li></ul>"},"p2")
		addEvent(Y8,"click",function(e){
			docAction(e,{action:"action",fun:function($t,$action){
						var action=$action.split(".,")
						switch(action[0]){
							case"display":
								Y8.firstChild.style.display="block"
							break
							case"close":
								c()
							break
							case"hidd":
								Y8.firstChild.style.display="none"
							break
							case"down":
							
							break
							}
						}
					})
				})
		Y8.height=Y8.offsetHeight;
		Y8.style.marginTop=-Y8.height+"px"
		}
	var sty=Y8.style;
	function s(){
		//mainBody.style.marginTop=Y8.height+"px";
		sty.webkitTransition="all 350ms ease"
		sty.marginTop=0
		//sty.webkitTransform="translate(0,0)"
		}
	function c(){
		sty.marginTop=-Y8.height+"px"
		//sty.webkitTransform="translate(0,-100%)"
		//mainBody.style.marginTop=0
		}	
	setTimeout(s,30)
	return{
		show:s,
		close:c
		}	
	}
function headImgErr($t){
	$t.src="http://q-cdn.mtq.tvm.cn/yao/images/default.png";
	}		
//主体构造函数
function XD_YZM($opt){
	var display=$opt.display||0,wrap=$opt.box||document.body,reload=$opt.reload||2,mc=0;
	if($opt.item==="JY")jy()
	else dc()
	function dc(){
	if(window.TouClick){
		!display&&YZM.start()
	}else{				
		r();	
		var ms,ti=0;
		function r(){
			setJsonp("//captcha-static.touclick.com/jslib/3ca99045-1540-4e9d-838e-713ece33e9c6.js?b=3ca99045-1540-4e9d-838e-713ece33e9c6",f)
		}
		function h(){
			wrap.style.display="none";
		}	
		function f(){
			if(window.TouClick){
				if(window.YZM&&YZM.dc)retrun;
				if(ms)ms.hidd()
				TouClick.ready(function(){
				var box=wrap,tc=TouClick(box,{
					onSuccess:function(obj){
						var data=obj||{}
						data.VerificationCodeType="touclick";
						$opt.success(data)
					},
					behaviorDom:0,
					captchaType:13,
					isOpenMask:function(){
						return 0;
					},
					onClose:h,					
					isCaptchaFloat:function(env){
						if(env == "pc"){
							return false;
						}else if(env == "mob"){
							return true;
						}
					}
				  });
				  if(!window.YZM){
					  window.YZM={}
				  };
				  YZM.toggleBtn=wrap.children[0];
				  YZM.method=$opt.item;
				  isFun($opt.callback);
				  YZM.dc={};
				  YZM.dc.show=function(){
					  wrap.style.display="block";
					  tc.start()
				  };
				  YZM.dc.hidd=function(){
					  h()
				  }  
				 var box=tc[0],a=box.querySelector(".touclick"),b=a.querySelector(".touclick-pub");
				 wrap.appendChild(b);
				 wrap.removeChild(a);
				 display&&setTimeout(YZM.show,10)
				 event();
				})
			}else{
				ti++
				if(ti<reload)setTimeout(r,2000)
				else{mc++
					if(mc>2)err()
					else
					 jy()
				}
			}
			}
		}
	}
	function event(){
		if(YZM.event){return}else{YZM.event=true};
		YZM.toggleBtn.addEventListener('touchstart',function(){
			var dcElem=document.querySelector('.touclick-block'),jyElem=null;
			if(YZM.jy){
				jyElem=YZM.jy.dom;
			};
			if(YZM.method=='DC'){
				YZM.method='JY';
				if(dcElem){
					dcElem.style.display="none";
				};
				if(jyElem){
					jyElem.style.display='block';
				}else{
					XD_YZM({
						box:wrap//必要元素，在哪个块状元素中显示
						,success:function($data){
							$opt.success($data)
						}
						,display:1 //创建时是否直接显示 1 / 0 可选 默认为0不显示 为1时直接显示
						,item:YZM.method //使用哪种验证码   DC / JY 默认DC为点触，JC为极验
						,reload:2   //失败重试次数
					});
				};
			}else{
				YZM.method='DC';
				if(dcElem){
					dcElem.style.display="block";
					XD_YZM({
						box:wrap//必要元素，在哪个块状元素中显示
						,success:function($data){
							$opt.success($data)
						}
						,display:1 //创建时是否直接显示 1 / 0 可选 默认为0不显示 为1时直接显示
						,item:YZM.method //使用哪种验证码   DC / JY 默认DC为点触，JC为极验
						,reload:2   //失败重试次数
					});
				};
				if(jyElem){
					jyElem.style.display='none';
				};
			};
		},false);
	}
	function err(){
		tishi("验证码出错了，请与管理员联系",{time:3e6})
	}
	function jy(){
		if(window.initGeetest){
			!display&&YZM.start()
		}else{				
			var ms,ti=0,config,run=0;
			c();r();
			function c(){
				var a=setAjax("GET","//pmall.yaotv.tvm.cn/open/geetest/register")
					a.callBack=function($data){
						var data=toObject($data)||{data:{gt:0,challenge:0,success:0}};
						config=data.data;
						f(1)
						}
					a.send()					
				}
			function r(){
				setJsonp("//static.geetest.com/static/tools/gt.js",f)
			}
			function f($d){
				if(window.initGeetest){						
					if(config){
						if(window.YZM&&YZM.jy)retrun;
					initGeetest({
						gt:config.gt,
						challenge:config.challenge,
						offline:!config.success
						},function(obj){
							setStyle(".gt_mobile_holder{position:relative;width:260px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);}")
							obj.appendTo(wrap);
							obj.onReady(function(){
							wrap.firstChild.addEventListener("click",function(e){
								e.stopPropagation();
								});
							});
							obj.onSuccess(function(){
								obj.hidd();
								var data=obj.getValidate()||{}
								$opt.success({challenge:data.geetest_challenge,validate:data.geetest_validate,seccode:data.geetest_seccode,VerificationCodeType:"geetest"});
								obj.refresh();
							});
							obj.show=function(){
								wrap.style.display="block"
							}
							obj.hidd=function(){
								wrap.style.display="none"
							}	
							if(!window.YZM){
								window.YZM={}
							};
							YZM.jy=obj;
							YZM.toggleBtn=wrap.children[0];
							YZM.method=$opt.item;
							isFun($opt.callback);
							display&&setTimeout(YZM.show,10)	
							event();
						});						
					}
				}else if(!$d){
					ti++;					
					if(ti<reload)setTimeout(r,2000)
					else{mc++
						if(mc>2)err()
						else
						dc()
					}
				}
			}
		}
	}	
}
function setAnimation($i){
return{c02:{a1:{position:"position:absolute;z-index:10;bottom:0;left:0;-webkit-transform:translate(0px,90px)",img:"img/texiao/daodan_1.png",frameLen:15,time:2,sound:"media/daodan_1.m4a",className:"daodan_1"},a2:{position:"position:absolute;z-index:10;bottom:0;left:0;-webkit-transform:translate(0px,16px)",img:"img/texiao/baozha_1.png",frameLen:17,time:2,framePosition:"2px",sound:"media/baozha_1.m4a",className:"baozha_1"}},c04:{a1:{position:"position:absolute;z-index:10;bottom:0;left:0;-webkit-transform:translate(0px,30px)",img:"img/texiao/daodan_2.png",frameLen:16,time:2,sound:"media/daodan_2.m4a",className:"daodan_2"},a2:{position:"position:absolute;z-index:10;bottom:0;left:0;-webkit-transform:translate(35px,0px)",img:"img/texiao/baozha_2.png",frameLen:12,time:2,framePosition:"center",sound:"media/baozha_2.m4a",className:"baozha_2"}},c00:{a1:{position:"position:absolute;z-index:10;top:0;left:0;-webkit-transform:translate(0,40px)",img:"img/texiao/qishe_2.png",frameLen:46,time:5,sound:"media/qishe_1.m4a",className:"qishe_1"},a2:{audio:"media/qibao_1.m4a"}}}[$i]
}
function ap1($url,$f){
	var url=$url||"media/empty.mp3",audio;
	if($f){
		if(!window[$f])window[$f]=audio=new Audio;
		else audio=window[$f]
	}else{
		if(!window.sound)window.sound=audio=new Audio;
		else audio=window.sound
	}
	audio.src=url;
	audio.play();
	};
function windowClose(){
	history.back()
//	var iframe=mainVar.iframe;
//	if(iframe){
//		mainVar.iframe=null;
//		removeNode(iframe)
//	}
}	