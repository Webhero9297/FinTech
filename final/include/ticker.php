<?php
echo "  <marquee bgcolor= #AA2808>";
$tid=$_COOKIE['ID_my_site'];
require("db_conf.php");
      $result=mysql_query("SELECT name,price FROM share;");
      $a = mysql_fetch_array($result);
for($j=0;$j<10;$j++)
{
      for($i=0;$i<mysql_num_rows($result);$i++ )
      {
        $name= mysql_result($result, $i , "name");
        $price =mysql_result($result, $i, "price");
     echo "<font color= #FFFFFF size=3><b>";
     echo $name."   Rs.".$price.".00         *** ";
     echo "</font></b>";
      }
}
      echo"</marquee>";
     ?>
