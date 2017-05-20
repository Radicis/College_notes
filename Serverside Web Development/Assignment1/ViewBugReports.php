<!DOCTYPE html>

<head>
<title>View Bug Reports</title>
</head>
<body>
<h1>Bug Reports</h1>

<?php
$DBConnection = mysqli_connect("localhost", "root", "");
if(!$DBConnection){
	$error = "<p>Unable to connect</p>\n"
		. "<p>Connection error code " . mysqli_errno(). "</p>\n";
	
	include 'error.html.php';
	exit();
}
else{
	$DBName = "bugtracker";
	$TableName = "bugreports";
	if(!mysqli_select_db($DBConnection, $DBName)){
		$error = "<p>Unable to connect to $DBName database!</p>\n"
		. "<p>Error Code " . mysqli_errno($DBConnection)
		. ": " . mysqli_error($DBConnection) . "</p>\n";
		include 'error.html.php';
		exit();
	}
	else{
		$SQLString = "SELECT * FROM $TableName ORDER BY ReportID";
		
		$QueryResult = mysqli_query($DBConnection, $SQLString);
		if(!QueryResult){
			$error = 'Error executing query: ' . mysqli_error($DBConnection);
			include 'error.html.php';
			exit();
		}
		else if(!mysqli_num_rows($QueryResult))){
			echo "<p>There are no bugs to report.</p>\n";
		}
		else{
			echo "<table>\n";
			echo "<tr><th>ID</th>".
				"<th>Product</th>".
				"<th>Version</th>".
				"<th>Type of Hardware</th>".
				"<th>OS</th>".
				"<th>Frequency</th>".
				"<th>Proposed Solutions</th>".
				"<th>&mbsp;</th><tr>\n";
			while($report = mysqli_fetch_assoc($QueryResult)){
				echo "<tr><td>" . $report['ReportID'] . "</td>" . 
					"<td>" . $report['product'] . "</td>" .
					"<td>" . $report['version'] . "</td>" .
					"<td>" . $report['hardware'] . "</td>" .
					"<td>" . $report['os'] . "</td>" .
					"<td>" . $report['frequency'] . "</td>" .
					"<td>" . $report['solutions'] . "</td>" .
					"<td><a href="\"UpdateBugReport.php?ReportID=" . $report['ReportID'] . "\">Update</a></td>" .
					"</tr>\n";
			}
			echo "</table>\n";
		}
		echo ='Database connection established.';
	}
}

?>
<a href="EnterBugReport.php">Enter bug report </a>
</body>
</html>