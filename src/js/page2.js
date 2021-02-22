function fromPage2(){

	const form = document.getElementById('entry-form');
	form.addEventListener('submit', formSubmit);
	
	const returnToMain = document.getElementById('back');
	returnToMain.addEventListener('click', loadMain);

	function formSubmit(e){
		e.preventDefault();
		
		const user = document.getElementById('user').value;
		const pass = document.getElementById('pass').value;
		const sid = document.getElementById('sid');
		const suser = document.getElementById('suser');
		const smail = document.getElementById('smail');
		const sadmin = document.getElementById('sadmin');
		
		if(!user || !pass){
			alert('completati userul si parola');
			return;
		}else{
			const xhr = new XMLHttpRequest();
			xhr.open('POST', 'actions.php', true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send('page=admin' + '&user=' + user + '&pass=' + pass);
			
			xhr.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					console.log(this.responseText);
					let admin = JSON.parse(this.responseText);
					
					console.log(admin);
					
					sid.value = admin.id;
					suser.value = admin.username;
					smail.value = admin.email;
					sadmin.value = admin.admin;

					console.log(sid.value + ' ' + suser.value + ' ' + smail.value + ' ' + sadmin.value);
				}
			}
			
			
		}
	}
}