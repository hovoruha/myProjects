(() => {
	
	// let operation = 0;
	let marker = localStorage.getItem('mk');
	let uid = localStorage.getItem('uid');
	const app = document.getElementById('app');
	
	// loadPage1();
	
	if(marker == 0){
		loadMain();
	}else if(marker == 1){
		loadPage1();	
	}else if(marker == 2){
		loadPage2();
	}else if(marker == 3){
		loadPage3();
	}else{
		loadMain();
	}
	
})();