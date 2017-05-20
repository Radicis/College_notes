var imagearray = new Array();
imagearray.push ( { image: "img/pic1.jpg", caption: "A Pic" } );
imagearray.push ( { image: "img/pic2.jpg", caption: "Pic 2" } );
imagearray.push ( { image: "img/pic3.jpg", caption: "Pic 3" } );
imagearray.push ( { image: "img/pic4.jpg", caption: "Pic 4" } );


function changeImage(num){
	document.getElementById('slide').src = imagearray[num]['image'];
	document.getElementById('caption').innerHTML = imagearray[num]['caption'];	
	setArrow(num);
	setActive(num);
}

function setActive(num){
	var links = document.getElementsByClassName('active');
	for(var i=0;i<links.length;i++){
		links[i].classList.remove('active');
	}
	document.getElementById('link' + num).classList.add('active');	
}

function setArrow(num){	
	document.getElementById('left-arrow').addEventListener("click", function(){
		if(num!=0){
			changeImage(num-1);
		}
		else{
			changeImage(imagearray.length-1);
		}
	});
	document.getElementById('right-arrow').addEventListener("click", function(){
		if(num<imagearray.length-1){
			changeImage(num+1);
		}
		else{
			changeImage(0)
		}		
	});
}

function setNav(){
	var html = "";
	for(var i =0; i<imagearray.length;i++){		
		html += "<a id=\"link" + i + "\"  onclick = \"changeImage(" + i + ")\" >" + (i+1) + "</a>";			
	}	
	document.getElementById('navigation').innerHTML = html;
	document.getElementById('left-arrow').addEventListener("click", function(){
		changeImage(1);
		});
	changeImage(0);	
}



