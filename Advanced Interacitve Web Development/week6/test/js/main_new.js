var downFlag;
canvasObj = document.getElementById('myCanvas');
context = canvasObj.getContext("2d");
strokeCol  = "black";
fillCol = "black";
lineW = 1;
var bgimg = new Image();
bgimg.src = "mona.jpg";

//Add event handlers
document.getElementById("clearbutton").onclick = clearCanvas;

document.getElementById("strokeSelect").onchange = function(){
    strokeCol = this.value;
};
document.getElementById("lineSelect").onchange = function(){
    lineW = this.value;
};
document.getElementById("fillSelect").onchange = function(){
    fillCol = this.value;
};


if (canvasObj.getContext)
{
	canvasObj.onmousedown = startMoving;
	canvasObj.onmousemove = moving;
	canvasObj.onmouseup = stopMoving;
	canvasObj.onmouseout = stopMoving;
	bgimg.onload=function(){
		console.log(bgimg);
		context.drawImage(bgimg,0,0, 500, 500);	
	}
}

function stopMoving (e){
	if(downFlag){
		downFlag = false;
		if (!e) var e = window.event;
		context.closePath();
		if(e.shiftKey){
			context.fillStyle = fillCol;
			context.fill();
		}
		else{
			context.strokeStyle = strokeCol;
			context.stroke();
		}
	}
	return;	
}

function getPos(e){
	//if (!e) var e = window.event;	
	// check if the browser supports the pageX and pageY properties
	// Which are relative to the document

	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	/* .. if not use clientX and clientY which are relative to the
	viewport (adding the amount the page may have scrolled */
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	
	coords = findPos(canvasObj);
	var posx = posx - coords[0];
	var posy = posy - coords[1];
	
	return [posx,posy];
}

function startMoving(e){	
	positions = getPos(e);	
	context.moveTo(positions[0],positions[1]);
	context.beginPath();
	
	downFlag = true;

}

function moving (e) {	
	
	positions = getPos(e);
	context.moveTo(positions[0],positions[1]);
	context.strokeStyle = strokeCol
	context.lineWidth= lineW;
	
	if(downFlag){
		context.lineTo(positions[0],positions[1]);
		context.stroke();
	}
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
	do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curleft,curtop];
	}
} 

function clearCanvas(){
	context.clearRect(0,0,500,500);
	context.drawImage(bgimg,0,0, 500, 500);	
}

function swapCol(col){
	strokeCol = col;
}
function swapFill(col){
	fillCol = col;
}
function swapLine(line){
	lineW = line;
}

document.getElementById('saveButton').onclick =function (){
	var image = canvasObj.toDataURL(); 
	window.location.href=image;	
};