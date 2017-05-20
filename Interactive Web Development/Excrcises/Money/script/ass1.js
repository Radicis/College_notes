var coinArray = new Array();
	coinArray[0] = 200;
	coinArray[1] = 100;
	coinArray[2] = 50;
	coinArray[3] = 20;
	coinArray[4] = 10;
	coinArray[5] = 5;
	coinArray[6] = 2;
	coinArray[7] = 1;
	
var imgArray = new Array();
	imgArray[0] = 0;
	imgArray[1] = 0;
	imgArray[2] = 0;
	imgArray[3] = 0;
	imgArray[4] = 0;
	imgArray[5] = 0;
	imgArray[6] = 0;
	imgArray[7] = 0;

function load(){
		
	//prompt user for value
	var input = parseFloat(prompt("Enter a value in Euro or Cent: "));			
	//store a string version of the input value
	var testString = input.toString();
	
	//Check is decimal place in input string
	if(testString.indexOf(".")>-1){
		input = input*100;
	}
	
	var new_value = input;
	
	for(var i=0;i<coinArray.length;i++){
		if(new_value-coinArray[i]>=0){
			while((new_value-coinArray[i])>=0){
				new_value = new_value - coinArray[i];
				imgArray[i]++;								
				document.write("<img class='coin" + coinArray[i] + " ' onMouseOver='coin_over(" + coinArray[i] + ");' onMouseOut=coin_back(" + coinArray[i] + ");  src='cent" + coinArray[i] + ".gif'>");
				
			}
		}
	}
}

function coin_over(coin){
	new_src = ("cent" + coin + "_over.gif");
	var found_classes = document.getElementsByClassName('coin' + coin);	
	for(var i=0;i<found_classes.length;i++){
		//alert(found_classes[i].src);
		found_classes[i].src = new_src;
	}
}

function coin_back(){	
	var found_classes2 = document.getElementsByClassName('coin' + coin);	
	for(var i=0;i<found_classes2.length;i++){		
		found_classes2[i].src = "cent" + coin + ".gif";
	}
}