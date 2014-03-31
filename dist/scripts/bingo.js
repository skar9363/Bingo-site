function Bingo(){}Bingo.prototype={_lastScroll:0,_pptSelectors:"section.scroll_listen",screenWidth:1440,preloadFiles:{s1024:["imgs/ink_dots_close_1024.png","imgs/ink_dots_far_1024.png","imgs/print_blue_1024.png","imgs/print_blue_one_1024.png","imgs/print_purple_1024.png","imgs/print_red_1024.png","imgs/person_1024.png","imgs/skills_1024.png","imgs/print_yellow_1024.png","imgs/bg_1024.jpg"],s1440:["imgs/ink_dots_close_1440.png","imgs/ink_dots_far_1440.png","imgs/print_blue_1440.png","imgs/print_blue_one_1440.png","imgs/print_purple_1440.png","imgs/print_red_1440.png","imgs/person_1440.png","imgs/skills_1440.png","imgs/print_yellow_1440.png","imgs/bg_1440.jpg"],s1920:["imgs/ink_dots_close_1920.png","imgs/ink_dots_far_1920.png","imgs/print_blue_1920.png","imgs/print_blue_one_1920.png","imgs/print_purple_1920.png","imgs/print_red_1920.png","imgs/person_1920.png","imgs/skills_1920.png","imgs/print_yellow_1920.png","imgs/bg_1920.jpg"]},init:function(){this.bindEvents(),this.preload()},bindEvents:function(){var that=this,$pptSections=$(this._pptSelectors);$pptSections.each(function(){$(this).on("ppt",function(){that.elePPT($(this))})}),$(window).on("scroll",function(){that.scrollPersective(),that.lastScroll=$(this).scrollTop()}),$("nav a.scroll").on("click",function(e){var id=$(this).attr("href"),$section=$(id),top=$section.offset().top;$("html, body").animate({scrollTop:top},1e3),e.preventDefault()})},preload:function(){var $ePercent=$(".loading"),screenW=screen.availWidth,that=this,pFiles=that.preloadFiles,files=[];screenW>1440?(files=pFiles.s1920,screenW=1920):1024>=screenW?(files=pFiles.s1024,screenW=1024):(files=pFiles.s1440,screenW=1440),this.screenWidth=screenW;new Preload({fileArr:files,oneLoaded:function(){var percent=this.percent;$ePercent.css("width",percent+"%"),100===percent&&that.loadComplete()}})},loadComplete:function(){var $header=$("header"),$loadingBar=$(".loading_bar"),$logo=$(".logo"),h=80,winHeight=$(window).height(),p=h/winHeight*100+"%",that=this;$("body").addClass("s"+this.screenWidth),$header.css("height",p),$loadingBar.css("opacity",0),$logo.css("margin","-35px 0 0 -76px"),setTimeout(function(){$("body").removeClass("loading"),$header.css("height",""),$loadingBar.css("opacity",""),$logo.css("margin",""),that.initPerpective()},1500)},initPerpective:function(){$("#about_bingo").perpectiveMouse({selectors:[".draw"],maxRange:100,timeStep:25})},scrollPersective:function(){var eles=$.scrollAt(this._pptSelectors,10);if("top"!==eles[0])for(var i in eles)eles[i].trigger("ppt")},elePPT:function(box){var diffScroll=$(window).scrollTop()-(this.lastScroll||0),$eles=box.find(".ppt");$eles.each(function(){var e=$(this),t=parseFloat(e.css("top")),base=parseFloat(e.data("perpective-scroll"));e.css("top",t+diffScroll*base)})}},$(function(){var bingo=new Bingo;bingo.init()});;var Preload=function(options){this.fileArr=options.fileArr||[],this.completeCB=options.loadComplete,this.loadedCB=options.oneLoaded,this.init()};Preload.prototype={defaultOpt:{fileArr:[],completeCB:function(){}},percent:0,numLoaded:0,num:0,init:function(){this.num=this.fileArr.length,0!==this.num&&this.request()},request:function(){for(var files=this.fileArr;files.length>0;){var f=files.pop();this.loadOne(f)}},loadOne:function(file){var img=new Image,that=this,numTotal=this.num,staticURI=BINGO929?BINGO929.staticURI||"":"";file=staticURI+file,img.onload=function(){var numLoaded=that.numLoaded+=1;that.percent=parseInt(numLoaded/numTotal*100),that.loadedCB(file),numLoaded===that.num&&that.complete()},img.onerror=function(){console.log('============================Load file error!src="'+file+'"')},img.src=file},complete:function(){}};;$.fn.extend({perpectiveMouse:function(){function init(){lastMousePos={x:$container.width()/2,y:$container.height()/2},$elements=getEles(),$elements&&($container.on("mousemove",function(e){movingProceed(e)}),$container.on("mouseenter",function(){}),$container.on("mouseleave",function(){}),$elements.on("move",function(){elmMove.call(this)}))}function elmMove(){var $e=$(this),elmDetail=[$e,$e.data("posLeft"),$e.data("posTop")];movingQueue.push(elmDetail),movingQueue.length>1||movingStep()}function movingStep(){if(movingQueue.length){var elmDetail=movingQueue.shift();elmDetail[0].css({left:elmDetail[1],top:elmDetail[2]}),arguments.callee()}}function getEles(){for(var $elms,selectors=set.selectors,s="";selectors.length;){s=selectors.pop();var $e=$container.find(s);$e&&($elms=$elms?$elms.add($e):$e)}return $elms.each(function(){var $e=$(this);$e.data("maxRange",Number($e.data("perpective-mouse"))*set.maxRange),$e.data("posLeft",parseFloat($e.css("left"))),$e.data("posTop",parseFloat($e.css("top")))}),$elms}function movingProceed(e){var targetPos={x:e.offsetX||e.pageX-$container.offset().left,y:e.offsetY||e.pageY-$container.offset().top},diffPer={perX:(targetPos.x-lastMousePos.x)/containerWidth,perY:(targetPos.y-lastMousePos.y)/containerHeight};$elements.each(function(){var $e=$(this),l=$e.data("posLeft"),t=$e.data("posTop"),maxRange=$e.data("maxRange"),moveX=diffPer.perX*maxRange,moveY=diffPer.perY*maxRange;$e.data("posTop",t+moveY),$e.data("posLeft",l+moveX)}),$elements.trigger("move",diffPer),lastMousePos=targetPos}var $elements,set="object"==typeof arguments[0]?arguments[0]:{},defaultSet={selectors:[],maxRange:500,timeStep:25},$container=this,containerWidth=this.width(),containerHeight=this.height(),lastMousePos={x:0,y:0},movingQueue=[];set=$.extend(defaultSet,set);set.timeStep;init()}});;/**
 * 获取当前滚动到哪个元素了
 * 返回值 ：在可见区域内的JQ对象数组集合，若可见区域在页面顶部或底部且没有取到元素，则返回["top"]或["bottom"]
 * @param "selector"[String] : 需要定位的元素选择器
 * @param "minHeight"[Number] : 元素的最小可见高度(及看到一定高度以上的元素才算)
 * @author 彬Go
 **/
