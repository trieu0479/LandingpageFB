<?php 
include("./require.php");
$alias = $_GET['alias'];

if ($userToken == $demoToken) require_once("./body/page/detail.php"); 
else require_once("./body/page/detail.login.php"); 