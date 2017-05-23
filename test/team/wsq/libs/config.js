var HOST_CONFIG={};


HOST_CONFIG["WSQ_HOST"]=(location.hostname||top.location.hostname);//+':8888';//'127.0.0.1:8888';//"qa-wsq.mtq.tvm.cn";//t7.dev.tvm.cn
HOST_CONFIG["WSQ_CDNHOST"]=location.host;//'qa-wsq.mtq.tvm.cn';//"";
HOST_CONFIG["WSQ_UPLOADHOST"]='qa-wsq.mtq.tvm.cn';//文件上传服务器地址

HOST_CONFIG["JSSDK_CDNHOST"]='qa-wsq.mtq.tvm.cn';//location.host;
HOST_CONFIG["WTOPIC_CDNHOST"]='wsq-cdn.yaotv.tvm.cn';

HOST_CONFIG["YAOTV_HOST"]="qa.yao.mtq.tvm.cn";//"t9.dev.tvm.cn";
HOST_CONFIG["YAOTV_CDNHOST"]="t9.dev.tvm.cn";

HOST_CONFIG["MSGAPP_HOST"]="qa-msg.apps.tvm.cn";//陈杰小瑶后台
HOST_CONFIG["SHEJIAO_HOST"]="friends.yaotv.tvm.cn";//陈杰社交
HOST_CONFIG["PMALL_HOST"]="pmall.yaotv.tvm.cn";//陈杰社交
HOST_CONFIG["RTS_HOST"]="rts-opa.yaotv.tvm.cn";//玉川rts平台
HOST_CONFIG["UA_HOST"]='ua-app.yaotv.tvm.cn';//大仙获取app分享配置
HOST_CONFIG["YAOMALL_HOST"]='yaomall.tvm.cn';

HOST_CONFIG["NEARBY_HOST"]='nearby-app.yaotv.tvm.cn';
HOST_CONFIG["NEARBY_CDNHOST"]='nearbycdn-app.yaotv.tvm.cn';

HOST_CONFIG["WMH_HOST"]="mtq.dev.tvm.cn";
HOST_CONFIG["WMH_CDNHOST"]="mtq.dev.tvm.cn";
HOST_CONFIG["WMH_YMZHOST"]="mtq.dev.tvm.cn";//云媒资服务器地址
HOST_CONFIG["TVMPAY_HOST"]="tvmpay.mtq.tvm.cn";	//dev-tvmpay.mtq.tvm.cn tvmpay.mtq.tvm.cn  微门户登录、支付及框架JS加载地址

HOST_CONFIG["LOTTERY_HOST"]="qa-ttye.yaotv.tvm.cn";//天天余额  qa.lottery.mtq.tvm.cn
HOST_CONFIG["NAN_HOST"]="ana.mtq.tvm.cn";//统计服务器地址
HOST_CONFIG["BT_HOST"]="115.159.34.90";//种子服务器地址

HOST_CONFIG["SOCKET_HOST"]="qa.wsq.mtq.tvm.cn";

HOST_CONFIG["OAUTH_MPWeChatMB_HOST"]="mb.dev.tvm.cn";//微信公众号授权MP地址
HOST_CONFIG["POINT_MPWeChat_HOST"]="qa-mb.mtq.tvm.cn";//"mb.dev.tvm.cn";//微信公众号积分
HOST_CONFIG["POINT_YYWeChat_HOST"]="qa.userapi.yaotv.tvm.cn:8111";//"mb.dev.tvm.cn";//微信摇一摇积分接口
HOST_CONFIG["GAMES_HOST"]="qa.wx.pay.tiantiandianshibao.com";//娱乐场充值host
HOST_CONFIG["GAMESAPI_HOST"]='gamesapi.yaotv.tvm.cn';
HOST_CONFIG["SMS_YAO_HOST"]="qa-sms.yaotv.tvm.cn";//摇电视短信平台
HOST_CONFIG["SMS_MP_HOST"]="qa-sms.yaotv.tvm.cn";//公众号短信平台

HOST_CONFIG["GOLD_POINTTOKEN"]='wxd06496bae6bb4a78';//根用户金币操作token
HOST_CONFIG["havemajia"]=1;//有马甲
HOST_CONFIG["havettye"]=1;//有余额

