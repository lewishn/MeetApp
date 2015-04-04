$(function() {
	$.get('getEvents.php', function(data)
	{
		data = JSON.parse(data);
		console.log(data);
		
		var len = data.length;
		
		var grid = $("#eventContent").html("");
		
		if (len == 0)
		{
			// add 1 row saying nothing exist
			var tr = "<tr><td colspan = '6'>You don't have any events</td></tr>";
			grid.append(tr);
		}
		for (var i = 0; i < data.length; i++)
		{
			for (var key in data[i])
			{
				var eid = key;
				var ename = data[i][key][0];
				var edesc = data[i][key][1];
				var eowner = data[i][key][2];
				var efinal = data[i][key][3];
				
				console.log(eid,ename,edesc,eowner,efinal);
				
				var idx= i+1;
				var tr = $("<tr></tr>");
				
				var td = "<td>"+idx+"</td>";
				tr.append(td);
				
				td = "<td>"+ename+"</td>";
				tr.append(td);
				
				td = "<td>"+edesc+"</td>";
				tr.append(td);
				
				td = "<td>"+eowner+"</td>";
				tr.append(td);
				
				if (!efinal) efinal = "Nope";
				td = "<td>"+efinal+"</td>";
				tr.append(td);
				
				td = "<td>"+key+"</td>";
				tr.append(td);
				
				grid.append(tr);
			}
		}
		
	});
});