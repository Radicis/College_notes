// check for cookies when window loaded
window.onload = displayWelcome();
// listen for click event on form submit button
document.getElementById('submit').addEventListener('click', setCookie, false);
// listen for click on reset button
document.getElementById('reset').addEventListener('click', reset, false);
//
document.getElementById('submit').addEventListener('click', checkPizza, false);
function setCookie(){
    //take user name and date 
	var customerName = document.getElementById('name').value;
	var nowTime = new Date();
	var expiryTime = new Date();

  expiryTime.setTime(nowTime.getTime() + 864000000);// + ten days
  document.cookie = "name=" + customerName + ";";
  document.cookie = "lastVisited=" + nowTime.getTime() + ";";
  document.cookie = "expires=" + expiryTime.toUTCString() + ";";
}

function readCookie(){
    // split cookie string into array of strings: "key = value"
	var cookieValues = document.cookie.split(";");
    // extract actual key and value from string and store in array (old cookie)
	var oldCookie = [];
	for(var i=0; i<cookieValues.length; i++){
		if(cookieValues[i].indexOf("name=") != -1){
			oldCookie.name = cookieValues[i].substring(5, cookieValues[i].length);
		}
		if(cookieValues[i].indexOf("lastVisited=") != -1){
			oldCookie.lastVisited = cookieValues[i].substring(13, cookieValues[i].length);
		}		
	}
	return oldCookie;
}

function displayWelcome(){
    //read old cookie
	var name = "";
	var lastVisited;
	var lastCookieValues = [];
	lastCookieValues = readCookie();
    //extract last visit date
	var lastVisited = new Date(parseInt(lastCookieValues.lastVisited));
	//create heading tag to display welcome message
	var newNode = document.createElement("H1");
	var welcomeMessage = document.createTextNode(
        //display name, date and time from old cookie
		"Hello " + lastCookieValues.name + ", your last order was on " + lastVisited.toDateString() + " at " + lastVisited.toLocaleTimeString()	
	);
	newNode.appendChild(welcomeMessage);
	var parentNode = document.getElementById("order");
	var beforeNode = document.getElementById("heading");
	parentNode.insertBefore(newNode, beforeNode);
}

/*================================================*/
var numOfToppings = 0;

function reset(){

	for(var i=2; i<8; i++){
		document.getElementById('id' + i).style.display = "none";
	}
	document.getElementById('id1').style.width = "300px";
	document.getElementById('id1').style.height = "300px";
	document.getElementById('id1').style.top="0px";
	document.getElementById('id1').style.left="0px"; 


}
function checkPizza(id){
	var checkbox = document.getElementById(id);

	var price = parseFloat(document.getElementById('price').innerHTML);
	if(document.getElementById(id + '2').checked){
		checkbox.style.display = "block";
		price = price +  1;
		numOfToppings++;
       
	}else{
		checkbox.style.display = "none";
		price = price - 1;
		numOfToppings--;
	}
	document.getElementById('price').innerHTML = price.toPrecision(3);
}

function pizzaType(size){
	var pizzaTypeValue;

    if (size=="small"){
		pizzaTypeValue = 5 + 1 * numOfToppings;
        for(var i=1; i<=7; i++){
            document.getElementById('id' + i).style.width="200px";
            document.getElementById('id' + i).style.height="200px"; 
			document.getElementById('id' + i).style.top="50px";
			document.getElementById('id' + i).style.left="50px"; 
        }
       
    }else if(size=="medium"){
		pizzaTypeValue = 10 + 1 * numOfToppings ;
	    for(var i=1; i<=7; i++){
            document.getElementById('id' + i).style.width="250px";
            document.getElementById('id' + i).style.height="250px"; 
			document.getElementById('id' + i).style.top="25px";
			document.getElementById('id' + i).style.left="25px"; 
        }
    }else{
		pizzaTypeValue = 15 + 1* numOfToppings ;
		for(var i=1; i<=7; i++){
            document.getElementById('id' + i).style.width="300px";
            document.getElementById('id' + i).style.height="300px"; 
			document.getElementById('id' + i).style.top="0px";
			document.getElementById('id' + i).style.left="0px"; 
        }
    }
		document.getElementById('price').innerHTML = pizzaTypeValue.toPrecision(3);
}
/*================================================*/
 // I have got this code from past exam soft 6008 and I changed to my idea
//PPS validation
 function  ppsNumber(pps) {
    var pps = document.getElementById("ppNumber").value;
    var sum=0;
    var multiplier=pps.length; 
    var valid=new Boolean(true);
      // check if length pps is 8
      if(pps.length!=8){
       valid=false;
      }
       // check if pps length is greater or equal to 0 or less than or equal to 9
      for (var i = 0; i < pps.length-1; i++) {
          var number = parseInt(pps.charAt(i));  
           if(!(number>=0) && (number<=9)) { 
	         valid = false; 
	     }
      }
      pps=pps.toUpperCase();
      // check if first 7 characters entered are digits and get the letter
     var letter=pps.charCodeAt(7);
         letter=letter-64;
     // calculate the sum by multiplying each digit
     for (var i = 0; i < 7; i++){
         var digit= parseInt(pps.charAt(i)); 
           digit*=multiplier;
           multiplier--;
           sum+=digit;	  
     }
	 // check if letter is w then set to 0
     if(letter == 23){
       letter = 0;
     } 
	 // check if the 7 digits mod 23 equal to to the letter value if not set valid false
     if (sum % 23!= letter){
       valid = false;
     }	
     return valid;
}


/*================================================*/

//phone validation
function validatePhone(){
  // get user phone number as string
  var num = document.getElementById("phoneNumber").value;
  var number = num.length;
  var digit = num.slice(2,3); 
  
  //Checks the length of phone digits to be 10 and if starts with '08' 		
  if (number != 10 || num.slice(0,2) != "08" ){
		alert("INVALID phone NUMBER TRY AGAIN");
		return false;
  }

  //Checks the third digit of the phone to be Irish Mobile numbers (3,5,6,7,9)
  if (!(digit == "3" || digit == "5" || digit == "6" || digit == "7" || digit == "9")){
		alert("INVALID phone NUMBER TRY AGAIN");
		return  false;
  }	
  return true;
}
/*================================================*/

function validateInput(){
     if(validatePPS() && validatePhone() ){

        return true;
    }else{

        return false;
    }
}
/*================================================*/

function disccountPrice() {

		dissum = parseInt(document.getElementById('price').value) * 0.9;
		
		document.getElementById('price').value =  dissum.toFixed(2);

		document.getElementById('discount').innerHTML="Discount applied";
}
