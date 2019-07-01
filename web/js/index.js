function updatePreview() {
	var preview = new Parchis("preview", {
		nb_players: parseInt(document.getElementById("playersNumber").value),
		nb_tokens: 4,
		nb_cells: parseInt(document.getElementById("playerTiles").value),
		nb_promotion_cells: parseInt(document.getElementById("finalTiles").value),
		nb_bridge: 3,
		initial_cell: 6,
		secure_cells: document.getElementById("safeTiles").value.split(/\s+/).map(function (x) { return parseInt(x); }),
		size: 500
	});
	preview.draw();
}

function mainMenuOptions(option) {
	switch (option) {
		case 0:
			document.getElementById("createRoomMenu").removeAttribute("hidden");
			document.getElementById("searchRoomMenu").setAttribute("hidden", true);
			break;
		case 1:
			document.getElementById("createRoomMenu").setAttribute("hidden", true);
			document.getElementById("searchRoomMenu").removeAttribute("hidden");
			break;
		default:
			console.error("Invalid option...");
	}
}

function login() {
	if (document.getElementById("nickNameLogin").value == "" && document.getElementById("passwordLogin").value == "") {
		document.getElementById("wrongLogin").setAttribute("hidden", true);
		document.getElementById("preLogin").setAttribute("hidden", true);
		document.getElementById("postLogin").removeAttribute("hidden");
	} else {
		document.getElementById("wrongLogin").removeAttribute("hidden");
	}
}

function logout() {
	document.getElementById("postLogin").setAttribute("hidden", true);
	document.getElementById("preLogin").removeAttribute("hidden");
}

function signUp() {
	var user = document.getElementById("signupNickname").value;
	var email = document.getElementById("signupEmail").value;
	var pass1 = document.getElementById("signupPassword").value;
	var pass2 = document.getElementById("repeatPassword").value;
	if (pass1 != pass2) {
		document.getElementById("diferentPassword").removeAttribute("hidden");
		return;
	} else {
		document.getElementById("diferentPassword").setAttribute("hidden", true);
	}
	if (/*email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/g)*/2 == null) {
		document.getElementById("invalidEmail").removeAttribute("hidden");
		return;
	} else {
		document.getElementById("invalidEmail").setAttribute("hidden", true);
	}
	if (checkUser(user)) {
		document.getElementById("nickNameTaken").removeAttribute("hidden");
		return;
	} else {
		document.getElementById("nickNameTaken").setAttribute("hidden", true);
	}
	document.getElementById("signupMenu").setAttribute("hidden", true);
	document.getElementById("verificationEmail").removeAttribute("hidden");
}

function checkUser() {
	return false;
}

function sendEmail() {

}