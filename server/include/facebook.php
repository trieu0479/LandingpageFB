<?php 
class facebook{
    var $db = null;
    var $userId = null;
    var $cookie = null;
    public function __construct(){
        $mysqli = new mysqli ('maindb.fff.com.vn', '2020_u_fffblue', '2020_u_fffblue', '2020_fffblue_shorturl');
        $this->db =new MysqliDb ($mysqli);
    }
    function checkUserLevel($userToken){
        return $this->getUserId($userToken);
    }
    function getUserId($token){
        $protect = new protect();
        $t = $protect->decrypt($token);
        if ($t){
            $p = explode("|",$t);
            if (@$p[0]){
                $this->userId = $p[0];
                return $p[0];
            }else return null;
        }else return null;
    }
    function getFacebookPostId($url,$type=null){
        $url = base64_decode($url);
        require_once(__DIR__."/facebookCURL.php");
        $fbC = new facebookCURL();
        $fbId = $fbC->getFacebookIdFromURL($url);
        if ($fbId) return $fbId['fbId'];

        $tmp ="";
        
        if ($p1 = strpos($url,"permalink")){
            $tmp = substr($url,$p1+9,strlen($url)-$p1-9);
        }
        
        if ($p1 = strpos($url,"posts")){
            $tmp = substr($url,$p1+5,strlen($url)-$p1-5);
        }
        if ($p1 = strpos($url,"watch/?v=")){
            $tmp = substr($url,$p1+10,strlen($url)-$p1-10);
        }
       
        if ($p1 = strpos($tmp,"?")){
            $tmp = substr($tmp,0,$p1);
        }
        $tmp = str_replace("/","",$tmp);
        if (empty($tmp)){
           $tmp = $this->getFacebookIdFromURL($url,$type);
        }
        return $tmp; 
    }

    function nextLetter(&$str) {
        $str = ('z' == $str ? 'a' : ++$str);
    }
    
