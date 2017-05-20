function show(type){	
	var x = document.getElementById(type);
	if(x.style.display=="inline"){
		x.style.display = "none";
	}
	else{
		x.style.display = "inline";
	}
}
