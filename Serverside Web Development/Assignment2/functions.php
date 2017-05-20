<?php

	
	function createFieldString($fieldNames){
		//Build fieldname string
		$fieldstr = "";
		$connector = "";
		foreach($fieldNames as $field){
			$fieldstr .= $connector .$field;
			$connector = ", ";
		}

		return $fieldstr;
	}

	
	function createValueString($values){
		//Build value string
		$valuestr = "";
		$connector = "";

		foreach($values as $value){
			$valuestr .= $connector . "'$value'";
			$connector = ", ";
		}

		return $valuestr;
	}

	//Displays order details to screen in table form
	function displayOrder($DBConnection, $fields, $orderID){
		$orderID = mysql_real_escape_string($orderID);
		$html = "";
		array_push($fields, 'createddatetime');
		array_push($fields, 'views');
		//Get list of relevant fields
		$fieldstr = createFieldString($fields);
		$fieldNamesSql = "SELECT $fieldstr from orders";
		$fieldNameResult =  mysqli_query($DBConnection, $fieldNamesSql);
		//Create Order display table
		$html .= "<h2>Order $orderID Details</h2>\n" ."<table border='1'>\n" . "<tr>\n";
		foreach($fields as $field){
			$html .= "<th>";
			$html .= ucwords($field);
			$html .= "</th>\n";
		}		
		//Query the db and get the entry for the order just entered
		$currentOrderSql = "SELECT $fieldstr from orders where order_id = '$orderID'";
		$result = mysqli_query($DBConnection, $currentOrderSql);
		$report=mysqli_fetch_assoc($result);
		$html .= "<tr>\n";
		//Iterate through displayfields and set the value 
		foreach($fields as $field){
			$html .= "<td>" . $report[$field] . "</td>\n";
		}

		$html .= "</tr>\n";
		$html .= "</table>";
		$html .= "<a href='update.php?order_id=$orderID";
		$html .= "'>Update</a> | <a href='delete.php?order_id=$orderID'>Delete</a>";
		return $html;
	}
?>