//Flash up obey on the screen periodically then clear it.
function obey()
{
	var obey = "OBEY";
	var content = document.getElementById("obey");
	setInterval(function(){content.innerHTML=obey;},25000);
	setInterval(function(){content.innerHTML="";},25010);
}


//Set up and load the custom map
function load_map() 
{		
	var myLatlng = new google.maps.LatLng(35.86166,104.195397);
	
	//Set up options for the map
	var settingsItemsMap = {
		zoom: 6,
		center: new google.maps.LatLng(35.86166,104.195397),
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE
		},
		styles:[
			{ featureType: "water", stylers: [ { hue: "#F4B741"} ] },
			{ featureType: "road", stylers: [ { hue: "#ff0000" } ] },
			{featureType: "landscape", stylers: [ { "color": "#6ca567" } ]},
		],
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	//initialise the map
	var map = new google.maps.Map(document.getElementById('mapC'), settingsItemsMap);
	
	//Add marker to the map
	var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'CORPA-NET Global HQ'
	});
}


 


