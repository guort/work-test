var HOST={
AD:"//mb.mtq.tvm.cn",
ADJS:"//tvmdata.oss-cn-hangzhou.aliyuncs.com",
API:"//count.yaotv.tvm.cn",
APICDN:"//q-cdn.mtq.tvm.cn",
BALANCE:"//ttye.yaotv.tvm.cn",
CARD:"//pmall.yaotv.meitiqiao.com",
CJ:"//cj.mtq.tvm.cn",
DOMAIN:"//pmall.yaotv.meitiqiao.com",
DOMAIN2:"http://pmall.yaotv.meitiqiao.com",
DSP:"//dsp.yaotv.tvm.cn",
DSPJS:"//e-cdn.yaotv.tvm.cn",
FAV:"//fav.yaotv.tvm.cn",
FR:"http://friends.yaotv.tvmyun.com",
FL:"//h5-fl.yaotv.tvm.cn",
FOLDER:"//a-h5.mtq.tvm.cn/yao",
GOLDCOIN:"//coin.yaotv.tvm.cn",
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
SJYZ:"//sms.yaotv.tvm.cn",
SOCKET:"//yao-socket.yaotv.tvm.cn",
TJ:"//ana.mtq.tvm.cn",
TX:"//tf.yaotv.tvm.cn",
TTDSBHOME:"//a-h5.mtq.tvm.cn/yao_zhoubian/ttdsb/index.html",
USERAPI:"//userapi.yaotv.tvm.cn",
WS:"h5-socket.apps.tvm.cn:9092",
WSQCDN:"https://life-app.yaotv.tvm.cn",
WSQDZP:"//wsq.yaotv.tvm.cn",
WSQTURN:"//wsq.yaotv.tvm.cn",
WXAPI:"//res.wx.qq.com/open/js/jweixin-1.0.0.js",
WXAPIS:"//apis.map.qq.com/ws/geocoder/v1/",
YAO:"//yaotv.tvm.cn",
BASEMTQ:"//base.mtq.tvm.cn",
HOTWORDS:"http://huge.yaomall.tvm.cn"
},PAGE={yid:'wx33dc1a5264b4e846',cid:1782,pt:'354e6b14b65b79ad',resource:"",share:{title:'BTV生活分享有礼，特别的爱给特别的你！',ico:'http://q.cdn.mtq.tvm.cn/open/data/upload/201603/b91b2d52bee7c231b67a99b104ffcc61.jpg',link:'https://wximg.gtimg.com/shake_tv/shaketv_new/zip/8sr40iluno08d4989xb8b4/fx.html',desc:'BTV生活最任性，特别的爱给特别的你！'},token:'46497107fa23'};
function addEvent(_,Eve,Fun,b){_.addEventListener(Eve,Fun,b||false)};
function delEvent(_,Eve,Fun,b){_.removeEventListener(Eve,Fun||null,b||false)};
function getChildNodes(_,tag){var nodes=[],node=_.firstChild;if(tag){tag=tag.toUpperCase();for(;node;node=node.nextSibling)if(tag===node.tagName)nodes.push(node)}else{for(;node;node=node.nextSibling){if(tn=node.tagName)nodes.push(node)}};return (nodes==""?null:nodes)}
//取search
function getSearch(str){
	var s=str||location.search.substr(1),o={}
	if(s.length>2){
		var fg=s.indexOf("&amp;")>-1?"&amp;":"&",arr=(s!==""&&s.split(fg))||[""],arrL=arr.length-1,i=-1,a=null;
			do{
				var a=arr[++i].split("=");
				if(a){o[a.shift()]=decodeURIComponent(a.join("="))}
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
function createNode(_,tag,type,$p){var p=$p||"p3",node=(typeof(tag)==="string"?document.createElement(tag):tag);if(type)setAtt(node,type);switch(p){case"p1":_.parentNode.insertBefore(node,_);break;case"p2":_.insertBefore(node,_.firstChild);break;case"p3":_.appendChild(node);break;case"p4":if(_.nextSibling)_.parentNode.insertBefore(node,_.nextSibling);else _.parentNode.appendChild(node);break;default:p*=1;if(p){var child=getChildNodes(_);_.insertBefore(node,child[p])}break}return node}
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

function setAtt(_,att,val){if(typeOf(att)=="object"){for(var i in att)if(att.propertyIsEnumerable(i))Att(_,i,att[i])}else Att(_,att,val);}
function Att(_,att,val){switch(att){case"style":_.style.cssText=val;break;case"className":_.className=val;break;case"html":_.innerHTML=val;break;default:_.setAttribute(att,val);break}}
	
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
			t.cache=d||0;        
			t.callBack=(typeof(e)=="function"?e:0)         
			t.data="";	
			t.Data="";  
			t.Open=t.Send=t.Test=t.Over=Function;
			t.Err=function(){xmlhttp=null}
			t.send=function(xmlCache){
			var	xmlhttp=xmlObj()
			    xmlhttp.open(t.method,t.action,t.async);
			  t.set&&t.set.call(xmlhttp);
			  if(t.method.toUpperCase()=="POST"){
					if(!t.set)xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8; text/html");
				}else{
					if(t.cache){
						var c="cache="+Math.random();
							c=(t.action.indexOf("?")!=-1?"&":"?")+c;
							t.action+=c
						}
						t.data=null
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
						case "touchcancel":
							
						break	
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
			_t.moveToPoint=function(index,fun){
					var space=-index*_t.distance;					
						setTranslate(space,fun);
						_t.currentPoint=index;						
						_t.currentX=space;		
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
			function setTranslate(x,fun){					
					_boxSty.webkitTransform='translate3d('+x+'px, 0, 0)';
					typeof fun==="function"&&fun()
				};
			function changeProperty(){				
				}
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
							}else{
								s=t+"秒前"
								}
	return s
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
function setStyle(css,_){var sty=document.createElement("style");sty.setAttribute("type","text/css");sty.styleSheet?sty.styleSheet.cssText=css:sty.innerHTML=css;_?_.appendChild(sty):document.documentElement.firstChild.appendChild(sty)}
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
	return typeof($fun)==="function"?(a=[].slice.call(arguments),a.shift(),$fun.apply(null,a),$fun):function(){}
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
	var opt=$opt||{};
	if(window.shaketv){
		shaketv.wxShare(
			opt.icon,
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
					setShare(opt)
					})
				})
			}
			setJsonp(HOST.AD+"/ufo/signature?cb=getWX&url="+encodeURIComponent(opt.resources)+"&wx_token=46497107fa23")			
		}
}
function setShare($opt){
	var opt=$opt||{};
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
			  imgUrl:opt.icon,
			  trigger:function(res){isFun(opt.trigger)},
			  success:function(res){isFun(opt.success)},
			  cancel:function(res){isFun(opt.cancel)},
			  fail:function(res){isFun(opt.fail)}
			});		
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
function eventEntrust($opt){var ele=$opt.ele,event=$opt.event,action=$opt.action||"action",split=$opt.splitStr||".,";addEvent(ele,event,function(e){for(var ele=e.srcElement||e.target,attribute,argument,a1,arr=[];ele.nodeType===1;ele=ele.parentNode){if(attribute=ele.getAttribute(action))break}if(attribute){arr=attribute.split(split);typeof($opt.fun)==="function"&&$opt.fun.call(ele,arr)}$opt.stopPropagation&&e.stopPropagation();$opt.preventDefault&&e.preventDefault()})}
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
function getUSER($url,$u,$fun){	
	var d=setAjax("GET",HOST.RTS+"/userinfo/get?systoken=uuETOJuZ&"+$url+"&"+nocache())
	d.callBack=function($data){
		var data=toObject($data),channel,p,pos={};
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
				isFun($fun);
				localStorage.setItem("DU",JSON.stringify($u))
		}
	}
	d.send()
}
function toSQ($opt){
	var userInfo=$opt.userInfo,search=getSearch()
	,cid=search.channelId||search.channelid||localStorage.getItem("ybtid")
	,ybtInfo=localStorage.getItem("ybtInfo"+cid)
	,url,xd=1
	,ls
	;
	if(ybtInfo){
		ybtInfo=toObject(ybtInfo);
		var sig=ybtInfo.sig
		,openid=ybtInfo.oid
		,nickname=ybtInfo.nic
		,lotteryId=ybtInfo.lid
		,sigExpire=ybtInfo.sie
		,channelid=ybtInfo.cid
		,ttdsbOpenid=ybtInfo.tid
		,ttdsbSig=ybtInfo.tig
		,sigcode=ybtInfo.sid
		,ttopenidCode=ybtInfo.tcd
		,mtid=ybtInfo.mtid
		,columnid=ybtInfo.cld
		,uh=ybtInfo.uh
		,cl=ybtInfo.cl
		,cn=ybtInfo.cn
		,cnm=ybtInfo.cnm;
		PAGE.yid=ybtInfo.yid;
		PAGE.yyyappid=ybtInfo.yid
		PAGE.pt=ybtInfo.pt;
		PAGE.token=ybtInfo.pt;
		PAGE.share={title:ybtInfo.title,icon:ybtInfo.icon,link:ybtInfo.link,desc:ybtInfo.desc};
		PAGE.mpappid=ybtInfo.mpid;
		PAGE.cid=cid;
		PAGE.channelId=cid;
		PAGE.channelName=cnm;
		PAGE.ptime=ybtInfo.ptime;
		PAGE.config=ybtInfo.config;
		PAGE.topicid=ybtInfo.topicid;
		PAGE.entrance="tvleisure";
		PAGE.jsid=ybtInfo.jsid;
		userInfo.sigExpire=+sigExpire||0;	
		userInfo.openid=openid;
		userInfo.nickname=nickname;	
		userInfo.isWX=1;
		userInfo.sig=sig;
		userInfo.cl=cl;
		userInfo.cn=cn;
		userInfo.weixin_avatar_url=uh;
		userInfo.ttdsbOpenid=ttdsbOpenid;
		userInfo.ttdsbsig=ttdsbSig;
		userInfo.sigcode=sigcode;
		userInfo.ttopenidCode=ttopenidCode;	
		PAGE.mtid=mtid;
		PAGE.columnid=columnid;	
		if(ls=localStorage.getItem("DU")){
			ls=toObject(ls);
			userInfo.sex=ls.sex;
			userInfo.tvmid=ls.tvmid;
			userInfo.age=ls.age;
			userInfo.phone=ls.phone;
			userInfo.location=ls.location||{gps:"0,0",latitude:"0",longitude:"0",region:"中国-0-0-0"};
			}else{
			getUSER("openid="+ttdsbOpenid,userInfo)		
			}
		$opt.fun();
		localStorage.setItem("ybtid",cid);		
		}
	}
