<?php
require_once("./require.php");
require_once("./include/facebookCURL.php");

$task = $_GET['task'];
$fbC = new facebookCURL();

switch ($task){
    case "getListMemberLikeAPost": 
        $fbid = $_GET['fbid'];
        $kq->data  =  $facebook->getListMemberLikeAPost($fbid); break;
   
 
}
echo json_encode($kq); 