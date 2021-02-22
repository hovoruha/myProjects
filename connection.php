<?php

require_once('db.php');

$conn = mysqli_connect($host, $user, $pass, $dbase);
$conn2 = mysqli_connect($host, $user, $pass, $dbase2);

if (mysqli_errno($conn)){
	echo 'Eroare de conectare';
}else{
	mysqli_set_charset($conn, $char);
	//echo 'Conectat';
}

if (mysqli_errno($conn2)){
	echo 'Eroare de conectare';
}else{
	mysqli_set_charset($conn2, $char);
	//echo 'Conectat';
}

?>