<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
     <?php
if(isset($_COOKIE['ID_my_site']))
{
?>


        <?php include 'include/header2.php'; ?>
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
                        <!--body-->
                          <?php include 'include/ticker.php'; ?>
<centre><table><tr><td>Name</td><td>
Price</td><?php
require("include/db_conf.php");
$rank=mysql_query("ALTER TABLE `user`  ORDER BY `worth` DESC");
$rank=mysql_query("SELECT * FROM user");
      for($i=0;$i <mysql_num_rows($rank);$i++ )
      {
        $name= mysql_result($rank, $i , "name");
        $price =mysql_result($rank, $i, "worth");
     echo "<tr><td>";
     echo $name;
     echo"</td><td>";
     echo $price;
     echo"</td> </tr>";
      }
     ?></table></centre><!--body ends-->
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
