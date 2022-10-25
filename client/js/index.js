// Forms
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
// Containers
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
// Buttons
const loginBtn = document.querySelector(".login-btn");
const registerBtn = document.querySelector(".register-btn");

// Event Listeners
// Forms
loginForm.addEventListener("submit", handleLogin);
registerForm.addEventListener("submit", handleRegister);
// Buttons
loginBtn.addEventListener("click", switchContainer);
registerBtn.addEventListener("click", switchContainer);

// Functions
async function handleLogin(e) {
	// Prevent Reload
	e.preventDefault();
	// Get Login details & remove whitespace
	const username = e.target.username.value.trim();
	const password = e.target.password.value.trim();
	// ! Send Request below To Verify Login Details

	//  Save to local Storage

	/// Check Response Status

	// Save user to local Storage
	// ? localStorage.setItem("username", username);
	// Change to Account Overview Page
	window.location = `${window.location.origin}/client/account.html`;
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
		return alert("Username must be at least 5 characters.");
	} else if (password !== confirmPassword) {
		return alert("Passwords don't match. Please try again.");
	} else if (password.length < 8) {
		return alert("Passwords must be at least 8 characters.");
	}
	// ! Send POST Request TO Register New User Below
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
