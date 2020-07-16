<?php 
include("./require.php");
$a = $_GET['a'];
$a = explode("/",$_GET['a']);
@$view = $a[0];
@$action = $a[1];
if (empty($view) && empty($action)){
   require_once("./body/page/landingfacebook.php"); //goi file tu module
}else{
  if (empty($action)){
    //do redirect 
    $kq = $db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$view."' OR `custom`='".$view."'");

    $update['click'] = $kq['click'] + 1;
    $db->where("id",$kq['id']);
    $db->update("fff_url",$update);
    
    if (empty($kq)){
      require_once("./body/page/error.php"); 
    }else{
      $alias = $view;
      setcookie("targetKey", $view, time()+30*24*3600, "/", ".fff.blue", 1);
      $kq = $db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$alias."' OR `custom`='".$alias."'");
      require_once("./body/page/mission.v1.php");
      
    
    }
      
  }
}
$db->disconnect();