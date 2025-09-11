<?php
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Login';
$g_page = 'login';
require 'header.php';
require 'menu.php';
// Check if session is not registered, redirect back to main page. 
// Put this code in first line of web page. 
//session_start();

if (!isset($_SESSION['username'])) {
    header("location:main_login.php");
}

?>
<div id="all_blogs">
    Login Successful
</div>
<?php
require 'footer.php';
?>
