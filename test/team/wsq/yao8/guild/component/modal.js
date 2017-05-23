var Modal=(function(){
	var zindex=10600;
	var warpEl=null;
	var buttonTextOk='确定';
	var buttonTextCancel='取消';

	function transitionEnd(dom,callback) {
		var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'], i, j, dom = dom;
		function fireCallBack(e) {
			if (e.target !== this) return;
			callback.call(this, e);
			for (i = 0; i < events.length; i++) {
				dom.off(events[i], fireCallBack);
			}
		}
		if (callback) {
			for (i = 0; i < events.length; i++) {
				dom.on(events[i], fireCallBack);
			}
		}
		return this;
	}
	function createModal(params) {
		var warp=params.wrap||params.warp||warpEl||$('body');
		var titleHtml = params.title ? '<div class="m-modal-title lineartext" data-textbg="' + params.title + '">' + params.title + '</div>' : '';
		var descHtml = params.desc ? '<div class="m-modal-desc '+(!titleHtml?'notitle':'')+'">' + params.desc + '</div>' : '';
		var innerHtml = params.html ? '<div class="m-inner-html">' + params.html + '</div>' : '';
		var okbtnHtml = params.ok ? '<div class="m-ok-btn button green"><div class="btninfo"><p data-textbg="' + buttonTextOk + '">' + buttonTextOk + '</p></div></div>' : '';
		var cabcelbtnHtml = params.cancel ? '<div class="m-close-btn button red"><div class="btninfo"><p data-textbg="' + buttonTextCancel + '">' + buttonTextCancel + '</p></div></div>' : '';
		var btnHtml=okbtnHtml?'<div class="m-btn-wrap">'+okbtnHtml+cabcelbtnHtml+'</div>':'';
		var closeHtml=params.close?'<span class="m-close-x"></span>':'';
		var bgStyle=params.bgColor?('background-color:'+params.bgColor+';'):'';
		var sizeClazz=params.size||'';//size='larger'||'small'
		var t=new Date().getTime();
		var html='<div id="modalover_'+t+'" class="m-modal-overlay" style="'+bgStyle+'z-index:'+(zindex++)+';"></div>';
		html+='<div id="modal_'+t+'" class="m-modal '+sizeClazz+'" style="z-index:'+(zindex++)+';">';
		html+=closeHtml+titleHtml+descHtml+innerHtml+btnHtml;
		html+='</div>';
		warp.append(html);
		var modal=warp.children('#modal_'+t);
		var overlay =warp.children('#modalover_'+t);
		modal.show();
		overlay.addClass('m-modal-overlay-visible');
		modal.removeClass('m-modal-out').addClass('m-modal-in');
		//transitionEnd(modal,function(){});
		params.onOpen&&params.onOpen(modal);
		modal.find('.m-ok-btn').on('click', function (e) {
			e.preventDefault();
			var modalEl=$(this).closest('.m-modal');
			if(params.onConfirm){
				params.onConfirm(modalEl);
			}else{
				closeModal(modalEl);
			}
		});
		modal.find('.m-close-btn').on('click', function (e) {
			e.preventDefault();
			var modalEl=$(this).closest('.m-modal');
			params.onClose&&params.onClose(modalEl);
			closeModal(modalEl);
		});
		modal.find('.m-close-x').on('click', function (e) {
			e.preventDefault();
			var modalEl=$(this).closest('.m-modal');
			params.onClose&&params.onClose(modalEl);
			closeModal(modalEl);
		});
		return modal;
	}

	function closeModal(modal) {
		modal = $(modal);
		if (typeof modal !== 'undefined' && modal.length === 0) {return;}
		var modalid=modal.attr('id');
		if(modalid.indexOf('modal_')!=0){return;}
		var overlay = $('#modalover_'+modalid.substring(6));
		if(overlay && overlay.length > 0) {
			overlay.removeClass('m-modal-overlay-visible');
			transitionEnd(overlay,function (e) {
				overlay.remove();
			});
		}
		modal.removeClass('m-modal-in').addClass('m-modal-out');
		transitionEnd(modal,function (e) {
			modal.remove();
		});
	}
	function alert(opts){
		opts = opts || {};
		opts.ok=true;
		opts.cancel=false;
		opts.close=false;
		return createModal(opts);
	}

	/**
	 * @param opts
	 *  {
	 *  html:'<div></div'
	 *  onOpen:function(){}
	 *  }
	 *  注：div视图时需要传入warp参数，否则页面返回时弹框可能会继续存在
	 */
	function show(opts){
		opts = opts || {};
		if(typeof opts.ok=="undefined"){
			opts.ok=true;
		}
		if(typeof opts.cancel=="undefined"){
			opts.cancel=true;
		}
		if(typeof opts.close=="undefined"){
			opts.close=true;
		}
		return createModal(opts);
	}

	//初始化
	function init(baseparams){
		if(baseparams){
			if(baseparams.wrap||baseparams.warp){
				warpEl=baseparams.wrap||baseparams.warp;
			}
		}
	}

	/**
	 * opts
	 * {wrap:'warp',msg:'已发送',time:3000}
	 */
	function showTip(opts){
		var wrapper=opts.wrap||opts.warp||warpEl||$('body');
		wrapper.append('<div class="m-tipwinmask"><span class="m-tipwin">'+opts.msg+'</span></div>');
		var tipwin =wrapper.children('.m-tipwinmask:last');
		tipwin.show();
		tipwin.addClass('m-tipwinmask_in');

		var hideTipAlert=function(){
			tipwin.removeClass('m-tipwinmask_in');
			transitionEnd(tipwin,function (e) {
				tipwin.remove();
			});
		};
		var tipshowTimeoutId=setTimeout(function(){
			hideTipAlert();
		},opts.time||3000);
		tipwin.click(function(e){
			e.preventDefault();
			clearTimeout(tipshowTimeoutId);
			hideTipAlert();
		});
	}
	return {
		init:init,
		show:show,
		close:closeModal,
		alert:alert,
		showTip:showTip
	}
})();