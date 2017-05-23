/**
 * Created by SUNGF on 2016/11/25. 在
 */
var AppService=(function(){
    window.isWX=window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
    var tempappuser={
            "balance": 0.0,
            "city": "Changping",
            "country": "CN",
            "editTime": "2016-11-25 10:25:43",
            "hasBindMobile": false,
            "hasSetHead": true,
            "headimgurl": "http://wx.qlogo.cn/mmopen/vtnuMBibofcZQ9APNH4MScUC6lBOzVSysxTEWibkSbeEq7qzWGYJUR3s2hj9yYPobzWXenW0pSTibgTrTg4lJGHDWaibNq0W31BI/96",
            "historyMacaddressArrayList": "",
            "integral": 0,
            "ip": "192.168.88.200",
            "isExit": false,
            "isWelfareNewUser": true,
            "language": "zh_CN",
            "macaddress": "867840020969292",
            "mobile_number": "",
            "mtqsign": "3a1a477d663597138a5aec2301a2a0bf",
            "nickname": "小木槿",
            "oldopenid": "",
            "openid": "o6dvnv4EmcM9c-ZA6YQCKzY94d7I",
            "province": "Beijing",
            "qq": "",
            "sex": 1,
            "sigExpire": "1480040734",
            "sign": "",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InR2bWlkIjoid3hoNTgzN2ExMWQ0MDFkNTEzYmQ2MjdlOTAzIiwidHRvcGVuaWQiOiJvckV0MnR3X0JnTko5dTZXeWRpN2Y2UEhjNVE0IiwidW5pb25pZCI6Im9DTE9BdUtnTU1PTEJ4bXU5LUh1MXFFUjZoM3MiLCJ1c2VybmFtZSI6IiIsIm1hY2FkZHJlc3MiOiI4Njc4NDAwMjA5NjkyOTIiLCJpc1dlbGZhcmVOZXdVc2VyIjp0cnVlfSwiaWF0IjoxNDgwMDQwNzM0fQ.5uMs0ZZSsOLnssXOV-ul2tIlox_ul0XCbijfwJEBdQE",
            "ttdsbappid": "wxd06496bae6bb4a78",
            "ttdsbwx_token": "46497107fa23",
            "ttopenid": "orEt2tw_BgNJ9u6Wydi7f6PHc5Q4",
            //"tvmid": "wxh5848a7f01bce1e3529232b2a",
            //"tvmid": "sjh582d52c2bdd8580175f93d5e",
            //"tvmid": "sjh5857d8dee860367f300aa3f7",
            "tvmid": "sjh5858fb6a4db80b16e51d88db",  //qa  sjh5858fb6a4db80b16e51d88db   115   wxh58b8e9bdd33abb068e695fb8 sjh587db4370c7af73a85a564c8
            "type": 0,
            "unionid": "oCLOAuKgMMOLBxmu9-Hu1qER6h3s",
            "user_address": "",
            "virtualCurrency": 0.0,
            "wechat": "",
            "weibbo": "",
            "wxTokenSig": "941f11bf6fd9e03aac180a5c79f523e8",
            "yao8Id": "",
            "yaoSig": "d4fdc352fc3bc573061de9102bef5c08",
            "update_time":1484795823852,
            longitude:116.455817,
            latitude:39.932947
        }; 
    var searchstr=top.location.search || location.search;
    var isDebug=searchstr && searchstr.indexOf("debug")!=-1;
    var debugselftvmidoffset=searchstr?searchstr.indexOf("debugselftvmid="):-1;
    if(debugselftvmidoffset>=1){
        var debugselftvmid=searchstr.substring(debugselftvmidoffset+"debugselftvmid=".length);
        if(debugselftvmid){
            tempappuser["tvmid"]=debugselftvmid;
        }
    }
    var appUserInfoCache=null;
    //connectWebViewJavascriptBridge目前流行的于js交互的一个库名
    function connectWebViewJavascriptBridge (callback){
        
        if(isDebug){
            function DebugJavascriptBridge(){
                this.callHandler=function(callNativeToDo,params,callbackfunc){
                    if(params){
                        if(params.action=="get_userinfo"){
                            callbackfunc(JSON.stringify(tempappuser));
                            return;
                        }else if(params.action=="get_geo"){
                            return callbackfunc(JSON.stringify({longitude:116.455817,latitude:39.932947}));
                        }
                    } 
                    callbackfunc();
                }
            }
           // window.WebViewJavascriptBridge=new DebugJavascriptBridge();
           callback(new DebugJavascriptBridge());
           return;
        }

        var ua = navigator.userAgent.toLowerCase();//判断浏览器类型
        if(/android/.test(ua)) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    callback(WebViewJavascriptBridge)
                }, false);
            }
        }else if(/iphone|ipad|ipod/.test(ua)) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0);
        }
    }

    //与App交互方法
    function callAppNative(params,call){
        params.callback=call?1:0;
        //alert(JSON.stringify(params));
        window.WebViewJavascriptBridge.callHandler("callNativeToDo",params, function(data){
            call&&call(data?JSON.parse(data):null);
        });
    }

    // app用户转换成wsq用户
    function fomartUser(appuser){
       // alert(JSON.stringify(appuser))
        return {
            "openid":appuser.tvmid,
            "headimg":appuser.headimgurl,
            "nickname":appuser.nickname,
            "sex": appuser.sex,
            "province":appuser.province,
            "yyyappid": "46497107fa23",
            "wxtoken": "46497107fa23"

            ,"macaddress":appuser.macaddress,// "867840020969292",
            "mtqsign": appuser.mtqsign,//"3a1a477d663597138a5aec2301a2a0bf",
            "yaoSig": appuser.yaoSig,//"d4fdc352fc3bc573061de9102bef5c08",
            "sigExpire": appuser.sigExpire+"",//"1480040734",
            "ttopenid": appuser.ttopenid,//"orEt2tw_BgNJ9u6Wydi7f6PHc5Q4",
            "token":appuser.token
  
        };
    }

    //获取app用户信息
    function getAppUser(call){
        var params={
            "action": "get_userinfo" ,
            "data":{}
        };
        callAppNative(params,function(data){
            if(data){data.headimgurl=tvmview.utilop.formatHeadImg(data.headimgurl);}
            call&&call(data);
        });
    }
    function getAppUserCache(){
        return appUserInfoCache;
    }

    //app分享  status: -2:不支持分享;-1:分享失败;0:分享成功;1取消分享
    function appShare(opts,call){
        if(!appUserInfoCache.auth_sign){
            call&&call({"status":-2});//当前版本不支持分享，请下载最新版APP
        }else {
            var params = {
                "action": "share",
                "data"  : {
                    "from"       : opts.from || "",//红包计划,通讯录邀请
                    "icon"       : opts.img || "",//缩略图地址
                    "url"        : opts.url || "",//分享内容的地址
                    "title"      : opts.title || "",//标题
                    "description": opts.desc || ""//描述
                }
            };
            callAppNative(params, call);
        }
    }

    //从朋友圈分享
    function shareToWx(data,call){
        //var url=(data.share_url||'')+'?tvmid='+appUserInfoCache.tvmid+'&macaddress='+appUserInfoCache.macaddress+'&sign='+appUserInfoCache.auth_sign;
        var url=(data.share_blank||'')+'?tvmid='+appUserInfoCache.tvmid+'&macaddress='+appUserInfoCache.macaddress+'&sign='+appUserInfoCache.auth_sign+'&ttopenid='+appUserInfoCache.ttopenid;
        appShare({
            'from':'pyq',
            'img':data.share_img,
            'url':url,
            'title':data.share_title,
            'desc':data.share_desc
        },call);
    }

    /**
     * 上传图片
     * @param opts:
     *  { width:120, height:120 }
     * @param call
     *  { url":"http://xxx.jpeg" }
     */
    function uploadImg(opts,call){
        var params={"action": "get_image"};
        if(opts&&opts.width&&opts.height){
            params.data={
                "neededit":1,//0不需要编辑 1需要编辑
                "width":opts.width,
                "height":opts.height
            };
        }else{
            params.data={
                "neededit":0
            };
        }
        callAppNative(params,call);
    }
    function uploadImgs(opts,call){
        var params={"action": "get_images"};
        if(opts&&opts.width&&opts.height){
            params.data={
                "neededit":1,//0不需要编辑 1需要编辑
                "width":opts.width,
                "height":opts.height
            };
        }else{
            params.data={
                "neededit":0
            };
        }
        callAppNative(params,call);
    }

    /**
     * 上传视频
     * @param call
     *  { url":"http://xxx.mp4" }
     */
    function uploadVideo(call){
        var params={
            "action": "get_small_video" ,
            "data":{}
        };
        callAppNative(params,call);
    }

    /**
     * @param imgarr: ["a.jpg","b.jpg",...]
     * @param offset: 0---8  最多9图片，0表示第一张图片。
     */
    function previewImg(imgarr,offset){
        var params={
            "action": "preview_images",
            "data": {
                "images": imgarr||[],
                "offset": offset||0
            }
        };
        callAppNative(params);
    }

    //转场openurl
    function openUrl(url){
        if(isDebug){tvmview.openViewPageWithUrl(url);return;}
        var params={
            "action": "open_url" ,
            "data": {
                "url":url
            }
        };
        callAppNative(params);
    }

    //清楚消息数字
    function cleanBadge(){
        var params={
            "action": "clean_badge" ,
            "data": {
                "type":'pyq'
            }
        };
        callAppNative(params);
    }

    //h5发消息
    function sendMsg(targetinfo){
        var params={
            "action": "chat_tofriend",
            "data":{
                "tvmid":targetinfo.tvmid||'',
                "nickname":targetinfo.nickname||'',
                "headimgurl":targetinfo.headimg||''
            }
        };
        callAppNative(params);
    }

    function inviteFriends(){
        var params={
            "action": "invite_newfriends",
            "data":{}
        };
        callAppNative(params);
    }

    function getEncrypt(str,call){
        /*
        if(!str){
            call&&call('');
            return;
        }
        */
         
        var params={
            "action": "encrypt",
            "data":{
                "str":str
            }
        };
        callAppNative(params,call);
    }

    function getBadge(type,call){
        var params={
            "action": "get_badge",
            "data":{"type":type || 'pyq'}
        };
        callAppNative(params,call);
    }

    function getVersion(call){
        var params={
            "action": "get_version",
            "data":{}
        };
        callAppNative(params,call);
    }

    //获取gps经纬度
    function getGeo(call){
        var params={
            "action": "get_geo",
            "data":{}
        };
        callAppNative(params,call);
    }
    //关闭当前h5容器
    function closePage(){
        if(isDebug){window.history.go(-1);return;}
        var params={
            "action": "close_h5",
            "data":{}
        };
        callAppNative(params);
    }
    function timeoutEncrypt(timeoutval){
        if(timeoutval!=null){
            //alert('call getVersion');
            getVersion(function(data){
                 //alert('call getVersion>>>'+data);
                 if(data){ 
                    window.user_app_version=data.version; 
                   // alert('----- getVersion>>>'+JSON.stringify(data)+">>window.user_app_version="+window.user_app_version);
                 }
            })
        }
        setTimeout(function(){
            if(appUserInfoCache){
                //
                var nowtimestamp=new Date().getTime();
                if(window.server_timestamp_sjc){
                    nowtimestamp+=window.server_timestamp_sjc;
                }
                getEncrypt(appUserInfoCache.tvmid+":"+nowtimestamp,function(data){
                 //   alert(JSON.stringify(data));
                    if(data){
                        window.user_app_token_t=nowtimestamp;
                        window.user_app_token=data.value; 
                    } 
                    timeoutEncrypt();
                });
            }
        },timeoutval||30000);
        
       
    }
    function init(initparams,call){
       
        tvmview.platform='yao8';
        if(appUserInfoCache) {//重复调用初始化时，由用户信息则直接返回
            call&&call(appUserInfoCache);
        }else{
            if(window.isWX){
                appUserInfoCache={tvmid:''};
                return call&&call(appUserInfoCache);
            }
            connectWebViewJavascriptBridge(function(bridge) {
                window.WebViewJavascriptBridge = bridge;
                getAppUser(function(appui){
                    appUserInfoCache=appui;//缓存起来
                    timeoutEncrypt(1);
                    /*
                    加密串,防机器人用
                    
                    getEncrypt(appui.tvmid,function(data){
                        //输出测试    
                       
                        var el=document.createElement('textarea');
                        el.style.cssText="height:100px;width:100%;padding:20px;";
                        el.value=JSON.stringify(data);
                        document.body.insertAdjacentElement('afterbegin',el);
                        
                    });
                    */
                    if(window.sessionStorage){
                        var appuser=fomartUser(appui);
                        sessionStorage.setItem("currentyyyuserinfo",JSON.stringify(appuser));

                        sessionStorage.removeItem("currentuserinfo");
                        sessionStorage.removeItem("currentuserinfoCookie");
                        localStorage.removeItem("cyyuserinfo"+appuser.yyyappid);
                        localStorage.removeItem("cyyuserinfoCookie"+appuser.yyyappid);
                    }
                    call&&call(appui);
                });
            });
        }
    }
    return {
        init:init
        ,appShare:appShare
        ,shareToWx:shareToWx
        ,uploadImg:uploadImg
        ,uploadImgs:uploadImgs
        ,uploadVideo:uploadVideo
        ,previewImg:previewImg
        ,getAppUser:getAppUser
        ,getAppUserCache:getAppUserCache
        ,openUrl:openUrl
        ,sendMsg:sendMsg
        ,cleanBadge:cleanBadge
        ,inviteFriends:inviteFriends
        ,getBadge:getBadge
        ,getVersion:getVersion
        ,getGeo:getGeo
        ,closePage:closePage
    };
})();