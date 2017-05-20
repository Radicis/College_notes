function setTop(){

	var maincont = document.getElementById('maincontent');

	var toplink = document.createElement("a");
	toplink.name = "top";
	document.body.insertBefore(toplink, maincont);

	var headings = maincont.getElementsByTagName("h3");
	for(var i=0;i<headings.length;i++){
		if(i!=0){	
			var link = document.createElement("a");
			link.href = "#top";
			var text = document.createTextNode("Back to Top");
			link.appendChild(text);
			maincont.insertBefore(link, headings[i]);
		}
	}
	var link = document.createElement("a");
	link.href = "#top";
	var text = document.createTextNode("Back to Top");
	link.appendChild(text);
	maincont.appendChild(link);
}

function setCookieBar(){
	var bar = document.createElement("div");
	bar.id = ("cBar");
	var barTextPara = document.createElement("p");
	var barText = document.createTextNode("By using this site you agree to our cookie policy");
	barTextPara.appendChild(barText);
	bar.appendChild(barTextPara);
	document.body.appendChild(bar);
	
	var closeLink = document.createElement("a");	
	closeLink.classList.add("close");
	
	var closeText = document.createTextNode("[X]");
	closeLink.appendChild(closeText);	
	
	bar.appendChild(closeLink);
	
	closeLink.addEventListener("click", closeCookie);
}

function closeCookie(){
	document.getElementById("cBar").style.display = "none";
}


setTop();
setCookieBar();

