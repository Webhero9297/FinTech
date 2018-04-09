<?php
ob_start();
?>
<?php

// Connects to your Database
mysql_connect("localhost", "root", "") or die(mysql_error());
mysql_select_db("stock") or die(mysql_error());

//Checks if there is a login cookie
if(isset($_COOKIE['ID_my_site']))

//if there is, it logs you in and directes you to the members page
{
$name = $_COOKIE['ID_my_site'];
$pass = $_COOKIE['Key_my_site'];
$check = mysql_query("SELECT * FROM user WHERE name = '$name'")or die(mysql_error());
while($info = mysql_fetch_array( $check ))
{
if ($pass != $info['pass'])
{
}
else
{
header("Location:cart.php");

}
}
}

//if the login form is submitted
if (isset($_POST['submit'])) { // if form has been submitted

// makes sure they filled it in
if(!$_POST['name'] | !$_POST['pass']) {
die('You did not fill in a required field.');
}
// checks it against the database

if (!get_magic_quotes_gpc()) {
$_POST['email'] = addslashes($_POST['email']);
}
$check = mysql_query("SELECT * FROM user WHERE name = '".$_POST['name']."'")or die(mysql_error());

//Gives error if user dosen't exist
$check2 = mysql_num_rows($check);
if ($check2 == 0) {
die('That user does not exist in our database. <a href=register.php>Click Here to Register</a>');
}
while($info = mysql_fetch_array( $check ))
{
$_POST['pass'] = stripslashes($_POST['pass']);
$info['pass'] = stripslashes($info['pass']);
$_POST['pass'] =$_POST['pass'];

//gives error if the pass is wrong
if ($_POST['pass'] != $info['pass']) {
die('Incorrect pass, please <a href="login.php">try again</a>.');
}
else
{

// if login is ok then we add a cookie
$_POST['name'] = stripslashes($_POST['name']);
$hour = time() + 3600;
setcookie(ID_my_site, $_POST['name'], $hour);
setcookie(Key_my_site, $_POST['pass'], $hour);

//then redirect them to the members area
header("Location: cart.php");
}
}
}
else
{

// if they are not logged in
?>    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>Home</title>
        <meta name="keywords" content="itinerary, list" />
        <meta name="description" content="This page provides a list of all itineraries" />
        <link href="css/default.css" rel="stylesheet" type="text/css" />
    </head>


    <body>
        <div id="wrapper">
        <?php include 'include/header.php'; ?>
            <!-- end div#header -->
            <div id="page">
                <div id="content">
                    <div id="welcome"> <?php include 'include/ticker.php'; ?>      
                        <!--body-->
<form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
<table border="0">

<tr><td>Rollno:</td><td>
<input type="text" name="name" maxlength="20">
</td></tr>
<tr><td>password:</td><td>
<input type="password" name="pass" maxlength="20">
</td></tr></table><br>
<input type="submit" name="submit" value="Login">
</form>
<?php
}

?>

                        <!--body ends-->
                    </div>

                    <!-- end div#welcome -->

                </div>
                <!-- end div#content -->
                <div id="sidebar">
                    <ul>
                    <?php include 'include/nav.php'; ?>
                        <!-- end navigation -->
                      
                    </ul>
                </div>
                <!-- end div#sidebar -->
                <div style="clear: both; height: 1px"></div>
            </div>
            <?php include 'include/footer.php'; ?>
        </div>
        <!-- end div#wrapper -->
    </body>
</html>
