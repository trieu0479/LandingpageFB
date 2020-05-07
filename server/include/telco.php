<?
class telco{
    private $ipv4;
    private $ipv6;
    function __construct(){
        $this->ipv4 = array(
            "FPT" => array(
                "1.52.0.0/14",
                "1.52.0.0/14",
                "103.35.64.0/22",
                "103.39.92.0/22",
                "113.22.0.0/16",
                "113.23.0.0/17",
                "118.68.0.0/14",
                "144.48.20.0/22",
                "183.80.0.0/16",
                "183.81.0.0/17",
                "203.191.8.0/21",
                "210.245.0.0/17",
                "42.112.0.0/13",
                "43.239.148.0/22",
                "58.186.0.0/15",
                "111.65.240.0/20",
                "180.148.128.0/20",
                "103.227.216.0/22",
            ),
            "VIETTEL" => array(
                "103.1.208.0/22",
                "115.84.176.0/21",
                "210.211.96.0/19",
                "45.117.160.0/22",
                "103.84.76.0/22",
                "115.72.0.0/13",
                "117.0.0.0/13",
                "125.234.0.0/15",
                "171.224.0.0/11",
                "203.113.128.0/18",
                "220.231.64.0/18",
                "27.64.0.0/12",
                "116.96.0.0/12",
                "125.212.128.0/17",
                "125.214.0.0/18",
                "203.190.160.0/20",
            ),
            "MOBIFONE" => array(
                "103.53.252.0/22",
                "45.121.24.0/22",
                "03.199.76.0/22",
                "137.59.44.0/22",
                "103.199.64.0/22",
                "137.59.28.0/22",
                "103.199.20.0/22",
                "59.153.220.0/22",
                "103.199.24.0/22",
                "59.153.224.0/22",
                "103.199.28.0/22",
                "59.153.228.0/22",
                "103.199.32.0/22",
                "59.153.232.0/22",
                "103.199.40.0/22",
                "59.153.236.0/22",
                "103.199.36.0/22",
                "59.153.240.0/22",
                "103.199.44.0/22",
                "59.153.244.0/22",
                "103.199.52.0/22",
                "59.153.248.0/22",
                "103.199.48.0/22",
                "59.153.252.0/22",
                "103.199.56.0/22",
                "137.59.32.0/22",
                "103.199.60.0/22",
                "137.59.36.0/22",
                "103.199.68.0/22",
                "137.59.24.0/22",
                "103.199.72.0/22",
                "137.59.40.0/22",
            ),
            "VNPT" => array(
                "103.111.236.0/22",
                "203.162.0.0/16",
                "203.210.128.0/17",
                "221.132.0.0/18",
                "113.160.0.0/11",
                "123.16.0.0/12",
                "203.160.0.0/23",
                "222.252.0.0/14",
                "14.160.0.0/11",
                "14.224.0.0/11",
                "221.132.30.0/23",
                "221.132.32.0/21",
            ),
            "VIETNAMOBILE" => array(
                "103.7.36.0/22",
                "202.172.4.0/23",
                "203.170.26.0/23",
                "45.126.96.0/22",
                "103.129.188.0/22",

            ),
            "NETNAM" => array(
                "119.17.192.0/19",
                "202.151.160.0/21",
                "210.86.224.0/21",
                "101.53.0.0/18",
                "119.15.176.0/20",
                "119.17.224.0/19",
                "202.151.168.0/21",
                "210.86.232.0/21",
                "101.96.64.0/18",
                "119.15.160.0/20",
            ),
            "GTEL" => array(
                "183.91.160.0/19",
                "110.35.72.0/21",
            ),
            "SCTV" => array(
                "103.99.244.0/22",
                "112.197.0.0/16",
                "27.2.0.0/15",
            ),
            "HTC" => array(
                "103.88.112.0/22",
                "103.88.116.0/22",
                "103.238.68.0/22",
                "203.128.240.0/21",
                "103.238.72.0/22",
                "202.60.104.0/21",
            ),
            "CMC" => array(
                "103.252.0.0/22",
                "115.146.120.0/21",
                "115.165.160.0/21",
                "119.82.128.0/20",
                "202.134.16.0/21",
                "203.171.16.0/20",
                "103.21.148.0/22",
                "124.158.0.0/20",
                "101.99.0.0/18",
                "103.9.196.0/22",
                "113.20.96.0/19",
                "183.91.0.0/19",
                "203.205.0.0/18",
                "45.122.232.0/22",
            ),
        );
        $this->ipv6 = array(
            "FPT" => array(
                "2001:0DF0:0066::/48",
                "2402:DD40::/32",
                "2001:0DF4:D800::/48",
                "2401:F740::/32",
                "2405:4800::/32",
            ),
            "VIETTEL" => array(
                "2402:0800::/32",
                "2401:D800::/32",
                "2401:5F80::/32",
            ),
            "MOBIFONE" => array(
                "2402:9D80::/32",
            ),
            "VNPT" => array(
                "2001:DF4:9700::/48",
                "2001:0EE0:1::/48",
                "2001:0EE0::/32",
            ),
            "VIETNAMOBILE" => array(
                "2400:E240::/32",
            ),
            "NETNAM" => array(
                "2401:E800::/32",
            ),
            "SCTV" => array(
                "2401:B5C0::/32",
                "2403:E200::/32",
            ),
            "HTC" => array(
                "2001:0DF0:000D::/48",
            ),
            "CMC" => array(
                "2402:5300::/32",
            ),
        );
    }
    function startsWith($str, $needle){
        return substr($str, 0, strlen($needle)) === $needle;
    }

