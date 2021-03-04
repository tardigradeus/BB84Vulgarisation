// Variable global pour l'animation du protocole
var run = false;

var nbrPhoton = 20;

// Boutton start 
document.querySelector('.start').onclick = async function(){
	run = true;
	
	
	
	
	//On génère la suite aléatoire de bit pour Alice
	let k = '';
	//On génère la base d'encodage d'alice
	let aBases = '';
	
	// On récupère la base et la réinitialise
	let aBasesHTML = document.getElementById("ABases");
	while (aBasesHTML.lastElementChild) {
		aBasesHTML.removeChild(aBasesHTML.lastElementChild);
	}
	
	// On récupère les photon polarisé et on réinitialise
	let aPhotonPolarizedHTML = document.getElementById("APolarized");
	while (aPhotonPolarizedHTML.lastElementChild) {
		aPhotonPolarizedHTML.removeChild(aPhotonPolarizedHTML.lastElementChild);
	}
	
	for (let i = 0; i < nbrPhoton; i++) {
		// On remplit la suite K 
		k += randomIntFromInterval(0,1);
		
		// On remplit la base
		aBase = randomIntFromInterval(0,1);
		aBases += aBase;
		
		// On créer notre base
		let baseIMG = document.createElement('img');
		if(aBase == 1) {
			baseIMG.src = "img/DiagArrowsCross.svg";
		} else {
			baseIMG.src = "img/RectArrowsCross.svg";
		}
		
		baseIMG.classList.add("base");
		aBasesHTML.appendChild(baseIMG);
	}
	document.getElementById("nbr").value = k;
	
	// On encode Chaque Element de K en photon polarisé
	let kArray = Array.from(k); 
	let baseArray =  Array.from(aBases); 
	for (let i = 0; i < kArray.length ; i++){
		// On créer notre photon polarisé
		let polarizedIMG = document.createElement('img');
		
		// Si la base est 1 on utilisera la base diagonal
		if(baseArray[i] == 1) {
			// Si la valeur du Bit dans la chaine K est 1 alors on utilisera la diagonal Gauche
			if(kArray[i] == 1) {
				polarizedIMG.src = "img/LeftDiagArrow.svg";
			// Sinon on utilisera la diagonal droite
			} else {
				polarizedIMG.src = "img/RightDiagArrow.svg";
			}
		// Sinon on utilisera la base horizontal
		} else {
			// Si la valeur du Bit dans la chaine K est 1 alors on utilisera la vertical
			if(kArray[i] == 1) {
				polarizedIMG.src = "img/VerticalArrow.svg";
			// Sinon on utilisera l'horizontal
			} else {
				polarizedIMG.src = "img/HorizontalArrow.svg";
			}
		}
		
		polarizedIMG.classList.add("photon");
		aPhotonPolarizedHTML.appendChild(polarizedIMG);
	}
}