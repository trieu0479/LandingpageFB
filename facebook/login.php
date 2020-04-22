<?php 
require_once("./vendor/autoload.php");
require_once("../require.php");
$fb = new Facebook\Facebook([
  'app_id' => '1795529270684966', // Replace {app-id} with your app id
  'app_secret' => 'ab8c3d69ea65f94b84792a9f9cd78024',
  'default_graph_version' => 'v3.2',
  ]);
$helper = $fb->getRedirectLoginHelper();
if (isset($_GET['state'])) {
  $helper->getPersistentDataHandler()->set('state', $_GET['state']);
}
$accessToken = $helper->getAccessToken();
try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get('/me?fields=id,name,email', $accessToken);
  $user = $response->getGraphUser();
  if ($user){
    if ($_COOKIE['targetKey']){
      @$targetURL = $_COOKIE['targetKey'];
      $kq = $db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$targetURL."' OR `custom`='".$targetURL."'");
      $insert['alias'] =  $kq['alias'];
      $insert['userId'] =  $kq['userId'];
    }

      $insert['facebookId'] =  $user->getId();
      $insert['facebookName'] =  $user->getName();
      $insert['facebookEmail'] =  $user->getEmail();
      $insert['facebookToken'] =  $accessToken->getValue();
      $insert['insertDate'] = date("Y-m-d H:i:s");
      $insert['userKey'] = md5($insert['facebookId']. $insert['alias']);
      $checker = $db->rawQueryOne("SELECT * FROM fff_user WHERE `userKey`='".$insert['userKey']."'");
      if (!$checker){
          $db->insert("fff_user",$insert);
          setcookie("userKey", $insert['userKey'], time()+30*24*3600, "/", ".fff.blue", 1);

          $updateKq['countUser'] = $kq['countUser'];
          $db->where("id",$kq['id']);
          $db->update("fff_url",$updateKq);
      }else{

          $db->where("facebookId",$insert['facebookId']);
          $db->update("fff_user",$insert);
          setcookie("userKey", $checker['userKey'], time()+30*24*3600, "/", ".fff.blue", 1);
      }
      $target = $rootURL.'/unlock/'.$_COOKIE['targetKey'];
      header("Location: $target");
  }
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  
} catch(Facebook\Exceptions\FacebookSDKException $e) {
   
}



  