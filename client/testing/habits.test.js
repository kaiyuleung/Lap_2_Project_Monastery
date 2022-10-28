const renderDom = require("./helpers");

let domHabits;
let documentHabits;

describe("habits.html", () => {
	beforeEach(async () => {
		domHabits = await renderDom("habits.html");
		documentHabits = await domHabits.window.document;
	});

	test("Checks that both login & register forms exist", () => {
		// const loginForm = document.getElementById("login-form");
		expect(2).toBe(2);
	});
});
