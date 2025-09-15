<?php
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Login';
$g_page = 'login';
require 'header.php';
require 'menu.php';

$login_result = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sanitized_username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $sanitized_password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
    $login_result = Database::check_login($sanitized_username, $sanitized_password);
}

?>
<div id="all_blogs">
    <?php if ($login_result && isset($sanitized_username)): ?>
        You have successfully logged in
        <p>Redirecting to homepage in 2 seconds...</p>
    <?php
    $_SESSION['username'] = $sanitized_username;
    ?>
        <script>
            setTimeout(function () {
                window.location.href = "index.php";
            }, 2000)
        </script>
    <?php else: ?>
        Wrong Username or Password
    <?php endif; ?>
</div>
<?php
require 'footer.php';
?>

