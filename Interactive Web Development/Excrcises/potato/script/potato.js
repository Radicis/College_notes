
var noseArray = new Array();
noseArray[0] = new Image();
noseArray[0].src = "nose1.png";
noseArray[1] = new Image();
noseArray[1].src = "nose2.png";
noseArray[2] = new Image();
noseArray[2].src = "nose3.png";

function swap(featureType){
	var rand = Math.floor((Math.random() * 3));	
	swapThis = document.getElementById(featureType);
	if(featureType== "nose"){
		swapThis.src = noseArray[rand].src;
	}
	else if (featureType=="eyes"){
	
	}
	else if(featureType=="mouth"){
	
	}	
}