    function getNextShortURL($s) {
        $a = str_split($s);
        $c = count($a);
        if (preg_match('/^z*$/', $s)) { // string consists entirely of `z`
            return str_repeat('a', $c + 1);
        }
        while ('z' == $a[--$c]) {
            $this->nextLetter($a[$c]);
        }
        $this->nextLetter($a[$c]);
        return implode($a);
    }
    function createLockedLink($input){
        $insert['userId'] = $this->userId;
        $insert['url'] = $input['targetUrl'];
        $insert['missionFbId'] = $input['missionFbId'];
        $insert['missionFbUrl'] = $input['missionFbUrl'];


        if ($input['missionType']) $insert['missionType'] = $input['missionType']; else $insert['missionType'] = "LIKECOMMENT";
        if($insert['missionType'] == "LIKECOMMENT-PROFILE") $insert['fbLinkFrom'] = "PROFILE";
        if($insert['missionType'] == "LIKECOMMENT-GROUP" || $insert['missionType']== "JOINGROUP") $insert['fbLinkFrom'] = "GROUP";
        if($insert['missionType'] == "LIKECOMMENT-FANPAGE" || $insert['missionType'] == "LIKEFANPAGE") $insert['fbLinkFrom'] = "FANPAGE";

        if ($input['customSlug']) $insert['custom'] = $input['customSlug'];
        if (empty($input['targetUrl'])){
            $output['status'] = "error";
            $output['msg'] = "Không tồn tại target URL";
            return $output;
        }

        if ($insert['custom']){
            $checkslug = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE `custom`='".$insert['custom']."'");
            if ($checkslug){
                $output['status'] = "error";
                $output['msg'] = "Đã tồn tại custom url";
                return $output;
            }
        }
        $checker = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE `userId`=".$this->userId." AND `missionType`='".$insert['missionType']."' AND `missionFbId`='".$insert['missionFbId']."'");
        if (empty($checker)){
            $last = $this->db->rawQueryOne('SELECT * FROM fff_url ORDER BY id DESC, alias DESC');
            $alias = $this->getNextShortURL($last['alias']);
            $insert['alias'] = $alias;
            $insert['click'] = 0;
            $insert['insertDate'] = date("Y-m-d H:i:s");

            $this->db->insert("fff_url",$insert);
            $insert['lockedLink'] = "https://fff.blue/".$alias;
            $output['data'] = $insert;
            $output['status'] = "success";
            
            
        }else{
            $output['status'] = "duplicate";
            $data['alias'] = $checker['alias'];
            $data['lockedLink'] = "https://fff.blue/".$checker['alias'];
            $data['custom'] = $checker['custom'];
            $data['missionType'] = $checker['missionType'];
            $data['missionFbId'] = $checker['missionFbId'];
            $data['missionFbUrl'] = $checker['missionFbUrl'];
            $output['data'] = $data;
        }
        return $output;
    }
    function listLockedLink(){
        $data = $this->db->rawQuery("SELECT * FROM fff_url WHERE `userId`=".$this->userId." ORDER BY id DESC");
        $output['data'] = $data;
        return $data;
    }
    function listDataByAlias($alias){
        $data = $this->db->rawQuery("SELECT * FROM fff_user WHERE `alias` ='".$alias."' AND `userId`=".$this->userId." ORDER BY id DESC");
        $output['data'] = $data;
        return $data;
    }
    function listMyAllData(){
        $data = $this->db->rawQuery("SELECT * FROM fff_user WHERE `userId`=".$this->userId." ORDER BY id DESC");
        $output['data'] = $data;
        return $data;
    }
    function getInfoAlias($alias){
        $data = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE `alias` ='".$alias."' AND `userId`=".$this->userId);
        $output['data'] = $data;
        return $data;
    }
    function editLockedLink($alias,$input){
        $data = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE `userId`='".$this->userId."' AND `alias`='".$alias."'");
        if ($data){
            if ($input['customSlug']) $insert['custom'] = $input['customSlug'];

            if ($insert['custom']){
                $checkslug = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE  `alias`!='".$alias."' AND `custom`='".$insert['custom']."'");
                if ($checkslug){
                    $output['status'] = "error";
                    $output['msg'] = "Đã tồn tại custom url";
                    return $output;
                }
            }

            if ($input['targetUrl']) $insert['url'] = $input['targetUrl'];
            if ($input['analyticCode']) $insert['analyticCode'] = $input['analyticCode'];
            if ($input['pixelsCode']) $insert['pixelsCode'] = $input['pixelsCode'];
            if ($input['expiry']) $insert['expiry'] = $input['expiry'];
            if ($input['status']) $insert['status'] = $input['status'];
            if ($input['pass']) $insert['pass'] = $input['pass'];
            $this->db->where("id",$data['id']);
            $this->db->update("fff_url",$insert);
            $output['data'] = $insert;
            $output['status'] = "success";
        }else{
            $output['status'] = "error";
            $output['msg'] = "Invalid Alias";
        }
        return $output;
    }

    function updateLog($alias){
        require_once __DIR__.'/Mobile_Detect.php';
        require_once __DIR__.'/config.php';

        require_once __DIR__.'/detect.php';
        require_once(__DIR__.'/telco.php');

        $data = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE `alias`='".$alias."'");
        $kq['alias'] = $data['alias'];
        $kq['userId'] = $data['userId'];
        $kq['Device_Type'] = Detect::deviceType();
        $kq['Device_browser'] = Detect::browser();
        $kq['Device_Brand'] = Detect::brand();
        $kq['Device_osName'] = Detect::os();
        $kq['ip'] = $this->getClientIp();
        $telco = new telco();
        $device = $telco->xacdinhDevice($_SERVER ['HTTP_USER_AGENT']);
        $telcoName = $telco->xacdinhnhamang($kq['ip']);
        $connectionType = $telco->getConnectionType($kq['ip'],$device);

        $kq['telcoName'] = $telcoName;
        $kq['connectionType'] = $connectionType;
        $content = file_get_contents("http://125.212.244.26:8080/json/".$kq['ip']);
		$content = json_decode($content);
		
		if (!empty($content)){
			$kq['country_code'] = $content->country_code;
			$kq['country_name'] = $content->country_name;
			$kq['region_code'] = $content->region_code;
			$kq['region_name'] = $content->region_name;
			$kq['city'] = $content->city;
			$kq['latitude'] = $content->latitude;
			$kq['longitude'] = $content->longitude;
        }
        $kq['insertTime'] = gmdate("Y-m-d\TH:i:s.000\Z");

        $paramsInsert['index'] = '2020_fffblue';
        $paramsInsert['body'] = $kq;
        $client->index($paramsInsert);


        $output['status'] = "updated";
        return $output;
    }

