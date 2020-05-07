<?php
require_once("./require.php");
$userToken = $_GET['userToken'];
$view = $_GET['view'];
$action = $_GET['action'];
require_once('modules/header.php') ;
?>

<?php require_once('modules/top.php');?>
<?php require_once("body/".$view."/".$action.".php");?> 
<?php require_once("modules/footer.php");?>