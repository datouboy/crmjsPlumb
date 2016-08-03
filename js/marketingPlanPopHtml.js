var marketingPlanPopHtml = new Array();

//时间
marketingPlanPopHtml["time"] = {
	html : [
			'<div class="title_TimeBOX">',
			  '<table border="0" cellpadding="0" cellspacing="0" class="TimeBOX_title">',
			    '<tbody>',
			      '<tr>',
			        '<td class="T_Name">节点名：</td>',
			        '<td title="时间节点名称，便于标记"><span>',
			          '<input type="text" class="form-control emay-condition-customized-input emay-condition-customized-input-date TimeBOX_inputbox" maxlength="30" id="timeNameNodeId">',
			          '</span></td>',
			        '<td class="T_Name">节点ID:</td>',
			        '<td><span>',
			          '<input type="text" class="form-control emay-condition-customized-input emay-condition-customized-input-date TimeBOX_inputbox" disabled="true" id="timeNameCodeId">',
			          '</span></td>',
			      '</tr>',
			    '</tbody>',
			  '</table>',
			  '<table cellpadding="0" cellspacing="0" class="TimeBOX_content" id="checkTableId">',
			    '<tbody>',
			      '<tr id="markLine01">',
			        '<td rowspan="2" class="TimeBOX_Con_I"><label title="当流程一次【正式执行】完成时,此流程即结束。">',
			            '<input type="radio" name="optionsRadiosMain" id="optionsRadios1" value="once" data-value="1">',
			            '一次性执行 </label></td>',
			        '<td colspan="2"><label class="radio-inline" title="当流程【正式执行】时,此流程立即执行。">',
			            '<input type="radio" name="inlineRadioOptionsOnce" value="now" data-mark="inp" data-value="1" checked="checked">',
			            '即时执行 </label>',
			          '<label class="radio-inline" title="当流程【正式执行】时,此流程会在指定的日期执行。">',
			            '<input type="radio" name="inlineRadioOptionsOnce" value="time" data-mark="inp" data-value="2">',
			            '定期执行 </label></td>',
			      '</tr>',
			      '<tr id="markLine02">',
			        '<td colspan="2" class="TimeBOX_Con_II"><ul class="list-inline" title="当流程【正式执行】时,此流程会在指定的日期执行。">',
			            '<li>开始时间：</li>',
			            '<li> <span>',
			              '<input type="text" class="form-control input-sm emay-condition-customized-input emay-condition-customized-input-date TimeBOX_inputbox hasDatepicker" data-mark="inp" id="onceBtime" data-toggle="EmayDateTimePicker" data-date-type="year-month-day houre-minute-second" disabled="disabled">',
			              '</span> </li>',
			          '</ul></td>',
			      '</tr>',
			      '<tr id="markLine03">',
			        '<td rowspan="5" class="TimeBOX_Con_I"><label title="当流程【正式执行】时,此流程会在指定的时间内循环执行（注：需要设置开始时间和结束时间）">',
			            '<input type="radio" name="optionsRadiosMain" id="optionsRadios2" value="cycle" data-value="2" checked="checked">',
			            '周期性执行 </label></td>',
			        '<td class="Periodicity_I" title="当流程【正式执行】时,此流程会在指定的时间内每天循环执行（注：需要设置开始时间和结束时间）"><label>',
			            '<input type="radio" name="optionsRadios_00" id="optionsRadios2" value="cycleDay" data-mark="inp" data-value="1" checked="checked" disabled="disabled">',
			            '每天 </label></td>',
			        '<td>&nbsp;</td>',
			      '</tr>',
			      '<tr id="markLine04">',
			        '<td class="Periodicity_I" title="当流程【正式执行】时,此流程会在指定的时间内循环执行（注：1、每周执行需要选择具体的时间,例如：周六、日） 2、需要设置开始时间和结束时间"><label>',
			            '<input type="radio" name="optionsRadios_00" id="optionsRadios2" value="cycleWeek" data-mark="inp" data-value="2" disabled="disabled">',
			            '每周 </label></td>',
			        '<td id="weekBoxId"><div class="weekly_box">',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox1" name="inlineCheckbox1" data-mark="inp" data-value="0" disabled="disabled">',
			              '星期日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox2" name="inlineCheckbox1" data-mark="inp" data-value="1" disabled="disabled">',
			              '星期一 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox3" name="inlineCheckbox1" data-mark="inp" data-value="2" disabled="disabled">',
			              '星期二 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox4" name="inlineCheckbox1" data-mark="inp" data-value="3" disabled="disabled">',
			              '星期三 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox5" name="inlineCheckbox1" data-mark="inp" data-value="4" disabled="disabled">',
			              '星期四 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox6" name="inlineCheckbox1" data-mark="inp" data-value="5" disabled="disabled">',
			              '星期五 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox7" name="inlineCheckbox1" data-mark="inp" data-value="6" disabled="disabled">',
			              '星期六 </label>',
			          '</div></td>',
			      '</tr>',
			      '<tr id="markLine05">',
			        '<td class="Periodicity_I" title="当流程【正式执行】时,此流程会在指定的时间内循环执行（注：1、每月执行需要选择具体的时间,例如：30号、31号） 2、需要设置开始时间和结束时间"><label>',
			            '<input type="radio" name="optionsRadios_00" id="optionsRadios2" value="cycleMonth" data-mark="inp" data-value="3" disabled="disabled">',
			            '每月 </label></td>',
			        '<td id="monthBoxId"><div class="perMonth_box">',
			            '<label class="checkbox-inline label_month">',
			              '<input type="checkbox" id="inlineCheckbox1" name="inlineCheckbox2" data-mark="inp" data-value="1" disabled="disabled">',
			              '1日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox2" name="inlineCheckbox2" data-mark="inp" data-value="2" disabled="disabled">',
			              '2日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox3" name="inlineCheckbox2" data-mark="inp" data-value="3" disabled="disabled">',
			              '3日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox4" name="inlineCheckbox2" data-mark="inp" data-value="4" disabled="disabled">',
			              '4日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox5" name="inlineCheckbox2" data-mark="inp" data-value="5" disabled="disabled">',
			              '5日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox6" name="inlineCheckbox2" data-mark="inp" data-value="6" disabled="disabled">',
			              '6日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox7" name="inlineCheckbox2" data-mark="inp" data-value="7" disabled="disabled">',
			              '7日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox8" name="inlineCheckbox2" data-mark="inp" data-value="8" disabled="disabled">',
			              '8日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox9" name="inlineCheckbox2" data-mark="inp" data-value="9" disabled="disabled">',
			              '9日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox10" name="inlineCheckbox2" data-mark="inp" data-value="10" disabled="disabled">',
			              '10日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox11" name="inlineCheckbox2" data-mark="inp" data-value="11" disabled="disabled">',
			              '11日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox12" name="inlineCheckbox2" data-mark="inp" data-value="12" disabled="disabled">',
			              '12日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox13" name="inlineCheckbox2" data-mark="inp" data-value="13" disabled="disabled">',
			              '13日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox14" name="inlineCheckbox2" data-mark="inp" data-value="14" disabled="disabled">',
			              '14日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox15" name="inlineCheckbox2" data-mark="inp" data-value="15" disabled="disabled">',
			              '15日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox16" name="inlineCheckbox2" data-mark="inp" data-value="16" disabled="disabled">',
			              '16日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox17" name="inlineCheckbox2" data-mark="inp" data-value="17" disabled="disabled">',
			              '17日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox18" name="inlineCheckbox2" data-mark="inp" data-value="18" disabled="disabled">',
			              '18日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox19" name="inlineCheckbox2" data-mark="inp" data-value="19" disabled="disabled">',
			              '19日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox20" name="inlineCheckbox2" data-mark="inp" data-value="20" disabled="disabled">',
			              '20日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox21" name="inlineCheckbox2" data-mark="inp" data-value="21" disabled="disabled">',
			              '21日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox22" name="inlineCheckbox2" data-mark="inp" data-value="22" disabled="disabled">',
			              '22日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox23" name="inlineCheckbox2" data-mark="inp" data-value="23" disabled="disabled">',
			              '23日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox24" name="inlineCheckbox2" data-mark="inp" data-value="24" disabled="disabled">',
			              '24日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox25" name="inlineCheckbox2" data-mark="inp" data-value="25" disabled="disabled">',
			              '25日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox26" name="inlineCheckbox2" data-mark="inp" data-value="26" disabled="disabled">',
			              '26日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox27" name="inlineCheckbox2" data-mark="inp" data-value="27" disabled="disabled">',
			              '27日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox28" name="inlineCheckbox2" data-mark="inp" data-value="28" disabled="disabled">',
			              '28日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox29" name="inlineCheckbox2" data-mark="inp" data-value="29" disabled="disabled">',
			              '29日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox30" name="inlineCheckbox2" data-mark="inp" data-value="30" disabled="disabled">',
			              '30日 </label>',
			            '<label class="checkbox-inline">',
			              '<input type="checkbox" id="inlineCheckbox31" name="inlineCheckbox2" data-mark="inp" data-value="31" disabled="disabled">',
			              '31日 </label>',
			          '</div></td>',
			      '</tr>',
			      '<tr id="markLine06">',
			        '<td colspan="2" class="TimeBOX_Con_II"><ul class="list-inline" title="当流程【正式执行】时,此流程会在指定的开始时间执行。          注：开始时间大于系统时间">',
			            '<li>开始日期：</li>',
			            '<li> <span>',
			              '<input type="text" data-mark="inp" class="form-control input-sm emay-condition-customized-input emay-condition-customized-input-date TimeBOX_inputbox hasDatepicker" id="cycleStartTime" data-toggle="EmayDateTimePicker" data-date-type="year-month-day houre-minute-second" disabled="disabled">',
			              '</span> </li>',
			          '</ul></td>',
			      '</tr>',
			      '<tr id="markLine07">',
			        '<td colspan="2" class="TimeBOX_Con_II"><ul class="list-inline" title="当流程【正式执行】时,此流程会在指定的结束时间停止执行。          注：结束时间大于开始时间">',
			            '<li>结束日期：</li>',
			            '<li> <span>',
			              '<input type="text" data-mark="inp" class="form-control input-sm emay-condition-customized-input emay-condition-customized-input-date TimeBOX_inputbox hasDatepicker" id="cycleEndTime" data-toggle="EmayDateTimePicker" data-date-type="year-month-day houre-minute-second" disabled="disabled">',
			              '</span> </li>',
			          '</ul></td>',
			      '</tr>',
			    '</tbody>',
			  '</table>',
			'</div>',
			'<script type="text/javascript">',
			'</script>'
		].join("")
}

