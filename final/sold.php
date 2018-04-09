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
                        <h1>Welcome to JUIT Stock Exchange</h1>
                        <!--body-->
<?php
mysql_connect("localhost", "root", "") or die(mysql_error());
mysql_select_db("stock") or die(mysql_error());
$qty=$_POST[qnt];
$cost=$_POST[cost];
$tid=$_COOKIE['ID_my_site'];
$sid=$_POST[nm];
mysql_query("DELETE FROM `stock`.`main` WHERE `main`.`tid` = $tid AND `main`.`qty` = $qty AND `main`.`cost` = $cost  LIMIT 1");
$cash=mysql_query("SELECT cash FROM user WHERE name='$tid'");
$price=mysql_query("SELECT price FROM share WHERE name='$sid'");
$price=mysql_result($price,0,0);
$cash=mysql_result($cash,0,0);
$cost=$qty * $price;
$cash=$cash+$cost;
mysql_query("UPDATE `stock`.`user` SET `cash` = $cash WHERE `user`.`name` = $tid LIMIT 1 ;");
header("Location:cart.php");
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
