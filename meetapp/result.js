$(function()
{
	var p2 = window.location.host;
	var p3 = window.location.pathname;
	p3 = p3.substring(0, p3.lastIndexOf("/") + 1);
	
	var eventKey = $.cookie('ekey');
	var newURL = p2 + p3 + "view.php?e="+eventKey;
	console.log(eventKey);
	$("#key").html(newURL);

	var addAgain = $.cookie('addagain');
	if (addAgain == 1) $("#title").html("OK!");
	
	$.removeCookie('ekey');
	$.removeCookie('addagain');

	var s = "<ul class='rrssb-buttons clearfix'>";
	
	//email
	s += "<li class='rrssb-email'><a href='mailto:?subject=Let%27s%20meet%20up!&amp;body="+ newURL +"'>";
    s += "<span class='rrssb-icon'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'><path d='M20.11 26.147c-2.335 1.05-4.36 1.4-7.124 1.4C6.524 27.548.84 22.916.84 15.284.84 7.343 6.602.45 15.4.45c6.854 0 11.8 4.7 11.8 11.252 0 5.684-3.193 9.265-7.398 9.3-1.83 0-3.153-.934-3.347-2.997h-.077c-1.208 1.986-2.96 2.997-5.023 2.997-2.532 0-4.36-1.868-4.36-5.062 0-4.75 3.503-9.07 9.11-9.07 1.713 0 3.7.4 4.6.972l-1.17 7.203c-.387 2.298-.115 3.3 1 3.4 1.674 0 3.774-2.102 3.774-6.58 0-5.06-3.27-8.994-9.304-8.994C9.05 2.87 3.83 7.545 3.83 14.97c0 6.5 4.2 10.2 10 10.202 1.987 0 4.09-.43 5.647-1.245l.634 2.22zM16.647 10.1c-.31-.078-.7-.155-1.207-.155-2.572 0-4.596 2.53-4.596 5.53 0 1.5.7 2.4 1.9 2.4 1.44 0 2.96-1.83 3.31-4.088l.592-3.72z'/></svg></span><span class='rrssb-text'>e-mail</span></a></li>";
    
    // facebook
    s += "<li class='rrssb-facebook'><a href='https://www.facebook.com/sharer/sharer.php?u="+ newURL +"' class='popup' target='_blank'>";
    s += "<span class='rrssb-icon'><svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid' width='29' height='29' viewBox='0 0 29 29'><path d='M26.4 0H2.6C1.714 0 0 1.715 0 2.6v23.8c0 .884 1.715 2.6 2.6 2.6h12.393V17.988h-3.996v-3.98h3.997v-3.062c0-3.746 2.835-5.97 6.177-5.97 1.6 0 2.444.173 2.845.226v3.792H21.18c-1.817 0-2.156.9-2.156 2.168v2.847h5.045l-.66 3.978h-4.386V29H26.4c.884 0 2.6-1.716 2.6-2.6V2.6c0-.885-1.716-2.6-2.6-2.6z' class='cls-2' fill-rule='evenodd'/></svg></span><span class='rrssb-text'>facebook</span></a></li>";  
	
	//google
	s += "<li class='rrssb-googleplus'><a href='https://plus.google.com/share?url=Let%27s%20meet%20up!%20"+ newURL +"' class='popup'>";
	s += "<span class='rrssb-icon'><svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='28px' height='28px' viewBox='0 0 28 28' enable-background='new 0 0 28 28' xml:space='preserve'>";
	s += "<g><g><path d='M14.703,15.854l-1.219-0.948c-0.372-0.308-0.88-0.715-0.88-1.459c0-0.748,0.508-1.223,0.95-1.663c1.42-1.119,2.839-2.309,2.839-4.817c0-2.58-1.621-3.937-2.399-4.581h2.097l2.202-1.383h-6.67c-1.83,0-4.467,0.433-6.398,2.027";
	s += "C3.768,4.287,3.059,6.018,3.059,7.576c0,2.634,2.022,5.328,5.604,5.328c0.339,0,0.71-0.033,1.083-0.068c-0.167,0.408-0.336,0.748-0.336,1.324c0,1.04,0.551,1.685,1.011,2.297c-1.524,0.104-4.37,0.273-6.467,1.562"
	s += " c-1.998,1.188-2.605,2.916-2.605,4.137c0,2.512,2.358,4.84,7.289,4.84c5.822,0,8.904-3.223,8.904-6.41"
    s+= " c0.008-2.327-1.359-3.489-2.829-4.731H14.703z M10.269,11.951c-2.912,0-4.231-3.765-4.231-6.037c0-0.884,0.168-1.797,0.744-2.511"
    s+= " c0.543-0.679,1.489-1.12,2.372-1.12c2.807,0,4.256,3.798,4.256,6.242c0,0.612-0.067,1.694-0.845,2.478"
    s+= " c-0.537,0.55-1.438,0.948-2.295,0.951V11.951z M10.302,25.609c-3.621,0-5.957-1.732-5.957-4.142c0-2.408,2.165-3.223,2.911-3.492"
    s+= " c1.421-0.479,3.25-0.545,3.555-0.545c0.338,0,0.52,0,0.766,0.034c2.574,1.838,3.706,2.757,3.706,4.479"
    s+= " c-0.002,2.073-1.736,3.665-4.982,3.649L10.302,25.609z'/>"
	s+= "<polygon points='23.254,11.89 23.254,8.521 21.569,8.521 21.569,11.89 18.202,11.89 18.202,13.604 21.569,13.604 21.569,17.004 23.254,17.004 23.254,13.604 26.653,13.604 26.653,11.89      '/>"
	s+= "</g></g></svg></span><span class='rrssb-text'>google+</span></a></li>"
       
    s += "</ul>"
	$("#share-container").html(s);

	$('a.popup').on('click', function (e) {
		window.open(this.href);
		e.preventDefault();
	});

	$("ul").css("text-align", "center");
	$("li").css("display", "inline-block");
});