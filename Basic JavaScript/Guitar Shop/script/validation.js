var storeTotal = 0;


function validate(form){	
	//Initialise variables with form content that needs operating on
	var email = form.inpEmail;
	var tel = form.inpTel;
	var cardNum = form.inpCardNum;
	var pps = form.inpPpsNum;
	var discount = form.inpDiscount;
	var totalCost = form.hiddenTotal;
	
	//Protect against multiple discounts
	if(storeTotal == 0){
			storeTotal = totalCost.value;
	}


	//Validate Email if not null
	if(email.value!=""){
		if(!validateEmail(email, storeTotal)){
			return false;
		}
	}
	
	//Validate Tel num if not null
	if(tel.value!=""){
		if(!validateTel(tel)){
		return false;
		}
	}
	
	//Validate Card number is not null
	if(cardNum.value!=""){
		if(!validateCard(cardNum)){
			return false;
		}
	}
	
	//Validate PPSN is not null
	if(pps.value!=""){
		if(!validatePPS(pps)){
			return false;
		}
	}

	//check for valid discount code
	if(discount.value!=""){
		if(!validateDiscount(discount, storeTotal)){
			return false;
		}
	}
	
	form.hiddenTotal.value = document.getElementById('totalCost').innerHTML;
	
	return true;
}


//Validate the pps number
function validatePPS(pps){		
	var x = pps.value;
	//Check for valid length
	if(x.length!=8){
		setValid(pps, 0);
		return false;
	}
	//Check for letter in last position
	letter = (x.charAt((x.length-1))).toLowerCase();	
	if((parseInt(letter)<=9) || (parseInt(letter)>=0)){
		setValid(pps, 0);
		return false;
	}	
	//Multiply all numbers by relevant number and add to total
	var totalNum =0;
	multiNum = 8;
	for(var i=0;i<=6;i++){		
		y=parseInt(x.charAt(i), 10)	
		if(isNaN(y)){
			setValid(pps, 0);
			return false;
		}
		else{
			totalNum = totalNum+(y*multiNum);		
			multiNum--;
		}
	}
	var modNum = 0;
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	modNum = (Math.ceil(totalNum%23));	
	var modChar = (alphabet.charAt(parseInt(modNum, 10)-1));
	//Check if the calculated mod character is the same as the final ppsn char	
	if(modChar!=letter){
		setValid(pps, 0);
		return false;
	}
	setValid(pps, 1);
	return true;
}

//Email validation
function validateEmail(email, total){

	var emailVal = email.value;
	//Check for empty value to prevent crash if this function is passed empty value
	if ((emailVal == "")||(emailVal == null)){
		setValid(email, 0);
		return false;
	}

	//Get index of the @ and . characters in the value string
	var atPosition = emailVal.indexOf("@");
	var dotPosition = emailVal.lastIndexOf(".");

	//Check if the @ is more than 1 character in, 
	//the last dot is before the @ 
	//and if there are 2 chars after the dot
	if(atPosition<1 || dotPosition < (atPosition+2) || (dotPosition+3)>emailVal.length){
		setValid(email, 0);
		return false;
	}
	//Once valid email has been verified check for mycit.ie or cit.ie domain and reduce cost if it is
	
	var checkDomain = emailVal.substring((atPosition+1), emailVal.length);	
	if (checkDomain == "mycit.ie" || checkDomain == "cit.ie"){				
		var newTotal = parseFloat(total) * 0.8;
		total = newTotal;
		var showTotal = document.getElementById("totalCost");
		showTotal.innerHTML = newTotal;
		alert("Total Cost reduced by 20% due to payment from CIT domain email address!");
	}	

	//Set email field styling to valid
	setValid(email, 1);
	return true;
}

//Telephone number validation
function validateTel(tel){
	
	var telVal = tel.value;
	if ((telVal == null)||(telVal == "")){
		setValid(tel, 0);
		return false;	
	}
	
	if (telVal.length != 10){
		setValid(tel, 0);
		return false;	
	}

	var x = telVal.slice(2,3);
	
	if(!(x=="3"|| x=="6"|| x=="7"|| x=="8" || x=="8")){
		setValid(tel, 0);
		return false;
	}	
	
	if (telVal.slice(0,2) != "08"){
		setValid(tel, 0);
		return false;		
	}
	
	for(i=3;i<10;i++){
		var c = telVal.slice(i,i+1);
		if((c<"0") || (c>"9")){			
			setValid(tel, 0);
			return false;
		}
	}
	setValid(tel, 1);
	return true;
}

//Credit card validation
function validateCard(cardNum){
	var cardVal = cardNum.value;		
	
	if(cardVal.length!=16){
		setValid(cardNum, 0);
		return false;
	}
	
	for(var i=0;i<cardVal.length;i++){
		if(isNaN(cardVal.charAt(i)) || isNaN(cardVal.charAt(i))){
			setValid(cardNum, 0);
			return false;
		}
	}
	setValid(cardNum, 1);
	return true;
}

//Discount code validation
function validateDiscount(discount, total){
	var discVal = discount.value.toLowerCase();
	if(discVal.search(/colin/) != -1){
		var newTotal = parseFloat(total) * 0.2;		
		total = newTotal;
		var showTotal = document.getElementById("totalCost");
		showTotal.innerHTML = newTotal;
		alert("Total Cost reduced by 80% due to valid discount code");
		setValid(discount, 1);
		return true;
	}
	else{
		setValid(discount, 0);
		return false;
	}	
	return false;
}



//swap isValid and isInvalid classes on objects
function setValid(item, check){
	if(check==1){
		item.classList.remove("isInvalid");
		item.classList.add("isValid");
	}
	else if(check ==0){
		item.classList.remove("isValid");
		item.classList.add("isInvalid");
	}
	else{
		item.classList.remove("isValid");
		item.classList.remove("isInvalid");
	}
}


function resetForm(form){
	//If this is from the buyform reset button 
	if(form.id=="buyForm"){		
		//Get a list of all form elements and remove valid/invalid styling		
		var itemList = form.elements;
		for(var i=0;i<itemList.length;i++){
			setValid(itemList[i], 2);
		}
	}
	else if(form.id=="guitarOptions"){		
		document.getElementById("thisCost").innerHTML = "1295";
		setStandardGuitar();
	}

}

