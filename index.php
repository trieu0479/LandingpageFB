<?php 
include("./require.php");
$a = $_GET['a'];
$a = explode("/",$_GET['a']);
@$view = $a[0];
@$action = $a[1];
if (empty($view) && empty($action)){
  if ($userToken == $demoToken) require_once("./body/page/index.php"); 
  else require_once("./body/page/index.login.php"); 
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

      setcookie("targetKey", $view, time()+30*24*3600, "/", ".fff.blue", 1);
      switch($kq['missionType']){
        case "LIKE":
        case "LIKECOMMENT":
        case "COMMENT":
          require_once("./body/page/mission.php"); break;
        case "ADS":  require_once("./body/page/ads.php"); break;
        default:  require_once("./body/page/redirect.php"); break;
      }
      
    
    }
      
  }
}
$db->disconnect();