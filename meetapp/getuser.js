var uid;
var uname;

$(function() {
	$.get('myinfo.php', function(data)
	{
		console.log(data);
		data = JSON.parse(data);
		$("#name").html(data["name"]);
		uid = data["id"];
		uname = data["name"];
	});
});