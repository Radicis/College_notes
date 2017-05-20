<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>Papa Adam's Pizza</title>
<link href="main.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
function redraw()
{
//alert ("hello from redraw");
var pizzaPrice = 0;


// default to large
	pizzaImageSize = 250;
	pizzaBasePrice = 12;
	pricePerTopping = 1;
	

if (document.getElementById('small').checked==true)
	{

	pizzaImageSize = 100;
	pizzaBasePrice = 6;
	pricePerTopping = .5;
	}

if (document.getElementById('medium').checked==true)
	{
	
	pizzaImageSize = 180;
	pizzaBasePrice = 10;
	pricePerTopping = 1;
	}
	
	
document.getElementById('image1').height=pizzaImageSize;
document.getElementById('image1').width=pizzaImageSize;
document.getElementById('image2').height=pizzaImageSize;
document.getElementById('image2').width=pizzaImageSize;
document.getElementById('image3').height=pizzaImageSize;
document.getElementById('image3').width=pizzaImageSize;
document.getElementById('image4').height=pizzaImageSize;
document.getElementById('image4').width=pizzaImageSize;
document.getElementById('image5').height=pizzaImageSize;
document.getElementById('image5').width=pizzaImageSize;
document.getElementById('image6').height=pizzaImageSize;
document.getElementById('image6').width=pizzaImageSize;
document.getElementById('image7').height=pizzaImageSize;
document.getElementById('image7').width=pizzaImageSize;

// do the toppings
howManyToppings = 0;

if (document.getElementById('anchovies').checked==true)
	{
	document.getElementById('image2').style.visibility = "visible";
	howManyToppings = howManyToppings + 1;
	}
else
	{
	document.getElementById('image2').style.visibility = "hidden";
	}
	
	
	
if (document.getElementById('pineapple').checked==true)
	{
	document.getElementById('image3').style.visibility = "visible";
	howManyToppings = howManyToppings + 1;
	}
else
	{
	document.getElementById('image3').style.visibility = "hidden";
	}
	
	
	
	
	
if (document.getElementById('pepperoni').checked==true)
	{
	document.getElementById('image4').style.visibility = "visible";
	howManyToppings = howManyToppings + 1;
	}
else
	{
	document.getElementById('image4').style.visibility = "hidden";
	}
	
	

	
	
	
if (document.getElementById('olives').checked==true)
	{
	document.getElementById('image5').style.visibility = "visible";
	howManyToppings = howManyToppings + 1;
	}
else
	{
	document.getElementById('image5').style.visibility = "hidden";
	}
	
	

	
	
	
if (document.getElementById('onion').checked==true)
	{
	document.getElementById('image6').style.visibility = "visible";
	howManyToppings = howManyToppings + 1;
	}
else
	{
	document.getElementById('image6').style.visibility = "hidden";
	}
	
	

	
	
	
if (document.getElementById('peppers').checked==true)
	{
	document.getElementById('image7').style.visibility = "visible";
	howManyToppings = howManyToppings + 1;
	}
else
	{
	document.getElementById('image7').style.visibility = "hidden";
	}
	
	

	
// calculate price
pizzaPrice = pizzaBasePrice + pricePerTopping * howManyToppings;
document.getElementById('pricetext').innerHTML = pizzaPrice;

}

function validateInput ()
{
var valid  = new Boolean(true);

if (document.getElementById("cname").value == "")
	{
	valid = false;
	document.getElementById("cname").style.backgroundColor = "#ff0000";
	}
	else
	{
	document.getElementById("cname").style.backgroundColor = "#99ff99";
	}

if (document.getElementById("caddress").value == "")
	{
	valid = false;
	document.getElementById("caddress").style.backgroundColor = "#ff0000";
	}
	else
	{
	document.getElementById("caddress").style.backgroundColor = "#99ff99";
	}

	
//Added script to set price value in post	
var hiddenPrice = document.getElementById("pricetext").innerHTML;
document.getElementById('hiddenPrice').value = hiddenPrice;


return valid;
}


</script>




