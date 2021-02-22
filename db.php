<?php

$database = [
	"host" => $_SERVER['SERVER_NAME'],
	"user" => "root",
	"pass" => "@Hovoruha460076",
	"char" => "utf8",
	"dbase" => "qcportal",
];

$database2 = [
	"dbase2" => "backend1",
];

extract($database, EXTR_OVERWRITE);
extract($database2, EXTR_OVERWRITE);

//echo 'my user is: ' . $user;
?>