<?php

require_once("./require.php");
// $userToken = $_GET['userToken'];
$view = $_GET['view'];
$action = $_GET['action'];
require_once('modules/header.php') ;
require_once('modules/top.php'); 
require_once("./body/body/".$view."/".$action.".php"); 
require_once("modules/footer.php");


?>
