describe("Typical returning user actions on the app", () => {
	beforeEach(() => {
		cy.viewport(1600, 900);
		cy.restoreLocalStorage();
	});

	afterEach(() => {
		cy.saveLocalStorage();
	});

	it("Opens Homepage Successfully", () => {
		cy.visit("https://monasteri.netlify.app/index.html");
		cy.get(".register-btn");
	});

	it("Click On Register Option", () => {
		cy.get(".register-btn").click();
	});

	it("Go Back To Login", () => {
		cy.get(".login-btn").click();
	});

	it("Unsuccessful Login Attempt", () => {
		cy.visit("https://monasteri.netlify.app/index.html");
		cy.get("#username").type("wrong username");
		cy.get("#password").type("wrong password");
		cy.get("#login-form > .submit-btn").click();
		cy.get(".fa-regular").click();
	});

	it("Login Successfully", () => {
		cy.get("#username").clear().type("testUser123");
		cy.get("#password").clear().type("password");
		cy.get("#login-form > .submit-btn").click();
	});

	it("Open Leaderboards", () => {
		cy.get("#Leaderboard-btn").click();
		cy.get("#go-back-btn").click();
	});

	it("View a Habit", () => {
		cy.get('[habit-id="635b84f8399f8f1d6ffe1804"]').click();
	});

	it("Increment Current on a habit", () => {
		cy.get(".increment-habit-btn").click();
		cy.wait(200);
		cy.get(".back-btn").click();
	});

	it("Post new habit", () => {
		cy.wait(200);
		cy.get(".fa-solid").click();
		cy.get("#habitName").type("Read");
		cy.get("#habitTarget").type("2");
		cy.get("#add-habit").click();
	});

	it("Open new habit", () => {
		cy.wait(200);
		cy.get(".habit-item").last().click();
	});

	it("Increment & remove", () => {
		cy.wait(200);
		cy.get(".increment-habit-btn").click();
		cy.wait(200);
		cy.get(".remove-habit-btn").click();
	});

	it("Logout", () => {
		cy.wait(100);
		cy.get("#logout-btn").click();
	});
});
