$(function()
{
	$("#submit").click(function() {
		if (isAdmin)
		{
			handleSubmitAdmin();
		}
		else
		{
			handleSubmitUser();
		}
	});
});

function handleSubmitAdmin()
{
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
	alert(startTimeInfo);
	alert(endTimeInfo);
	var response = {};
	if (mode == "sixty") response = highlight6;
	else response = highlight;
	var responseArray = [];
	for (id in response) 
	{
		responseArray.push(id);
	}
	
	var responseJSON = responseArray;
	json.response = responseJSON;
	
	var comment = $("#comment").val();
	json.comment = comment;
	
	var passtoPHP = JSON.stringify(json);
	console.log(passtoPHP);
	
	// ajax sending data to server
	
	$.get('addeventAgain.php', {key: eid, data: passtoPHP}, function(data)
	{
		$.cookie('ekey',data);
		$.cookie('addagain',1);
		console.log("KEY = ",data);
		window.location.href = "result.html";
	});
}
	
function handleSubmitUser()
{
	var json = {};
	
	json.mode = mode;
	json.user = uid;
	//console.log(startDateInfo,startDateInfo.getTime());
	var response = {};
	if (mode == "sixty") response = highlight6;
	else response = highlight;
	var responseArray = [];
	for (id in response) 
	{
		responseArray.push(id);
	}
	
	var responseJSON = responseArray;
	json.response = responseJSON;
	
	var comment = $("#comment").val();
	json.comment = comment;
	
	var passtoPHP = JSON.stringify(json);
	console.log(passtoPHP);
	
	// ajax sending data to server
	
	alert(isNew);
	$.get('addeventAgainUser.php', {addevent: isNew, key: eid, data: passtoPHP}, function(data)
	{
		window.location.href = "manage.html";
	});
}