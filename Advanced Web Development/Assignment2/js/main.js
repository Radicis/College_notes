
/* ----  AXAJ call to get randomuser.me JSON object */
$.ajax({
	 //Request 5 results
	  url: 'http://api.randomuser.me/?results=5',
	  dataType: 'json',
	  success: function(data){		
		console.log(data);
		//Iterate through the JSON objects contained in the array data.results
		for(var i=0;i<data.results.length;i++){
			//Target the i+n nthchild and put in img src
			$("#users li:nth-child(" + (i+1) + ") img").attr("src",data.results[i].user.picture.thumbnail);
			//Get the first name attribute from the name key and uppercase the first letter
			var firstName = data.results[i].user.name.first.charAt(0).toUpperCase() + data.results[i].user.name.first.slice(1);
			//Uppercase the first letter of the last name
			var lastName = data.results[i].user.name.last.charAt(0).toUpperCase() + data.results[i].user.name.last.slice(1);
			//Combine both names into full name
			var fullName = firstName + " " + lastName;
			//Target the i+n nthchild and put in name into data
			$("#users li:nth-child(" + (i+1) + ") .data").html(fullName);
		}
	  }
});


function hideMenu()
{
	document.getElementById('main-nav').classList.remove("menu-down");
	//Remove the rounded corners class to make it flush with menu
	document.getElementById('menu-button').classList.add("round");
	document.getElementById('menu-button').onclick = showMenu;
}
function showMenu()
{
	document.getElementById('main-nav').classList.add("menu-down");	
	//Remove the rounded corners class to make it a circle again
	document.getElementById('menu-button').classList.remove("round");
	document.getElementById('menu-button').onclick = hideMenu;
}

function init()
{
	document.getElementById('menu-button').onclick = showMenu;
}



/* ----  Format of Ajax object for reference ---- >

{
  results: [{
    user: {
      gender: "female",
      name: {
        title: "ms",
        first: "lois",
        last: "williams"
      },
      location: {
        street: "1969 elgin st",
        city: "frederick",
        state: "delaware",
        zip: "56298"
      },
      email: "lois.williams50@example.com",
      username: "heavybutterfly920",
      password: "enterprise",
      salt: ">egEn6YsO",
      md5: "2dd1894ea9d19bf5479992da95713a3a",
      sha1: "ba230bc400723f470b68e9609ab7d0e6cf123b59",
      sha256: "f4f52bf8c5ad7fc759d1d4156b25a4c7b3d1e2eec6c92d80e508aa0b7946d4ba",
      registered: "1288182167",
      dob: "146582153",
      phone: "(555)-942-1322",
      cell: "(178)-341-1520",
      SSN: "137-37-8866",
      picture: {
        large: "http://api.randomuser.me/portraits/women/55.jpg",
        medium: "http://api.randomuser.me/portraits/med/women/55.jpg",
        thumbnail: "http://api.randomuser.me/portraits/thumb/women/55.jpg",
      },
      version: "0.4.1"
    },
    seed: "graywolf"
  }]
}



*/