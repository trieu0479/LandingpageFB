<?php 
require_once("../require.php");
$userKey = $_COOKIE['userKey'];
$targetURL = $_GET['targetURL'];
$user = $db->rawQueryOne("SELECT * FROM fff_user WHERE `userKey`='".$userKey."'");
if ($user){
    $targetId = "1538157706340665";
    $output = getTargetLikeComment($targetId);
    $isLike = $isComment = 0;
    if (in_array($user['facebookId'],$output['like'])){
        $isLike = 1;
    }
    if (in_array($user['facebookId'],$output['comment'])){
        $isComment = 1;
    }
    
    if ($isLike == 1 && $isComment == 1){
        $kq = $db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$targetURL."' OR `custom`='".$targetURL."'");
        $target = $kq['url'];
        header("Location: ".$url);
    }
    
}


function getTargetLikeComment($targetId){

    $mysqli = new mysqli('maindb.fff.com.vn','fff_com_vn', 'fff_com_vn!@#',  'thatim_app');
    $db1 = new MysqliDb ($mysqli);

    $data = $db1->rawQueryOne("SELECT * FROM fb_autopost_master_token ORDER BY rand()");
    
    $masterToken = $data['fbToken'];
    $urlLike= "https://graph.facebook.com/".$targetId."/likes?limit=5000&access_token=".$masterToken;
    $urlComment = "https://graph.facebook.com/".$targetId."/comments?limit=5000&access_token=".$masterToken;

    $likeData = getWebsiteContent($urlLike);
    $commentData = getWebsiteContent($urlComment);
    $likeData = json_decode($likeData,true);
    $commentData = json_decode($commentData,true);
    $idLikes = $idComments = array();
    foreach ($likeData['data'] as $l){
        $idLikes[] = $l['id'];
    }

    foreach ($commentData['data'] as $l){
        $idComments[] = $l['id'];
    }

    $outputs['like'] = $idLikes;
    $outputs['comment'] = $idComments;
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