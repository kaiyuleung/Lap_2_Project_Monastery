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
	// Get Dat From Local Storage
	const token = localStorage.getItem("session");
	const habitId = localStorage.getItem("specificHabitID");
	console.log(habitId);
	try {
		// Get Data
		try {
			const res = await fetch(`${backendURL}/habits/user`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			console.log(res);
			console.log(data);
		} catch (error) {
			console.log(error);
		}

		// Get DOM Elements

		// Update DOM Elements to match data
	} catch (error) {}
}

loadHabitData();
