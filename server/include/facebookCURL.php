<?php 
class facebookCURL{
    var $db = null;
    var $cookie = null;
    var $token = null;
    var $fbId = null;
    var $fb_dtsg  = null;
    public function __construct(){
        $mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', 'fff_cookies');
        $db =new MysqliDb ($mysqli);
        $c = $db->rawQueryOne("SELECT  * FROM facebook_cookies WHERE fbType = 'NEWACCOUNT' AND status=1 ORDER BY rand()");
        $this->cookie = $c['cookies'];
        $this->token = $c['token'];
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
        if (! $cookie) $cookie = $this->cookie;
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

    
	function getBuddyList(){
		$input['url'] = "https://mbasic.facebook.com/buddylist.php";
		$kq = $this->getWebsite($input['url']);
		$html = $kq['content'];
		preg_match_all('/<a href="\/messages\/read\/\?fbid=(.*?)&amp;click_type=buddylist\#fua"(.*?)>(.*?)<\/a>/is',$html,$out);
		for($i=0;$i<count($out[1]);$i++){
			$fb = array();
			$fb['id'] = $out[1][$i];
			$fb['name'] = $out[3][$i];
			$output[] = $fb;
		}
		return $output;
    }
    function getFacebookIdFromURL($url){
        
        $tmp ="";
        if ($p1 = strpos($url,"permalink/")){
            $tmp = substr($url,$p1+10,strlen($url)-$p1-10);
            $output['type'] ="GROUP";
        }
        
        if ($p1 = strpos($url,"posts")){
            $tmp = substr($url,$p1+5,strlen($url)-$p1-5);
            $output['type'] ="POST";
        }
        if ($p1 = strpos($url,"watch/?v=")){
            $tmp = substr($url,$p1+10,strlen($url)-$p1-10);
            $output['type'] ="POST";
        }
       
        if ($p1 = strpos($tmp,"?")){
            $tmp = substr($tmp,0,$p1);
        }
        $tmp = str_replace("/","",$tmp);

        if (empty($tmp)){
            $url = str_replace("https://facebook","https://mbasic.facebook",$url);
            $url = str_replace("https://www.facebook","https://mbasic.facebook",$url);
            
            $kq = $this->getFacebookURL($url);
            preg_match_all('/page_id=(.*?)&amp;/is',$kq,$out);
            if (@$out[1][0]){
                $output['fbId'] = $out[1][0];
                $output['type'] ="FANPAGE";
                return $output;
            }
            preg_match_all('/group_id=(.*?)&amp;/is',$kq,$out);
            if (@$out[1][0]){
                $output['fbId'] = $out[1][0];
                $output['type'] ="GROUP";
                return $output;
            }
            preg_match_all('/profile_id=(.*?)"/is',$kq,$out);
            if (@$out[1][0]){
                $output['fbId'] = $out[1][0];
                $output['type'] ="PROFILE";
                return $output;
            }
            
            preg_match_all('/actions_(.*?)"/is',$kq,$out);
            if (@$out[1][0]){
                $output['fbId'] = $out[1][0];
                $output['type'] ="POST";
                return $output;
            }
        }else{
            $output['fbId'] = $tmp;
        }
        return $output; 
    }
    function getListMemberLikeAPost($postId,$limit=20000){
		$url ="https://mbasic.facebook.com/ufi/reaction/profile/browser/fetch/?total_count=2000&ft_ent_identifier=".$postId."&limit=".$limit;
        $html = $this->getFacebookURL($url);		
		preg_match_all('/<h3 class="(.*?)"><a href="(.*?)">(.*?)<\/a><\/h3>(.*?)<a href="\/a\/mobile\/friends\/add_friend.php\?id=(.*?)&amp;/is',$html,$ooo);
		for ($i=0;$i<count($ooo[1]);$i++){
			$x = array();
			$x['id'] = $ooo[5][$i];
			$x['name'] = html_entity_decode($ooo[3][$i]);
			$data[] = $x;
        }
        $output['total'] = count($data);
        $output['data'] = $data;
		return $output; 
    }
    function getListMemberLikeAPostM($postId,$limit=20000){
		$url ="https://m.facebook.com/ufi/reaction/profile/browser/?ft_ent_identifier=".$postId."&limit=".$limit;
        $html = $this->getFacebookURL($url);
        $html = htmlspecialchars_decode ($html);
        
        preg_match_all('/<div class="_4mo"><span><span><strong>(.*?)<\/strong>(.*?)id="sub_btn_subscribe_(.*?)"/is',$html,$ooo);
		for ($i=0;$i<count($ooo[1]);$i++){
			$x = array();
			$x['id'] = $ooo[3][$i];
			$x['name'] = html_entity_decode($ooo[1][$i]);
			$data[] = $x;
        }
        preg_match_all('/<span><span><strong>(.*?)<\/strong>(.*?)"hf":"profile_browser","id":(.*?),"sc":-1/is',$html,$out);
		for ($i=0;$i<count($out[1]);$i++){
            $x = array();
            $x['name'] = $out[1][$i];
			$x['id'] = html_entity_decode($out[3][$i]);
			
			$data[] = $x;
        }
        $output['total'] = count($data);
        $output['data'] = $data;
		return $output; 
    }
    function getPostComments($postId){
		
		$url = "https://m.facebook.com/".$postId;
		$content = $this->getFacebookURL($url);
		preg_match_all('/feed_story_ring(.*?)">(.*?)aria-label="(.*?), profile picture"/is',$content,$d);
		
		for($i=1;$i<count($d[1]);$i++){
			$o = array();
			$o['id'] = $d[1][$i];
			$o['name'] = html_entity_decode($d[3][$i]);
			$data[] = $o;
        }
        $output['total'] = count($data);
        $output['data'] = $data;
		return $output;
    }
    
    function getMe($getfull = false){ 
		return $this->get_fb_dtsg($getfull);
	}
	function get_fb_dtsg($getfull = false){ 
		if ($this->cookie){
			if ($getfull == true){
				$this->getFacebookURL("https://mbasic.facebook.com/a/nux/wizard/nav.php?step=friend_requests&amp;skip",$this->cookie);
				$this->getFacebookURL("https://mbasic.facebook.com/a/nux/wizard/nav.php?step=phone&amp;skip",$this->cookie);
				$this->getFacebookURL("https://mbasic.facebook.com/a/nux/wizard/nav.php?step=search&skip",$this->cookie);
			}
			$url = $this->getFacebookURL("https://mbasic.facebook.com/profile.php",$this->cookie);
			$kq = array();
			if(preg_match('#<title>(.*?)<\/title>#is',$url, $_puaru))
			{
				$kq['name'] = $_puaru[1];
				if (@$kq['name']) $this->fbName = $kq['name'];
			}
			if(preg_match('#name="target" value="(.+?)"#is',$url, $_puaru))
			{
				$kq['id'] = $_puaru[1];
				if (@$kq['id']) $this->fbId = $kq['id'];
			}
			if(preg_match('#name="fb_dtsg" value="(.+?)"#is',$url, $_puaru))
			{
				$kq['fb_dtsg'] = $_puaru[1];
			}
			if (!empty($kq['fb_dtsg'])) {
				$this->fb_dtsg = $kq['fb_dtsg'];
			};
			$html = $this->getFacebookURL("https://mbasic.facebook.com/home.php",$this->cookie);
			
			preg_match_all('/<span class="cl cm" id="like_(.*?)">/is',$html,$out);
			if (@$out[1][0]){
				$kq['lastPost'] = $out[1][0];
			}
			preg_match_all('/<strong><a class="(.*?)" href="(.*?)">(.*?)<\/a>/',$html,$out);
			
			if (@$out[1][0]){
				$kq['lastName'] = $out[3][0];
			}
			
		}else{
			return false;
		}
		return $kq;
    }
    function getRootDomain($domain){
        if (strpos($domain,"http") === false){
            $domain = str_ireplace('www.', '', $domain);    
        }else{
            $domain = str_ireplace('www.', '', parse_url($domain, PHP_URL_HOST));
        }
        return $domain;
    }
  
    function getFanpageInfoByCURL($fbId){
        $url = "https://m.facebook.com/".$fbId;
        $content = $this->getFacebookURL($url);
        $p1 = strpos($content,"người thích nội dung này");
        $p = substr($content,0,$p1);
        $p1 = strripos($p,">");
        $output['likes'] = str_replace(".","",trim(substr($p,$p1+1,strlen($p)-$p1-1)));
        preg_match_all('/href="tel:(.*?)"/is',$content,$out);
        $phone = str_replace("%20","",$out[1][0]);
        $output['phone'] = $phone;
        preg_match_all('/url:"mailto:(.*?)"/is',$content,$out);
        $output['email'] = $out[1][0];
        return $output;

        
    }

    private function formatPhoneNumberVietnam($phone){
        $phone = str_replace("+","",$phone);
        $phone = str_replace(" ","",$phone);
        $phone = str_replace("-","",$phone);
        $phone = str_replace(".","",$phone);
        if (substr($phone,0,1) == "0"){
            $phone = "84".substr($phone,1);
        }
        return $phone;
      }
    function getFanpageInfo($fbId){
        $url = "https://graph.facebook.com/".$fbId."?access_token=".$this->token;
        $data = $this->getFacebookURL($url);
        $k = json_decode($data,true);
        
        if ($k['phone']) $output['phone'] = $this->formatPhoneNumberVietnam(str_replace("+","",$k['phone']));
        if ($k['website']){
         $output['website'] = $k['website'];
         $output['rootURL'] = $this->getRootDomain($k['website']);
        }
        $output['talking_about_count'] = $k['talking_about_count'];
        $output['likes'] = $k['likes'];
        $output['json'] = $data;
        return $output;

    }
    function searchFanpageSuggestion($q){
        $this->getMe();
		$q = urlencode($q);
		$url = "https://www.facebook.com/ads/library/async/search_typeahead/?ad_type=all&country=VN&is_mobile=false&q=".$q;
		$postVal = "__user=".$this->fbId."&__a=1&__dyn=7xeUmBwjbgydwn8K4osBWo5O12wAxu13wqojyUW3qi2K7E2gzEeUhwVwxwxwcW4o2vwho1upE4W0OE2WxO2u3W1OwKwEwgolzUO0iS12Ki8wnU1e42C227Ua87u1dwo8kzEjxS2W1LxW&__req=o&__be=1&__pc=PHASED%3ADEFAULT&dpr=1&__rev=1001126262&__s=%3Av1yimc%3Adsgk2l&__hsi=6731881700477467712-0&fb_dtsg=".$this->fb_dtsg."&jazoest=22018&__spin_r=1001126262&__spin_b=trunk&__spin_t=1567301964;";
		$data = $this->getFacebookURL($url,null,$postVal);
		preg_match_all('/"pageResults":\[(.*?)\],"disclaimerResults"/is',$data,$out);
		$jsonData = '['.$out[1][0].']';
		$data = json_decode($jsonData,true);
		return $data;
	}
	function getFanpageAds($fid,$limit=20){
        $this->getMe();
		$url = "https://www.facebook.com/ads/library/async/search_ads/?count=100&active_status=all&category=-1&countries[0]=VN&view_all_page_id=".$fid;
		$postVal ="__user=".$this->fbId."&__a=1&__dyn=7xeUmBwjbgydwn8K4osBWo5O12wAxu13wqojyUW3qi2K7E2gzEeUhwVwxwxwcW4o2vwho1upE4W0OE2WxO2u3W1OwKwEwgolzUO0iS12Ki8wnU1e42C227Ua87u1dwo8kzEjxS2W1LxW&__req=5&__be=1&__pc=PHASED%3ADEFAULT&dpr=1&__rev=1001126262&__s=ep7hq0%3Av1yimc%3Aj8ttc7&__hsi=6731886961077170054-0&fb_dtsg=".$this->fb_dtsg."&jazoest=21967&__spin_r=1001126262&__spin_b=trunk&__spin_t=1567301964";
		$data = $this->getFacebookURL($url,null,$postVal);
		

		preg_match_all('/"results":\[(.*?)\],"pageResults"/is',$data,$out);
		
		$jsonData = '['.$out[1][0].']';
		$data = json_decode($jsonData);
		return $data;
	}
	function getRelatedFanpage($fbId){
		
		$url = "https://www.facebook.com/pages/?frompageid=".$fbId;
		$content = $this->getFacebookURL($url);
		preg_match_all('/pageID:(.*?),pageName:"(.*?)",removeButton/is',$content,$out);
		$output = array();
		for($i=0;$i<count($out[1]);$i++){
			$p = array();
			$p['fbId'] = $out[1][$i];
			$p['fbName'] = $out[2][$i];
			$output[] = $p;
		}
		return $output;
    }
    function cronSearchFanpageSuggestion(){
        $mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', '2020_fff_facebook');
        $db =new MysqliDb ($mysqli);
        $data = $db->rawQueryOne("SELECT * FROM facebook_waiting WHERE isProcess = 0");
        if ($data){
            $kq = $this->searchFanpageSuggestion($data['keyword']);

            $updateKeywords['isProcess'] = 1;
            $db->where("id",$data['id']);
            $db->update("facebook_waiting",$updateKeywords);
            foreach ($kq as $i){
                $insert = array();
                $log = array();
                $insert['fbId'] = $i['id'];
                $insert['fbCategory'] = $i['category'];
                $insert['fanpageName'] = $i['name'];
                $insert['fanpageCover'] = $i['imageURI'];
                $insert['likes'] = $i['likes'];
                if ($i['country']) $insert['country'] = $i['country'];
                if ($i['pageAlias']) $insert['pageAlias'] = $i['pageAlias'];
                if ($i['igVerification']) $insert['igVerification'] = $i['igVerification'];
                $insert['insertTime'] =date("Y-m-d H:i:s");
                //$insert['lastUpdateTime'] =date("Y-m-d H:i:s");
                $db->insert("facebook_fanpage",$insert);

               
            }
            $output['status'] = "insert";
            $output['data'] = count($kq);
            
        }
        return $output;
    }
    function cronUpdateFanpage(){
        $mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', '2020_fff_facebook');
        $db =new MysqliDb ($mysqli);
        $data = $db->rawQuery("SELECT * FROM facebook_fanpage WHERE lastUpdateTime IS NULL or lastUpdateTime <= NOW() - INTERVAL 1 DAY ORDER BY lastUpdateTime, id LIMIT 0,50");
       // $data = $db->rawQuery("SELECT * FROM facebook_fanpage ORDER BY lastUpdateTime, id ASC LIMIT 0,50");
        if ($data){
            foreach ($data as $d){
                $k = $this->getFanpageInfo($d['fbId']);
                $insert  = array();
                if ( $d['likes']) $insert['likes_yesterday'] = $d['likes']; else $insert['likes_yesterday']  = 0;
                $insert['likes'] = $k['likes'];
                $insert['phone'] = $k['phone'];
                $insert['website'] = $k['website'];
                $insert['rootURL'] = $k['rootURL'];
                $insert['talking_about_count'] = $k['talking_about_count'];
                $insert['json'] = addslashes($k['json']);
                $insert['lastUpdateTime'] = date("Y-m-d H:i:s");
            
                $db->where("fbId",$d['fbId']);
                $db->update("facebook_fanpage",$insert);
                //echo $db->getLastQuery();

                $log['fbId'] = $d['fbId'];
                $log['likes'] = $k['likes'];
                $log['logKey'] = md5(date("Y-m-d").$log['fbId']);
                $log['insertTime'] = date("Y-m-d H:i:s");
                $db->insert("facebook_fanpage_log",$log);
               // echo $db->getLastQuery();
            }
            $output['status'] = "update";
            $output['data'] = count($data);
        }else{
            $output['status'] = "empty";
        }
        return $output;
    }
}