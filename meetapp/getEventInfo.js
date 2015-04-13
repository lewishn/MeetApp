var eventInfo = {};
var eventResponse = {};
var eventComment = {};
var idToName = {};
var eid;
var eventResponseMode = {};

function getEventInfo()
{
	console.log("START GET EVENT INFO");
	// get event general info
	eid = location.search.split("e=")[1];
	//alert(eid);
	$.get("getEventInfo.php", {data: eid}, function(data)
	{
		data = JSON.parse(data);
		console.log(data);
		
		// extract each info, this is :(
		
		eventInfo["name"] = data[0][eid][0];
		eventInfo["desc"] = data[0][eid][1];
		eventInfo["owner"] = data[0][eid][2];
		eventInfo["ownerid"] = data[0][eid][3];
		eventInfo["mode"] = data[0][eid][4];
		eventInfo["startD"] = data[0][eid][5];
		eventInfo["endD"] = data[0][eid][6];
		eventInfo["startT"] = data[0][eid][7];
		eventInfo["endT"] = data[0][eid][8];
		eventInfo["displayDay"] = JSON.parse(data[0][eid][9]);
		eventInfo["finalize"] = data[0][eid][10];
		
		console.log(eventInfo);
		
		console.log("END EVENT INFO");
		
		getEventDetail();
		
	});
}

function getEventDetail()
{
	// get response and comment
	
	$.get("getEventDetail.php", {data: eid}, function(data)
	{
		console.log("START EVENT DETAIL");
		data = JSON.parse(data);
		console.log(data);
		
		for (var i = 0; i < data.length; i++)
		{
			for (var key in data[i])
			{
				var uid = key.toString();
				idToName[uid] = data[i][key][0];
				eventResponse[uid] = data[i][key][1];
				eventComment[uid] = data[i][key][2];
				eventResponseMode[uid] = data[i][key][3];
				
			}
		}
		console.log(eventResponse);
		console.log(eventComment);
		console.log(eventResponseMode);
		
		console.log("END EVENT DETAIL");
		
	});
	
}