    function ipVersion($txt) {
		 return strpos($txt, ":") === false ? 4 : 6;
    }
    
    function ip2long6($ip) {
		if (substr_count($ip, '::')) {
			$ip = str_replace('::', str_repeat(':0000', 8 - substr_count($ip, ':')) . ':', $ip);
		}
		$ip = explode(':', $ip);
		$r_ip = '';
		foreach ($ip as $v) {
			$r_ip .= str_pad(base_convert($v, 16, 2), 16, 0, STR_PAD_LEFT);
		}
		return base_convert($r_ip, 2, 10);
	}
    
	function ipv4_in_range($ip, $range) {
		if (strpos($range, '/') !== false) {
			// $range is in IP/NETMASK format
			list($range, $netmask) = explode('/', $range, 2);
			if (strpos($netmask, '.') !== false) {
				// $netmask is a 255.255.0.0 format
				$netmask = str_replace('*', '0', $netmask);
				$netmask_dec = ip2long($netmask);
				return ( (ip2long($ip) & $netmask_dec) == (ip2long($range) & $netmask_dec) );
			} else {
				// $netmask is a CIDR size block
				// fix the range argument
				$x = explode('.', $range);
				while(count($x)<4) $x[] = '0';
				list($a,$b,$c,$d) = $x;
				$range = sprintf("%u.%u.%u.%u", empty($a)?'0':$a, empty($b)?'0':$b,empty($c)?'0':$c,empty($d)?'0':$d);
				$range_dec = ip2long($range);
				$ip_dec = ip2long($ip);
				# Strategy 1 - Create the netmask with 'netmask' 1s and then fill it to 32 with 0s
				#$netmask_dec = bindec(str_pad('', $netmask, '1') . str_pad('', 32-$netmask, '0'));
				# Strategy 2 - Use math to create it
				$wildcard_dec = pow(2, (32-$netmask)) - 1;
				$netmask_dec = ~ $wildcard_dec;
				return (($ip_dec & $netmask_dec) == ($range_dec & $netmask_dec));
			}
		} else {
			// range might be 255.255.*.* or 1.2.3.0-1.2.3.255
			if (strpos($range, '*') !==false) { // a.b.*.* format
				// Just convert to A-B format by setting * to 0 for A and 255 for B
				$lower = str_replace('*', '0', $range);
				$upper = str_replace('*', '255', $range);
				$range = "$lower-$upper";
			}
			if (strpos($range, '-')!==false) { // A-B format
				list($lower, $upper) = explode('-', $range, 2);
				$lower_dec = (float)sprintf("%u",ip2long($lower));
				$upper_dec = (float)sprintf("%u",ip2long($upper));
				$ip_dec = (float)sprintf("%u",ip2long($ip));
				return ( ($ip_dec>=$lower_dec) && ($ip_dec<=$upper_dec) );
			}
			return false;
		}
    }
    
