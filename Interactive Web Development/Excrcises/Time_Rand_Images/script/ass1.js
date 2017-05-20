	function load(){
		var d = new Date();
		var intHr = d.getHours();
		var morningCol = "#FFFF99"
		var noonCol = "#99CCFF"
		var eveCol = "#999966"
		
		if (intHr<=11){				
			document.getElementById("greeting").innerHTML =  "Good morning!";	
			document.body.style.backgroundColor = morningCol;
			document.getElementById("bgCol").innerHTML =  "Background Color set to -> " + morningCol;
		}
		else if (intHr<=16){
			document.getElementById("greeting").innerHTML =  "<b>Good Afternoon!</b>";
			document.body.style.backgroundColor = noonCol;
			document.getElementById("bgCol").innerHTML =  "Background Color set to -> " + noonCol;
		}
		else{
			document.getElementById("greeting").innerHTML =  "<b>Good Evening!</b>";
			document.body.style.backgroundColor = eveCol;
			document.getElementById("bgCol").innerHTML =  "Background Color set to -> " + eveCol;
		}
				
		var rand = (Math.random());

		var myInt = Math.floor(rand*6);
		
		document.getElementById("randomImage").src = "photo" + myInt + ".jpg";
		document.getElementById("description").innerHTML = "The displayed image is " + document.getElementById("randomImage").src;
		
}