function validate(){	
	
	var telValid = new Boolean(true);
	var emailValid = new Boolean(true);
	
	//Email validation
	var email = document.forms["myForm"]["inpEmail"].value;
	
	//Check for empty value
	if ((email == null)||(email == "")){
		emailValid = false;
	}
	
	//Get indexes of the @ and . characters in the value
	var atPos = email.indexOf("@");
	var dotPos = email.lastIndexOf(".");
	
	//Check if the @ is more than 1 character in, 
	//the last . is before the @ 
	//and if there are 2 chars after the .
	if(atPos<1 || dotPos < atPos+2 || dotPos+3>email.length){
		emailValid = false;
	}
	
	//Telephone number validation
	var tel = document.forms["myForm"]["inpTel"].value;
	if ((tel == null)||(tel == "")){
		telValid = false;		
	}
	
	if (tel.length != 10){
		telValid = false;		
	}

	var x = tel.slice(2,3);
	
	if(!(x=="3"|| x=="6"|| x=="7"|| x=="8" || x=="8")){
		telValid = false;
	}	
	
	if (tel.slice(0,2) != "08"){
		telValid = false;		
	}
	
	for(i=3;i<10;i++){
		var c = tel.slice(i,i+1);
		if((c<"0") || (c>"9")){			
			telValid = false;
		}
	}		
	
	if((emailValid==true)&&(telValid==true)){
		return true;
	}
	else{
		return false;
	}
	
}