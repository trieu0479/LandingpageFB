<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Asia/Ho_Chi_Minh');
set_time_limit(0);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ERROR);
require_once(__DIR__."/include/MysqliDb.php");
require_once(__DIR__."/include/protect.php");


?>
