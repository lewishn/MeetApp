var startDatepicker;
var endDatepicker;
var startDate, endDate;
var highlight6 = {};
var highlight = {};
var mode;
var startTime, endTime;
var startDateInfo, endDateInfo;
var startTimeInfo, endTimeInfo;
var valid = {};
var tally = {};

var weekday = ["SUN", "MON", "TUE", "WED" , "THU", "FRI", "SAT"];
var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var displayDay;

$(function() {
	//console.log("YES?");
	
	
	$(document).ajaxStop(function()
	{
		getUserInfo();
		//console.log("I CAN SAFELY START NOW!");
		
		if (eventInfo["finalize"])
		{
			$("#userMessage").hide();
			$("#finalize").hide();
			$("#submit").hide();
			$("#optionbox").hide();
			$("#commentbox").hide();
			$("#infoMessage").html("Your event will happen on : " + eventInfo["finalize"]);
			$("#optionMessage").addClass('text-center');
			$("#title").html(eventInfo["name"]);
			$("#duration").html(eventInfo["desc"]);
		}
		else
		{
			// null event, invalid link
			if (!eventInfo["startD"])
			{
				window.location.href = "manage.php";
			}
			
			
			customlayout();
			editable();
			getVar();
			
			//option setup
			initOption();
			clickHourlyButton();
			clickDailyButton();
			handleClickUpdate();
		
			// normal setup
		
			// valid grid
			getValidCell();
		
			drawCorrectGrid();
			drawFace();
		}
		
	});

	drawMap();	
});

function drawMap() {
	// change lat/long here
	var latitude = 40;
	var longitude = -80;

	if (!isAdmin) {
		var myLatlng = new google.maps.LatLng(latitude, longitude);
		var geocoder = new google.maps.Geocoder();
		var s = "<div class='bs-component'><label class='control-label'>Location:<span id='locdata'></span></label></div><div id='map' style='width: 100%; height: 400px;''></div>";
		geocoder.geocode({'latLng': myLatlng}, function(results) {
			$("#locdata").text(" " + results[0].formatted_address);
		});

		$("#map-area").html(s);
		$('#map').locationpicker({
        	location: {latitude:latitude, longitude:longitude},
        	radius: 0,
        	enableAutocomplete: true,
       		onchanged: function (currentLocation, radius, isMarkerDropped) {
	            // Changed Longitude and Latitude
	            var latitude = currentLocation.latitude;
	            var longitude = currentLocation.longitude;
      		}
		});
		/*
		var myLatlng = new google.maps.LatLng(latitude, longitude);
		var geocoder = new google.maps.Geocoder();
		var s = "<label class='control-label'>Location:</label><span id='locdata'></span><div id='map-canvas' style='width: 100%; height:400px;''></div>";
		$("#map-area").html(s);
		geocoder.geocode({'latLng': myLatlng}, function(results) {
			$("#locdata").text(" " + results[0].formatted_address);
		});
		var map;
		function initialize() {
			var mapOptions = {
			  center: myLatlng,
			  zoom: 8
			};
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			
			//=====Initialise Default Marker    
			var marker = new google.maps.Marker({
			    position: myLatlng,
			    map: map,
			    title: "Let's Meet Up Here"
			});
			
		}
		google.maps.event.addDomListener(window, 'load', initialize);
		*/
	} else {
		var s = "<div class='bs-component'><div class='form-group'><label class='control-label'>Location:</label>" + 
			"<input type='text' class='form-control' id='map-address'/></div></div>" +
			"<div id='map' style='width: 100%; height: 400px;''></div>";

		$("#map-area").html(s);
		$('#map').locationpicker({
        	location: {latitude:latitude, longitude:longitude},
        	radius: 0,
        	inputBinding: {
            locationNameInput: $('#map-address')
        },
        enableAutocomplete: true,
        onchanged: function (currentLocation, radius, isMarkerDropped) {
            // Changed Longitude and Latitude
            var latitude = currentLocation.latitude;
            var longitude = currentLocation.longitude;

            //send to backend and update db here
            
        }
		});
	}
}

