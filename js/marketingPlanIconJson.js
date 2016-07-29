var marketingPlanIconJson = [
	{
		"title" : "操作流程",
		"class" : "process",
		"marketingFun" : [
			{
				"title" : "开始",
				"class" : "start",
				"type" : "start",
				"sourceList" : false
			},
			{
				"title" : "时间",
				"class" : "time",
				"type" : "time",
				"sourceList" : [
					"start","wait"
				]
			},
			{
				"title" : "等待",
				"class" : "wait",
				"type" : "wait",
				"sourceList" : [
					"start","wait"
				]
			}
		]
	},
	{
		"title" : "目标客户筛选",
		"class" : "screen",
		"marketingFun" : [
			{
				"title" : "订单查询",
				"class" : "orderSearch",
				"type" : "orderSearch",
				"sourceList" : false
			},
			{
				"title" : "会员查询",
				"class" : "memberSearch",
				"type" : "memberSearch",
				"sourceList" : false
			},
			{
				"title" : "拆分",
				"class" : "split",
				"type" : "split",
				"sourceList" : false
			},
			{
				"title" : "合并",
				"class" : "merge",
				"type" : "merge",
				"sourceList" : false
			},
			{
				"title" : "交集",
				"class" : "intersection",
				"type" : "intersection",
				"sourceList" : false
			},
			{
				"title" : "排除",
				"class" : "exclude",
				"type" : "exclude",
				"sourceList" : false
			}
		]
	},
	{
		"title" : "客户组",
		"class" : "userGroup",
		"marketingFun" : [
			{
				"title" : "有效客户",
				"class" : "validMember",
				"type" : "validMember",
				"sourceList" : false
			},
			{
				"title" : "响应客户",
				"class" : "allMember",
				"type" : "allMember",
				"sourceList" : [
					"start","wait"
				]
			},
			{
				"title" : "未响应客户",
				"class" : "invalidMember",
				"type" : "invalidMember",
				"sourceList" : [
					"start","wait"
				]
			}
		]
	},
	{
		"title" : "个性优惠",
		"class" : "discount",
		"marketingFun" : [
			{
				"title" : "优惠券",
				"class" : "coupon",
				"type" : "coupon",
				"sourceList" : false
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
				"sourceList" : false
			},
			{
				"title" : "邮件",
				"class" : "edm",
				"type" : "edm",
				"sourceList" : false
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
				"sourceList" : false
			},
			{
				"title" : "实时分析",
				"class" : "realtimeActivity",
				"type" : "realtimeActivity",
				"sourceList" : false
			}
		]
	}
];