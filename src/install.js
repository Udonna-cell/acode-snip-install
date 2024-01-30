import fs from "fs";
import ora from 'ora';
import log from "./log.js";
import removeCommentsFromJSON from "./removeComment.js";
import checker from "./checker.js";

// Function to install snippets
function installSnippet({ value }, configData) {
  // Configuration for the spinner
  const spinnerData = {
    text: "0%",
    spinner: {
      interval: 80,
      frames: [
        "( ●    )",
        "(  ●   )",
        "(   ●  )",
        "(    ● )",
        "(     ●)",
        "(    ● )",
        "(   ●  )",
        "(  ●   )",
        "( ●    )",
        "(●     )"
      ]
    }
  };

  // Create a spinner instance
  const spinner = ora(spinnerData).start();
  spinner.text = `Installing snippet ${value.name} ..`;

  // Iterate through snippets
  value.snippets.forEach(({ language, path }, index, arr) => {
    // Calculate installation percentage
    const percentage = (index + 1) / arr.length * 100;

    // Adjust path
    path = `${value.snipPath}${path.slice(10)}`;

    // Read and process snippet
    let snippet = fs.readFileSync(path);
    snippet = removeCommentsFromJSON(snippet.toString());

    try {
      snippet = JSON.parse(snippet);
    } catch (e) {
      log("stanle");
    }

    // Get existing snippets
    const snippets = fs.readdirSync(configData.snippets);

    // Check if language snippet file exists
    if (snippets.includes(`${language}.snippets`)) {
      // Define location and header
      const location = `${configData.snippets}/${language}.snippets`;
      if (index == 0) {
        // Check for header existence
        checker(`#>>>> ${value.name}`, location);
        const header = `\n\n#>>>> ${value.name}\n\n`;
        fs.appendFileSync(location, header);
      }





      // Iterate through snippet properties
      for (const prop in snippet) {
        const prefix = snippet[prop].prefix;
        const description = snippet[prop].description;
        let body = snippet[prop].body;
        let bodyData = "";

        // Format body content
        if (Array.isArray(body)) {
          body.forEach(i => (bodyData += `${i}\n\t`));
        } else {
          bodyData += `${body}`;
        }

        // Construct snippet
        const snip = `\nsnippet ${prefix} "${description}"\n\t${bodyData}`;
        // Append snippet to the location
        fs.appendFileSync(location, snip);
      }
    }
  });

  // Display success message after a delay
  setTimeout(() => {
    spinner.succeed("Snippet installed :)");
  }, 5000);
}

// Export the installSnippet function
export default installSnippet;