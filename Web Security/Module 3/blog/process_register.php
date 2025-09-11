<?php
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Register';
$g_page = 'register';
require 'header.php';
require 'menu.php';

ob_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $result = Database::create_user($username, $username);
}
?>
<div id="all_blogs">
    <?php if (isset($result) && $result): ?>
        Registered Successful! <br/>
        <br/>
        <a href="login.php">Click</a> to Log in
        <script>
            setTimeout(function () {
                window.location.href = 'login.php';
            }, 1000);
        </script>
    <?php else: ?>
        Registered Failed
    <?php endif; ?>
</div>

<?php
ob_end_flush();
require 'footer.php';
?>