function drawFace()
{
	$("#face").html(""); // clear all face;
	
	var html = "<br /><br />";
	
	for (var key in eventResponse)
	{
		// get all response from other
		if (key != uid)
		{			
			var faceName = idToName[key];
			var faceComment = eventComment[key];
			
			//console.log(faceName,faceComment);
			
			var append = "<div uid = "+key+" class = 'row showFace'>"+
				"<div class = 'col-md-4'>"+
				"<img src = 'nyan.jpg' class = 'img-rounded img-responsive'>"+
				"</div>"+
				"<div class = 'col-md-8'>"+
				"<h5>"+faceName+"</h5>"+
				"<h6>"+faceComment+"</h6>"+
				"</div></div>";
			
			html = html + append;
				
		}
	}
	
	$("#face").html(html);
	
	$(".showFace").hover(
		function() {
			$(this).addClass('bg-primary');
			//console.log("HOVER ON",$(this).attr('uid'));
			
			// draw their tables
			for (var key in eventResponse)
			{
				// get all response from other
				if (key == $(this).attr('uid'))
				{
					var temp = eventResponse[key];
					for (var i = 0; i < temp.length; i++)
					{
						var id = temp[i];
						//console.log("ID = ",id);
						if ($("td[time = "+id+"]").hasClass("success"))
						{
							$("td[time = "+id+"]").addClass("info");
						}
						else $("td[time = "+id+"]").addClass("bg-primary");
					}
				}
			}
		}, 
		function(){
			$(this).removeClass('bg-primary');
			$("td").removeClass('bg-primary');
			$("td").removeClass('info');
		}
	);
}
	
function customlayout()
{
	
	if (isAdmin == false)
	{
		$("#optionMessage").hide();
		$("#finalize").hide();
		$("#optionbox").addClass('invisible');
	}
	else
	{
		$("#userMessage").hide();
	}
}

function editable()
{
	if (isAdmin)
	{
		$("#title").editable();
		$("#duration").editable();
	}
}

function getVar()
{
	startDate = eventInfo["startD"];
	endDate = eventInfo["endD"];
	//console.log("Before : ",startDate,endDate);
	startDate = new Date(Number(startDate));
	endDate = new Date(Number(endDate));
	//console.log("After : ",startDate,endDate);
	
	startTime = eventInfo["startT"];
	endTime = eventInfo["endT"];
	startTime = Number(startTime);
	endTime = Number(endTime);
	
	mode = eventInfo["mode"];
	displayDay = eventInfo["displayDay"];
	
	if (mode == "sixty")
	{
		if (eventResponse[uid])
		for (var i = 0; i < eventResponse[uid].length; i++)
			highlight6[eventResponse[uid][i]] = 1;
	}
	if (mode == "daily")
	{
		if (eventResponse[uid])
		for (var i = 0; i < eventResponse[uid].length; i++)
			highlight[eventResponse[uid][i]] = 1;
	}
	
	$("#comment").val(eventComment[uid]);
	if (mode == "sixty") $("#sixty").prop("checked",true);
	if (mode == "daily") $("#daily").prop("checked",true);
	
	$("#title").html(eventInfo["name"]);
	$("#duration").html(eventInfo["desc"]);
}

function initOption()
{
	startDatepicker = $(" #startDate" ).datepicker({
		dateFormat: 'dd-mm-yy',
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		onSelect: function(dateText, inst) 
		{
			//startDate = $(this).datepciker('getdate');
			startDate = new Date(Date.parse($(this).datepicker('getDate')));
		}
	});
	
	endDatepicker = $(" #endDate" ).datepicker({
		dateFormat: 'dd-mm-yy',
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		onSelect: function(dateText, inst) 
		{
			//endDate = new Date(dateText);
			endDate = new Date(Date.parse($(this).datepicker('getDate')));
			if (endDate < startDate) endDate = startDate;
		},
		
	});
	
	var myDate = new Date(startDate.getTime());
	var date = ('0'+ myDate.getDate()).slice(-2) + '-' + ('0'+ (Number(myDate.getMonth())+1)).slice(-2) + '-' + myDate.getFullYear() ;
	$("#startDate").val(date);
	
	myDate = new Date(endDate.getTime());
	date = ('0'+ myDate.getDate()).slice(-2) + '-' + ('0'+ (Number(myDate.getMonth())+1)).slice(-2) + '-' + myDate.getFullYear() ;
	$("#endDate").val(date);
	
	$("#from").val(startTime);
	$("#to").val(endTime);
	// init day of the week
	
	//console.log("DISPLAY DAY");
	for (var i = 0; i <= 6; i++)
	{
		
		$("#"+i)[0].checked = displayDay[i];
		//$("#"+i)[0].prop('checked',true);
	}
}

