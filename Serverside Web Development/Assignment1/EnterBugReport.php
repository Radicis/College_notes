<!DOCTYPE html>
<head>
</head>
<body>
<?php


$ShowForm = FALSE;
$fields = array('product', 'version', 'hardware', 'os', 'frequency', 'solutions');
$report = array();
foreach($fields as $field){
	$report[$field] = "";
}

if (isset($_POST['submit'])){
	foreach ($fields as $field){
		if ((!isset($_POST[$field])) || (strlen(trim(($_POST[$field])))==0)){
			echo "<P>'$field' is a required field.</p>\n";
			$ShowForm = TRUE;
		}
		ele{
			$report[$field]=stripslashes(trim($_POST[$field]));
		}
	}
}
if ($ShowForm===FALSE){
	$DBConnection = mysqli_connect("localhost", "root", "");
	if(!DBConnection){
		$error = "<p>Unable to connecto toeh the db server</p>\n";
		include 'error.html.php';
		exit();
	}
	else{ // db connection
		$DBName = "bugtracker";
		
		if(!mysqli_select_db($DBConnection, $DBName)){
			$error = "<p>Unable to connecto to $DBNAme </p>\n";
			include 'error.html.php';
			exit();
		}
		else{ //select db
			$TableName = "bugreports";
			$fieldstr = "";
			$valestr = "";
			$connector = "";
			
			foreach($fields as $field){
				$fieldstr .= $connector . $field;
				echo "Debug print: fieldstr : $fieldstr <br /> \n";
				$valuestr .= $connector . "'" . $report[$field] . "'";
				echo "DEbug print: valuestr : $valuestr <br />\n";
				$connector = ", ";
			}
			
			$sanitisedValues = mysqli_real_escape_string($DBConnection, $valuestr);
			
			$SQLString = "INSERT INTO $TableName (" . $fieldstr . ") VALUES ($sanitisedValues)";
			echo "DEBG print: SQL Insert string: $SQLStrinig \n;"
		
		
		if(!mysqli_query($DBConnection, $SQLString)){
			echo "<p>Error saving record<br />\n";
		}
		else{
			echo "<p>Bug report saved</p>\n"
		}
	}// end select db
}//end db connection
}//end showform
else{
	$ShowForm = TRUE;
}
if(ShowForm===TRUE){
	?>
	<form action="EnterBugReport.php" method="POST">
		<table>
			<tr>
				<td>Product</td>
				<td><input type="text" name="product" value='<?php echo  $report['product'];?>' /></td>
			</tr>
			<tr>
				<td>Version</td>
				<td><input type="text" name="version" value='<?php echo  $report['version'];?>' /></td>
			</tr>
			<tr>
				<td>Hardware</td>
				<td><input type="text" name="hardware" value='<?php echo  $report['hardware'];?>' /></td>
			</tr>
			<tr>
				<td>OS</td>
				<td><input type="text" name="os" value='<?php echo  $report['os'];?>' /></td>
			</tr>
			<tr>
				<td>Frequenct</td>
				<td><input type="text" name="frequency" value='<?php echo  $report['frequency'];?>' /></td>
			</tr>
			<tr>
				<td>Please enter stuff</td>
			</tr>
			<tr>
				<td>Proposed Solutions</td>
				<td><textarea cols='80' rows='6' name='solutions'><?php echo $report['solutions'];?></textarea></td>
			</tr>
			<tr>
				<td>
					<input type="reset" name="reset" value="clear form" />
					<input type="submit" name="submit" value="Save Report" />
				</td>
				
			</tr>
		</table>
	</form>
<?php				
}
?>
<a href="ViewBugReports.php">View bug reports </a>
</body>
</html>