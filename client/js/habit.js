// Buttons
const IncrementCurrent = document.querySelector(".increment-btn");
const deleteHabit = document.querySelector(".remove-btn");
const backBtn = document.querySelector(".back-btn");
// Event Listeners
IncrementCurrent.addEventListener("click", incrementCurrent);
deleteHabit.addEventListener("click", removeHabit);
backBtn.addEventListener(
	"click",
	() => (window.location = "http://127.0.0.1:5500/client/account.html")
);

// Functions
async function incrementCurrent() {
	// ! TODO ADD API Request to increment current counter
	// ! Which needs to check if goal is completed?
	try {
		// get Request to increment counter
	} catch (error) {
		console.log(error);
	}
}

async function removeHabit() {
	// ! TODO DELETE API Request
	try {
		// Delete Habit

		// Go back to account Overview Page
		window.location = "http://127.0.0.1:5500/client/account.html";
	} catch (error) {
		console.log(error);
	}
}

async function loadHabitData() {
	try {
		console.log("Loading Data");
		// Get Data

		// Get DOM Elements

		// Update DOM Elements to match data
	} catch (error) {}
}

loadHabitData();
