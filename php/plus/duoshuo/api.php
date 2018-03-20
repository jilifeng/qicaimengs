<?php
require_once(dirname(__FILE__)."/../../include/common.inc.php");
require_once(DEDEINC.'/arc.archives.class.php');

if (!extension_loaded('json'))
	include_once 'compat_json.php';

function nocache_headers(){
	header("Pragma:no-cache\r\n");
	header("Cache-Control:no-cache\r\n");
	header("Expires:0\r\n");
}

if (!headers_sent()) {
	nocache_headers();//max age TODO:
	header('Content-Type: text/javascript; charset=utf-8');
}

require_once 'Client.php';
require_once 'Abstract.php';
require_once 'Dedecms.php';
require_once 'LocalServer.php';
require_once 'Exception.php';

if (!class_exists('Duoshuo_Dedecms')){
	$response = array(
		'code'			=>	30,
		'errorMessage'	=>	'Duoshuo plugin hasn\'t been activated.'
	);
	echo json_encode($response);
	exit;
}

$plugin = Duoshuo_Dedecms::getInstance();

try{
	if ($_SERVER['REQUEST_METHOD'] == 'POST'){
		$server = new Duoshuo_LocalServer($plugin);
		
		$input = $_POST;
		if (get_magic_quotes_gpc()){
			foreach($input as $key => $value)
				$input[$key] = stripslashes($value);
		}
		$server->dispatch($input);
	}
}
catch (Exception $e){
	Duoshuo_LocalServer::sendException($e);
	exit;
}