function headImgErr($t){
	$t.src="http://q-cdn.mtq.tvm.cn/yao/images/default.png";
	}	
//菜单----------------------------------------------------
function createMenu($opt){
	var SITE={url:"http://wximg.gtimg.com/shake_tv/auto2/2017/06/24gy25ruj4o1bc4j/",common:"//a-h5.mtq.tvm.cn/yao/ybt_module/"}
	,user=$opt.userInfo||{}
	,box=$opt.box||document.body
	,div
	,current=($opt.current||1)-1
	,page=PAGE
	,w=getSearch()
	,from=w.from||"yhb"	
	,sq=current===2?2:(from==="yhb"?0:1)
	,menuArr
	,tvmid=user.tvmid||w.tvmid||"",id=user.openid||w.id,tips;
	function s(){
		var winW=document.documentElement.offsetWidth,icoW=winW*.065,menuH=Math.floor(winW*0.118),menuW=Math.floor(winW*.2)
		,html="";
		menuArr=[{desc:"空间",src:"1.png",cur:"1_1.png",width:icoW,link:"KJ"},{desc:"花余额",src:"2.png",cur:"2_1.png",width:icoW,link:"HYE"},[{desc:"",src:"3.png",cur:"6_1.png",width:winW*.16,link:"YBT",tp:"tips1.png"},{desc:"",src:"6.png",cur:"hongbao.gif",width:winW*.16,link:"SQ",tp:"tips2.png"},{desc:"",src:"6.png",cur:"6_1.png",width:winW*.16,link:"SQ",tp:"tips1.png"}][sq],{desc:"玩金币",src:"4.png",cur:"4_1.png",width:icoW,link:"WJB"},{desc:"我的",src:"5.png",cur:"5_1.png",width:icoW,link:"WD"}]
			for(var i=0,il=5,li;i<il;i++){
				li=menuArr[i];
				html+="<section style='display:inline-block;position:relative;max-width:20%;max-height:6%;width:"+menuW+"px;height:"+menuH+"px;margin:5px 0 0 0;vertical-align:top;text-align:center;-webkit-transfomr:scale(.92)' action='goUrl.,"+li.link+"'><img src='"+SITE.common+"img/menu/"+(current===i?li.cur:li.src)+"' style='"+(i===2?"position:absolute;left:50%;-webkit-transform:translate(-50%,-28%);max-width:100%":"max-width:32%")+";margin:0;width:"+li.width+"px;vertical-align:top;'><p style='color:#777;margin:0;padding:0;font-size:12px'>"+li.desc+"</p></section>"
}
div=createNode(box,"div",{style:"position:fixed;left:0;width:100%;bottom:0;background:#FAFAFA;z-index:99;-webkit-filter:drop-shadow(2px 2px 5px #666)",html:html})
}s();
tvmid&&a("GET","https://life-app.yaotv.tvm.cn/fastcall/pyqinfo/unreadmessage?userid="+(tvmid),function($){var a=eval("("+$+")")||{};(a=a.data)&&(a=a.unread_count)&&(a>0)&&createNode(div.firstChild,"label",{html:a,style:"position:absolute;top:0;left:50%;width:16px;height:16px;text-align:center;background:red;color:#fff;border-radius:50%;font-size:10px;line-height:16px;-webkit-transform:translate(20%,-2px)"})});
current===2&&!localStorage.getItem("tips")&&(tips=createNode(div.children[2],"img",{src:SITE.common+"img/menu/"+menuArr[2].tp,style:"position:absolute;top:-17px;height:30px;max-width:200px;-webkit-transform:translate(0,-100%);-webkit-transition:all 300ms ease",action:"CL"}),addEvent(tips,"click",function(){tips.style.opacity=0;setTimeout(function(){tips.style.display="none";localStorage.setItem("tips",1)},1000)}));
eventEntrust({ele:div,event:"click",fun:function($d){if($d[0]==="goUrl")g($d[1])}});
addEvent(window,"orientationchange",function(){setTimeout(s,300)},false);wxAction($opt);w.cb41faa22e731e9b&&setGZ($opt);
function a(m,u,f){var x=new XMLHttpRequest();x.open(m,u);x.onreadystatechange=function(){if(x.readyState===4){if(x.status===200||x.status===304){f.call(x,x.responseText);x=null}else{x=null}}};x.send()}
function g($){
	var h = '',
        s = SITE.url,
        pi = page.channelId,
        pt = page.token,
        py = page.yyyappid,
		f=current===2?"yhb":from,
		t="&tvmid="+tvmid+"&id="+id,
		c="&cb41faa22e731e9b="+(w.cb41faa22e731e9b||""),
		b="?channelid="+ pi+t+"&from="+f
		a=b+c,
        u=b+"&platform=yyy&yyyappid="+py+"&wx_token="+pt+"&token="+pt;
        switch ($) {
        case "KJ":
            h = s + "kongjian.html" + a;
            break;
        case "HYE":
            h = "http://assets.yaomall.tvm.cn/Uploads/mall_proxy/proxy.html"+u;
            break;
        case "SQ":
            h=page.share.link.replace("fx.html","index.html?from=yhb");
            break;
        case "YBT":
            h = s + "index.html" +a;
            break;
        case "WJB":
            h = "https://hall-app.yaotv.tvm.cn/wxdiscovery"+u;
            break;
        case "WD":
            h = s + "home.html" + a;
            break;
        default:
            return
            break
        }
        top.location.href=h
	}
	localStorage.setItem("g"+page.channelId,encodeURIComponent(location.href));
	createNode(document.body,"img",{src:"http://idm.bce.baidu.com/t/ping.gif?dm=bce.baidu.com/a1025&ac="+id+"&v=bce- 1.0&rnd="+Math.random()+"&ext_bce_tid=a1025&ext_bce_pid=1&ext_bce_uid="+id,style:"display:none"})
}
//验证码
function XD_YZM($opt){
	var display=$opt.display||0,wrap=$opt.box||document.body,wrapSty=wrap.style,reload=$opt.reload||2,mc=0,method,loading	
	,module={}
	,modal=$opt.item||"JY",_module,F={
	DC:function($dis){		
		var ms,ti=0,dis=$dis!==undefined?$dis:display,t=this;r();
		function r(){
			setJsonp("//js.touclick.com/js.touclick?b=3ca99045-1540-4e9d-838e-713ece33e9c6",f)
			}
		function h(){			
			if(main)main.style.display="none"
			wrap.style.display="none";
			}	
		function f(){
			if(window.TouClick){
				if(ms)ms.hidd()
				TouClick.ready(function(){
					var box=wrap,tc=TouClick(box,{
					onSuccess:function(obj){
					var data=obj||{}
					data.VerificationCodeType="touclick";
					data.reload=tc.reload;
					$opt.success(data);
					},
					behaviorDom:0,
					captchaType:13,
					isOpenMask:function(){
					return 0;
					},
					onClose:h,					
					isCaptchaFloat:function(env){
					if(env==="pc"){
					return false;
					}else if(env==="mob"){
					return true;
					}
					}
					});
					var box=tc[0],a=box.querySelector(".touclick")
					,c=document.querySelector(".touclick-lock")
					,main=a.querySelector(".touclick-pub").firstChild.firstChild
					,sty=main.style;
					sty.transform="translate(-50%,0)";
					sty.margin="auto";
					sty.top="0";
					sty.left="50%";
					wrap.appendChild(main);
					box.removeChild(a);
					removeNode(c);
					t.show=function(){
						sty.display="block";						
						wrap.style.display="block";						
						tc.start() 
						}					  
					t.hidd=function($dis){
						main.style.display="none";						
						}
					t.show()
				})
			}else{
				ti++;
				if(ti<reload)setTimeout(r,2000)
				else{mc++;
					if(mc>2)err()
					else
					 jy()
				}
			}
		}
	},
	JY:function($dis){			
		var ms,ti=0,config,run=0,dis=$dis!==undefined?$dis:display,t=this;
			c();r();
				function c(){
					var a=setAjax("GET","//pmall.yaotv.tvm.cn/open/geetest/register")
						a.callBack=function($data){
							var data=toObject($data)||{data:{gt:0,challenge:0,success:0}};
							config=data.data;
							f(1)
							}
						a.err=function(){
							t.show=function(){
								console.log("重试")
								method.show("WY");
								return
								}
							t.hidd=function(){
								console.log("hidd")
								}
							removeNode(loading);
							loading=null;
							method.show("WY");
						}
						a.send()
						!loading&&(loading=createNode(wrap,"img",{src:"//a-h5.mtq.tvm.cn/yao/common/img/loading.gif",style:"position:absolute;width:32px;top:10%;left:50%;-webkit-transform:translate(-50%,0)"}))					
					}
				function r(){
					setJsonp("//static.geetest.com/static/tools/gt.js",f)
					}
				function f($d){					
					if(window.initGeetest){
						if(config){
						initGeetest({
							gt:config.gt,
							challenge:config.challenge,
							offline:!config.success
							},function(obj){
								setStyle(".gt_mobile_holder{position:relative;width:260px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%)}");
								obj.appendTo(wrap);
								obj.onReady(function(){
									wrap.firstChild.addEventListener("click",function(e){
										e.stopPropagation();
										});
									var main=main=obj.dom,mainSty=main.style;
									mainSty.height="216px";
									mainSty.position="absolute";
									mainSty.top="109px"
									t.show=function(){																				
										mainSty.display="block";
										obj.refresh();
									}
									t.hidd=function($dis){
										mainSty.display="none";
									}
									t.status=1;
									t.show()								
								});
								obj.onSuccess(function(){									
									var data=obj.getValidate()||{}
									$opt.success({challenge:data.geetest_challenge,validate:data.geetest_validate,seccode:data.geetest_seccode,VerificationCodeType:"geetest",reload:function(){
										}});
								});

							});						
						}
					}else if(!$d){
						ti++;					
						if(ti<reload)setTimeout(r,2000)
						else{mc++
							if(mc>2)err()
							else
							method.WY()
						}
					}
				}
		},
		WY:function($dis){
			var t=this,ms,ti=0,config,run=0,main,dis=$dis!==undefined?$dis:display;
				r();
				function r(){
					setJsonp("//c.dun.163yun.com/js/c.js",f)
					}
				function f($d){					
					if(window.NECaptcha){
						var options={
						element:wrap,
						captchaId:"0971b342ec2940fdb52faf6216b0b5ed",
						mode:"embed",
						width:300,
						verifyCallback:function(ret){
							if (ret['value']){
								$opt.success({challenge:"",validate:ret.validate,seccode:"",VerificationCodeType:"wangyi",reload:function(){t.refresh()}});
								}
							}
						};
						var obj=new NECaptcha(options),main=obj.b,mainSty=main.style;
						t.show=function(){	
							wrapSty.paddingTop="103px"
							mainSty.display="block"									
							mainSty.margin="auto";
							obj.refresh()
						}
						t.hidd=function(){
							mainSty.display="none";
						}
						t.status=1;
						t.show();
					}else if(!$d){
						ti++;					
						if(ti<reload)setTimeout(r,2000)
						else{mc++
							if(mc>2)err()
							else
							method.JY()
						}
					}
				}
		}
	}
		method={
			show:function($it){
				_module=module[modal];
				if(_module)_module.hidd();
				wrapSty.display="block";
				wrapSty.paddingTop="0";
				var _it=$it||modal
				_module=module[_it];			
				if(!_module){
					module[_it]=_module=new F[_it]
				}else{				
					_module.show()
				}
				modal=_it
			}
			,hidd:function(){
				wrapSty.display="none";
			 }
		}
		method.show(modal)
		return method
	function err(){
		tishi("验证码出错了，请与管理员联系",{time:3e6})
		}
	}
