// Global Variables
const frontendURL = window.location.origin;
const backendURL = "https://monasteri.herokuapp.com";
// Buttons
const logoutBtn = document.getElementById("logout-btn");
const newHabitBtn = document.querySelector(".new-habit-btn");
const cancelHabit = document.querySelector(".cancel-habit");
// Form
const newHabitForm = document.querySelector(".new-habit-form");
// Containers
const allHabitsContainer = document.querySelector(".all-habits-container");

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

async function AddNewHabit(e) {
	e.preventDefault();
	// Get Local Storage Data
	const token = localStorage.getItem("session");
	// Set Data
	const habitName = e.target.habitName.value;
	const frequency = e.target.frequency.value;
	const target = e.target.habitTarget.value;
	// TODO Send API To Add New Habit
	try {
		const res = await fetch(`${backendURL}/habits/user`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ habitName, frequency, target }),
		});
		const data = await res.json();
		// Refresh Page
		location.reload();
	} catch (error) {
		console.log(error);
	}
}

async function loadUserHabits() {
	// Get Local Storage Data
	const username = localStorage.getItem("username");
	const token = localStorage.getItem("session");
	const habitsID = localStorage.getItem("habitsID");
	// TODO Get User Habits on Load
	try {
		const res = await fetch(`${backendURL}/habits/user`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await res.json();
		// Loops Habits Data
		data.habits.forEach((habit) => {
			// Create element & add class
			const habitDiv = document.createElement("div");
			habitDiv.classList.add("habit-item");
			// Format Name
			const removeSpecialChars = habit.habitName.replace("_", " ");
			const wordArray = removeSpecialChars.split(" ");
			const uppercaseWords = wordArray.map(
				(word) => word.charAt(0).toUpperCase() + word.slice(1)
			);
			const updatedName = uppercaseWords.join(" ");
			// Add Data value to div
			habitDiv.setAttribute("habit-id", habit._id);
			// Add name To Div
			habitDiv.textContent = updatedName;
			// Add Event Listeners
			habitDiv.addEventListener("click", viewHabit);
			// Append Element
			allHabitsContainer.append(habitDiv);

			//
		});
	} catch (error) {
		console.log();
	}
}

loadUserHabits();

function viewHabit(e) {
	const specificHabitId = e.target.getAttribute("habit-id");
	// Save to local Storage
	localStorage.setItem("specificHabitID", specificHabitId);
	// Open View Habit Page
	window.location = `${frontendURL}/client/viewHabit.html`;
}
