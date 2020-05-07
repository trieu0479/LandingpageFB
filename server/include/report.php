<?php 
class report{
    var $db = null;
    var $userId = null;
    var $cookie = null;
    public function __construct(){
        //$mysqli = new mysqli ('maindb.fff.com.vn', '2020_fffblue_shorturl', '123qazZAQ', '2020_fffblue_shorturl');
        //$this->db =new MysqliDb ($mysqli);
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
    function reportByDate($userToken,$from=null,$to=null){
        $this->getUserId($userToken);
        require_once __DIR__.'/config.php';
        if (empty($from)) $from = date("Y-m-d",strtotime("-30 days"));
        if (empty($to)) $to = date("Y-m-d");
        for ( $i = strtotime($from); $i <=strtotime($to); $i = $i + 86400 ) {
            $thisDate = date( 'Y-m-d', $i ); 
            $nextDate = date( 'Y-m-d', $i + 86400 ); 
            $paramsQuery='{
                "size":0,
                "aggs": {
                  "Device_Type": {
                    "terms": {
                      "field": "Device_Type.keyword",
                      "size": 10000
                    }
                  }
                },
                "query": {
                  "bool": {
                    "must": [
                      {
                        "match": {
                          "userId": "363000"
                        }
                      }
                    ],
                    "filter": [
                      {
                        "range": {
                          "insertTime": {
                            "time_zone": "+07:00",
                            "gte": "'.$thisDate.'",
                            "lte": "'.$thisDate.'"
                          }
                        }
                      }
                    ]
                  }
                }
              }';
              $params['index']='2020_fffblue';
              $body = json_decode($paramsQuery,true);
              $params['body'] = $body;  
              $oo = $client->search($params);
              $item = array();
              $item['date'] = date( 'Y-m-d', $i );
              $item['totalView'] = $oo['hits']['total']['value'];
              $item[$oo['aggregations']['Device_Type']['buckets'][0]['key']] = $oo['aggregations']['Device_Type']['buckets'][0]['doc_count'];
              $item[$oo['aggregations']['Device_Type']['buckets'][1]['key']] = $oo['aggregations']['Device_Type']['buckets'][1]['doc_count'];
              $items[$item['date']] = $item;
        }
       
        
        $mysqli = new mysqli ('maindb.fff.com.vn', '2020_fffblue_shorturl', '123qazZAQ', '2020_fffblue_shorturl');
        $db =new MysqliDb ($mysqli);
        $mysqlTo = date("Y-m-d",strtotime($to)+86400);
        $data = $db->rawQuery("SELECT DATE(insertDate) AS insertDate, COUNT(id) as totalLead FROM fff_user WHERE userId=363000 AND insertDate >='".$from."' AND insertDate <='".$mysqlTo."'  GROUP BY DATE(insertDate)");
        foreach ($data as $d){
            $items[$d['insertDate']]['lead'] = $d['totalLead'];
        }

        $output['from'] = $from;
        $output['to'] = $to;
        $output['data'] = $items;
        return $output;
    }
}
?>