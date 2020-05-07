<?
require_once __DIR__.'/Mobile_Detect.php';
// Include or require the class file
require_once __DIR__.'/detect.php';

function detectDevice(){
    $kq['Device_Type'] = Detect::deviceType();
    $kq['Device_browser'] = Detect::browser();
    $kq['Device_Brand'] = Detect::brand();
    $kq['Device_osName'] = Detect::os();
    return $kq;
}
$k = detectDevice();

?>