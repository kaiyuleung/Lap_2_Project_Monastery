// Global Variables
const frontendURL = window.location.origin;
const backendURL = "https://monasteri.herokuapp.com";
// Buttons
const IncrementCurrent = document.querySelector(".increment-habit-btn");
const deleteHabit = document.querySelector(".remove-habit-btn");
const backBtn = document.querySelector(".back-btn");
// Event Listeners
IncrementCurrent.addEventListener("click", incrementCurrent);
deleteHabit.addEventListener("click", removeHabit);
backBtn.addEventListener(
	"click",
	() => (window.location = `${frontendURL}/client/habitsNew.html`)
);

// Functions
async function incrementCurrent() {
	// Get Dat From Local Storage
	const token = localStorage.getItem("session");
	const habitId = localStorage.getItem("specificHabitID");
	// TODO ADD API Request to increment current counter
	try {
		const res = await fetch(`${backendURL}/habits/user/${habitId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await res.json();
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
	try {
		// Get Data
		try {
			const res = await fetch(`${backendURL}/habits/user/${habitId}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			console.log(data);
			// Get Stats Elements
			const habitName = document.getElementById("habit-text");
			const frequency = document.getElementById("frequency");
			const streak = document.getElementById("streak");
			const current = document.getElementById("current");
			const goal = document.getElementById("goal");
			const complete = document.getElementById("complete");
			// Format Name
			const removeSpecialChars = data.habitName.replace("_", " ");
			const wordArray = removeSpecialChars.split(" ");
			const uppercaseWords = wordArray.map(
				(word) => word.charAt(0).toUpperCase() + word.slice(1)
			);
			const updatedName = uppercaseWords.join(" ");
			// Update Stats Elements
			habitName.textContent = updatedName;
			frequency.textContent = data.frequency;
			streak.textContent = data.streak;
			current.textContent = data.current;
			goal.textContent = data.target;
			complete.textContent = data.current >= data.target ? "Yes" : "No";
		} catch (error) {
			console.log(error);
		}

		// Get DOM Elements

		// Update DOM Elements to match data
	} catch (error) {
		console.log(error);
	}
}

loadHabitData();
