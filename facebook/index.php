<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if (!session_id()) {
  session_start();
}
require_once("./vendor/autoload.php");
$fb = new Facebook\Facebook([
  'app_id' => '1795529270684966', // Replace {app-id} with your app id
  'app_secret' => 'ab8c3d69ea65f94b84792a9f9cd78024',
  'default_graph_version' => 'v3.2',
  ]);

$helper = $fb->getRedirectLoginHelper();
if (isset($_GET['state'])) {
  $helper->getPersistentDataHandler()->set('state', $_GET['state']);
}

try {
  $accessToken = $helper->getAccessToken();
  if ($accessToken){
    var_dump($accessToken->getValue());
  }
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  $permissions = ['email']; // Optional permissions
  $callbackUrl = htmlspecialchars('https://fff.blue/facebook/login.php');
  $loginUrl = $helper->getLoginUrl($callbackUrl, $permissions);
  echo '<a href="' . $loginUrl . '">Log in with Facebook!</a>';

  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
}

$permissions = ['email']; // Optional permissions
$callbackUrl = htmlspecialchars('https://fff.blue/facebook/login.php');
$loginUrl = $helper->getLoginUrl($callbackUrl, $permissions);
echo '<a href="' . $loginUrl . '">Log in with Facebook!</a>';



?>