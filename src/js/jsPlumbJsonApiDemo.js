{
	"result" : true,
	"state" : 0,
	"list" : [
		{
			"ID" : "jsPlumb_0",
			"taskID" : "jsPlumb_0_ttt",
			"type" : "start",
			"parentClass" : "process",
			"text" : "开始任务",
			"state" : 1,
			"targetId" : ["jsPlumb_1","jsPlumb_4"],
			"left": 50,
			"top": 50,
			"userNum" : false
		},
		{
			"ID" : "jsPlumb_1",
			"taskID" : "jsPlumb_1_ttt",
			"type" : "time",
			"parentClass" : "process",
			"text" : "text1",
			"state" : 1,
			"targetId" : ["jsPlumb_2","jsPlumb_6","jsPlumb_5"],
			"left": 150,
			"top": 150,
			"userNum" : false
		},
		{
			"ID" : "jsPlumb_2",
			"taskID" : "jsPlumb_2_ttt",
			"type" : "time",
			"parentClass" : "process",
			"text" : "text2",
			"state" : 0,
			"targetId" : ["jsPlumb_3"],
			"left": 350,
			"top": 250,
			"userNum" : false
		},
		{
			"ID" : "jsPlumb_3",
			"taskID" : "jsPlumb_3_ttt",
			"type" : "orderSearch",
			"parentClass" : "screen",
			"text" : "text3",
			"state" : 0,
			"targetId" : ["jsPlumb_7"],
			"left": 550,
			"top": 250,
			"userNum" : false
		},
		{
			"ID" : "jsPlumb_4",
			"taskID" : "jsPlumb_4_ttt",
			"type" : "orderSearch",
			"parentClass" : "screen",
			"text" : "text4",
			"state" : 0,
			"targetId" : [],
			"left": 250,
			"top": 50,
			"userNum" : 60060
		},
		{
			"ID" : "jsPlumb_5",
			"taskID" : "jsPlumb_5_ttt",
			"type" : "groupSearch",
			"parentClass" : "screen",
			"text" : "text5",
			"state" : 0,
			"targetId" : ["jsPlumb_7"],
			"left": 550,
			"top": 50,
			"userNum" : false
		},
		{
			"ID" : "jsPlumb_6",
			"taskID" : "jsPlumb_6_ttt",
			"type" : "manualSearch",
			"parentClass" : "screen",
			"text" : "text6",
			"state" : 0,
			"targetId" : ["jsPlumb_7"],
			"left": 550,
			"top": 150,
			"userNum" : false
		},
		{
			"ID" : "jsPlumb_7",
			"taskID" : "jsPlumb_7_ttt",
			"type" : "sms",
			"parentClass" : "send",
			"text" : "text7",
			"state" : 0,
			"targetId" : ["jsPlumb_8"],
			"left": 750,
			"top": 150,
			"userNum" : false
		},
		{
			"ID" : "jsPlumb_8",
			"taskID" : "jsPlumb_8_ttt",
			"type" : "reportActivity",
			"parentClass" : "report",
			"text" : "text8",
			"state" : 0,
			"targetId" : [],
			"left": 900,
			"top": 150,
			"userNum" : false
		}
	]
}