<?php 
include("./require.php");
$mission = $_GET['mission'];
$alias = $_GET['alias'];
$kq = $db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$alias."' OR `custom`='".$alias."'");
require_once("./body/page/mission.v1.php");

$update['click'] = $kq['click'] + 1;
$db->where("id",$kq['id']);
$db->update("fff_url",$update);