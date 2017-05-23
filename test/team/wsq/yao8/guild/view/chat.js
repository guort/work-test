(function() {
	var viewname = "chatview";
	var base = tvmview.host;
	var DBDataObj = null;
	var clickevent = "ontouchstart" in window ? "touchstart" : "mousedown";
	var scrollTobottom = true;
	var msgObj = null;
	var guild_id = null; //公会id
	var full_service = false; //全服

	function bindTargetEvent(targetObj, eventType, childTarget, callback) {
		if (typeof targetObj != 'object') {
			targetObj = $(targetObj);
		}
		if (childTarget && typeof childTarget == 'function') {
			var callback = childTarget;
			targetObj.off(eventType).on(eventType, function(e) {
				callback && callback(e);
			});
		} else {
			targetObj.off(eventType).on(eventType, childTarget, function(e) {
				callback && callback(e);
			});
		}
	};

	function getTvmid(userid) {
		var wxoff = userid.indexOf("y8_");
		var lastoff = userid.lastIndexOf("_");
		if (wxoff != -1 && lastoff != -1 && wxoff < lastoff) {
			return userid.substring(wxoff + 3, lastoff);
		} else {
			return userid
		}
	}

	function timeoutfunc(func, wait) {
		var timeout;
		return function() {
			clearTimeout(timeout);
			timeout = setTimeout(func, wait)
		};
	}
	var msgheartbeat = timeoutfunc(function() {
		DBDataObj.heartbeat();
	}, 3000);


	function buildsocket(exports, utilop) {
		window.socketobj = tvmview.utilop.socketobj;
		roomid = guild_id || 'test';
		var socketroom = 'guildchat_' + roomid;
		var zCardShowBox = null;

		socketobj.addMessageListener(function(msg, targetSocketid) {
			//console.log(JSON.stringify(msg))
			if (msg.type == "joinroom") {

			} else if (msg.type == "fayan") {
				addmsg(msg.data);
				msgheartbeat();
			}
		});
		socketobj.addJoinRoomListener(function(msg) {
			//加入成功
		});
		socketobj.joinRoom(socketroom);
	}

	function addmsg(postjsonOrpostlistjson, addtype) {
		function _add(data, addtype) {
			addtype = addtype || 1;
			var loadEl = msgObj.find('.loaddatadiv');
			var userInfo = tvmview.utilop.getCurrentYYYUserInfo();
			var userid = data.tvmid;
			var rtvmid = data.rtvmid || '';
			var timestamp = data.timestamp || '';
			var type = data.type;
			var headimg = data.headimg || base + '/image/default.png';
			var nickname = data.nickname || '';
			var content = data.content || '';
			var buttonhtml = '';
			var nowtimestamp = new Date().getTime() + 0; //subTime
			var item_minheight = '';
			var isself = userInfo.id == userid;


			var userInformation = false;
			if (nickname) {
				userInformation = true;
				headimg = tvmview.utilop.formatHeadImg(headimg);
			}


			if (type == 'atk') { //攻击
				buttonhtml = '<div class="buttongroup">' +
					'<div class="button button_sm green atk_btn"><div class="btninfo"><p data-textbg="去看看">去看看</p></div></div>' +
					'</div>';
				content = '我正在对<span style="color:#ff5344" name="nickname_' + rtvmid + '"></span>的大楼发起攻击!';
				item_minheight = 'min-height:84px;';
			} else if (type == 'batk') { //被攻击
				var street = data.location.street || data.location.city || '';
				var btntet = '为TA复仇';
				if (isself) {
					btntet = '复仇';
				}
				buttonhtml = '<div class="buttongroup">' +
					'<div class="button button_sm red batk_btn"><div class="btninfo"><p data-textbg="' + btntet + '">' + btntet + '</p></div></div>' +
					'</div>';
				content = '位于' + street + '的大楼被<span style="color:#ff5344" name="nickname_' + rtvmid + '"></span>攻击了!';
				item_minheight = 'min-height:84px;';
				if ((nowtimestamp - timestamp) > 1000 * 60 * 60 * 24) {
					buttonhtml = '';
				}
			} else if (type == 'give') {
				var count = data.count || '';
				var objname = data.objname || '';
				content = '赠予<span style="color:#ff5344" ' + (userInformation ? '' : 'name="nickname_' + rtvmid + '"') + '></span>' + count + '个' + objname;
			} else {
				if (userInfo.role == "admin") {
					buttonhtml = '<div class="buttongroup">' +
						'<div class="button button_sm red delbtn"><div class="btninfo"><p data-textbg="删除">删除</p></div></div>' +
						'</div>';
				}
			}

			var datastr = "";
			if (timestamp) {
				if (timestamp < 1) {
					datastr = "刚刚";
				} else if (nowtimestamp) {
					var val1 = (nowtimestamp - timestamp) / 1000; //秒
					if (val1 <= 0) {
						datastr = "刚刚";
					} else if (val1 > 0 && val1 < 3600 * 8) {
						if (val1 < 60) {
							datastr = "刚刚";
						} else {
							val1 = val1 / 60; //分钟
							if (val1 < 60) {
								datastr = parseInt(val1) + "分钟前";
							} else {
								val1 = val1 / 60; //小时
								if (val1 < 8) { //
									datastr = parseInt(val1) + "小时前";
								}
							}
						}
					}
				}
				if (!datastr) {
					datastr = tvmview.utilop.data2str(new Date(timestamp), 'yyyy-MM-dd hh:mm')
				}
			}


			var rolehtml = '';
			if (!full_service) {
				rolehtml = '<small name="role_' + userid + '">队员</small>';
			}

			var html = '<div class="item" style="' + item_minheight + '">' +
				'<div class="iconimg"><img ' + (userInformation ? '' : 'name="headimg_' + userid + '"') + ' src="' + headimg + '"></div>' +
				'<div class="info">' +
				'<p class="nickname"><span ' + (userInformation ? '' : 'name="nickname_' + userid + '"') + '>' + nickname + '</span>' + rolehtml + '</p>' +
				'<p class="time">' + datastr + '</p>' +
				'</div>' +
				'<div class="info">' +
				'<div class="content">' + content + '</div>' + buttonhtml +
				'</div>' +
				'<textarea style="display:none">' + JSON.stringify(data) + '</textarea>' +
				'</div>';
			if (type == 'joincg' || type == 'exitcg' || type == 'kickoutcg') {
				//"joincg"加入公会  exitcg 退出公会  kickoutcg 踢出公会
				var _contenttext = '';
				switch (type) {
					case 'joincg':
						_contenttext = '<div class="info">' +
							'<div><p class="time">' + datastr + '</p></div>' +
							'<div><p class="nickname"><span ' + (userInformation ? '' : 'name="nickname_' + userid + '"') + '>' + nickname + '</span>加入战队</p></div>' +
							'</div>';
						break;
					case 'exitcg':
						_contenttext = '<div class="info">' +
							'<div><p class="time">' + datastr + '</p></div>' +
							'<div><p class="nickname"><span ' + (userInformation ? '' : 'name="nickname_' + userid + '"') + '>' + nickname + '</span>退出战队</p></div>' +
							'</div>';
						break;
					case 'kickoutcg':
						_contenttext = '<div class="info">' +
							'<div><p class="time">' + datastr + '</p></div>' +
							'<div><p class="nickname"><span ' + (userInformation ? '' : 'name="nickname_' + userid + '"') + '>' + nickname + '</span>被踢出战队</p></div>' +
							'</div>';
						break;
					default:

				}
				html = '<div class="item itemtext">' + _contenttext + '<textarea style="display:none">' + JSON.stringify(data) + '</textarea></div>'
			}
			var infoEle = $(html);
			if (addtype == 2) {
				loadEl.after(infoEle);
			} else {
				msgObj.append(infoEle);
			}
			infoEle.show();
			bindmsgEvent(infoEle);

		}

		var userids = [];
		if (Object.prototype.toString.call(postjsonOrpostlistjson) === '[object Array]') {
			if (postjsonOrpostlistjson.length) {
				for (var i = 0; i < postjsonOrpostlistjson.length; i++) {
					var item = postjsonOrpostlistjson[i];
					var rtvmid = item.rtvmid || '';
					_add(item, addtype);
					userids.push({
						id: item.tvmid,
						member: 1
					});
					if (rtvmid) {
						userids.push({
							id: rtvmid,
							member: ''
						});
					}
				}
			}
		} else {
			var userid = postjsonOrpostlistjson.tvmid;
			var rtvmid = postjsonOrpostlistjson.rtvmid || '';
			var headimg = postjsonOrpostlistjson.headimg || '';
			var nickname = postjsonOrpostlistjson.nickname || '';
			userids.push({
				id: userid,
				member: 1
			});
			if (rtvmid) {
				userids.push({
					id: rtvmid,
					member: ''
				});
			}
			if (nickname && headimg) {
				userids = [];
			}
			_add(postjsonOrpostlistjson, addtype);

			setTimeout(function() {
				if (scrollTobottom) {
					msgObj.scrollTop(msgObj[0].scrollHeight);
				}
			}, 150)
		}

		if (userids.length > 0) {
			var ids = [];
			var memberids = [];
			for (var i = 0; i < userids.length; i++) {
				var _d = userids[i];
				ids.push(_d.id);
				if (_d.member) {
					memberids.push(_d.id);
				}
			}
			tvmview.utilop.replaceUserInfo({
				action: 'memberinfo',
				userids: memberids,
				superid: guild_id
			});
			tvmview.utilop.replaceUserInfo({
				action: 'userinfo',
				userids: ids
			});
		}

	}

	function bindmsgEvent(infoobjEl) {
		var infojson = JSON.parse(infoobjEl.children("textarea").text());


		function _pos(location) {
			location = location || {
				latitude: "",
				longitude: ""
			};
			return encodeURIComponent(JSON.stringify({
				lat: location.latitude,
				lng: location.longitude
			}))
		}
		var atk_btn_obj = infoobjEl.find(".atk_btn");
		var batk_btn_obj = infoobjEl.find(".batk_btn");
		if (atk_btn_obj.length) {
			atk_btn_obj.click(function(e) {
				e.preventDefault();
				var url = 'https://' + HOST_CONFIG.NEARBY_CDNHOST + '/index.html?position=' + _pos(infojson["location"]);
				AppService.openUrl(url);
			});
		}
		if (batk_btn_obj.length) {
			batk_btn_obj.click(function(e) {
				e.preventDefault();
				var url = 'https://' + HOST_CONFIG.NEARBY_CDNHOST + '/asset.html?tvmid=' + getTvmid(infojson["rtvmid"] || '') + '&revenge=1';
				AppService.openUrl(url);
			});
		}

		var delbtn_obj = infoobjEl.find(".delbtn");
		if (delbtn_obj.length) {
			delbtn_obj.click(function() {
				if (window.confirm("您确定要删除吗？")) {
					DBDataObj.delcgchatmsg(infojson.id, infojson.sortindex, function(ref) {
						if (ref) {
							infoobjEl.remove();
						}
					});
				}
			})
		}
		if (full_service) {
			infoobjEl.find(".iconimg").click(function(e) {
				e.preventDefault();
				var url = location.protocol + tvmview.host + '/yao8/zone.html?id=' + infojson.tvmid;
				AppService.openUrl(url);
			});
		}
	}


	function getmsgList() {
		var loadEl = msgObj.find('.loaddatadiv');
		var lastItem = msgObj.children('.item:first');
		var page_turn_sortscore = '';
		var page_turn_id = '';
		var old_scrollHeight = msgObj[0].scrollHeight;
		var old_scrollTop = msgObj[0].scrollTop;
		if (lastItem.length > 0) {
			var infojson = JSON.parse(lastItem.children("textarea").text());
			page_turn_sortscore = infojson.page_turn_sortscore;
			page_turn_id = infojson.page_turn_id;
		}
		// alert(JSON.stringify(lastItem))
		DBDataObj.getmsglist(page_turn_sortscore, page_turn_id, function(data) {alert(1)
			var len = data.length;
			if (len < 10) {
				loadEl.hide();
			}
			if (len) {
				var pagenum = null;
				if (!page_turn_id && !page_turn_sortscore) { //第一页
					data = data.reverse();
				} else {
					pagenum = 2;
				}

				addmsg(data, pagenum);


				if (!pagenum) {
					setTimeout(function() {
						msgObj.scrollTop(msgObj[0].scrollHeight + 1000);
					}, 150)
				} else {
					msgObj.scrollTop(msgObj[0].scrollHeight - old_scrollHeight + old_scrollTop);
				}

			}
		})
	}


	function DBData() {HOST_CONFIG.WSQ_HOST='life-app.yaotv.tvm.cn/'
		var self = this;
		var utilop = tvmview.utilop;
		var getgamegrouplisturl = '//' + HOST_CONFIG.WSQ_HOST + '/fastcall/gamegroup/getgamegrouplist';
		var addmsgurl = '//' + HOST_CONFIG.WSQ_HOST + '/fastcall/cgchat/addmsg';
		var getmsglisturl = '//' + HOST_CONFIG.WSQ_HOST + '/fastcall/cgchat/msglist';
		var delmsglisturl = '//' + HOST_CONFIG.WSQ_HOST + '/fastcall/cgchat/delmsg';
		var heartbeaturl = '//' + HOST_CONFIG.WSQ_HOST + '/fastcall/cgchat/heartbeat';
		var getuserroleurl = '//' + HOST_CONFIG.WSQ_HOST + '/fastcall/gamegroup/getuserrole';
		var getusergamegroupinfourl = '//' + HOST_CONFIG.WSQ_HOST + '/fastcall/gamegroup/getusergamegroupinfo';

		var isloadpostflag = 0;

		//获取公会信息
		this.getgamegrouplist = function(id, call) {
			utilop.ajax(getgamegrouplisturl, {
				success: function(rs) {
					//alert(JSON.stringify(rs))
					if (rs && rs.status == 1) {
						var data = rs.data;
						call && call(data);
					}
				}
			}, {
				"superid": id
			});
		}
		//发言列表
		this.getmsglist = function(page_turn_sortscore, page_turn_id, call) {
			var sendparms = {
				"cgid": guild_id,
				"page_turn_id": page_turn_id || "",
				"page_turn_sortscore": page_turn_sortscore || ""
			};
			alert(2)
			if (page_turn_sortscore) {
				if (isloadpostflag > 0) {
					console.log(isloadpostflag + "重复请求，直接return", page_turn_sortscore);
					return false;
				}
				sendparms["page_turn_sortscore"] = page_turn_sortscore;
			}
			isloadpostflag = 1;
			utilop.ajax(getmsglisturl, {
				success: function(rs) {
					isloadpostflag = 0;
					if (rs && rs.status == 1) {
						var data = rs.data;
						if (data.length < 10) {
							isloadpostflag = 2;
						}
						call && call(data);
					}
				}
			}, sendparms);
		}


		this.addcgchatmsg = function(content, call) {
			utilop.ajax(addmsgurl, {
				success: function(rs) {
					if (rs && rs.status == 1) {
						var data = rs.data;
						call && call(data);
					} else {
						if (rs.msg) {
							Modal.alert({
								desc: rs.msg
							});
						}
						call && call(null);
					}
				}
			}, {
				cgid: guild_id,
				content: content
			});
		}
		this.delcgchatmsg = function(msgid, sortindex, call) {
			utilop.ajax(delmsglisturl, {
				success: function(rs) {
					if (rs && rs.status == 1) {
						var data = rs.data;
						call && call(data);
					} else {
						call && call(null);
					}
				}
			}, {
				cgid: guild_id,
				msgid: msgid,
				sortindex: sortindex
			});
		}
		this.heartbeat = function() {
			utilop.ajax(heartbeaturl, {
				success: function(rs) {

				}
			}, {
				cgid: guild_id
			});
		}

		this.getuserrole = function(call) {
			utilop.ajax(getuserroleurl, {
				success: function(rs) {
					if (rs && rs.status == 1) {
						var data = rs.data;
						call && call(data);
					} else {
						call && call(null);
					}
				}
			}, {});
		}

		this.getusergamegroupinfo = function(userids, call) {
			utilop.ajax(getusergamegroupinfourl, {
				success: function(rs) {
					if (rs && rs.status == 1) {
						var data = rs.data;
						call && call(data);
					} else {
						call && call(null);
					}
				}
			}, {
				userids: userids
			});
		}

	}


	var dependlibs = {};
tvmviewdefine(
	viewname,
	dependlibs,

	function(ownerEl, viewcontext, exports, utilop) {
		var params = exports.parms;
		var $ownerEl = $(ownerEl);
		var params_info = params["info"] || "";
		guild_id = params["id"] || "";
		if (params_info) {
			guild_id = params_info["_id"];
		}
		if (guild_id == 'world_broadcast') {
			full_service = true;
			params_info = {
				name: '昭告天下'
			}
		}
		$ownerEl.parent().addClass('mobile');

		if (window.frameElement && window.frameElement.tagName == "IFRAME") {
			window.AppService = window.parent.AppService;
		}

		var _btntext = '发送';
		var _placeholder = '请输入聊天内容';
		if (full_service) {
			_btntext = '呐喊';
			_placeholder = '向全世界喊出你的态度(要100金币哟)';
		}

		var inithtml = '<div class="guild_inner">' +

			'<div class="box_content ' + (full_service ? 'full_service' : '') + '">' +

			'<ul class="nav">' +
			'<li id="nav_tab_team"><div><p class="lineartext" data-textbg="战队列表">战队列表</p></div></li>' +
			'<li class="active"><div><p class="lineartext" data-textbg="我的战队">我的战队</p></div></li>' +
			'</ul>' +

			'<div class="guild_topic">' +

			'<div class="header" id="roomheader"></div>' +
			'<div class="wrapContent">' +
			'<div class="maincon" id="msgboxwarp">' +
			'<div class="loaddatadiv" style="color:#FFF;"><span class="preloader preloader-white"></span>加载中...</div>' +
			'</div>' +
			'<div class="box_msg" id="sendmsgboxwarp" style="display:' + (full_service ? 'none' : '') + '">' +
			'<input class="inputtext" maxlength="200" type="text" placeholder="' + _placeholder + '">' +
			'<div class="sbtn">' +
			'<div class="button yellow"><div class="btninfo"><p data-textbg="' + _btntext + '">' + _btntext + '</p></div></div>' +
			'</div>' +
			'</div>' +
			'<div class="box_msg_preloader" id="boxmsgpreloader" style="display:' + (full_service ? '' : 'none') + '">只有队长、副队长,并且战队成员数5人以上才能呐喊哦~</div>' +
			'</div>' +

			'</div>' +
			'</div>' +


			'<div class="bottomclose">' + (full_service ? '<div class="button green cglistpagebtn"><div class="btninfo"><p data-textbg="战 队">战 队</p></div></div>&nbsp;&nbsp;' : '') +
			'<div class="button red closepagebtn"><div class="btninfo"><p data-textbg="返 回">返 回</p></div></div>' +
			'</div>' +
			'</div>';

// alert(inithtml)
		$ownerEl.html(inithtml);
		msgObj = $("#msgboxwarp");

		//程序入口
		AppService.init(null, function(appui) {
			OpenDao.init(appui);

			if (params["checkadmin"] && utilop.changrole2admin) {
				utilop.changrole2admin("yao8nearbay", function(userinfo) {
					if (userinfo) {
						Modal.showTip({
							warp: $ownerEl,
							'msg': '已经成功切换管理员身份!'
						});
					}
				});
			}

			Modal.init({
				wrap: $ownerEl
			});
			DBDataObj = new DBData();
			// alert(JSON.stringify(params_info))

			if (params_info) {
				init(params_info);
			} else {
				DBDataObj.getgamegrouplist(guild_id, function(data) {
					init(data);
				})
			}
		});

		function init(data) {
			headerPane(data);

			getmsgList();

			bindEvent();
			window.windowSocket = buildsocket(exports, utilop);
		}

		function headerPane(data) {
			var badge = data.badge || '';
			var name = data.name || '';
			var pers = (data.member_num || '') + '/' + (data.max_member || '');
			var guildheader = $('#roomheader');
			document.title = name;
			// alert(JSON.stringify(data))
			if (full_service) {
				/*var html='<div style="text-align:center;font-size:30px;line-height:1">' +
						'<div class="lineartext" data-textbg="'+name+'">'+name+'</div>' +
						'</div>';
					var $header = $(html);
					guildheader.append($header);*/
				return
			}

			badge = tvmview.utilop.formatImg(badge);

			var html = '<div class="iconimg"><img src="' + badge + '"></div>' +
				'<div class="boxname">' +
				'<div class="name">' +
				'<div class="box">' +
				'<div class="info">' +
				'<div class="lineartext" data-textbg="' + name + '">' + name + '</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="allpers">' +
				'<div class="online"><span class="lineartext blue" data-textbg="队员：">队员：</span><span class="lineartext blue" data-textbg="' + pers + '">' + pers + '</span></div>' +
				'<div class="buttonlist">' +
				'<div class="button button_sm red persbtn"><div class="btninfo"><p data-textbg="成员列表">成员列表</p></div></div>' +
				'</div>' +
				'</div>';
			var $header = $(html);
			guildheader.append($header);
			guildheader.find('.persbtn').on(clickevent, function(e) {
				e.preventDefault();
				if (!window.MemberList) {
					exports.loadResources(['component/memberlist.js'], function() {
						MemberList.init(data, data)
					});
				} else {
					MemberList.init(data, data)
				}
			});
			//显示编辑
			var EditGuildObj = null,
				userInfo = utilop.getCurrentYYYUserInfo();
			guildheader.find('.iconimg').on(clickevent, function(e) {
				e.preventDefault();

				function _updatehead(_data) {
					var badge = _data.badge;
					var name = _data.name;
					if (name) {
						document.title = name;
						guildheader.find('.boxname .lineartext').attr('data-textbg', name).html(name);
					}
					if (badge) {
						guildheader.find('.iconimg img').attr('src', badge);
					}
				}
				utilop.replaceUserInfo({
					action: 'memberinfo',
					userids: [userInfo.id],
					superid: guild_id,
					callback: function(roleInfoArr) {
						if (roleInfoArr && roleInfoArr.length > 0 && roleInfoArr[0].role == 3) {
							if (!EditGuildObj) {
								exports.loadResources(['component/guildedit.js'], function() {
									if (window.GuildEdit) {
										EditGuildObj = new GuildEdit();
										EditGuildObj.show(data, _updatehead);
									}
								});
							} else {
								EditGuildObj.show(data, _updatehead);
							}
						}
					}
				});
			});
		}

		function bindEvent() {
			var currentuserinfo = utilop.getCurrentYYYUserInfo();
			var msgboxhtmlObj = $("#sendmsgboxwarp");
			var inputObj = msgboxhtmlObj.find('input');
			bindTargetEvent(inputObj, 'focus', function(e) {
				var inputObj = msgboxhtmlObj.find('input');
				inputObj[0].focus();
				if (!inputObj.val()) {
					var _placeholder = '请输入聊天内容';
					if (full_service) {
						_placeholder = '向全世界喊出你的态度(要100金币哟)';
					}
					inputObj.val(_placeholder);
					setTimeout(function() {
						inputObj.val('');
					}, 30);
				}
				var scrollHeight = 900;
				var minScrollHeight = 900;
				setTimeout(function() {
					var scrollTopVal = ($(document).scrollTop() > minScrollHeight ? $(document).scrollTop() : scrollHeight);
					$(document).scrollTop(scrollTopVal);
					$('.guild_inner').scrollTop(scrollTopVal);
				}, 300);
			});

			function _msgboxclick(call) {
				function _send() {
					var val = inputObj.val();
					inputObj.blur();
					inputObj.val('');
					if (val) {
						DBDataObj.addcgchatmsg(val, function(data) {
							if (data) {
								data["headimg"] = currentuserinfo.headimg;
								data["nickname"] = currentuserinfo.nickname;
								addmsg(data);
								msgObj.scrollTop(msgObj[0].scrollHeight); //自己发消息,滚动
								if (window.socketobj) {
									socketobj.sendbroadcastMessage({
										"data": data,
										"type": "fayan"
									});
								}
							}
							call && call();
						})
					} else {
						call && call();
					}
				}
				if (full_service) {
					OpenDao.getTotalCoins(getTvmid(currentuserinfo.id), function(data) {
						data = data || {};
						var integral = data.integral || 0;
						if (parseInt(integral) < 100) {
							Modal.show({
								desc: "当前金币不足，是否去充值？",
								onConfirm: function(modalobj) {
									Modal.close(modalobj);
									AppService.openUrl(location.protocol + '//' + HOST_CONFIG["GAMES_HOST"] + '/Pay/Index/index');
								}
							});
							call && call();
						} else {
							_send();
						}
					})
				} else {
					_send();
				}
			}
			msgboxhtmlObj.find('.sbtn').on(clickevent, function(e) {
				e.preventDefault();
				var self = $(this);
				var state = self.attr('data-state') || '';
				if (state) {
					return
				}
				self.attr('data-state', 'true');
				_msgboxclick(function() {
					self.attr('data-state', '');
				});
			});
			inputObj.bind('keyup', function(event) {
				if (event.keyCode == "13") {
					_msgboxclick();
				}
			});
			msgObj.scroll(function(e) {
				if (this.scrollTop + this.clientHeight >= this.scrollHeight - 10) {
					//滚动到底部
					scrollTobottom = true;
				} else if (this.scrollTop == 0) {
					//顶部
					scrollTobottom = false;
					getmsgList();
				} else {
					scrollTobottom = false;
				}
			});


			//关闭
			$ownerEl.find('.closepagebtn').on('click', function(e) {
				e.preventDefault();
				//AppService.closePage&&AppService.closePage();
				window.history.go(-1);
			});

			if (!full_service) {
				$('#nav_tab_team').on('click', function(e) {
					e.preventDefault();
					var url = location.protocol + tvmview.host + '/yao8/guild/index.html?from=chat';
					location.replace(url)
				});

				window.onbeforeunload = function() {
					DBDataObj.heartbeat();
				};
			} else {
				DBDataObj.getuserrole(function(data) {
					if (data && data > 1) {
						DBDataObj.getusergamegroupinfo(currentuserinfo.id, function(_data) {
							console.log(_data)
							if (_data && _data[currentuserinfo.id]) {
								var member_num = _data[currentuserinfo.id].member_num;
								if (member_num > 5) {
									msgboxhtmlObj.show();
									$('#boxmsgpreloader').hide();
								}
							}
						})
					}
				})
				$ownerEl.find('.cglistpagebtn').on('click', function(e) {
					e.preventDefault();
					location.replace('index.html?from=chat')
				});
			}
		}
	});
})();