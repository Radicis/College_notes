
var k;
var winningFace;
var answer_face;

//Declare image array
var faceArray = new Array();

//initialise array of objects
var base_path = "images/faces/";

faceArray[0] = new face((base_path + "face1.jpg"), "female_blonde_white_longhair", "Jill");
faceArray[1] = new face((base_path + "face2.jpg"), "man_brown_white_shirt", "Jack");
faceArray[2] = new face((base_path + "face3.jpg"), "female_brown_white_shirt_glasses", "Emily");
faceArray[3] = new face((base_path + "face4.jpg"), "man_bald_black", "Roger");
faceArray[4] = new face((base_path + "face5.jpg"), "female_brown_white", "Lily");
faceArray[5] = new face((base_path + "face6.jpg"), "man_bald_black_glasses_shirt", "Steve");
faceArray[6] = new face((base_path + "face7.jpg"), "female_brown_white_shirt", "Anna");
faceArray[7] = new face((base_path + "face8.jpg"), "man_brown_white_beard", "Julio");
faceArray[8] = new face((base_path + "face9.jpg"), "female_blonde_white", "Pam");
faceArray[9] = new face((base_path + "face10.jpg"), "man_brown_asian_shirt", "Hu");
faceArray[10] = new face((base_path + "face11.jpg"), "female_blonde_white", "Becky");
faceArray[11] = new face((base_path + "face12.jpg"), "man_brown_white_beard", "Tim");
faceArray[12] = new face((base_path + "face13.jpg"), "female_brown_white_shirt", "Irene");
faceArray[13] = new face((base_path + "face14.jpg"), "man_brown_white", "John");
faceArray[14] = new face((base_path + "face15.jpg"), "man_bald_black_bitch", "Marcellus");

//object face attributes path and features
function face(path, features, name){
	this.path = path;
	this.features = features;	
	this.name = name;
}
//Display answer to user
function answer(){
	document.getElementById("answer").innerHTML = "The answer was: " + answer_face + "!";
}

//Load images in array into table
function loadFaces(){

	var j = 0;
	var rand = Math.floor ( Math.random() * faceArray.length );
	var rand_winner = Math.floor(Math.random()*faceArray.length);
	k=faceArray.length;

	//Select a winnner and set answer variable
	rand = Math.floor ( Math.random() * k );	
	winningFace = faceArray[rand_winner].features;		
	answer_face = faceArray[rand_winner].name;
	
	//loop whole array size > 0 increment face[number] and array position(random) to fill boxes
	while(j !=k){	
		if(faceArray[rand]!=undefined){
			var thisFace = document.getElementById("face" + j);
			thisFace.src = faceArray[rand].path;
			thisFace.title = faceArray[rand].features;
			thisFace.name = faceArray[rand].name;
			document.getElementById("name" + j).innerHTML = faceArray[rand].name;
			delete faceArray[rand];
			j++;
		}		
		rand = Math.floor ( Math.random() * k );	
	}
}


function hideFaces(featureType){
	var i=0;
	var j;		
	//If the question applies to the winning face then hide all that do not have the guess		
	if(winningFace.indexOf(featureType)!=-1){		
		//Remove all non matching feature types		
		while(i<k){			
			//if the image title string contains the substring faceType		
			if((document.getElementById("face" + i).title).indexOf(featureType)==-1)
			{				
				document.getElementById("face" + i).src = (base_path + "noFace.jpg");
				//Make guess background red if incorrect
				document.getElementById(featureType).style.backgroundColor = "#397D02";
			}
			i++;
		}	
	}	
	else{	
	//If the guess does not apply to the winning face then hide all that do not have the guess
		while(i<k){				
			if((document.getElementById("face" + i).title).indexOf(featureType)!=-1)
			{									
				document.getElementById("face" + i).src = (base_path + "noFace.jpg");					
				document.getElementById(featureType).style.backgroundColor = "#ff0000";				
			}
			i++;
		}	
	}
}

//if image is clicked then check properties against winning features
function click_face(face_features){	
	if(face_features!=winningFace){
		alert("Try again!");
	}
	else if(winningFace=="man_bald_black_bitch"){
		alert("DOES HE LOOK LIKE A BITCH??");
	}
	else{
		alert("Winner!");
	}
}