/*
HOST_CONFIG["MP_SUPERTOKEN"]="bd0a4bcede9c";//天脉聚源媒体桥公众号supershow Token 

HOST_CONFIG["TTDSB_TOKEN"]="46497107fa23";//天天电视宝 授权Token
HOST_CONFIG["TTDSB_POINTTOKEN"]="wxd06496bae6bb4a78";//天天电视宝 减积分Token

HOST_CONFIG["eduTTZSH_TOKEN"]="mk7p6k5qgsm0";//天天知识会 授权Token
HOST_CONFIG["eduTTZSH_POINTTOKEN"]="mk7p6k5qgsm0";//天天知识会 减积分Token

HOST_CONFIG["GOLD_POINTTOKEN"]='';//切换电视宝,知识会
*/
/**
gold-jy.mtq.tvm.cn
pay-jy.mtq.tvm.cn
live-jy.mtq.tvm.cn
socket-jy.mtq.tvm.cn
rts-jy.mtq.tvm.cn

yy_opbuSw-1k8xKHSDnV4s1erRtha3s_0
*/

var GLOBAL_CURRHOSTNAME=window.GLOBAL_CURRHOSTNAME;
try{
	GLOBAL_CURRHOSTNAME=window.GLOBAL_CURRHOSTNAME||top.window.GLOBAL_CURRHOSTNAME||location.hostname||top.location.hostname;
}catch(ex){
	GLOBAL_CURRHOSTNAME=window.GLOBAL_CURRHOSTNAME||location.hostname||top.location.hostname;
}

