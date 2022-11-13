define(['handlebars'], function(Handlebars) {

this["HbTemplates"] = this["HbTemplates"] || {};
this["HbTemplates"]["templates"] = this["HbTemplates"]["templates"] || {};

this["HbTemplates"]["templates"]["activity-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n		<div class=\"sub-nav subNav\">\n"
    + ((stack1 = container.invokePartial(partials["session-subnav"],depth0,{"name":"session-subnav","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " with-nav";
},"5":function(container,depth0,helpers,partials,data) {
    return "<div class=\"plot-nav plotNav\"></div>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<div class=\"team-losenge coach\">Coach</div>";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<div class=\"user-teams\">					\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.teams : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "								<div class=\"team-losenge\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return alias2(alias1(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.orientation_type : stack1), depth0))
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.height : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.distance : stack1), depth0))
    + " ";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return alias2(alias1(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.distance : stack1), depth0))
    + alias2((helpers.initial || (depth0 && depth0.initial) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.measurement_type : stack1),{"name":"initial","hash":{},"data":data}))
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.start_type : stack1), depth0))
    + "  "
    + alias2((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.total_time : stack1),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "s";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "<div class=\"page-container pageContainer\" id=\"activity\">\n	<div class=\"activity-detail activityDetail\">\n\n<!-- 		"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.session : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->\n	    <div class=\"main-body activity-body mainBody\">\n	    	\n	    	<div class=\"plot-header plotHeader"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"sprint",{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">		    \n		    	"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"sprint",{"name":"compare","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n				<div class=\"plot-container\" id=\"plotContainer\"></div>\n				<div class=\"selector-container selectorContainer\"></div>\n			\n				<div class=\"plot-subhead plotSubhead\">\n					<div class=\"right-side\">\n						<div class=\"plot-sub-item plot-sub-action\">\n							<button class=\"btn btn-dark\">Compare with...</button>\n						</div>\n						<div class=\"plot-sub-item series-selector-group select\">\n							<button class=\"btn btn-subdued selector-btn\" data-actionbind data-action=\"toggleSeriesSelector\">Series</button>\n						</div>\n					</div>\n				</div>\n\n			</div>\n\n<div class=\"meta-belt soup\">\n\n			<div class=\"center-column\">\n\n				<div class=\"activity-user\">\n			        <div class=\"teaser-img-container\">\n			            <div class=\"profile-image small lazyload\" data-bg=\""
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.thumbnail_url : stack1), depth0))
    + "\"></div>\n			        </div>        \n			        <div class=\"user-text\">\n			        	<div class=\"ident pull-left\">\n							<h4 class=\"user-name\">"
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</h4>\n							"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_admin : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.teams : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>\n			        </div>\n\n					<div class=\"subhead activity-type\">"
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1), depth0))
    + "</div>\n					<div class=\"subhead activity-meta\">\n						"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"jump",{"name":"compare","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"sprint",{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n					</div>\n				</div>\n			</div>\n\n			<div class=\"center-column wide\">\n\n				<div class=\"activity-kpis centered\">\n					<div class=\"kpi\">\n						<span class=\"stat-label\">Max velocity</span>\n						<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.max_velocity : stack1),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">m/s</span></span>\n					</div>\n					<div class=\"kpi\">\n						<span class=\"stat-label\">Stride frequency</span>\n						<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.strides : stack1)) != null ? stack1.frequency_median : stack1),1,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">/s</span></span>\n					</div>\n					<div class=\"kpi\">\n						<span class=\"stat-label\">Contact time</span>\n						<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.strides : stack1)) != null ? stack1.contact_median : stack1),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">s</span></span>\n					</div>\n					<div class=\"kpi\">\n						<span class=\"stat-label\">Stride length</span>\n						<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.strides : stack1)) != null ? stack1.length_median : stack1),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">m</span></span>\n					</div>						\n					<div class=\"kpi\">\n						<span class=\"stat-label\">Ground accel</span>\n						<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.ground_accel_median : stack1),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">m/s<super>2</super></span></span>\n					</div>	\n\n				</div>\n			</div>\n\n		</div>	\n\n		\n				<div class=\"body-section\">				\n					<div class=\"center-column\">\n						<!-- Annotations -->\n					</div>\n				</div>\n\n	    </div>\n\n	</div>\n</div>";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["activity-group-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["activity-teaser"],depth0,{"name":"activity-teaser","data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"activity-group-detail activityGroupDetail\">\n\n	<div class=\"plot-header plotHeader\">		    \n		<div class=\"plot-container\" id=\"plotContainer\"></div>\n	</div>\n\n	<div class=\"activity-teaser-list\">\n		<div class=\"center-column\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["activity-group"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"group-meta-item orientation\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.orientation : stack1), depth0))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<div class=\"group-meta-item start\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.start_type : stack1), depth0))
    + " start</div>			\n			<div class=\"group-meta-item dist\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.distance : stack1), depth0))
    + "m</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["activity-teaser-mini"],depth0,{"name":"activity-teaser-mini","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<div class=\"activity-group center-column activityGroup\">\n\n	<div class=\"group-definition gotoGroup\" data-id="
    + alias3(((helper = (helper = helpers.type_hash || (depth0 != null ? depth0.type_hash : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"type_hash","hash":{},"data":data}) : helper)))
    + ">\n		<div class=\"group-meta-item type\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1), depth0))
    + "</div>\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"jump",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "		<div class=\"group-meta-item count\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.activities : depth0)) != null ? stack1.length : stack1), depth0))
    + " activit"
    + alias3((helpers.pluralize || (depth0 && depth0.pluralize) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.activities : depth0)) != null ? stack1.length : stack1),"y","ies",{"name":"pluralize","hash":{},"data":data}))
    + "</div>\n	</div>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	\n</div>\n";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["activity-series-selector"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"series-selector seriesSelector\">\n	<div class=\"inner-selector center-column\">\n		<div class=\"selector-blurb\">Choose data fields to plot on the time series</div>\n		<div class=\"select-type\">\n			<div class=\"type-header\">\n				<div class=\"select-head seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"distanceM",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"distanceM\">Position</div>\n			</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"posM.x",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"posM.x\">x</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"posM.y",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"posM.y\">y</div>\n			<!-- <div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"posM.z",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"posM.z\">z</div> -->\n		</div>	\n		<div class=\"select-type\">\n			<div class=\"type-header\">\n				<div class=\"select-head seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"velocityMPS",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"velocityMPS\">Velocity</div>\n			</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"velMPS.x",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"velMPS.x\">x</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"velMPS.y",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"velMPS.y\">y</div>\n			<!-- <div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"velMPS.z",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"velMPS.z\">z</div> -->\n		</div>	\n		<div class=\"select-type\">\n			<div class=\"type-header\">\n				<div class=\"select-head seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"accBodyMPS2",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"accBodyMPS2\">Acceleration</div>\n			</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"accBodyMPS2.x",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"accBodyMPS2.x\">x</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"accBodyMPS2.y",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"accBodyMPS2.y\">y</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"accBodyMPS2.z",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"accBodyMPS2.z\">z</div>\n		</div>\n		<div class=\"select-type\">\n			<div class=\"type-header\">\n				<div class=\"select-head seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"gyroBodyDegPS.x",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"velocityMPS\">Ang. velocity</div>\n			</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"gyroBodyDegPS.x",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"gyroBodyDegPS.x\">x</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"gyroBodyDegPS.y",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"gyroBodyDegPS.y\">y</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"gyroBodyDegPS.z",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"gyroBodyDegPS.z\">z</div>\n		</div>\n		<div class=\"select-type\">\n			<div class=\"type-header\">\n				<div class=\"select-head seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"splits",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"splits\">Splits</div>\n			</div>\n		</div>\n		<div class=\"select-type\">\n			<div class=\"type-header\">\n				<div class=\"select-head seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"strides",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"strides\">Strides</div>\n			</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"stride_contact",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"stride_contact\">Contact time</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"stride_length",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"stride_length\">Stride length</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"stride_frequency",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"stride_frequency\">Frequency</div>\n			<div class=\"select-sub seriesSelect"
    + ((stack1 = (helpers.inArray || (depth0 && depth0.inArray) || alias2).call(alias1,(depth0 != null ? depth0.series : depth0),"stride_side",{"name":"inArray","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-series=\"stride_side\">Side (L/R)</div>\n		</div>\n	</div>\n</div>\n";
},"useData":true});

this["HbTemplates"]["templates"]["activity-teaser-mini"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"stat num light\">"
    + container.escapeExpression((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.reaction_time : stack1),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.total_time : stack1),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "s";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"activity-teaser mini activityTeaser\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n<a href=\"/activity/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"wrapping-anchor\" data-navigate>\n	\n	<div class=\"teaser-head\">\n		<div class=\"activity-user lefty\">\n	        <div class=\"teaser-img-container\">\n	            <div class=\"profile-image small lazyload\" data-bg=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.thumbnail_url : stack1), depth0))
    + "\"></div>\n	        </div>        \n	        <div class=\"user-meta\">\n	        	<div class=\"user-name\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</div>\n	        </div>\n\n        </div>        \n        <div class=\"stats righty\">\n        	\n        	"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.start_type : stack1),"beep",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        	<div class=\"stat num main\">"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"sprint",{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n		</div>\n	</div>\n\n</a>\n</div>\n";
},"useData":true});

