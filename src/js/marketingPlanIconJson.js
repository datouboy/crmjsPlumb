var marketingPlanIconJson = [
	{
		"title" : "时间配置",
		"class" : "process",
		"marketingFun" : [
			{
				"title" : "开始时间",
				"class" : "start",
				"type" : "start",
				"show" : true,
				"sourceList" : false,
				"popUrl" : "pop_start.html"
			},
			{
				"title" : "等待时间",
				"class" : "time",
				"type" : "time",
				"show" : true,
				"sourceList" : true,
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
				"show" : true,
				"sourceList" : [
					"start","time"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "根据订单状态",
				"class" : "orderSearch",
				"type" : "orderSearch",
				"show" : true,
				"sourceList" : [
					"start","time"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "根据会员分组",
				"class" : "groupSearch",
				"type" : "groupSearch",
				"show" : true,
				"sourceList" : [
					"start","time"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "手动添加",
				"class" : "manualSearch",
				"type" : "manualSearch",
				"show" : true,
				"sourceList" : [
					"start","time"
				],
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
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_split.html"
			},
			{
				"title" : "合并",
				"class" : "merge",
				"type" : "merge",
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_merge.html"
			},
			{
				"title" : "交集",
				"class" : "intersection",
				"type" : "intersection",
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_intersection.html"
			},
			{
				"title" : "排除",
				"class" : "exclude",
				"type" : "exclude",
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_exclude.html"
			},
			{
				"title" : "排重",
				"class" : "noRepeat",
				"type" : "noRepeat",
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_noRepeat.html"
			},
			{
				"title" : "结果",
				"class" : "results",
				"type" : "results",
				"show" : false,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_results.html"
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
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "邮件",
				"class" : "edm",
				"type" : "edm",
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "发红包",
				"class" : "luckyMoney",
				"type" : "luckyMoney",
				"show" : true,
				"sourceList" : [
					"dealSearch","orderSearch","groupSearch","manualSearch",
					"split","merge","intersection","exclude","noRepeat",
					"validMember","invalidMember"
				],
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
				"show" : true,
				"sourceList" : [
					"sms","edm","luckyMoney",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_validMember.html"
			},
			{
				"title" : "未响应客户",
				"class" : "invalidMember",
				"type" : "invalidMember",
				"show" : true,
				"sourceList" : [
					"sms","edm","luckyMoney",
					"reportActivity","luckyMoneyActivity"
				],
				"popUrl" : "pop_invalidMember.html"
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
				"show" : true,
				"sourceList" : [
					"sms","edm","luckyMoney",
					"validMember","invalidMember"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "红包发送统计",
				"class" : "luckyMoneyActivity",
				"type" : "luckyMoneyActivity",
				"show" : true,
				"sourceList" : [
					"sms","edm","luckyMoney",
					"validMember","invalidMember"
				],
				"popUrl" : "pop_time.html"
			}
		]
	}
];