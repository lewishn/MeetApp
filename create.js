
$(function()
{
	$("#create").click(function() {
		//
		
		var json = {};
		
		json.owner = uid;
		json.name = $("#title").html();
		json.duration = $("#duration").html();
		json.mode = mode;
		//console.log(startDateInfo,startDateInfo.getTime());
		json.startD = startDateInfo.getTime();
		json.endD = endDateInfo.getTime();
		json.startT = startTimeInfo;
		json.endT = endTimeInfo;
		json.displayDay = displayDay;
		
		var response = {};
		if (mode == "sixty") response = highlight6;
		else response = highlight;
		var responseArray = [];
		for (id in response) 
		{
			responseArray.push(id);
		}
		
		var responseJSON = {};
		responseJSON[uid.toString()] = responseArray;
		
		json.response = responseJSON;
		
		var comment = {};
		comment[uid.toString()] = $("#comment").val();
		json.comment = comment;
		
		var passtoPHP = JSON.stringify(json);
		console.log(passtoPHP);
		
		// ajax sending data to server
		alert("?");
		$.get('addevent.php', {data: passtoPHP}, function(data)
		{
			$.cookie('ekey',data);
			console.log("KEY = ",data);
			window.location.href = "result.html";
		});
		
		
	});
});