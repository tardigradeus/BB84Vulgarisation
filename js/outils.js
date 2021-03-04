// Fonction random entre 2 valeurs incluses
function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fonction sleep synchrone
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Validation pour int dans un champs html
function validate(evt) {
	var theEvent = evt || window.event;

	// Handle paste
	if (theEvent.type === 'paste') {
		key = event.clipboardData.getData('text/plain');
	} else {
	// Handle key press
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
	}
	var regex = /[0-9]/;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

// Envoi les coordonnées d'un objet par id
function getElementTopLeft(id) {

    var ele = document.getElementById(id);
    var top = 0;
    var left = 0;
   
    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }
   
    return { top: top, left: left };
   
}