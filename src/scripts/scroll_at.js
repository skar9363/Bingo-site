/**
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