
canvasObj = document.getElementById('myCanvas');

if (canvasObj.getContext)
{
	context = canvasObj.getContext('2d');
//roof
	context.moveTo(250,50);
	context.lineTo(50,150);
	context.lineTo(450,150);
	context.closePath();
	context.fill();
	
//building
	context.moveTo(70, 150);
	context.lineTo(70, 450);
	context.lineTo(430, 450);
	context.lineTo(430, 150);
	context.closePath();
	context.stroke();
	
//win
	context.moveTo(100, 200);
	context.lineTo(100, 350);
	context.lineTo(200, 350);
	context.lineTo(200, 200);
	context.closePath();
	context.stroke();
	
//win
	context.moveTo(300, 200);
	context.lineTo(300, 350);
	context.lineTo(400, 350);
	context.lineTo(400, 200);
	context.closePath();
	context.stroke();

//door
	context.moveTo(210, 300);
	context.lineTo(210, 450);
	context.lineTo(290, 450);
	context.lineTo(290, 300);
	context.closePath();
	context.stroke();



	context.beginPath();
	context.arc( 
		270,380,10,
		Math.PI/180*0,
		Math.PI/180*360,
		false
	);
	context.stroke();
}