// Global Variables
const frontendURL = "https://monasteri.netlify.app";
const backendURL = "https://monasteri.herokuapp.com";
// Buttons
const goBackBtn = document.getElementById("go-back-btn");
// Containers
const scoresContainer = document.getElementById("scores-container");
const scoreType = document.querySelector(".score-type");
// Other

// Event Listeners
goBackBtn.addEventListener(
	"click",
	() => (window.location = `${frontendURL}/habits.html`)
);

async function loadScoreData() {
	// Get Local Storage Data
	const token = localStorage.getItem("session");
	// Get Data
	try {
		const res = await fetch(`${backendURL}/habits/leaderboard/totalStreak`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await res.json();

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
			scoreType.textContent = "Highest Streak";
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
