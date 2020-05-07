<?php
require_once("./require.php");
require_once("./include/facebook.php");
$userToken = $_GET['userToken'];
$task = $_GET['task'];
$facebook = new facebook();
$noNeedToken = array("updateLog","confirmMission","confirmMissionV1");
if (!in_array($task,$noNeedToken)){
    if (!$facebook->checkUserLevel($userToken)){
        $output['status'] = "error";
        $output['msg'] = "User Token Error";
        echo json_encode($output);
        exit();
    }
}
switch ($task){
    case "confirmMission":  $kq->data  =  $facebook->confirmMission($_POST); break;
    case "confirmMissionV1":  $kq->data  =  $facebook->confirmMissionV1($_GET); break;
    case 'getFacebookPostId': 
        $url = $_GET['url'];
        $kq->data  =  $facebook->getFacebookPostId($url); break;
    case 'createLockedLink': 
        $kq->data  =  $facebook->createLockedLink($_POST); break;
    case 'listLockedLink':  $kq->data  =  $facebook->listLockedLink(); break;
    case 'listDataByAlias':$alias = $_GET['alias'];  $kq->data  =  $facebook->listDataByAlias($alias); break;
    case 'listMyAllData': $kq->data  =  $facebook->listMyAllData(); break;
    case 'getInfoAlias':$alias = $_GET['alias'];  $kq->data  =  $facebook->getInfoAlias($alias); break;
    case 'editLockedLink':  
        $alias = $_GET['alias'];
        $kq->data  =  $facebook->editLockedLink($alias,$_POST); break;
    case 'updateLog': $alias = $_GET['alias']; $kq->data = $facebook->updateLog($alias);break;
    case 'getLastLikeFacebookFanpage': $pageId = $_GET['pageId']; $kq->data = $facebook->getLastLikeFacebookFanpage($pageId);break;
 
}
echo json_encode($kq); 