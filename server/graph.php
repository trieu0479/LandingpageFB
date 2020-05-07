<?php
require_once("./require.php");
require_once("./include/facebookCURL.php");

$task = $_GET['task'];
$fbC = new facebookCURL();
$kq = new stdClass();
switch ($task){
    case "getPostLikes": 
        $fbid = $_GET['fbid'];
        $kq->data  =  $fbC->getListMemberLikeAPost($fbid); break;
    case "getPostMLikes": 
        $fbid = $_GET['fbid'];
        $kq->data  =  $fbC->getListMemberLikeAPostM($fbid); break;
    case "getPostComments": 
        $fbid = $_GET['fbid'];
        $kq->data  =  $fbC->getPostComments($fbid); break;
    case "getFacebookIdFromURL": 
        $url = $_GET['url'];
        $kq->data  =  $fbC->getFacebookIdFromURL($url); break;
    case "searchFanpageSuggestion": 
        $q = $_GET['q'];
        $kq->data  =  $fbC->searchFanpageSuggestion($q); break;
    case "getFanpageAds": 
        $fbId = $_GET['fbId'];
        $kq->data  =  $fbC->getFanpageAds($fbId); break;
    case "getFanpageInfo": 
        $fbId = $_GET['fbId'];
        $kq->data  =  $fbC->getFanpageInfo($fbId); break;
    case "getRelatedFanpage": 
        $fbId = $_GET['fbId'];
        $kq->data  =  $fbC->getRelatedFanpage($fbId); break;
    case "cronSearchFanpageSuggestion": 
        $kq->data  =  $fbC->cronSearchFanpageSuggestion(); break;        
    case "cronUpdateFanpage": 
        $kq->data  =  $fbC->cronUpdateFanpage(); break;        
 
}
echo json_encode($kq); 