<?php 
class stats{
    var $db = null;
    var $userId = null;
    var $cookie = null;
    public function __construct(){
        $mysqli = new mysqli ('210.211.116.252', '2020_u_fffblue', '2020_u_fffblue', '2020_fff_facebook');
        $this->db = new MysqliDb ($mysqli);
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
    // tong hop tat ca cac fanpage 
    function getAllFacebookInformation($limit){
        $allInformationFb = $this->db->rawQuery("SELECT * FROM facebook_fanpage Orders LIMIT ".$limit."");
        $data = [];
        if($allInformationFb) {
            $data = $allInformationFb;
        }
        // http://v7-fffblue.com/server/stats.php?task=getAllFacebookInformation&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&limit=100
        return $data;
    }
    // thong tin chi tiet ve fanpage 
    function getFacebookInformation($fbId){
        $this->db->where("fbId",$fbId);
        $informationFb = $this->db->getone('facebook_fanpage');
        // echo $this->db->getLastQuery();
        $data = [];
        if($informationFb) {
            $data['phone'] = $informationFb['phone'];
            $data['website'] = $informationFb['website'];
            $data['rootURL'] = $informationFb['rootURL'];
            $data['json'] = json_decode(stripcslashes($informationFb['json']));
        }
        // http://v7-fffblue.com/server/stats.php?task=getFacebookInformation&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&fbId=101162088206729
        return $data;
    }
    // toan bo category
    function showCategory(){
        $showCategory = $this->db->rawQuery("SELECT DISTINCT fbCategory FROM facebook_fanpage");
        $data = [];
        if($showCategory) {
            foreach($showCategory as $key => $value) {
                array_push($data,$value [fbCategory]);
            }
        }
        return $data;
        //http://v7-fffblue.com/server/stats.php?task=showCategory&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o
    }
    // loc theo category
    function getFacebookCategory($category){
        $this->db->where("fbCategory",$category);
        $categoryFb = $this->db->get('facebook_fanpage');
        $data = [];
        if($categoryFb) {
            $data = $categoryFb;
        }
        // http://v7-fffblue.com/server/stats.php?task=getFacebookCategory&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&category=Nh%C3%A0%20xu%E1%BA%A5t%20b%E1%BA%A3n
        return $data;
    }
    // luot like fanpage hang ngay 
    function getFacebookLikesDay($fbId, $from, $to){
        if (empty($from)) $from = date("Y-m-d",strtotime("-10 days"));
        if (empty($to)) $to = date("Y-m-d");
        $this->db->where("fbId",$fbId);
        $this->db->Where ('insertTime', Array ($from, $to), 'BETWEEN');
        $likesFb = $this->db->get('facebook_fanpage_log');
        $data = []; 
        $output = [];
        if($likesFb) {
            foreach($likesFb as $key => $value) {
                $data["logKey"] = $value["logKey"];
                $data["fbId"] = $value["fbId"];
                $data["likes"] = $value["likes"];
                $data["insertTime"] = $value["insertTime"];
                array_push($output,$data);
            }
        }
        return $output;
        // http://v7-fffblue.com/server/stats.php?task=getFacebookLikeDay&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&fbId=36634376117&from=2020-05-07&to=2020-05-11
    }
}
?>