this["HbTemplates"]["templates"]["activity-teaser"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"stat num light\">"
    + container.escapeExpression((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.reaction_time : stack1),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.total_time : stack1),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "s";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"activity-teaser activityTeaser\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n<a href=\"/activity/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"wrapping-anchor\" data-navigate>\n	\n	<div class=\"teaser-head\">\n		<div class=\"activity-user lefty\">\n	        <div class=\"teaser-img-container\">\n	            <div class=\"profile-image small lazyload\" data-bg=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.thumbnail_url : stack1), depth0))
    + "\"></div>\n	        </div>        \n	        <div class=\"user-meta\">\n	        	<div class=\"user-name\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</div>\n	        	<div class=\"created\">"
    + alias4((helpers.shortTime || (depth0 && depth0.shortTime) || alias2).call(alias1,(depth0 != null ? depth0.created : depth0),{"name":"shortTime","hash":{},"data":data}))
    + "</div>\n	        </div>\n\n        </div>        \n        <div class=\"stats righty\">\n        	\n        	"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.start_type : stack1),"beep",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        	<div class=\"stat num main\">"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"sprint",{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n		</div>\n	</div>\n\n	<div class=\"inner-detail\">\n		<div class=\"body-stat\">\n			<span class=\"stat-label\">Max velocity</span>\n			<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.max_velocity : stack1),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">m/s</span></span>\n		</div>\n		<div class=\"body-stat\">\n			<span class=\"stat-label\">Stride frequency</span>\n			<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.strides : stack1)) != null ? stack1.frequency_median : stack1),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">str/s</span></span>\n		</div>\n		<div class=\"body-stat\">\n			<span class=\"stat-label\">Contact time</span>\n			<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.strides : stack1)) != null ? stack1.contact_median : stack1),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">s</span></span>\n		</div>\n		<div class=\"body-stat\">\n			<span class=\"stat-label\">Ground acceleration</span>\n			<span class=\"num\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data_summary : depth0)) != null ? stack1.max_z_accel : stack1),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "<span class=\"units\">m/s<super>2</super></span>\n		</div>	\n	</div>\n\n</a>\n</div>\n";
},"useData":true});

this["HbTemplates"]["templates"]["api-select"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<button class=\"btn dark select-los apiOption "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.apiEnv : depth0)) != null ? stack1.id : stack1),"prod",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-api=\"prod\">Production</button>\n<button class=\"btn dark select-los apiOption "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.apiEnv : depth0)) != null ? stack1.id : stack1),"dev",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-api=\"dev\">Dev</button>";
},"useData":true});

