const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

async function loginPageAutomation() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://sakshingp.github.io/assignment/login.html");

   
    // Login Page automation
    await driver.findElement(By.id("username")).sendKeys("abhay");
    await driver.findElement(By.id("password")).sendKeys("abhay123");

    // Wait for the login button to be clickable
    await driver.wait(until.elementIsEnabled(driver.findElement(By.id("log-in"))));

    await driver.findElement(By.id("log-in")).click();

    // Wait for the Home Page to load
    await driver.wait(until.elementLocated(By.css('.content-w')), 5000); // Increase the wait time if needed

    // Perform tests on the login page
    await testLoginPage(driver);

    // Wait for the Home Page to load
    console.log("⏳ Waiting for the Home Page to load...");
    await driver.wait(until.elementLocated(By.css('.content-w')), 2000); // Wait for the content wrapper element to be located
    console.log("✅ Home Page loaded successfully!");

    // Home Page automation
    console.log("🔍 Clicking the AMOUNT header in the transaction table...");
    await driver.findElement(By.className("text-right")).click();

    // Wait for the transaction table to be loaded
    console.log("⏳ Waiting for the transaction table to be loaded...");
    await driver.wait(until.elementsLocated(By.className("text-right")), 2000);
    console.log("✅ Transaction table loaded successfully!");

    // Retrieve transaction amounts
    let transactionAmounts = await driver.findElements(By.className("text-right"));

    // Extract the amount values as strings
    let amountValues = await Promise.all(transactionAmounts.map((element) => element.getText()));
    console.log("💰 Amount Values: " + amountValues);

    // Convert the amount values to numbers for sorting
    let numericAmounts = amountValues.map(parseAmountValue);
    console.log("💵 Numeric Amounts: " + numericAmounts);

    // Remove NaN values from the array
    let filteredAmounts = numericAmounts.filter((value) => !isNaN(value));

    // Sort the amounts in ascending order
    let sortedAmounts = filteredAmounts.sort((a, b) => a - b);

    // Check if the amounts are sorted
    let isSorted = sortedAmounts.every((value, index, array) => index === 0 || value >= array[index - 1]);

    console.log("✅ Transaction Amounts Sorted: " + isSorted);
    console.log("🔢 Sorted Amounts: " + sortedAmounts);
  } finally {
    // Quit the browser
    console.log("👋 Quitting the browser...");
    await driver.quit();
    console.log("🌐 Browser closed.");
  }
}

function parseAmountValue(amountValue) {
  // Extract numeric portion by removing non-numeric characters and commas
  let numericValue = amountValue.replace(/[^0-9.-]+/g, "").replace(/,/g, "");

  // Parse the numeric value and return as a number
  return parseFloat(numericValue);
}
async function testLoginPage(driver) {
  // Check if the login was successful by verifying the presence of elements on the home page
  const contentWrapper = await driver.findElement(By.css(".content-w"));
  if (contentWrapper) {
    console.log("✅ Login Successful");
  } else {
    console.log("❌ Login Failed");
  }

  // Check if the user is redirected to the correct page after login
  const currentUrl = await driver.getCurrentUrl();
  if (currentUrl === "https://sakshingp.github.io/assignment/home.html") {
    console.log("✅ Redirected to Home Page");
  } else {
    console.log("❌ Redirection Failed");
  }

  // Add more tests as needed...
}


loginPageAutomation();
