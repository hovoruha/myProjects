function fromPage3() {
	console.log('loaded page3');
	
	//let uid = '';
	const update = document.getElementById('update');
	const addnew = document.getElementById('addnew');
	const myForm = document.getElementById('entry-form');
	const myTable = document.getElementById('table-body');
	const selectAmount = document.getElementById('contentAmount');
	
	const tableHeader = 
	`<tr class="table-header">
		<th>id</th>
		<th>username</th>
		<th>password</th>
		<th>email</th>
		<th>admin</th>
	</tr>`;
	let operation = 0;
	
	const returnToMain = document.getElementById('back');
	returnToMain.addEventListener('click', loadMain);
	
	update.addEventListener('click', updateUser);
	addnew.addEventListener('click', addNewUser);
	selectAmount.addEventListener('change', loadPages);
	
	function updateUser(){
		console.log('setting updateUser');
		operation = 1;
		myForm.lastElementChild.getElementsByTagName('input')[0].value = 'UPDATE';
		myForm.lastElementChild.classList.add('show');
		verifyOperation();
	}
	
	function addNewUser(){
		console.log('setting addNewUser');
		operation = 2;
		myForm.lastElementChild.getElementsByTagName('input')[0].value = 'INSERT';
		myForm.lastElementChild.classList.add('show');
		verifyOperation();
	}
	
	function updateDb(e){
		e.preventDefault();
		// let output = '';
		const uid = localStorage.getItem('uid');
		
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'actions.php', true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send('page=update' + '&id=' + uid + '&user=' + user.value + '&pass=' + pass.value + '&mail=' + mail.value + '&admin=' + admin.value);
		
		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				console.log('user just got updated');
				// const response = JSON.parse(this.responseText);
				
				// for(i in response){
					// output +=
					
					// '<tr>' +
					// '<td><div class="edit"><i class="far fa-edit"></i><div class="lnk">' + response[i].id + '</div></div></td>' +
					// '<td>' + response[i].username + '</td>' +
					// '<td>' + response[i].password + '</td>' +
					// '<td>' + response[i].email + '</td>' +
					// '<td>' + response[i].admin + '</td>' +
					// '</tr>'
					
				// }
				
				// myTable.innerHTML = tableHeader + output;
			}
		}
		
		operation = 0;
		// update.checked = false;
		myForm.lastElementChild.classList.remove('show');
		// clearInputs();
		location.reload();
	}
	
	function insertDb(){
		console.log('running insert func');
		//action here...
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'actions.php', true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send('page=insert' + '&user=' + user.value + '&pass=' + pass.value + '&mail=' + mail.value + '&admin=' + admin.value);
		
		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				console.log('user just got inserted');
				//const response = JSON.parse(this.responseText);
			}
		}
		
		location.reload();
		myForm.lastElementChild.classList.remove('show');
	}
	
	function verifyOperation(){
		if(operation == 0){
			return;
		}else if(operation == 1){
			console.log('running updateUser');
			myForm.addEventListener('submit', updateDb);
		}else if(operation == 2){
			console.log('running addNewUser');
			myForm.addEventListener('submit', insertDb);
		}
	}
	
	function clearInputs(){
		id.value = '';
		user.value = '';
		pass.value = '';
		mail.value = '';
		admin.value = '';
	}
	
	function loadPages(){
		let userCount = getUserCount();
		const contentAmount = this.value;
		const pagesToLoad = Math.ceil(userCount / contentAmount);
		
		console.log(userCount);
		console.log(pagesToLoad);
	}
	
	function getUserCount(){
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'actions.php?page=getUserCount', true);
		xhr.send();
		
		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const response = parseInt(JSON.parse(this.responseText)[0]['count']);
				console.log(response);
				
				return response;
			}
		}
	}
}