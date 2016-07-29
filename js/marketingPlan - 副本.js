function AlexJsPlumb(obj){this.init(obj);}
AlexJsPlumb.prototype = {
	init : function(){
		//左侧菜单点击状态
		this.mouseDownState = false;
		//记录点击状态li Icon的位置
		this.leftIconOffset = false;
		//记录点击li Icon的鼠标位置
		this.mousedownClient = false;
		//jsPlumbBox的边界范围
		this.jsPlumbBoxBorders = {};

		//读取jsPlumbBox的边界值
		this.readJsPlumbBoxBorders();
		//初始化左侧按钮菜单
		this.installLeftIcon();
		//绑定左侧菜单拖动事件
		this.addLeftIconEvent();
	},
	readJsPlumbBoxBorders : function(){//读取jsPlumbBox的边界值
		var jsPlumbBox = $("#jsPlumbBox");
		var jsPlumbBoxOffset =  $(jsPlumbBox).offset();
		this.jsPlumbBoxBorders = {
			top: jsPlumbBoxOffset.top,
			right: jsPlumbBoxOffset.left + $(jsPlumbBox).width(),
			bottom: jsPlumbBoxOffset.top + $(jsPlumbBox).height(),
			left: jsPlumbBoxOffset.left
		}
	},
	installLeftIcon : function(){//初始化左侧按钮菜单
		for(var i=0; i<marketingPlanIconJson.length; i++){
			var obj = {}
			obj.title = marketingPlanIconJson[i].title;
			obj.iconList = "";

			for(var j=0; j<marketingPlanIconJson[i].marketingFun.length; j++){
				var obj_li = {}
				obj_li.title = marketingPlanIconJson[i].marketingFun[j].title;
				obj_li.class = "addJsPlumb " + marketingPlanIconJson[i].class + " " + marketingPlanIconJson[i].marketingFun[j].class;
				obj_li.type = marketingPlanIconJson[i].marketingFun[j].type;
				obj.iconList += this.substitute(this.marketingPlanIconTemplate_Li,obj_li)
			}

			$("#marketingPlanIconBox").append(this.substitute(this.marketingPlanIconTemplate_Ul,obj));
		}
		this.addLeftIconCopy();
	},
	addLeftIconCopy : function(){//添加用于拖动的li Copy
		$("body").prepend("<div class=\"leftIconCopy\" id=\"leftIconCopy\"></div>");
	},
	addLeftIconEvent : function(){//绑定左侧菜单拖动事件
		var _slef = this;
		$(".addJsPlumb").mousedown(function(e){
			e.preventDefault();
			e.stopPropagation();
			_slef.mouseDownState = true;

			//在原li Icon处生成外观一样的可拖动Copy Icon
			var iconOffset = _slef.leftIconOffset = $(this).offset();
			var top = "top:" + iconOffset.top + "px; ";
			var left = "left:" + iconOffset.left + "px; ";
			_slef.mousedownClient = {
				clientX: e.clientX,
				clientY: e.clientY
			}
			var html = "<div id=\"iconMove\" class=\"" + $(this).attr("class") + "\" style=\"" + top+left + "\">"+ $(this).text(); +"</div>";
			$('#leftIconCopy').html(html);
		})
		$(window).mousemove(function(e){
			e.preventDefault();
			e.stopPropagation();

			if(_slef.mouseDownState){
				//Icon跟随鼠标移动
				var top = e.clientY - (_slef.mousedownClient.clientY - _slef.leftIconOffset.top);
				var left = e.clientX - (_slef.mousedownClient.clientX - _slef.leftIconOffset.left);
				$("#iconMove").css({left: left+"px", top: top+"px"});
			}
		})
		$(window).mouseup(function(e){
			e.preventDefault();
			e.stopPropagation();

			if(_slef.mouseDownState){
				//拖动Icon边界碰撞检测
				if(e.clientX > _slef.jsPlumbBoxBorders.left && e.clientX < _slef.jsPlumbBoxBorders.right){
					if(e.clientY > _slef.jsPlumbBoxBorders.top && e.clientY < _slef.jsPlumbBoxBorders.bottom){
						console.log(e.clientX, e.clientY);
					}
				}
			}

			_slef.mouseDownState = false;
			_slef.leftIconOffset = false;
			_slef.mousedownClient = false;
			$('#leftIconCopy').html("");
		})
	},
	substitute : function(str,object){//模板内容替换函数
        return str.replace(/\\?\{([^}]+)\}/g, function(match, name){
            if (match.charAt(0) == '\\') return match.slice(1);
            return (object[name] != undefined) ? object[name] : '';
        });
    },
    /*左侧菜单模版*/
    marketingPlanIconTemplate_Ul : [
        "<ul class=\"iconBox\">",
        	"<li class=\"groupTitle\"><strong>{title}</strong>",
        		"<ul>{iconList}</ul>",
        	"</li>",
        "</ul>",
    ].join(""),
    marketingPlanIconTemplate_Li : [
        "<li class=\"{class}\" data-type=\"{type}\">{title}</li>",
    ].join("")
}