    function ipv6_in_range($ip, $range_ip)
	{
		$pieces = explode ("/", $range_ip, 2);

		$left_piece = $pieces[0];
		$right_piece = $pieces[1];
		// Extract out the main IP pieces
		$ip_pieces = explode("::", $left_piece, 2);
		$main_ip_piece = $ip_pieces[0];
		$last_ip_piece = $ip_pieces[1];
		// Pad out the shorthand entries.
		$main_ip_pieces = explode(":", $main_ip_piece);
		foreach($main_ip_pieces as $key=>$val) {
			$main_ip_pieces[$key] = str_pad($main_ip_pieces[$key], 4, "0", STR_PAD_LEFT);
		}
		// Create the first and last pieces that will denote the IPV6 range.
		$first = $main_ip_pieces;
		$last = $main_ip_pieces;
		// Check to see if the last IP block (part after ::) is set
		$last_piece = "";
		$size = count($main_ip_pieces);
		if (trim($last_ip_piece) != "") {
			$last_piece = str_pad($last_ip_piece, 4, "0", STR_PAD_LEFT);
			// Build the full form of the IPV6 address considering the last IP block set
			for ($i = $size; $i < 7; $i++) {
				$first[$i] = "0000";
				$last[$i] = "ffff";
			}
			$main_ip_pieces[7] = $last_piece;
		}
		else {
			// Build the full form of the IPV6 address
			for ($i = $size; $i < 8; $i++) {
				$first[$i] = "0000";
				$last[$i] = "ffff";
			}
		}
		// Rebuild the final long form IPV6 address
		$first = $this->ip2long6(implode(":", $first));
		$last = $this->ip2long6(implode(":", $last));
		$ip = $this->ip2long6($ip);
		$in_range = ($ip >= $first && $ip <= $last);
		return $in_range;
	}
    function xacdinhDevice($useragent){
        if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))
            return "MOBILE";
        else return "PC";
    }
    function xacdinhnhamang($ip){
        if ($this->ipVersion($ip) == 4){
            foreach ($this->ipv4  as  $key => $value){
                foreach ($value as $v){
                    if ($this->ipv4_in_range($ip,$v)){
                        return $key;
                    }
                }
            }
            return "UNKNOWN";
        }else if ($this->ipVersion($ip) == 6){
            foreach ($this->ipv6 as  $key => $value){
                foreach ($value as $v){
                    if ($this->ipv6_in_range($ip,$v)){
                        return $key;
                    }
                }
            }
            return "UNKNOWN";
        }
    }
    function getConnectionType($ip,$device="MOBILE"){
        $network = $this->xacdinhnhamang($ip);
        return $this->xacdinh3gwifi($ip,$device,$network);
    }
    function  xacdinh3gwifi($ip,$device,$network){
		$network3G_TRUE = array(
			"VIETNAMMOBILE","MOBIFONE"
        );
        $network3G_50 = array(
            "VIETTEL","VNPT",
        );
        if (in_array($network,$network3G_TRUE)){
            return "3G";
        }else{
            if (in_array($network,$network3G_50) && $device == "MOBILE"){
                return "3G";
            }else{
                return "WIFI";
            }
        }
        return "WIFI";
    }
    function getTelcoIP($telcoName){
        foreach ($this->ipv4  as  $key => $value){
            if ($key == $telcoName){
                $kq['ipv4'] = $value;
            }
        }
        foreach ($this->ipv6  as  $key => $value){
            if ($key == $telcoName){
                $kq['ipv6'] = $value;
            }
        }
        return $kq;
    }
}

?>
