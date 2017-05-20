function getFlick() {
	//Clear out old thumbnails
	$('#thumbnails').html("");	
	
	//clear tag string
	var tagStr = "";
	
	//For each .tag elements appends its value to the tagstr
	$('.tag').each(function(){
		tagStr += $(this).val();
		if($(this).parent().next().length>0){
			tagStr += ",";
		}
	});
	
	//Encode for placement in url string
	tagStr = encodeURI(tagStr);
	
	//Build api call string
	var url = "https://www.flickr.com/services/rest/?";
	url += "method=flickr.photos.search";
	url += "&per_page=15";
	url += "&api_key=713f25a4b8b90358a65695528e90ef59";
	url += "&tags=" + tagStr;
	url += "&tag_mode=all";
	url += "&format=json&jsoncallback=?";
	
	//Set loading gif into search button
	$('#search').html("<img src='img/ajax-loader.gif' />");
	
	url = encodeURI(url);
	
	$.getJSON(url, function(data){
		 if(data.photos.photo.length==0){
			$('#search').html("Find Images");
			$('#bigImage').html('<h3>No Results</h3>');
		 }
		 else{
		 for (i = 0; i < data.photos.photo.length; i++ )
			 {
				newStr="";
				url = "http://farm" + data.photos.photo[i].farm ;			 
				url += ".static.flickr.com/" ;			 
				url += data.photos.photo[i].server + "/";			 
				url += data.photos.photo[i].id + "_";			 
				url += data.photos.photo[i].secret;
				var largeUrl = url + "_b.jpg";
				url += "_t.jpg"			
				newStr += " <li><img title='" + data.photos.photo[i].title + "' data-imgID=" + largeUrl + " src = " + url + "></li>"; 
				$('#thumbnails').append(newStr);
			 }
			$('#thumbnails li:first-child').addClass("active");
			
			//Load the image into the main section
			var imgUrl = $('#thumbnails li:first-child > img').attr('data-imgID');
			//Center carousel
			moveSlide();
			//Load focused images into main section
			loadImage(imgUrl);
			//Reset search button text
			$('#search').html("Find Images");
		 }
	});
}
 
 //Loads passed URL into main display div
function loadImage(imgUrl){
	var newImg = new Image();
	newImg.classList.add('fullImage');
	newImg.src = imgUrl;
	$('#bigImage').html("<img class='loader' src='img/ajax-loader.gif' />");
	newImg.onload = function(){
		$('#bigImage').html(newImg);
	};		

}	

//Creates a new tag input box
function addTag(){
	var tags = $('#left').find('.tag');	
	var newTag = '<div class="tag-container"><input type="text" class="tag" id="tag' + (tags.length+1) + '" /><button class="minus">-</button></div>'
	$('#tags').append(newTag);
	$('.minus').click(function(){
		delTag($(this).closest('.tag-container'));
	});	
}

function delTag(tag){
	$(tag).remove();
}

function moveSlide(){

	//Select active thumbnail
	var activeThumb = $('#thumbnails > .active img');
	
	//get width of thumbnails ul
	var thumbWidth = $('#thumbnails').width();
	
	//Find middle of carousel
	var carouselWidth = $('#carousel').width();
	
	//get width of all current active image
	var activeWidth = $('#thumbnails > .active img').width();

	//get width of all images left of the active
	var prevWidth = 0;
	
	//Select all previous elements in list and add up width plus margins/padding
	var imgMargin = 22;
	var prevThumbs = $('#thumbnails > .active').prevAll().each(function(){
			prevWidth += $(this).width() + imgMargin;
	});
	
	//put active image in center
	activeThumb = $('#thumbnails > .active img');
	var thumbMiddle = carouselWidth/2 - activeWidth-prevWidth;
	
	var activeLi = $('#thumbnails > .active');
	
	$('#thumbnails').animate({left:thumbMiddle}, {duration:300, queue:false});	
	
	//Load the image into the main section
	imgUrl = $(activeThumb).attr('data-imgID');
	loadImage(imgUrl);
	
}

//Centers carousel to add responsive function
window.onresize = function() {    
	moveSlide();
}

function moveRight(){
	var active = $('#thumbnails .active');
	
	if(!active.next().length){
		active.removeClass('active');		
		$('#thumbnails li:first-child').addClass('active');	
	}
	else{			
		active.removeClass('active');
		var next = active.next('li');
		next.addClass('active');	
	}			
	//Center active image		
	moveSlide();
}

function moveLeft(){
	var active = $('#thumbnails .active');
		
	if(!active.prev().length){
		active.removeClass('active');		
		$('#thumbnails li:last-child').addClass('active');	
	}
	else{			
		active.removeClass('active');
		var prev = active.prev('li');
		prev.addClass('active');	
	}
	//Center active image		
	moveSlide();
}
   
$(document).ready(function(){
    //Bind Left arrow Click
	$("#control-left").click(function(){
		moveLeft();
    });
	
	//Bind Right arrow Click
	$("#control-right").click(function(){
		moveRight();
    });
	
	//Bind Arrow Key presses
	$(document).keydown(function(event){
		switch(event.which){
			case 37: moveLeft();break;
			case 39: moveRight();break;
			default: break;
		}
    });
	
	//Bind thumbnail Click
	$("#thumbnails").on('click', 'li', function(){		
		var active = $('#thumbnails .active');
		active.removeClass('active');
		$(this).addClass('active');
		
		//Load the image into the main section
		imgUrl = $(this).find('img').attr('data-imgID');
		loadImage(imgUrl);
		
		//Center active image		
		moveSlide();		
    });
	
	$('#search').click(function(){
		var tag = $('#tag1').val();
		
		//check if tag1 field is empty before searching
		if(tag!=""){
			getFlick();
		}
		else{
			alert("Please input 1 tag");
		}
	});	
	
	$('#plus').click(function(){
		addTag();
	});	
	
}); 