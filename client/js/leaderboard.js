// Global Variables
const frontendURL = "https://monasteri.netlify.app";
const backendURL = "https://monasteri.herokuapp.com";
// Buttons
const toggleBtn = document.getElementById("toggle");
const goBackBtn = document.getElementById("go-back-btn");
// Containers
const scoresContainer = document.getElementById("scores-container");
const scoreType = document.querySelector(".score-type");
// Other

// Event Listeners
toggleBtn.addEventListener("click", toggleLeaderboards);
goBackBtn.addEventListener(
	"click",
	() => (window.location = `${frontendURL}/client/habits.html`)
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
	// Get Data
	try {
		const res = await fetch(`${backendURL}/habits/leaderboard/${currentMode}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(currentMode);
		const data = await res.json();
		if (currentMode === "totalStreak") {
			scoreType.textContent = "Highest Streak";
		} else {
			scoreType.textContent = "Laziest Users";
		}
		data.map((user) => {
			console.log(user);
			// Create Elements
			const div = document.createElement("div");
			const usernamePara = document.createElement("p");
			const scorePara = document.createElement("p");
			// Apply Classes
			div.classList.add("score-item");
			usernamePara.classList.add("username");
			scorePara.classList.add("score");
			// Apply Data To Elements
			usernamePara.textContent = usernamePara.textContent = user.username;
			scorePara.textContent = scorePara.textContent = user.totalStreak;
			// Append to Div
			div.appendChild(usernamePara);
			div.appendChild(scorePara);
			// Append Elements
			scoresContainer.appendChild(div);
		});
	} catch (error) {
		console.log(error);
	}
}

loadScoreData();