//等待
marketingPlanPopHtml["wait"] = {
	html : [
			'<div class="qwe">',
				'<h5>等待编辑Html</h5>',
			'</div>'
		].join("")
}

//订单查询
marketingPlanPopHtml["orderSearch"] = {
	html : [
			'<div class="qwe">',
				'<h5>订单查询编辑Html</h5>',
			'</div>'
		].join("")
}

//会员查询
marketingPlanPopHtml["memberSearch"] = {
	html : [
			'<div class="qwe">',
				'<h5>会员查询编辑Html</h5>',
			'</div>'
		].join("")
}

//拆分
marketingPlanPopHtml["split"] = {
	html: [
			'<div class="qwe">',
				'<h5>拆分编辑Html</h5>',
			'</div>'
		].join("")
}

//合并
marketingPlanPopHtml["merge"] = {
	html : [
			'<div class="qwe">',
				'<h5>合并编辑Html</h5>',
			'</div>'
		].join("")
}

//交集
marketingPlanPopHtml["intersection"] = {
	html : [
			'<div class="qwe">',
				'<h5>交集编辑Html</h5>',
			'</div>'
		].join("")
}

//排除
marketingPlanPopHtml["exclude"] = {
	html : [
			'<div class="qwe">',
				'<h5>排除编辑Html</h5>',
			'</div>'
		].join("")
}

