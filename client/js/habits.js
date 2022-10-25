// Global Variables
const frontendURL = window.location.origin;
const backendURL = "http://localhost:3001";
// Buttons
const logoutBtn = document.getElementById("logout-btn");
// Form

// Event Listeners
logoutBtn.addEventListener("click", logout);

function logout() {
	window.localStorage.clear();
	// Logout User & Change to Login Page
	window.location = `${frontendURL}/client/index.html`;
}
