{
	"result" : true,
	"list" : [
		{
			"ID" : "jsPlumb_0",
			"taskID" : "123123",
			"type" : "start",
			"text" : "开始任务",
			"targetId" : ["jsPlumb_1","jsPlumb_4"],
			"left": 50,
			"top": 50
		},
		{
			"ID" : "jsPlumb_1",
			"taskID" : "123123",
			"type" : "time",
			"text" : "text1",
			"targetId" : ["jsPlumb_2","jsPlumb_6","jsPlumb_5"],
			"left": 150,
			"top": 150
		},
		{
			"ID" : "jsPlumb_2",
			"taskID" : "123123",
			"type" : "wait",
			"text" : "text2",
			"targetId" : ["jsPlumb_3"],
			"left": 350,
			"top": 250
		},
		{
			"ID" : "jsPlumb_3",
			"taskID" : "123123",
			"type" : "orderSearch",
			"text" : "text3",
			"targetId" : ["jsPlumb_7"],
			"left": 550,
			"top": 250
		},
		{
			"ID" : "jsPlumb_4",
			"taskID" : "123123",
			"type" : "memberSearch",
			"text" : "text4",
			"targetId" : [],
			"left": 250,
			"top": 50
		},
		{
			"ID" : "jsPlumb_5",
			"taskID" : null,
			"type" : "split",
			"text" : "text5",
			"targetId" : ["jsPlumb_7"],
			"left": 550,
			"top": 50
		},
		{
			"ID" : "jsPlumb_6",
			"taskID" : null,
			"type" : "sms",
			"text" : "text6",
			"targetId" : ["jsPlumb_7"],
			"left": 550,
			"top": 150
		},
		{
			"ID" : "jsPlumb_7",
			"taskID" : null,
			"type" : "reportActivity",
			"text" : "text6",
			"targetId" : [],
			"left": 750,
			"top": 150
		}
	]
}