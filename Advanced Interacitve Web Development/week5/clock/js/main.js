
canvasObj = document.getElementById('myCanvas');

if (canvasObj.getContext)
{
	context = canvasObj.getContext('2d');
//bars	
	context.fillText("Hours", 20, 25);
	context.beginPath(); 
	context.moveTo(20,30);
	context.lineTo(20,50);
	context.lineTo(300,50);
	context.lineTo(300,30); 
	context.closePath();
	context.stroke();
	
	context.fillText("Mins", 20, 65);
	context.beginPath(); 
	context.moveTo(20,70);
	context.lineTo(20,90);
	context.lineTo(300,90);
	context.lineTo(300,70); 
	context.closePath();
	context.stroke();
	
	context.fillText("Secs", 20, 105);
	context.beginPath(); 
	context.moveTo(20,110);
	context.lineTo(20,130);
	context.lineTo(300,130);
	context.lineTo(300,110); 
	context.closePath();
	context.stroke();
	
	
	window.setInterval(function(){updateTime(context)}, 1000);

	

}


function updateTime(context){
	
	reset(context);
	
	var k = 300/24 + 1;
	
	for(var i=21;i<290;i+=k){
		context.beginPath(); 
		context.moveTo(i+k,31);
		context.lineTo(i+k,49);
		context.closePath();
		context.stroke();
		
		
	}
	
	k = 300/60 + 1;

	for(var i=20;i<294;i+=k){
		context.beginPath(); 
		context.moveTo(i+k,71);
		context.lineTo(i+k,89);
		context.closePath();
		context.stroke();
		
		context.beginPath(); 
		context.moveTo(i+k,111);
		context.lineTo(i+k,129);
		context.closePath();
		context.stroke();
		
		
	}	
	
	setTime(context);	
	
}


function setTime(context){
	var date = new Date;

	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hour = date.getHours();	
	
	var hours = 21+ hour*(280/24);
	var mins = 21+ minutes*(280/60);	
	var secs = 21+ seconds*(280/60);

	
	context.fillStyle = "red";
	context.beginPath(); 
	context.moveTo(21,31);
	context.lineTo(21,49);
	context.lineTo(hours,49);
	context.lineTo(hours,31); 
	context.closePath();
	context.fill();
	
	context.beginPath(); 
	context.moveTo(21,71);
	context.lineTo(21,89);
	context.lineTo(mins,89);
	context.lineTo(mins,71); 
	context.closePath();
	context.fill();

	context.beginPath(); 
	context.moveTo(21,111);
	context.lineTo(21,129);
	context.lineTo(secs,129);
	context.lineTo(secs,111); 
	context.closePath();
	context.fill();
}



function reset(context){
	context.fillStyle = "white";
	
	context.beginPath(); 
	context.moveTo(21,31);
	context.lineTo(21,49);
	context.lineTo(299,49);
	context.lineTo(299,31); 
	context.closePath();
	context.fill();
	
	context.beginPath(); 
	context.moveTo(21,71);
	context.lineTo(21,89);
	context.lineTo(299,89);
	context.lineTo(299,71); 
	context.closePath();
	context.fill();
	
	
	context.beginPath(); 
	context.moveTo(21,111);
	context.lineTo(21,129);
	context.lineTo(299,129);
	context.lineTo(299,111); 
	context.closePath();
	context.fill();
	

}