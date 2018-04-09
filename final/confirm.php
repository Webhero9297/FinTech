<?php ob_start(); ?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>Home</title>
        <meta name="keywords" content="itinerary, list" />
        <meta name="description" content="This page provides a list of all itineraries" />
        <link href="css/default.css" rel="stylesheet" type="text/css" />
    </head>

<?php
if(isset($_COOKIE['ID_my_site']))
{
?>
    <body>
        <div id="wrapper">
        <?php include 'include/header2.php'; ?>
            <!-- end div#header -->
            <div id="page">
                <div id="content">
                    <div id="welcome">
 <?php include 'include/ticker.php'; ?>      
                        <!--body-->
                <br><br>
<h3>You entered the following information</h3>
   <table border="0">
    <th><tr><td><b>variable</b></td><td><b>value</b></td></tr></th>

   <?php
  require("include/db_conf.php");
   $name=$_POST[share];
   $qty=$_POST[qty];
   $price=mysql_query("SELECT price FROM share where name='$name'");
   $price=mysql_result($price,0,0);
   $cost=$price * $qty;
   ?>

   <tr><td>Name</td><td><?php echo $name ?></td></tr>
   <tr><td>Price</td><td><?php echo $price ?></td></tr>
   <tr><td>Quantity</td><td><?php echo $qty ?></td></tr>
   <tr><td>total cost</td><td><?php echo $cost ?></td></tr>
   </table>
 <form action="temp.php" method=post><input type=submit value ="confirm"></form>
 <form action="buy.php" method=post><input type=submit value ="Back"></form>
   <?php
   setcookie(share_name,$name);
   setcookie(qty,$qty);
   
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
    <?php
}
else
header("Location: login.php");
?>
</html>
