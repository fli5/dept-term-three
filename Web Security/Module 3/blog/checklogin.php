<html>
	<head>
		<title>Main Login Page</title>
	</head>
	<body>

<?php

ob_start();
$host="localhost"; // Host name
$username="bloguser"; // Mysql username
$password="password"; // Mysql password
$db_name="blog"; // Database name
$tbl_name="members"; // Table name
$mysqli = new mysqli($host, $username, $password, $db_name);

/* check connection */
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", $mysqli->connect_error);
	exit();
}

$myusername=$_POST['myusername'];
$mypassword=$_POST['mypassword'];
// To protect MySQL injection
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);

$cleanusername = $mysqli->real_escape_string($myusername);
$cleanpassword = $mysqli->real_escape_string($mypassword);

$sql="SELECT password FROM $tbl_name WHERE username='$cleanusername' \n limit 1";
// $result=mysql_query($sql);
$result = $mysqli->query($sql);

while ($row = $result->fetch_assoc()) {
	$returnedpassword=$row['password'];
}
// If returned password matches entered password, valid login

if($mypassword==$returnedpassword && $mypassword<>''){
	// Register $myusername and redirect to file "login_success.php"
	session_start();
	$_SESSION['username'] = $cleanusername;
	header("location:login_success.php");
}
else {
	echo "Wrong Username or Password";
	echo "<pre>$sql</pre>";
}
ob_end_flush();
?>

	</body>
</html>