function set_HOST_CONFIG (CURRHOSTNAME) {

	var huanjing="local";//什么环境  dev qa yaoqq aliws
	var WSQ_HOST_VAL=gethostname(CURRHOSTNAME);
	//alert("CURRHOSTNAME>>"+CURRHOSTNAME+">>"+WSQ_HOST_VAL);
	if(CURRHOSTNAME.indexOf(".dev.tvm.cn")!=-1
	|| CURRHOSTNAME.indexOf(".mtq.")!=-1 
	|| CURRHOSTNAME.indexOf(".qq.com")!=-1 
	|| CURRHOSTNAME.indexOf("wximg.gtimg.com")!=-1 
	|| CURRHOSTNAME.indexOf(".yaotv.")!=-1
	|| CURRHOSTNAME.indexOf(".apps.")!=-1){//正式环境
		if(CURRHOSTNAME.indexOf("us-wsq.mtq.tvm.cn")!=-1
			||CURRHOSTNAME.indexOf("us-wsqapp.mtq.tvm.cn")!=-1
			||CURRHOSTNAME.indexOf("us-live.mtq.tvm.cn")!=-1
			||CURRHOSTNAME.indexOf("us-cdn.mtq.tvm.cn")!=-1){
			huanjing="us";
		}else if(CURRHOSTNAME.indexOf("qa.wsq.mtq.tvm.cn")!=-1
		   	||CURRHOSTNAME.indexOf("qa-wsq.mtq.tvm.cn")!=-1
			||CURRHOSTNAME.indexOf("qa-life.apps.tvm.cn")!=-1
		){
			huanjing="qa"; 
		}else if(CURRHOSTNAME.indexOf("live.yaotv.tvm.cn")!=-1 || CURRHOSTNAME.indexOf("live.mtq.tvm.cn")!=-1){
			huanjing = "supershow";
		}else if(CURRHOSTNAME.indexOf("nearlife-app.yaotv.tvm.cn")!=-1 
			){
			huanjing="nearlife";
		}else if(CURRHOSTNAME.indexOf("life.apps.tvm.cn")!=-1
			||CURRHOSTNAME.indexOf("lifeh5.apps.tvm.cn")!=-1
			||CURRHOSTNAME.indexOf("life-app.yaotv.tvm.cn")!=-1 
			||CURRHOSTNAME.indexOf("lifeh5-app.yaotv.tvm.cn")!=-1 
			){
			huanjing="yao8";
		}else if(CURRHOSTNAME.indexOf("q-cdn.mtq.tvm.cn")!=-1
				||CURRHOSTNAME.indexOf("wsqh5-cdn.yaotv.tvm.cn")!=-1
				||CURRHOSTNAME.indexOf("wsq.mtq.tvm.cn")!=-1
				||CURRHOSTNAME.indexOf("admin.wsq.yaotv.tvm.cn")!=-1 
				||CURRHOSTNAME.indexOf("wsq.yaotv.tvm.cn")!=-1){//腾讯正式https
			huanjing="yaoqq";	
			if(CURRHOSTNAME.indexOf("q-cdn.mtq.tvm.cn")!=-1 || CURRHOSTNAME.indexOf("wsqh5-cdn.yaotv.tvm.cn")!=-1){
				WSQ_HOST_VAL="wsq.yaotv.tvm.cn"; 
			}
		}else if(CURRHOSTNAME.indexOf("t7.dev.tvm.cn")!=-1){//腾讯正式https
			huanjing="dev";	 
		} 
	}

	if(huanjing=="qa"){
	 	HOST_CONFIG["WSQ_HOST"]=WSQ_HOST_VAL;//'qa-wsq.mtq.tvm.cn';
		HOST_CONFIG["WSQ_CDNHOST"]="qa-wsq.mtq.tvm.cn";
		HOST_CONFIG["JSSDK_CDNHOST"]="qa-wsq.mtq.tvm.cn";
		HOST_CONFIG["YAOTV_HOST"]="qa.yao.mtq.tvm.cn";
		HOST_CONFIG["YAOTV_CDNHOST"]="qa-yaotv.tvm.cn";

		HOST_CONFIG["WMH_HOST"]="qa.www.mtq.tvm.cn";
		HOST_CONFIG["WMH_CDNHOST"]="qa.www.mtq.tvm.cn";
		HOST_CONFIG["WMH_YMZHOST"]="qa.www.mtq.tvm.cn";

		HOST_CONFIG["LOTTERY_HOST"]="qa-ttye.yaotv.tvm.cn";//天天余额
		HOST_CONFIG["NAN_HOST"]="ana.mtq.tvm.cn";//统计服务器地址
		HOST_CONFIG["BT_HOST"]="115.159.34.90";//种子服务器地址

		HOST_CONFIG["SOCKET_HOST"]="qa.wsq.mtq.tvm.cn";

		HOST_CONFIG["OAUTH_MPWeChatMB_HOST"]="qa-mb.mtq.tvm.cn";//微信公众号授权MP地址 qa-mb.mtq.tvm.cn
		HOST_CONFIG["POINT_MPWeChat_HOST"]="qa-mb.mtq.tvm.cn";//微信公众号积分
		HOST_CONFIG["POINT_YYWeChat_HOST"]="coin.yaotv.tvm.cn";//"qa.userapi.yaotv.tvm.cn:8111";//微信摇一摇积分接口
		HOST_CONFIG["GAMES_HOST"]="qa.wx.pay.tiantiandianshibao.com";//娱乐场
		HOST_CONFIG["SMS_YAO_HOST"]="qa-sms.yaotv.tvm.cn";//摇电视短信平台
		HOST_CONFIG["SMS_MP_HOST"]="qa-sms.yaotv.tvm.cn";//公众号短信平台
		HOST_CONFIG["SHEJIAO_HOST"]="qa-friends.yaotv.tvm.cn";//陈杰社交
		HOST_CONFIG["PMALL_HOST"]="qa.pmall.yaotv.tvm.cn";//陈杰余额
		HOST_CONFIG["RTS_HOST"]="rts-opa.yaotv.tvm.cn";//"qarts-opa.yaotv.tvm.cn";
		HOST_CONFIG["UA_HOST"]='qa-ua.apps.tvm.cn';
		HOST_CONFIG["YAOMALL_HOST"]='yaomall.tvm.cn';//qa.yaomall.tvm.cn
	}else if(huanjing=="dev"){
	 	HOST_CONFIG["WSQ_HOST"]=WSQ_HOST_VAL;//'t7.dev.tvm.cn';
		HOST_CONFIG["WSQ_CDNHOST"]="t7.dev.tvm.cn";

		HOST_CONFIG["YAOTV_HOST"]="qa.yao.mtq.tvm.cn";
		HOST_CONFIG["YAOTV_CDNHOST"]="qa-yaotv.tvm.cn";

		HOST_CONFIG["WMH_HOST"]="qa.www.mtq.tvm.cn";
		HOST_CONFIG["WMH_CDNHOST"]="qa.www.mtq.tvm.cn";
		HOST_CONFIG["WMH_YMZHOST"]="qa.www.mtq.tvm.cn";

		HOST_CONFIG["LOTTERY_HOST"]="qa-ttye.mtq.tvm.cn";//天天余额
		HOST_CONFIG["NAN_HOST"]="ana.mtq.tvm.cn";//统计服务器地址
		HOST_CONFIG["BT_HOST"]="115.159.34.90";//种子服务器地址

		HOST_CONFIG["SOCKET_HOST"]="qa-wsq.mtq.tvm.cn";

		HOST_CONFIG["OAUTH_MPWeChatMB_HOST"]="qa-mb.mtq.tvm.cn";//微信公众号授权MP地址
		HOST_CONFIG["POINT_MPWeChat_HOST"]="qa-mb.mtq.tvm.cn";//微信公众号积分
		HOST_CONFIG["POINT_YYWeChat_HOST"]="qa.userapi.yaotv.tvm.cn:8111";//微信摇一摇积分接口
		HOST_CONFIG["GAMES_HOST"]="qa.wx.pay.tiantiandianshibao.com";//娱乐场
		HOST_CONFIG["SMS_YAO_HOST"]="qa-sms.yaotv.tvm.cn";//摇电视短信平台
		HOST_CONFIG["SMS_MP_HOST"]="qa-sms.yaotv.tvm.cn";//公众号短信平台  

		HOST_CONFIG["SHEJIAO_HOST"]="qa-friends.yaotv.tvm.cn";//陈杰社交平台
		HOST_CONFIG["PMALL_HOST"]="qa.pmall.yaotv.tvm.cn";//陈杰余额
		HOST_CONFIG["RTS_HOST"]="qarts-opa.yaotv.tvm.cn";//"qarts-opa.yaotv.tvm.cn";
	}else if(huanjing=="yaoqq"){//腾讯平台
		HOST_CONFIG["WSQ_HOST"]=WSQ_HOST_VAL;//"wsq.yaotv.tvm.cn";
		HOST_CONFIG["WSQ_CDNHOST"]="wsqh5-cdn.yaotv.tvm.cn";//
		HOST_CONFIG["JSSDK_CDNHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["YAOTV_HOST"]="yaotv.tvm.cn";
		HOST_CONFIG["YAOTV_CDNHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["WMH_HOST"]="www.mtq.tvm.cn";
		HOST_CONFIG["WMH_CDNHOST"]="q-cdn.mtq.tvm.cn";
		HOST_CONFIG["WMH_YMZHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["LOTTERY_HOST"]="ttye.yaotv.tvm.cn";//天天余额
		HOST_CONFIG["NAN_HOST"]="ana.mtq.tvm.cn";//统计服务器地址
		HOST_CONFIG["BT_HOST"]="115.159.34.90";//种子服务器地址

		HOST_CONFIG["SOCKET_HOST"]="wsocket.yaotv.tvm.cn";

		HOST_CONFIG["OAUTH_MPWeChatMB_HOST"]="mb.mtq.tvm.cn";//微信公众号授权MP地址
		HOST_CONFIG["POINT_MPWeChat_HOST"]="mb.mtq.tvm.cn";//微信公众号积分
		HOST_CONFIG["POINT_YYWeChat_HOST"]="coin.yaotv.tvm.cn";//微信摇一摇积分接口 
		HOST_CONFIG["GAMES_HOST"]="wx.pay.tiantiandianshibao.com";//娱乐场
		HOST_CONFIG["WSQ_UPLOADHOST"]=WSQ_HOST_VAL;//"";
		HOST_CONFIG["SMS_YAO_HOST"]="sms.yaotv.tvm.cn";//摇电视短信平台
		HOST_CONFIG["SMS_MP_HOST"]="sms.yaotv.tvm.cn";//公众号短信平台
	}else if(huanjing=="supershow"){//大咖秀
		HOST_CONFIG["WSQ_HOST"]=WSQ_HOST_VAL;
		HOST_CONFIG["WSQ_CDNHOST"]="wsqh5-cdn.yaotv.tvm.cn";
		HOST_CONFIG["JSSDK_CDNHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["YAOTV_HOST"]="ws.yaotv.tvm.cn";
		HOST_CONFIG["YAOTV_CDNHOST"]="ws-cdn.yaotv.tvm.cn";

		HOST_CONFIG["WMH_HOST"]="www.mtq.tvm.cn";
		HOST_CONFIG["WMH_CDNHOST"]="ws-cdn.yaotv.tvm.cn";
		HOST_CONFIG["WMH_YMZHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["LOTTERY_HOST"]="ttye.yaotv.tvm.cn";//天天余额  ws-cj.yaotv.tvm.cn
		HOST_CONFIG["NAN_HOST"]="ana.mtq.tvm.cn";//统计服务器地址
		HOST_CONFIG["BT_HOST"]="115.159.34.90";//种子服务器地址

		HOST_CONFIG["SOCKET_HOST"]="livesocket.yaotv.tvm.cn";//"wsocket.yaotv.tvm.cn";

		HOST_CONFIG["OAUTH_MPWeChatMB_HOST"]="mb.mtq.tvm.cn";//微信公众号授权MP地址
		HOST_CONFIG["POINT_MPWeChat_HOST"]="mb.mtq.tvm.cn";//微信公众号积分
		HOST_CONFIG["POINT_YYWeChat_HOST"]="coin.yaotv.tvm.cn";//微信摇一摇积分接口  
		HOST_CONFIG["GAMES_HOST"]="wx.pay.tiantiandianshibao.com";//娱乐场
		HOST_CONFIG["WSQ_UPLOADHOST"]=WSQ_HOST_VAL;
		HOST_CONFIG["SMS_YAO_HOST"]="sms.yaotv.tvm.cn";//摇电视短信平台
		HOST_CONFIG["SMS_MP_HOST"]="sms.yaotv.tvm.cn";//公众号短信平台
	}else if(huanjing=="us"){
		HOST_CONFIG["WSQ_HOST"]=WSQ_HOST_VAL;//'qa-wsq.mtq.tvm.cn';
		HOST_CONFIG["WSQ_CDNHOST"]="us-cdn.mtq.tvm.cn";
		HOST_CONFIG["JSSDK_CDNHOST"]=WSQ_HOST_VAL;
		HOST_CONFIG["WTOPIC_CDNHOST"]='usali-cdn.mtq.tvm.cn';
		HOST_CONFIG["YAOTV_HOST"]="qa.yao.mtq.tvm.cn";
		HOST_CONFIG["YAOTV_CDNHOST"]="qa-yaotv.tvm.cn";

		HOST_CONFIG["WMH_HOST"]="us-www.mtq.tvm.cn";
		HOST_CONFIG["WMH_CDNHOST"]="qa.www.mtq.tvm.cn";
		HOST_CONFIG["WMH_YMZHOST"]="qa.www.mtq.tvm.cn";

		HOST_CONFIG["LOTTERY_HOST"]="qa-ttye.yaotv.tvm.cn";//天天余额
		HOST_CONFIG["NAN_HOST"]="ana.mtq.tvm.cn";//统计服务器地址
		HOST_CONFIG["BT_HOST"]="115.159.34.90";//种子服务器地址

		HOST_CONFIG["SOCKET_HOST"]="us-socket.mtq.tvm.cn";

		HOST_CONFIG["OAUTH_MPWeChatMB_HOST"]="us-mb.mtq.tvm.cn";//微信公众号授权MP地址
		HOST_CONFIG["POINT_MPWeChat_HOST"]="us-mb.mtq.tvm.cn";//微信公众号积分
		HOST_CONFIG["POINT_YYWeChat_HOST"]="us-coin.yaotv.tvm.cn";//微信摇一摇积分接口
		HOST_CONFIG["GAMES_HOST"]="us-games.yaotv.tvm.cn";//娱乐场 充值
		HOST_CONFIG["SMS_YAO_HOST"]="qa-sms.yaotv.tvm.cn";//摇电视短信平台
		HOST_CONFIG["SMS_MP_HOST"]="qa-sms.yaotv.tvm.cn";//公众号短信平台
		HOST_CONFIG["SHEJIAO_HOST"]="qa-friends.yaotv.tvm.cn";//陈杰社交
		HOST_CONFIG["WSQ_UPLOADHOST"]=WSQ_HOST_VAL;

		HOST_CONFIG["TVMPAY_HOST"]="us-tvmpay.mtq.tvm.cn";//微门户登录、支付及框架JS加载地址 
	}else if(huanjing=="yao8" || huanjing=="nearlife"){ 
		if(huanjing=="yao8"){
			if(location.protocol=="https:"){
			 	HOST_CONFIG["WSQ_HOST"]='life-app.yaotv.tvm.cn';
			}else{
			 	HOST_CONFIG["WSQ_HOST"]='life.apps.tvm.cn';
			}
			if(location.protocol=="https:"){
			    HOST_CONFIG["UA_HOST"]='ua-app.yaotv.tvm.cn';
			}else{
			    HOST_CONFIG["UA_HOST"]='ua.apps.tvm.cn';
			}
			HOST_CONFIG["NEARLIFE_HOST"]='nearlife-app.yaotv.tvm.cn';
		}else{
			//附近的人
			HOST_CONFIG["WSQ_HOST"]='nearlife-app.yaotv.tvm.cn';
			if(location.protocol=="https:"){
			 	HOST_CONFIG["LIFE_HOST"]='life-app.yaotv.tvm.cn';
			}else{
			 	HOST_CONFIG["LIFE_HOST"]='life.apps.tvm.cn';
			}
		}
		

		HOST_CONFIG["WSQ_CDNHOST"]="wsqh5-cdn.yaotv.tvm.cn";//
		HOST_CONFIG["JSSDK_CDNHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["YAOTV_HOST"]="yaotv.tvm.cn";
		HOST_CONFIG["YAOTV_CDNHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["WMH_HOST"]="www.mtq.tvm.cn";
		HOST_CONFIG["WMH_CDNHOST"]="q-cdn.mtq.tvm.cn";
		HOST_CONFIG["WMH_YMZHOST"]="q-cdn.mtq.tvm.cn";

		HOST_CONFIG["LOTTERY_HOST"]="ttye.yaotv.tvm.cn";//天天余额
		HOST_CONFIG["NAN_HOST"]="ana.mtq.tvm.cn";//统计服务器地址
		HOST_CONFIG["BT_HOST"]="115.159.34.90";//种子服务器地址

		HOST_CONFIG["SOCKET_HOST"]="h5-socket.yaotv.tvm.cn";

		HOST_CONFIG["OAUTH_MPWeChatMB_HOST"]="mb.mtq.tvm.cn";//微信公众号授权MP地址
		HOST_CONFIG["POINT_MPWeChat_HOST"]="mb.mtq.tvm.cn";//微信公众号积分
		HOST_CONFIG["POINT_YYWeChat_HOST"]="coin.yaotv.tvm.cn";//微信摇一摇积分接口
		HOST_CONFIG["GAMES_HOST"]="games.yaotv.tvm.cn";//"games.yaotv.tvm.cn";//娱乐场
		HOST_CONFIG["WSQ_UPLOADHOST"]='wsq.mtq.tvm.cn';
		HOST_CONFIG["SMS_YAO_HOST"]="sms.yaotv.tvm.cn";//摇电视短信平台
		HOST_CONFIG["SMS_MP_HOST"]="sms.yaotv.tvm.cn";//公众号短信平台

		HOST_CONFIG["MSGAPP_HOST"]="admin-msg.apps.tvm.cn";//陈杰小瑶后台

	}

	
 
	function gethostname(urlstr1){
		var offset1=urlstr1.indexOf("//");
		if(offset1!=-1){
			urlstr1=urlstr1.substring(offset1+2);
		}
		var offset2=urlstr1.indexOf("/");
		if(offset2!=-1){
			urlstr1=urlstr1.substring(0,offset2);
		}
		return urlstr1;
	}
}

//设置config 后面有新的host地址，可以重新调用一下
set_HOST_CONFIG(GLOBAL_CURRHOSTNAME);







/**
 * 提交统计信息
 * @param userinfo
 * @param sysid
 * @param pageid
 * @param pagename
 * @param action
 */
var sendana = function(userinfo,pageid,pagename,action){
	pagename=pagename||"边看边聊";
	var anaopen_id=null;
	if(userinfo){
		if(userinfo.id){
			var wxoff=userinfo.id.indexOf("wx_");
			var lastoff=userinfo.id.lastIndexOf("_");
			if(wxoff!=-1 && lastoff!=-1 && wxoff<lastoff){
				anaopen_id=userinfo.id.substring(wxoff+3,lastoff);
			}else{
				var yyoff=userinfo.id.indexOf("yy_");
				if(yyoff!=-1 && lastoff!=-1 && yyoff<lastoff){
					anaopen_id=userinfo.id.substring(yyoff+3,lastoff);
				}
			}
		}else if(userinfo.openid){
			anaopen_id=userinfo.openid;
		}
	}
	function isVU(_str){
		var _isuv="0";
		if(_str&&_str.indexOf('ovM')==0){
			var _vs = _str.substr(3,1);
			var _reg=/^[0-9]*$/;
			if(_reg.test(_vs)){
				_vs=parseInt(_vs);
				if(_str.substr(4+_vs,1)=='v'){
					var _ve = _str.substr(5+_vs,1);
					if(_reg.test(_ve)){
						_ve=parseInt(_ve);
						if(_str.substr(6+_vs+_ve,1)=='u'){
							_isuv="1";
						}
					}
				}
			}
		}
		return _isuv;
	}
	if(anaopen_id){

	}else{
		return;
	}
	var anaid="";//5529df893907a2c8ae000001
	var anatoken=userinfo.wxtoken;
	var anaevent_code="";
	//var anaopen_id=userinfo.id;
	var area_code=userinfo.province||"";
	var ana_username=userinfo.nickname||"";
	var anapage="";
	var anasex=0;
	var nanpage=encodeURIComponent(pagename);
	var nanurl="";
	if(userinfo.sex){
		if(userinfo.sex=="男"){
			anasex=1;
		}else{
			anasex=2;
		}
	}
	var groupid="";
	var result="";
	var majiaTag = ""//链接传递数据，马甲部分；

	anaid = "5529dfb63907a2c8ae000002";
	if (action == "pv") {
		anaevent_code = "100000";
	} else if (action == "fatie") {
		anaevent_code = "107000";//发帖
		groupid = 1;
		result = "发帖";
	} else if (action == "danmu") {
		anaevent_code = "126000";//弹幕
		groupid = 1;
		result = "弹幕";
	} else if (action == "pinglun") {
		anaevent_code = "108000";//"评论"
		groupid = 1;
		result = "评论";
	} else if (action == "zan") {
		anaevent_code = "109000";//点赞
		groupid = 1;
		result = "点赞";
	} else if (action == "zhuanfa") {
		anaevent_code = "121000";//转发
	} else if (action == "fenxiang") {
		anaevent_code = "118000";//分享
	} else if (action == "googlead") {
		anaevent_code = "130000";//google广告条
	}else if(action == "fdTiWen"){
		anaevent_code = "141000"//分答界面提问上报
		majiaTag = "&flag="+isVU(anaopen_id);
	}
	nanurl = location.protocol + "//" + location.hostname + "/actions/linkedin/oauthbywechat.do"
		+ "?wx_token=" + anatoken + "&redirect=livetalk&s_id=" + pageid;
	nanurl = encodeURIComponent(nanurl);

	if(anaevent_code && anaopen_id){
		//nanpage=encodeURIComponent(nanpage);
		var nanurl=location.protocol+"//ana.mtq.tvm.cn/ana?ff=yj&fl=b&groupid="+groupid+"&id="+anaid+"&token="+anatoken
			+"&result="+encodeURIComponent(result)
			+"&event_code="+anaevent_code+"&refer_url="+encodeURIComponent(document.referrer)
			+"&open_id="+anaopen_id+"&area_code="+area_code+"&sex="+anasex+"&url="+nanurl
			+"&title="+nanpage+"&page="+nanpage+"&user_name="+encodeURIComponent(ana_username)+majiaTag;

		var img=new Image();
		img.src=nanurl;
	} 
};

/**
 * 获取系统应用类型
 * @param ui 用户信息
 * @returns {string}
 */
var getSysAppType=function(ui){
	var type='';
	if(ui.yyyappid){
		type=0;//摇电视脉播现场
	}else{
		type=1;//公众号脉播现场
	}
	return type;
};

