function AlexJsPlumb(obj){this.init(obj);}
AlexJsPlumb.prototype = {
	init : function(obj){
		//左侧菜单点击状态
		this.mouseDownState = false;
		//记录点击状态li Icon的位置
		this.leftIconOffset = false;
		//记录点击li Icon的鼠标位置
		this.mousedownClient = false;
		//jsPlumbBox的边界范围
		this.jsPlumbBoxBorders = {};
		//Icon类型对应Class查询数组
		this.iconTypeToClass = new Array();

		/////////////*  jsPlumb配置 Start  *////////////
		//jsPlumbJson数据
		this.jsPlumbJson = {};
		//获取任务ID
		this.taskID = obj.taskID;
		//获取用户ID
		this.userID = obj.userID;
		//获取jsPlumb初始化Json数据的API
		this.jsPlumbJsonApi = obj.jsPlumbJsonApi;
		//jsPlumbBox容器
		this.jsPlumbBox = $("#jsPlumbBox");
		//连接线数组（用于删除连接线）
		this.connectArray = new Array();
		//端点数组（用于删除端点）
		this.endpointSourceArray = new Array();
		this.targetSourceArray = new Array();
		//存放初始化jsPlumb实例
		this.instanceArray = new Array();
		
		// 连接线样式配置
		var connectorPaintStyle = {
			    lineWidth: 1,
			    strokeStyle: "#7f7f7f",
			    joinstyle: "round",
			    outlineColor: "white",
			    outlineWidth: 2
			},
			connectorHoverStyle = {
		        lineWidth: 1,
		        strokeStyle: "#0190d4",
		        outlineWidth: 2,
		        outlineColor: "white"
		    },
		    endpointHoverStyle = {
		        fillStyle: "#0190d4",
		        strokeStyle: "#0190d4"
		    }
		//出发端点配置
		this.targetEndpoint = {
		    endpoint: "Dot",
		    paintStyle: { fillStyle: "#0190d4", radius: 6 },
		    hoverPaintStyle: endpointHoverStyle,
		    maxConnections: -1,
		    dropOptions: { hoverClass: "hover", activeClass: "active" },
		    isTarget: true,
		    overlays: [
		        [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
		    ]
		}
		//到达端点配置
		this.sourceEndpoint = {
		    endpoint: "Dot",
		    paintStyle: {
		        strokeStyle: "#0190d4",
		        fillStyle: "transparent",
		        radius: 5,
		        lineWidth: 2
		    },
		    isSource: true,
		    connector: [ "Flowchart", { stub: [10, 10], gap: 8, cornerRadius: 3, alwaysRespectStubs: true } ],
		    connectorStyle: connectorPaintStyle,
		    hoverPaintStyle: endpointHoverStyle,
		    maxConnections: -1,
		    connectorHoverStyle: connectorHoverStyle,
		    dragOptions: {},
		    overlays: [
		        [ "Label", {
		            location: [0.5, 1.5],
		            label: "Drag",
		            cssClass: "endpointSourceLabel",
		            visible:false
		        } ]
		    ]
		}
		/////////////*  jsPlumb配置 End  *////////////

		//初始化Icon类型对应Class查询数组
		this.iconTypeToClassFun();
		//读取jsPlumbBox的边界值
		this.readJsPlumbBoxBorders();
		//初始化左侧按钮菜单
		this.installLeftIcon();
		//绑定左侧菜单拖动事件
		this.addLeftIconEvent();
		//初始化jsPlumb实例
		this.jsPlumbInit();
	},
	readJsPlumbBoxBorders : function(){//读取jsPlumbBox的边界值
		var jsPlumbBoxOffset =  $(this.jsPlumbBox).offset();
		this.jsPlumbBoxBorders = {
			top: jsPlumbBoxOffset.top,
			right: jsPlumbBoxOffset.left + $(this.jsPlumbBox).width(),
			bottom: jsPlumbBoxOffset.top + $(this.jsPlumbBox).height(),
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
			var html = "<div id=\"iconMove\" class=\"" + $(this).attr("class") + "\" style=\"" + top+left + "\" data-type=\"" + $(this).attr("data-type") + "\">"+ $(this).text(); +"</div>";
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
						//_slef.jsPlumbInit();
						var clientObj = {
							clientX: e.clientX - $(this.jsPlumbBox).offset().left - 25,
							clientY: e.clientY - $(this.jsPlumbBox).offset().top - 25,
							type: $("#iconMove").attr("data-type"),
							text: $("#iconMove").text()
						}
						_slef.addNewJsPlumbIcon(clientObj);
					}
				}
			}

			_slef.mouseDownState = false;
			_slef.leftIconOffset = false;
			_slef.mousedownClient = false;
			$('#leftIconCopy').html("");
		})
	},
	jsPlumbInit: function(){
		this.removeAllJsPlumb();
		var _slef = this;
		//获取初始化Json数据
		$.ajax({
			type: "POST",
			url: this.jsPlumbJsonApi,
			data: {'taskID':this.taskID, 'userID':this.userID},
			dataType: "json",
			timeout: 20000,//20秒
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('ajax通信出错');
			}, 
			success: function(msg){
				if(msg.result){
					_slef.jsPlumbJson = msg.list;
					_slef.jsPlumbInstance();
				}else{
					console.log("API 返回错误信息！");
				}
			}
		});
	},
	jsPlumbInstance: function(){
		if(this.instanceArray.length > 0){
			this.instanceArray[this.instanceArray.length-1] == null;
		}
		//初始化jsPlumb实例
		this.instanceArray.push(jsPlumb.getInstance({
		    DragOptions: { cursor: 'pointer', zIndex: 2000 },
		    ConnectionOverlays: [//箭头样式配置
		        [ "Arrow", {
		        	width:8,
		        	length:8,
		            location: 1,
		            visible:true,
		            id:"ARROW",
		            events:{
		                click:function() {
		                    alert("you clicked on the arrow overlay");
		                }
		            }
		        } ],
		    ],
		    Container: "jsPlumbBox"
		}))
		var instance = this.instanceArray[this.instanceArray.length-1];

		//添加Icon
		this.endpointSourceArray = [];
		this.targetSourceArray = [];
		for(var i=0; i<this.jsPlumbJson.length; i++){
			this.addNewChart(instance, i);
		}

		//添加连接线
		this.connectArray = [];
		for(var i=0; i<this.jsPlumbJson.length; i++){
			if(this.jsPlumbJson[i].targetId){
				console.log(this.jsPlumbJson[i].ID+"RightMiddle", this.jsPlumbJson[i].targetId+"LeftMiddle");
				this.connectArray[i] = instance.connect({uuids: [this.jsPlumbJson[i].ID+"RightMiddle", this.jsPlumbJson[i].targetId+"LeftMiddle"], editable: true});
			}
		}
		//添加JsPlumb绑定事件
		this.addJsPlumbBind(instance);
	},
	addNewJsPlumbIcon : function(clientObj){
		//添加新Icon
		this.addNewChart(this.instanceArray[this.instanceArray.length-1], this.jsPlumbJson.length, clientObj);
		//删除绑定事件
		this.instanceArray[this.instanceArray.length-1].unbind();
		//添加JsPlumb绑定事件
		this.addJsPlumbBind(this.instanceArray[this.instanceArray.length-1]);
	},
	addJsPlumbBind : function(instance){//添加JsPlumb绑定事件
		//连接线点击事件绑定
		instance.bind("click", function (conn, originalEvent) {
		    console.log("click");
		});

		//监听新连接事件绑定
		instance.bind("connection", function (connInfo, originalEvent) {
		    //init(connInfo.connection);
			console.log("connection");
		});

		//出发端点触发
		instance.bind("connectionDrag", function (connection) {
			console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
		});

		//连接断点完成触发
		instance.bind("connectionDragStop", function (connection) {
			console.log("connection " + connection.id + " was dragged");
		});

		instance.bind("connectionMoved", function (params) {
			console.log("connection " + params.connection.id + " was moved");
		});
	},
	addNewChart: function (instance, i, clientObj){
		var _slef = this;
		if(i < this.jsPlumbJson.length){//原初始化数据
			var jsPlumbObj = this.jsPlumbJson[i];
		}else{//新加Icon
			var jsPlumbObj = {
				"ID" : "jsPlumb_"+new Date().getTime(),
				"taskID" : false,
				"type" : clientObj.type,
				"text" : clientObj.text,
				"targetId" : false,
				"left": clientObj.clientX + $(window).scrollLeft(),
				"top": clientObj.clientY + $(window).scrollTop()
			}
			this.jsPlumbJson.push(jsPlumbObj);
		}
		var chartID = jsPlumbObj.ID;
		var name = chartID;
	    //console.log(name);

	    //在div内append元素
	    if(!jsPlumbObj.taskID){
	    	var taskIDClass = "taskIdNo ";
	    }else{
	    	var taskIDClass = "taskIdOk ";
	    }
	    $(this.jsPlumbBox).append("<div class=\"jsPlumbIcon " + taskIDClass + this.iconTypeToClass[jsPlumbObj.type] + " jtk-node"+jsPlumbObj.name+" new-"+jsPlumbObj.name+"\" id=\""+chartID+"\" data-type=\"" + jsPlumbObj.type + "\" data-taskID=\"" + jsPlumbObj.taskID + "\"><h5>" + jsPlumbObj.text + "</h5></div>");
	    $("#"+chartID).css("left",jsPlumbObj.left).css("top",jsPlumbObj.top).css("position","absolute").css("margin","0px");

	    instance.draggable(chartID);
	    instance.batch(function () {
	        _slef._addEndpoints(instance, chartID, ["RightMiddle"], ["LeftMiddle"], i);
	    })
	},
	//添加jsPlumb块
	_addEndpoints : function (instance, toId, sourceAnchors, targetAnchors, m) {
	    for (var i = 0; i < sourceAnchors.length; i++) {
	        var sourceUUID = toId + sourceAnchors[i];
	        this.endpointSourceArray[m] = instance.addEndpoint(toId, this.sourceEndpoint, {
	            anchor: sourceAnchors[i], uuid: sourceUUID
	        });
	    }

	    for (var j = 0; j < targetAnchors.length; j++) {
	        var targetUUID = toId + targetAnchors[j];
	        this.targetSourceArray[m] = instance.addEndpoint(toId, this.targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
	    }
	},
	//删除jsPlumb实例
	removeAllJsPlumb : function(){
		if(this.instanceArray.length > 0){
			//删除连接线
			for(var i=0; i<this.connectArray.length; i++){
				jsPlumb.detach(this.connectArray[i]);
			}
			//删除端点
			for(var i=0; i<this.endpointSourceArray.length; i++){
				jsPlumb.deleteEndpoint(this.endpointSourceArray[i]);
				jsPlumb.deleteEndpoint(this.targetSourceArray[i]);
			}
			//删除绑定事件
			this.instanceArray[this.instanceArray.length-1].unbind();
			$(this.jsPlumbBox).html("");
		}
	},
	//初始化Icon类型对应Class查询数组
	iconTypeToClassFun : function(){
		for(var i=0; i<marketingPlanIconJson.length; i++){
			for(var j=0; j<marketingPlanIconJson[i].marketingFun.length; j++){
				this.iconTypeToClass[marketingPlanIconJson[i].marketingFun[j].type] = marketingPlanIconJson[i].class + " " + marketingPlanIconJson[i].marketingFun[j].class;
			}
		}
	},
	//模板内容替换函数
	substitute : function(str,object){
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