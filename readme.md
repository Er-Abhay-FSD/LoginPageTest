### Cypress test
[![Video Name](cypress.png)](cyTest/cypress/videos/spec.cy.js.mp4)

# run command
npx cypress run --record --key 1e404298-76fd-4194-9869-bc3cdec6776b


![Image](cypress2.png)
### selenium test
![Image](code.png)

# Login Page Automation

> A Node.js script and Cypress code for automating the login process and validating transaction amounts on a web page.

## Description

This project provides two automation approaches for testing the login page and validating transaction amounts on a web page. 

The `LoginPageTest.js` script demonstrates how to automate the login process and perform validation using Selenium WebDriver in Node.js.

The `cypressLogin.spec.js` file contains the Cypress code for automating the login process and performing validation using Cypress.

Both approaches open a web page, enter login credentials, navigate to the home page, click on the "AMOUNT" header in the transaction table, retrieve the transaction amounts, and check if the amounts are sorted in ascending order.

## Prerequisites

- Node.js (v12 or higher) for running the `LoginPageTest.js` script.
- Chrome browser for running the `LoginPageTest.js` script.
- Cypress installed for running the Cypress code.

## Installation

### Node.js and Selenium WebDriver

1. Clone the repository:

   ```bash
   git clone https://github.com/Er-Abhay-FSD/LoginPageTest.git

## Prerequisites

- Node.js (v12 or higher)
- Chrome browser

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Er-Abhay-FSD/LoginPageTest/tree/main

2.Install the dependencies:
```bash
npm install
### Usage
1.Update the login credentials:

Open LoginPageTest.js and replace "abhay" and "abhay123" with your actual login credentials.

2.Run the script:

 ```bash
 node LoginPageTest.js

### View the console output:

The script will log the progress and results of each step with proper emojis for clarity. The console output will display information such as the loading status of the home page, the click action on the "AMOUNT" header, the retrieval of transaction amounts, the sorting status of the amounts, and the sorted amounts.

Emojis Used
⏳ - Indicates a process is in progress.
✅ - Indicates a process is completed successfully.
🔍 - Indicates an action being performed.
💰 - Indicates the amount values retrieved.
💵 - Indicates the numeric amounts after parsing.
🔢 - Indicates the sorted amounts.
👋 - Indicates the script is quitting.
🌐 - Indicates the browser is closed.
