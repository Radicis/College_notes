//  -> Testing variables

set_width = 500;
set_height = 300;
	
data=
	[
		{name:"Mon", amount:0, colour:"red"},
		{name:"Tue", amount:0, colour:"blue"},
		{name:"Wed", amount: 0, colour:"yellow"},
		{name:"Thur", amount: 0, colour:"green"},
		{name:"Fri", amount: 0, colour:"orange"},
		{name:"Sat", amount: 0, colour:"black"},
		{name:"Sun", amount: 0, colour:"brown"}
	];

// -> end testing variables
	
var graph = function(){

 canvas = document.getElementById('myCanvas');
 context =  canvas.getContext("2d");

 borderWidth = 10;
 fontSize = 10;
 padding = 5;
 
 percent = 0;

 valueArray = [];
 snapArray = [];

 data = data;

 canvas.width = set_width;
 canvas.height = set_height;

//Max height of bars
 maxHeight =  canvas.height - (borderWidth*2 + ( padding * 2 + ( fontSize)));


//Creates the underlying graph
 initGraph = function() {
	//Create gridlines on graph
    var blockHeight =  maxHeight / 10;

     context.strokeStyle = "#ccc";

    for (var i = 0; i <= 10; i++) {
         context.beginPath();
         context.moveTo(borderWidth, (borderWidth + padding) + (blockHeight * i));
         context.lineTo(canvas.width -  borderWidth, (borderWidth + padding) + (blockHeight * i));
         context.closePath();
         context.stroke();
    }

    //Create axis and labels
     context.strokeStyle = "#222";
	
    var colWidth = (set_width - ( borderWidth * 2)) /  data.length;

    //Draw horizontal axis labels
    for (var i = 0; i <  data.length; i++) {
         context.fillText(data[i].name, (i * colWidth) + (colWidth / 2), (set_height - borderWidth + padding/2));
    }
    //Draw Y Axis
     context.moveTo( borderWidth, (set_height -  borderWidth -  fontSize -  padding));
     context.lineTo( borderWidth,  borderWidth);
     context.stroke();

    //Draw X Axis
     context.moveTo( borderWidth, (set_height -  borderWidth -  fontSize -  padding));
     context.lineTo(set_width -  borderWidth+2, (set_height -  borderWidth -  fontSize -  padding));
     context.stroke();

}

//Creates the bar graph bars
 initBars = function() {		
	
		var colWidth = (set_width - ( borderWidth * 2)) /  data.length;

		for (var i = 0; i <  data.length; i++) {

			//Create linnear gradient based on object colour
			grad =  context.createLinearGradient(0, 0, 0,  maxHeight);
			grad.addColorStop(0.5,  data[i].colour);
			grad.addColorStop(1, '#eee');
			
			 context.fillStyle = grad;
			 context.shadowColor = "black";
			 context.shadowOffsetX = 2;
			 context.shadowOffsetY =2;
			 context.shadowBlur = 5;
			//context.fillStyle = data[i].colour; //for block colour

			//Create Graph bar
			var colHeight = ((( maxHeight / 100) *  data[i].amount));
			
			context.fillRect(borderWidth+1 + (colWidth * i) + 1, (set_height+1 - (colHeight + 1 + padding + fontSize * 2)), colWidth-3, colHeight-1);
			//Add the border to the bar
			 context.strokeStyle = "#fefefe";
			 context.strokeRect(borderWidth+1 + (colWidth * i) + 1, (set_height+1 - (colHeight + 1 + padding + fontSize * 2)), colWidth-3, colHeight-1);
			
			//reset drop shadow
			 context.shadowOffsetX = 0;
			 context.shadowOffsetY = 0;
			 context.shadowBlur = 0;

			//Create value % over bar
			 context.fillStyle = "black";
			 context.fillText( data[i].amount + "%", (i * colWidth) + (colWidth / 2) -3, ( canvas.height - (colHeight +  padding * 2 +  fontSize * 2)));
		}

}

//Callback function to resolve closure issue in for loop in below function
 updateValue = function(i) {
    return function() {
        i.innerHTML = this.value + "%";
    }
}

//Creates and displays the value slider div to modify graph values
 showSliders = function() {

    var sliders = document.getElementById('sliders');
	var sliderWrap = document.getElementById('sliderWrap');

    //check if slider div is already populated to prevent duplication
    //If not then create containing div input range sliders and labels
    if (sliders.childNodes.length == 0) {

        var newTitle = document.createElement('h2');
        var newText = document.createTextNode("Set Values");
        newTitle.appendChild(newText);
        sliders.appendChild(newTitle);

        for (var i = 0; i <  data.length; i++) {
            var j = i;

            var newLabelSpan = document.createElement('span');
            var newLabel = document.createTextNode( data[i].name);

            newLabelSpan.appendChild(newLabel);

            var newSlide = document.createElement('input');
            newSlide.type = "range";
            newSlide.id =  data[i].name + "val";
            newSlide.value =  data[i].amount;

            var newValue = document.createElement('span');

            newValue.innerHTML = newSlide.value + "%";

            newSlide.oninput =  updateValue(newValue);

            var newBreak = document.createElement('br');

            sliders.appendChild(newLabelSpan);
            sliders.appendChild(newSlide);
            sliders.appendChild(newValue);
            sliders.appendChild(newBreak);
        }

        var saveButton = document.createElement('button');
        var saveText = document.createTextNode("Save");
        saveButton.appendChild(saveText);
        saveButton.onclick = function() {
            var values = [];
            var sliders = document.getElementById('sliders');
            var ranges = sliders.getElementsByTagName('input');
            for (var i = 0; i <  data.length; i++) {
                values[i] = ranges[i].value;
            }
             setValues(values);
            sliderWrap.style.display = "none";
        };
        sliders.appendChild(saveButton);

        var closeButton = document.createElement('button');
        var closeText = document.createTextNode("Close");
        closeButton.appendChild(closeText);
        sliders.appendChild(closeButton);
        closeButton.onclick = function() {
            sliderWrap.style.display = "none";
        };
    }
    sliderWrap.style.display = "block";
}

//Gets the graph values stored in local storage and puts them in the data array if present uses default if not
 getValues = function() {
    var valueArray = [];

    try {
        valueArray = JSON.parse(localStorage.values);
    } catch (err) {
        console.log("No local data found, using defaults");
    }
    if (valueArray.length > 0) {
        for (var i = 0; i < valueArray.length; i++) {
             data[i].amount = valueArray[i].amount;
        }
    } else {
        valueArray =  data;
    }
}

//Sets the bar graph values array and the values in localstorage
//Then clears the canvas to refresh new values
 setValues = function(values) {
    for (var i = 0; i <  data.length; i++) {
         data[i].amount = values[i];
         valueArray.push(values[i]);
    }
    localStorage.values = JSON.stringify( data);
     clearCanvas();
     toast("Graph Values Updated");
}

 toast = function(toast) {
    var toasty = document.getElementById('toast');
    toasty.innerHTML = toast;
    fadeout(toasty);
}

//Clear the graph canvas and redraw grid, graph and bars
 clearCanvas = function() {
     context.clearRect(0, 0, set_width, set_height);
     initGraph();
     initBars();
}

//Create snapshot div and return created imagelink div
 createSnap = function(snap) {
    var snapshotImage = new Image();
    snapshotImage.src = snap;
    //snapshotImage.width =  canvas.width;	
    //snapshotImage.height =  canvas.height;	

    var imageLinkContainer = document.createElement("div");
    var imageLink = document.createElement('a');
    imageLink.href = snap;
    imageLink.onclick = function() {
        createLightBox(imageLink.href);
        return false;
    };
    var delButton = document.createElement("a");
    delButton.className = "deleteButton";
    var delText = document.createTextNode("X");
    delButton.appendChild(delText);
    delButton.onclick = function() {
             removeSnap(this.parentNode);
        }
        /*		
	var timeStamp = document.createElement('p');
	timeStamp.className = "timestamp";
	var timeText = document.createTextNode( timeStamp());
	timeStamp.appendChild(timeText);
	*/
    imageLink.appendChild(snapshotImage);
    imageLinkContainer.appendChild(imageLink);
    //imageLinkContainer.appendChild(timeStamp);
    imageLinkContainer.appendChild(delButton);

    return imageLinkContainer;
}

//Creates a new snap and adds it to the roll and localstorage
 snapshot = function() {

    var newCanvas = document.createElement('canvas');
    newCanvas.width =  canvas.width;
    newCanvas.height =  canvas.height;

    var newContext = newCanvas.getContext("2d");

    //Get the dataurl of the graph canvas and draw it on newCanvas
    var graphURL =  canvas.toDataURL();
    var graphImage = new Image();
	var drawingImage = new Image();
	var snapshot;
    graphImage.src = graphURL;
    graphImage.onload = function() {
		newContext.drawImage(graphImage, 0, 0, newCanvas.width, newCanvas.height);
		//Get the dataurl of the draw canvas and draw it on newCanvas
		var drawURL = canvasObj.toDataURL();
		drawingImage.src = drawURL;
		drawingImage.onload = function(){
			newContext.drawImage(drawingImage, 0, 0, newCanvas.width, newCanvas.height);
			//Get the dataurl of newCanvas and create an image element from it
			snapshot = newCanvas.toDataURL();
			//pass url to function to create imageLink div
			imageLinkContainer =  createSnap(snapshot);

			//Add to array for local storage
			 snapArray.push(snapshot);
			localStorage.snaps = JSON.stringify( snapArray);

			//Add snap to roll div
			var roll = document.getElementById('roll');
			var noSnaps = document.getElementById('nosnaps');
			if (noSnaps != null) {
				roll.removeChild(noSnaps);
				roll.appendChild(imageLinkContainer);
			} else {
				roll.insertBefore(imageLinkContainer, roll.childNodes[0]);
			}
			 toast("Snapshot Created");
		};
	};
}

//Removes all snaps from roll and localstorage
 deleteRoll = function() {
    var roll = document.getElementById('roll');
    while (roll.hasChildNodes()) {
        roll.removeChild(roll.lastChild);
    }
    localStorage.removeItem('snaps');
    var noSnaps = document.createElement('p');
    noSnaps.id = "nosnaps";
    var noSnapText = document.createTextNode("No Snapshots");
    noSnaps.appendChild(noSnapText);
    var roll = document.getElementById('roll');
    roll.appendChild(noSnaps);
     toast("All snapshots deleted");
}

//Populates the roll div with snaps from localstorage
 setSnaps = function() {
    var snaps = [];
    try {
        snaps = JSON.parse(localStorage.snaps);
        for (var i = 0; i < snaps.length; i++) {
             snapArray.push(snaps[i]);
            //pass url to function to create imageLink div
            imageLinkContainer =  createSnap(snaps[i]);

            var roll = document.getElementById('roll');
            var noSnaps = document.getElementById('nosnaps');

            //Check if only no snap message is child and replace if so
            if (noSnaps != null) {
                roll.removeChild(noSnaps);
                roll.appendChild(imageLinkContainer);
            } else {
                roll.insertBefore(imageLinkContainer, roll.childNodes[0]);
            }
        }
    } catch (err) {
        //If no snap data found in local then display no snaps message
        var noSnaps = document.createElement('p');
        noSnaps.id = "nosnaps";
        var noSnapText = document.createTextNode("No Snapshots");
        noSnaps.appendChild(noSnapText);
        var roll = document.getElementById('roll');
        roll.appendChild(noSnaps);
    }
}

//Removes a snap from roll and local storage
 removeSnap = function(snap) {
    //Remove snap div from roll
    var roll = document.getElementById('roll');
    roll.removeChild(snap);
    //Remove snap from snapArray if match is found
    for (var i = 0; i <  snapArray.length; i++) {
        if (snap.firstChild.href ==  snapArray[i]) {
             snapArray.splice(i, 1);
        }
    }

    //Refresh Local storage
    if ( snapArray.length == 0) {
        localStorage.removeItem('snaps');
         setSnaps();
    } else {
        localStorage.snaps = JSON.stringify( snapArray);
    }
     toast("Snapshot Deleted");
}

 init = function(){
	//Set up graph
	 getValues();	
	 clearCanvas();
	 setSnaps();
	
		
	//Set handlers	
	changeVal.onclick =	 showSliders;
	
	document.getElementById("selectLine").onclick = function(){
		swapLine(this.value);
	};
	document.getElementById("selectCol").onclick = function(){
		swapCol(this.value);
	};

	document.getElementById("selectFill").onclick = function(){
		swapFill(this.value);
	};
		
	document.getElementById("clearbutton").onclick = clearDrawCanvas;
	document.getElementById("snapShot").onclick =  snapshot;
	document.getElementById("delRoll").onclick =  deleteRoll;
}
return { init: init };

}()