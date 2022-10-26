// Global Variables
const frontendURL = window.location.origin;
const backendURL = "http://localhost:3001";
// Buttons
const logoutBtn = document.getElementById("logout-btn");
const newHabitBtn = document.querySelector(".new-habit-btn");
const cancelHabit = document.querySelector(".cancel-habit");
// Form
const newHabitForm = document.querySelector(".new-habit-form");
// Event Listeners
// form
newHabitForm.addEventListener("submit", AddNewHabit);
// buttons
logoutBtn.addEventListener("click", logout);
newHabitBtn.addEventListener(
	"click",
	() => (newHabitForm.style.display = "flex")
);
cancelHabit.addEventListener(
	"click",
	() => (newHabitForm.style.display = "none")
);

function logout() {
	// Clear local Storage
	window.localStorage.clear();
	// Logout User & Change to Login Page
	window.location = `${frontendURL}/client/index.html`;
}

function AddNewHabit(e) {
	e.preventDefault();
	console.log("test");
	// TODO Send API To Add New Habit

	// TODO Refresh Page
}

function loadUserHabits() {
	// TODO Get User Habits on Load
	// TODO APPLY TO DOM
}
