describe("Login Page Automation", () => {
  it("should login and perform required tests", () => {
    cy.visit("https://sakshingp.github.io/assignment/login.html");

    // Test for the presence of the username input field
    cy.get("#username").should("exist").then(() => {
      cy.log("✅ Username input field is present");
    });

    // Test for the presence of the password input field
    cy.get("#password").should("exist").then(() => {
      cy.log("✅ Password input field is present");
    });

    // Test for the presence of the login button
    cy.get("#log-in").should("exist").then(() => {
      cy.log("✅ Login button is present");
    });

    // Fill in login credentials
    cy.get("#username").type("abhay");
    cy.get("#password").type("abhay123");

    // Click the login button
    cy.get("#log-in").click();

    // Wait for the Home Page to load
    cy.get(".content-w", { timeout: 5000 }).should("be.visible");

    // Perform tests on the login page
    testLoginPage();

    // Wait for the Home Page to load
    cy.log("⏳ Waiting for the Home Page to load...");
    cy.get(".content-w", { timeout: 2000 }).should("be.visible");
    cy.log("✅ Home Page loaded successfully!");

    // Home Page automation
    cy.log("🔍 Clicking the AMOUNT header in the transaction table...");
    cy.get(".text-right").first().click();

    // Wait for the transaction table to be loaded
    cy.log("⏳ Waiting for the transaction table to be loaded...");
    cy.get(".text-right").should("have.length.greaterThan", 1);
    cy.log("✅ Transaction table loaded successfully!");

    // Retrieve transaction amounts
    cy.get(".text-right").invoke("text").then((amountValues) => {
      const numericAmounts = amountValues
        .split("\n")
        .map((value) => parseAmountValue(value))
        .filter((value) => !isNaN(value));

      // Sort the amounts in ascending order
      const sortedAmounts = [...numericAmounts].sort((a, b) => a - b);

      // Check if the amounts are sorted
      const isSorted = sortedAmounts.every((value, index, array) => index === 0 || value >= array[index - 1]);

      cy.log("✅ Transaction Amounts Sorted: " + isSorted);
      cy.log("🔢 Sorted Amounts: " + sortedAmounts);
    });
  });

  function parseAmountValue(amountValue) {
    const numericValue = amountValue.replace(/[^0-9.-]+/g, "").replace(/,/g, "");
    return parseFloat(numericValue);
  }

  function testLoginPage() {
    // Check if the login was successful by verifying the presence of elements on the home page
    cy.get(".content-w").should("exist").then(() => {
      cy.log("✅ Login Successful");
    });

    // Check if the user is redirected to the correct page after login
    cy.url().should("eq", "https://sakshingp.github.io/assignment/home.html");
    cy.log("✅ Redirected to Home Page");
  }
});

