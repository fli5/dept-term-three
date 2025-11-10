<?php
require 'security.php';
require 'config.php';
require 'database.php.backup';
require 'csrftool.php';
$g_title = BLOG_NAME . ' - Login';
$g_page = 'login';
require 'header.php';
require 'menu.php';


$login_result = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sanitized_username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $sanitized_password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $csrf_token = filter_input(INPUT_POST, "csrf_token", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if ($csrf_token && CSRFTool::validateCsrf($csrf_token)) {
        $login_result = Database::checkLogin($sanitized_username, $sanitized_password);
    }
}
?>
<div id="all_blogs">
    <?php if ($login_result['login_success'] && isset($sanitized_username)): ?>
        You have successfully logged in
        <p>Redirecting to homepage in 2 seconds...</p>
    <?php
    $_SESSION['username'] = $sanitized_username;
    $_SESSION['id'] = $login_result['user_id'];
    ?>
        <script id="redirect-script"
                src="redirect.js"
                data-delay="2000"
                data-url="index.php">
        </script>

    <?php else: ?>
        Wrong Username or Password
    <?php endif; ?>
</div>
<?php
require 'footer.php';
?>

