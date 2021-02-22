<?php
require_once('connection.php');
require_once('functions.php');

$formdata = [
	"f_user" => !empty($_POST['user']) ? mysqli_real_escape_string($conn, $_POST['user']) : '',
	"f_pass" => !empty($_POST['pass']) ? mysqli_real_escape_string($conn, $_POST['pass']) : '',
	"f_mail" => !empty($_POST['mail']) ? mysqli_real_escape_string($conn, $_POST['mail']) : '',
	"f_admin" => !empty($_POST['admin']) ? mysqli_real_escape_string($conn, $_POST['admin']) : '',
	"f_id" => !empty($_POST['id']) ? mysqli_real_escape_string($conn, $_POST['id']) : '',
];

extract($formdata, EXTR_OVERWRITE);

$page = !empty($_REQUEST['page']) ? $_REQUEST['page'] : '';

switch($page){
	case 'admin' :
		if(!empty($f_user) && !empty($f_pass)){
			$admin = query($conn, "SELECT * FROM `users` WHERE `users`.`username` = '{$f_user}' AND `users`.`password` = '{$f_pass}' LIMIT 1");
			
			if(count($admin) === 1){
				session_start();
				//$_SESSION['admin'] = render($admin[0]);
				$_SESSION['admin'] = $admin[0];
				$result = $_SESSION['admin'];
				render($result);
			}
		}
		break;
	case 'loadusers' :
		$allusers = query($conn2, "SELECT * FROM `users`");
		render($allusers);
		break;
	case 'seluser' :
		$user = query($conn2, "SELECT * FROM `users` WHERE `users`.`id` = '{$f_id}' LIMIT 1");
		render($user);
		break;
	case 'update' :
		query($conn2, "UPDATE `users` SET `users`.`username` = '{$f_user}', `users`.`password` = '{$f_pass}', `users`.`email` = '{$f_mail}', `users`.`admin` = '{$f_admin}' WHERE `users`.`id` = '{$f_id}'");
		// $refreshusers = query($conn2, "SELECT * FROM `users`");
		// render($refreshusers); de activat doar daca se face refresh prin AJAX → de vazut atunci problema cu variabila uid care tine localStorage-ul... (nu se actualizeaza in timp real...)
		break;
	case 'insert' :
		query($conn2, "INSERT INTO `users` (`username`, `password`, `email`, `admin`) VALUES ('{$f_user}', '{$f_pass}', '{$f_mail}', '{$f_admin}')");
		break;
	case 'getUserCount' :
		$count = query($conn2, "SELECT COUNT(`users`.`id`) AS 'count' FROM `users`");
		render($count);
		break;
		
}


?>