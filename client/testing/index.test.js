const renderDom = require("./helpers");

let dom;
let document;

describe("index.html", () => {
	beforeEach(async () => {
		dom = await renderDom("index.html");
		document = await dom.window.document;
	});

	test("Checks that both login & register forms exist", () => {
		const loginForm = document.getElementById("login-form");
		const registerForm = document.getElementById("register-form");
		expect(loginForm).toBeTruthy();
		expect(registerForm).toBeTruthy();
	});

	test("Clicking on register Button hides login form", () => {
		// Check register btn
		const registerBtn = document.querySelector(".register-btn");
		expect(registerBtn).toBeTruthy();
		// Click on register btn
		registerBtn.dispatchEvent(new dom.window.Event("click"));
		// Hide login Container
		const loginContainer = document.getElementById("login-container");
		expect(loginContainer.style.display).toBe("none");
		// Show Register Container
		const RegisterContainer = document.getElementById("register-container");
		expect(RegisterContainer.style.display).toBe("grid");
	});

	test("Clicking on Login Button hides register form", () => {
		// Check register btn
		const registerBtn = document.querySelector(".register-btn");
		const loginBtn = document.querySelector(".login-btn");
		expect(registerBtn).toBeTruthy();
		expect(loginBtn).toBeTruthy();
		// Click on register btn
		registerBtn.dispatchEvent(new dom.window.Event("click"));
		loginBtn.dispatchEvent(new dom.window.Event("click"));
		// Shows login Container
		const loginContainer = document.getElementById("login-container");
		expect(loginContainer.style.display).toBe("grid");
		// Hides Register Container
		const RegisterContainer = document.getElementById("register-container");
		expect(RegisterContainer.style.display).toBe("none");
	});
});
