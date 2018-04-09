<?php ob_start(); ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>Confirm</title>
        <link href="css/default.css" rel="stylesheet" type="text/css" />
    </head>


    <body>
        <div id="wrapper">
     <?php
if(isset($_COOKIE['ID_my_site']))
{
?>


        <?php 
      
        include 'include/header2.php'; ?>
            <!-- end div#header -->
            <?php
}
else
{
    ?>

        <?php include 'include/header.php'; ?>
            <!-- end div#header -->
<?php
}
?>
      
            <!-- end div#header -->
            <div id="page">
                <div id="content">
                    <div id="welcome">
                        <h1>Welcome to Virtual Stock Exchange</h1>
                        <!--body-->
<?php
 mysql_connect("localhost", "root", "") or die(mysql_error());
   mysql_select_db("stock") or die(mysql_error());
   $name=$_COOKIE[share_name];
   $qty=$_COOKIE[qty];
   $team=$_COOKIE['ID_my_site'];
   $sid=mysql_query("SELECT * from share WHERE name='$name'");
   $price=mysql_result($sid,0,3);
   $sid=mysql_result($sid,0,0);
   $cost=$qty * $price;
   $cash=mysql_query("SELECT cash FROM user WHERE name='$team'");
   $cash=mysql_result($cash,0,0);
	echo $team;
   if($cost < $cash )
    {  
    $cash=$cash-$cost;
   $var=$price + ($qty/7);
   mysql_query("INSERT INTO main(`tid`,`sid`,`qty`,`cost`,`value`,`time`)VALUES('$team','$sid','$qty','$cost','$cost',NOW());");
   mysql_query("UPDATE share SET price= '$var' WHERE id='$sid'");
   mysql_query("UPDATE user SET cash='$cash' WHERE name='$team'");
   header("Location: cart.php");
    }
    else 
    {
    echo "You DO not have enough money to make the DEAL!!";

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
