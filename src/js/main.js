function fromMain(){
	
	const btn1 = document.getElementById('btn1');
	const btn2 = document.getElementById('btn2');
	const btn3 = document.getElementById('btn3');
	
	btn1.addEventListener('click', loadPage1);
	btn2.addEventListener('click', loadPage2);
	btn3.addEventListener('click', loadPage3);
	
}