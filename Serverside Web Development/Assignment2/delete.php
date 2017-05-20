<?php
	if(isset($_GET['order_id'])){
		include 'dblogin.php';
		$oID = mysql_real_escape_string($_GET['order_id']);
		if($DBConnection){			
			if(mysqli_select_db($DBConnection, $DBName)){
				$sql = "DELETE FROM $TableName WHERE order_id='$oID'";
				$result = mysqli_query($DBConnection, $sql);	
				if($result){
					echo "Order Deleted";
				}
				else {
					$myerror = mysqli_error($DBConnection);
					$error = "<p>Order not deleted: $myerror</p>";
					echo $error;
					exit();
				}				
			}
		}
	}
	else{
		echo "<h2>Error: No Order ID specified</h2>";
	}
?>