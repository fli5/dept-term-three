<?php
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Login';
$g_page = 'login';
require 'header.php';
require 'menu.php';

//ob_start();
$login_result = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $login_result = Database::check_login($username, $password);
}

?>
<div id="all_blogs">
    <?php if ($login_result && isset($username)): ?>
        You have successfully logged in
        <p>Redirecting to homepage in 2 seconds...</p>
    <?php
    $_SESSION['username'] = $username;
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
//ob_end_flush();
require 'footer.php';
?>

