// Variable global pour l'animation du protocole
var run = false;

var nbrPhoton = 5;

var eve = false;

function EveHere(){
	var eveHtml = document.getElementById("eve");
	var bobHtml = document.getElementById("bob");
	// on cache Eve
	if(eve) {
		eveHtml.style.display='none';
		bob.style.marginTop ="500px";
		eve = false;
	// on montre eve	
	} else {
		eveHtml.style.display='block';
		bob.style.marginTop ="244px";
		eve = true;
	}
	cleanHtml();
}

// On bloque le bouton start et le checked element
function blockHtml(){
	document.getElementById("EveHere").disabled = true;
	document.querySelectorAll('.start').forEach(elem => {
	  elem.disabled = true;
	});
}

// On remet disponible les bouton et le checked element
function freeHtml(){
	document.getElementById("EveHere").disabled = false;
	document.querySelectorAll('.start').forEach(elem => {
	  elem.disabled = false;
	});
}

// On nettoie toute notre animation pour repartir avec quelquechose de propre
function cleanHtml(){
	// On récupère la chaine k d'alice et la réinitialise
	let kGenerated = document.getElementById("k");
	while (kGenerated.lastElementChild) {
		kGenerated.removeChild(kGenerated.lastElementChild);
	}
	
	// On récupère la base d'alice et la réinitialise
	let aBasesHTML = document.getElementById("ABases");
	while (aBasesHTML.lastElementChild) {
		aBasesHTML.removeChild(aBasesHTML.lastElementChild);
	}
	
	// On récupère la base de Bob et la réinitialise
	let bBasesHTML = document.getElementById("BBases");
	while (bBasesHTML.lastElementChild) {
		bBasesHTML.removeChild(bBasesHTML.lastElementChild);
	}
	
	// On récupère les photon polarisé par alice et on réinitialise
	let aPhotonPolarizedHTML = document.getElementById("APolarized");
	while (aPhotonPolarizedHTML.lastElementChild) {
		aPhotonPolarizedHTML.removeChild(aPhotonPolarizedHTML.lastElementChild);
	}
	
	// On récupère les photon décodé par bob et on réinitialise
	let bPhotonDecoded = document.getElementById("BDecode");
	while (bPhotonDecoded.lastElementChild) {
		bPhotonDecoded.removeChild(bPhotonDecoded.lastElementChild);
	}
	
	// On récupère les photon recu par bob
	let bPhoton = document.getElementById("BPhoton");
	while (bPhoton.lastElementChild) {
		bPhoton.removeChild(bPhoton.lastElementChild);
	}
	
}

function encodePhoton(kArray,baseArray,PhotonPolarizedHTML){
	for (let i = 0; i < kArray.length ; i++){
		// On créer notre photon polarisé
		let polarizedIMG = document.createElement('img');
		
		// Si la base est 1 on utilisera la base diagonal
		if(baseArray[i] == 1) {
			// Si la valeur du Bit dans la chaine K est 1 alors on utilisera la diagonal Gauche
			if(kArray[i] == 1) {
				polarizedIMG.src = "img/LeftDiagArrow.svg";
				polarizedIMG.classList.add("leftDiag");
			// Sinon on utilisera la diagonal droite
			} else {
				polarizedIMG.src = "img/RightDiagArrow.svg";
				polarizedIMG.classList.add("rightDiag");
			}
		// Sinon on utilisera la base horizontal
		} else {
			// Si la valeur du Bit dans la chaine K est 1 alors on utilisera la vertical
			if(kArray[i] == 1) {
				polarizedIMG.src = "img/VerticalArrow.svg";
				polarizedIMG.classList.add("vert");
			// Sinon on utilisera l'horizontal
			} else {
				polarizedIMG.src = "img/HorizontalArrow.svg";
				polarizedIMG.classList.add("hori");
			}
		}
		
		polarizedIMG.classList.add("photon");
		PhotonPolarizedHTML.appendChild(polarizedIMG);
	}
}

function createBases(bases,baseHTML){
	
	for (let i = 0; i < bases.length; i++) {

		// On créer notre base
		let baseIMG = document.createElement('img');
		if(bases[i] == 1) {
			baseIMG.src = "img/DiagArrowsCross.svg";
		} else {
			baseIMG.src = "img/RectArrowsCross.svg";
		}
			baseIMG.classList.add("base");
			baseHTML.appendChild(baseIMG);
	}
}

function createBase(base,baseHTML){
		// On créer notre base
		let baseIMG = document.createElement('img');
		if(base == 1) {
			baseIMG.src = "img/DiagArrowsCross.svg";
		} else {
			baseIMG.src = "img/RectArrowsCross.svg";
		}
		baseIMG.classList.add("base");
		baseHTML.appendChild(baseIMG);
}

