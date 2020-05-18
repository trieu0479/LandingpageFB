<?php
require_once("./require.php");
require_once("./include/stats.php");
$userToken = $_GET['userToken'];
$task = $_GET['task'];
$fbId = $_GET['fbId'];
$category = $_GET['category'];
$from = $_GET['from'];
$to = $_GET['to'];
$limit = $_GET['limit'];
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
    case "getAllFacebookInformation":  
        $kq->data  =  $stats->getAllFacebookInformation($limit); break;
    case "getFacebookInformation":  
        $kq->data  =  $stats->getFacebookInformation($fbId); break;
    case "showCategory":  
        $kq->data  =  $stats->showCategory($limit); break;
    case "getFacebookCategory":  
        $kq->data  =  $stats->getFacebookCategory($category); break;
    case "getFacebookLikeDay":  
        $kq->data  =  $stats->getFacebookLikesDay($fbId, $from, $to); break;
}
echo json_encode($kq); 
