var finalized = false;
var finalizedDate = "";
var finalizedString = "";
var lastId, currentId;

$(function()
{
	$("#finalize").click(function() {
		console.log("CLICK FINALIZE");
		
		
		if (!finalized)
		{
			finalizedDate = "";
			finalized = true;
			$(this).html("Cancel");
			
			$("td").removeClass('success');
			$("td").removeClass('bg-primary');
			$("td").removeClass('info');
			// 
			$("td").unbind();
			$(".time").unbind();
			$(".date").unbind();
			
			
			
			$(".time").click(function() 
			{
				console.log("Finalized Date selected");
				lastId = currentId;
				currentId = $(this).attr("time");
				
				console.log(currentId,lastId);
				if (currentId)
				{
					// has an Id
					finalizedDate = currentId;
					
					// highlight new one
					$("td[time = "+currentId+"]").addClass("success");
					// unhighlight previous
					if (lastId != currentId)
						$("td[time = "+lastId+"]").removeClass("success");
				}
			});
			
			
		}
		else
		{
			$(this).html("Finalize !");
			//alert("YES");
			finalizedDate = "";
			finalized = false;
			console.log("DRAW GRID?");
			startDate = new Date(startDateInfo.getTime());
			endDate = new Date(endDateInfo.getTime());
			drawCorrectGrid();
		}
		
	});
	
	$("#submit").click(function() {
		if (isAdmin)
		{
			if (!finalized)
			{
				handleSubmitAdmin();
			}
			else
			{
				handleFinalize();
			}
		}
		else
		{
			handleSubmitUser();
		}
	});
});

function handleFinalize()
{
	var tempDate = new Date(Number(finalizedDate));
	console.log(mode);
	if (mode == "sixty")
	{
		finalizedString = tempDate.getDate().toString() + "/" + (tempDate.getMonth()+1).toString() + "/" + (tempDate.getFullYear().toString()) + " " + tempDate.getHours().toString() + ":00";	
	}
	else
	{
		finalizedString = tempDate.getDate().toString() + "/" + (tempDate.getMonth()+1).toString() + "/" + (tempDate.getFullYear().toString());
	}
	console.log(finalizedString);
	handleSubmitAdmin();
	
}
	
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
	json.finalize = finalizedString;
	//alert(startTimeInfo);
	//alert(endTimeInfo);
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
	
	//alert(isNew);
	$.get('addeventAgainUser.php', {addevent: isNew, key: eid, data: passtoPHP}, function(data)
	{
		window.location.href = "manage.html";
	});
}