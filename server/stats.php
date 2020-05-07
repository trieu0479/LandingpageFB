<?php
require_once("./require.php");
require_once("./include/stats.php");
$userToken = $_GET['userToken'];
$task = $_GET['task'];
$stats = new stats();
$noNeedToken = array("updateLog","confirmMission","confirmMissionV1");
if (!in_array($task,$noNeedToken)){
    if (!$stats->checkUserLevel($userToken)){
        $output['status'] = "error";
        $output['msg'] = "User Token Error";
        echo json_encode($output);
        exit();
    }
}
switch ($task){
    case "getFacebookInformation":  
        $fbId = $_GET['fbId'];
        $kq->data  =  $stats->getFacebookInformation($fbId); break;
   
 
}
echo json_encode($kq); 