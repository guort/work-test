function ManageAddress(openid, shake_openid, posid, selectedCallback, yyyappId) {
	var _districtsDictURL = 'https://assets.yaomall.tvm.cn/staticfile/assets/json/jdgeo.min.json';
	var preurl = 'https://secure.yaomall.tvm.cn/html/';
	var deleteId = "";
	var _districts = "";
	var _zjwsid = 'wx943bcfb63dbf9827';
	var ajax = function(conf) {
		// 初始化
		var option = {
			type: "",
			url: "",
			dataType: "json",
			data: null,
			beforeSend: "",
			success: "",
			complete: "",
			error: ""
		}
		//type参数,可选
		option.type = conf.type || option.type;
		//url参数，必填
		option.url = conf.url;
		//data参数可选，只有在post请求时需要
		option.data = conf.data;
		//datatype参数可选
		option.dataType = conf.dataType || option.dataType;
		//回调函数可选
		option.success = conf.success;
		option.complete = conf.complete;
		option.beforeSend = conf.beforeSend;
		option.error = conf.error;
		if (option.beforeSend) {
			option.beforeSend();
		}
		// 创建ajax引擎对象
		var xhr = createAjax();
		// 打开
		xhr.open(option.type, option.url, true);
		// 发送
		if (option.type == "GET" || option.type == "get") {
			xhr.send(null);
		} else if (option.type == "POST" || option.type == "post") {
			xhr.setRequestHeader("content-type",
				"application/x-www-form-urlencoded");
			xhr.send(option.data);
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (option.dataType == "text" || option.dataType == "TEXT") {
					if (option.success != null) {
						//普通文本
						option.success(xhr.responseText);
					}
				} else if (option.dataType == "xml" || option.dataType == "XML") {
					if (option.success != null) {
						//接收xml文档
						option.success(xhr.responseXML);
					}
				} else if (option.dataType == "json" || option.dataType == "JSON") {
					if (option.success != null) {
						//将json字符串转换为js对象
						option.success(eval("(" + xhr.responseText + ")"));
					}
				}

				if (option.complete) {
					option.complete();
				}

			} else if (xhr.status != 200) {
				if (option.error) {
					option.error();
				}
				if (option.complete) {
					option.complete();
				}
			}
		};
	};
	var createAjax = function() {
		xhr = new XMLHttpRequest();
		return xhr;
	};


	var basehtml = '<div>\
        <div class="yaotvc-address-container">\
            <div class="yaotvc-address-top">\
                <div id="cancelList" class="yaotvc-address-close-btn" style="display: none;"></div>\
                <div class="yaotvc-address-top-title">请选择您的领奖地址</div>\
                <div class="yaotvc-address-desc">请完善你的个人资料，以便在奖品福利发放及必要时联系到您，为您提供更便捷优质服务。</div>\
                <div class="yaotvc-address-tips">安全声明：您的信息我们不会分享、透露给任何第三方服务商。</div>\
            </div>\
            <div class="yaotvc-address-middle">\
                <div class="yaotvc-address-myaddress">我的地址<span id="yaotv-address-add-btn" class="yaotvc-address-add-btn">+添加新地址</span></div>\
                <div id="myaddrsList" class="yaotvc-address-myaddrs-list">\
                </div>\
            </div>\
            <div id="addressSelected_tj" class="yaotvc-address-bottom">提交</div>\
        </div>\
        <!-- 添加新地址 -->\
        <div class="yaotvc-address-add-new-addrs" id="add-dialog">\
            <div class="yaotvc-address-top">\
                <div id="cancelAdd" class="yaotvc-address-close-btn"></div>\
                <div class="yaotvc-address-top-title">请完善您的领奖地址</div>\
                <div class="yaotvc-address-desc">请完善你的个人资料，以便在奖品福利发放及必要时联系到您，为您提供更便捷优质服务。</div>\
                <div class="yaotvc-address-tips">安全声明：您的信息我们不会分享、透露给任何第三方服务商。</div>\
            </div>\
            <div class="yaotvc-address-add-new-middle">\
                <div  class="yaotvc-address-myaddress">添加新地址</div>\
                <div class="yaotvc-address-add-new-info">\
                    <div class="yaotvc-address-add-new-info-item">\
                        <div><em></em>收货人</div>\
                        <div>\
                            <input type="text" id="add-person-name" class="yaotvc-address-add-new-txt"/>\
                            <input type="hidden" id="add-person-id" class="yaotvc-address-add-new-txt"/>\
                        </div>\
                    </div>\
                    <div class="yaotvc-address-add-new-info-item">\
                        <div><em></em>手机号</div>\
                        <div><input type="tel"  id="add-person-phone"  class="yaotvc-address-add-new-txt"/></div>\
                    </div>\
                    <div class="yaotvc-address-add-new-info-item">\
                        <div><em></em>选择地区</div>\
                        <div><input type="text" id="add-person-region" class="yaotvc-address-add-new-txt" readonly/></div>\
                    </div>\
                    <div class="yaotvc-address-add-new-info-item">\
                        <div><em></em>详细地址</div>\
                        <div><input type="text" id="add-person-street" class="yaotvc-address-add-new-txt"/></div>\
                    </div>\
                    <div class="yaotvc-address-add-new-info-item">\
                        <div><em></em>邮编</div>\
                        <div><input type="tel"  id="add-person-zipcode" class="yaotvc-address-add-new-txt"/></div>\
                    </div>\
                </div>\
            </div>\
            <div id="yaotv-address-add-tj" class="yaotvc-address-add-new-bottom">提交</div>\
        </div>\
        <!-- 编辑地址 -->\
        <div class="yaotvc-address-update-addrs" id="edit-dialog">\
            <div class="yaotvc-address-top">\
                <div id="cancelEdit" class="yaotvc-address-close-btn"></div>\
                <div class="yaotvc-address-top-title">请完善您的领奖地址</div>\
                <div class="yaotvc-address-desc">请完善你的个人资料，以便在奖品福利发放及必要时联系到您，为您提供更便捷优质服务。</div>\
                <div class="yaotvc-address-tips">安全声明：您的信息我们不会分享、透露给任何第三方服务商。</div>\
            </div>\
            <div class="yaotvc-address-update-middle">\
                <div class="yaotvc-address-myaddress">编辑地址</div>\
                <div class="yaotvc-address-add-new-info">\
                    <div class="yaotvc-address-update-info-item">\
                        <div><em></em>收货人</div>\
                        <div>\
                            <input type="text" id="update-person-name" class="yaotvc-address-update-txt"/>\
                            <input type="hidden" id="update-person-id" class="yaotvc-address-add-new-txt"/>\
                        </div>\
                    </div>\
                    <div class="yaotvc-address-update-info-item">\
                        <div><em></em>手机号</div>\
                        <div><input type="tel" id="update-person-phone"  class="yaotvc-address-update-txt"/></div>\
                    </div>\
                    <div class="yaotvc-address-update-info-item">\
                        <div><em></em>选择地区</div>\
                        <div><input type="text" id="update-person-region" class="yaotvc-address-update-txt" readonly/></div>\
                    </div>\
                    <div class="yaotvc-address-update-info-item">\
                        <div><em></em>详细地址</div>\
                        <div><input type="text" id="update-person-street" class="yaotvc-address-update-txt"/></div>\
                    </div>\
                    <div class="yaotvc-address-update-info-item">\
                        <div><em></em>邮编</div>\
                        <div><input type="tel" id="update-person-zipcode" class="yaotvc-address-update-txt"/></div>\
                    </div>\
                </div>\
            </div>\
            <div id="edit_tj" class="yaotvc-address-update-bottom">提交</div>\
        </div>\
        <!--删除确认-->\
        <div id="store-shipping-address-delete-window">\
            <div class="store-shipping-address-deltips">\
                <div class="store-shipping-address-deltips-question">确定要删除此收货地址吗？</div>\
                <div class="store-shipping-address-deltips-answer">\
                    <div id="concelDelBtn" class="store-shipping-address-deltips-answer-no">取消</div>\
                    <div id="confirmDelBtn" class="store-shipping-address-deltips-answer-yes">确定</div>\
                </div>\
            </div>\
        </div>\
        <div  id="common-loading">\
        </div>\
        </div>'
	document.getElementById(posid).innerHTML = basehtml;
	//根据频道添加身份证信息
	if (yyyappId == _zjwsid) {
		var $add_sfz_html = '<div class="yaotvc-address-add-new-info-item">\
                            <div><em></em>身份证</div>\
                            <div><input type="text"  id="add-person-sfzcode" class="yaotvc-address-add-new-txt"/></div>\
                         </div>';
		var $edit_sfz_html = '<div class="yaotvc-address-update-info-item">\
                                <div><em></em>身份证</div>\
                                <div><input type="tel" id="update-person-sfzcode" class="yaotvc-address-update-txt"/></div>\
                            </div>';
		document.querySelectorAll('#add-dialog .yaotvc-address-add-new-info')[0].appendChild(parseDom($add_sfz_html));
		document.querySelectorAll('#edit-dialog .yaotvc-address-add-new-info')[0].appendChild(parseDom($edit_sfz_html));
	}
	document.getElementById("common-loading").style.display = "block";
	var GetAddressList = function() {
		ajax({
			url: preurl + "?q=service/yaotvc/get_addresses_by_openid",
			data: JSON.stringify({
				"openid": openid
			}),
			async: true,
			type: 'post',
			dataType: 'json',
			timeout: 10000,
			beforeSend: function() {
				document.getElementById("common-loading").style.display = "block";
			},
			success: function(data) {
				if (AjaxStatus(data)) {
					return true;
				} else {
					//document.getElementById(posid).innerHtml=frameHtml;
					var address_list = data["data"]["address_list"];
					var shippingAddressList = '';
					// document.getElementById("#deal-shipping-address-empty-tip").setAttribute("data-address-size",address_list.length);
					for (var i = 0; i < address_list.length; i++) {
						var adr = address_list[i];
						var default_address_en = "";
						/* if(i==0&&adr["default"]==1){
                         default_address_en = "selected-addrs";
                         }*/

						if (i == 0) {
							default_address_en = "selected-addrs";
						}

						if (adr["town"] == null) {
							adr["town"] = "";
						}
						if (adr["zipcode"] == null) {
							adr["zipcode"] = "";
						}
						if (adr["identity_card"] == null) {
							adr["identity_card"] = "";
						}
						var addressItem = ' <div class="yaotvc-address-myaddrs-item"' + 'data-address-id="' + adr["id"] + '"' +
							' data-address-name="' + adr["addressee"] + '"' +
							' data-address-phone="' + adr["phone"] + '"' +
							' data-address-provice="' + adr["province"] + '"' +
							' data-address-provice_id="' + adr["province_id"] + '"' +
							' data-address-city="' + adr["city"] + '"' +
							' data-address-city_id="' + adr["city_id"] + '"' +
							' data-address-area="' + adr["area"] + '"' +
							' data-address-area_id="' + adr["area_id"] + '"' +
							' data-address-town="' + adr["town"] + '"' +
							' data-address-town_id="' + adr["town_id"] + '"' +
							' data-address-street="' + adr["street"] + '"' +
							' data-address-postalcode="' + adr["zipcode"] + '"' +
							' data-address-sfzcode="' + adr["identity_card"] + '"' +
							' data-address-district-value="' + adr["tag"] + '">' + '<div class="yaotvc-address-item-info">\
                                <span class="yaotvc-address-info-name">' + adr["addressee"] + '</span>\
                                <span class="yaotvc-address-info-phone">' + adr["phone"] + '</span>\
                            </div>\
                            <div class="yaotvc-address-info-detailaddrs">' + adr["province"] + adr["city"] + adr["area"] + adr["town"] + adr["street"] + '</div>\
                            <div class="yaotvc-address-info-oprator">\
                                <span class="yaotvc-address-info-sendhere ' + default_address_en + '">寄到这里</span>\
                                <span class="yaotvc-address-info-delete">删除</span>\
                                <span class="yaotvc-address-info-edit">编辑</span>\
                            </div>\
                        </div>';
						shippingAddressList += addressItem;
					}
					var myaddrs = document.getElementById("myaddrsList");
					myaddrs.innerHTML = shippingAddressList;
					setEvent();
					if (address_list.length == 0) {
						addAddressClick();
					}
				}
			},
			error: function() {

			},
			complete: function() {
				document.getElementById("common-loading").style.display = "none";
			}
		});
	}


	//寄送到这儿事件绑定
	var sendherebind = function(sendhere) {
		sendhere.addEventListener("click", (function(sendhere) {
			return function(e) {
				var sendhereList = document.querySelectorAll(".yaotvc-address-info-sendhere");
				for (var j = 0; j < sendhereList.length; j++) {
					var sh = sendhereList[j];
					sh.classList.remove("selected-addrs");
				}
				sendhere.classList.add("selected-addrs")
			}
		})(sendhere))
	}


	//删除条目绑定
	var yaotvcDelBtnBind = function(yaotvcDelBtn) {
		yaotvcDelBtn.addEventListener('click', (function(yaotvcDelBtn) {
			return function(e) {
				deleteId = yaotvcDelBtn.parentNode.parentNode.getAttribute("data-address-id");
				document.getElementById("store-shipping-address-delete-window").style.display = "block";
			}
		})(yaotvcDelBtn))

	}


	//编辑按钮事件绑定
	var yaotvcEditBtnBind = function(yaotvcEditBtn) {
		yaotvcEditBtn.addEventListener('click', (function(yaotvcEditBtn) {
			return function(e) {
				EditAddressClick(yaotvcEditBtn);
			}
		})(yaotvcEditBtn))
	}

	var setEvent = function() {
		//点击每条地址的编辑按钮
		var yaotvcEditBtns = document.querySelectorAll(".yaotvc-address-info-edit");
		for (var i = 0; i < yaotvcEditBtns.length; ++i) {
			var yaotvcEditBtn = yaotvcEditBtns[i];
			yaotvcEditBtnBind(yaotvcEditBtn);

		}

		//新增保存按钮事件绑定
		document.getElementById("yaotv-address-add-tj").addEventListener("click", function() {
			var idTemp = document.getElementById("add-person-id").value;
			var nameTemp = document.getElementById("add-person-name").value;
			var phoneTemp = document.getElementById("add-person-phone").value;
			var regionTemp = document.getElementById("add-person-region");
			var streetTemp = document.getElementById("add-person-street").value;
			var zipcodeTemp = document.getElementById("add-person-zipcode").value;
			var sfzcodeTemp = null;
			if (document.getElementById("add-person-sfzcode")) {
				sfzcodeTemp = document.getElementById("add-person-sfzcode").value;
			}
			SaveAddressInfo(idTemp, nameTemp, phoneTemp, regionTemp, streetTemp, zipcodeTemp, sfzcodeTemp);
		});

		document.getElementById("edit_tj").addEventListener("click", function() {
			var idTemp = document.getElementById("update-person-id").value;
			var nameTemp = document.getElementById("update-person-name").value;
			var phoneTemp = document.getElementById("update-person-phone").value;
			var regionTemp = document.getElementById("update-person-region");
			var streetTemp = document.getElementById("update-person-street").value;
			var zipcodeTemp = document.getElementById("update-person-zipcode").value;
			var sfzcodeTemp = null;
			if (document.getElementById("update-person-sfzcode")) {
				sfzcodeTemp = document.getElementById("update-person-sfzcode").value;
			}
			if (yyyappId == _zjwsid) {
				if (!sfzcodeTemp) {
					alert("请填写身份证信息");
					return false;
				}
			}
			SaveAddressInfo(idTemp, nameTemp, phoneTemp, regionTemp, streetTemp, zipcodeTemp, sfzcodeTemp);
		});


		//点击添加新地址的按钮
		var yaotvcAddBtn = document.getElementById("yaotv-address-add-btn");
		yaotvcAddBtn.addEventListener("click", function(e) {
			addAddressClick();
		})

		//点击删除按钮
		var yaotvcDelBtns = document.querySelectorAll(".yaotvc-address-info-delete");
		for (var i = 0; i < yaotvcDelBtns.length; ++i) {
			var yaotvcDelBtn = yaotvcDelBtns[i];
			yaotvcDelBtnBind(yaotvcDelBtn);

		}

		//编辑取消
		document.getElementById("cancelEdit").addEventListener("click", function(e) {
			document.getElementById("edit-dialog").style.display = "none";
			ClearNewAddressInfo();
		})

		//新增取消
		document.getElementById("cancelAdd").addEventListener("click", function(e) {
			document.getElementById("add-dialog").style.display = "none";
			ClearNewAddressInfo();
		})


		//删除确认
		document.getElementById("confirmDelBtn").addEventListener("click", function() {
			document.getElementById("store-shipping-address-delete-window").style.display = "none";
			document.getElementById("common-loading").style.display = "block";
			DeleteAddress(deleteId);
		})

		//删除取消
		document.getElementById("concelDelBtn").addEventListener("click", function() {
			document.getElementById("store-shipping-address-delete-window").style.display = "none";
		})


		//地区选择弹框
		var reginon1 = document.getElementById("add-person-region");
		var reginon2 = document.getElementById("update-person-region");
		var reginons = new Array();
		reginons.push(reginon1);
		reginons.push(reginon2);
		for (var i = 0; i < reginons.length; i++) {
			var reginon = reginons[i];
			reginon.addEventListener("click", (function(reginon) {
				return function() {
					ShowChooseDistrictWindow(function(textArr, valueArr) {
						var txt = textArr.join(" ");
						reginon.value = txt;
						reginon.setAttribute("data-text", textArr.join(","));
						reginon.setAttribute("data-value", valueArr.join(","));
					});
				}
			})(reginon));
		}
		//选中那个地址
		var sendheres = document.querySelectorAll(".yaotvc-address-info-sendhere")
		for (var i = 0; i < sendheres.length; i++) {
			var sendhere = sendheres[i];
			sendherebind(sendhere)
		}


		document.getElementById("addressSelected_tj").addEventListener("click", (function() {
			return function(e) {
				var returnjson = null;
				var sendhereList = document.querySelectorAll(".yaotvc-address-info-sendhere");
				for (var j = 0; j < sendhereList.length; j++) {
					var sh = sendhereList[j];
					if (sh.classList.contains("selected-addrs")) {
						var dom = sh.parentNode.parentNode
						var name = dom.getAttribute("data-address-name");
						var phone = dom.getAttribute("data-address-phone");

						var prov = dom.getAttribute("data-address-provice");
						var city = dom.getAttribute("data-address-city");
						var area = dom.getAttribute("data-address-area");
						var town = dom.getAttribute("data-address-town");
						if (town == null || town == "null") {
							town = "";
						}
						var street = dom.getAttribute("data-address-street");
						var sfz_code = dom.getAttribute("data-address-sfzcode");
						var district = CreateDistrictDisplay(prov, city, area, town);
						var address = district.join("") + street;

						if (yyyappId == _zjwsid) {
							if (!sfz_code) {
								alert("请添加身份证信息");
								EditAddressClick(sh);
								break;
							}
						}
						returnjson = {
							"address": address,
							"phone": phone,
							"name": name
						}
						break;
					}
				}

				if (returnjson == null) {
					alert("请选择地址");
					return;
				}
				document.getElementById(posid).innerHTML = "";
				selectedCallback(returnjson);
			}
		})())
	}

		function CreateDistrictDisplay(prov, city, area, town, splitter) {
			var district = [prov];
			if (city) {
				district.push(city);
				if (area) {
					district.push(area);
					if (town) {
						district.push(town);
					}
				}
			}
			return district;
		}

	var EditAddressClick = function($edit) {
		var $selectAddress = $edit.parentNode.parentNode;
		var id = $selectAddress.getAttribute("data-address-id");
		var name = $selectAddress.getAttribute("data-address-name");
		var phone = $selectAddress.getAttribute("data-address-phone");

		var prov = $selectAddress.getAttribute("data-address-provice");
		var city = $selectAddress.getAttribute("data-address-city");
		var area = $selectAddress.getAttribute("data-address-area");
		var town = $selectAddress.getAttribute("data-address-town");
		var district = CreateDistrictDisplay(prov, city, area, town);

		var tagTemp = $selectAddress.getAttribute("data-address-district-value");
		var street = $selectAddress.getAttribute("data-address-street");
		var postalcode = $selectAddress.getAttribute("data-address-postalcode");
		var sfzcode = $selectAddress.getAttribute("data-address-sfzcode");
		document.getElementById("update-person-id").value = id;
		document.getElementById("update-person-name").value = name;
		document.getElementById("update-person-phone").value = phone;
		document.getElementById("update-person-region").value = district.join(" ");
		document.getElementById("update-person-region").setAttribute("data-text", district.join(","));
		document.getElementById("update-person-region").setAttribute("data-value", tagTemp);
		document.getElementById("update-person-street").value = street;
		document.getElementById("update-person-zipcode").value = postalcode;
		document.getElementById("update-person-sfzcode").value = sfzcode;
		document.getElementById("edit-dialog").style.display = "block";
		//SwitchLayer(_edit_address_page);
	}
	var addAddressClick = function() {
		document.getElementById("add-dialog").style.display = "block";
	}

	var SaveAddressInfo = function(idTemp, nameTemp, phoneTemp, regionTemp, streetTemp, zipcodeTemp, sfzcodeTemp) {
		if (SaveAddressInfoTest(nameTemp, phoneTemp, regionTemp, streetTemp, zipcodeTemp, sfzcodeTemp)) {
			var regionArray = regionTemp.getAttribute("data-text").split(",");
			var tagTemp = regionTemp.getAttribute("data-value");
			var idArray = tagTemp.split(",");
			var prov = regionArray[0];
			var provID = idArray[0];
			var city = "";
			var cityID = "";
			var area = "";
			var areaID = "";
			var town = "";
			var townID = "";
			if (idArray.length > 1) {
				city = regionArray[1];
				cityID = idArray[1];
			}
			if (idArray.length > 2) {
				area = regionArray[2];
				areaID = idArray[2];
			}
			if (idArray.length > 3) {
				town = regionArray[3];
				townID = idArray[3];
			}

			if (provID == "0") {
				alert("请完善地区信息");
				regionTemp.value = null;
				regionTemp.removeAttribute("data-value");
				regionTemp.removeAttribute("data-text");
				return;
			}

			var flg = false;
			var pdt = {
				addressee: nameTemp,
				phone: phoneTemp,
				province: prov,
				province_id: provID,
				city: city,
				city_id: cityID,
				area: area,
				area_id: areaID,
				town: town,
				town_id: townID,
				tag: tagTemp,
				street: streetTemp,
				zipcode: zipcodeTemp,
				identity_code: sfzcodeTemp,
				openid: openid,
				shake_openid: shake_openid
			};
			if (idTemp) {
				pdt.id = idTemp;
				flg = true;
			}

			ajax({
				url: preurl + "?q=service/yaotvc/add_new_address",
				data: JSON.stringify(pdt),
				async: true,
				type: 'post',
				dataType: 'json',
				timeout: 10000,
				beforeSend: function() {
					document.getElementById("common-loading").style.display = "block";
				},
				success: function(data) {
					if (AjaxStatus(data)) {
						return true;
					}

					if (flg) //当是更新地址信息的时候需要更新列表中的信息
					{
						var addressDomList = document.querySelectorAll("#myaddrsList .yaotvc-address-myaddrs-item");

						for (var i = 0; i < addressDomList.length; i++) {
							var $editAddress = addressDomList[i];
							if ($editAddress.getAttribute("data-address-id") == idTemp) {
								$editAddress.setAttribute("data-address-name", nameTemp);
								$editAddress.setAttribute("data-address-phone", phoneTemp);
								$editAddress.setAttribute("data-address-provice", prov);
								$editAddress.setAttribute("data-address-provice_id", provID);
								$editAddress.setAttribute("data-address-city", city);
								$editAddress.setAttribute("data-address-city_id", cityID);
								$editAddress.setAttribute("data-address-area", area);
								$editAddress.setAttribute("data-address-area_id", areaID);
								$editAddress.setAttribute("data-address-town", town);
								$editAddress.setAttribute("data-address-town_id", townID);
								$editAddress.setAttribute("data-address-street", streetTemp);
								$editAddress.setAttribute("data-address-postalcode", zipcodeTemp);
								$editAddress.setAttribute("data-address-sfzcode", sfzcodeTemp);
								$editAddress.setAttribute("data-address-district-value", tagTemp);
								var addressdomchilren = $editAddress.children;
								for (var j = 0; j < addressdomchilren.length; j++) {
									var dom = addressdomchilren[j];
									if (dom.classList.contains("yaotvc-address-item-info")) {
										dom.firstElementChild.innerHTML = nameTemp;
									}
									if (dom.classList.contains("yaotvc-address-item-info")) {
										dom.lastElementChild.innerHTML = phoneTemp;
									}
									if (dom.classList.contains("yaotvc-address-info-detailaddrs")) {
										dom.innerHTML = regionArray.join("") + streetTemp;
									}
								}

							}

						}
					} else {
						AddAddressList(data.data.id, nameTemp, phoneTemp, prov, provID, city, cityID, area, areaID, town, townID, streetTemp, zipcodeTemp, tagTemp, sfzcodeTemp);
					}
					document.getElementById("add-dialog").style.display = "none";
					document.getElementById("edit-dialog").style.display = "none";
					ClearNewAddressInfo();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {},
				complete: function(XHR, TS) {
					document.getElementById("common-loading").style.display = "none";
				}
			});
		}
	}

	var SaveAddressInfoTest = function(name, phone, region, street, postalcode, sfzcode) {
		var flg = false;
		var testMSG = "";
		var isName = /^.{2,10}$/;
		var isMobile = /^1[0-9]\d{9}$/;
		//var isStreet = /^(\w|[\u4E00-\u9FA5\uf900-\ufa2d]){1,100}$/;
		do {
			if (!isName.test(name)) {
				testMSG = "名字  必填  *2~10位  例:张三";
				break;
			}

			if (!isMobile.test(phone)) {
				testMSG = "手机号码   必填  *11位数字  例:15912345678";
				break;
			}

			var disv = region.getAttribute("data-value");
			if (!CheckDistrict(disv)) {
				testMSG = "地区需要选择省和市";
				break;
			}
			if (sfzcode) {
				if (!IdentityCodeValid(sfzcode)) {
					testMSG = "身份证错误";
					break;
				}
			}
			//if (!isStreet.test(street))
			if (street == "") {
				//testMSG = "详细地址 必填  *中文数字字母  例:国家软件园二期金牛座C座4层";
				testMSG = "详细地址 必填   例:国家软件园二期金牛座C座4层";
				break;
			}

			flg = true;
		}
		while (false);

		if (!flg) {
			alert(testMSG);
		}

		return flg;
	}

	var CheckDistrict = function(value) {
		if (!value) {
			return false;
		}

		var mlength = 1;

		var arr = value.split(",");
		if (arr.length < mlength) {
			return false;
		}

		return true;
	}

	var AddAddressList = function(id, name, phone, prov, provID, city, cityID, area, areaID, town, townID, street, postalcode, tag, sfzcode) {
		if (town == null) {
			town = "";
		}
		var addressItem = ' <div class="yaotvc-address-myaddrs-item"' + 'data-address-id="' + id + '"' +
			' data-address-name="' + name + '"' +
			' data-address-phone="' + phone + '"' +
			' data-address-provice="' + prov + '"' +
			' data-address-provice_id="' + provID + '"' +
			' data-address-city="' + city + '"' +
			' data-address-city_id="' + cityID + '"' +
			' data-address-area="' + area + '"' +
			' data-address-area_id="' + areaID + '"' +
			' data-address-town="' + town + '"' +
			' data-address-town_id="' + townID + '"' +
			' data-address-street="' + street + '"' +
			' data-address-postalcode="' + postalcode + '"' +
			' data-address-sfzcode="' + sfzcode + '"' +
			' data-address-district-value="' + tag + '">' + '<div class="yaotvc-address-item-info">\
                                <span class="yaotvc-address-info-name">' + name + '</span>\
                                <span class="yaotvc-address-info-phone">' + phone + '</span>\
                            </div>\
                            <div class="yaotvc-address-info-detailaddrs">' + prov + city + area + town + street + '</div>\
                            <div class="yaotvc-address-info-oprator">\
                                <span class="yaotvc-address-info-sendhere">寄到这里</span>\
                                <span class="yaotvc-address-info-delete">删除</span>\
                                <span class="yaotvc-address-info-edit">编辑</span>\
                            </div>\
                        </div>';
		var addressItemDom = parseDom(addressItem);
		var options = addressItemDom.lastElementChild.children;
		for (var i = 0; i < options.length; i++) {
			option = options[i];
			if (option.classList.contains("yaotvc-address-info-sendhere")) { //寄到这儿操作
				sendherebind(option);

			}

			if (option.classList.contains("yaotvc-address-info-delete")) { //删除操作

				yaotvcDelBtnBind(option);
			}

			if (option.classList.contains("yaotvc-address-info-edit")) { //编辑操作

				yaotvcEditBtnBind(option);
			}
		}


		document.getElementById("myaddrsList").appendChild(addressItemDom);
	}


	//dom转string
		function parseDom(arg) {
			var objE = document.createElement("div")
			objE.innerHTML = arg;
			return objE.firstElementChild;
		}

	var DeleteAddress = function(idTemp) {
		var pdt = {
			id: idTemp,
			openid: openid,
			shake_openid: shake_openid
		};
		ajax({
			url: preurl + "?q=service/yaotvc/delete_one_address",
			data: JSON.stringify(pdt),
			async: true,
			type: 'post',
			dataType: 'json',
			timeout: 10000,
			success: function(data) {
				if (AjaxStatus(data)) {
					return true;
				}
				var addressDomList = document.querySelectorAll("#myaddrsList .yaotvc-address-myaddrs-item");
				for (var i = 0; i < addressDomList.length; i++) {
					var address = addressDomList[i];
					if (address.getAttribute("data-address-id") == idTemp) {
						address.parentNode.removeChild(address);
					}
				}

			},
			error: function() {},
			complete: function() {
				document.getElementById("common-loading").style.display = "none";
			}
		});
	}

	var SetDefaultAddress = function(defaultId) {
		var pdt = {
			id: defaultId,
			openid: openid,
			shake_openid: shake_openid
		};
		$.ajax({
			url: preurl + "?q=service/yaotvc/set_default_add",
			data: JSON.stringify(pdt),
			async: true,
			type: 'post',
			dataType: 'json',
			timeout: 10000,
			success: function(data) {
				if (AjaxStatus(data)) {
					return true;
				}
				var $defaultAddress = $("div.store-shipping-address-list-parent").find("em.store-shipping-address-default-icon-en");
				$defaultAddress.attr("class", "store-shipping-address-default-icon-un");
				$defaultAddress.parent().parent().find("span.store-shipping-address-operator-delete").css("display", "inline");
				var defaultTemp = $("#store-shipping-address-main").find("div[data-address-id='" + defaultId + "']");
				defaultTemp.find("div[data-name='set-default-icon']").find(".store-shipping-address-default-icon-un").attr("class", "store-shipping-address-default-icon-en");
			},
			error: function() {},
			complete: function() {}
		});
	}

	var ClearNewAddressInfo = function() {
		//更新输入框清空
		document.getElementById("update-person-id").value = "";
		document.getElementById("update-person-name").value = "";
		document.getElementById("update-person-phone").value = "";
		document.getElementById("update-person-region").value = "";
		document.getElementById("update-person-region").setAttribute("data-text", "");
		document.getElementById("update-person-region").setAttribute("data-value", "");
		document.getElementById("update-person-street").value = "";
		document.getElementById("update-person-zipcode").value = "";

		//新增输入框清空
		document.getElementById("add-person-id").value = "";
		document.getElementById("add-person-name").value = "";
		document.getElementById("add-person-phone").value = "";
		document.getElementById("add-person-region").value = "";
		document.getElementById("add-person-region").setAttribute("data-text", "");
		document.getElementById("add-person-region").setAttribute("data-value", "");
		document.getElementById("add-person-street").value = "";
		document.getElementById("add-person-zipcode").value = "";
	}

		function AjaxStatus(data) {
			if (typeof(data.status) != "undefined" && data.status != 0) {
				alert("操作没有成功，请稍后再试。");
				return true;
			}
			return false;
		}

	var AjaxErrorMSG = function(XMLHttpRequest, textStatus, errorThrown) {
		alert("操作没有成功，请稍后再试。");
	}


		function ShowChooseDistrictWindow(callback) {
			var datArr = [];
			var textArr = [];
			var valueArr = [];


			var $list = document.createElement("div");
			$list.id = "deal-choose-district-content-list";
			var $back = document.createElement("div");
			$back.id = "deal-choose-district-content-title-back";
			var $ttle = document.createElement("div");
			$ttle.id = "deal-choose-district-content-title";
			$span = document.createElement("span");
			$span.innerHTML = "返回";
			$back.appendChild($span);
			$ttle.appendChild($back)
			$ttle.addEventListener("click", function() {
				if (!datArr.length) {
					return;
				}

				$list.innerHTML = "";
				Fill(datArr[datArr.length - 1]);

				datArr.length -= 1;
				textArr.length -= 1;
				valueArr.length -= 1;

				if (!datArr.length) {
					$ttle.style.display = "none;";
				}
			});

			var $ldng = document.createElement("div");
			$ldng.id = "deal-choose-district-content-loading";
			Fill(_districts);

			function Fill(odt) {
				var data = ConvertObjectToArray(odt);
				for (var i = 0; i < data.length; i++) {
					var val = data[i];
					var $vec = document.createElement("div");
					$vec.className = "deal-choose-district-item";
					$vec.innerHTML = val.name;
					$vec.addEventListener("click", (function(val) {
						return function() {
							textArr.push(val.name);
							valueArr.push(val.id);
							if (!val.child) {
								if (valueArr.length != 3 || val.checked) {
									Over();
								} else {
									$ldng.style.display = "block";
									var pdt = {
										id: val.id
									};

									ajax({
										url: preurl + "?q=service/yaotvc/get_low_level_districts",
										data: JSON.stringify(pdt),
										async: true,
										type: 'post',
										dataType: 'json',
										timeout: 10000,
										beforeSend: function() {

										},
										success: function(data) {
											var childs = data.data;
											odt[val.id].checked = 1;
											if (childs.length) {
												var chd = ConvertArrayToObject(childs);
												odt[val.id].next = chd;

												NextLevel();
												Fill(chd);
											} else {
												Over();
											}
										},
										error: function() {

										},
										complete: function() {
											$ldng.style.display = "none";
										}
									});

								}

								return;
							}

							NextLevel();
							Fill(val.child);

							function NextLevel() {
								$ttle.style.display = "none;";
								$list.innerHTML = "";
								datArr.push(odt);
							}

							function Over() {
								$msk.parentNode.removeChild($msk);
								callback(textArr, valueArr);
							}
						}

					})(val));
					// evnent bind end

					$list.appendChild($vec);

				}

			}

			var $cle = document.createElement("div");
			$cle.id = "deal-choose-district-content-close";
			$cle.addEventListener("click", function() {
				$list.innerHTML = "";
				$msk.parentNode.removeChild($msk);
			});

			var $ctn = document.createElement("div");
			$ctn.id = "deal-choose-district-content";
			$ctn.appendChild($ttle);
			$ctn.appendChild($cle);
			$ctn.appendChild($list);
			$ctn.appendChild($ldng);

			var $msk = document.createElement("div");
			$msk.id = "deal-choose-district-mask";
			$msk.appendChild($ctn);
			document.getElementById(posid).appendChild($msk);
		}

		function ConvertArrayToObject(arr) {
			var obj = {};
			for (var i = 0; i < arr.length; i++) {
				var instc = arr[i];
				obj[instc.id] = instc;
			}
			return obj;
		}

		function ConvertObjectToArray(obj) {
			var arr = [];

			for (var key in obj) {
				if (!obj.hasOwnProperty(key)) {
					continue;
				}

				var val = obj[key];

				var itm = {
					id: key
				};
				if (Object.prototype.toString.call(val).slice(8, -1) == "Object") {
					itm.name = val.name;
					if (!IsEmptyObject(val.next)) {
						itm.child = val.next;
					}
					if (val.checked) {
						itm.checked = val.checked;
					}
				} else {
					itm.name = val;
					obj[key] = itm;
				}
				arr.push(itm);
			}

			return arr;
		}

		function IsEmptyObject(obj) {
			if (!obj) {
				return 1;
			}

			for (var key in obj) {
				if (!obj.hasOwnProperty(key)) {
					continue;
				}
				var value = obj[key];
				value = JSON.stringify(value);
				value.replace(/(^\s*)|(\s*$)/g, "");
				if (!value.length) {
					continue;
				}

				return 0;
			}

			return 1;
		}

		function IdentityCodeValid(code) {
			var city = {
				11: "北京",
				12: "天津",
				13: "河北",
				14: "山西",
				15: "内蒙古",
				21: "辽宁",
				22: "吉林",
				23: "黑龙江 ",
				31: "上海",
				32: "江苏",
				33: "浙江",
				34: "安徽",
				35: "福建",
				36: "江西",
				37: "山东",
				41: "河南",
				42: "湖北 ",
				43: "湖南",
				44: "广东",
				45: "广西",
				46: "海南",
				50: "重庆",
				51: "四川",
				52: "贵州",
				53: "云南",
				54: "西藏 ",
				61: "陕西",
				62: "甘肃",
				63: "青海",
				64: "宁夏",
				65: "新疆",
				71: "台湾",
				81: "香港",
				82: "澳门",
				91: "国外 "
			};
			var tip = "";
			var pass = true;

			if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}(\d|X)$/i.test(code)) {
				tip = "身份证号格式错误";
				pass = false;
			} else if (!city[code.substr(0, 2)]) {
				tip = "地址编码错误";
				pass = false;
			} else {
				//18位身份证需要验证最后一位校验位
				if (code.length == 18) {
					code = code.split('');
					//∑(ai×Wi)(mod 11)
					//加权因子
					var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
					//校验位
					var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
					var sum = 0;
					var ai = 0;
					var wi = 0;
					for (var i = 0; i < 17; i++) {
						ai = code[i];
						wi = factor[i];
						sum += ai * wi;
					}
					var last = parity[sum % 11];
					if (parity[sum % 11] != code[17]) {
						tip = "校验位错误";
						pass = false;
					}
				}
			}
			return pass;
		}


	ajax({
		url: _districtsDictURL,
		type: "GET",
		dataType: "json",
		success: function(rspdt, textStatus, jqXHR) {
			_districts = rspdt;
			GetAddressList();
		}
	});

}