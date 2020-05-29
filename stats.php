<?php
require_once("./require.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// $userToken = $_GET['userToken'];
@$view = @$_GET['view'];
@$action = @$_GET['action'];
if (empty($view)) $view = "stats";
if (empty($action)) $action = "index";

$meta['title'] = "Xếp hạng Facebook Việt Nam";
$meta['description'] = "Bảng xếp hạng và ước tính giá trị của Facebook Fanpage Việt Nam";
$meta['image'] = "Bảng xếp hạng và ước tính giá trị của Facebook Fanpage Việt Nam";

require_once('modules/header.php') ;
require_once('modules/top.php'); 
require_once("./body/body/".$view."/".$action.".php"); 
require_once("modules/footer.php");


?>
 