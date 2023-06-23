# Login Page Automation

![Automation](code.png)

> A Node.js script for automating the login process and validating transaction amounts on a web page using Selenium WebDriver.

## Description

This script demonstrates how to automate the login process and perform validation on transaction amounts using Selenium WebDriver in Node.js. It opens a web page, enters login credentials, navigates to the home page, clicks on the "AMOUNT" header in the transaction table, retrieves the transaction amounts, and checks if the amounts are sorted in ascending order.

The script utilizes the `selenium-webdriver` package to interact with the web page and perform various actions such as entering text, clicking elements, and waiting for elements to load. It also uses the `chromedriver` package to drive the Chrome browser.

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