function createPhoton(photon,PhotonHTML){
	// On remove le parent de notre photon
	// photon.parentNode.removeChild(photon);
	
	photon.style = '';
	// photon.className = '';
	photon.classList.add("bobPhoton");
	PhotonHTML.appendChild(photon);
}

function decode(k,abase,bbase,decodeHTML){
	
	// On créer notre photon polarisé
	let polarizedIMG = document.createElement('img');
	
	// Si c'est la bonne base qui est utilisé par Bob alors il décodera la bonne valeurs
	if(abase == bbase) {
		polarizedIMG.classList.add("good");
	// Bob n'a pas utilisé le bon filtre alors il récupérera un résultat aléatoire
	} else {
		polarizedIMG.classList.add("bad");
		k = randomIntFromInterval(0,1);
	}
	// Si la base est 1 on utilisera la base diagonal
	if(bbase == 1) {
		// Si la valeur du Bit dans la chaine K est 1 alors on utilisera la diagonal Gauche
		if(k == 1) {
			polarizedIMG.src = "img/LeftDiagArrow.svg";
			polarizedIMG.classList.add("leftDiag");
		// Sinon on utilisera la diagonal droite
		} else {
			polarizedIMG.src = "img/RightDiagArrow.svg";
			polarizedIMG.classList.add("rightDiag");
		}
	// Sinon on utilisera la base horizontal
	} else {
		// Si la valeur du Bit dans la chaine K est 1 alors on utilisera la vertical
		if(k == 1) {
			polarizedIMG.src = "img/VerticalArrow.svg";
			polarizedIMG.classList.add("vert");
		// Sinon on utilisera l'horizontal
		} else {
			polarizedIMG.src = "img/HorizontalArrow.svg";
			polarizedIMG.classList.add("hori");
		}
	}
	polarizedIMG.classList.add("decode");
	decodeHTML.appendChild(polarizedIMG);
}

// Boutton start 
document.querySelector('.start').onclick = async function(){
	blockHtml();
	var nbr = parseInt(document.getElementById("nbr").value);
	console.log(document.getElementById("nbr").value);
	nbrPhoton = nbr > 0 ? nbr : 1;
	
	eve = document.getElementById("EveHere").checked ;
	
	
	run = true;
	// On génère la suite aléatoire de bit pour Alice
	let k = '';
	// On génère la base d'encodage d'alice
	let aBases = '';
	
	// On génère la base de décodage pour Bob
	let bBases = '';
	
	cleanHtml();
	
	for (let i = 0; i < nbrPhoton; i++) {
		
		kRandom = randomIntFromInterval(0,1);
		// On remplit la suite K 
		k += kRandom;
		
		let kHTML = document.createElement('img');
		kHTML.src = "img/" + kRandom + ".svg";
		kHTML.classList.add("kGenerated");
		document.getElementById("k").appendChild(kHTML);
		
		
		// On remplit la base d'alice
		aBase = randomIntFromInterval(0,1);
		aBases += aBase;
		// On remplit les base html d'alice
		createBase(aBase,document.getElementById("ABases"))
		
		
		// On remplit la base de bob
		bBases += randomIntFromInterval(0,1);
	}
		
	// On donne la liste des bit à encoder et la liste des base utilisées ainsi que la localisation html ou il faut placer les éléments
	encodePhoton(Array.from(k),Array.from(aBases),document.getElementById("APolarized"));


	// On récupère la liste de nos photon polarisé en DOM HTML et on les animes
	const alicePhotonHTML = document.querySelectorAll('.photon');
	
	// s'il n'y a pas Eve dans le système on anime pour Alice vers Bob directement
	if(!eve){
		for (let i = 0; i < alicePhotonHTML.length; i++) {
			// On fait l'animation de l'électron
			anime({
			  targets: alicePhotonHTML[i],
			  translateY: 700,
			  easing: 'easeInOutSine',
			  duration: 500
			});
			await sleep(650);
			
			// On créer une case vide dans l'html qui correspond à la réception d'un photon dans l'animation
			createPhoton(alicePhotonHTML[i],document.getElementById("BPhoton"));
			
			// On créer la base html pour bob du photon qui viens d'arriver 
			createBase(bBases[i],document.getElementById("BBases"));
			// On créer le décodage html du photon de bob
			decode(k[i],aBases[i],bBases[i],document.getElementById("BDecode"));
		}
	// Animation avec Eve au milieux entre Alice et Bob
	} else {
		console.log("Eve Animation");
	}
	freeHtml();
}
