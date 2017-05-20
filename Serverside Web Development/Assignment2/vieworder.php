<?php 
	//Create Database connection
	include 'dblogin.php';
	include 'functions.php';
	
	$fields = array('order_id', 'student', 'firstname', 'lastname', 'email', 'address', 'phone', 'price', 'size', 'anchovies', 'pineapples', 'pepperoni', 'olives', 'onions');	
	$report = array();

	if(isset($_POST['submit'])){
		foreach($fields as $field){
			if(isset($_POST[$field])){
				$report[$field] = stripslashes(trim($_POST[$field]));				
			}
			else{
				$report[$field] = "Not Set";
			}
		}
		
		if($report['student']=='on'){
			$report['student'] = "Y";
		}
				
		//Extract first and last names from customerName field
		if(!isset($_POST['customername'])){
			$fullname = $_POST['customerName'];
			$report['firstname'] = strtok($fullname, " ");
			$report['lastname'] = substr($fullname, strpos($fullname, $report['firstname'])+strlen($report['firstname']));
		}

		//generate an unique id for order_id field
		$report['order_id'] = uniqid();
		
		if($DBConnection){
			
			if(mysqli_select_db($DBConnection, $DBName)){
				
				//Get list of field names from table
				$sql = "SELECT * from orders";
				$result =  mysqli_query($DBConnection, $sql);
				//Build query string
				$fieldstr = createFieldString($fields);
				$valuestr =createValueString($report);
				$sql = "INSERT INTO orders (". $fieldstr . ") VALUES (" . $valuestr . ")";

				//Add record to DB
				$result = mysqli_query($DBConnection, $sql);	
				if($result){
					//Display current order table
					echo displayOrder($DBConnection, $fields, $report['order_id']);
				} else {
					$myerror = mysqli_error($DBConnection);
					$error = "<p>record not added: $myerror</p>";
					include 'error.php';
					exit();
				}

				mysqli_close($DBConnection);
			} else {
				$error = "can't select table";
				include 'error.php';
				exit();
			}

		} else {
			$error = "can't select DB";
			include 'error.php';
			exit();
		}

	}
	elseif(isset($_POST['update'])){
		foreach($fields as $field){
			if(isset($_POST[$field])){
				$report[$field] = stripslashes(trim($_POST[$field]));				
			}
			else{
				$report[$field] = "Not Set";
			}
		}
		
		if($report['student']=='on'){
			$report['student'] = "Y";
		}
				
		//Extract first and last names from customerName field
		if(!isset($_POST['customername'])){
			$fullname = $_POST['customerName'];
			$report['firstname'] = strtok($fullname, " ");
			$report['lastname'] = substr($fullname, strpos($fullname, $report['firstname'])+strlen($report['firstname']));
		}

		//generate an unique id for order_id field
		$report['order_id'] = $_POST['order_id'];
		$oID = $report['order_id'];
		if($DBConnection){
			
			if(mysqli_select_db($DBConnection, $DBName)){
				
				//Build query string
				$fieldstr = createFieldString($fields);
				$valuestr =createValueString($report);
				$sql = "UPDATE orders SET ";
				foreach(array_combine($fields, $report) as $field => $rep){
					$sql .= "$field = '$rep', "; 
				}
				//Trim off trailing , and whitespace
				$sql = substr($sql, 0, -2);
				$sql .= " WHERE order_id='$oID'";

				//Add record to DB
				$result = mysqli_query($DBConnection, $sql);	
				if($result){
					echo "<h2>Order Updated</h2>";
					//Display current order table
					echo displayOrder($DBConnection, $fields, $report['order_id']);
				} else {
					$myerror = mysqli_error($DBConnection);
					$error = "<p>Record not Updated: $myerror</p>";
					include 'error.php';
					exit();
				}

				mysqli_close($DBConnection);
			} else {
				$error = "can't select table";
				include 'error.php';
				exit();
			}

		} else {
			$error = "can't select DB";
			include 'error.php';
			exit();
		}

	}
	
	//If not posted 
	elseif(isset($_GET['order_id'])) {

		//look for order ID and display details
			if($DBConnection){
				
				if(mysqli_select_db($DBConnection, $DBName)){
					$orderID = stripslashes($_GET['order_id']);
					$orderID = mysql_real_escape_string($orderID);
					$sql = "SELECT * from $TableName WHERE order_id = '$orderID'";

					$result = mysqli_query($DBConnection, $sql);
					if(!$result){
						echo "Error executing query";
					}
					else if(!mysqli_num_rows($result)){
						echo "<h2>Error: No order with this ID found</h2>";
					}
					else{
						//increment order views 
						mysqli_query($DBConnection, "UPDATE $TableName SET views=views+1 WHERE order_id='$orderID'");
						//Display current order table
						echo displayOrder($DBConnection, $fields, $orderID);
					}
				} else {
					$error =  "no table";
					include 'error.php';
				}

				mysqli_close($DBConnection);
			} else {
				$error =  "no db connection";
				include 'error.php';
			}

		}	

	?> 
