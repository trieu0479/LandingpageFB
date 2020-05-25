<?php

date_default_timezone_set('Asia/Ho_Chi_Minh');
set_time_limit(0);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ERROR);

require_once(__DIR__."/include/MysqliDb.php");
$demoToken = "ZGdZVktsdE91by9qOUtndjc4MjYwTHdQeXllT3NKTS9ZUHVzdThJYTNWST06OhMNb7G48NOo6noCn1JFw0I";

if (@$_GET['userToken']) $userToken =$_GET['userToken'];else $userToken =  $_COOKIE['userToken'];
if (empty($userToken))  $userToken = $demoToken;

$rootURL = "https://fff.blue";
$mysqli = new mysqli ('maindb.fff.com.vn', '2020_fffblue_shorturl', '123qazZAQ', '2020_fffblue_shorturl');
$db = new MysqliDb ($mysqli);
$version = "1.0.3.1";
?>
