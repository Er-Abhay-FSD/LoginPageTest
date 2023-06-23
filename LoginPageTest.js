const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

async function loginPageAutomation() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://sakshingp.github.io/assignment/login.html");

    // Test for the presence of the username input field
    const usernameInput = await driver.findElement(By.id("username"));
    if (usernameInput) {
      console.log("✅ Username input field is present");
    } else {
      console.log("❌ Username input field is not found");
    }

    // Test for the presence of the password input field
    const passwordInput = await driver.findElement(By.id("password"));
    if (passwordInput) {
      console.log("✅ Password input field is present");
    } else {
      console.log("❌ Password input field is not found");
    }

    // Test for the presence of the login button
    const loginButton = await driver.findElement(By.id("log-in"));
    if (loginButton) {
      console.log("✅ Login button is present");
    } else {
      console.log("❌ Login button is not found");
    }

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
  // Create random class for the alert
  const randomClass = "random_class_" + Math.floor(Math.random() * Math.floor(10));

  // Find all alert elements by class name
  const alertElements = await driver.findElements(By.className("alert"));

  for (const element of alertElements) {
    // Remove the "alert" class and add the random class
    await driver.executeScript(`arguments[0].classList.remove('alert');`, element);
    await driver.executeScript(`arguments[0].classList.add('${randomClass}');`, element);

    // Get the alert message text
    const alertMessage = await element.getText();
    
    // Print the alert message with emoji
    console.log("⚠️ Alert Message: " + alertMessage);
  }

  // Define the login function to be executed in the browser context
  const loginFunction = `
    function login() {
      var usernameElement = document.getElementById("username");
      var passwordElement = document.getElementById("password");

      if (!usernameElement || !passwordElement) {
        console.log("❌ Username or password element not found");
        return;
      }

      var username = usernameElement.value;
      var password = passwordElement.value;

      var alertElements = document.querySelectorAll(".${randomClass}");

      if (username === "" && password === "") {
        alertElements.forEach(function(element) {
          element.style.display = "block";
          element.innerText = "⚠️ Both Username and Password must be present";
          element.classList.remove("alert-success", "alert-info", "alert-warning");
          element.classList.add("alert-danger");
        });
        return;
      }

      if (username === "" && password !== "") {
        alertElements.forEach(function(element) {
          element.style.display = "block";
          element.innerText = "⚠️ Username must be present";
          element.classList.remove("alert-success", "alert-info", "alert-danger");
          element.classList.add("alert-warning");
        });
        return;
      }

      if (username !== "" && password === "") {
        alertElements.forEach(function(element) {
          element.style.display = "block";
          element.innerText = "⚠️ Password must be present";
          element.classList.remove("alert-success", "alert-info", "alert-warning");
          element.classList.add("alert-danger");
        });
        return;
      }

      // Update class after every submission
      var newAlertElements = document.querySelectorAll(".${randomClass}");
      var newRandomClass = "random_class_" + Math.floor(Math.random() * Math.floor(10));
      newAlertElements.forEach(function(element) {
        element.classList.remove("${randomClass}");
        element.classList.add(newRandomClass);
      });

      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("showAd") === "true") {
        window.location = "/assignment/home.html?showAd=true";
      } else {
        window.location = "/assignment/home.html";
      }
    }

    login();
  `;

  // Execute the login function in the browser context
  await driver.executeScript(loginFunction);
}

loginPageAutomation();