this["HbTemplates"]["templates"]["auth-form"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p>We have an error: "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.dev : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<!--             <div tabindex=\"-1\" data-actionbind data-action=\"changeMode\" data-target=\"forgot\" class=\"white link pseudolink showReset\" title=\"Forgot your password\">Forgot your password?</div>  -->\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <div class=\"api-def apiDef\">\n                <div class=\"api-subhead login\">Environment</div>\n                <div class=\"api-select-container apiSelectContainer\">\n"
    + ((stack1 = container.invokePartial(partials["api-select"],depth0,{"name":"api-select","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div> \n            </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "            <div tabindex=\"-1\" data-actionbind data-action=\"changeMode\" data-target=\"login\" class=\"white link pseudolink\" title=\"Already a member\">Already a member</div> \n";
},"10":function(container,depth0,helpers,partials,data) {
    return "            <div tabindex=\"-1\" data-actionbind data-action=\"changeMode\" data-target=\"login\" class=\"white link pseudolink\" title=\"Back to sign-in\">Back to sign-in</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "            <div tabindex=\"-1\" class=\"white link pseudolink\" title=\"Back to sign-in\"><a href=\"/\" data-navigate tabindex=\"-1\" class=\"white link\" title=\"Back to feed\">...or go back to your feed</a></div> \n";
},"14":function(container,depth0,helpers,partials,data) {
    return "<button class=\"btn btn-whiteline cancel-inline-login cancelLogin\" data-actionbind data-action=\"cancelLogin\">Cancel</button>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"login-frame loginFrame\">\n\n        <div class=\"auth-intro authIntro centered active\">\n            <div class=\"blurb-text intro-item introItem\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>                      \n        </div>  \n    \n        <!-- Auth message block -->\n        <div class=\"auth-message authMessage"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.messageMode : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></div>\n\n        <!-- Auth forms -->\n        <form class=\"auth-form authForm "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.logoutMode : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" action=\"/logout\" autocomplete=\"off\" autofill=\"off\" method=\"POST\">\n            <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\""
    + alias4(((helper = (helper = helpers.csrf || (depth0 != null ? depth0.csrf : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrf","hash":{},"data":data}) : helper)))
    + "\">\n            <button class=\"btn btn-blue auth-button authButton\" type=\"submit\">Log me out</button>\n        </form>\n\n        <form class=\"auth-form authForm "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.forgotMode : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" action=\"/forgot\" autocomplete=\"off\" autofill=\"off\" method=\"POST\">\n            <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\""
    + alias4(((helper = (helper = helpers.csrf || (depth0 != null ? depth0.csrf : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrf","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"login-fields\">\n                <div class=\"field-wrapper\">\n                    <input autocapitalize=\"off\" autofill=\"off\" autocorrect=\"off\" id=\"forgot_username\" maxlength=\"255\" name=\"username\" type=\"text\" value=\"\" placeholder=\"Type your email or username\" />                                \n                </div>                                \n            </div>\n            <button class=\"btn btn-blue auth-button authButton\" type=\"submit\">"
    + alias4(((helper = (helper = helpers.button || (depth0 != null ? depth0.button : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data}) : helper)))
    + "</button>\n        </form>\n\n        <form class=\"auth-form authForm "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.loginMode : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" action=\"/login\" autocomplete=\"off\" autofill=\"off\" method=\"POST\">\n            <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\""
    + alias4(((helper = (helper = helpers.csrf || (depth0 != null ? depth0.csrf : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrf","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"login-fields\">\n                <div class=\"field-wrapper\">\n                    <input autocapitalize=\"off\" autofill=\"off\" autocorrect=\"off\" id=\"username\" maxlength=\"255\" name=\"username\" type=\"text\" value=\"\" placeholder=\"Username or email address\" />                                \n                </div>                   \n                <div class=\"field-wrapper firstPass active\">\n                    <input class=\"naked-login loginPwField bottommost\" id=\"login_pw\" maxlength=\"4096\" name=\"password\" type=\"password\" placeholder=\"Password\">\n                </div>                      \n            </div>\n            <button class=\"btn btn-blue auth-button authButton\" type=\"submit\">"
    + alias4(((helper = (helper = helpers.button || (depth0 != null ? depth0.button : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data}) : helper)))
    + "</button>\n        </form>\n\n        <form class=\"auth-form authForm "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.resetWithKeyMode : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"resetPassword\" action=\"/reset/"
    + alias4(((helper = (helper = helpers.resetKey || (depth0 != null ? depth0.resetKey : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resetKey","hash":{},"data":data}) : helper)))
    + "\" autocomplete=\"off\" autofill=\"off\" method=\"POST\">\n            <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\""
    + alias4(((helper = (helper = helpers.csrf || (depth0 != null ? depth0.csrf : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"csrf","hash":{},"data":data}) : helper)))
    + "\">      \n            <div class=\"login-fields\">\n                <div class=\"field-wrapper firstPass active\">\n                    <input class=\"naked-login loginPwField bottommost\" id=\"reset_pw\" maxlength=\"4096\" name=\"password\" type=\"password\" placeholder=\"Type your new password\">\n                </div>\n                <div class=\"field-wrapper regExtras\">\n                    <input class=\"naked-login loginPwFieldRepeat regbottom\" id=\"reset_pw_repeat\" maxlength=\"4096\" name=\"password2\" type=\"password\" placeholder=\"Enter it again\">\n                </div>                     \n            </div>\n            <button class=\"btn btn-blue auth-button authButton\" type=\"submit\">"
    + alias4(((helper = (helper = helpers.button || (depth0 != null ? depth0.button : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"button","hash":{},"data":data}) : helper)))
    + "</button>\n        </form>\n\n        <!-- Error messages -->\n        <div class=\"error-messages errorMessages\">\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>                        \n        <div class=\"auth-error "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " authError\">"
    + alias4(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"error","hash":{},"data":data}) : helper)))
    + "</div>\n\n\n    <!-- Footer -->\n    <div class=\"auth-footer authFooter centered\">             \n        <div class=\"auth-tabs authTabs\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.loginMode : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.registerMode : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.forgotMode : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.forgotDoneMode : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.logoutMode : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n<!--         <div class=\"logoutFoot\">\n            <a href=\"/\" data-navigate tabindex=\"-1\" class=\"white link\" title=\"Back to feed\">...or go back to your feed</a> \n        </div>   -->        \n    </div>\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inline : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["auth-pane"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"auth-pane authPane\" style=\"display: none;\">	\n	<div class=\"close-pane closePane light\" data-actionbind data-action=\"exit\"><i class=\"ico ico-close\"></i></div>\n	<div class=\"form-container formContainer\">"
    + ((stack1 = container.invokePartial(partials["auth-form"],depth0,{"name":"auth-form","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n</div>";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["auth-shell"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<header class=\"static-header\">\n		    <div class=\"center-column\"><h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1></div>\n		</header>\n		<div class=\"center-column\">\n		    <div class=\"post-body static-body\">\n		    	"
    + alias4(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper)))
    + "\n		    </div>\n		</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"hero full-page detailHero\">\n        <div class=\"hero-image-wrapper heroImageWrapper\">\n            <div class=\"hero-img\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.loginBackground || (depth0 != null ? depth0.loginBackground : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"loginBackground","hash":{},"data":data}) : helper)))
    + "');\"></div>        \n            <div class=\"registration-wrapper\" data-view-bind=\"AuthView\">\n	            <div class=\"auth-container authContainer\"></div>\n            </div>\n        </div>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"page-container pageContainer\" id=\"auth-"
    + container.escapeExpression(((helper = (helper = helpers.authMode || (depth0 != null ? depth0.authMode : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"authMode","hash":{},"data":data}) : helper)))
    + "\">   \n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.authStatic : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["HbTemplates"]["templates"]["bookmarks-pane"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"inner-bookmarks-tab innerBookmarksTab\">\n<div class=\"bookmarks-list paginatedList\"></div>\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["editor-toolbar"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"post-toolbar\">\n    <div class=\"post-form-toolbar postFormToolbar\">\n<!--                 <button class=\"ql-hr\"><b>HR</b></button> -->\n        <button class=\"ql-bold\"><b>b</b></button>\n        <button class=\"ql-italic\"><span class=\"ed-letter italic\">i</span></button>\n        <button class=\"ql-strike\"><s>s</s></button>\n        <button class=\"ql-list\" value=\"bullet\"><i class=\"ico io-format_list_bulleted\"></i></button>\n        <button class=\"ql-list\" value=\"ordered\"><i class=\"ico io-format_list_numbered\"></i></button>\n        <button class=\"ql-link\"><i class=\"ico io-link io-rotate-45\"></i></button>                \n\n<!--                 <button class=\"ql-undo\">undo</button>\n        <button class=\"ql-redo\">redo</button> -->\n        <button class=\"\" data-actionbind data-action=\"toggleInsert\"><i class=\"ico io-image\"></i></button>\n        <button class=\"\" data-actionbind data-action=\"toggleMentions\">@</button>\n        <button class=\"pull-right\" data-actionbind data-action=\"toggleFullScreen\"><i class=\"ico io-android-expand\"></i></button>\n        \n    </div>            \n</div>\n";
},"useData":true});

this["HbTemplates"]["templates"]["explore-shell"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<button class=\"btn btn-blue circle float-right\" data-actionbind data-action=\"createNew\"><i class=\"ico ico-add\"></i></button>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"page-container pageContainer\" id=\"explore-"
    + container.escapeExpression(((helper = (helper = helpers.viewType || (depth0 != null ? depth0.viewType : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"viewType","hash":{},"data":data}) : helper)))
    + "\">\n\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showCreateNew : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"main-body explore-detail mainBody\">\n\n        <div class=\"mainPaneContent\">\n                <div class=\"center-column\">\n                    <div class=\"pager-container pagerContainer exploreFeed\">\n                        <div class=\"paginated-list paginatedList\"></div>\n                    </div>                \n                </div>\n                <div class=\"center-column breadcrumb-links breadcrumbLinks\">"
    + ((stack1 = container.invokePartial(partials["pagination-links"],depth0,{"name":"pagination-links","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n        </div>\n    </div><!-- /.mainBody --> \n    \n</div>";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["media-insert"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"media-insert mediaInsert\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n    <div class=\"media-insert-container\">\n        <div class=\"tab-pane active\" id=\"inline-"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"insert-options insertOptions\">\n    		    <div class=\"i-option embedLink embed-link-wrapper\">\n    		        <input type=\"text\" name=\"embed\" class=\"media-embed-input mediaEmbedInput\" placeholder=\"Paste a link or embed code\"/>\n    		        <button class=\"pull-right btn circle square btn-transparent embed-submit embedSubmit\">\n                        <i class=\"ico io-android-arrow-forward\"></i>\n                    </button>\n    		    </div>  \n                <div class=\"i-option\">\n                    <button class=\"btn circle square btn-grayLight upload-media insertUploadImage\" id=\"postImageUpload\"><i class=\"ico io-image\"></i></button>\n                </div>\n            </div>\n	    </div>\n        <div class=\"insert-error insertError\"></div>\n    </div>\n </div>";
},"useData":true});

this["HbTemplates"]["templates"]["menu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <div class=\"menu-subhead\">Logged in as</div>\n                        <div class=\"user-name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</div>\n                        <div class=\"org-block orgBlock\">\n                            <div class=\"org-name\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.org : stack1)) != null ? stack1.name : stack1), depth0))
    + "</div>\n                        </div>\n\n                        <div class=\"actions\">\n                            <button class=\"btn btn-fineline\" data-actionbind data-action=\"logout\">Logout</button>\n                        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <div class=\"inner-menu innerMenu\">\n    <div class=\"grid-base\">\n        <div class=\"menu-main\">\n\n            <div class=\"split-col\">\n\n                <div class=\"col top lefty c70\">\n\n                    <div class=\"menu-item-product\">\n                        <div class=\"product-main\">\n                            <h2 class=\"brand-text tm\"><a href=\"/xps\" class=\"wrapping-anchor\" data-navigate>XPS BioAnalytics</a></h2>\n                            <div class=\"subhead\">Advancing health and human performance with comprehensive biometric, biomechanical and cognitive assessment.</div>\n                        </div>\n\n\n                        <div class=\"menu-sub-item\">\n                            <div class=\"sub-product\">\n                                <a href=\"/sport\" data-navigate><h3>Sport</h3></a>\n                            </div>\n<!--                            <div class=\"sub-product\">\n                                <a href=\"/concussion\" data-navigate><h3>Concussion</h3></a>\n                            </div>                -->           \n                            <div class=\"sub-product\">\n                                <a href=\"/health\" data-navigate><h3>Healthcare</h3></a>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n                <div class=\"col c30 top righty\">\n\n                    <ul class=\"menu-actions menuActions\">\n                        <li><a class=\"wrapping-anchor\" href=\"/about\" data-navigate>About</a></li>\n                        <li><a class=\"wrapping-anchor\" href=\"/blog\" data-navigate>News</a></li>\n                        <li><a class=\"wrapping-anchor\" href=\"/casestudies\" data-navigate>Case studies</a></li>\n                        <li><a class=\"wrapping-anchor\" href=\"/contact\" data-navigate>Contact</a></li>\n                        <li><a class=\"wrapping-anchor\" href=\"/careers\" data-navigate>Careers</a></li>\n                        <li><a class=\"wrapping-anchor\" href=\"/terms\" data-navigate>Legal</a></li>\n                    </ul>\n\n\n                    <div class=\"user-block userBlock\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>    \n\n                </div>          \n            </div>\n        </div>\n\n        <div class=\"menu-footer\">\n\n            <div class=\"split-col\">\n\n                <div class=\"col top lefty c60\">\n\n                    <div class=\"ident\">\n                    \n<!--                        <div class=\"cell logo\">\n                            <a href=\"/\" rel=\"home\" class=\"wrapping-anchor nav-but navHomey\" data-navigate>\n                                <i class=\"io io-xco\"></i>\n                            </a>\n                        </div> -->\n                        <div class=\"cell details\">\n                            <div class=\"company-name\">XCO Tech Inc</div>\n            \n                            <div class=\"plain\">\n                                Centre of Excellence<br />\n                                583 Duncan Avenue West<br />\n                                Penticton, BC V2A 8E1<br />\n                                Canada\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n                <div class=\"col top righty c40\">\n                    <div class=\"menu-subscribe-container\">\n                        <div class=\"btn-container centered\">\n                            <a class=\"btn btn-large btn-dark\" href=\"/updates\" data-navigate>Get the newsletter</a>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n\n        </div>  \n\n    </div>\n\n</div>\n\n";
},"useData":true});

this["HbTemplates"]["templates"]["org-member"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"team-losenge coach\">Coach</div>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<div class=\"user-teams\">					\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.teams : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "					<div class=\"team-losenge\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda;

  return "\n<div class=\"user-teaser\"> \n    <a href=\"athletes/"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"wrapping-anchor\" data-navigate data-slug-type=\"user\">\n        <div class=\"teaser-img-container\">\n            <div class=\"profile-image small lazyload\" data-bg=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.thumbnail_url : stack1), depth0))
    + "\"></div>\n        </div>        \n        <div class=\"user-text\">\n        	<div class=\"ident pull-left\">\n				<h4 class=\"user-name\">"
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</h4>\n				"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_admin : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.teams : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n        </div>\n	        <div class=\"stats\">\n	        	<div class=\"stat num\">64</div>\n	        	<div class=\"stat num\">Last active today</div>\n	        </div>        \n    </a>\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["pagination-links"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <a href=\""
    + container.escapeExpression(((helper = (helper = helpers.prevLink || (depth0 != null ? depth0.prevLink : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"prevLink","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-subdued prev-link crumbPrev\" rel=\"prev\"><i class=\"ico io-arrow_back\"></i>Back</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <a href=\""
    + container.escapeExpression(((helper = (helper = helpers.nextLink || (depth0 != null ? depth0.nextLink : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"nextLink","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-subdued more-link crumbNext\" rel=\"next\">More<i class=\"ico io-arrow_forward\"></i></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"btn-group\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prevLink : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.nextLink : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["HbTemplates"]["templates"]["plot-nav"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "					<div class=\"table-row sprint-stride stride strideItem\" data-index="
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + ">\n						<div class=\"metric left w25\">"
    + alias4(((helper = (helper = helpers.side || (depth0 != null ? depth0.side : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"side","hash":{},"data":data}) : helper)))
    + "</div>\n						<div class=\"metric w25\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.length : depth0),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n						<div class=\"metric w25\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.contact_time : depth0),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n						<div class=\"metric last\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.frequency : depth0),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n					</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "					<div class=\"table-row sprint-split split splitItem\" data-index="
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + ">\n						<div class=\"metric left w25\">"
    + alias4(((helper = (helper = helpers.cumulative_distance || (depth0 != null ? depth0.cumulative_distance : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cumulative_distance","hash":{},"data":data}) : helper)))
    + "</div>\n						<div class=\"metric w25\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n						<div class=\"metric w25\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.cumulative_time : depth0),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n						<div class=\"metric last\">"
    + alias4((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.velocity : depth0),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n					</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"inner-plot-nav innerPlotNav\">\n	<div class=\"plot-nav-header\">\n		<div class=\"nav-tabs\">\n			<div class=\"nav-tab navTab\" data-id=\"summary\">Summary</div>\n			<div class=\"nav-tab navTab\" data-id=\"strides\">Strides</div>\n			<div class=\"nav-tab navTab\" data-id=\"splits\">Splits</div>\n		</div>\n	</div>\n	<div class=\"plot-nav-body plotNavBody\">\n		<div class=\"tab-panes\">\n			<div class=\"tab-pane tabPane\" id=\"summary\">\n				<p>This is a summary</p>\n			</div>\n			<div class=\"tab-pane active tabPane\" id=\"strides\">\n				<div class=\"act-data-table strides-table \">\n					<div class=\"header-row\">\n						<div class=\"col left w25\">Side <span class=\"units\"></span></div>\n						<div class=\"col w25\">Length <span class=\"units\"></span>m</div>\n						<div class=\"col w25\">Contact time <span class=\"units\">s</span></div>\n						<div class=\"col last\">Frequency <span class=\"units\">strides/s</span></div>\n					</div>	\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.strides : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n			</div>\n			<div class=\"tab-pane tabPane\" id=\"splits\">\n				<div class=\"act-data-table splits-table striped-stats-table\">\n					<div class=\"header-row\">\n						<div class=\"col left w25\">Distance <span class=\"units\"></span>m</div>\n						<div class=\"col w25\">Duration <span class=\"units\"></span>s</div>\n						<div class=\"col w25\">Cumulative time <span class=\"units\">s</span></div>\n						<div class=\"col last\">Avg velocity <span class=\"units\">m/s</span></div>\n					</div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.splits : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n			</div>\n		</div>		\n	</div>\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["session-detail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"page-container pageContainer\" id=\"session\">\n	<div class=\"session-detail sessionDetail\">\n		<div class=\"sub-nav subNav\">\n"
    + ((stack1 = container.invokePartial(partials["session-subnav"],depth0,{"name":"session-subnav","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n        <div class=\"session-body sessionBody\"></div>\n	</div>\n</div>";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["session-subnav"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"subnav-item act-detail\">\n		<div class=\"act-type-los type\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1), depth0))
    + "</div>\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.activity_type : stack1),"jump",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"act-type-los orientation\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.orientation : stack1), depth0))
    + "</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<div class=\"act-type-los distance\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.distance : stack1), depth0))
    + "m</div>\n			<div class=\"act-type-los start\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.type_definition : depth0)) != null ? stack1.start_type : stack1), depth0))
    + " start</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"left-subnav pull-left\">\n	<div class=\"subnav-item session-meta\">\n		<div class=\"session-name sessionCrumb\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n		<div class=\"session-description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n	</div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.type_definition : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\"right-subnav pull-right\">\n	<div class=\"actions\">\n		<button class=\"btn btn-transparent\"><i class=\"ico ico-cloud_download\"></i></button>\n	</div>\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["session-teaser"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"session-teaser sessionTeaser\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n<a href=\"/session/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"wrapping-anchor\" data-navigate>\n	<div class=\"header-block headerBlock\">\n		<h3 class=\"session-name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n		<div class=\"session-description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n	</div>\n</a>\n</div>\n";
},"useData":true});

this["HbTemplates"]["templates"]["sprint-splits"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "	<div class=\"table-row sprint-split split\">\n		<div class=\"metric left w25\">"
    + alias3(((helper = (helper = helpers.cumulative_distance || (depth0 != null ? depth0.cumulative_distance : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"cumulative_distance","hash":{},"data":data}) : helper)))
    + "</div>\n		<div class=\"metric w25\">"
    + alias3((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.duration : depth0),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n		<div class=\"metric w25\">"
    + alias3((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.cumulative_time : depth0),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n		<div class=\"metric last\">"
    + alias3((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.velocity : depth0),3,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"splits-table striped-stats-table\">\n	<div class=\"header-row\">\n		<div class=\"col left w25\">Distance <span class=\"units\"></span>m</div>\n		<div class=\"col w25\">Duration <span class=\"units\"></span>s</div>\n		<div class=\"col w25\">Cumulative time <span class=\"units\">s</span></div>\n		<div class=\"col last\">Avg velocity <span class=\"units\">m/s</span></div>\n	</div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.splits : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["HbTemplates"]["templates"]["sprint-strides"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "	<div class=\"table-row sprint-stride stride\">\n		<div class=\"metric left w25\">"
    + alias3(((helper = (helper = helpers.side || (depth0 != null ? depth0.side : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"side","hash":{},"data":data}) : helper)))
    + "</div>\n		<div class=\"metric w25\">"
    + alias3((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.length : depth0),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n		<div class=\"metric w25\">"
    + alias3((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.contact_time : depth0),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n		<div class=\"metric last\">"
    + alias3((helpers.decimalPlaces || (depth0 && depth0.decimalPlaces) || alias2).call(alias1,(depth0 != null ? depth0.frequency : depth0),2,{"name":"decimalPlaces","hash":{},"data":data}))
    + "</div>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"strides-table \">\n	<div class=\"header-row\">\n		<div class=\"col left w25\">Side <span class=\"units\"></span></div>\n		<div class=\"col w25\">Length <span class=\"units\"></span>m</div>\n		<div class=\"col w25\">Contact time <span class=\"units\">s</span></div>\n		<div class=\"col last\">Frequency <span class=\"units\">strides/s</span></div>\n	</div>	\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.strides : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["HbTemplates"]["templates"]["static-error-404"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-container pageContainer\" id=\"static-error-404\">\n<header class=\"static-header\">\n    <div class=\"center-column\">\n        <h1 class=\"post-title postTitle\">That's not there</h1>\n        <div class=\"post-subtitle\">\n            <p>That page is not accessible</p>\n        </div>\n    </div>\n</header>\n\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["static-home"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-container pageContainer\" id=\"static-landing\">\n<div class=\"hero detailHero\" data-nav-overlay=\"light\">\n    <div class=\"hero-image-wrapper heroImageWrapper\">\n        <div class=\"carousel centered\">\n\n            <div class=\"active carousel-pane carouselPane hero-img darken\" data-option=\"sport\" style=\"background-image: url('/static/assets/heroes/broad-002.jpg');\">\n                <div class=\"carousel-content\">\n                    <div class=\"grid-base\">\n                        <div class=\"center-column\">\n                        <h1 class=\"big\"><span class=\"lighter\">Breakthrough</span> precision</h1>\n                        <div class=\"standfirst\">Smarter coaching with continuous, laser-accurate motion tracking. </div>\n                            <div class=\"trailing-button buttonContainer\">\n                                <a class=\"btn btn-large btn-whiteline\" href=\"/about\" data-navigate>About XCO</a>\n                            </div>                        \n                    </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"carousel-pane carouselPane hero-img darken\" data-option=\"concussion\" style=\"background-image: url('/static/assets/heroes/concussion-2.jpg');\">\n                <div class=\"carousel-content\">\n                    <div class=\"grid-base\">\n                        <div class=\"center-column\">\n                            <h1 class=\"big\"><span class=\"lighter\">Breakthrough</span> objectivity</h1>\n                            <div class=\"standfirst\">Toward an objective, portable concussion assessment system.</div>\n                            <div class=\"trailing-button buttonContainer\">\n                                <a class=\"btn btn-large btn-whiteline\" href=\"/about\" data-navigate>About XCO</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>       \n\n            <div class=\"carousel-pane carouselPane hero-img darken\" data-option=\"health\" style=\"background-image: url('/static/assets/product/health-doc-stock-001.png');\">\n                <div class=\"carousel-content\">\n                    <div class=\"grid-base\">\n                        <div class=\"center-column\">\n                        <h1 class=\"big\"><span class=\"lighter\">Breakthrough</span> continuity</h1>\n                        <div class=\"standfirst\">Comprehensive, precision patient assessment – in and out of the clinic.</div>\n                                                    <div class=\"trailing-button buttonContainer\">\n                                <a class=\"btn btn-large btn-whiteline\" href=\"/about\" data-navigate>About XCO</a>\n                            </div>\n                    </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"carousel-controls carouselControls\">\n                <div class=\"active action borderless\" data-focus-option=\"sport\"><i class=\"io io-circle_filled\"></i></div>\n                <div class=\"action borderless\" data-focus-option=\"concussion\"><i class=\"io io-circle_filled\"></i></div>\n                <div class=\"action borderless\" data-focus-option=\"health\"><i class=\"io io-circle_filled\"></i></div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class=\"core-content mainBody\">\n\n    <section class=\"feature-section\">\n\n        <div class=\"grid-base\">\n            <div class=\"split-col\">\n                <div class=\"col top c40\">\n                    <div class=\"static-img\" style=\"background-image: url('/static/assets/product/system-items.png');\"></div>\n                    <!-- <div class=\"static-img\" style=\"background-image: url('/static/assets/about/tag-sample-photo.png');\"></div> -->\n                </div>\n                <div class=\"col top c60\">\n                    <h2>The integration of novel wearable sensor technology, data analytics and machine learning for health and human performance.</h2>\n                    <div class=\"btn-container\">\n                        <a class=\"btn btn-large btn-fineline\" href=\"/xps\" data-navigate>Learn more</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </section>\n\n\n<section class=\"promo-section\" data-nav-overlay=\"light\">\n\n    <div class=\"mini-features f2\">\n        <div class=\"feature-block centered\">                \n                <div class=\"feature-img lazyload\" style=\"background-image: url('/static/assets/heroes/cc-sample.jpg');\"></div>\n\n                <div class=\"content\">\n                    <a class=\"wrapping-anchor\" href=\"/sport\" data-navigate>\n                        <h3 class=\"feature-head\"><span class=\"subdued\">BioAnalytics for</span> Sport</h3>\n                        <div class=\"feature-sub\">Revolutionizing elite sport testing and training.</div>\n                    </a>\n                </div>\n        </div>\n        <div class=\"feature-block centered\">\n            <div class=\"feature-img lazyload\" style=\"background-image: url('/static/assets/heroes/concussion-sample.jpg');\"></div>\n                <div class=\"content\">\n                    <a class=\"wrapping-anchor\" href=\"/health\" data-navigate>\n                        <h3 class=\"feature-head\"><span class=\"subdued\">BioAnalytics for</span> Healthcare</h3>\n                        <div class=\"feature-sub\">Precision medicine and advanced, distributed patient care</div>\n                    </a>\n                </div>\n            </div>\n        </div>        \n\n</section>\n\n<section class=\"featured-block soup featuredBlock\">\n    <div class=\"center-column centered\">\n        <div class=\"feature-title-block\">\n            <h2 class=\"head\">The latest</h2>\n            <div class=\"subhead\">XCO's blog and news feed</div>\n        </div>\n        <ul class=\"blog-post-list feature short\">\n            <li class=\"post\"><a href=\"/b/33-chbc-precise-personal\" class=\"wrapping-anchor\" data-navigate><span class=\"date\">01/02/2019</span><span class=\"title\">Introducing CHBC - Precise and Personal </span></a></li>             \n            <li class=\"post\"><a href=\"/b/32-sif-round-2\" class=\"wrapping-anchor\" data-navigate><span class=\"date\">22/11/2018</span><span class=\"title\">Strategic Innovation Fund: On to round 2!</span></a></li> \n            <li class=\"post\"><a href=\"/b/30-winn-xco-2018\" class=\"wrapping-anchor\" data-navigate><span class=\"date\">13/11/2018</span><span class=\"title\">XCO receives $800,000 WINN funding</span></a></li>        \n            <li class=\"post\"><a href=\"/b/28-ibm-innovation-forum-2018\" class=\"wrapping-anchor\" data-navigate><span class=\"date\">15/10/2018</span><span class=\"title\">IBM Innovation Forum</span></a></li>\n            <li class=\"post\"><a href=\"/b/27-cpes-startup-of-year-2018\" class=\"wrapping-anchor\" data-navigate><span class=\"date\">26/05/2018</span><span class=\"title\">XCO wins 2018 CPES Startup of the Year</span></a></li>\n        </ul>\n\n        <div class=\"about-section\">\n            <div class=\"btn-container centered\">\n                <a class=\"btn btn-large btn-dark\" href=\"/updates\" data-navigate>Get the newsletter</a>\n            </div>\n        </div>\n\n    </div>\n\n</section>\n\n<footer class=\"page-footer pageFooter centered\">\n    <ul class=\"footer-els footer-text\">\n        <li>&copy; 2018 XCo Tech Inc</li>\n        <li><a class=\"wrapping-anchor\" href=\"/about\" data-navigate>About</a></li>\n        <li><a class=\"wrapping-anchor\" href=\"/careers\" data-navigate>Careers</a></li>\n        <li><a class=\"wrapping-anchor\" href=\"/terms\" data-navigate>Terms</a></li>\n    </ul>\n</footer>\n                \n</div>\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["static-landing"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-container pageContainer\" id=\"static-landing\">\n    <div class=\"hero full-page detailHero\">\n        <div class=\"hero-image-wrapper heroImageWrapper\">\n            <div class=\"landing-hero-background\"></div>        \n            <div class=\"landing-content centered\">\n                <div class=\"heading centered\">\n                    <div class=\"dash-logo\" style=\"background-image: url('/static/assets/ico/dash-logo-white.png');\"></div>\n                </div>\n\n                <button class=\"btn btn-overlayDark full\" data-actionbind data-action=\"fireAuthModal\">Sign in</button>\n                \n                    <a class=\"app-link app-ios\" href=\"https://app.appsflyer.com/id305343404?pid=tumblr_internal&amp;c=signup_page&amp;af_sub4=https%253A%252F%252Fwww.tumblr.com%252F\" aria-label=\"Download Tumblr on the App Store\" target=\"_blank\" rel=\"noopener noreferrer\"></a>\n\n            </div>\n        </div>\n    </div>\n\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["static-shell"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "-"
    + container.escapeExpression(((helper = (helper = helpers.subPage || (depth0 != null ? depth0.subPage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"subPage","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"page-container pageContainer\" id=\"static-"
    + container.escapeExpression(((helper = (helper = helpers.viewType || (depth0 != null ? depth0.viewType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"viewType","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subPage : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["static-support"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-container pageContainer\" id=\"static-support\">\n    <header class=\"static-header\">\n        <div class=\"center-column\">\n            <h1 class=\"post-title postTitle\">Using XPS Dash</h1>\n            <div class=\"post-subtitle\"><!-- bodycontent --></div>\n        </div>\n    </header>   \n    <div class=\"center-column\">\n        <div class=\"post-body static-body\">\n        </div>\n    </div>\n\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["system-detail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"page-container pageContainer\" id=\"system\">\n    <div class=\"main-body mainBody\">\n\n        <div class=\"mainPaneContent\">\n                <div class=\"center-column\">\n                    <div class=\"pager-container pagerContainer feed\">\n                        <div class=\"paginated-list paginatedList\"></div>\n                    </div>                \n                </div>\n                <div class=\"center-column breadcrumb-links breadcrumbLinks\">"
    + ((stack1 = container.invokePartial(partials["pagination-links"],depth0,{"name":"pagination-links","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n        </div>\n    </div><!-- /.mainBody --> \n    \n</div>";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["system-list-item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"system-list-item systemListItem\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n	<div class=\"system-name systemName\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n	<div class=\"system-url systemUrl\">"
    + alias4(((helper = (helper = helpers.hostname || (depth0 != null ? depth0.hostname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hostname","hash":{},"data":data}) : helper)))
    + "</div>\n	<div class=\"system-ports systemPorts\">websockets port: "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.ports : depth0)) != null ? stack1.ws : stack1), depth0))
    + "</div> \n</div>\n";
},"useData":true});

this["HbTemplates"]["templates"]["tag-detail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"page-container pageContainer\" id=\"tag\">\n    <div class=\"mainPaneContent\">\n            <div class=\"center-column\">\n                <div class=\"pager-container pagerContainer feed\">\n                    <div class=\"paginated-list paginatedList\"></div>\n                </div>                \n            </div>\n            <div class=\"center-column breadcrumb-links breadcrumbLinks\">"
    + ((stack1 = container.invokePartial(partials["pagination-links"],depth0,{"name":"pagination-links","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>\n    </div>\n    <button class=\"btn btn-blue circle float-right\" data-actionbind data-action=\"startTagCreate\"><i class=\"ico ico-add\"></i></button>\n</div>";
},"usePartial":true,"useData":true});

this["HbTemplates"]["templates"]["tag-list-item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"tag-list-item systemListItem\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n	<div class=\"tag-name tagName\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n	<div class=\"tag-url tagUrl\">"
    + alias4(((helper = (helper = helpers.serial_num || (depth0 != null ? depth0.serial_num : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serial_num","hash":{},"data":data}) : helper)))
    + "</div>\n	<div class=\"tag-org tagOrg\"></div> \n</div>\n";
},"useData":true});

this["HbTemplates"]["templates"]["tag-modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"tag-modal tagModal modal\" style=\"display: none;\" tabindex=\"-1\">\n\n    <div class=\"modal-card mini-card\">\n\n        <div class=\"modal-header\">\n            <h2>New tag</h2>\n            <button data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close-modal-card btn btn-transparent\"><i class=\"ico ico-close\"></i></button>      \n        </div>\n\n        <div class=\"modal-body-container\">\n            <div class=\"modal-body modal-body\">\n          \n                <div class=\"modal-body-container\">\n                    \n                    <div class=\"modal-body modal-body modalBody start\">\n                        <div class=\"generic-body-content tagBody\">\n\n                            <div class=\"tag-create-form tagCreateForm\">\n\n                                <div class=\"create-fields\">\n                                    <div class=\"field-wrapper\">\n                                        <div class=\"field-label inline\">Tag name</div>\n                                        <input class=\"plain-input tagName\" id=\"tagName\" autocomplete=\"off\" autocapitalize=\"off\" autocorrect=\"off\" autofill=\"off\" maxlength=\"255\" name=\"name\" type=\"text\" value=\"\" placeholder=\"Identifiable, user-facing tag ID\"/>\n                                    </div>   \n\n                                    <div class=\"field-wrapper\">\n                                        <div class=\"org-selector orgSelector\" data-actionbind data-action=\"openOrgSelector\">Select an organization</div>\n                                    </div>  \n\n                                </div>\n                            </div>\n\n\n                        </div>      \n                    </div>\n                </div>\n\n             </div>\n        </div>\n         <div class=\"modal-footer dark\">\n            <button class=\"btn btn-red actionButton\" data-actionbind data-action=\"save\">Save</button>\n        </div>\n                \n</div>\n\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["tag"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"tag\"><a class=\"wrapping-anchor activeTag\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.display || (depth0 != null ? depth0.display : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"display","hash":{},"data":data}) : helper)))
    + "\" href=\"/tag/"
    + alias4(((helper = (helper = helpers.slug || (depth0 != null ? depth0.slug : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data}) : helper)))
    + "\" data-navigate>"
    + alias4(((helper = (helper = helpers.display || (depth0 != null ? depth0.display : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"display","hash":{},"data":data}) : helper)))
    + "</a></li>\n";
},"useData":true});

this["HbTemplates"]["templates"]["topnav"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " transparent";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"inner-nav"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.user : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n  \n    <div class=\"grid-base\">\n      <div class=\"top-left topLeft pull-left navFade\">    \n\n          <div class=\"nav-el navEl homey\">\n              <a href=\"/\" rel=\"home\" class=\"nav-but navHomey\" data-navigate>\n                  <span class=\"brand-text brandText\">xco.</span>\n              </a>\n          </div>        \n      </div>\n\n      <div class=\"top-right topRight pull-right\">\n\n          <div class=\"nav-el nav-menu navMenu navEl navFade\">\n              <a class=\"btn nav-but overlay nrn-item-normal rnItem\" href=\"/contact\" data-navigate>Contact</a>            \n          </div>\n\n          <div class=\"nav-el menu-nav-action menuNavAction navEl\">\n              <button class=\"nav-but menu-toggle menuToggle\" data-actionbind data-action=\"toggleMenu\">\n                <span class='toggle-btn'>Menu</span>\n              </button>\n          </div>                        \n\n      </div>\n    </div>\n\n</div> ";
},"useData":true});

this["HbTemplates"]["templates"]["user-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "if";
},"3":function(container,depth0,helpers,partials,data) {
    return " no-image";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return "<div class=\"page-container pageContainer\" id=\"user-detail\">                \n    <div class=\"page-wrapper\">        \n\n        <header class=\"profile-header hero-content profileHeader\">\n            <div class=\"profile-card centered detailCenter heroContent\" itemprop=\"author\" itemscope itemtype=\"http://schema.org/Person\">\n                <div class=\"profile-text center-column centered profileText "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.hero : depth0)) != null ? stack1.imageUrl : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                    <h1 class=\"user-name fullName heroContentEl\">"
    + alias2(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</h1>\n                </div>\n\n                <div class=\"profile-image-container profileImageContainer heroContentEl"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.mainImageUrl : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-switch=\"tab\" data-target=\"#home-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                    <img src=\""
    + alias2(((helper = (helper = helpers.mainImageUrl || (depth0 != null ? depth0.mainImageUrl : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"mainImageUrl","hash":{},"data":data}) : helper)))
    + "\" style=\"background-image: url('"
    + alias2(((helper = (helper = helpers.mainImageUrl || (depth0 != null ? depth0.mainImageUrl : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"mainImageUrl","hash":{},"data":data}) : helper)))
    + "');\" alt=\""
    + alias2(((helper = (helper = helpers.fullName || (depth0 != null ? depth0.fullName : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"fullName","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias2(((helper = (helper = helpers.fullName || (depth0 != null ? depth0.fullName : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"fullName","hash":{},"data":data}) : helper)))
    + "\" class=\"profile-image profileImage\"/>                           \n                </div> \n            </div> <!-- /.profile-card -->\n        </header>\n\n        <div class=\"main-body mainBody\">\n            <div class=\"center-column\">\n                <div class=\"pager-container pagerContainer\">\n                    <div class=\"paginated-list paginatedList\"></div>\n                </div>                \n                \n            </div>\n        </div>            \n\n    </div>\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["user-modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"user-modal userModal modal\" style=\"display: none;\" tabindex=\"-1\">\n\n    <div class=\"modal-card mini-card\">\n\n        <div class=\"modal-header\">\n            <h2>Add a new user</h2>\n            <button data-dismiss=\"modal\" aria-hidden=\"true\" class=\"close-modal-card btn btn-transparent\"><i class=\"ico ico-close\"></i></button>      \n        </div>\n\n        <div class=\"modal-body-container\">\n            <div class=\"modal-body modal-body\">\n          \n                <div class=\"modal-body-container\">\n                    \n                    <div class=\"modal-body modal-body modalBody start\">\n                        <div class=\"generic-body-content\">\n\n                            <div class=\"tag-create-form userCreateForm\">\n\n                                <div class=\"create-fields\">\n                                    <div class=\"field-wrapper\">\n                                        <div class=\"field-label inline\">Full name</div>\n                                        <input class=\"plain-input fullName\" id=\"fullName\" autocomplete=\"off\" autocapitalize=\"off\" autocorrect=\"off\" autofill=\"off\" maxlength=\"255\" name=\"name\" type=\"text\" value=\"\" placeholder=\"Start typing...\"/>\n                                    </div>                                   \n\n <!--                                    <div class=\"field-wrapper\">\n                                        <div class=\"org-selector orgSelector\" data-actionbind data-action=\"openOrgSelector\">Add to teams</div>\n                                    </div>   -->\n\n                                </div>\n                            </div>\n\n\n                        </div>      \n                    </div>\n                </div>\n\n             </div>\n        </div>\n         <div class=\"modal-footer dark\">\n            <button class=\"btn btn-red actionButton\" data-actionbind data-action=\"saveUser\">Save</button>\n        </div>\n                \n</div>\n\n</div>";
},"useData":true});

this["HbTemplates"]["templates"]["user-teaser"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"user-card authCard\">\n    <a href=\""
    + alias4(((helper = (helper = helpers.absoluteUrl || (depth0 != null ? depth0.absoluteUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"absoluteUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"wrapping-anchor\" data-navigate data-slug-type=\"user\">\n        <div class=\"auth-text\">\n            <h4 class=\"author-name\" itemprop=\"author\">"
    + alias4(((helper = (helper = helpers.fullName || (depth0 != null ? depth0.fullName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fullName","hash":{},"data":data}) : helper)))
    + "</h4>\n            <div class=\"byline\">"
    + ((stack1 = (helpers.truncate || (depth0 && depth0.truncate) || alias2).call(alias1,(depth0 != null ? depth0.byLine : depth0),80,{"name":"truncate","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n        </div>\n\n        <div class=\"user-img-container\">\n            <div class=\"profile-image medium lazyload\" data-bg=\""
    + alias4(((helper = (helper = helpers.mainImageUrl || (depth0 != null ? depth0.mainImageUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mainImageUrl","hash":{},"data":data}) : helper)))
    + "\"></div>\n        </div>        \n\n    </a>\n\n\n</div>";
},"useData":true});

return this["HbTemplates"];

});