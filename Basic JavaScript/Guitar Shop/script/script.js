
//Set default options
function setStandardGuitar(){
	swap_body("img/body_fender.png");
	swap_head("img/head_fender.png");
	swap_fretboard("img/fretboard_light.png");
	swap_pickup("img/pickup_single.png");
	swap_bridge("img/bridge_fender.png");
	swap_finish("#fff");
	document.forms['buyForm']['hiddenTotal'].value = 1295;
}



//Array of costs for each part
//index 0 is body, 1 is head, 2 is fretboard, 3 is pickups, 4 is bridge
var costList = [1000, 100, 85, 60, 40];
var noOptions = 1295;

//Modify the Total cost field using the array of costs above
function setCost(num, type){	
	var currentTotal = document.getElementById("thisCost");
	var formTotal = document.forms['buyForm']['hiddenTotal'];
	var oldTotal = parseInt(currentTotal.innerHTML, 10);		
	currentTotal.innerHTML = oldTotal - costList[type] + parseInt(num, 10);	
	formTotal.value = parseInt(currentTotal.innerHTML, 10);
	costList[type] = parseInt(num, 10);	
}

function swap_body(bodyType){	
	var guitar  = document.getElementById("guitar");
	guitar.style.backgroundImage="url('" + bodyType + "')";
}
function swap_head(headType){	
	var head = document.getElementById("g-head");
	head.src = headType;
}
function swap_fretboard(fretBoardType){		
	var fret = document.getElementById("g-fretboard");
	fret.src = fretBoardType;
}
function swap_pickup(pickupType){	
	var pickup = document.getElementById("g-pickup");
	pickup.src = pickupType;
}
function swap_bridge(bridgeType){	
	var bridge = document.getElementById("g-bridge");
	bridge.src = bridgeType;
}
function swap_finish(color){	
	document.getElementById("guitar").style.backgroundColor = color;
	document.forms['buyForm']['guitarFinish'].value = color; 
}

function set_finish(){
	document.getElementById("guitar").style.backgroundColor = document.getElementById("picker").value;	
	document.forms['buyForm']['guitarFinish'].value = document.getElementById("picker").value; 
	
}

//Send the guitar specs to the buy form

function sendSpecs(form){	
	
	var bodyButtons = form.bodySelect.getElementsByTagName('input');
	var headButtons = form.headSelect.getElementsByTagName('input');
	var fretButtons = form.fretSelect.getElementsByTagName('input');
	var pickupButtons = form.pickupSelect.getElementsByTagName('input');
	var bridgeButtons = form.bridgeSelect.getElementsByTagName('input');

	var bodyType;
	var headType; 
	var fretType; 
	var pickupType; 
	var bridgeType;	
	
	for(var i=0;i<bodyButtons.length;i++){		
		if(bodyButtons[i].checked==true){			
			bodyType = bodyButtons[i].id;	
			document.forms['buyForm']['guitarBody'].value = bodyType;
		}		
	}

	for(i=0;i<headButtons.length;i++){		
		if(headButtons[i].checked==true){			
			headType = headButtons[i].id;
			document.forms['buyForm']['guitarHead'].value = headType;
		}		
	}

	for(i=0;i<fretButtons.length;i++){		
		if(fretButtons[i].checked==true){			
			fretType = fretButtons[i].id;
			document.forms['buyForm']['guitarFret'].value = fretType;			
		}		
	}

	for(i=0;i<pickupButtons.length;i++){		
		if(pickupButtons[i].checked==true){			
			pickupType = pickupButtons[i].id;	
			document.forms['buyForm']['guitarPickup'].value = pickupType;
		}		
	}

	for(i=0;i<bridgeButtons.length;i++){		
		if(bridgeButtons[i].checked==true){			
			bridgeType = bridgeButtons[i].id;
			document.forms['buyForm']['guitarBridge'].value = bridgeType;				
		}		
	}
		
	var gFinish = document.getElementById('guitar').style.backgroundColor;	
	
	if(gFinish!=""){
		document.forms['buyForm']['guitarFinish'].value = gFinish; 
	}
	
	return false;
}

//Function to hide and show the order form div based on argument i
function showForm(i){
	
	x = document.getElementById("orderForm");
	y = document.getElementById("container");	
	z = document.getElementById("totalCost");
	j = document.getElementById("thisCost");
	
	//Set the total cost to the cost from the form
	z.innerHTML = j.innerHTML;
	
	//Get list of form elements on guitar form to enable/disable
	elemList = document.forms["guitarOptions"].elements;
	
	if(i==1){
		x.classList.add("show");
		x.classList.remove("hidden"); 
		y.style.opacity= "0.4";

		//loop though list of form elements on guitar form and disable them
		for(var i=0;i<elemList.length;i++){
			elemList[i].disabled = true;
		}		
		return false;
	}
	else{
		x.classList.add("hidden");
		x.classList.remove("show"); 
		y.style.opacity= "1";
		
		//loop though list of form elements on guitar form and enable them
		for(var i=0;i<elemList.length;i++){
			elemList[i].disabled = false;
		}		
	}
}

//Cookie Script
function setCookie(form){
	var name = form.inpName.value;
	document.cookie = "name=" + name + ";";
	getCookie();
}

function getCookie(){
	var name = document.cookie.substr(document.cookie.indexOf('=')+1, document.cookie.length);		
}

function setCookieForm(){
	document.forms['buyForm']['inpName'].value = document.cookie.substr(document.cookie.indexOf('=')+1, document.cookie.length);
}