jQuery.extend({
	scrollAt : function(selector, minHeight) {
		if (!selector) return;
		
		var $ = jQuery;
		var eItems = $(selector);						//获取匹配元素集		
		var winHeight = $(window).height();				//窗口高度
		var scrollTop = $(window).scrollTop();			//获取当前页面滚动高度
		var scrollBottom = scrollTop + winHeight;		//获取当前窗口底部在页面中的坐标
		var itemPos = [];								//用来存储所有匹配元素的坐标高度
		var itemsInScreen = [];							//在可是区域内的元素
		var minHeight = minHeight ? minHeight : 200;	//最小可见高度,可传参，默认200px

		//如果没取到相应元素，返回空数组
		if (eItems.length === 0) {
			return [];
		}

		//获取所有匹配元素坐标并存入数组
		eItems.each(function() {
			var top = $(this).offset().top;		//元素顶部top坐标
			var h = $(this).height();			//元素高度

			//将元素相关数据存入数组
			itemPos.push({
				top: top,			//顶部top坐标
				bottom: top + h,	//底部top坐标
				height: h 			//高度
			});
		});
		
		//遍历数组，获取在可见区域内的元素
		for (var i = 0, len = itemPos.length; i < len; i++) {
			if ((scrollBottom - itemPos[i].top > minHeight && itemPos[i].top >= scrollTop)
				|| (itemPos[i].bottom - scrollTop > minHeight && itemPos[i].bottom <= scrollBottom)
				|| (itemPos[i].top <= scrollTop && itemPos[i].bottom >= scrollBottom)) {
				itemsInScreen.push($(eItems[i]));
			}
		}
		
		//如果在页面顶部或底部没有可见元素的话，返回相应标记
		if (itemsInScreen.length === 0) {
			if (itemPos[0].top >= scrollBottom - minHeight) {
				itemsInScreen = ['top'];
			} else if (itemPos[itemPos.length - 1].bottom <= scrollTop + minHeight) {
				itemsInScreen = ['bottom'];
			}
		}

		return itemsInScreen;
	}
});