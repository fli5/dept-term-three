<?php
require 'security.php';
require 'config.php';
require 'database.php';
require 'csrftool.php';
$g_title = BLOG_NAME . ' - Login';
$g_page = 'login';
require 'header.php';
require 'menu.php';

# Each time a new token is generated, this can prevent the token from being replayed.
$csrf_token = CSRFTool::generateCsrf();
?>
<div id="all_blogs">
    <form name="form1" method="post" action="process_login.php">
        <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">
        <table width="100%" border="0" cellpadding="3" cellspacing="1">
            <tr>
                <td colspan="3"><strong>Member Login </strong></td>
            </tr>
            <tr>
                <td width="78">Username</td>
                <td width="6">:</td>
                <td width="294"><label><input name="username" type="text" id="username"></label></td>
            </tr>
            <tr>
                <td>Password</td>
                <td>:</td>
                <td><label><input name="password" type="text" id="password"></label></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td><input type="submit" name="Submit" value="Login"></td>
            </tr>
        </table>
    </form>
</div>
<?php
require 'footer.php';
?>
