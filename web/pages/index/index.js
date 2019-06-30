function updatePreview() {
	var preview = new Parchis("preview", {
		nb_players: parseInt(document.getElementById("jugadores").value),
		nb_tokens: 4,
		nb_cells: parseInt(document.getElementById("celdas").value),
		nb_promotion_cells: parseInt(document.getElementById("llegada").value),
		nb_bridge: 3,
		initial_cell: 6,
		secure_cells: document.getElementById("seguras").value.split(/\s+/).map(function(x){ return parseInt(x); }),
		size: 500
	});
	preview.draw();
}

function mainMenuOptions(option) {
	switch(option) {
		case 0:
			document.getElementById("menuCrearSala").removeAttribute("hidden");
			document.getElementById("menuBuscarSala").setAttribute("hidden",true);
			break;
		case 1:
		document.getElementById("menuCrearSala").setAttribute("hidden",true);
		document.getElementById("menuBuscarSala").removeAttribute("hidden");
		break;
		default:
			console.error("Invalid option...");
	}
}

function login() {
	document.getElementById("preLogin").setAttribute("hidden",true);
	document.getElementById("postLogin").removeAttribute("hidden");
}

function logout() {
	document.getElementById("postLogin").setAttribute("hidden",true);
	document.getElementById("preLogin").removeAttribute("hidden");
}

function registro() {
	var user = document.getElementById("usuarioRegistro").value;
	var email = document.getElementById("emailRegistro").value;
	var pass1 = document.getElementById("passwordRegistro1").value;
	var pass2 = document.getElementById("passwordRegistro2").value;
	if(pass1 != pass2) {
		document.getElementById("passDiferente").removeAttribute("hidden");
		return;
	} else {
		document.getElementById("passDiferente").setAttribute("hidden",true);
	}
	if(/*email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/g)*/2 == null) {
		document.getElementById("emailInvalido").removeAttribute("hidden");
		return;
	} else {
		document.getElementById("emailInvalido").setAttribute("hidden",true);
	}
	if(userExistente(user)) {
		document.getElementById("emailInvalido").removeAttribute("hidden");
		return;
	} else {
		document.getElementById("emailInvalido").setAttribute("hidden",true);
	}
	document.getElementById("menuRegistro").setAttribute("hidden",true);
	document.getElementById("emailVerificacion").removeAttribute("hidden");
}

function userExistente() {
	return false;
}

function sendEmail() {

}