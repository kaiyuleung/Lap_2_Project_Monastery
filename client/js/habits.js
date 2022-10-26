// Global Variables
const frontendURL = window.location.origin;
const backendURL = "http://localhost:3001";
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
	console.log("test");
	// TODO Send API To Add New Habit

	// TODO Refresh Page
}

async function loadUserHabits() {
	// Get Local Storage Data
	const username = localStorage.getItem("username");
	const token = localStorage.getItem("session");
	const habitsID = localStorage.getItem("habitsID");
	// TODO Get User Habits on Load
	try {
		const res = await fetch(`http://localhost:3001/user/`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await res.json();
		console.log(data);
		// Loops Habits Data
		data.forEach((habit) => {
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
	} catch (error) {}
	// TODO APPLY TO DOM
}

loadUserHabits();

function viewHabit(e) {
	const specificHabitId = e.target.getAttribute("habit-id");
	// Save to local Storage
	localStorage.setItem("specificHabitID", specificHabitId);
	// Open View Habit Page
	window.location = `${frontendURL}/client/viewHabit.html`;
}
