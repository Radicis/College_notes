<?php
	if(isset($_GET['order_id'])){
		
		include 'dblogin.php';
		$oID = mysql_real_escape_string($_GET['order_id']);
		if($DBConnection){			
			if(mysqli_select_db($DBConnection, $DBName)){
				$sql = "SELECT * FROM $TableName WHERE order_id='$oID'";
				$result = mysqli_query($DBConnection, $sql);	
				if($result){
					$order = mysqli_fetch_array($result);

					$fields = array('order_id', 'student', 'firstname', 'lastname', 'email', 'address', 'phone', 'price', 'size', 'anchovies', 'pineapples', 'pepperoni', 'olives', 'onions');	
					$report = array();
					
					foreach($fields as $field){
						$_POST[$field] = $order[$field];
					}
					//combine first and last names into cname again
					$_POST['customerName'] = $order['firstname'] . " " . $order['lastname'];
					include 'index.php';
				}
				else {
					$myerror = mysqli_error($DBConnection);
					$error = "<p>Order not found: $myerror</p>";
					include 'error.php';
					exit();
				}				
			}
		}

	}
	
	else{
		$error = "No Order Specified";
		include 'error.php';
	}
?>

