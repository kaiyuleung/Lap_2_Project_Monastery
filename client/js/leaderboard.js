// Global Variables
const frontendURL = window.location.origin;
const backendURL = "https://monasteri.herokuapp.com";
// Buttons
const toggleBtn = document.getElementById("toggle");
const goBackBtn = document.getElementById("go-back-btn");

// Event Listeners
toggleBtn.addEventListener("click", toggleLeaderboards);
goBackBtn.addEventListener(
	"click",
	() => (window.location = `${frontendURL}/client/habitsNew.html`)
);

// Functions
async function toggleLeaderboards(e) {
	// Get Dat Attribute
	const currentMode = e.target.getAttribute("toggle-score");
	// Toggle Dat Attribute
	if (currentMode === "totalStreak") {
		e.target.setAttribute("toggle-score", "totalHabits");
	} else e.target.setAttribute("toggle-score", "totalStreak");
	const currentModeUpdated = e.target.getAttribute("toggle-score");
	// Get API Request
	console.log(currentModeUpdated);
	try {
		// TODO
		const res = await fetch(`${backendURL}/habits/Leaderboard/`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				rankBy: currentModeUpdated,
			}),
		});
		const data = await res.json();
		console.log(data);
	} catch (error) {}
}

async function loadScoreData() {
	// Get Local Storage Data
	const token = localStorage.getItem("session");
	const currentMode = toggleBtn.getAttribute("toggle-score");

	try {
		const res = await fetch(`${backendURL}/habits/leaderboard/totalStreak`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();
		console.log(data);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

loadScoreData();
