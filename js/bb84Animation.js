// Variable global pour l'animation du protocole
var run = false;

var nbrPhoton = 5;

var eve = false;

var delay = true;

function EveHere(){
	var eveHtml = document.getElementById("eve");
	var bobHtml = document.getElementById("bob");
	// on cache Eve
	if(eve) {
		eveHtml.style.display='none';
		eve = false;		
		
		bob.style.marginTop ="500px";

	// on montre eve	
	} else {
		eveHtml.style.display='block';
		eveHtml.style.marginTop ="122px";
		eve = true;
		
		bob.style.marginTop ="122px";
	}
	cleanHtml();
}

// On bloque le bouton start et le checked element
function blockHtml(){
	document.getElementById("EveHere").disabled = true;
	document.getElementById("delay").disabled = false;
	document.querySelectorAll('.start').forEach(elem => {
	  elem.disabled = true;
	});
}

// On remet disponible les bouton et le checked element
function freeHtml(){
	document.getElementById("EveHere").disabled = false;
	document.getElementById("delay").disabled = false;
	document.querySelectorAll('.start').forEach(elem => {
	  elem.disabled = false;
	});
}

// On nettoie toute notre animation pour repartir avec quelquechose de propre
function cleanHtml(){
	let toclean = document.querySelectorAll('.cleaneable');
	for(let i = 0 ; i < toclean.length ; i++){
		let clean = toclean[i];
		while (clean.lastElementChild) {
			clean.removeChild(clean.lastElementChild);
		}
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

// On décode la suite de photon reçu par alice (selon la base de bob ou d'Eve) on créer ensuite les photons en leurs donnant une classe spécifiant si la lecture est bonne ou mauvaises
function decode(k,abase,base,decodeHTML){
	
	// On créer notre photon polarisé
	let polarizedIMG = document.createElement('img');
	
	// On créer l'objet de retour pour nous permettre de savoir ou il y à eu des bons et des mauvaise utilisations
	  var ret = {
		bitval:  0,
		type: ''
	  };
	
	
	// Si c'est la bonne base qui est utilisé alors on décode la bonne valeur du photon
	if(abase == base) {
		polarizedIMG.classList.add("good");
		
		ret.type = 'good';
		ret.bitval = k;
	// La base utilisé est mauvaises du coup le résultat sera aléatoire
	} else {
		polarizedIMG.classList.add("bad");
		k = randomIntFromInterval(0,1);
		
		ret.type = 'bad';
		ret.bitval = k;
	}
	// Si la base est 1 on utilisera la base diagonal
	if(base == 1) {
		// Si la valeur du Bit dans la chaine K est 1 alors le photon sera polarisé en diagonal Gauche
		if(k == 1) {
			polarizedIMG.src = "img/LeftDiagArrow.svg";
			polarizedIMG.classList.add("leftDiag");
		// Sinon le photon sera polarisé en diagonal droite
		} else {
			polarizedIMG.src = "img/RightDiagArrow.svg";
			polarizedIMG.classList.add("rightDiag");
		}
	// Sinon on utilisera la base horizontal
	} else {
		// Si la valeur du Bit dans la chaine K est 1 alors le photon sera polarisé a la vertical
		if(k == 1) {
			polarizedIMG.src = "img/VerticalArrow.svg";
			polarizedIMG.classList.add("vert");
		// Sinon le photon sera polarisé à l'horizontal
		} else {
			polarizedIMG.src = "img/HorizontalArrow.svg";
			polarizedIMG.classList.add("hori");
		}
	}
	polarizedIMG.classList.add("decode");
	decodeHTML.appendChild(polarizedIMG);
	
	// On retourne la valeur de notre bit lu
	return ret;
}

// Bob décode ce que lui envois eve à partir de ce qu'elle même a recu d'alice
function decodeFromEve(k,decodeEve,aBase,eBase,bBase,decodeHTML){
	
	// On créer notre photon polarisé
	let polarizedIMG = document.createElement('img');
	
	// On créer l'objet de retour pour nous permettre de savoir ou il y à eu des bons et des mauvaise utilisations
	var ret = {
		bitval:  0,
		type: ''
	 };
	
	
	
	// Si c'est la bonne base qui est utilisé par tout le monde alors bob obtient tout le monde à une partie de la clé final
	if(aBase == eBase && eBase == bBase) {
		polarizedIMG.classList.add("good");
		
		ret.type = 'good';
		ret.bitval = decodeEve;
	
	// La base utilisé par eve était la bonne mais bob n'a pas eu la même base que eve et du coup n'a pas la même base qu'alice il obtient donc un résulat aléatoire
	} else if(aBase == eBase && eBase != bBase) {
		polarizedIMG.classList.add("bad");
		decodeEve = randomIntFromInterval(0,1);
		
		ret.type = 'bad';
		ret.bitval = decodeEve;
	
	// La base utilisé par eve n'était pas la bonne et bob à utilisé la même base que eve il obtient donc le même résultat que eve
	} else if (aBase != eBase && eBase == bBase) {
		polarizedIMG.classList.add("bad");
		
		ret.type = 'bad';
		ret.bitval = decodeEve;
		
	// La base utilisé par eve n'est pas la bonne et bob n'a pas utilisé la même base qu'eve (il a donc la bonne base par rapport à alice) dans ce cas eve à une chance sur deux d'avoir introduit une erreur et donc d'être détecté
	} else if (aBase != eBase && eBase != bBase) {
		decodeEve = randomIntFromInterval(0,1);
		// Eve a introduit une erreur et peut ce faire repérer 
		if(decodeEve != k) {
			polarizedIMG.classList.add("error");
			
			ret.type = 'error';
			ret.bitval = decodeEve;
			
		// Eve a introduit une erreur mais ne peut pas ce faire repérer 
		} else {
			polarizedIMG.classList.add("good");
			
			ret.type = 'good';
			ret.bitval = decodeEve;
		}
	}
	
	
	// Si la base de bob est 1 on utilisera la base diagonal
	if(bBase == 1) {
		// Si la valeur du bit reçu de eve est 1 alors le photon sera polarisé en diagonal Gauche
		if(decodeEve == 1) {
			polarizedIMG.src = "img/LeftDiagArrow.svg";
			polarizedIMG.classList.add("leftDiag");
		// Sinon le photon sera polarisé en diagonal droite
		} else {
			polarizedIMG.src = "img/RightDiagArrow.svg";
			polarizedIMG.classList.add("rightDiag");
		}
	// Sinon on utilisera la base horizontal
	} else {
		// Si la valeur dubit reçu de eve est 1 alors le photon sera polarisé a la vertical
		if(decodeEve == 1) {
			polarizedIMG.src = "img/VerticalArrow.svg";
			polarizedIMG.classList.add("vert");
		// Sinon le photon sera polarisé à l'horizontal
		} else {
			polarizedIMG.src = "img/HorizontalArrow.svg";
			polarizedIMG.classList.add("hori");
		}
	}
	polarizedIMG.classList.add("decode");
	decodeHTML.appendChild(polarizedIMG);
	
	return ret;
}

// Boutton start 
document.querySelector('.start').onclick = async function(){
	blockHtml();
	var nbr = parseInt(document.getElementById("nbr").value);
	console.log(document.getElementById("nbr").value);
	nbrPhoton = nbr > 0 ? nbr : 1;
	
	eve = document.getElementById("EveHere").checked ;
	delay = document.getElementById("delay").checked ;
	
	run = true;
	// suite aléatoire de bit pour Alice
	let k = '';
	// base d'encodage d'Alice
	let aBases = '';
	
	// base de décodage pour Bob
	let bBases = '';
	
	// base de décodage d'Eve
	let eBases = '';
	
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
		
		// On remplit la base d'eve
		eBases += randomIntFromInterval(0,1);
	}
		
		
	// On donne la liste des bit à encoder et la liste des bases utilisées ainsi que la localisation html ou il faut placer les éléments
	encodePhoton(Array.from(k),Array.from(aBases),document.getElementById("APolarized"));

	if(delay)
		await sleep(1000);

	// On récupère la liste de nos photon polarisé en DOM HTML et on les animes
	let alicePhotonHTML = document.querySelectorAll('.photon');
	// Toute les valeurs qui ont été décodé
	let valDecoded = [];
	
	// s'il n'y a pas Eve dans le système on anime pour Alice vers Bob directement
	if(!eve){
		for (let i = 0; i < alicePhotonHTML.length; i++) {
			
			// On fait l'animation du photonj d'alice a bob
			if(delay) {
				anime({
				  targets: alicePhotonHTML[i],
				  translateY: 700,
				  easing: 'easeInOutSine',
				  duration: 500
				});
				await sleep(650);
			}
			
			// On créer une case vide dans l'html qui correspond à la réception d'un photon dans l'animation
			createPhoton(alicePhotonHTML[i],document.getElementById("BPhoton"));
			
			// On créer la base html pour bob du photon qui viens d'arriver 
			createBase(bBases[i],document.getElementById("BBases"));
			// On créer le décodage html du photon de bob
			valDecoded.push(decode(k[i],aBases[i],bBases[i],document.getElementById("BDecode")));
		}
	// Animation avec Eve au milieux entre Alice et Bob
	} else {
		let decodeEve = '';
		for (let i = 0; i < alicePhotonHTML.length; i++) {
			
			// On fait l'animation du photon d'alice a eve
			if(delay) {
				anime({
				  targets: alicePhotonHTML[i],
				  translateY: 325,
				  easing: 'easeInOutSine',
				  duration: 500
				});
				await sleep(650);
			}				
			// On créer une case dans l'html qui correspond à la réception d'un photon après l'animation
			createPhoton(alicePhotonHTML[i],document.getElementById("EPhoton"));
			
			// On créer la base html pour Eve du photon qui viens d'arriver 
			createBase(eBases[i],document.getElementById("EBases"));
			
			// On créer le décodage html du photon de Eve
			decodeEve += decode(k[i],aBases[i],eBases[i],document.getElementById("EDecode")).bitval;	
		}
		if(delay)
			await sleep(1000);
		
		// On récupère la liste des photon décodé par Eve en DOM HTML et on les envois à bob
		let evePhotonHTML = document.querySelectorAll('.decode');
		for (let i = 0; i < evePhotonHTML.length; i++) {
			// On fait l'animation du photon d'eve a bob
			if(delay) {
				anime({
				  targets: evePhotonHTML[i],
				  translateY: 325,
				  easing: 'easeInOutSine',
				  duration: 500
				});
				await sleep(650);
			}
			// On créer une case dans l'html qui correspond à la réception d'un photon après l'animation
			createPhoton(evePhotonHTML[i],document.getElementById("BPhoton"));
			
			// On créer la base html pour Bob du photon qui viens d'arriver 
			createBase(bBases[i],document.getElementById("BBases"));
			
			// On créer le décodage html du photon reçu par Eve
			valDecoded.push(decodeFromEve(k[i],decodeEve[i],aBases[i],eBases[i],bBases[i],document.getElementById("BDecode")));	
		}
	}
	
	
	// On créer la séquence de bit d'alice et de Bob en fonction des retours qui a pour objet {bitval: 0|1, type: 'good'|'bad'|'error'}
	let aliceBits = document.getElementById("aliceBitSequence");
	let bobKeyBits = document.getElementById("bobBitSequence");
	
	for (let i = 0; i < valDecoded.length; i++){
		// Si dans les valeur reçu on a good ou error alors le resultat fait partie de la séquence de bit
		if (valDecoded[i].type != "bad") {
			let aliceBitHTML = document.createElement('img');
			let bobBitHTML = document.createElement('img');
		
			aliceBitHTML.src = "img/" + k[i] + ".svg";
			bobBitHTML.src   = "img/" + valDecoded[i].bitval + ".svg";
			
			if (valDecoded[i].type == "error") {
				bobBitHTML.classList.add("error");
			}
			//aliceBitHTML.classList.add("kGenerated");
			aliceBits.appendChild(aliceBitHTML);
			bobKeyBits.appendChild(bobBitHTML);
		}
	}
	
	
	freeHtml();
}
