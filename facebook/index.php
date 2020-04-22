<?php 
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
    $permissions = ['email']; // Optional permissions
    $callbackUrl = htmlspecialchars('https://fff.blue/facebook/login.php');
    $loginUrl = $helper->getLoginUrl($callbackUrl, $permissions);
    header("Location: $loginUrl");
    exit();
?>