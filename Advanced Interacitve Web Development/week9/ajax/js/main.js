function doStuff(fileName){

	var x = new XMLHttpRequest();        
	x.open('GET', fileName + '.xml'); 
	x.onreadystatechange = function () {
		if (x.readyState == 4) {            
			var html = "";
			xml = x.responseXML; 
			student = xml.getElementsByTagName('studentrecord')[0];
			
			var sName = student.getElementsByTagName('name')[0].firstChild.data; 
			var sAddress = student.getElementsByTagName('address')[0].firstChild.data;
			var sID = student.getElementsByTagName('id')[0].firstChild.data; 
			var sEmail = student.getElementsByTagName('email')[0].firstChild.data; 
			
			html += "<strong>Name: </strong>" + sName
				+ "<br /><strong>Address: </strong>" + sAddress
				+ "<br /><strong>ID: </strong>" + sID
				+ "<br /><strong>Email: </strong>" + sEmail;
			
			
			var sGrades = student.getElementsByTagName('grades')[0].getElementsByTagName('result');	

			html += "<table border='1'>";		

			console.log(sGrades[0].getElementsByTagName('mark')[0].firstChild.data);
			
			for(var i=0;i<sGrades.length;i++){
				html += "<tr><th>" + sGrades[i].getElementsByTagName('module')[0].firstChild.data + "</th><td>" + sGrades[i].getElementsByTagName('mark')[0].firstChild.data + "</td></tr>";
			}
			
			html += "</table>";
			
			
			document.getElementById("content").innerHTML = html; 
		}
	};
	x.send(null);  

}

document.getElementById("button1").onclick = function(){
	doStuff("file1");
};

document.getElementById("button2").onclick = function(){
	doStuff("file2");
};