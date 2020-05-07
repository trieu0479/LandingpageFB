<?php 
class user{
    private $db;
    private $userId ="";
    private $demoToken = "ZGdZVktsdE91by9qOUtndjc4MjYwTHdQeXllT3NKTS9ZUHVzdThJYTNWST06OhMNb7G48NOo6noCn1JFw0I";

    function __construct() {
        $mysqli = new mysqli ('maindb.fff.com.vn', 'fff_com_vn', 'fff_com_vn!@#', 'fff_com_vn');
        $this->db = new MysqliDb ($mysqli);
    }
    function getUserId($token){
        $protect = new protect();
        $t = $protect->decrypt($token);
        $p = explode("|",$t);
        if (empty($p)) return null;
        else return $p[0];
    }
    function checkTokenIsVipMember($token){
        
        if ($token == $this->demoToken){
            return -2;
        }else{
            $this->userId = $this->getUserId($token);
            if (empty( $this->userId)) return -1;
            $data = $this->db->rawQueryOne("SELECT * FROM khachhang_vip WHERE customerId =". $this->userId." AND (tool_all = 1 OR vipTool='all') ORDER BY expiredTime DESC");
            if ($data){   
                if (strtotime($data['expiredTime']) - time() > 0){
                    return 1;
                }
            }
            $data1 = $this->db->rawQueryOne("SELECT * FROM khachhang_vip WHERE customerId =". $this->userId." AND DATE(tool_phantich) > DATE(NOW())");
            if ($data1){
                return 1;
            }else return 0;
        }
    }
}
?>