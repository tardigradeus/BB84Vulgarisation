

// On créer un point de façon aléatoire sur le canvas donné en paramètre
function createDot(canvas) {
	
	let ctx = canvas.getContext('2d');
	
	var arrival = getRandomArrival();
	
	// Création d'un point sur le canvas au coordonées x,y
	function drawDot(x, y){
		ctx.beginPath();
		ctx.arc(x, y, 0.5, 2, 0.25 * Math.PI);
		ctx.fillStyle = "#FFFFFF";
		ctx.fill();
		ctx.strokeStyle = "#FFFFFF";
		ctx.stroke();
	}
	// On créer un point de façon aléatoire sur les coordonnées du canvas d'arrivé
	drawDot(randomIntFromInterval(arrival.val*canvas.width/arrival.max, arrival.val*canvas.width/arrival.max + canvas.width/arrival.max),randomIntFromInterval(0,canvas.height));
}

// On randomize l'arrivé d'un photon sur une partie de notre résultat
function getRandomArrival(){
	var num=Math.random();
	var i = 0;
	if(num < 0.01) i = 0;  //probability 0.01
	else if(num < 0.31) i = 1; // probability 0.30
	else if(num < 0.32) i = 2; //probability 0.01
	else if(num < 0.68) i = 3; //probability 0.36
	else if(num < 0.69) i = 4; //probability 0.01
	else if(num < 0.99) i = 5; //probability 0.30
	else i = 6;  //probability 0.01
	
	return {max: 7, val: i};
}

async function animeElectron(delay){ 


	// On récupère les infos de l'image du cannon à électron
	let cannon = document.getElementById("cannon");
	let cannonCoo = getElementTopLeft("cannon");
	
	// On créer notre électron
	let elec = document.createElement('div');
	
	elec.setAttribute("id","electron");
	elec.style.position = 'absolute';
	elec.style.top = cannonCoo.top + cannon.height/(2.25) + "px";
	elec.style.left = cannonCoo.left + cannon.width/2 + "px";
	
	document.body.appendChild(elec);
	
	let fenteCoo = getElementTopLeft("fente");

	// On fait l'animation de l'électron
	anime({
	  targets: elec,
	  translateX: (fenteCoo.left - cannonCoo.left),
	  easing: 'easeInOutSine',
	  duration: 200
	});
	await sleep(250);
	elec.remove();
}

// Variable global pour l'animation des fentes de young
var run = false;

// Boutton start 
document.querySelector('.create-dote').onclick = async function(){
	run = true;
	// Nombre de point à créer si vide un seul point
	var nbr = parseInt(document.getElementById("nbr").value);
	console.log(document.getElementById("nbr").value);
	nbr = isNaN(nbr) ? 1 : nbr;

	
	// Delay entre chaque point si vide pas de délais
	var delay = parseInt(document.getElementById("delay").value);
	delay = isNaN(delay) ? 0 : delay;
	console.log("création de " + nbr + " points avec un délais de " + delay);
	
	
	let canvas = document.getElementById("canvas")
	// Création de chaque points sur le canvas récupéré
	for (let i = 0; i < nbr && run; i++) {
		// on fait une animation si il y a un delais positif
		if (delay > 0)
			animeElectron(delay);
		
		// on créer le point sur le canvas
		createDot(canvas);
		
		// on attend un certain délai entre deux création de point si celui-ci est positif
		if (delay > 0)
			await sleep(delay);
	}
}

// Boutton stop
document.querySelector('.stop').onclick = function() {
	run = false;
	console.log("Stop");
}

// Boutton clear
document.querySelector('.clear').onclick = function() {
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	console.log("Clear");
}


