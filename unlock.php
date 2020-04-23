<?php 
require_once("require.php");
if (@$_COOKIE['userKey']) @$userKey = $_COOKIE['userKey']; else $userKey  = "";
$user = $db->rawQueryOne("SELECT * FROM fff_user WHERE `userKey`='".$userKey."'");
if (empty($user)){
   
    require_once("./facebook/vendor/autoload.php");
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
}


if ($user){
    @$targetURL = $_GET['key'];
    $kq = $db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$targetURL."' OR `custom`='".$targetURL."'");
    $targetId = $kq['missionFbId'];
    $output = getTargetLikeComment($targetId);
    $isLike = $isComment = 0;
    if (in_array($user['facebookName'],$output['like'])){
        $isLike = 1;
    }
    /*
    if (in_array($user['facebookId'],$output['comment'])){
        $isComment = 1;
    }
    */
  
    if ($isLike == 1){
        $kq = $db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$targetURL."' OR `custom`='".$targetURL."'");
        header("Location: ".$kq['url']);
        exit();
    }else{
        $errorURL = $rootURL."/".$targetURL."?error=1";
        header("Location: ".$errorURL);
    }
    
}

function getTargetLikeComment($targetId){

    /*
    $mysqli = new mysqli('maindb.fff.com.vn','fff_com_vn', 'fff_com_vn!@#',  'thatim_app');
    $db1 = new MysqliDb ($mysqli);

    $data = $db1->rawQueryOne("SELECT * FROM fb_autopost_master_token ORDER BY rand()");
    
    $masterToken = $data['fbToken'];
    */
    //$masterToken = "EAAAAZAw4FxQIBAAtrrdRQWZBPtaJioOvl128WhvljbebMNOw3p5oNwdOtkSZAi6ojSvHw1gdobwSo3SisuewcXFivH31kWzCaKiQoIdKocCvyXCUWVSwmPr5GNPZAyuPZBSNLAJSXZBFVMxJxA17KhRasj90dkWFzrzdpvoKXkK40lgq9fS7bZBd7QATYKCZBh4ZD";
    $masterToken = "EAAAAZAw4FxQIBAP8XmZBZC00jbcFl30Fp8QOw4HMxIg8dJcPOf6YwmIiMZCqVrHPhyLnQkiIcQpG5CKBtNgSuoOQRYZAA16TTCtuCZCZCE0m8ftAr8Kx1kQuwGIBMll0PM5xBa5dUKoH0NAmO4G3n5fZB2Shbkly9AsZArQGJdLzwtNMwmhd3btYiy61zHtwlZBa4ZD";
    $urlLike= "https://graph.facebook.com/".$targetId."/likes?limit=5000&access_token=".$masterToken;
    

    $likeData = getWebsiteContent($urlLike);
    $likeData = json_decode($likeData,true);

    $idLikes = $idComments = array();
    foreach ($likeData['data'] as $l){
        $idLikes[] = $l['name'];
    }
   

    $outputs['like'] = $idLikes;

    /*
    $urlComment = "https://graph.facebook.com/".$targetId."/comments?limit=5000&access_token=".$masterToken;
    $commentData = getWebsiteContent($urlComment);
    $commentData = json_decode($commentData,true);

    foreach ($commentData['data'] as $l){
        if (@$l['from']) $idComments[] = $l['from']['id'];
    }

    $outputs['comment'] = $idComments;
    */
    return $outputs;
}

function getWebsiteContent($postURL,$postVal = false){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$postURL);
   
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    $agents = array(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
        'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.9) Gecko/20100508 SeaMonkey/2.0.4',
        'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; da-dk) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
    );
    curl_setopt($ch,CURLOPT_USERAGENT,$agents[array_rand($agents)]);
    $server_output = curl_exec($ch);
    curl_close ($ch);
    return $server_output;
}

?>