//有效客户
marketingPlanPopHtml["validMember"] = {
	html : [
			'<div class="qwe">',
				'<h5>有效客户编辑Html</h5>',
			'</div>'
		].join("")
}

//响应客户
marketingPlanPopHtml["allMember"] = {
	html : [
			'<div class="qwe">',
				'<h5>响应客户编辑Html</h5>',
			'</div>'
		].join("")
}

//未响应客户
marketingPlanPopHtml["invalidMember"] = {
	html : [
			'<div class="qwe">',
				'<h5>未响应客户编辑Html</h5>',
			'</div>'
		].join("")
}

//优惠券
marketingPlanPopHtml["coupon"] = {
	html : [
			'<div class="qwe">',
				'<h5>优惠券编辑Html</h5>',
			'</div>'
		].join("")
}

//短信
marketingPlanPopHtml["sms"] = {
	html : [
			'<div class="qwe">',
				'<h5>短信编辑Html</h5>',
			'</div>'
		].join("")
}

//邮件
marketingPlanPopHtml["edm"] = {
	html : [
			'<div class="qwe">',
				'<h5>邮件编辑Html</h5>',
			'</div>'
		].join("")
}

//活动分析
marketingPlanPopHtml["reportActivity"] = {
	html : [
			'<div class="qwe">',
				'<h5>活动分析编辑Html</h5>',
			'</div>'
		].join("")
}

//实时分析
marketingPlanPopHtml["realtimeActivity"] = {
	html : [
			'<div class="qwe">',
				'<h5>时实时分析编辑Html</h5>',
			'</div>'
		].join("")
}