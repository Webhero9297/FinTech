<?php
ob_start();
?>
 <?php
if(isset($_COOKIE['ID_my_site']))
{
   header("Location:cart.php");
}
else
{
?>
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


            <!-- end div#header -->
            <div id="page">
                <div id="content">
                    <div id="welcome">
                        <h1>Welcome to Virtual Stock Exchange</h1>
                        <!--body-->

<?php
// Connects to your Database
mysql_connect("localhost", "root", "") or die(mysql_error());
mysql_select_db("stock") or die(mysql_error());

//This code runs if the form has been submitted
if (isset($_POST['submit'])) {

//This makes sure they did not leave any fields blank
if (!$_POST['username'] | !$_POST['pass'] | !$_POST['pass2'] ) {
die('You did not complete all of the required fields');
}

// checks if the username is in use
if (!get_magic_quotes_gpc()) {
$_POST['username'] = addslashes($_POST['username']);
}
$usercheck = $_POST['username'];
$check = mysql_query("SELECT name FROM user WHERE name = '$usercheck'")
or die(mysql_error());
$check2 = mysql_num_rows($check);

//if the name exists it gives an error
if ($check2 != 0) {
die('Sorry, the username '.$_POST['username'].' is already in use.');
}

// this makes sure both passwords entered match
if ($_POST['pass'] != $_POST['pass2']) {
die('Your passwords did not match. ');
}

// here we encrypt the password and add slashes if needed
$_POST['pass'] = $_POST['pass'];
if (!get_magic_quotes_gpc()) {
$_POST['pass'] = addslashes($_POST['pass']);
$_POST['username'] = addslashes($_POST['username']);
}

// now we insert it into the database
$insert = "INSERT INTO user (name,pass,email)
VALUES ('".$_POST['username']."', '".$_POST['pass']."','".$_POST['email']."')";
$add_member = mysql_query($insert);
?>


<h1>Registered</h1>
<p>Thank you, you have registered - you may now login.</p>
<?php
}
else
{
?>


<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
<table border="0">
<tr><td>Rollno.:</td><td>
<input type="text" name="username" maxlength="60">
</td></tr>
<tr><td>Email Id:</td><td><input type=text name="email"></td></tr>
<tr><td>Password:</td><td>

<input type="password" name="pass" maxlength="10">
</td></tr>
<tr><td>Confirm Password:</td><td>
<input type="password" name="pass2" maxlength="10">
</td></tr>

<tr><th colspan=2><input type="submit" name="submit" value="Register"></th></tr> </table>
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
  <?php
}
?>
<!-- end div#wrapper -->
    </body>
</html>