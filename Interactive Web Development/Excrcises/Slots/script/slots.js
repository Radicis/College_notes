var winner = 0 ;
var spins = 0;

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();

function spin(){	
	
	var rand1 = Math.floor((Math.random() * 5) + 1);
	var rand2 = Math.floor((Math.random() * 5) + 1);
	var rand3 = Math.floor((Math.random() * 5) + 1);
	
	img1.src = "img" + rand1 + ".png";
	img2.src = "img"+ rand2 + ".png";
	img3.src = "img" + rand3 + ".png";
	
	document.getElementById('slot1').src = img1.src;
	document.getElementById('slot2').src = img2.src;
	document.getElementById('slot3').src = img3.src;
	
	if(rand3==rand2&&rand2==rand1){
		alert("Winner");
		winner++;
	}		
	document.getElementById("wins").innerHTML = "You have won: <strong>"  + winner + "</strong> times and have taken: <strong>" + spins  + " </strong>spins";
	spins++;
}