    function getClientIp(){
		if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) return $_SERVER['HTTP_CF_CONNECTING_IP'];
		if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return $_SERVER['HTTP_X_FORWARDED_FOR'];
		if (!empty($_SERVER['REMOTE_ADDR'])) return $_SERVER['REMOTE_ADDR'];
    }
    
    function getFacebookIdFromURL($url,$type=null){
        $result = "";
        $mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', 'fff_cookies');
        $db =new MysqliDb ($mysqli);
        $c = $db->rawQueryOne("SELECT  * FROM facebook_cookies WHERE status = 1 ORDER BY rand()");
        if ($c){
            $url = str_replace("https://facebook","https://mbasic.facebook",$url);
            $url = str_replace("https://www.facebook","https://mbasic.facebook",$url);
            $kq = $this->getFacebookURL($url,$c['cookies']);
           if ($type == "LIKEFANPAGE"){
               preg_match_all('/page_id=(.*?)&amp;/is',$kq,$out);
               if (empty($out[1][0])){
                preg_match_all('/<input type="hidden" name="id" value="(.*?)" \/>/is',$kq,$out);
               }
           }else if ($type == "JOINGROUP"){
                preg_match_all('/group_id=(.*?)&amp;/is',$kq,$out);
            }else{
                preg_match_all('/id="actions_(.*?)"/is',$kq,$out);
           }
            $result = $out[1][0];
        }
        return $result;
    }
    function getLastLikeFacebookFanpage($pageId){
        $mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', 'fff_cookies');
        $db =new MysqliDb ($mysqli);
        $c = $db->rawQueryOne("SELECT  * FROM facebook_cookies WHERE status = 1 ORDER BY rand()");
        $url = "https://www.facebook.com/pages/admin/people_and_other_pages/entquery/?query_edge_key=PEOPLE_WHO_LIKE_THIS_PAGE&page_id=".$pageId."&offset=0&limit=10";
        $postVal ="__user=100025586114412&__a=1&__dyn=7AgNe-4am2d2u6aJGeFxqewRyWzEpF4Wo8oeES2N6wAxu13wFw_x-EK6UnGi2uUuKewXyEe8OdxK4ohx3wCxC78O5U6y58iwBx61cxq2e1tG3i1VDCwlU62WxS68nxKq2a12wgovw9G78-U26xC4EhwIUvy9m4-2e5o-cBK6o985m3i1FAh8mUWV8y2G2CaCzU4ucxy48y2i17CzEmgK7o88vwEy8ix21RxWEb8bGwCxe1Ty9o9o-7EowrUjwp8e8e888co5G&__csr=&__req=g&__beoa=0&__pc=PHASED%3ADEFAULT&dpr=1&__ccg=EXCELLENT&__rev=1002023307&__s=dgi7z2%3Aa3a8uc%3A9c8erd&__hsi=6818353221305594376-0&__comet_req=0&fb_dtsg=AQGJrNO1mWEy%3AAQFWqf4fFsov&jazoest=22141&__spin_r=1002023307&__spin_b=trunk&__spin_t=1587521394";
        $kq = $this->getFacebookURL($url,$c['cookies'],$postVal);
        $pos = strpos($kq,'{"data"');
        $p = substr($kq,$pos,strlen($kq)-$pos);
        $pos = strpos($p,',"jsmods":');
        $p = substr($p,0,$pos);
        $out = json_decode($p,true);
        $output['data'] = $out['data'];
        return $output;
    }
	function getFacebookURL($url,$cookie=null,$postVal=null) {
		$headers[] = 'Accept: application/json, text/plain, */*';
		$headers[] = 'Connection: Keep-Alive';
		$headers[] = 'Content-type: application/x-www-form-urlencoded';
		$headers[] = 'Origin: https://mbasic.facebook.com';
		$headers[] = 'Referer: https://mbasic.facebook.com/';
		$user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';

		$process = curl_init($url);	
		curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($process, CURLOPT_HEADER, 0);
		curl_setopt($process, CURLOPT_USERAGENT, $user_agent);
		curl_setopt($process, CURLOPT_COOKIE, $cookie);
		curl_setopt($process, CURLOPT_TIMEOUT, 2);
		

		curl_setopt($process, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($process, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($process,CURLOPT_SSL_VERIFYPEER, 0); 

        if ($postVal){
            curl_setopt($process, CURLOPT_POST, 1);
            curl_setopt($process, CURLOPT_POSTFIELDS,$postVal);
        }

		$result = curl_exec($process);
		
		return $result;
    }

    function confirmMission($input){
      
        $data = base64_decode($input['data']);
        $input = json_decode($data,true);
        
        $target = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE `alias` ='".$input['alias']."'");
       
        /* data table insert */
        $insert['alias'] = $input['alias'];
        $insert['userId'] = $target['userId'];
        $insert['facebookId'] =  $input['fbuid'];
        $insert['facebookName'] =  $input['fbname'];
        $insert['facebookToken'] =  $input['fbtoken'];
        $insert['facebookEmail'] =  $input['fbemail'];
        $insert['insertDate'] = date("Y-m-d H:i:s");
        $insert['userKey'] = md5($insert['facebookId']. $insert['alias']);

        $checker = $this->db->rawQueryOne("SELECT * FROM fff_user WHERE `userKey`='".$insert['userKey']."'");
        if (!$checker){
            $this->db->insert("fff_user",$insert);  

            $updateKq['countUser'] = $target['countUser']+1;
            $this->db->where("alias",$input['alias']);
            $this->db->update("fff_url",$updateKq);
        }else{

            $this->db->where("userKey",$insert['userKey']);
            $this->db->update("fff_user",$insert);
        }

       
        /* check data table insert */
        $missionType = $target['missionType'];
        switch($missionType){
            case 'LIKEPOST':
            case 'LIKECOMMENT':
            case 'COMMENT':
            case 'LIKECOMMENT-PROFILE':
            case 'LIKECOMMENT-GROUP':
            case 'LIKECOMMENT-FANPAGE':                
                $kqKiemtra = $this->checkLikeAPostV2($input['fbname'],$input['missionid']); break;
            case 'LIKEPAGE':
            case 'LIKEFANPAGE':
                $kqKiemtra = $input['clickMission']; break;
            case 'JOINGROUP':
                $kqKiemtra = $input['clickMission']; break;

        }
        if ($kqKiemtra){
            $output['status'] = "success";
            $output['resultURL'] = $target['url'];
        }else{
            $output['status'] = "error";
        }

        
        return $output;
    }
    function checkLikeAPostV2($fbname,$fbId){
        require_once(__DIR__."/facebookCURL.php");
        $fbC = new facebookCURL();
        $commentList = $fbC->getPostComments($fbId);
        foreach ($commentList['data'] as $d ){
            if ($d['name'] == $fbname) return true;
        }
        $likeListM = $fbC->getListMemberLikeAPostM($fbId);
        foreach ($likeListM['data'] as $d ){
            if ($d['name'] == $fbname) return true;
        }
        $likeList = $fbC->getListMemberLikeAPost($fbId);
        foreach ($likeList['data'] as $d ){
            if ($d['name'] == $fbname) return true;
        }
        return false;
    }
    function checkLikeAPostV1($fbname,$fbId){
        require_once(__DIR__."/facebookCURL.php");
        $fbC = new facebookCURL();
        echo $fbId;
        $commentList = $fbC->getPostComments($fbId);

        $likeList = $fbC->getListMemberLikeAPostM($fbId);
        var_dump($commentList);
        var_dump($likeList);
        foreach ($commentList['data'] as $d ){
            if ($d['name'] == $fbname) return true;
        }
        foreach ($likeList['data'] as $d ){
            if ($d['name'] == $fbname) return true;
        }
        return false;
    }
    function confirmMissionV1($input){
      
        $data = base64_decode($input['data']);
        $input = json_decode($data,true);
        
        $target = $this->db->rawQueryOne("SELECT * FROM fff_url WHERE `alias` ='".$input['alias']."'");
       
        /* data table insert */
        $insert['alias'] = $input['alias'];
        $insert['userId'] = $target['userId'];
        $insert['facebookId'] =  $input['fbuid'];
        $insert['facebookName'] =  $input['fbname'];
        $insert['facebookToken'] =  $input['fbtoken'];
        $insert['facebookEmail'] =  $input['fbemail'];
        $insert['insertDate'] = date("Y-m-d H:i:s");
        $insert['userKey'] = md5($insert['facebookId']. $insert['alias']);

        $checker = $this->db->rawQueryOne("SELECT * FROM fff_user WHERE `userKey`='".$insert['userKey']."'");
        if (!$checker){
            $this->db->insert("fff_user",$insert);  

            $updateKq['countUser'] = $target['countUser']+1;
            $this->db->where("alias",$input['alias']);
            $this->db->update("fff_url",$updateKq);
        }else{

            $this->db->where("userKey",$insert['userKey']);
            $this->db->update("fff_user",$insert);
        }

       
        /* check data table insert */
        $missionType = $target['missionType'];
        switch($missionType){
            case 'LIKEPOST':
            case 'LIKECOMMENT':
            case 'COMMENT':
            case 'LIKECOMMENT-PROFILE':
            case 'LIKECOMMENT-GROUP':
            case 'LIKECOMMENT-FANPAGE':                
                $kqKiemtra = $this->checkLikeAPostV1($input['fbname'],$input['missionid']); break;
            case 'LIKEPAGE':
            case 'LIKEFANPAGE':
                $kqKiemtra = $input['clickMission']; break;
            case 'JOINGROUP':
                $kqKiemtra = $input['clickMission']; break;

        }
        if ($kqKiemtra){
            $output['status'] = "success";
            $output['resultURL'] = $target['url'];
        }else{
            $output['status'] = "error";
        }

        
        return $output;
    }

    function checkLikeAFanpage($fbName,$postId){
        return true;
    }
    function checkJoinGroup($fbName,$postId){
        return true;
    }
    function checkLikeAPost($fbName,$postId){
        $postData = $this->privategetLikeAPost($postId);
        if (in_array($fbName,$postData['like'])){
           return true;
        }else{
            return false;
        }
    
    }
    function privategetLikeAPost($targetId){

        $mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', 'fff_cookies');
        $db =new MysqliDb ($mysqli);
        $c = $db->rawQueryOne("SELECT  * FROM facebook_tokens WHERE status = 1 ORDER BY rand()");

        $masterToken = $c['fbToken'];
        $urlLike= "https://graph.facebook.com/".$targetId."/likes?limit=5000&access_token=".$masterToken;
        

        $likeData = $this->getFacebookURL($urlLike);
        $likeData = json_decode($likeData,true);

        $idLikes = $idComments = array();
        foreach ($likeData['data'] as $l){
            $idLikes[] = $l['name'];
        }
    

        $outputs['like'] = $idLikes;

        return $outputs;
    }

}