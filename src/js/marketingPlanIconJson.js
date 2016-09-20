var marketingPlanIconJson = [
	{
		"title" : "时间配置",
		"class" : "process",
		"marketingFun" : [
			{
				"title" : "开始时间",
				"class" : "start",
				"type" : "Start",
				"show" : true,
				"sourceList" : false,
				"popUrl" : "pop_start.html"
			},
			{
				"title" : "等待时间",
				"class" : "time",
				"type" : "Time",
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
				"type" : "MemberSearch",
				"show" : true,
				"sourceList" : [
					"Start","Time"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "根据订单状态",
				"class" : "orderSearch",
				"type" : "OrderSearch",
				"show" : true,
				"sourceList" : [
					"Start","Time"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "根据会员分组",
				"class" : "groupSearch",
				"type" : "GroupSearch",
				"show" : true,
				"sourceList" : [
					"Start","Time"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "手动添加",
				"class" : "manualSearch",
				"type" : "ManualSearch",
				"show" : true,
				"sourceList" : [
					"Start","Time"
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
				"type" : "Split",
				"show" : true,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","merge","Intersection","Exclude","NoRepeat",
					"ValidMember","InvalidMember",
					"ReportActivity","LuckyMoneyActivity"
				],
				"popUrl" : "pop_split.html"
			},
			{
				"title" : "合并",
				"class" : "merge",
				"type" : "Merge",
				"show" : true,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","merge","Intersection","Exclude","NoRepeat",
					"ValidMember","InvalidMember",
					"ReportActivity","LuckyMoneyActivity"
				],
				"popUrl" : "pop_merge.html"
			},
			{
				"title" : "交集",
				"class" : "intersection",
				"type" : "Intersection",
				"show" : true,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","merge","Intersection","Exclude","NoRepeat",
					"ValidMember","InvalidMember",
					"ReportActivity","LuckyMoneyActivity"
				],
				"popUrl" : "pop_intersection.html"
			},
			{
				"title" : "排除",
				"class" : "exclude",
				"type" : "Exclude",
				"show" : true,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","merge","Intersection","Exclude","NoRepeat",
					"ValidMember","InvalidMember",
					"ReportActivity","LuckyMoneyActivity"
				],
				"popUrl" : "pop_exclude.html"
			},
			{
				"title" : "排重",
				"class" : "noRepeat",
				"type" : "NoRepeat",
				"show" : true,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","merge","Intersection","Exclude","NoRepeat",
					"ValidMember","InvalidMember",
					"ReportActivity","LuckyMoneyActivity"
				],
				"popUrl" : "pop_noRepeat.html"
			},
			{
				"title" : "结果",
				"class" : "results",
				"type" : "Results",
				"show" : false,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","merge","Intersection","Exclude","NoRepeat",
					"ValidMember","InvalidMember",
					"ReportActivity","LuckyMoneyActivity"
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
				"type" : "Sms",
				"show" : true,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","Merge","Intersection","Exclude","NoRepeat","Results",
					"ValidMember","InvalidMember"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "邮件",
				"class" : "edm",
				"type" : "Email",
				"show" : true,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","Merge","Intersection","Exclude","NoRepeat","Results",
					"ValidMember","InvalidMember"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "发红包",
				"class" : "luckyMoney",
				"type" : "LuckyMoney",
				"show" : false,
				"sourceList" : [
					"MemberSearch","OrderSearch","GroupSearch","ManualSearch",
					"Split","Merge","Intersection","Exclude","NoRepeat","Results",
					"ValidMember","InvalidMember"
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
				"type" : "ValidMember",
				"show" : true,
				"sourceList" : [
					"Sms","Email","LuckyMoney",
					"ReportActivity","LuckyMoneyActivity"
				],
				"popUrl" : "pop_validMember.html"
			},
			{
				"title" : "未响应客户",
				"class" : "invalidMember",
				"type" : "InvalidMember",
				"show" : true,
				"sourceList" : [
					"Sms","Email","LuckyMoney",
					"ReportActivity","LuckyMoneyActivity"
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
				"type" : "ReportActivity",
				"show" : true,
				"sourceList" : [
					"Sms","Email","LuckyMoney",
					"ValidMember","InvalidMember"
				],
				"popUrl" : "pop_time.html"
			},
			{
				"title" : "红包发送统计",
				"class" : "luckyMoneyActivity",
				"type" : "LuckyMoneyActivity",
				"show" : false,
				"sourceList" : [
					"Sms","Email","LuckyMoney",
					"ValidMember","InvalidMember"
				],
				"popUrl" : "pop_time.html"
			}
		]
	}
];