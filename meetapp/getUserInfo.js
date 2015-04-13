var isNew = false;
var isAdmin = false;
function getUserInfo()
{
	console.log("START GET USERINFO");
	console.log("EVENT INFO = ",eventInfo);
	if (uid == eventInfo["ownerid"])
	{
		isAdmin = true;
		console.log("ADMIN");
	}
	else
	{
		isAdmin = false;
		console.log("USER");
		if (!eventResponse[uid]) isNew = true;
	}
	
	console.log("IS NEW = ",isNew);
	
	console.log("END USERINFO");
	
	
	
}