function setLinks(){
	var links = document.getElementsByTagName('a');		
	for(var i=0; i<links.length;i++){			
		if(links[i].rel ==  'slideshow'){				
			links[i].onclick = function (){ 					
					createLightBox(this.href);					
					return false;
		};
		}
	}
}


function
getDisplayDiv()
{
var html ="";
html+= "<div id = \"displayOuter\">";
html+= " <div id = \"displayInner\">";
html+= " <img src = \"loader.gif\">";
html+= " <div id = \"displayClose\">";
html+= " <a href = \"#\" ";
html+= " onclick = \"return closer();\"> ";
html+= " Close ";
html+= " </a>";
html+= " </div>";
html+= " </div>";
html+= "</div>";
return html;
}

function closer()
{
	var displayDiv = document.getElementById("displayOuter");
	displayDiv.style.display= "none";
	return false;
}

function imageReady(oldimgdiv, newimg, loadimg)
{
	oldimgdiv.replaceChild(newimg,loadimg );
}

function displayImg()
{
	var loadimg = document.createElement("img");
	loadimg.src = "../img/ajax-loader.gif";	
	
	var oldimgdiv = document.getElementById("displayInner");
	var oldimg = oldimgdiv.getElementsByTagName("img")[0];
	oldimgdiv.replaceChild(loadimg,oldimg );
	
	var newimg = document.createElement("img");
	newimg.src = this.href;
	newimg.onload = imageReady(oldimgdiv, newimg, loadimg);
	
	var displayDiv = document.getElementById("displayOuter");
	displayDiv.style.display= "block";
	return false;
}

function start()
{
	document.body.innerHTML+=getDisplayDiv();
	var els = document.getElementsByTagName("a");
	for (var i = 0; i<els.length; i++)
	{
		if (els[i].getAttribute("rel") == "slideshow")
		{
			els[i].onclick = displayImg;
		}
	}
}

	window.onload = start;
setLinks();