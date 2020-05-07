<?php
require_once("./require.php");
require_once("./include/report.php");
$userToken = $_GET['userToken'];
$task = $_GET['task'];
$report = new report();

switch ($task){
    case 'reportByDate':
        $from = $_GET['from'];
        $to = $_GET['to'];
        $kq->data = $report->reportByDate($userToken,$from,$to);break;
 
}
echo json_encode($kq); 