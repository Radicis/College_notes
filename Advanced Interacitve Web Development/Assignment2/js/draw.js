// This variable will store whether or not we are in drawing mode 
// (i.e. the mouse button is down and the mouse is over the canvas)
drawing = false;
canvasObj = document.getElementById('myDrawCanvas');
draw_context = canvasObj.getContext("2d");
strokeCol = "black";
fillCol = "black";
lineW = 1;


canvasObj.width = set_width;
canvasObj.height = set_height;


if (canvasObj.getContext) {
	
		// Add event handlers		
		// As long as we move the mouse over the image we try to draw on the page
		canvasObj.onmousemove = draw;
		
		// We start drawing if the mouse button is pressed
		canvasObj.onmousedown = startdraw;
		
		// We stop the drawing if the mouse leaves the canvas
		// or the mouse button is released. 
		canvasObj.onmouseup = stopdraw;
		canvasObj.onmouseout = stopdraw;
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

// Return the coordinates of the mouse relative ot the canvas
// we must explicitly pass this function an event object since 
// it isn't an event handler
function getMouseCoords(event)
{
	
	if (!event) var event = window.event;

	var posx = 0;
	var posy = 0;
	if (event.pageX || event.pageY) 	{
		posx = event.pageX;
		posy = event.pageY;
	}
	else if (event.clientX || event.clientY) 	{
		posx = event.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = event.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}

	var totaloffset = findPos(canvasObj);
	
 	var totalXoffset = totaloffset[0];
 	var totalYoffset = totaloffset[1];

 	var canvasX = posx- totalXoffset;
 	var canvasY = posy- totalYoffset;

 	// return coordinates in an array
	return [canvasX, canvasY];
	
}	


// this function gets called when the mouse moves over the canvas
// we must pass it the event sent to the the event handler
function draw (e) {


	// check if we are in drawing mode (i.e. the mouse button has been pressed)
	if (drawing)
	{
		
		var coords = getMouseCoords(e);
		
		// draw a line from the previous positon to the current coordinates
		draw_context.lineTo(coords[0], coords[1]); 
	
		// draw the line
		draw_context.stroke();
	
		// If the shift key is pressed we also fill the path
		if (e.shiftKey) 
		{
			draw_context.fill();
		}
	}

}



// If we start drawing (i.e. press down the mouse button) 
// we begin a path and move to the point where the mouse is
function startdraw(e)
{
	draw_context.strokeStyle = strokeCol
    draw_context.lineWidth = lineW;
	draw_context.fillStyle = fillCol;
	// indicate we have started drawing by seting this variable to true
	drawing = true;
	
	draw_context.beginPath();


	// Get the canvas coords of the mouse
	// They are returned in an array
	// we must pass it the event object 
	// so it can retrieve the coordinates
	coords = getMouseCoords(e);
	
	
	// move to the coords of the mouse
	draw_context.moveTo(coords[0], coords[1]); 

}



// If we stop drawing we close the path
// and set the drawing variable to false
function stopdraw()
{
	draw_context.closePath();
	drawing = false;
}


//initialise drawing settings based on current select option values
function initSettings(){
	var line = document.getElementById('selectLine');
	var lineVal = line.options[line.selectedIndex].value;
	swapLine(lineVal);
	
	var lineCol = document.getElementById('selectCol');	
	var lineColVal = lineCol.options[lineCol.selectedIndex].value;
	swapCol(lineColVal);
	
	var fill = document.getElementById('selectFill');	
	var fillVal = fill.options[fill.selectedIndex].value;
	swapFill(fillVal);
}

function swapCol(col) {
    strokeCol = col;
}

function swapFill(col) {
    fillCol = col;
}

function swapLine(line) {
    lineW = line;
}

function clearDrawCanvas() {
	draw_context.clearRect(0, 0, set_width, set_height);
    graph.toast("Canvas Cleared");
}