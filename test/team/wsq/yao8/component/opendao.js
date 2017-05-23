/**
 * Created by SUNGF on 2016/12/2.
 * 公用外部接口
 */
var OpenDao=(function(){
    var appUserInfo={};
    var systoken="bDFfDIC"
        ,yyyappid='46497107fa23';


    //短信 发送验证码
    function sendCode(mobile,call){
        var url='//'+HOST_CONFIG["UA_HOST"]+'/verifyCode/generateCode';
        var params={
            'tvmid':appUserInfo.tvmid,
            'ttopenid':appUserInfo.ttopenid,
            'mtqsign':appUserInfo.mtqsign,
            'mobile_number':mobile
        }
        tvmview.utilop.ajax(url,{success:function(rs){
            if(rs && rs.status == 200){
                call&&call(rs)
            }else{
                call&&call(null)
            }
        }},params);
    }
    //更换、绑定手机号
    function bindphone(mobile_number,code,call){
        var url='//'+HOST_CONFIG["UA_HOST"]+'/user/updateNew';
        var params={
            'action':'bindphonefromh5',
            'tvmid':appUserInfo.tvmid,
            'token':appUserInfo.token,
            'contentInfo':{
                'mobile_number': mobile_number,
                'code':code
            }
        }
        tvmview.utilop.ajax(url,{success:function(rs){
            if(rs && rs.status == 200){
                call&&call(rs)
            }else{
                alert("操作失败"+(rs==null?"":rs.msg));
                call&&call(null)
            }
        }},params);
    }
    //APP保存身份证信息(新)
    function saveid(opts,call){
        var url='//'+HOST_CONFIG["RTS_HOST"]+'/app/saveid';
        var params={
            'tvmid':appUserInfo.tvmid,
            'ttopenid':appUserInfo.ttopenid,
            'id_number':opts.id_number||'',//身份证
            'app_mobile':opts.app_mobile||'',//手机号
            'receiver':opts.receiver||'',//真实姓名
            'systoken':systoken
        }
        $.ajax({
            url: url,
            data:params,
            type: "POST",
            dataType:'json',
            timeout:5000,
            headers:{"apptoken":appUserInfo.token,"apptvmid":appUserInfo.tvmid},
            success: function(rs){
                if(rs&&rs.status){
                    call&&call(rs);
                }
            }
            ,error: function(XHR, info, errorThrown){
                call&&call(null);
            }
        });
    }


    //获取分享配置
    function getShareConfig(call){
        var url='//'+HOST_CONFIG["UA_HOST"]+'/appconfig/newget?token='+systoken;
        tvmview.utilop.ajax(url,{"type":'get', success:function(rs){
            call&&call(rs&&rs.status==200&&rs.data?rs.data:null);//data{}
        }});
    }

    //设置当前登录用户背景图片
    function setUserBg(imgurl,call){
        var url='//'+HOST_CONFIG["RTS_HOST"]+'/userinfo/appsave';//保存app用户信息
         var params={
             tvmid: appUserInfo.tvmid
             ,systoken:systoken
             ,wxTokenSig:appUserInfo.wxTokenSig
             ,sigExpire:appUserInfo.sigExpire
             ,user_bg:imgurl
         };
         tvmview.utilop.ajax(url,{success:function(rs){
             call&&call((rs?rs.status:false));//return ture||false
         }},params);
    }

    //获取余额
    function getYuE(targettvmid,call){
        var url='//'+HOST_CONFIG["PMALL_HOST"]+'/open/virtual/currency/nosign'+'?openId='+targettvmid+'&yyyappId='+yyyappid;
        tvmview.utilop.ajax(url,{"type":'get', success:function(rs){
            call&&call(rs&&rs.status=='success'&&rs.data?rs.data:0); //data:数量
        }});
    }
    //获取当前登录用户背景图
    function getUserBg(call){
        getRtsUser(appUserInfo.tvmid,call)
    }

    //从rts获取用户信息新
    function getRtsUserNew(targettvmid,call){
        var url='//'+HOST_CONFIG["RTS_HOST"]+'/app/get';
        var params={
            tvmid:targettvmid
            ,systoken:systoken
        };
        $.ajax({
            url: url,
            data:params,
            type: "POST",
            dataType:'json',
            timeout:5000,
            headers:{"apptvmid":appUserInfo.tvmid,"apptoken":appUserInfo.token},
            success: function(rs){
                if(rs&&rs.status==true&&rs.data){
                    call&&call(rs.data);
                }else{
                    call&&call(null,rs.message||'');
                }
            }
            ,error: function(XHR, info, errorThrown){
                call&&call(null);
            }
        });
    }

    //从rts获取用户信息
    function getRtsUser(targettvmid,call){
        var url='//'+HOST_CONFIG["RTS_HOST"]+'/userinfo/appget'+'?tvmid='+targettvmid+'&systoken='+systoken;
        tvmview.utilop.ajax(url,{"type":'get',timeout:6000,success:function(rs){
            call&&call(rs&&rs.status==true&&rs.data?rs.data:null,rs.msg||rs.message||'');
        }});
    }

    //tvmid批量获取用户信息
    function getMultiUser(targettvmids,call){
        var url='//'+HOST_CONFIG["RTS_HOST"]+'/userinfo/tvmid_multi_get'+'?tvmids='+targettvmids+'&systoken='+systoken;
        tvmview.utilop.ajax(url,{"type":'get',timeout:6000,success:function(rs){
            call&&call(rs&&rs.status==true&&rs.data?rs.data:null,rs.msg||rs.message||'');
        }});
    }

    //检查是否关注
    function checkAttentionState(targettvmid,call){
        var url='//'+HOST_CONFIG["SHEJIAO_HOST"]+'/open/AppIsConcerned?tvmid='+appUserInfo.tvmid+'&concerned_tvmid='+targettvmid;
        //tvmview.utilop.ajax(url,{"type":'get', success:function(rs){
        //    call&&call(rs&&rs.status=='success');// true||false
        //}});
        $.ajax({
            url: url,
            data:null,
            type: "GET",
            dataType:'json',
            timeout:5000,
            headers:{"apptoken":appUserInfo.token,"apptvmid":appUserInfo.tvmid},
            success: function(rs){
                call&&call(rs&&rs.status=='success');
            }
            ,error: function(XHR, info, errorThrown){
                call&&call(false);
            }
        });
    }

    //设置关注状态
    function setAttentionState(targettvmid,status,call){
        var url='//'+HOST_CONFIG["SHEJIAO_HOST"]+'/open/AppConcerned';
        var params={
            tvmid:appUserInfo.tvmid
            ,concerned_tvmid:targettvmid
            ,status:status//1添加关注；0取消关注
        };
        //tvmview.utilop.ajax(url,{success:function(rs){
        //    call&&call(rs&&rs.status=='success');// true||false:验证没有通过
        //}},params);

        $.ajax({
            url: url,
            data:params,
            type: "POST",
            dataType:'json',
            timeout:5000,
            headers:{"apptoken":appUserInfo.token,"apptvmid":appUserInfo.tvmid},
            success: function(rs){
                call&&call(rs&&rs.status=='success');
            }
            ,error: function(XHR, info, errorThrown){
                call&&call(false);
            }
        });
    }

    //获取好友关系
    function getFriendsState(targettvmid,call){
        var url='//'+HOST_CONFIG["SHEJIAO_HOST"]+'/app/askRelation?tvmid='+appUserInfo.tvmid+'&friend_tvmid='+targettvmid;
        tvmview.utilop.ajax(url,{"type":'get', success:function(rs){
            // type：0，默认表示无任何操作。 1,等待验证。2 接受（即显示接受按钮）。4 成为好友（即显示已添加）
            call&&call(rs&&rs.status=='success'&&rs.data?rs.data.type:-1);
        }});
    }

    // 加好友
    function setFriendState(opts,call){
        var url='//'+HOST_CONFIG["SHEJIAO_HOST"]+'/app/friendChanged';
        var params={
            tvmid: appUserInfo.tvmid
            ,friend_tvmid:opts.targettvmid
            ,type:opts.type  //0:删除好友，1:添加好友，4:成为好友
            ,mode:'4'//4,通过朋友圈添加
            ,ttopenid:appUserInfo.ttopenid
            ,message:opts.message||''
            ,mtqsign:appUserInfo.mtqsign
        };
        if(opts.gifts){
            params.gifts=JSON.stringify(opts.gifts);
        }
       /* tvmview.utilop.ajax(url,{success:function(rs){
            call&&call(rs);//"data":{ "msg": "成功", "type": 1 '}errMsg
        }},params);*/

        $.ajax({
            url: url,
            data:params,
            type: "POST",
            dataType:'json',
            timeout:5000,
            headers:{"apptoken":appUserInfo.token,"apptvmid":appUserInfo.tvmid},
            //beforeSend: function(request) {
            //    request.setRequestHeader("apptoken", appUserInfo.token);
            //},
            success: function(rs){
                call&&call(rs);
            }
            ,error: function(XHR, info, errorThrown){
                call&&call(null);
            }
        });
    }

    //玉川，获取用户统计总数据
    function getTotalData(targettvmid,call){
        var len=targettvmid.length;
        var offset1=targettvmid.substring(len-4,len-2);
        var offset2=targettvmid.substring(len-2);
        var url='//hb-cdn.yaotv.tvm.cn/total/'+offset1+'/'+offset2+'/'+targettvmid+'.js';
        tvmview.utilop.ajax(url,{"type":'get', success:function(rs){
            call&&call(rs&&rs.status=='success'?rs.data:null);
        }});
    }

    //首次充值记录查询接口
    function getRecharge(targettvmid,call){
        //var url='//xlz.gamesapi.yaotv.tvm.cn:10008/first_recharge/query?tvmid='+targettvmid;
        var url='//gamesapi.yaotv.tvm.cn/first_recharge/query?tvmid='+targettvmid;
        tvmview.utilop.ajax(url,{"type":'get', success:function(rs){
            call&&call(rs&&rs.status=='success'?rs.data:null);
        }});
    }
    //当前用户总金币
    function getTotalCoins(targettvmid,call){
        var url = "//"+HOST_CONFIG["POINT_YYWeChat_HOST"]+'/point/integral/query';
        tvmview.utilop.ajax(url+'?openId='+targettvmid,{
            type:'get',
            success:function(rs){
                call&&call(rs&&rs.status=='success'?rs.data:null);
            }
        });
    }

    //通过GPS获取地址
    function getAddressByGPS(gps,call){
        $.ajax({
            url:location.protocol+'//apis.map.qq.com/ws/geocoder/v1/?location='+gps.latitude+','+gps.longitude+'&coord_type=5&get_poi=0&key=IPVBZ-BO4HG-MD3QU-I75W4-F7KUZ-PSBYI'
            ,type:'get'
            ,data:{output:"jsonp"}
            ,dataType:'jsonp'
            ,success:function(rs){
                if(rs&&rs.result){
                    var opt = {};
                    var result = rs.result;
                    var ad_info = result.ad_info||{};
                    var formatted_addresses = result.formatted_addresses||{};
                    var address_component = result.address_component||{};
                    opt["latitude"]=gps.latitude;
                    opt["longitude"]=gps.longitude;
                    opt["citycode"]=ad_info.adcode||'';
                    opt["province"]=ad_info.province||'';
                    opt["city"]=ad_info.city||'';
                    opt["district"]=ad_info.district||'';
                    opt["address"]=formatted_addresses.recommend||result.address;
                    opt["street"]=address_component.street||'';
                    call&&call(opt);
                }else{
                    call&&call(null,rs.message);
                }
            },
            error:function(rs){
                call&&call(null);
            }
        })
    }

    //初始化
    function init(appui){
        appUserInfo=appui||{};
    }

    return{
        init:init
        ,getUserBg:getUserBg
        ,setUserBg:setUserBg
        ,getYuE:getYuE
        ,getRtsUser:getRtsUser
        ,getRtsUserNew:getRtsUserNew
        ,getMultiUser:getMultiUser
        ,checkAttentionState:checkAttentionState
        ,setAttentionState:setAttentionState
        ,getFriendsState:getFriendsState
        ,setFriendState:setFriendState
        ,getShareConfig:getShareConfig
        ,getTotalData:getTotalData
        ,getRecharge:getRecharge
        ,getTotalCoins:getTotalCoins
        ,getAddressByGPS:getAddressByGPS

        ,saveid:saveid
        ,sendCode:sendCode
        ,bindphone:bindphone
    };
})();
