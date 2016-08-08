var marketingPlanIconJson = [
	{
		"title" : "时间配置",
		"class" : "process",
		"marketingFun" : [
			{
				"title" : "开始时间",
				"class" : "start",
				"type" : "start",
				"sourceList" : false,
				"popUrl" : false
			},
			{
				"title" : "等待时间",
				"class" : "time",
				"type" : "time",
				"sourceList" : [
					"start","wait"
				],
				"popUrl" : "pop_time.html"
			}
		]
	},
	{
		"title" : "目标客户筛选",
		"class" : "screen",
		"marketingFun" : [
			{
				"title" : "根据交易记录",
				"class" : "dealSearch",
				"type" : "dealSearch",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "根据订单状态",
				"class" : "orderSearch",
				"type" : "orderSearch",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "根据会员分组",
				"class" : "groupSearch",
				"type" : "groupSearch",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "手动添加",
				"class" : "manualSearch",
				"type" : "manualSearch",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			}
		]
	},
	{
		"title" : "目标客户过滤",
		"class" : "filter",
		"marketingFun" : [
			{
				"title" : "拆分",
				"class" : "split",
				"type" : "split",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "合并",
				"class" : "merge",
				"type" : "merge",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "交集",
				"class" : "intersection",
				"type" : "intersection",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "排除",
				"class" : "exclude",
				"type" : "exclude",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "排重",
				"class" : "noRepeat",
				"type" : "noRepeat",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			}
		]
	},
	{
		"title" : "沟通方式",
		"class" : "send",
		"marketingFun" : [
			{
				"title" : "短信",
				"class" : "sms",
				"type" : "sms",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "邮件",
				"class" : "edm",
				"type" : "edm",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "发红包",
				"class" : "luckyMoney",
				"type" : "luckyMoney",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			}
		]
	},
	{
		"title" : "响应结果",
		"class" : "userGroup",
		"marketingFun" : [
			{
				"title" : "响应客户",
				"class" : "validMember",
				"type" : "validMember",
				"sourceList" : [
					"start","wait"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "未响应客户",
				"class" : "invalidMember",
				"type" : "invalidMember",
				"sourceList" : [
					"start","wait"
				],
				"popUrl" : "pop_time.html"
			}
		]
	},
	{
		"title" : "客户分析",
		"class" : "report",
		"marketingFun" : [
			{
				"title" : "活动分析",
				"class" : "reportActivity",
				"type" : "reportActivity",
				"sourceList" : false,
				"popUrl" : "pop_time.html"
			}
		]
	}
];