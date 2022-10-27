describe("Login As a returning", () => {
	it("Opens Homepage Successfully", () => {
		cy.visit("https://monasteri.netlify.app/index.html");
		cy.get(".register-btn");
	});

	it("Click on Register Button", () => {
		cy.visit("https://monasteri.netlify.app/index.html");
		cy.get(".register-btn").click();
	});

	it("Click on Register Button & then back to login", () => {
		cy.visit("https://monasteri.netlify.app/index.html");
		cy.get(".register-btn").click();
		cy.get(".login-btn").click();
	});

	it("Login Unsuccessfully", () => {
		cy.visit("https://monasteri.netlify.app/index.html");
		cy.get("#username").type("wrong username");
		cy.get("#password").type("wrong password");
		cy.get("#login-form > .submit-btn").click();
	});

	it("Login Successfully", () => {
		cy.visit("https://monasteri.netlify.app/index.html");
		cy.get("#username").type("s");
		cy.get("#password").type("s");
		cy.get("#login-form > .submit-btn").click();
	});

	it("Login Unsuccessfully", () => {
		cy.get("#Leaderboard-btn").click();
	});

	it("Login Unsuccessfully", () => {
		cy.get("#go-back-btn").click();
	});

	it("Post new habit", () => {
		cy.get(".fa-solid").click();
	});
});
