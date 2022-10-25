// Global Variables
const frontendURL = window.location.origin;
const backendURL = "http://localhost:3001";

// Buttons
const IncrementCurrent = document.querySelector(".increment-habit-btn");
const deleteHabit = document.querySelector(".remove-habit-btn");
const backBtn = document.querySelector(".back-btn");
// Event Listeners
IncrementCurrent.addEventListener("click", incrementCurrent);
deleteHabit.addEventListener("click", removeHabit);
backBtn.addEventListener(
	"click",
	() => (window.location = `${frontendURL}/client/account.html`)
);

// Functions
async function incrementCurrent() {
	console.log("Increment Current");
	// TODO ADD API Request to increment current counter
	try {
		// Refresh page
		location.reload();
	} catch (error) {
		console.log(error);
	}
}

async function removeHabit() {
	console.log("Remove Habit");
	// ! TODO DELETE API Request
	try {
		// Delete Habit
		// Go back to account Overview Page
		window.location = `${frontendURL}/client/account.html`;
	} catch (error) {
		console.log(error);
	}
}

async function loadHabitData() {
	console.log("Loading Data");
	try {
		// Get Data
		try {
			const res = await fetch(
				`${backendURL}/habits/getOne/6356c19b8e90960b59e33798`
			);
			const data = await res.json();

			console.log(data);
		} catch (error) {
			console.log(error);
		}

		// Get DOM Elements

		// Update DOM Elements to match data
	} catch (error) {}
}

loadHabitData();
