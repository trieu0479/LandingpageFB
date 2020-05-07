<?php
	require __DIR__.'/vendor/autoload.php';
	use Elasticsearch\ClientBuilder;

	$hosts = [
		"elastic.fff.com.vn:19200"
	];
	$client = ClientBuilder::create()->setHosts($hosts)->build();

	
?>