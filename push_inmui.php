﻿<?php

if($_GET){
	
$msg_inmui = @mysql_real_escape_string($_GET['msg']);

define('PW_AUTH', 'jsBCE8rREtp2brZEQ0s3eh1tpj2FaRgSLzgSfEb13O4ndE8NDtIOGKfthg7Z7me5EWF1f83g67BbBOxiraj6');
define('PW_APPLICATION', '0AFD0-525F6');
define('PW_DEBUG', true);

function pwCall($method, $data = array()) {


    $url = 'https://cp.pushwoosh.com/json/1.3/' . $method;
    $request = json_encode(['request' => $data]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request);

    $response = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    if (defined('PW_DEBUG') && PW_DEBUG) {
        print "[PW] request: $request\n";
        print "[PW] response: $response\n";
        print "[PW] info: " . print_r($info, true);
    }
}
pwCall('createMessage', array(
                  'application' => PW_APPLICATION,
                  'auth' => PW_AUTH,
                  'notifications' => array(
                          array(

                              'send_date' => 'now',
                              'content' => $msg_inmui,

                          )

                  ),

                  //'devices' => array('2lksdflkje96a4389f796173fakeae938device95ajkdh8709843') //Optional. Not more than 1000 tokens in an array. If set, message will only be delivered to the devices in the list. Ignored if the applications group is used

          )
        );
		
}

?>