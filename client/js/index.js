// Global Variables
const frontendURL = window.location.origin;
const backendURL = "https://monasteri.herokuapp.com";

// Forms
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
// Containers
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const incorrectContainer = document.querySelector(".incorrect-details");
// Buttons
const loginBtn = document.querySelector(".login-btn");
const registerBtn = document.querySelector(".register-btn");
const closeBtn = document.querySelector(".wrong");

// Event Listeners
// Forms
loginForm.addEventListener("submit", handleLogin);
registerForm.addEventListener("submit", handleRegister);
// Buttons
loginBtn.addEventListener("click", switchContainer);
registerBtn.addEventListener("click", switchContainer);
closeBtn.addEventListener(
	"click",
	() => (incorrectContainer.style.display = "none")
);

// Functions
async function handleLogin(e) {
	// Prevent Reload
	e.preventDefault();
	// Get Login details & remove whitespace
	const username = e.target.username.value.trim();
	const password = e.target.password.value.trim();
	// TODO Send Request below To Verify Login Details
	try {
		const res = await fetch(`${backendURL}/users/login`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		const data = await res.json();
		// Check Response Status
		if (res.status === 400) {
			return showError("Sorry but this Username does not exist.");
		} else if (res.status === 401) {
			return showError("Incorrect password, please try again.");
		} else if (res.status === 200) {
			//  Save to local Storage
			localStorage.setItem("session", data.accessToken);
			localStorage.setItem("habitsID", data.habitsID);
			localStorage.setItem("username", username);
			// Login User & Change to Account Overview Page
			window.location = `${frontendURL}/client/habitsNew.html`;
		}
	} catch (error) {
		console.log(error.message);
	}
}

async function handleRegister(e) {
	// Prevent Reload
	e.preventDefault();
	// Get Register details & remove whitespace
	const username = e.target.registerUsername.value.trim();
	const password = e.target.registerPassword.value.trim();
	const confirmPassword = e.target.confirmPassword.value.trim();
	// Check Username & Password
	if (!username || username.length < 5) {
		return showError("Username must be at least 5 characters.");
	} else if (password !== confirmPassword) {
		return showError("Passwords don't match. Please try again.");
	} else if (password.length < 8) {
		return showError("Passwords must be at least 8 characters.");
	}
	// POST Request TO Register New User
	try {
		const res = await fetch(`${backendURL}/users`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		if (res.status === 404) {
			return alert("Username already taken.");
		} else if (res.status === 201) {
			alert("Successfully registered, please login.");
			registerContainer.style.display = "none";
			loginContainer.style.display = "grid";
		}
	} catch (error) {
		console.log(error);
	}
}

function switchContainer(e) {
	const container = e.target.textContent;
	if (container === "Register") {
		// Switch To Register Form
		registerContainer.style.display = "grid";
		loginContainer.style.display = "none";
	} else {
		// Switch To Login Form
		registerContainer.style.display = "none";
		loginContainer.style.display = "grid";
	}
}

function showError(message) {
	// Get
	const messageBox = document.querySelector(".incorrect-message");

	messageBox.textContent = message;
	// Show
	incorrectContainer.style.display = "block";
}