function wxAction($opt){
	var share=PAGE.share,u=share.link
	u=u.replace("http://yao.qq.com/tv/entry?redirect_uri=","").replace("#wechat_redirect","");
	share.link=u;
	share.resources=location.href;
	share.success=function(){}
	share.strFun=function(wx){
		wx.getLocation({
		  success:function($data){
			var user=$opt.userInfo
			,ln=$data.longitude
			,la=$data.latitude
			,pos;
			if(!user.location)user.location={region:"0-0-0-0",latitude:"0",longitude:"0",gps:"0,0",adcode:0}
			pos=user.location
			pos.gps=la+","+ln;
			window.getGeo=function($data){
				var ad_info,result,address,add,list;
				if($data){
					if(result=$data.result){
						ad_info=result.ad_info;
						list=ad_info.name;
						list=list.replace(/\,/g,"-");
						add=list.split("-");
						address=result.address;	
						pos.region=list;
						pos.address=address;
						pos.adcode=ad_info.adcode||0;
						pos.cache=0;
					    user.country=add[0];
						user.province=add[1];
						user.city=add[2];
						user.organization=add[3];
							var now=+new Date,us=user.setTime||0;
							if(now-us>36e6){
								var a=setAjax("POST",HOST.RTS+"/userinfo/saveaddr?"+now)
								a.data="openid="+user.ttdsbOpenid+"&nickname="+user.nickname+"&head_img="+user.weixin_avatar_url+"&sex="+(user.sex||0)
								+"&longitude="+ln+"&latitude="+la+"&provice="+add[1]+"&city="+add[2]+"&area="+add[3]+"&street="+address+"&adcode="+pos.adcode+"&systoken=uuETOJuZ&wxSig="+user.ttdsbsig
								a.send();							
								}
						setUSER(user)
					}
				}else
				tishi("ERR_not position")
			}
			setJsonp(HOST.WXAPIS+"?location="+la+","+ln+"&coord_type=5&get_poi=0&output=jsonp&callback=getGeo&key=IPVBZ-BO4HG-MD3QU-I75W4-F7KUZ-PSBYI")
		  },
		  cancel:function (res) {
		  }
	    });
		wx.getNetworkType({
		  success:function(res){
			mainVar.network=res.networkType;
		  },
		  fail: function (res) {
			mainVar.network="fail"
		  }
  	    })}	
	wxShare(share);	
	}
function setGZ($opt){
	function guanzhuFun(){
		var div=createNode(document.body,"div",{style:"position:fixed;bottom:0;height:50px;width:100%;left:0;z-index:900",id:"xdDiv"});
		setTimeout(function(){
		shaketv.getUserTicket();
		shaketv.subscribe({
					appid:PAGE.mpappid
					,selector:"#xdDiv"
				},function($data){
						if($data.errorCode!=="0"){
							div&&(div.style.display="none")
						}
						div=null
				})	
		},100)
	}
	if(!window.shaketv){
		setJsonp(HOST.QQAPI,guanzhuFun)
	}else{
		guanzhuFun()
	}
}	