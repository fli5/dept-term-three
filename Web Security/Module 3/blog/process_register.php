<?php
require 'security.php';
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Register';
$g_page = 'register';
require 'header.php';
require 'menu.php';

$result = false;
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $username = $username ? trim($username) : '';
    $password = $password ? trim($password) : '';
    $csrf_token = filter_input(INPUT_POST, "csrf_token", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if ($csrf_token && CSRFTool::validateCsrf($csrf_token)) {
        if (!empty($username) && !empty($password)) {
            $result = Database::createUser($username, $username);
        }
    }
}
?>
<div id="all_blogs">
    <?php if (isset($result) && $result): ?>
        Registered Successful! <br/>
        <br/>
        <a href="login.php">Click</a> to Log in
        <script id="redirect-script"
                src="redirect.js"
                data-delay="1000"
                data-url="login.php">
        </script>

    <?php else: ?>
        Registered Failed
    <?php endif; ?>
</div>
<?php
require 'footer.php';
?>
