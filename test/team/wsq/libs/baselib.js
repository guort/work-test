//天脉视图定义
	
(function(){
	window.tvmview={};
	window.tvmcomponent={};
	var baselibscripthost=getScriptHost();
 
	var versionval=1.9534;
 

	var zindexval=1000;
	var globalcontext={};//全局上下文   
	var viewpagesarray=[];//view堆栈
    var utilop={};//工具类
	var basemainpanEl=null;//主视图面板 
	var viewloadstatus=0;//1:正在加载视图
	if(baselibscripthost){
		globalcontext["baselib.host"]=baselibscripthost;
		tvmview["host"]=baselibscripthost;
	}
	tvmview.utilop=utilop;
	

	//isMobile
	var ua = navigator.userAgent.toLowerCase();
	var isMobile=ua.match(/iPad/i) || ua.match(/iPhone/i) || ua.match(/android/i) || ua.match(/Mobile/i);

	function getScriptHost(scripturlstr){
		if(!scripturlstr){ 
			//alert('document.currentScript='+document.currentScript.src);
			if(document.currentScript){
				scripturlstr=document.currentScript.src;
			}else{
				var jsForum=document.scripts;
				for(var i=jsForum.length;i>0;i--){
					if(jsForum[i-1].src.indexOf("baselib.js")!=-1){
						scripturlstr=jsForum[i-1].src;
						break; 
					}
				}
			}
		}

		if(scripturlstr){
			//alert(scripturlstr);
			var offset1=scripturlstr.indexOf("//");
			var offset2=scripturlstr.indexOf("/wsq/",offset1+2);
			var offset3=scripturlstr.indexOf("/libs/",offset1+2);
			if(offset1!=-1 && offset2!=-1){
				//alert(scripturlstr.substring(offset1,offset2));
				return scripturlstr.substring(offset1,offset2)+"/wsq";
			}else if(offset1!=-1 && offset3!=-1){
				//alert(scripturlstr.substring(offset1,offset3));
				return scripturlstr.substring(offset1,offset3)+"/";
			//}else if(offset1!=-1){
				//alert(scripturlstr.substring(offset1));
			//	return scripturlstr.substring(offset1);
			}
		}
		return baselibscripthost;
	}
	//加载视图
	/**
	jsonp 构建视图
	*/
	window.tvmviewdefine=function(viewname,dependentlibs,funcimpl){
		  //console.log(typeof(viewname),typeof(dependentlibs),typeof(funcimpl));  
	 
		    var viewcontext={};//视图上下文
		    viewcontext["host"]=getScriptHost();

			var viewexportsmethods={};//视图方法输入

			var currvieweventcontext=getCurrViewPageViewEventContent();
			var currViewPageOwnerEl=null;//当前的面板dome对象
			var currViewPageWindowEl=null;//当前的面板window对象
			var currViewPageparms=null;//传给当前视图的参数
			if(currvieweventcontext){//子视图才会有这个东东
				currViewPageOwnerEl=currvieweventcontext["ownerEl"];
				currViewPageWindowEl=currvieweventcontext["windowEl"];
				currViewPageparms=currvieweventcontext["parms"]; 
				if(currViewPageparms){
					if(currViewPageparms.viewaliasname){//有其他试图别名
						viewname=currViewPageparms.viewaliasname;
					}
				}
				viewexportsmethods["isSubView"]=true;
			}else{
				currViewPageWindowEl=window;
				currViewPageparms=tvmview.initparms;
				delete tvmview.initparms;

				if(window.basemainpanEl){
					basemainpanEl=window.basemainpanEl;
				}else if(window.basemainpanelid){
					basemainpanEl=document.getElementById(window.basemainpanelid);
				}else if(tvmview.initparms && tvmview.initparms["basemainpanel"]){
					basemainpanEl=document.getElementById(tvmview.initparms["basemainpanel"]);
				}else{
					basemainpanEl=document.getElementById("basemainpanel");
				}
				currViewPageOwnerEl=basemainpanEl;
			} 
			currViewPageOwnerEl.setAttribute("data-viewname",viewname);//记录视图名称，移除的时候好清空资源

		//	console.log("viewpagesarray.length="+viewpagesarray.length,viewpagesarray);

		  function init1(){
		  	if(funcimpl){ 
			    funcimpl(currViewPageOwnerEl,globalcontext,viewexportsmethods,utilop); 
			    globalcontext[viewname]=viewcontext;

			    viewcontext["exports"]=viewexportsmethods;
			  }else{
			    console.log("初始化失败tvmmainviewdefine(basemainpanelownerEl,viewname,dependentlibs,funcimpl)");
			  }
		  }
		  var dependentlibsurlarray=[];
		  if(dependentlibs){
		  	for(var libname in dependentlibs){
		  		var liburl=dependentlibs[libname];
		  		if(liburl){
		  			dependentlibsurlarray.push(liburl);
		  		} 
		  	}
		  }

		  //异步加载资源，viewexportsmethods中定义为了指定document,有可能是某个iframe中加载
		  viewexportsmethods["loadResources"]=function(resourceUrls,callback){
		  		tvmview.loadJsListfunc(resourceUrls,callback,currViewPageWindowEl.document
		  			,currViewPageOwnerEl);
		  };
		  //上一个视图传给字视图的参数
		  if(currViewPageparms){
  			viewexportsmethods["parms"]=currViewPageparms;
  		  }


		  var dependentlibsurlarraylen=dependentlibsurlarray.length;
		  if(dependentlibsurlarraylen>0){
		  	//console.log(viewname+">>dependentlibsurlarray",dependentlibsurlarray)
		  	tvmview.loadJsListfunc(dependentlibsurlarray,function(){
		      //console.log("script ("+viewname+")tvmviewdefine dependentlibs load",dependentlibs);
		      init1();
		    },currViewPageWindowEl.document,currViewPageOwnerEl);
		  }else{
		  	init1();
		  }
	};
	//清除视图资源
	function clearView(viewname){
		var thisviewcontext=globalcontext[viewname];
		if(thisviewcontext){
			var thisviewexportsmethods=thisviewcontext.exports;
			if(thisviewexportsmethods['hidden.tvm.view']){
				setTimeout(function(){
					thisviewexportsmethods['hidden.tvm.view']();
				},0)
			}
			var thisViewPageparms=thisviewexportsmethods['parms'];
			if(thisViewPageparms && thisViewPageparms['hidden.tvm.view']){
				setTimeout(function(){
					thisViewPageparms['hidden.tvm.view']();
				},0)
			}
		}
		delete globalcontext[viewname]; 
	}
/**
	加载资源文件
*/
	tvmview.use=function(scripturl,initparms,onloadcallback){
		if(initparms){
			tvmview.initparms=initparms;
		}
		tvmview.loadJsListfunc([scripturl],function(){
			onloadcallback && onloadcallback();
		});
	};
	tvmview.loadJsListfunc=function(srclist,_reffunc,documentEl,currViewPageOwnerEl){
		  _reffunc=_reffunc||function(){};
		  var srclistlen=srclist.length;
		  var callokflag=[];
		  for(var i=0;i<srclistlen;i++){
		    callokflag.push(false);
		  }
		  function allokfunc(isloadok){  
		    if(callokflag.length==0){  
		      _reffunc(isloadok);
		    }
		  }
		  function loadokone(isloadok){ 
		     callokflag.shift();
		     allokfunc(isloadok);
		  } 
		  function privateloadonejs(scripturl,offsetv){
		    if(scripturl instanceof Array){
		      if(scripturl.length>0){
		        loadJsfunc(scripturl.shift(),function(isloadok){
		          if(isloadok==1){
		            loadokone(isloadok);
		          }else{
		            setTimeout(function(){
		              privateloadonejs(scripturl,offsetv); 
		            },0);
		          }
		        },offsetv,scripturl.length==0,documentEl,currViewPageOwnerEl);
		      }else{
		        loadokone(0);
		      }
		        
		    }else{
		      loadJsfunc(scripturl,loadokone,offsetv,true,documentEl,currViewPageOwnerEl);
		    } 
		  }
		  for(var i=0;i<srclistlen;i++){
		    var _src=srclist[i];
		    privateloadonejs(_src,i); 
		  }  
	};
	function loadJsfunc(_src,_reffunc,offsetv,islastone,documentEl,currViewPageOwnerEl){
	        var loadtimer=null;
	        documentEl=documentEl||document;

	        var id=null;
	        var localvaljs = null; 
	        if(_src.indexOf(".css")!=-1){
	        	id="c";
	        }else{
	        	id="j";
	        }
	        var offset1=_src.lastIndexOf("/");//为-1  +1也等于0
	        var offset2=_src.indexOf(".",offset1+1);
	        var newsrc=null;
	        var fullsrc=_src;
	        if(offset1!=-1){
	        	newsrc=_src.substring(offset1+1);
	        }else{
	        	newsrc=_src;
	        }
	        var reg=/[\ |\-|\_|\.|\/|\?]/g;
		
			if(offset2!=-1){
	        	newsrc=newsrc.substring(0,offset2);
	        	fullsrc=fullsrc.substring(0,offset2);
	        }

	        id+="_"+hashCode(fullsrc)+"_"+newsrc.replace(reg,"");//_src.substring(offset1+1,offset2);
	        if(documentEl.getElementById(id) && documentEl.getElementById(id).getAttribute("data-load")=="ok"){//已经有该资源 false &&  不加载同名的资源
	        	console.log('已经有该资源',_src);
	        	_reffunc(1);
	        	return;
	        }

	        var localvaljs = null; 
	        if(_src.indexOf(".css")!=-1){
	        	localvaljs = documentEl.createElement('link');
	        	localvaljs.type = 'text/css';
	        	localvaljs.rel = 'stylesheet'; 
	        }else{
	        	localvaljs = documentEl.createElement('script');
	        	localvaljs.type = 'text/javascript'; 
	        }
  

	        localvaljs.async = true;
	       
	        localvaljs.setAttribute("id",id);
	        if(currViewPageOwnerEl){
	        	localvaljs.setAttribute("class","rs_"+currViewPageOwnerEl.getAttribute("id"));
	        }
	         
	        localvaljs.onload=function(){
	          if(loadtimer){
	              clearTimeout(loadtimer);loadtimer=null;
	          }
	          this.setAttribute("data-load","ok");
	          //documentEl.body.insertAdjacentHTML('BeforeEnd','<div>'+offsetv+">"+_src+'</div>');
	          _reffunc(1);
	        };
	        localvaljs.onerror=function(){
	          if(loadtimer){
	              clearTimeout(loadtimer);loadtimer=null;
	          }
	          this.setAttribute("data-load","error");
	          //documentEl.body.insertAdjacentHTML('BeforeEnd','<div style="color:red">'+offsetv+">"+_src+'</div>');
	          _reffunc(0);
	        };
	        if(window.not_add_loadversion){
 
	        }else{
		        if(_src.indexOf("?")==-1){
		        	_src=_src+'?v='+versionval;
		        }else{
		        	_src=_src+'&v='+versionval;
		        }
	        }
	        if(_src.indexOf(".css")!=-1){
	        	localvaljs.href = _src;
	        }else{
	        	localvaljs.src = _src;//+'?v='+(new Date().getTime());
	        } 
	        //alert(_src);
	        var parentElobj=documentEl.head||documentEl.body;
	        parentElobj.appendChild(localvaljs);

	        if(islastone){//如果没有备用，或者最后一个不取消

	        }else{//设置一秒超时 时间
	            loadtimer=setTimeout(function(){
	                            if(loadtimer){
	                              clearTimeout(loadtimer);loadtimer=null;
	                              if(localvaljs.getAttribute("data-load")==null){
	                                 parentElobj.removeChild(localvaljs);
	                                 //documentEl.body.insertAdjacentHTML('BeforeEnd','<div style="color:red">超时'+offsetv+">"+_src+'</div>');
	                                 _reffunc(0);
	                              } 
	                            }
	                      },5000);
	        }
	 } 
	
	/*
	控制视图切换
	*/
	setTimeout(function(){
		    if(window.location.hash){
		    	window.location.hash="";
		    }
			window.onhashchange=function(arg1,arg2){ 
				 var viewevents=viewpagesarray.pop(); 
				 if(viewevents){ 
					 viewevents.callback();
				 }
			};
	},300);

	//加载处链视图
	tvmview.openViewPageWithUrl=function(httpurl,onloadcallback){
		 if(viewloadstatus!=0){
		 	console.log("正在加载视图openViewPageWithUrl。。。");
		 	return;
		 }
		 viewloadstatus=1;
		 zindexval++;
		 window.viewoffset=zindexval;
		 var iframeEl = document.createElement('iframe'); 
		 iframeEl.onload = function(){ 
			  if(onloadcallback)onloadcallback(this.contentWindow);
		 }; 
		 var ifrid="viewpage_"+zindexval;
		 iframeEl.setAttribute("frameborder",0);
		 iframeEl.setAttribute("id",ifrid);
		 iframeEl.setAttribute("name",ifrid);
		 iframeEl.setAttribute("class","iframex");
		 iframeEl.setAttribute("data-ismydomain","1");//同域
		 iframeEl.style.zIndex=zindexval; 
		 iframeEl.setAttribute("src",httpurl); 
		 //iframeEl.setAttribute("scrolling","yes"); 
		 var maindivobj=null;
		  if(isMobile){
		  	maindivobj=document.body;
		  }else{
		  	maindivobj=basemainpanEl.parentElement||document.body;
		  	iframeEl.style.position="absolute";
		  }

		  maindivobj.appendChild(iframeEl);  


		  var cancelfunc=function(){ 
		 	showbeforeView();
			iframeEl.style.left="100%"; 
			setTimeout(function(){ 
				maindivobj.removeChild(iframeEl);
			},200);  
		 };
		 
		 var showfunc=function(){   
		 	
		  	iframeEl.style.left="0px";
		  	setTimeout(function(){ 
		  		viewloadstatus=0; 
				hiddenbeforeView();
			},300); 
		 };
 		
		 var viewevents={"iframeEl":iframeEl,"windowEl":null,"ownerEl":null,"cancelfunc":cancelfunc,"showfunc":showfunc};
		 
		 openViewPage_private(httpurl,viewevents);
	};
	//加载Div js注入视图
	tvmview.openDivViewPageWithScript=function(javascripturl,parms,fx){
		 if(viewloadstatus!=0){
		 	console.log("正在加载视图openDivViewPageWithScript。。。");
		 	return;
		 }
		 viewloadstatus=1;
		 zindexval++;
		 var divEl = document.createElement('div');
		 var ifrid="viewpage_"+zindexval; 
		 divEl.setAttribute("id",ifrid);
		 divEl.setAttribute("name",ifrid);
		 divEl.setAttribute("class",fx=="up"?"divviewpagey":"divviewpagex");
		 divEl.style.zIndex=zindexval; 

		 var maindivobj=null;
		 if(isMobile){
		  	maindivobj=document.body;
		  }else{
		  	maindivobj=basemainpanEl.parentElement||document.body;
		  	divEl.style.position="absolute";
		  }

		// var maindivobj=document.body;
		 maindivobj.appendChild(divEl); 

		 window.viewoffset=zindexval;
		 var ownerEl=divEl;
		 ownerEl.style.backgroundColor="white";
	     ownerEl.innerHTML="<div style='line-height:40px;text-align:center'>加载中...</div>";

	    tvmview.loadJsListfunc([javascripturl],function(){
	     // console.log("openViewPageWithScript load",javascripturl);
	    },null,divEl);


		 var cancelfunc=function(){ 
		 	var viewname=ownerEl.getAttribute("data-viewname");
		 	if(viewname){
		 		clearView(viewname);
		 	} 
		 	showbeforeView();
			 if(fx=="up"){
				 divEl.style.top="100%";
			 }else{
				 divEl.style.left="100%";
			 }
			setTimeout(function(){ 
				//视图对应的资源
			 	var viewpagersarray=document.head.getElementsByClassName("rs_"+divEl.getAttribute("id")); 
			 	for(var kk=viewpagersarray.length-1;kk>=0;kk--){
			 		var rsobj=viewpagersarray[kk];
			 		document.head.removeChild(rsobj);
			 	}
				maindivobj.removeChild(divEl);
			},210);
		 };
		 
		 var showfunc=function(){   
		 	
			 if(fx=="up"){
				 divEl.style.top="0px";
			 }else{
				 divEl.style.left="0px";
			 }
		  	setTimeout(function(){  
		  		viewloadstatus=0;
				hiddenbeforeView();
			},210);
		 };
		 
		 var viewevents={"iframeEl":divEl,"windowEl":window,"ownerEl":ownerEl,"cancelfunc":cancelfunc,"showfunc":showfunc};
		 if(parms){
		 	viewevents["parms"]=parms;
		 }
		 openViewPage_private(javascripturl,viewevents);  
	};
	//加载js注入视图
	tvmview.openViewPageWithScript=function(javascripturl,parms,fx){ 
		 if(viewloadstatus!=0){
		 	console.log("正在加载视图openViewPageWithScript。。。");
		 	return;
		 }
		 viewloadstatus=1;
		 zindexval++;
		 var iframeEl = document.createElement('iframe');
		 /*
		 iframeEl.onload = function(){ 
			var ifrwindowobj=this.contentWindow; 
		 };
		 */
		 var ifrid="viewpage_"+zindexval;
		 iframeEl.setAttribute("frameborder",0);
		 iframeEl.setAttribute("id",ifrid);
		 iframeEl.setAttribute("name",ifrid);
		 iframeEl.setAttribute("class",fx=="up"?"iframey":"iframex");
		 iframeEl.setAttribute("data-ismydomain","1");//同域
		 
		 iframeEl.style.zIndex=zindexval; 
		  var maindivobj=null;
		  if(isMobile){
		  	maindivobj=document.body;
		  }else{
		  	maindivobj=basemainpanEl.parentElement||document.body;
		  	iframeEl.style.position="absolute";
		  }
		 maindivobj.appendChild(iframeEl);   

 		var ifrwindowobj=iframeEl.contentWindow;
		var ifrdocumentobj=ifrwindowobj.document;
		//ifrdocumentobj.write("<script>function(){}</script>");
		ifrwindowobj.tvmviewdefine=window.tvmviewdefine;
		
		ifrwindowobj.tvmview=window.tvmview;
		ifrwindowobj.viewoffset=zindexval;

	    var style=ifrdocumentobj.createElement("style");
	    style.setAttribute("type", "text/css");
	    var cssText = ifrdocumentobj.createTextNode("*{margin:0px;padding:0px;} html,body{overflow:hidden;width:100%;height:100%;background-color:white}");  
   		style.appendChild(cssText);
	    var heads = ifrdocumentobj.getElementsByTagName("head");
	    if(heads.length)
	        heads[0].appendChild(style);
	    else
	        ifrdocumentobj.documentElement.appendChild(style);
	    ifrdocumentobj.write('<div style="width:100%;height:100%"></div>');
	    var ownerEl=ifrdocumentobj.body.firstElementChild;
	    ownerEl.innerHTML="<div style='line-height:40px;text-align:center'>加载中...</div>";

	    tvmview.loadJsListfunc([javascripturl],function(){
	     // console.log("openViewPageWithScript load",javascripturl);
	    },ifrdocumentobj);
	    var parms_window_title=parms==null?"":(parms["window_title"]||"");
	    var window_title=top.window.document.title||"";
		 var cancelfunc=function(){
		 	try{ 
		 		if(ifrdocumentobj.activeElement){
			 		ifrdocumentobj.activeElement.blur();
			 	} 
		 	}catch(ex){}
		 	
		 	var viewname=ownerEl.getAttribute("data-viewname");
		 	if(viewname){
		 		clearView(viewname);
		 	} 
		 	showbeforeView()
		 	if(fx=="up"){
		 		iframeEl.style.top="100%"; 
		 	}else{
		 		iframeEl.style.left="100%"; 
		 	}
			
			setTimeout(function(){ 
				if(parms_window_title){
					top.window.document.title=window_title;
				} 
				maindivobj.removeChild(iframeEl);
			},200);  
		 };
		 
		 var showfunc=function(){   
		 	
		 	if(fx=="up"){
		 		iframeEl.style.top="0px"; 
		 	}else{
		 		iframeEl.style.left="0px"; 
		 	}
		 	
		  	setTimeout(function(){ 
		  		if(parms_window_title){
		  			top.window.document.title=parms_window_title;
		  		}
		  		
		  		viewloadstatus=0;
				hiddenbeforeView();
			},210); 
		 };
		 
		 var viewevents={"iframeEl":iframeEl,"windowEl":ifrwindowobj,"ownerEl":ownerEl,"cancelfunc":cancelfunc,"showfunc":showfunc};
		 if(parms){
		 	viewevents["parms"]=parms;
		 }
		 openViewPage_private(javascripturl,viewevents);
	};
	//得到当前视图的事件上下文
	function getCurrViewPageViewEventContent(){
		var viewpagesarraylen=viewpagesarray.length;
		if(viewpagesarraylen){
			return viewpagesarray[viewpagesarraylen-1];
		}
		return null;
	}
	//隐藏上一个试图
	function hiddenbeforeView(){ 
		var viewpagesarraylen=viewpagesarray.length-1;
		if(viewpagesarraylen>0){
			var beiframeEl=viewpagesarray[viewpagesarraylen-1].iframeEl;
			if(beiframeEl){
				beiframeEl.style.visibility="hidden";
			}
		}else{
			basemainpanEl.style.visibility="hidden";
		}
		//alert("hiddenbeforeView>>"+viewpagesarraylen);
	}
	//显示上一个试图
	function showbeforeView(){
		var viewpagesarraylen=viewpagesarray.length;
		if(viewpagesarraylen>0){
			var beforeItemobj=viewpagesarray[viewpagesarraylen-1];
			var beiframeEl=beforeItemobj.iframeEl;

			if(beiframeEl){
				beiframeEl.style.visibility="visible";
				var docuobj=beforeItemobj.windowEl.document;
				if(docuobj){
					docuobj.body.insertAdjacentHTML("beforeEnd","<div id='temp_div123'>&nbsp;</div>");
					setTimeout(function(){
						var temp_div123obj=docuobj.getElementById("temp_div123");
						if(temp_div123obj){
							temp_div123obj.outerHTML='';
						} 
					},100);
				} 
			}
		}else{
			basemainpanEl.style.visibility="visible";
		}
		//alert("showbeforeView>>"+viewpagesarraylen);
	}

	function openViewPage_private(urlpath,viewevents){ 
		viewpagesarray.push(
			{
			"iframeEl":viewevents.iframeEl,"parms":viewevents.parms
			,"windowEl":viewevents.windowEl,"ownerEl":viewevents.ownerEl
			,"callback":viewevents.cancelfunc
			}
		);
		viewpagesarray.push(
			{
			"iframeEl":viewevents.iframeEl,"parms":viewevents.parms
			,"windowEl":viewevents.windowEl,"ownerEl":viewevents.ownerEl
			,"callback":viewevents.showfunc
			}
		);
		var hashval=urlpath+zindexval;
		var hashpathoffset=hashval.lastIndexOf("/");
		//alert('hashpathoffset='+hashpathoffset)
		if(hashpathoffset!=-1){
			hashval=hashval.substring(hashpathoffset+1);
		}
		window.location.hash=hashval;
	}

	//===========↓↓↓↓↓↓utils工具↓↓↓↓↓↓===========//
	
	utilop["isMobile"]=isMobile;
	function filteremoji(str1){
		var ranges = [
		  '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
		  '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
		  '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
		];
		return str1.replace(new RegExp(ranges.join('|'), 'g'),'A')
	}
	function privateErrorSumit(url,paramsJson,rsJson){
		if(url && url.indexOf("fastcall")==-1){
			//不是接口不处理 
			return;
		}
		/*
		var reqparms={
			sysid:location.hostname,masterid:'ajax'
			,liveurl:url||''
			,descstr:'',openid:'',nickname:'',wxtoken:''
		};
		if(window.PAGE){
			reqparms.wxtoken=PAGE.token;
			reqparms.openid=mainVar.userInfo.openid;
			reqparms.nickname=filteremoji(mainVar.userInfo.nickname);
		}
		if(paramsJson){
			if(paramsJson["ui"]){ 
				paramsJson["ui"]=filteremoji(paramsJson["ui"]);
			}
		}
		
		var descJson={params:paramsJson||'',result:rsJson||""};
		reqparms.descstr=JSON.stringify(descJson);
		$.ajax({
			url: 'http://wtopic.mtq.tvm.cn/wtopic/invoke/livetalk.addErrorLiveInfo',
			data:reqparms,
			type: 'POST',
			dataType:'json',
			success: function(result, textStatus, c){},
			error:function(XHR, info, errorThrown){
				console.log(errorThrown);
			}
		});
		*/
	}
	window.pageErrorSumit=privateErrorSumit;
	//ajax
	function tvm_ajax(url,opts,reqparms){ //ajax库
		 var methodtype=opts.type||"POST";
		 if(methodtype=="get" || methodtype=="GET"){

		 }else{
			 var userinfo=getCurrentYYYUserInfo();
			// console.log('userinfo....',userinfo);
		 	if(userinfo){
				 reqparms=reqparms||{};
				 userinfo["clientTime1"]=new Date().getTime();
				 reqparms["ui"]=JSON.stringify(userinfo);
				 if("yaotv"==tvmview.platform||"yao8"==tvmview.platform){//摇一摇平台
				 	 reqparms["tvmcookie"]=sessionStorage.getItem("currentuserinfoCookie")||""
				 }
				 if(window.user_app_token){
				 	reqparms["user_app_token"]=window.user_app_token;
				 }
				 if(window.user_app_token_t){
				 	reqparms["user_app_token_t"]=window.user_app_token_t;
				 }
				 //alert('window.user_app_token='+window.user_app_token)
				 //alert('window.user_app_token_t='+window.user_app_token_t)
				 //alert('window.user_app_version='+window.user_app_version)
				 if(window.user_app_version){
				 	if(url){
				 		if(url.indexOf("?")!=-1){
				 			url+="&user_app_v="+window.user_app_version;
				 		}else{
				 			url+="?user_app_v="+window.user_app_version;
				 		}
				 	} 
				 }
			}else{

				if(
					url.indexOf("fastcall/pyqcomment/getcomment")!=-1
					||url.indexOf("fastcall/lbspost/listpost")!=-1
					||url.indexOf("fastcall/pyqgift/getgift")!=-1

				){
					opts.success();
					return;
				}
			}
		 }
		var timeout_val=5000;
		if(url && url.indexOf(".js")!=-1){
			timeout_val=3000; 
		}
		var ajaxOpts = {
			url: url,
            data:(methodtype=="get" || methodtype=="GET")?null:reqparms,
            type: methodtype,
            dataType:opts.dataType||'json',
            timeout:isMobile?timeout_val:6000,//后台程序6秒超时
			success: function(result, textStatus, c){ 
				opts.success(result);
				if(!result||result.status!=1){
					privateErrorSumit(url,reqparms,result);
				}
			}
			,error: function(XHR, info, errorThrown){
				var errorCode=0;
                var msg =errorThrown;
                if (XHR.status == 404){
                	msg="资源不存在";
                }else if (XHR.status == 403){
                	msg="没有权限";
                } else if (info != 'abort'){
					switch (info) {
						case 'timeout':
							msg = '对不起，请求服务器网络超时';
							errorCode=500;
							break;
						case 'error':
							msg = '网络出现异常，请求服务器错误';
							break;
						case 'parsererror':
							msg = '网络出现异常，服务器返回错误';
							break;
					}
					if(opts.cache){
						//读取缓存
						
					}
                }
                //alert(errorCode+">>>"+msg);
                opts.success({status:errorCode,msg:msg});
                if (XHR.status == 404){

                }else{
                	privateErrorSumit(url,reqparms,{code:XHR.status,info:info||''});
                }
			}
		};
		if(opts.timeout){ajaxOpts.timeout=opts.timeout;}
		//console.log(ajaxOpts);
		jQuery.ajax(ajaxOpts);
		return false;
	}
	var hashCode = function(str){
	    var hash = 0;
	    if (str.length == 0) return hash;
	    for (var i = 0; i < str.length; i++) {
	        var char = str.charCodeAt(i);
	        hash = ((hash<<5)-hash)+char;
	        hash = hash & hash; // Convert to 32bit integer
	    }
	    return hash;
	};
	utilop["ajax"]=tvm_ajax;

	//
	function formatHeadImg(imgstr,size){
		imgstr=imgstr||"";
		if(imgstr.indexOf("/wx.qlogo.cn/")!=-1){
			var offset2=imgstr.lastIndexOf("/");
			if(offset2!=-1){
				var headsize=imgstr.substring(offset2+1);
				if(headsize=="0" || headsize=="96" || headsize=="46" || headsize=="64"){
					imgstr=imgstr.substring(0,offset2);
					if(!size){
						imgstr+="/96";//默认96
					}else if(size=="larger"){
						imgstr+="/0"
					}
				}else if(offset2<40){
					if(!size){
						imgstr+="/96";//默认96
					}else if(size=="larger"){
						imgstr+="/0"
					}
				}
			}
		}else{
			imgstr = formatImg(imgstr,(size=="larger"?"nosmall":"headimg"));
		}
		return imgstr;
	}
	utilop["formatHeadImg"]=formatHeadImg;

	function formatImg(imgstr,type){
		imgstr=imgstr||'';
		var urls=[
			'q.cdn.mtq.tvm.cn',
			'q-cdn.mtq.tvm.cn'
		];
		var newurls='wsq-cdn.yaotv.tvm.cn';

		for(var i=0; i<urls.length; i++){
			var u=urls[i];
			imgstr=imgstr.replace(u+'/wtopic',newurls+'/wtopic');
		}
		if(imgstr.indexOf(newurls)!=-1){
			var dotoffset=imgstr.lastIndexOf('.');
			var xiegangoffset=imgstr.lastIndexOf('/');
			if(xiegangoffset>dotoffset){
				imgstr=imgstr.substring(0,xiegangoffset);
				if(type=='headimg'){
					imgstr+='/64';
				}else if(type){//'nosmall'
					//原图
				}else{
					imgstr+='/300';//默认300
				}
			}else{
				if(type=='headimg'){
					imgstr+='/64';
				}else if(type){//'nosmall'
					//原图
				}else{
					imgstr+='/300';//默认300
				}
			}
		}else if(imgstr.indexOf('imgser.yaotv.tvm.cn')!=-1){
			var dianoffset=imgstr.lastIndexOf(".");
			var xiegangoffset=imgstr.lastIndexOf("/");
			if(dianoffset>24&&(xiegangoffset>dianoffset)){
				imgstr=imgstr.substring(0,xiegangoffset);
			}
			var quanoffset=imgstr.lastIndexOf("@");
			if(quanoffset>dianoffset){
				imgstr=imgstr.substring(0,quanoffset);
			}
			if(type=='headimg'){
				imgstr+="/96";//默认96
			}else if(type){//'nosmall'
				//原图
			}else{
				imgstr+='@300w_300h';//默认300
			}
		}
		return imgstr;
	}
	utilop["formatImg"]=formatImg;

	//===============用户信息替换开始==============//
	function getTvmIdAndUserId(str){
		var ids={
			userid:'',
			tvmid:''
		};
		if(!str||str=='null'){
			return ids;
		}
		var _s = str.indexOf('y8_');
		var _e = str.lastIndexOf('_');
		if(_s==0&&_e!=2){
			ids.userid=str;
			ids.tvmid=str.substring(_s+3,_e);
		}else{
			ids.userid='y8_'+str+'_0';
			ids.tvmid=str;
		}
		return ids;
	}
	var globalUserCacheInfo={};
	function setUserInfoCache(arrs,action){
		if(action&&arrs.length>0){
			var currCacheMap=globalUserCacheInfo[action]||{};
			arrs.forEach(function(item){
				var key=item.userid;
				if(!key&&item.tvmid){
					key='y8_'+item.tvmid+'_0';
				}
				if(!key){
					return;
				}
				currCacheMap[key]=item;
			});
			globalUserCacheInfo[action]=currCacheMap;
			//console.dir(globalUserCacheInfo)
		}
	}
	function getUserInfoCache(useridsArr,action){
		var result={
			users:[],
			userids:'',
			tvmids:''
		};
		//去重
		var uidarr=[],tidarr=[],hasmap={};
		(useridsArr||[]).forEach(function(uid){
			if(!hasmap[uid]){
				hasmap[uid]=true;
				var ids=getTvmIdAndUserId(uid);
				uidarr.push(ids.userid);
				tidarr.push(ids.tvmid);
			}
		});
		//取缓存
		if(!action||!globalUserCacheInfo[action]){
			result.userids=uidarr.join(',');
			result.tvmids=tidarr.join(',');
		}else{
			var cacheMap=globalUserCacheInfo[action];
			var newuseridarr=[],newtvmidarr=[],cacheuser=[];
			uidarr.forEach(function(userid){
				var cacheitem=cacheMap[userid];
				if(cacheitem){
					cacheuser.push(cacheitem);
				}else{
					var ids=getTvmIdAndUserId(userid);
					newuseridarr.push(ids.userid);
					newtvmidarr.push(ids.tvmid);
				}
			});
			result.users=cacheuser;
			result.userids=newuseridarr.join(',');
			result.tvmids=newtvmidarr.join(',');
		}
		return result;
	}

	function replaceUserInfo(opts){
		var useridsArr=opts.userids;//[id1,id2,id3,...]
		if(!useridsArr||useridsArr.length==0){return}
		var action=opts.action||'';//userinfo buildingtj
		var callback=opts.callback;
		var onedatacallback=opts.onedatacallback;
		var mydocuemnt=opts.ownerDoc||document;

		var ajaxcb=function(refdata){
			var datalist=refdata||[];
			var datalistlen=datalist==null?0:datalist.length;
			if(callback){
				callback(datalist);
			}else if(onedatacallback){
				for(var i=0;i<datalistlen;i++){
					onedatacallback(datalist[i]);
				}
			}else{//没有回调按照约定规则来
				if(action=="userinfo"){//
					for(var i=0;i<datalistlen;i++){
						var oneuser=datalist[i];
						var userid='y8_'+oneuser.tvmid+'_0';
						var headimg=formatHeadImg(oneuser.head_img||'');
						var nickname=oneuser.nickname||'';

						var elmsheadimg=mydocuemnt.getElementsByName("headimg_"+userid)||[];
						while(elmsheadimg.length>0){
							var headimgel=elmsheadimg[0];
							headimgel.src=headimg;
							headimgel.removeAttribute('name');
						}

						var elmsheadbgimg=mydocuemnt.getElementsByName("headbgimg_"+userid)||[];
						while(elmsheadbgimg.length>0){
							var headbgimgel=elmsheadbgimg[0];
							headbgimgel.style.backgroundImage='url('+headimg+')';
							headbgimgel.removeAttribute('name');
						}

						var elmsnickname=mydocuemnt.getElementsByName("nickname_"+userid)||[];
						while(elmsnickname.length>0){
							var nicknameel=elmsnickname[0];
							nicknameel.innerText=nickname;
							if(nicknameel.hasAttribute('data-textbg')){
								nicknameel.setAttribute('data-textbg',nickname);
							}
							nicknameel.removeAttribute('name');
						}
					}
				}else if(action=="memberinfo"){
					for(var i=0;i<datalistlen;i++){
						var oneuser=datalist[i];
						var userid=oneuser.userid;
						var role = oneuser.role;
						if(role==2){
							role='副队长'
						}else if(role==3){
							role='队长'
						}else{
							role='队员'
						}
						var elmsrole=mydocuemnt.getElementsByName("role_"+userid)||[];
						while(elmsrole.length>0){
							var roleel=elmsrole[0];
							roleel.innerText=role;
							roleel.removeAttribute('name');
						}
					}
				}else if(action=="allpossess"){
					for(var i=0;i<datalistlen;i++){
						var tvmid=datalist[i].tvmid;
						var bnumber=datalist[i].bnumber;
						var anumber=datalist[i].anumber;
						var userid='y8_'+tvmid+'_0';
						var elm=mydocuemnt.getElementsByName("bnumber_"+userid)||[];
						while(elm.length>0){
							var bnelm=elm[0];
							bnelm.innerText=bnumber;
							if(bnelm.hasAttribute('data-textbg')){
								bnelm.setAttribute('data-textbg',bnumber);
							}
							bnelm.removeAttribute('name');
						}

						var elm2=mydocuemnt.getElementsByName("anumber_"+userid)||[];
						while(elm2.length>0){
							var anelm=elm2[0];
							anelm.innerText=anumber;
							if(anelm.hasAttribute('data-textbg')){
								anelm.setAttribute('data-textbg',anumber);
							}
							anelm.removeAttribute('name');
						}
					}
				}
			}

		};
		var cacheObj=getUserInfoCache(useridsArr,action);
		var cacheUserArr=cacheObj.users;
		var targetuserids=cacheObj.userids;
		var targettvmids=cacheObj.tvmids;
		if(!targetuserids){
			return ajaxcb(cacheUserArr);
		}
		var url='',methodtype='';
		if(action=="userinfo"){
			methodtype='get';
			url='//'+HOST_CONFIG["RTS_HOST"]+'/userinfo/tvmid_multi_get'+'?tvmids='+targettvmids+'&systoken=bDFfDIC';
		}else if(action=="memberinfo"){
			methodtype='post';
			url='//'+HOST_CONFIG.WSQ_HOST+'/fastcall/gamegroup/getusergamegroupmemberinfo?userids='+targetuserids+'&superid='+opts.superid;
		}else if(action=="allpossess"){//全部装备
			methodtype='get';
			url='https://'+HOST_CONFIG["NEARBY_HOST"]+'/exhouse/index.php?s=wteam/allpossess&tvmIds='+JSON.stringify(targettvmids.split(','));
		}
		if(url){
			tvm_ajax(url,{"type":methodtype,timeout:6000,success:function(rs){
				if(rs&&(rs.status==true||rs.status==1||rs.list)){
					if(rs.list){
						rs.data=rs.list;
					}
					if (rs.data){
						var data=(rs.data instanceof Array)?rs.data:[rs.data];
						setUserInfoCache(data,action);
						ajaxcb(data.concat(cacheUserArr));
					}else {
						ajaxcb(null);
					}
				}else{
					ajaxcb(null);
				}
			}});
		}
	}
	utilop["replaceUserInfo"]=replaceUserInfo;
	//===============结束==============//


	function data2str(_data,format){
		format=format||"yyyy-MM-dd hh:mm:ss";
		var o = {
			"M+" : _data.getMonth()+1, //month
			"d+" : _data.getDate(),    //day
			"h+" : _data.getHours(),   //hour
			"m+" : _data.getMinutes(), //minute
			"s+" : _data.getSeconds(), //second
			"q+" : Math.floor((_data.getMonth()+3)/3),  //quarter
			"S" : _data.getMilliseconds() //millisecond
		};
		//console.log(o);
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
			(_data.getFullYear()+"").substr(4 - RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length==1 ? o[k] :
					("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
	utilop["data2str"]=data2str;
	//长时间，形如 (2003-12-05 13:04:06)
	function str2date(str){
		var strlen=str.length;
		if(strlen<19){
			if(strlen==10){
				str+=" 00:00:00";
			}else if(strlen==16){
				str+=":00";
			}
		}
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
		var r = str.match(reg);
		if(r!=null){

			var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
			if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]){
				return d;
			}
		}
		return null;
	}
	utilop["str2date"]=str2date;

	//url2hash
	function url2hash(_url,fgf){
		var parmhash={};
		var querstr=_url||location.search;
		var offset1=querstr.indexOf("?");
		if(offset1!=-1){
			querstr=querstr.substring(offset1+1);
		}
		if(querstr!=""){
			var parms=querstr.split(fgf||"&");
			var parmsLen=parms.length;
			for(var i=0;i<parmsLen;i++){
				var _keyval=parms[i].split("=");
				var _key=(_keyval[0]||"").replace(/(^\s*)|(\s*$)/g,"");//$.trim(_keyval[0]);
				var _val=(_keyval[1]||"").replace(/(^\s*)|(\s*$)/g,"");//$.trim(_keyval[1]);
				try{
					parmhash[_key]=decodeURI(_val);
				}catch(ex){
					var offset0=-1;
					var n=0;
					while((offset0=_val.indexOf("%%"))!=-1){
						_val=_val.substring(0,offset0)+'%25'+_val.substring(offset0+1);
						n+=4;
					}
					parmhash[_key]=decodeURI(_val);
				}
			}
		}
		return parmhash;
	}
	utilop["url2hash"]=url2hash;
	utilop["changrole2admin"]=changrole2admin;
	function changrole2admin(businessid,callback){
		if(businessid){
			var urlstr='//'+HOST_CONFIG.WSQ_HOST+'/fastcall/user/changrole2admin';
			var sendparms={"businessid":businessid};
			tvm_ajax(
				urlstr
				,{
					success:function(ref){
						var userInfo=null;
						if(ref&&ref.status==1){
							userInfo=ref.data;
							var userInfocookie=ref.cookie;
							if(userInfo && userInfocookie && userInfo.id){
								if(window.sessionStorage){
									userInfo.headimg=formatHeadImg(userInfo.headimg);
									sessionStorage.setItem("currentuserinfo",JSON.stringify(userInfo));
									sessionStorage.setItem("currentuserinfoCookie",userInfocookie);
									if(userInfo.yyyappid){
										localStorage.setItem("cyyuserinfo"+userInfo.yyyappid,JSON.stringify(userInfo));
										localStorage.setItem("cyyuserinfoCookie"+userInfo.yyyappid,userInfocookie);
									}
								}
							}else{
								userInfo=null;
							}
						}
						if(callback){
							callback(userInfo);
						}
					}
				}
				,sendparms
			);
		}
	}
	//得到当前用户
	var ischeckuser=0;
	function getLoginUserInfo(){
		var userInfo=null;
		try{
			if(window.sessionStorage){
				var userInfostr=sessionStorage.getItem("currentuserinfo")||""; 
				if(userInfostr==""){
					if("yaotv"==tvmview.platform){//摇一摇平台 currentuserinfoCookie
				
					}else if("yao8"==tvmview.platform){
						
					}else{
						userInfostr=sessionStorage.getItem("userinfo"); 
					}
				}
				if(userInfostr){
					userInfo=JSON.parse(userInfostr);
					if(userInfo){
						var cookiestr=null;
						if("yaotv"==tvmview.platform){//摇一摇平台 currentuserinfoCookie
							var sessionCacheUser=sessionStorage.getItem("currentyyyuserinfo")||'{}'; 
							if(sessionCacheUser){
								var sessionCacheUserJson=JSON.parse(sessionCacheUser);
								if(userInfo.yyyappid==sessionCacheUserJson.yyyappid){
									cookiestr=sessionStorage.getItem("currentuserinfoCookie")||""
								}else{
									console.log('用户切换了摇一摇',userInfo,sessionCacheUserJson);
								}
							}
						}else if("yao8"==tvmview.platform){

						}else{
							cookiestr=document.cookie;
						} 
						if(cookiestr){
							var cookieparms=url2hash(cookiestr,";");
							if(cookieparms){
								var cookiewxtoken=cookieparms["wxtoken"]||""; 
								if(cookiewxtoken!=userInfo.wxtoken){
									console.log('token不一样，本地缓存身份不起作用....',userInfo,cookieparms);
									userInfo=null; 
								}

								var cookietime=(cookieparms["st"]||cookieparms["ct"]||0)*1; 
								if(cookietime){
									if((cookietime+79000)>(new Date().getTime()/1000)){

									}else{//已经过期
										userInfo=null; 
									}
								}
							}
						}else{
							userInfo=null; 
						}
					}
				}else{
					
				}
			}
		}catch(ex){}
		 
		if(userInfo==null){// 
		 	if("yaotv"==tvmview.platform||"yao8"==tvmview.platform){//摇一摇平台 currentuserinfoCookie
		 		var parmdata={};
		 		var sessionCacheUser=sessionStorage.getItem("currentyyyuserinfo")||"{}";
		 		var sessionCacheUserJson=JSON.parse(sessionCacheUser);
		 		var cyyuserinfoCacheUser=localStorage.getItem("cyyuserinfo"+sessionCacheUserJson.yyyappid);
		 		var cyyuserinfoCookieCacheUser=localStorage.getItem("cyyuserinfoCookie"+sessionCacheUserJson.yyyappid);
  
		 		if(cyyuserinfoCacheUser){
		 			var cyyuserinfoCacheUserJson=JSON.parse(cyyuserinfoCacheUser);
		 			
		 			if(cyyuserinfoCacheUserJson.id.indexOf(sessionCacheUserJson.openid)!=-1){
		 				if((cyyuserinfoCacheUserJson.st+79000)>(new Date().getTime()/1000)){
		 					//alert((cyyuserinfoCacheUserJson.st+86000))
		 					cyyuserinfoCacheUserJson.nickname=sessionCacheUserJson.nickname;
		 					cyyuserinfoCacheUserJson.headimg=sessionCacheUserJson.headimg;
			 				sessionStorage.setItem("currentuserinfo",JSON.stringify(cyyuserinfoCacheUserJson));
							sessionStorage.setItem("currentuserinfoCookie",cyyuserinfoCookieCacheUser||"");
							
				 			return cyyuserinfoCacheUserJson;
				 		}else{
				 			//console.log(cyyuserinfoCacheUserJson,'@@@@@@',sessionCacheUserJson);
				 		}
		 			}else{
		 				//console.log("cyyuserinfoCacheUserJson,'#####',sessionCacheUserJson");
		 			}
		 		}else{
		 			//console.log("111111111111");
		 		}
		 		
		 		if(ischeckuser>1 || sessionCacheUserJson==null || !sessionCacheUserJson.openid){//已经检查过用户信息
		 			console.log('已经检查过用户信息');
		 			return null;
				}else{
					ischeckuser++;
				}
		 		parmdata["yyui"]=sessionCacheUser;
				var url='//'+HOST_CONFIG.WSQ_HOST+'/fastcall/backlogin/'+("yao8"==tvmview.platform?'loginyao8':'loginyaotv')+'.do';
		 		$.ajax({
					url: url,
					async:false, 
					type:"post",
					timeout:3000,
					data:parmdata,
					dataType:"json",
					success:function(ref){
						userInfo=ref.data;
						var userInfocookie=ref.cookie;
						if(userInfo && userInfocookie){
							if(ref.timestamp){
								window.server_timestamp_sjc=ref.timestamp-new Date().getTime();
							}
							if(window.sessionStorage){
								userInfo.headimg=formatHeadImg(userInfo.headimg);
								sessionStorage.setItem("currentuserinfo",JSON.stringify(userInfo));
								sessionStorage.setItem("currentuserinfoCookie",userInfocookie);
								if(false && "the-user-is-xindong"==sessionCacheUserJson.openid){
 
								}else{
									localStorage.setItem("cyyuserinfo"+sessionCacheUserJson.yyyappid,JSON.stringify(userInfo));
									localStorage.setItem("cyyuserinfoCookie"+sessionCacheUserJson.yyyappid,userInfocookie);
								}
							}
						}
					}
				});
		 	}else{
		 		//console.log('tvmview.platform='+tvmview.platform+';isMobile='+isMobile);
		 		if(tvmview.platform==null || "yao8"==tvmview.platform){
		 			if(isMobile){
		 				//手机使用不call获取用户接口
		 				return;
		 			} 
		 		}
		 		if(ischeckuser>3){//已经检查过用户信息
		 			return null;
				}else{
					ischeckuser++;
				}
		 		$.ajax({
				   url: "//"+HOST_CONFIG.WSQ_HOST+"/fastcall/backlogin/getcurrentuser.do",
				   async:false,
				   timeout:3000,
				   dataType:location.port=="8080"?"jsonp":"json", 
				   success:function(ref){ 
					  // alert(JSON.stringify(ref));
					   userInfo=ref.data; 
					   if(userInfo){ 
						   if(window.sessionStorage){
							   sessionStorage.setItem("currentuserinfo",JSON.stringify(userInfo));
						   }
					   }
				   }
				}); 
		 	}
		}
		 
		//console.log('userInfo@@@@@@@@',userInfo);
		return userInfo;
	}
	function getCurrentYYYUserInfo(){
		return getLoginUserInfo();
	}

	utilop["getLoginUserInfo"]=getLoginUserInfo;
	utilop["getCurrentYYYUserInfo"]=getCurrentYYYUserInfo;

	function newMesageRead(){//消息提示已经读了
        utilop.ajax("//"+HOST_CONFIG["WSQ_HOST"]+"/fastcall/chat/setnewmesageread"
            ,{
                success:function(rs){
                	//alert("newMesageRead="+JSON.stringify(rs));
                    //console.log("去掉新消息提示",rs)
                }
            }
        );
    };
    utilop["newMesageRead"]=newMesageRead;
	//构建socketobj对象

	function buildTVMSocketobj(){
		var messageListenerArray=[];
		var addJoinRoomListenerArray=[];
		var isinit=0;
		var socketobj={
						'sendbroadcastMessage':function(msg){
							console.log('buildTVMSocketobj.sendbroadcastMessage',msg);
						}
						,'addMessageListener':function(implfunc){
							messageListenerArray.push(implfunc);
							//console.log('buildTVMSocketobj.addMessageListener',implfunc);
						}
						,'addJoinRoomListener':function(implfunc){
							addJoinRoomListenerArray.push(implfunc);
							//console.log('buildTVMSocketobj.addJoinRoomListenerArray',implfunc);
						}
						,'sendP2pMessage':function(msg,socketid){
							console.log('buildTVMSocketobj.sendP2pMessage',msg,socketid);
						}
						,'getJoinRoomListener':function(){
							return addJoinRoomListenerArray;
						}
						,'getMessageListener':function(){
							return messageListenerArray;
						}
						,'joinRoom':function(roomname){
							 console.log('buildTVMSocketobj.joinRoom',roomname);
							 if(isinit==0){
							 	isinit=1;
							 	TVMSocketInit(roomname);
							 }
						}
						,'leaveRoom':function(roomname){
							 console.log('buildTVMSocketobj.leaveRoom',roomname);
						}
						,'isOpen':function(){
							 return false;
						}
						,'isBusy':function(){
							 return true;
						}
						,'getOnLineUserNum':function(){

						}
					  };
		return socketobj;
	}
	var tvmsocketobj=new buildTVMSocketobj();
	utilop["socketobj"]=tvmsocketobj;
	//初始化socket
	function TVMSocketInit(roomname){ 
		//https://cdn.socket.io/socket.io-1.4.5.js
		//tvmview.host+'/libs/socket.io.js'
        tvmview.loadJsListfunc([tvmview.host+'/libs/socket.io-1.4.5.js',tvmview.host+'/module/chatroomsocketio.js'],function(){
            var userInfo=getLoginUserInfo();
            //var roomname="livetalk_"+bkblInfoObj.id;
            var messagecachearray=[];
            var argsparms={
                "userinfo":userInfo,
                "room":roomname
            };
            argsparms["onconnection"]=function(){//websocket连接成功 todo
                console.log("onconnection websocket连接成功");
            };
            argsparms["onclose"]=function(){//socket坏了，降级ajax轮询 todo
                console.log("onclose socket坏了，降级ajax轮询"); 
            };
            function receivesocketmsg(msg){
            	//存近100条socket信息
            	var len=messagecachearray.push(new Date().getTime());
            	if(len>88){
            		messagecachearray.splice(0,len-80); 
            	}
                //console.log('receivesocketmsg',msg);
            }

            var websocketioobj=new ChatRoom(argsparms);
            //----------监听socket消息------------------
           	var messageListenerArray=tvmsocketobj.getMessageListener();
            while(messageListenerArray.length>0){
            	websocketioobj.addMessageListener(messageListenerArray.shift());
            }
            websocketioobj.addMessageListener(receivesocketmsg);

            var addJoinRoomListenerArray=tvmsocketobj.getJoinRoomListener();
            while(addJoinRoomListenerArray.length>0){
            	websocketioobj.addJoinRoomListener(addJoinRoomListenerArray.shift());
            }
            

            tvmsocketobj.sendbroadcastMessage=websocketioobj.sendbroadcastMessage;
            tvmsocketobj.joinRoom=websocketioobj.join2room;
            tvmsocketobj.leaveRoom=websocketioobj.leaveRoom;
            tvmsocketobj.sendP2pMessage=websocketioobj.sendP2pMessage;
            tvmsocketobj.addMessageListener=websocketioobj.addMessageListener;
            tvmsocketobj.addJoinRoomListener=websocketioobj.addJoinRoomListener;
            tvmsocketobj.isOpen=websocketioobj.isOpen;
            tvmsocketobj.getOnLineUserNum=websocketioobj.getOnLineUserNum;


            function isBusy(){
            	if(websocketioobj.isOpen()){
            		var msgcount=0;
            		var currtime=new Date().getTime();
            		var len=messagecachearray.length;
	            	for(var offset=len-1;len>=0;len--){
	            		var msgtime=messagecachearray[offset];
	            		if(currtime-msgtime<10000){//10秒内的信息数
	            			msgcount++;
	            		}else{
	            			break;
	            		}
	            	}
	            	return msgcount>11;//10秒内的信息数>11 人多忙
            	}else{
            		return true;//连都连不上socket忙 人多
            	}
            	
            }

            tvmsocketobj.isBusy=isBusy;
        });
    }
	




	var style=document.createElement("style");
    style.setAttribute("type", "text/css");
    var csstextstr='*{ margin:0; padding:0;}'
					+'html,body{'
					+'  width:100%;'
					+'  height:100%;'
				//	+'  overflow:hidden'
					+'}'
					+'.iframex,.divviewpagex{'
					+'  position:fixed;left:100%;top:0px;'
					+'  z-index:1000;width:100%;height:100%;'
					+'  display:block;'
					+'  -webkit-transition:left 0.2s ease-in-out;'
					+'}'
					+'.iframey,.divviewpagey{'
					+'  position:fixed;top:100%;left:0px;'
					+'  z-index:1000;width:100%;height:100%;'
					+'  display:block;'
					+'  -webkit-transition:top 0.2s ease-in-out;'
					+'}'
					+'.basemainpanel{'
					+'  width:100%;'
					+'  height:100%;'
					+'  overflow:hidden;'
					+'  position: relative;'
					+'}';
    var cssText = document.createTextNode(csstextstr);  
		style.appendChild(cssText);
    var heads = document.getElementsByTagName("head");
    if(heads.length)
        heads[0].appendChild(style);
    else
        document.documentElement.appendChild(style);
}());