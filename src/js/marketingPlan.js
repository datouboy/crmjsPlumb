function AlexJsPlumb(obj){this.init(obj);}
AlexJsPlumb.prototype = {
	init : function(obj){
		//获取任务ID
		this.taskID = obj.taskID;
		//获取用户ID
		this.userID = obj.userID;
		//Ajax提交方式
		this.ajaxType = obj.ajaxType;
		//营销计划大任务编辑状态（状态由初始接口获取），0编辑状态，1预执行中，2预执行通过，3正式发送中，4执行完成
		this.marketingPlanEditState = 0;
		//左侧菜单点击状态
		this.mouseDownState = false;
		//节点Icon点击状态
		this.iconMouseDownState = {
			state:false,//点击状态
			num:null,//点击Icon对应的jsPlumbJson数组序号
			mouseup:true//Icon鼠标mouseup点击状态标记
		};
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
		//获取jsPlumb初始化Json数据的API
		this.jsPlumbJsonApi = obj.jsPlumbJsonApi;
		//添加新Icon（节点）的API
		this.addIconApi = obj.addIconApi;
		//删除Icon（节点）的API
		this.delIconApi = obj.delIconApi;
		//编辑Icon（节点）的API
		this.editIconApi = obj.editIconApi;
		//预执行状态返回Api
		this.marketingPlanTestApi = obj.marketingPlanTestApi;
		//正式执行实时状态返回Api
		this.implementPlanBackApi = obj.implementPlanBackApi;
		//通知正式发送Api
		this.formalSendApi = obj.formalSendApi;
		//通知暂停发送，进入编辑状态Api
		this.stopSendApi = obj.stopSendApi;
		//通知进入预执行状态Api
		this.testSendApi = obj.testSendApi;
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
		//流程测试、发送、重新设计按钮事件绑定
		this.testButtonBind();
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
				obj_li.parentClass = marketingPlanIconJson[i].class;
				if(marketingPlanIconJson[i].marketingFun[j].show){
					obj.iconList += this.substitute(this.marketingPlanIconTemplate_Li,obj_li)
				}
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
			if($(this).attr("data-type") == "Start"){
				_slef.bootstrapAlert("warning", "警告！", "不可以删除开始节点！");
				return false;
			}
			$.ajax({
				type: _slef.ajaxType,
				url: _slef.delIconApi+"?timeStamp=" + new Date().getTime(),
				data: {
						"taskID": _slef.taskID,
						"userID": _slef.userID,
						"icon_taskID": $(this).attr("data-taskid")
					},
				dataType: "json",
				//async: false,
				timeout: 20000,//20秒
				beforeSend: function(){
				},
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
						//console.log("节点删除失败，API 返回错误信息！");
						//alert(msg.error);
						_slef.bootstrapAlert("warning", "警告！", msg.error);
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
			var html = "<div id=\"iconMove\" class=\"" + $(this).attr("class") + "\" style=\"" + top+left + "\" data-type=\"" + $(this).attr("data-type") + "\" data-parent-class=\"" + $(this).attr("data-parent-class") + "\">"+ $(this).text(); +"</div>";
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
			//只检测鼠标左键事件
			if(e.which == 1){
				//判断是否是左侧菜单拖动事件
				if(_slef.mouseDownState){
					//拖动Icon边界碰撞检测
					if(e.clientX > _slef.jsPlumbBoxBorders.left && e.clientX < _slef.jsPlumbBoxBorders.right){
						if(e.clientY > _slef.jsPlumbBoxBorders.top && e.clientY < _slef.jsPlumbBoxBorders.bottom){
							//营销计划不可编辑状态
							if(_slef.marketingPlanEditState !== 0){
								//alert("当前状态不可添加新节点！");
								_slef.bootstrapAlert("warning", "警告！", "当前状态不可添加新节点！");
							}else{
								var clientObj = {
									clientX: e.clientX - $(this.jsPlumbBox).offset().left - 25,
									clientY: e.clientY - $(this.jsPlumbBox).offset().top - 25,
									type: $("#iconMove").attr("data-type"),
									parentClass: $("#iconMove").attr("data-parent-class"),
									text: $("#iconMove").text()
								}
								var haveStart = false;
								for(var i=0; i<_slef.jsPlumbJson.length; i++){
									if(_slef.jsPlumbJson[i].type == "Start"){
										haveStart = true;
									}
								}
								if($("#iconMove").attr("data-type") == "Start" && haveStart){
									if(_slef.jsPlumbJson.length > 0){
										_slef.mouseDownState = false;
										_slef.leftIconOffset = false;
										_slef.mousedownClient = false;
										$('#leftIconCopy').html("");

										console.log("每个计划只允许设置一个开始时间!")
										//alert("每个计划只允许设置一个开始时间!");
										_slef.bootstrapAlert("warning", "警告！", "每个计划只允许设置一个开始时间");
										return false;
									}
								}
								_slef.addNewJsPlumbIcon(clientObj);
							}
						}
					}
				}else if(_slef.iconMouseDownState.state){
					var icon = $("#"+_slef.jsPlumbJson[_slef.iconMouseDownState.num].ID);
					//节点Icon超出编辑区后触发
					if(_slef.iconMouseDownState.mouseup){
						//营销计划不可编辑状态
						if(_slef.marketingPlanEditState !== 0){
							_slef.removeAllJsPlumb();
							_slef.jsPlumbInstance();
						}else{//营销计划可编辑状态
							//拖动Icon节点边界碰撞检测(超出左边线和上边线)
							if(e.clientX < _slef.jsPlumbBoxBorders.left || e.clientY < _slef.jsPlumbBoxBorders.top){
								_slef.removeAllJsPlumb();
								_slef.jsPlumbInstance();
							}else{
								var num = _slef.iconMouseDownState.num;
								var data = {
									"taskID": _slef.taskID,//在线营销任务ID
									"userID": _slef.userID,//用户ID
									"icon_taskID" : _slef.jsPlumbJson[num].taskID,
									"icon_ID": _slef.jsPlumbJson[num].ID,//节点IconID
									"icon_left" : e.clientX - $(_slef.jsPlumbBox).offset().left - _slef.mousedownClient.mousedownX + $(_slef.jsPlumbBox).scrollLeft(),
									"icon_top" : e.clientY - $(_slef.jsPlumbBox).offset().top - _slef.mousedownClient.mousedownY + $(_slef.jsPlumbBox).scrollTop()
								}

								if(!isNaN(data.icon_left)){
									//自动对齐网格
									data.icon_left = Math.round(Math.round(data.icon_left)/10)*10;
									data.icon_top = Math.round(Math.round(data.icon_top)/10)*10;
									//$(icon).css({left:data.icon_left+"px",top:data.icon_top+"px"});
									//console.log(data.icon_left,data.icon_top);
									_slef.jsPlumbJson[num].left = data.icon_left;
									_slef.jsPlumbJson[num].top = data.icon_top;

									_slef.editIconAjax(data,num);
								}
							}
						}
					}
					_slef.mousedownClient = false;
					$(icon).css({cursor: "pointer"});
					_slef.iconMouseDownState.state = false;
					_slef.iconMouseDownState.num = null;
					//console.log($(icon).css("cursor"),"window");

					_slef.iconMouseDownState.mouseup = true;
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
		//this.removeAllJsPlumb();
		var _slef = this;
		//获取初始化Json数据
		$.ajax({
			type: _slef.ajaxType,
			url: this.jsPlumbJsonApi+"?timeStamp=" + new Date().getTime(),
			data: {
					taskID: this.taskID,
					userID: this.userID
				},
			dataType: "json",
			//async: false,
			timeout: 20000,//20秒
			beforeSend: function(){
			},
			success: function(msg){
				if(msg.result){
					_slef.jsPlumbJson = msg.list;
					//如果有超出边界值的Icon,则修正Icon位置
					for(var i=0; i<_slef.jsPlumbJson.length; i++){
						_slef.jsPlumbJson[i].left = _slef.jsPlumbJson[i].left < 0 ? 0 : _slef.jsPlumbJson[i].left;
						_slef.jsPlumbJson[i].top = _slef.jsPlumbJson[i].top < 0 ? 0 : _slef.jsPlumbJson[i].top;
					}
					_slef.marketingPlanEditState = msg.state;
					//console.log("初始化数据:",_slef.jsPlumbJson);
					_slef.showTestButton(_slef.marketingPlanEditState);
					_slef.jsPlumbInstance();
				}else{
					console.log("初始化加载失败，点击确定重新加载数据！");
					alert("初始化加载失败，点击确定重新加载数据！");
					location.reload();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert('ajax通信出错');
			}
		});
	},
	//测试按钮显示状态
	showTestButton : function(State){
		$(".marketingPlanRightBox .marketingBoxTopTitleBox > button").removeClass("menuOff");
		$(".marketingPlanRightBox .marketingBoxTopTitleBox > button").attr({"data-menuoff":"off"});
		//0编辑状态，1预执行中，2预执行通过，3正式发送中
		if(State === 0){
			$("#goTest").attr({"data-menuoff":"open"});
			$("#goStart").addClass("menuOff");
			$("#goRestart").addClass("menuOff");
			$("#marketingPlanStateText").text("编辑状态");
		}else if(State === 1){
			$("#goTest").addClass("menuOff");
			$("#goStart").addClass("menuOff");
			// $("#goRestart").addClass("menuOff");
			$("#goRestart").attr({"data-menuoff":"open"});
			$("#marketingPlanStateText").text("预执行中");
		}else if(State === 2){
			$("#goTest").addClass("menuOff");
			$("#goStart").attr({"data-menuoff":"open"});
			$("#goRestart").attr({"data-menuoff":"open"});
			$("#marketingPlanStateText").text("预执行成功");
		}else if(State === 3){
			$("#goTest").addClass("menuOff");
			$("#goStart").addClass("menuOff");
			$("#goRestart").attr({"data-menuoff":"open"});
			$("#marketingPlanStateText").text("正式发送中");
		}else if(State === 4){
			$("#goTest").addClass("menuOff");
			$("#goStart").addClass("menuOff");
			$("#goRestart").addClass("menuOff");
			$("#marketingPlanStateText").text("执行完成");
		}
	},
	//流程测试、发送、重新设计按钮事件绑定
	testButtonBind : function(){
		var _slef = this;
		//流程测试
		$("#goTest").click(function(){
			if($(this).attr("data-menuoff") == "open"){
				console.log("流程测试");
				$.ajax({
					type: _slef.ajaxType,
					url: _slef.testSendApi+"?timeStamp=" + new Date().getTime(),
					data: {
						"taskID": _slef.taskID,//在线营销任务ID
						"userID": _slef.userID
					},
					dataType: "json",
					//async: false,
					timeout: 20000,//20秒
					beforeSend: function(){
					},
					success: function(msg){
						if(msg.result){
							//设置状态进入预执行状态
							_slef.marketingPlanEditState = 1;
							_slef.showTestButton(_slef.marketingPlanEditState);
							//清空画布
							_slef.removeAllJsPlumb();
							//初始化画布（初始化时会自动执行预执行操作）
							_slef.jsPlumbInstance();
						}else{
							//alert("添加新节点失败，API 返回错误信息！");
							_slef.bootstrapAlert("warning", "警告！", msg.error);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						alert('ajax通信出错');
					}
				});
			}
		});
		//正式发送
		$("#goStart").click(function(){
			if($(this).attr("data-menuoff") == "open"){
				console.log("正式发送");
				$.ajax({
					type: _slef.ajaxType,
					url: _slef.formalSendApi+"?timeStamp=" + new Date().getTime(),
					data: {
						"taskID": _slef.taskID,//在线营销任务ID
						"userID": _slef.userID
					},
					dataType: "json",
					//async: false,
					timeout: 20000,//20秒
					beforeSend: function(){
					},
					success: function(msg){
						if(msg.result){
							_slef.marketingPlanEditState = 3;
							_slef.showTestButton(_slef.marketingPlanEditState);
							//清空画布
							_slef.removeAllJsPlumb();
							//初始化画布（初始化时会自动执行预执行操作）
							_slef.jsPlumbInstance();
						}else{
							//alert("添加新节点失败，API 返回错误信息！");
							_slef.bootstrapAlert("warning", "警告！", msg.error);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						alert('ajax通信出错');
					}
				});
			}
		});
		//重新设计
		$("#goRestart").click(function(){
			if($(this).attr("data-menuoff") == "open"){
				console.log("重新设计");
				$.ajax({
					type: _slef.ajaxType,
					url: _slef.stopSendApi+"?timeStamp=" + new Date().getTime(),
					data: {
						"taskID": _slef.taskID,//在线营销任务ID
						"userID": _slef.userID
					},
					dataType: "json",
					//async: false,
					timeout: 20000,//20秒
					beforeSend: function(){
					},
					success: function(msg){
						if(msg.result){
							_slef.marketingPlanEditState = 0;
							_slef.showTestButton(_slef.marketingPlanEditState);
							//清空画布
							_slef.removeAllJsPlumb();
							//初始化画布（初始化时会自动执行预执行操作）
							_slef.jsPlumbInstance();
						}else{
							//alert("添加新节点失败，API 返回错误信息！");
							_slef.bootstrapAlert("warning", "警告！", msg.error);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						alert('ajax通信出错');
					}
				});
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
			//营销计划大任务编辑状态处于（1）预执行中或（2）预执行通过，则显示预执行结果状态标记（绿色小勾）
			if(this.marketingPlanEditState === 1 || this.marketingPlanEditState === 2){
				//0表示未通过，1表示已通过预执行
				if(this.jsPlumbJson[i].state === 1){
					$("#"+this.jsPlumbJson[i].ID).addClass("runOk");
				}
			}
		}

		//如果营销任务不处于可编辑状态，则增加遮罩，阻挡端点事件
		if(this.marketingPlanEditState !== 0){
			$(this.jsPlumbBox).children(".jsPlumbIcon").children(".mask").addClass("openMask");
		}

		//添加连接线
		var num = 0;
		this.connectArray = [];
		//console.log(this.jsPlumbJson);
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
		//预执行状态检测
		if(this.marketingPlanEditState === 1){
			this.marketingPlanTest();
		}else if(this.marketingPlanEditState === 3){
			this.implementPlanBack();
		}
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
			type: _slef.ajaxType,
			url: this.addIconApi+"?timeStamp=" + new Date().getTime(),
			data: {
				"taskID": this.taskID,//在线营销任务ID
				"userID": this.userID,//用户ID
				"icon_ID" : this.jsPlumbJson[num].ID,//节点IconID
				"icon_type" : this.jsPlumbJson[num].type,
				"icon_parentClass" : this.jsPlumbJson[num].parentClass,
				"icon_text" : this.jsPlumbJson[num].text,
				"icon_left": this.jsPlumbJson[num].left,
				"icon_top": this.jsPlumbJson[num].top
			},
			dataType: "json",
			//async: false,
			timeout: 20000,//20秒
			beforeSend: function(){
			},
			success: function(msg){
				if(msg.result){
					_slef.jsPlumbJson[num].taskID = msg.icon.taskID;
					$("#"+_slef.jsPlumbJson[num].ID).attr({"data-taskid":_slef.jsPlumbJson[num].taskID});
					console.log("新增节点:", _slef.jsPlumbJson[num].ID, "taskID:", _slef.jsPlumbJson[num].taskID);
				}else{
					console.log("添加新节点失败，API 返回错误信息！");
					//alert("添加新节点失败，API 返回错误信息！");
					_slef.jsPlumbJson.pop();
					_slef.removeAllJsPlumb();
					_slef.jsPlumbInstance();
					_slef.bootstrapAlert("warning", "警告！", msg.error);
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
			//开始类型不用弹窗
			/*if($(this).attr("data-type") == "Start"){
				return false;
			}*/
			//console.log($(this).attr("data-type"),$(this).attr("data-taskid"));
			$("#myModalBody").html("");
			$("#myModal").modal('show');
			$("#myModalLabel").html("节点编辑: " + $(this).children("h5").text() + " <span style=\"font-size:12px;color:#d9d9d9;\">(" + _slef.iconTypeToClass[$(this).attr("data-type")].title + ")</span>");
			var obj = {};
			obj.url = _slef.iconTypeToClass[$(this).attr("data-type")].popUrl + "?taskID=" + _slef.taskID + "&icon_ID=" + $(this).attr("id") + "&userID=" + _slef.userID + "&icon_taskID=" + $(this).attr("data-taskid") + "&timeStamp=" + new Date().getTime();
			$("#myModalBody").html(_slef.substitute(_slef.iframeBox,obj));
			//$("#myModalBody").html(_slef.substitute(marketingPlanPopHtml[$(this).attr("data-type")].html,obj));
		})
		$(ID).mousedown(function(e){
			if(e.which == 1){//鼠标左键事件
				_slef.mousedownClient = {
					"mousedownX": e.clientX - $(this).offset().left,
					"mousedownY": e.clientY - $(this).offset().top,
					"left" : $(this).css("left"),
					"top" : $(this).css("top")
				}
				$(_slef.jsPlumbBox).children(".jsPlumbIcon").css({"z-index":20});
				$(this).css({"z-index":21});
				//获取jsPlumbJson中对应的数组序号
				var num;
				for(var i=0; i<_slef.jsPlumbJson.length; i++) {
					if($(this).attr("id") == _slef.jsPlumbJson[i].ID){
						num = i;
						break;
					}
				}
				_slef.iconMouseDownState.state = true;
				_slef.iconMouseDownState.num = num;
				//$(this).css({cursor: "move"});
			}
		})
		$(ID).mouseup(function(e){
			if(e.which == 1) {//鼠标左键事件，用于捕捉Icon位移数据
				//获取jsPlumbJson中对应的数组序号
				var num;
				for(var i=0; i<_slef.jsPlumbJson.length; i++) {
					if($(this).attr("id") == _slef.jsPlumbJson[i].ID){
						num = i;
						break;
					}
				}
				//营销计划任务处于非编辑状态，则不可移动节点Icon
				if(_slef.marketingPlanEditState !== 0){
					$(this).css({left:_slef.jsPlumbJson[num].left+"px",top:_slef.jsPlumbJson[num].top+"px"});
					_slef.iconMouseDownState.mouseup = false;
				}else{
					var data = {
						"taskID": _slef.taskID,//在线营销任务ID
						"userID": _slef.userID,//用户ID
						"icon_taskID" : _slef.jsPlumbJson[num].taskID,
						"icon_ID": _slef.jsPlumbJson[num].ID,//节点IconID
						"icon_left" : e.clientX - $(_slef.jsPlumbBox).offset().left - _slef.mousedownClient.mousedownX + $(_slef.jsPlumbBox).scrollLeft(),
						"icon_top" : e.clientY - $(_slef.jsPlumbBox).offset().top - _slef.mousedownClient.mousedownY + $(_slef.jsPlumbBox).scrollTop()
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
							_slef.jsPlumbJson[num].left = data.icon_left;
							_slef.jsPlumbJson[num].top = data.icon_top;
							_slef.editIconAjax(data,num);
						}
					}
					_slef.mousedownClient = false;
					$(this).css({cursor: "pointer"});
					_slef.iconMouseDownState.state = false;
					_slef.iconMouseDownState.num = null;
					//console.log($(this).css("cursor"),"Icon");
				}
			}else if(e.which == 3) {//e.which = 3 为鼠标右键事件（用于打开删除按钮）
				e.preventDefault();
				e.stopPropagation();
				$("#nodeIconDelMenu").show();
				$("#nodeIconDelMenu").css({left:Math.round(e.clientX + $(window).scrollLeft())+"px", top:Math.round(e.clientY + $(window).scrollTop())+"px"});
				$("#nodeIconDelMenu .delIcon").attr({
					"data-id":$(this).attr("id"),
					"data-taskid":$(this).attr("data-taskid"),
					"data-type":$(this).attr("data-type")
				});
			}
		})
		$(ID).mousemove(function(){
			if(_slef.iconMouseDownState.state){
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
			if(_slef.marketingPlanEditState === 0){
		    	jsPlumb.detach(conn);
		    }
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
		    //判断是否是允许的连接端
		    var sourceType = $("#"+connInfo.connection.sourceId).attr("data-type");
		    var sourceList = _slef.iconTypeToClass[$("#"+connInfo.connection.targetId).attr("data-type")].sourceList;
		    var sourceListOk = false;
		    for (var i=0; i<sourceList.length; i++){
		    	if(sourceType == sourceList[i]){
		    		sourceListOk = true;
		    		break;
		    	}
		    }
		    if(sourceList === true || sourceListOk === true){
		    }else{
		    	console.log("此节点不可以直接连接本节点！");
		    	//alert("此节点不可以直接通过本节点连接！");
		    	_slef.bootstrapAlert("warning", "警告！", "此节点不可以直接连接本节点！");
		    	jsPlumb.detach(connInfo.connection);
		    	return false;
		    }
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
		//console.log("更新节点：jsPlumb_"+num);
		data.icon_ID = typeof(data.icon_ID) == "undefined" ? _slef.jsPlumbJson[num].ID : data.icon_ID;
		data.icon_state = typeof(data.icon_state) == "undefined" ? _slef.jsPlumbJson[num].state : data.icon_state;
		data.icon_left = typeof(data.icon_left) == "undefined" ? _slef.jsPlumbJson[num].left : data.icon_left;
		data.icon_top = typeof(data.icon_top) == "undefined" ? _slef.jsPlumbJson[num].top : data.icon_top;
		data.icon_text = typeof(data.icon_text) == "undefined" ? _slef.jsPlumbJson[num].text : data.icon_text;
		data.icon_targetId = typeof(data.icon_targetId) == "undefined" ? _slef.jsPlumbJson[num].targetId : data.icon_targetId;
		data.icon_taskID = typeof(data.icon_taskID) == "undefined" ? _slef.jsPlumbJson[num].taskID : data.icon_taskID;
		data.icon_type = typeof(data.icon_type) == "undefined" ? _slef.jsPlumbJson[num].type : data.icon_type;
		data.icon_parentClass = typeof(data.icon_parentClass) == "undefined" ? _slef.jsPlumbJson[num].parentClass : data.icon_parentClass;
		data.icon_userNum = typeof(data.icon_userNum) == "undefined" ? _slef.jsPlumbJson[num].userNum : data.icon_userNum;

		if(data.icon_targetId != null){
			data.icon_targetId = JSON.stringify(data.icon_targetId);
		}
		$.ajax({
			type: _slef.ajaxType,
			url: _slef.editIconApi+"?timeStamp=" + new Date().getTime(),
			data: data,
			dataType: "json",
			//async: false,
			timeout: 20000,//20秒
			beforeSend: function(){
			},
			success: function(msg){
				if(msg.result){
					console.log("更新节点:", _slef.jsPlumbJson[num].ID);
				}else{
					console.log("更新节点失败，API 返回错误信息！");
					//alert("更新节点失败，API 返回错误信息！");
					_slef.bootstrapAlert("warning", "警告！", msg.error);
					_slef.removeAllJsPlumb();
					_slef.jsPlumbInit();
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
				"ID" : "jsPlumb_" + new Date().getTime(),
				"parentClass" : clientObj.parentClass,
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
		obj.parentClass = jsPlumbObj.parentClass
	    obj.dataTaskID = jsPlumbObj.taskID;
	    obj.text = jsPlumbObj.text;
	    obj.userNum = jsPlumbObj.userNum;

	    $(this.jsPlumbBox).append(this.substitute(this.iconTemplate,obj));
	    $("#"+chartID).css("left",jsPlumbObj.left+"px").css("top",jsPlumbObj.top+"px").css("position","absolute").css("margin","0px");
	    if(!obj.userNum){
	    	$("#"+chartID + " .userNum").hide();
	    }

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
	//完全初始化页面（Ajax读取初始化数据）
	restartJsPlumbInit : function() {
		this.removeAllJsPlumb();
		this.jsPlumbInit();
	},
	//预执行通讯
	marketingPlanTest : function(){
		var _slef = this;
		function timingFun(){
			$.ajax({
				type: _slef.ajaxType,
				url: _slef.marketingPlanTestApi+"?timeStamp=" + new Date().getTime(),
				data: {
					"taskID": _slef.taskID,
					"userID": _slef.userID,
					},
				dataType: "json",
				//async: false,
				timeout: 20000,//20秒
				beforeSend: function(){
				},
				success: function(msg){
					if(msg.result){
						//返回的msg.state有两种状态："executing":预执行中，"end":预执行结束
						if(msg.state == "executing" || msg.state == "end"){
							//console.log("更新节点:",msg.list,msg.state);
							for(var i=0; i<msg.list.length; i++){
								for(var j=0; j<_slef.jsPlumbJson.length; j++){
									if(msg.list[i].ID == _slef.jsPlumbJson[j].ID){
										console.log(j,msg.list[i].ID);
										$("#"+_slef.jsPlumbJson[j].ID).addClass("runOk");
										if(msg.list[i].userNum){
											$("#"+_slef.jsPlumbJson[j].ID + " .userNum").text(msg.list[i].userNum);
											$("#"+_slef.jsPlumbJson[j].ID + " .userNum").show();
										}
										break;
									}
								}
							}
							if(msg.error != undefined && msg.error != ''){
								console.log(msg.error);
								_slef.bootstrapAlert("warning", "警告！", msg.error);
								return;
							}

							if(msg.state == "end"){
								//预执行成功后更改状态
								_slef.marketingPlanEditState = 2;
								_slef.showTestButton(2);
								_slef.bootstrapAlert("info", "通知！", "预执行成功!");
								//console.log("预执行完成");
								return;
							}

							setTimeout(function(){
								//预执行结束后结束循环
								if(_slef.marketingPlanEditState === 1){
									timingFun();
								}
							},3000);
						}
					}else{
						console.log(msg.error);
						//alert(msg.error);
						_slef.bootstrapAlert("warning", "警告！", msg.error);
						//预执行失败后，退回到编辑状态
						/*_slef.marketingPlanEditState = 0;
						_slef.showTestButton(0);
						_slef.jsPlumbInstance();*/
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					alert('ajax通信出错');
				}
			});
		}
		timingFun();
	},
	//正式执行实时状态返回通讯
	implementPlanBack : function(){
		var _slef = this;
		function timingFun(){
			$.ajax({
				type: _slef.ajaxType,
				url: _slef.implementPlanBackApi+"?timeStamp=" + new Date().getTime(),
				data: {
					"taskID": _slef.taskID,
					"userID": _slef.userID,
					},
				dataType: "json",
				//async: false,
				timeout: 20000,//20秒
				beforeSend: function(){
				},
				success: function(msg){
					if(msg.result){
						//返回的msg.state有两种状态："executing":执行中，"end":预执行结束
						if(msg.state == "executing"){
							//console.log("更新节点:",msg.list,msg.state);
							for(var i=0; i<msg.list.length; i++){
								for(var j=0; j<_slef.jsPlumbJson.length; j++){
									if(msg.list[i].ID == _slef.jsPlumbJson[j].ID){
										console.log(j,msg.list[i].ID);
										$("#"+_slef.jsPlumbJson[j].ID).addClass("runOk");
										if(msg.list[i].userNum){
											$("#"+_slef.jsPlumbJson[j].ID + " .userNum").text(msg.list[i].userNum);
											$("#"+_slef.jsPlumbJson[j].ID + " .userNum").show();
										}
										break;
									}
								}
							}
							if(msg.error != undefined && msg.error != ''){
								console.log(msg.error);
								_slef.bootstrapAlert("warning", "警告！", msg.error);
							}else{
								setTimeout(function(){
									//执行结束后结束循环
									if(_slef.marketingPlanEditState === 3){
										timingFun();
									}
								},3000);
							}
						}else if(msg.state == "end"){
							//预执行成功后更改状态
							_slef.marketingPlanEditState = 4;
							_slef.showTestButton(4);
							_slef.bootstrapAlert("info", "通知！", "任务已完成!");
							//console.log("预执行完成");
						}
					}else{
						console.log(msg.error);
						//alert(msg.error);
						_slef.bootstrapAlert("warning", "警告！", msg.error);
						//执行失败后，退回到编辑状态
						/*_slef.marketingPlanEditState = 3;
						_slef.showTestButton(3);
						_slef.jsPlumbInstance();*/
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					alert('ajax通信出错');
				}
			});
		}
		timingFun();
	},
	//初始化Icon类型对应Class查询数组
	iconTypeToClassFun : function(){
		for(var i=0; i<marketingPlanIconJson.length; i++){
			for(var j=0; j<marketingPlanIconJson[i].marketingFun.length; j++){
				this.iconTypeToClass[marketingPlanIconJson[i].marketingFun[j].type] = {
					class : marketingPlanIconJson[i].class + " " + marketingPlanIconJson[i].marketingFun[j].class,
					title : marketingPlanIconJson[i].marketingFun[j].title,
					popUrl : marketingPlanIconJson[i].marketingFun[j].popUrl,
					sourceList : marketingPlanIconJson[i].marketingFun[j].sourceList
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
    //Bootstrap Alert框
    bootstrapAlert : function(type, title, text){
    	var alertPop = $("#bootstrapAlertBox > .alert");
    	if($(alertPop).length > 0){
    		for(var i=0; i<$(alertPop).length; i++){
    			$(alertPop[i]).animate({top: (Number($(alertPop[i]).css("top").replace(/px/, ""))-70)+"px"}, "normal");
    		}
    	}
    	var id = "alert_" + new Date().getTime();
    	var obj = {}
    	obj.type = type;
		obj.text = text;
		obj.title = title;
		obj.id = id;
		$("#bootstrapAlertBox").append(this.substitute(this.bootstrapAlertTemplate,obj));
		$("#"+id).css({
			left : (($(window).width() - 600)/2)+"px",
			top : "300px"
		})
		var closeAlert = setTimeout(function(){
			$("#"+id).alert('close');
		},5000);
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
        "<li class=\"{class}\" data-type=\"{type}\" data-parent-class=\"{parentClass}\">{title}</li>",
    ].join(""),
    //节点Icon模版
    iconTemplate : [
    	"<div class=\"{class}\" id=\"{id}\" data-type=\"{dataType}\" data-taskID=\"{dataTaskID}\" data-parent-class=\"{parentClass}\">",
    		"<h5>{text}</h5>",
    		"<div class=\"userNum\">{userNum}</div>",
    		"<div class=\"mask\"></div>",
    	"</div>"
    ].join(""),
    iframeBox : "<iframe id=\"popIframeBox\" name=\"popIframeBox\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" width=\"100%\" style=\"min-height:200px;\" src=\"{url}\"></iframe>",
    //Bootstrap Alert框模版
    //4种类型：alert-success alert-info alert-warning alert-danger
    bootstrapAlertTemplate : [
		"<div class=\"alert alert-{type} alert-dismissible fade in\" id=\"{id}\">",
			"<a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a>",
			"<div id=\"alertText\"><strong>{title}</strong>{text}</div>",
		"</div>"
	].join("")
}