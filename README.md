# acode-snip-install

## Overview
`acode-snip-install` is a command-line interface (CLI) tool designed to facilitate the download and installation of Visual Studio Code (VSCode) snippet extensions for users of the Acode editor.

## Installation
1. Install the required snippet extension in Acode.
2. Clone this project's repository or install it globally using npm:
   ```bash
   npm install -g acode-snip-install
   ```

## Configuration
Set up a configuration file named `acode.config.json` with the following details:
```json
{
  "snippets": "path/to/store/snippets",
  "extensions": "path/to/store/extensions"
}
```
- `"snippets"`: Path to the folder where snippets will be stored.
- `"extensions"`: Path to the folder where the cloned extensions will be stored.

## Usage
1. Navigate to the project directory or ensure `acode-snip-install` is globally installed.
2. Run the following command to download and install a snippet extension:
   ```bash
   acode-snip-install
   ```
3. Follow the prompts to provide the necessary details.

## Note
Ensure you have the required permissions and dependencies installed before running the tool.

Feel free to customize this README based on additional details or specific instructions for your users.