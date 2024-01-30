// Import necessary modules
import log from "./log.js";
import fs from "fs";
import chalk from "chalk";

// Function to check if a header exists in a file
function checker(header, path) {
  // Read the content of the file as a string
  let content = fs.readFileSync(path, "utf-8");

  // Check if the specified header is found in the file content
  let isFound = content.includes(header);

  // Log the header
  // log(header);

  // If the header is found, log an error and exit the process
  if (isFound) {
    log(chalk.red(" ERROR X"));
    log(chalk.gray("  Snippet is already installed"));
    process.exit();
  }
}

// Export the checker function
export default checker;