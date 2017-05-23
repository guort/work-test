var DO=document,DB=DO.body,winW=window.innerWidth,winH=window.innerHeight
,mainVar={}
,search=getSearch()
,ST_user=localStorage.getItem("userInfo")
,userInfo=toObject(ST_user)||{}
;
toSQ({userInfo:userInfo,fun:init})

function init(){
	alert(JSON.stringify(userInfo))
}