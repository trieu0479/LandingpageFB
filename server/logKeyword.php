<?php 
require_once("./require.php");
$mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', '2020_fff_facebook');
$db =new MysqliDb ($mysqli);
$logData = $_POST['logData'];
$logData = json_decode($logData,true);
$keywords = $logData['keywords'];
$keywords = explode(",",$keywords);
foreach ($keywords as $k){
    $insert['keyword'] = trim($k);
    $insert['insertTime'] = date("Y-m-d H:i:s");
    $insert['isProcess'] = 0;
    $db->insert("facebook_waiting",$insert);
}