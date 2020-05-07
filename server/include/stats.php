<?php 
class stats{
    var $db = null;
    var $userId = null;
    var $cookie = null;
    public function __construct(){
        $mysqli = new mysqli ('210.211.116.252', '2020_u_fffblue', '2020_u_fffblue', '2020_fff_facebook');
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
    function getFacebookInformation($fbId){
        echo $fbId;
    }

}

?>