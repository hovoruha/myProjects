function fromPage1(){
	
	const myFlowers = [
	{img: "flower1.jpg"},
	{img: "flower2.jpg"},
	{img: "flower3.jpg"},
	{img: "flower4.jpg"},
	{img: "flower5.jpg"}
	]

	const flowerPath = 'assets/img/';
	let optIndex = myFlowers.length;
	
	const opVal = document.getElementById('myDrops');
	opVal.addEventListener('change', assignValue);
	
	const returnToMain = document.getElementById('back');
	returnToMain.addEventListener('click', loadMain);

	function displayFlowers(){
		const vase = document.getElementById('btns');
		let limit = optIndex;
		vase.innerHTML = '';	
		
		for(var i=0; i < limit; i++){
			vase.innerHTML +=
			
			'<div class="btn">' +
				'<img src=' + flowerPath + myFlowers[i].img + '>' +
				'<div class="title">' + myFlowers[i].img + '</div>' +
			'</div>'
		}
	}
	displayFlowers();

	function populateDrop(){
		let count = 1;
		const myDrops = document.getElementById('myDrops');
		const lim = myFlowers.length;
		
		while(count <= lim){
			myDrops.innerHTML +=
			
			'<option class="op" value=' + count + '>' + count + '</option>';
			count++;
		}
		myDrops.lastChild.setAttribute('selected', true);
	}
	populateDrop();

	function assignValue(){
		optIndex = this.value;
		displayFlowers();
	}

}