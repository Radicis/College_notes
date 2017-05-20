function ManTroll(form){
	
	var input = form.troll.value; //ignore this
	
	//Set string to uppercase	
	input = input.toUpperCase();
	
	//Extract first character
	var raceChar = input.charAt(0);
	//Check if first character is 4 or 5 to validate troll (not needed but I did it for some reason)
	if(!(raceChar == '4' || raceChar == '5')){
		alert("Invalid race char");
		return false;
	}
	//Check if first char is 5 to validate male troll
	if(raceChar != '5'){
		alert("Invalid gender");
		return false;
	}
	
	//Get the number part of the string
	var num = input.slice(0,input.length-1);
	
	var j = 3;
	var total = 0;
	//Loop through the digits in that string and multiply them by the relevant multiplier (j)
	for(var i=0;i<num.length;i++){
		var multiplied = parseInt(num.charAt(i), 10) * j;
		//Add to the total
		total = total + multiplied;
		j++;
	}
	
	//Get the ending check character as a code and take 65 from it to set A to zero and so on
	var checkChar = parseInt(input.charCodeAt(input.length-1), 10) - 65;
	//Add it to the total
	total = total + checkChar;	
	//check mod 10 is zero
	if(total%10!=0){
		alert("invalid");
		return false;
	}	
	alert("Valid");
	return true;
}

//Validate the pps number
function validatePPS(form){			
	
	var pps = form.inp.value;	
	
	//check if null
	
	if(pps==""){
		alert("Please enter a number");
		return false;
	}
	
	//check length
	
	if(pps.length!=8){
		alert("Invalid length");
		return false;
	}
	
	//extract number

	var num = pps.substring(0,7);
	var x;
	
	for(var i=0;i<num.length;i++){
		x = parseInt(num.charAt(i), 10);
		//alert(x);
		if(!(x<=9 || x>=0)){  
			alert("invalid number " + x);
			return false;
		}
	}
	
	j = 8;
	var total = 0;
	var thisNum;
	var newNum;
	
	for(i=0;i<num.length;i++){
		thisNum = num.charAt(i);		
		newNum = (thisNum * j);
		j--;
		total = total + newNum;
	}
	
	var modNum = (total%23) + 64;
	
	var modChar = pps.charCodeAt(pps.length-1);		
	
	if(modNum!=modChar){
		alert("invalid checksum");
		return false;
	}
	
	alert("Valid PPSN")
	
	return true;
}

function validateFinMale(form){
	
	var fin = form.inp2.value.toUpperCase();	
	//DDMMYYCZZZQ
	
	var pin = fin.substring(7, 10);
	
	if(pin%2==0){
		alert("even PIN");
		return false;
	}
	
	var day = fin.substring(0,2);
	if(day>31 || day<1){
		alert("invalid day");
		return false;
	}
	
	var month = fin.substring(2,4);
		if(month>12 || month<1){
		alert("invalid month");
		return false;
	}
	
	var year = fin.substring(4,6);

	
	
	var longNum = day + month + year + pin;
	
	modNum = parseInt(longNum, 10)%31;
	
	var theseChars = "0123456789ABCDEFHJKLMNPRSTUVWXY";	
		
	var modChar = fin.charAt(fin.length-1);	

	
	if(!(theseChars.charAt(modNum) == modChar)){
		alert("invalid check char");
		return false;
	}
	
	alert("Valid");
	return true;
	
}


function validateISBN(form){
	var isbn = form.inp4.value;
	
	var num = isbn.substring(0,isbn.length-1);	
	
	var checkDig = isbn.charAt(isbn.length-1);
	
	if(checkDig=='X'){
		checkDig = parseInt(10, 10);
	}
	else{
		checkDig = parseInt(isbn.charAt(isbn.length), 10);
	}

	var total = 0;
	var newNum = 0;
	var count = 1;
	j = num.length-1;
	
	for(var i=0;i<num.length;i++){		
		newNum = (i+2) * parseInt(num.charAt(j), 10);			
		total = total+newNum;
		j--;
	}
	
	total = total + checkDig;

	if(total%11!=0){
		alert("invalid mod");
		return false;
	}
	alert("Valid");
	return true;
}


function validateEuro(form){
	var euro = form.inp3.value;
	
	var country = (parseInt(euro.charCodeAt(0), 10) - 64);

	var bigNum = euro.substring(1,euro.length);
	
	var total = country + bigNum;
	
	if(total%9!=8){
		alert("invalid");
		return false;	
	}
	alert("Valid");
	return true;
}