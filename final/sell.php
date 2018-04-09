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
                        <!--body-->
       <?php include 'include/ticker.php'; ?><br><br>
<?php
$tid=$_COOKIE['ID_my_site'];

require("include/db_conf.php");
$result=mysql_query("SELECT cash FROM user Where name='$tid'");
$b=mysql_result($result,0,0);
$all=mysql_query("SELECT * FROM main WHERE tid='$tid'");
 echo "<table><tr><td><b>Name</td><td><b>Quantity</td><td><b>Buying Price</td><td><b>Net cost</td><td><b>current value</b></td><td></td></tr><tr></tr>";
 $total=0;
 for($i=0;$i <mysql_num_rows($all);$i++ )
      {
        $id=mysql_result($all,$i,"sid");
        $cost= mysql_result($all, $i , "cost");
        $value =mysql_result($all, $i, "value");
        $qty=mysql_result($all,$i,"qty");
        $sid=mysql_query("SELECT * FROM share where id='$id'");
        $price=mysql_result($sid,0,"price");
        $sid=mysql_result($sid,0, "name");
     echo "<form action=sold.php method=post>" ;
     echo "<tr><td><input type=hidden name=nm value=".$sid.">";
     echo $sid;
     echo"</td><td><input type=hidden name=qnt value=".$qty.">";
     echo $qty;
     echo "</td><td><input type=hidden name=r value=".$i.">";
     echo $cost/$qty;
     echo"</td><td><input type=hidden name=cost value=".$cost.">";
     echo $cost;
     echo "</td><td><input type=hidden name=price value=".$i.">";
     echo $qty * $price;
     echo"</td>";
     $total=$total+($qty * $price);
        setcookie(qty,$qty);
     echo "<td><input type=submit name=".$i." value='sell'></td></tr></form>";
     mysql_query("UPDATE `stock`.`user` SET `worth` = '$total'");
     
        
     }
     echo "</table>";
     
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
