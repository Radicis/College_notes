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


function imageReady(imgContainer, closeButton, newImage)
{
	imgContainer.removeChild(imgContainer.childNodes[0]);
	imgContainer.insertBefore(newImage, closeButton);	
}


function createLightBox(imgSrc){	
	var main = document.getElementById('main');
	
	var lightbox = document.createElement('div');
	lightbox.id = "lightbox";
	
	var imgContainer = document.createElement('div');
	imgContainer.id = "img-container";

	lightbox.appendChild(imgContainer);
	main.appendChild(lightbox);
	
	var newImage = document.createElement('img');
	var loaderimg = document.createElement('img');
	loaderimg.src = "img/ajax-loader.gif";
	
	var closeButton = document.createElement('a');
	closeButton.href = "#";
	var closeText = document.createTextNode('Close');
	closeButton.appendChild(closeText);	
	
	closeButton.onclick = function (){ 
			closeLightBox(this); return false;
		};
	imgContainer.appendChild(loaderimg);
	imgContainer.appendChild(closeButton);	
	
	showLightBox();
	
	newImage.src = imgSrc;		
	newImage.onload = imageReady(imgContainer, closeButton, newImage);
}

function showLightBox(){
	document.getElementById('lightbox').style.display = "block";
}

function closeLightBox(thisBox){	
	document.getElementById('lightbox').style.display = "none";
	document.getElementById('main').removeChild(thisBox.parentNode.parentNode);	
}

setLinks();