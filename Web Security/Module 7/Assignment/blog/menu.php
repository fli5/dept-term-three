<?php
error_reporting(E_ALL ^ E_DEPRECATED);
require 'security.php';
require_once 'PhpRbac/autoload.php';
if (!isset($g_page)) {
    $g_page = '';
}

use PhpRbac\Rbac;

$rbac = new Rbac();
$role_id = $rbac->Roles->returnId('admin');
?>
<ul id="menu">
    <li><a href="index.php" <?= ($g_page == 'index') ? "class='active'" : '' ?>>Home</a></li>
    <li><a href="create.php" <?= ($g_page == 'create') ? "class='active'" : '' ?>>New Post</a></li>
    <?php
    if (isset($_SESSION['username'])) {
    ?>
        <li><a href="logout.php" <?= ($g_page == 'logout') ? "class='active'" : '' ?>>Logout</a></li>
    <?php
    } else {
    ?>
        <li><a href="login.php" <?= ($g_page == 'login') ? "class='active'" : '' ?>>Login</a></li>
        <li><a href="register.php" <?= ($g_page == 'register') ? "class='active'" : '' ?>>Register</a></li>
    <?php }
    if (isset($_SESSION['username']) && $rbac->Users->hasRole($role_id, $_SESSION['userid'])) {
    ?>
        <li><a href="admin.php" <?= ($g_page == 'admin') ? "class='active'" : '' ?>>Admin</a></li>
    <?php
    }
    ?>
    <li><a href="privacy.php" <?= ($g_page == 'privacy') ? "class='active'" : '' ?>>Privacy</a></li>
</ul> <!-- END div id="menu" -->