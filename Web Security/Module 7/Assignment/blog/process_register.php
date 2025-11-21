<?php
require 'security.php';
require 'config.php';
require 'database.php';
$g_title = BLOG_NAME . ' - Register';
$g_page = 'register';
require 'header.php';
require 'menu.php';
require 'csrftool.php';

$errors = array();
$result = false;
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $password2 = filter_input(INPUT_POST, "password2", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
    $username = $username ? trim($username) : '';
    $password = $password ? trim($password) : '';


    if (empty($username)) {
        array_push($errors, "Username required!");
    }
    if (empty($email)) {
        array_push($errors, "Email is required!");
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        array_push($errors, "Email is not valid!");
    }

    if (empty($password)) {
        array_push($errors, "Password required!");
    }else if ($password !== $password2) {
        array_push($errors, "The two passwords do not match!");
    }

    $csrf_token = filter_input(INPUT_POST, "csrf_token", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    if ($csrf_token && CSRFTool::validateCsrf($csrf_token)) {
        if (empty($errors)) {
            $result = Database::createUser($username, $email,$password);
            if (is_array($result)) {
                // registration failed due to existing username/email
                foreach ($result as $error) {
                    array_push($errors, $error);
                }
                $result = false;
            }
            echo $result;
        }else {
            foreach ($errors as $error) {
                echo "<p>" . htmlspecialchars($error, ENT_QUOTES, 'UTF-8') . "</p>";
            }
        }
    }
}
?>
<div id="all_blogs">
    <?php if (isset($result) && $result): ?>
        Registered Successful! <br/>
        <br/>
        <a href="login.php">Click</a> to Log in
        <!-- <script id="redirect-script"
                src="redirect.js"
                data-delay="1000"
                data-url="login.php">
        </script> -->

    <?php else: ?>
        Registered Failed
    <?php endif; ?>
</div>
<?php
require 'footer.php';
?>
