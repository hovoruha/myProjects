<?php

//___query func___________________________
function query($conn, $sql){
	$result = [];
	
	if($query = mysqli_query($conn, $sql)){
		if(is_bool($query)){
			return $query;
		}
		
		while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
			$result[] = $row;
		}
		
		mysqli_free_result($query);
	}
	
	return $result;
}
//________________________________________
//___render func__________________________
function render($data=[]){
	header('Content-type: application/json');
	die(json_encode($data));
}
//________________________________________


?>