</head>
<body>
		<form  id="pizza-form" onSubmit="return validateInput();" name="theform" method="post" action="vieworder.php">
		    <?php		
				if(isset($_POST['order_id'])){
					echo "<h2>Update order: " . $_POST['order_id'] . "</h2>";
					echo "<input id='hiddenID' type='hidden' name='order_id' value='" . $_GET['order_id'] . "'>";
				}
				else{
					echo "<h2 id='heading'>Pizzas Order Form</h2>";
				}
			?>
			  <h3>What Size of Pizza Would You Like? </h3>
				Small
				<input id="small" type="radio" name="size" value="small" onChange="redraw()" <?php if(isset($_POST['size']) and $_POST['size']=='small') echo "checked";?> />
				Medium
				<input id="medium" type="radio" name="size" value="medium" onChange="redraw()" <?php if(isset($_POST['size']) and $_POST['size']=='medium') echo "checked";?>/>
				Large
				<input id="large" type="radio" name="size" value="large" onChange="redraw()" <?php if(isset($_POST['size']) and $_POST['size']=='large') echo "checked";?> />
		   
			  <div id="pizzaImages">
				<img id="image1" src="images/base.png" width="250" height="250"/>
				<img id="image2" src="images/anchois.png" width="250" height="250"/>
				<img id="image3" src="images/pineapple.png" width="250" height="250"/>
				<img id="image4" src="images/pepperoni.png" width="250" height="250"/>
				<img id="image5" src="images/olives.png" width="250" height="250" />
				<img id="image6" src="images/onion.png" width="250" height="250" />
				<img id="image7" src="images/pepper.png" width="250" height="250"/>
			  </div>
			  <br>
			  <h3>Add Extra Toppings</h3>
			
				Anchovies
			   <input id="anchovies" type="checkbox" name="anchovies" value="yes" onChange="redraw()" <?php if(isset($_POST['anchovies']) and $_POST['anchovies']=='y') echo "checked";?> />
			   
				Pineapple
			  <input id="pineapple" type="checkbox" name="pineapples" value="yes" onChange="redraw()" <?php if(isset($_POST['pineapples']) and $_POST['pineapples']=='y') echo "checked";?> />
			  
				Pepperoni
			   <input id="pepperoni" type="checkbox" name="pepperoni" value="yes" onChange="redraw()" <?php if(isset($_POST['pepperoni']) and $_POST['pepperoni']=='y') echo "checked";?> />
			   
				Olives
				<input id="olives" type="checkbox" name="olives" value="yes" onChange="redraw()" <?php if(isset($_POST['olives']) and $_POST['olives']=='y') echo "checked";?> />
				
				Onion
				<input id="onion" type="checkbox" name="onions" value="yes" onChange="redraw()" <?php if(isset($_POST['onions']) and $_POST['onions']=='y') echo "checked";?> />
				
				Peppers
				<input id="peppers" type="checkbox" name="peppers" value="yes" onChange="redraw()" <?php if(isset($_POST['peppers']) and $_POST['peppers']=='y') echo "checked";?> />
		   
		   
		   
			 <h3>Total Price is: €<span id="pricetext">18</span></h3>
			 <input id="hiddenPrice" type="hidden" name="price" value="">
			  
				<h3>Enter your  details</h3>
				Name:
				<input name="customerName" id="cname" type="text" value="<?php if(isset($_POST['customerName'])) echo $_POST['customerName']; ?>" required />
				<br/>
				<br/>
				Address:
				<textarea name="address" id = "caddress" type="text"rows="5" cols="30" required><?php if(isset($_POST['address'])) echo $_POST['address']; ?></textarea>
				<br/>
				<br/>
				Email Address:
				<input name="email" type="email" value="<?php if(isset($_POST['email'])) echo $_POST['email']; ?>" required />
				<br/>
				<br/>
			   
				<br/>
				Phone Number:
				<input name="phone" id="phoneNumber" type="text" value="<?php if(isset($_POST['phone'])) echo $_POST['phone']; ?>" required/>
				 <br/>
				 <br/>
				Tick here if you are student:
				<input type="checkbox" id="studentdiscount" name="student" onChange="redraw()" <?php if(isset($_POST['student'])) echo "checked";?> />
			   
		  
			  <br/>
			  <?php 
			  
				if(isset($_POST['order_id'])){
					echo "<button type='submit' name='update' value='Update Order' >Update Order</button>";
				}
				else{
					echo "<button type='submit' name='submit' value='Submit Order' >Submit Order</button>";
				}
			  
			  ?>
			  
			</form>
	
</body>
</html>