function AlexJsPlumb(obj){this.init(obj);}
AlexJsPlumb.prototype = {
	init : function(obj){
		//左侧菜单点击状态
		this.mouseDownState = false;
		//节点Icon点击状态
		this.iconMouseDownState = false;
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
		this.jsPlumbJson = new Array();
		//获取任务ID
		this.taskID = obj.taskID;
		//获取用户ID
		this.userID = obj.userID;
		//获取jsPlumb初始化Json数据的API
		this.jsPlumbJsonApi = obj.jsPlumbJsonApi;
		//添加新Icon（节点）的API
		this.addIconApi = obj.addIconApi;
		//删除Icon（节点）的API
		this.delIconApi = obj.delIconApi;
		//编辑Icon（节点）的API
		this.editIconApi = obj.editIconApi;
		//jsPlumbBox容器
		this.jsPlumbBox = $("#jsPlumbBox");
		//连接线数组（用于删除连接线）
		this.connectArray = new Array();
		//端点数组（用于删除端点）
		this.endpointSourceArray = new Array();
		this.targetSourceArray = new Array();
		//存放初始化jsPlumb实例
		this.instanceArray = new Array();
		//记录节点Icon对应的连接端点数组编号
		this.iconSourceArray = new Array();
		
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
	addLeftIconCopy : function(){
		//添加用于拖动的li Copy
		$("body").prepend("<div class=\"leftIconCopy\" id=\"leftIconCopy\"></div>");
		//添加节点Icon右键删除菜单
		$("body").prepend("<div class=\"nodeIconDelMenuBox\" id=\"nodeIconDelMenuBox\"><div class=\"nodeIconDelMenu\" id=\"nodeIconDelMenu\"><div class=\"delIcon\">删除</div></div></div>");
		$("#nodeIconDelMenu").bind('contextmenu', function(e) {
			return false;
	    });
	    this.delIconBind();
	},
	//delIcon 右键删除节点Icon事件绑定
	delIconBind : function(){
		var _slef = this;
		$("#nodeIconDelMenu .delIcon").click(function(){
			/*
			 * 节点Icon删除流程说明：
			 * 1，向服务器提交删除节点ID
			 * 2，服务器反馈成功信息后，删除jsPlumbJson数组中对应数据
			 * 3，删除页面Dom相关元素
			 */
			$.ajax({
				type: "POST",
				url: _slef.delIconApi+"?timeStamp=" + new Date().getTime(),
				data: {
						"taskID": _slef.taskID,
						"userID": _slef.userID,
						"icon_taskID": $(this).attr("data-taskid")
					},
				dataType: "json",
				//async: false,
				timeout: 20000,//20秒
				success: function(msg){
					if(msg.result){
						//删除jsPlumbJson数组中对应数据
						for(var i=0; i<_slef.jsPlumbJson.length; i++){
							if(_slef.jsPlumbJson[i].ID == $(this).attr("data-id")){
								_slef.jsPlumbJson.splice(i,1);
								break;
							}
						}
						//console.log(_slef.jsPlumbJson);
						//删除页面Dom相关元素
						_slef.removeJsPlumbIcon($(this).attr("data-id"));
						console.log("删除节点:",$(this).attr("data-id"));
					}else{
						console.log("节点删除失败，API 返回错误信息！");
						alert("节点删除失败，API 返回错误信息！");
					}
				}.bind(this),
				error: function(XMLHttpRequest, textStatus, errorThrown){
					alert('ajax通信出错');
				}
			});
			
		})
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
						//console.log(e.clientX, e.clientY);
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

			$("#nodeIconDelMenu").hide();
		})
	},
	//Ajax获取初始化数据后初始化jsPlumb
	jsPlumbInit: function(){
		this.removeAllJsPlumb();
		var _slef = this;
		//获取初始化Json数据
		$.ajax({
			type: "POST",
			url: this.jsPlumbJsonApi+"?timeStamp=" + new Date().getTime(),
			data: {
					taskID: this.taskID,
					userID: this.userID
				},
			dataType: "json",
			//async: false,
			timeout: 20000,//20秒
			success: function(msg){
				if(msg.result){
					_slef.jsPlumbJson = msg.list;
					//console.log("初始化数据:",_slef.jsPlumbJson);
					_slef.jsPlumbInstance();
				}else{
					console.log("初始化加载失败，API 返回错误信息！");
					alert("初始化加载失败，API 返回错误信息！");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('ajax通信出错');
			}
		});
	},
	//初始化jsPlumb
	jsPlumbInstance: function(){
		if(this.instanceArray.length > 0){
			this.instanceArray[this.instanceArray.length-1] == null;
		}
		//初始化jsPlumb实例
		this.instanceArray.push(jsPlumb.getInstance({
		    DragOptions: { cursor: 'pointer', zIndex: 200 },
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
			//添加节点Icon事件绑定
			this.addJsPlumbIconBind($("#"+this.jsPlumbJson[i].ID));
		}

		//添加连接线
		var num = 0;
		this.connectArray = [];
		for(var i=0; i<this.jsPlumbJson.length; i++){
			if(this.jsPlumbJson[i].targetId.length > 0){
				for(var j=0; j<this.jsPlumbJson[i].targetId.length; j++){
					//console.log(this.jsPlumbJson[i].targetId.ID+"RightMiddle", this.jsPlumbJson[i].targetId+"LeftMiddle");
					this.connectArray[num] = instance.connect({uuids: [this.jsPlumbJson[i].ID+"RightMiddle", this.jsPlumbJson[i].targetId[j]+"LeftMiddle"], editable: true});
					num++;
				}
			}
		}
		//添加JsPlumb绑定事件
		this.addJsPlumbBind(instance);
	},
	addNewJsPlumbIcon : function(clientObj){//添加新sPlumb Icon
		var _slef = this;
		var num = this.jsPlumbJson.length
		//添加新Icon
		this.addNewChart(this.instanceArray[this.instanceArray.length-1], num, clientObj);
		//这里的num，经过addNewChart之后数字会加1，所以下面的num不用-1了
		//删除原绑定事件
		this.instanceArray[this.instanceArray.length-1].unbind();
		//添加JsPlumb绑定事件
		this.addJsPlumbBind(this.instanceArray[this.instanceArray.length-1]);
		//添加节点Icon事件绑定
		this.addJsPlumbIconBind($("#"+this.jsPlumbJson[num].ID));
		/*
		 * 添加新Icon后，向API接口添加新Icon数据
		 * API获取新节点Icon数据后，返回taskID（此节点的任务ID）
		 * 将taskID更新至jsPlumbJson数组及页面Dom元素上
		 */
		$.ajax({
			type: "POST",
			url: this.addIconApi+"?timeStamp=" + new Date().getTime(),
			data: {
				"taskID": this.taskID,//在线营销任务ID
				"userID": this.userID,//用户ID
				"icon_ID" : this.jsPlumbJson[num].ID,//节点IconID
				"icon_type" : this.jsPlumbJson[num].type,
				"icon_text" : this.jsPlumbJson[num].text,
				"icon_left": this.jsPlumbJson[num].left,
				"icon_top": this.jsPlumbJson[num].top
			},
			dataType: "json",
			//async: false,
			timeout: 20000,//20秒
			success: function(msg){
				if(msg.result){
					_slef.jsPlumbJson[num].taskID = msg.icon.taskID;
					$("#"+_slef.jsPlumbJson[num].ID).attr({"data-taskid":_slef.jsPlumbJson[num].taskID});
					console.log("新增节点:", _slef.jsPlumbJson[num].ID, "taskID:", _slef.jsPlumbJson[num].taskID);
				}else{
					console.log("添加新节点失败，API 返回错误信息！");
					alert("添加新节点失败，API 返回错误信息！");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('ajax通信出错');
			}
		});
	},
	//节点Icon 点击事件绑定
	addJsPlumbIconBind : function(ID){
		var _slef = this;
		//绑定节点Icon双击事件
		$(ID).dblclick(function(e){
			e.preventDefault();
			e.stopPropagation();
			//console.log($(this).attr("data-type"),$(this).attr("data-taskid"));
			if($(this).attr("data-type") == "start"){
				return false;
			}
			$("#myModalBody").html("");
			$("#myModal").modal('show');
			$("#myModalLabel").html("节点编辑: " + $(this).text() + " <span style=\"font-size:12px;color:#d9d9d9;\">(" + _slef.iconTypeToClass[$(this).attr("data-type")].title + ")</span>");
			var obj = {};
			obj.url = _slef.iconTypeToClass[$(this).attr("data-type")].popUrl + "?taskID=" + _slef.taskID + "&userID=" + _slef.userID + "&icon_taskID=" + $(this).attr("data-taskid") + "&timeStamp=" + new Date().getTime();
			$("#myModalBody").html(_slef.substitute(_slef.iframeBox,obj));
			//$("#myModalBody").html(_slef.substitute(marketingPlanPopHtml[$(this).attr("data-type")].html,obj));
		})
		$(ID).mousedown(function(e){
			_slef.mousedownClient = {
				"mousedownX": e.clientX - $(this).offset().left,
				"mousedownY": e.clientY - $(this).offset().top,
				"left" : $(this).css("left"),
				"top" : $(this).css("top")
			}
			$(".jsPlumbBox > .jsPlumbIcon").css({"z-index":20});
			$(this).css({"z-index":21});
			_slef.iconMouseDownState = true;
			//$(this).css({cursor: "move"});
		})
		$(ID).mouseup(function(e){
			if(e.which == 1) {//鼠标左键事件，用于捕捉Icon位移数据
				var num;
				for(var i=0; i<_slef.jsPlumbJson.length; i++) {
					if($(this).attr("id") == _slef.jsPlumbJson[i].ID){
						num = i;
						break;
					}
				}
				var data = {
					"taskID": _slef.taskID,//在线营销任务ID
					"userID": _slef.userID,//用户ID
					"icon_taskID" : _slef.jsPlumbJson[num].taskID,
					"icon_ID": _slef.jsPlumbJson[num].ID,//节点IconID
					"icon_left" : e.clientX - $(_slef.jsPlumbBox).offset().left - _slef.mousedownClient.mousedownX,
					"icon_top" : e.clientY - $(_slef.jsPlumbBox).offset().top - _slef.mousedownClient.mousedownY
				}
				if(_slef.mousedownClient.left == $(this).css("left") && _slef.mousedownClient.top == $(this).css("top")){
					//节点Icon没有位移不做处理
				}else{
					if(!isNaN(data.icon_left)){
						//自动对齐网格
						data.icon_left = Math.round(Math.round(data.icon_left)/10)*10;
						data.icon_top = Math.round(Math.round(data.icon_top)/10)*10;
						$(this).css({left:data.icon_left+"px",top:data.icon_top+"px"});
						//console.log(data.icon_left,data.icon_top);
						_slef.editIconAjax(data,num);
					}
				}
				_slef.mousedownClient = false;
				$(this).css({cursor: "pointer"});
				_slef.iconMouseDownState = false;
			}else if(e.which == 3) {//e.which = 3 为鼠标右键事件（用于打开删除按钮）
				e.preventDefault();
				e.stopPropagation();
				$("#nodeIconDelMenu").show();
				$("#nodeIconDelMenu").css({left:Math.round(e.clientX + $(window).scrollLeft())+"px", top:Math.round(e.clientY + $(window).scrollTop())+"px"});
				$("#nodeIconDelMenu .delIcon").attr({"data-id":$(this).attr("id"), "data-taskid":$(this).attr("data-taskid")});
			}
		})
		$(ID).mousemove(function(){
			if(_slef.iconMouseDownState){
				$(this).css({cursor: "move"});
			}
		})
		$(ID).bind('contextmenu', function(e) {
	      return false;
	    });
	},
	addJsPlumbBind : function(instance){//添加JsPlumb绑定事件
		var _slef = this;
		//连接线点击事件绑定
		/*instance.bind("click", function (conn, originalEvent) {
		    console.log("click");
		});*/

		//连接线双击事件绑定
		instance.bind("dblclick", function (conn, e) {
			e.preventDefault();
			e.stopPropagation();

		    jsPlumb.detach(conn);
		    //console.log(conn);
		});

		//监听新建连接事件
		instance.bind("connection", function (connInfo, originalEvent) {
			/*
			 * 添加新连接线流程说明：
			 * 1,前台新连接线事件触发后，添加连接线数据至connectArray，用于删除连接线
			 * 2,更新jsPlumbJson中的对应连接线数据
			 * 3,向API提交更新数据
			 */
		    //init(connInfo.connection);
		    //判断是新建连接还是移动端点的连接
			if(connInfo.connection.suspendedElementId == null){
			    var num;
			    //添加对应新连接(用于删除连接)
				_slef.connectArray.push(connInfo.connection);
				//更新新连接线至jsPlumbJson
			    for(var i=0; i<_slef.jsPlumbJson.length; i++){
			    	if(_slef.jsPlumbJson[i].ID == connInfo.connection.sourceId){
			    		_slef.jsPlumbJson[i].targetId.push(connInfo.connection.targetId);
			    		num = i;
			    		break;
			    	}
			    }

			    var data = {
						"taskID":_slef.taskID,//在线营销任务ID
						"userID":_slef.userID,//用户ID
						"icon_taskID": _slef.jsPlumbJson[num].taskID,
						"icon_ID" : _slef.jsPlumbJson[num].ID,//节点IconID
						"icon_targetId" : _slef.jsPlumbJson[num].targetId
					}
			
				_slef.editIconAjax(data,num);
			}
		    //console.log(connInfo.connection);
		});

		//监听连接线移除事件(注意：此监听事件并不监听连接线两头的端点变更)
		instance.bind("connectionDetached", function (conn) {
		    //console.log(conn);
			_slef.delConnection(conn);
		});

		//监听连接线移动端点事件
		instance.bind("connectionMoved", function (conn) {
			//同一端点断开再连接不做处理
			if(conn.connection.suspendedElementId == conn.connection.targetId){
				return false;
			}
			//更新新连接线至jsPlumbJson
			for(var i=0; i<_slef.jsPlumbJson.length; i++){
				if(_slef.jsPlumbJson[i].ID == conn.connection.sourceId){
					for(var j=0; j<_slef.jsPlumbJson[i].targetId.length; j++){
						if(_slef.jsPlumbJson[i].targetId[j] == conn.connection.suspendedElementId){
							_slef.jsPlumbJson[i].targetId.splice(j,1);
							_slef.jsPlumbJson[i].targetId.push(conn.connection.targetId);
							var data = {
									"taskID":_slef.taskID,//在线营销任务ID
									"userID":_slef.userID,//用户ID
									"icon_taskID": _slef.jsPlumbJson[i].taskID,
									"icon_ID" : _slef.jsPlumbJson[i].ID,//节点IconID
									"icon_targetId" : _slef.jsPlumbJson[i].targetId
								}
							_slef.editIconAjax(data,i);
							break;
						}
					}
					break;
				}
			}
		});
	},
	//删除连接线处理
	delConnection : function(conn){
		//console.log(conn);
		//循环查找jsPlumbJson中对应的数据，删除对应数据
		for(var i=0; i<this.jsPlumbJson.length; i++){
			if(conn.sourceId == this.jsPlumbJson[i].ID){
				var num;
				for(var j=0; j<this.jsPlumbJson[i].targetId.length; j++){
					if(this.jsPlumbJson[i].targetId[j] == conn.targetId){
						this.jsPlumbJson[i].targetId.splice(j,1);
						//console.log(this.jsPlumbJson[i]);

						var data = {
								"taskID": this.taskID,//在线营销任务ID
								"userID": this.userID,//用户ID
								"icon_taskID": this.jsPlumbJson[i].taskID,
								"icon_ID": this.jsPlumbJson[i].ID,//节点IconID
								"icon_targetId": this.jsPlumbJson[i].targetId.length > 0 ? this.jsPlumbJson[i].targetId : null
							}
						this.editIconAjax(data,i);
						break;
					}
				}
				break;
			}
		}
	},
	editIconAjax : function(data,num){
		var _slef = this;
		$.ajax({
			type: "POST",
			url: _slef.editIconApi+"?timeStamp=" + new Date().getTime(),
			data: data,
			dataType: "json",
			//async: false,
			timeout: 20000,//20秒
			success: function(msg){
				if(msg.result){
					console.log("更新节点:", _slef.jsPlumbJson[num].ID);
				}else{
					console.log("更新节点失败，API 返回错误信息！");
					alert("更新节点失败，API 返回错误信息！");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('ajax通信出错');
			}
		});
	},
	addNewChart: function (instance, i, clientObj){
		var _slef = this;
		if(i < this.jsPlumbJson.length){//原初始化数据
			var jsPlumbObj = this.jsPlumbJson[i];
		}else{//新加Icon
			var jsPlumbObj = {
				"ID" : "jsPlumb_"+new Date().getTime(),
				"taskID" : null,
				"type" : clientObj.type,
				"text" : clientObj.text,
				"targetId" : [],
				"left": clientObj.clientX + $(window).scrollLeft(),
				"top": clientObj.clientY + $(window).scrollTop()
			}
			jsPlumbObj.left = Math.round(Math.round(jsPlumbObj.left)/10)*10;
			jsPlumbObj.top = Math.round(Math.round(jsPlumbObj.top)/10)*10;

			this.jsPlumbJson.push(jsPlumbObj);
		}
		var chartID = jsPlumbObj.ID;
		var name = chartID;
	    //console.log(name);

	    var obj = {}
	    obj.class = "jsPlumbIcon " + this.iconTypeToClass[jsPlumbObj.type].class + " jtk-node"+jsPlumbObj.name+" new-"+jsPlumbObj.name;
	    obj.id = chartID;
	    obj.dataType = jsPlumbObj.type;
	    obj.dataTaskID = jsPlumbObj.taskID;
	    obj.text = jsPlumbObj.text;

	    $(this.jsPlumbBox).append(this.substitute(this.iconTemplate,obj));
	    $("#"+chartID).css("left",jsPlumbObj.left+"px").css("top",jsPlumbObj.top+"px").css("position","absolute").css("margin","0px");

	    //绑定移动动作
	    instance.draggable(chartID);
	    instance.batch(function () {
	        _slef._addEndpoints(instance, chartID, "RightMiddle", "LeftMiddle", i);
	    })
	},
	//添加jsPlumb块
	_addEndpoints : function (instance, toId, sourceAnchors, targetAnchors, m) {
        var sourceUUID = toId + sourceAnchors;
        this.endpointSourceArray[m] = instance.addEndpoint(toId, this.sourceEndpoint, {
            anchor: sourceAnchors, uuid: sourceUUID
        });

        var targetUUID = toId + targetAnchors;
        this.targetSourceArray[m] = instance.addEndpoint(toId, this.targetEndpoint, { anchor: targetAnchors, uuid: targetUUID });

        this.iconSourceArray[toId] = m;
	},
	//清空画布jsPlumb实例
	removeAllJsPlumb : function(){
		if(this.instanceArray.length > 0){
			//释放事件
			this.instanceArray[this.instanceArray.length-1].unbind();
			for(var i=0; i<this.jsPlumbJson.length; i++){
				$("#"+this.jsPlumbJson[i].ID).unbind();
			}
			//删除所有端点
			this.instanceArray[this.instanceArray.length-1].deleteEveryEndpoint();
			//删除所有Dom
			jsPlumb.empty(this.jsPlumbBox);
		}
	},
	//删除节点Icon
	removeJsPlumbIcon : function(id){
		//释放事件
		$("#"+id).unbind();
		//删除对应的端点
		this.instanceArray[this.instanceArray.length-1].deleteEndpoint(this.endpointSourceArray[this.iconSourceArray[id]]);
		this.instanceArray[this.instanceArray.length-1].deleteEndpoint(this.targetSourceArray[this.iconSourceArray[id]]);
		this.instanceArray[this.instanceArray.length-1].remove(id);
	},
	//初始化Icon类型对应Class查询数组
	iconTypeToClassFun : function(){
		for(var i=0; i<marketingPlanIconJson.length; i++){
			for(var j=0; j<marketingPlanIconJson[i].marketingFun.length; j++){
				this.iconTypeToClass[marketingPlanIconJson[i].marketingFun[j].type] = {
					class : marketingPlanIconJson[i].class + " " + marketingPlanIconJson[i].marketingFun[j].class,
					title : marketingPlanIconJson[i].marketingFun[j].title,
					popUrl : marketingPlanIconJson[i].marketingFun[j].popUrl
				}
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
    ].join(""),
    //节点Icon模版
    iconTemplate : [
    	"<div class=\"{class}\" id=\"{id}\" data-type=\"{dataType}\" data-taskID=\"{dataTaskID}\">",
    		"<h5>{text}</h5>",
    	"</div>"
    ].join(""),
    iframeBox : "<iframe id=\"popIframeBox\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\" src=\"{url}\"></iframe>",
}