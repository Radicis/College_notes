
canvasObj = document.getElementById('myCanvas');

if (canvasObj.getContext)
{
	context = canvasObj.getContext('2d');

	k = 0;

	for(var i=1;i<61;i++){
		context.strokeStyle = "#999";
		if(i%5==0 && i!=1){
			context.strokeStyle = "#000";
			}
		if(i==60){
			context.strokeStyle = "#999";
		}
		context.beginPath(); 
		context.moveTo(k,70);
		context.lineTo(k,90);
		context.closePath();
		context.stroke();

		k+=10;
	}	
	
	window.setInterval(function(){updateTime(context)}, 500);

}


function updateTime(context){
	
	reset(context);
	
	setTime(context);	
	
}


function setTime(context){
	var date = new Date;

	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hour = date.getHours();	
	
	var hours, mins, secs;
	
	hours = hour*25-10;
	mins = minutes*10-10;
	secs = seconds*10-10;

	
	context.fillStyle = "blue";
	context.fillText("Time: " + hour + ":" + minutes + ":" + seconds, 10, 60);
	
	context.strokeStyle = "red";
	context.beginPath(); 
	context.moveTo(200,200);
	context.lineTo(hours,90);
	context.closePath();
	context.stroke();	
	
	context.strokeStyle = "#ccc";
	context.beginPath(); 
	context.moveTo(200,200);
	context.lineTo(mins,90);
	context.closePath();
	context.stroke();	
	
	context.strokeStyle = "#333";
	context.beginPath(); 
	context.moveTo(200,200);
	context.lineTo(secs,90);
	context.closePath();
	context.stroke();

}



function reset(context){
	context.fillStyle = "white";
	
	context.beginPath(); 
	context.moveTo(0,90);
	context.lineTo(0,200);
	context.lineTo(600,200);
	context.lineTo(600,90); 
	context.closePath();
	context.fill();
	
	context.beginPath(); 
	context.moveTo(0,0);
	context.lineTo(0,70);
	context.lineTo(300,70);
	context.lineTo(300,0); 
	context.closePath();
	context.fill();
	

}