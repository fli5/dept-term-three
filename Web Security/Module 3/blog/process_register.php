<?php
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Register';
$g_page = 'register';
require 'header.php';
require 'menu.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
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
require 'footer.php';
?>
