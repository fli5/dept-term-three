<?php
require 'security.php';
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Logout';
$g_page = 'logout';
require 'header.php';
require 'menu.php';
?>
<div id="all_blogs">
    <?php
    // Put this code in first line of web page.
    if (isset($_SESSION['username'])) {
        session_destroy();
        echo "Session Username is " . $_SESSION['username'];
    }else {
        redirect("index.php");
    }
    ?>
</div>
<?php
require 'footer.php';
?>