function getValidCell()
{
	if (!isAdmin)
	{
		if (eventResponse[eventInfo["ownerid"]])
		{
			for (var i = 0; i < eventResponse[eventInfo["ownerid"]].length; i++)
				valid[eventResponse[eventInfo["ownerid"]][i]] = 1;
		}
		
	}
	//console.log("VALID CELL");
	//console.log(valid);
}

function isValid(x)
{
	if (isAdmin) return true;
	else
	{
		if (valid[x] == 1)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

function repaint()
{
	//console.log("REPAINT HOURLY");
	//console.log(highlight6);
	for (var x in highlight6)
	{
		var temp = new Date(Number(x));
		var elem = $("td[time = "+x+"]");
		if (elem.length)
		{
			elem.addClass('success');
		}
		else delete highlight6[x];	
	}
}

function clickHourlyButton()
{
	$("#sixty").click(function () 
	{
		//console.log("MODE = SIXTY");
		mode = "sixty";
		$("#timepicker").show();
		$("#daily").prop('checked',false);
	});
}

function clickDailyButton()
{
	$("#daily").click(function ()
	{
		//console.log("MODE = DAILY");
		mode = "daily";
		$("#timepicker").hide();
		$("#sixty").prop('checked',false);
	});
}

function repaintDaily()
{
	for (var x in highlight)
	{
		var temp = new Date(Number(x));
		
		var elem = $("td[time = "+x+"]");
		if (elem.length)
		{
			elem.addClass('success');
		}
		else delete highlight[x];	
	}
}

function drawHourlyTable()
{
			
			// get info about range of time
			
			//console.log("DRAW GRID?");
			//console.log(startTime," -> ", endTime);
			//console.log(startDate," -> ", endDate);
			
			startDateInfo = new Date(startDate);
			endDateInfo = new Date(endDate);
			startTimeInfo = startTime;
			endTimeInfo = endTime;
			// draw table
			
			// 1. clear old table
			$("#grid").html("");
			// 2. draw new table
			var row = 0, col = 0;
			
			while (startDate <= endDate)
			{
				var curDate = startDate;
				var day = curDate.getDay();
				if (displayDay[day] == true)
				{
					// valid day to display
					col = 0;
					row++;
					//console.log("ROW = " + row);
					
					// add new row
					var tr = $("<tr></tr>");
					
					// add date
					var getday = curDate.getDate();
					var getmonth = curDate.getMonth()+1;
					
					col++;
					var date = "<td r = '"+row+"' c = '"+col+"' class = 'warning date'>" + weekday[day] + " " + getday+"/"+getmonth+"</td>";
					//console.log(date);
					
					tr.append(date);
					// add time
					
					var isRowEmpty = true;
					//console.log("DRAWING SPECIFIC TIME");
					for (var i = startTime; i <= endTime; i++)
					{
							
						col++;
						var x = i.toString();
						if (i < 10) x = "0" + x;
						
						var tempDate = curDate;
						curDate.setHours(i);
						var uniqueID = curDate.getTime();
						if (isValid(uniqueID)) isRowEmpty = false;
						
						var td;
						if (!isValid(uniqueID))
						{
							td = "<td class = 'invisible'>xxxxx</td>";
						}
						else td = "<td time = '"+uniqueID+"' r = '"+row+"' c = '"+col+"' class = 'time'>" + x +":00 </td>";
						//console.log(td);
						tr.append(td);
					}
					
					if (!isRowEmpty) $("#grid").append(tr);
					
				}
				
				var nextDate = startDate.setDate(startDate.getDate()+1);
				startDate = new Date(nextDate);
				startDate.setHours(0);
			}
			
			//console.log(row,col);
			// after drawing table, try repainting some
			repaint();
			////console.log("FROM 1");
			showPeopleNumber();
			// done repainting
			var down = false;
			
			var color = 0;
			// mousedown
			$(".time").mousedown(function (){
				down = true;
				var id = $(this).attr("time");
				if (id in highlight6)
				{
					color = 0; 
					$(this).removeClass("success");
					delete highlight6[id];
					
				}
				else 
				{
					color = 1;
					$(this).addClass("success");
					highlight6[id] = { row: Number($(this).attr("r")), col: Number($(this).attr("c"))};
					
				}
				////console.log("FROM 2");
				showPeopleNumber();
			});
			
			// mouseover
			$(".time").mouseover(function (){
				if (down == true)
				{
					var id = $(this).attr("time");
					
					if (id in highlight6)
					{
						if (color == 0)
						{
							$(this).removeClass("success");
							delete highlight6[id];
							
						}
					}
					else
					{
						if (color == 1)
						{
							$(this).addClass("success");
							highlight6[id] = { row: Number($(this).attr("r")), col: Number($(this).attr("c"))};
							
						}
					}
					////console.log("FROM 3");
					showPeopleNumber();
				}
				else
				{
					var id = $(this).attr("time");
					if (id in highlight6) ; 
					else $(this).addClass("success");
				}
				
			});
			
			// mouseout
			$(".time").mouseout(function (){
				if (down == false)
				{
					var id = $(this).attr("time");
					
					if (id in highlight6) ;
					else $(this).removeClass("success");
					////console.log("FROM 4");
				}
				
			});
			
			// mouse up
			$(".time").mouseup(function (){
				down = false;
				
				// update text area
				
				var text = "";
				for (var x in highlight6)
				{
					var temp = new Date(Number(x));
					
					var y = highlight6[x];
					var add = "ID = " + x + "DATE : " + temp.getDate() + "/" + (Number(temp.getMonth())+1).toString() + " TIME " + temp.getHours() +" ROW = " + y.row + " COL = " + y.col + "\n";
					text += add;
				}
				
				$("#highlight").val(text);
				////console.log("FROM 5");
				showPeopleNumber();
			});
			
			//click
			$(".date").click(function () {
				var currentRow = $(this).attr("r");
				
				var allHighlighted = true;
				
				for (var i = 2; i <= col; i++)
				{
					var id = $("td[r = "+currentRow+"][c = "+i+"]").attr("time");
					
					if (id in highlight6) ; 
					else allHighlighted = false;
				}
				
				if (allHighlighted == true)
				{
					for (var i = 2; i <= col; i++)
					{
						var id = $("td[r = "+currentRow+"][c = "+i+"]").attr("time");
						
						delete highlight6[id];
						$("td[r = "+currentRow+"][c = "+i+"]").removeClass("success");
					}
				}
				else
				{
					for (var i = 2; i <= col; i++)
					{
						var id = $("td[r = "+currentRow+"][c = "+i+"]").attr("time");
						
						if (id in highlight6);
						else 
						{
							$("td[r = "+currentRow+"][c = "+i+"]").addClass("success");
							highlight6[id] = { row: currentRow, col: i};
						}
					}
				}
				////console.log("FROM 6");
				showPeopleNumber();
			});
}

function drawDailyTable()
{
			startDateInfo = new Date(startDate);
			endDateInfo = new Date(endDate);
			
			////console.log(startDate, startDate.getTime());
			////console.log(startDateInfo, startDateInfo.getTime());
			var row = 0,col = 0;
			// clear table
			$("#grid").html("");
			
			// draw day of the week
			row++; col = 0;
			var tr = $("<tr></tr>");
			
			for (var i = 0; i <= 6; i++)
			{
				col++;
				var text = weekday[i];
				var td = "<td r = "+row+" c = "+col+" class = 'warning date'>"+text+"</td>";
				tr.append(td);
			}
			$("#grid").append(tr);
			// loop through each date
			
			tr = $("<tr></tr>");
			
			row++; col = 0; startDay = 0;
			while (startDate <= endDate)
			{
				////console.log(startDate,endDate, startDate == endDate);
				col++;
				//console.log(startDate, startDate.getTime());
				var curDate = startDate;
				//console.log(curDate, curDate.getTime());
				var day = curDate.getDay();
				
				while (startDay < day)
				{
					var blank = "<td>&nbsp;</td>";
					tr.append(blank);
					startDay++;
					col++;
				}
				
				var showDate = curDate.getDate();
				var showMonth = monthArray[curDate.getMonth()];
				var id = curDate.getTime();
				//console.log(curDate,id);
				var td;
				if (isValid(id))
				{
					td = "<td r = "+row+" c = "+col+" time = "+id+" class = 'time'>"+showDate+" "+showMonth+"</td>";
				}
				else
				{
					td = "<td class = 'invisible'>xxxxx</td>";
				}
				startDay++;
				tr.append(td);
				
				if (day == 6)
				{
					$("#grid").append(tr);
					tr = $("<tr></tr>");
					row++;
					col = 0;
					startDay = 0;
				}
				else
				{
					var tempDate = new Date();
					tempDate.setDate(curDate.getDate()+1);
					
					if (tempDate.getDate() == 1 )
					{
						$("#grid").append(tr);
						tr = $("<tr></tr>");
						row++;
						col = 0;
						startDay = 0;
					}
					else if (curDate.getTime() == endDate.getTime())
					{
						$("#grid").append(tr);
					}
				}
				
				
				
				
				var nextDate = startDate.setDate(startDate.getDate()+1);
				startDate = new Date(nextDate);
			}
			
			col = 7;
			//console.log("ROW = " + row + " COL = " + col);
			repaintDaily();
			var down = false;
			showPeopleNumber();
			var color = 0;
			// mousedown
			$(".time").mousedown(function (){
				down = true;
				var id = $(this).attr("time");
				
					if (id in highlight)
					{
						color = 0; 
						$(this).removeClass("success");
						delete highlight[id];
					}
					else 
					{
						color = 1;
						$(this).addClass("success");
						highlight[id] = { row: Number($(this).attr("r")), col: Number($(this).attr("c"))};
					}
				showPeopleNumber();
				
			});
			
			// mouseover
			$(".time").mouseover(function (){
				if (down == true)
				{
					var id = $(this).attr("time");
					
					if (id in highlight)
					{
						if (color == 0)
						{
							$(this).removeClass("success");
							delete highlight[id];
						}
					}
					else
					{
						if (color == 1)
						{
							$(this).addClass("success");
							highlight[id] = { row: Number($(this).attr("r")), col: Number($(this).attr("c"))};
						}
					}
					showPeopleNumber();
				}
				else
				{
					var id = $(this).attr("time");
					if (id in highlight) ; 
					else $(this).addClass("success");
				}
			});
			
			// mouseout
			$(".time").mouseout(function (){
				if (down == false)
				{
					var id = $(this).attr("time");
					
					if (id in highlight) ;
					else $(this).removeClass("success");
				}
			});
			// mouse up
			$(".time").mouseup(function (){
				down = false;
				
				// update text area
				
				var text = "";
				for (var x in highlight)
				{
					var temp = new Date(Number(x));
					
					var y = highlight[x];
					var add = "ID = "+ x + "DATE : " + temp.getDate() + "/" + (Number(temp.getMonth())+1).toString() + " TIME " + temp.getHours() +" ROW = " + y.row + " COL = " + y.col + "\n";
					text += add;
				}
				
				$("#highlight").val(text);
				showPeopleNumber();
			});
			
			//click
			$(".date").click(function () {
				var currentCol = $(this).attr("c");
				
				var allHighlighted = true;
				
				for (var i = 2; i <= row; i++)
				{
					var id = $("td[r = "+i+"][c = "+currentCol+"]").attr("time");
					
					if (id in highlight) ; 
					else allHighlighted = false;
				}
				
				if (allHighlighted == true)
				{
					for (var i = 2; i <= row; i++)
					{
						var id = $("td[r = "+i+"][c = "+currentCol+"]").attr("time");
						
						delete highlight[id];
						$("td[r = "+currentRow+"][c = "+i+"]").removeClass("success");
					}
				}
				else
				{
					for (var i = 2; i <= row; i++)
					{
						var id = $("td[r = "+i+"][c = "+currentCol+"]").attr("time");
						
						if (id in highlight);
						else 
						{
							$("td[r = "+i+"][c = "+currentCol+"]").addClass("success");
							highlight[id] = { row: i, col: currentCol};
						}
					}
				}
				showPeopleNumber();
			});
}

function drawCorrectGrid()
{
	if (mode == "sixty") drawHourlyTable();
	if (mode == "daily") drawDailyTable();
}


function handleClickUpdate()
{
	$( "#update" ).click(function() {
		getDateDayInfo();
		if (mode == "sixty")
		{
			drawHourlyTable();
		}
		
		if (mode == "daily")
		{
			drawDailyTable();
		}
	});
}

function getDateDayInfo()
{
	//console.log("Update button clicked");
		
		// get info about range of date
	startDate = new Date(Date.parse($("#startDate").datepicker('getDate')));
	endDate = new Date(Date.parse($("#endDate").datepicker('getDate')));
	if (endDate < startDate)
	{
		endDate = new Date(startDate.getTime());
		
		var myDate = new Date(endDate.getTime());
		date = ('0'+ myDate.getDate()).slice(-2) + '-' + ('0'+ (Number(myDate.getMonth())+1)).slice(-2) + '-' + myDate.getFullYear() ;
		$("#endDate").val(date);
	}
	
	//console.log(startDate);
	//console.log(endDate);
	
	// get info about day of the week
	displayDay = [true, true, true, true, true, true, true];
	
	for (var i = 0; i <= 6; i++)
	{
		displayDay[i] = $("#" + i)[0].checked;
	}
	startTime = $( "#from" ).val();
			endTime = $("#to").val();
			startTime = Number(startTime);
			endTime = Number(endTime);
			
	if (endTime < startTime)
	{
		endTime = startTime;
		$("#to").val(endTime);
	}
	//console.log(displayDay);
}

function showPeopleNumber()
{
	tally = {}; // reset tally
	////console.log(eventResponse);
	
	//console.log("IDTONAME = ",idToName);
	
	for (var key in eventResponse)
	{
		// get all response from other
		if (key != uid && eventResponseMode[key] == mode)
		{
			var temp = eventResponse[key];
			for (var i = 0; i < temp.length; i++)
			{
				var id = temp[i];
				if (tally[id]) tally[id].push(idToName[key]);
				else
				{
					tally[id] = [];
					tally[id].push(idToName[key]);
				}
			}
		}
	}
	
	//console.log("TALLY FROM OTHER",tally);
	
	// get MY response from highlight array
	if (mode == "sixty")
	{
		//console.log("MY TALLY",highlight6);
		for (var x in highlight6)
		{
			if (tally[x]) tally[x].push(uname);
			else
			{
				tally[x] = [];
				tally[x].push(uname);
			}
		}
	}
	else if (mode == "daily")
	{
		for (var x in highlight)
		{
			if (tally[x]) tally[x].push(uname);
			else
			{
				tally[x] = [];
				tally[x].push(uname);
			}
		}
	}
	
	// DONE TALLY, NOW FIND AND SHOW PPL
	//console.log("AFTER TALLY ",tally);
	if (tally)
	for (var x in tally)
	{
		//console.log("X = ",x);
		var cnt = tally[x].length;
		var oldHTML = $("td[time = "+x+"]").html();
		//console.log("oldHTML = ",oldHTML);
		if (oldHTML)
		{
			var idx = oldHTML.indexOf('<');
			if (idx != -1) oldHTML = oldHTML.substring(0,idx-1);
			var newHTML = oldHTML + " <span class='glyphicon glyphicon-user' aria-hidden='true'>"+cnt+"</span>";
			$("td[time = "+x+"]").html(newHTML);
		}
	}
	
	// update for zero people
	$("#grid td").each(function () {
		var id = $(this).attr("time");
		if (!tally[id])
		{
			var oldHTML = $(this).html();
			var idx = oldHTML.indexOf('<');
			if (idx != -1) oldHTML = oldHTML.substring(0,idx-1);
			var newHTML = oldHTML;
			$(this).html(newHTML);
			
			
		}
		else
		{
			//console.log(tally[id]);
			//console.log(tally[id][0]);
			var allNames = "";
			for (var i = 0; i < tally[id].length; i++)
			{
				if (allNames != "") allNames += ", ";
				allNames = allNames + " "+ tally[id][i];
			}
			//console.log(id,allNames);
			// attach a tooltip handler
			$(this).attr("s","tooltip");
			$(this).attr("title",allNames);
			$(this).tooltip();
		}
	});
	//console.log(tally);
}

