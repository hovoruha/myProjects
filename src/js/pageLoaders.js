//load parameters declaration____________________
const mainParams = {
	method: 'GET',
	htmlPath: 'src/html/main.html',
	containerId: app,
	runtimeFunc: runtimeMain,
	scriptFunc: fromMain,
	storageKey: 'mk',
	storageVal: 0
}

const page1Params = {
	method: 'GET',
	htmlPath: 'src/html/page1.html',
	containerId: app,
	runtimeFunc: runtimePage1,
	scriptFunc: fromPage1,
	storageKey: 'mk',
	storageVal: 1
}

const page2Params = {
	method: 'GET',
	htmlPath: 'src/html/page2.html',
	containerId: app,
	runtimeFunc: runtimePage2,
	scriptFunc: fromPage2,
	storageKey: 'mk',
	storageVal: 2
}

const page3Params = {
	method: 'GET',
	htmlPath: 'src/html/page3.html',
	containerId: app,
	runtimeFunc: runtimePage3,
	scriptFunc: fromPage3,
	storageKey: 'mk',
	storageVal: 3
}
//_______________________________________________

//assign page loaders____________________________

const loadMain = () => htmlLoader(mainParams);

const loadPage1 = () => htmlLoader(page1Params);

const loadPage2 = () => htmlLoader(page2Params);

const loadPage3 = () => htmlLoader(page3Params);

//_______________________________________________

//page runtimes__________________________________
function runtimeMain(){
	console.log('rulez la runtime Main...');
}

function runtimePage1(){
	console.log('rulez la runtime Page1...');
}

function runtimePage2(){
	console.log('rulez la runtime Page2...');
}

function runtimePage3(){
	console.log('rulez la runtime Page3...');
	
	const myTable = document.getElementById('table-body');
	const id = document.getElementById('id');
	const user = document.getElementById('user');
	const pass = document.getElementById('pass');
	const mail = document.getElementById('mail');
	const admin = document.getElementById('admin');
	
	loadUsers();
	
	function loadUsers(){
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "actions.php", true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send('page=loadusers');
		
		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const result = JSON.parse(this.responseText);
				
				for (i in result){
					myTable.innerHTML +=
					
					// '<tr>' +
					// '<td><a class="lnk" href=actions.php?page=seluser&id=' + result[i].id + '>' + '<i class="far fa-edit"></i>' + result[i].id + '</a></td>' +
					// '<td>' + result[i].username + '</td>' +
					// '<td>' + result[i].password + '</td>' +
					// '<td>' + result[i].email + '</td>' +
					// '<td>' + result[i].admin + '</td>' +
					// '</tr>'
					
					'<tr>' +
					'<td><div class="edit"><i class="far fa-edit"></i><div class="lnk">' + result[i].id + '</div></div></td>' +
					'<td>' + result[i].username + '</td>' +
					'<td>' + result[i].password + '</td>' +
					'<td>' + result[i].email + '</td>' +
					'<td>' + result[i].admin + '</td>' +
					'</tr>'
				}
				
				// const links = document.querySelectorAll('div.lnk');
				const links = document.querySelectorAll('div.edit');
				
				links.forEach((link) => {
					link.addEventListener('click', openLink);
				});
			}
		}
	}
	
	function openLink(){
		//e.preventDefault();
		localStorage.setItem('uid', this.lastChild.innerHTML);
		
		const uid = localStorage.getItem('uid');
		const xhp = new XMLHttpRequest();
		xhp.open('POST', 'actions.php', true);
		xhp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhp.send('page=seluser' + '&id=' + uid);
		
		xhp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				const response = JSON.parse(this.responseText);
				console.log(response);
				
				id.value = response[0].id;
				user.value = response[0].username;
				pass.value = response[0].password;
				mail.value = response[0].email;
				admin.value = response[0].admin;
			}
		}
	}
	
}
//_______________________________________________

//main loader funcion____________________________
function htmlLoader (params){
	
	const xhr = new XMLHttpRequest();
	xhr.open(params.method, params.htmlPath, true);
	xhr.send();
	
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			params.containerId.innerHTML = this.responseText;
			(() => {
				params.runtimeFunc();
			})();
			
			params.scriptFunc();
		}
	}
	localStorage.setItem(params.storageKey, params.storageVal);
}
//_______________________________________________