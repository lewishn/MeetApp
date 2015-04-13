var uid;
var uname;


function getUsername()
{
	console.log("START GET USERNAME");
	return  $.get('myinfo.php', function(data)
	{
		console.log(data);
		data = JSON.parse(data);
		$("#name").html(data["name"]);
		uid = data["id"];
		uname = data["name"];
		
		console.log("END USERNAME");
		
		
	});
}