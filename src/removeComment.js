function removeCommentsFromJSON(jsonString) {
  let withinQuotes = false;
  let cleanedJSON = '';

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];

    if (char === '"') {
      withinQuotes = !withinQuotes;
    }

    if (!withinQuotes) {
      if (char === '/' && jsonString[i + 1] === '/') {
        // Skip single-line comment
        const indexOfNewLine = jsonString.indexOf('\n', i + 2);
        i = (indexOfNewLine !== -1) ? indexOfNewLine : jsonString.length;
        continue;
      }

      if (char === '/' && jsonString[i + 1] === '*') {
        // Skip multi-line comment
        const indexOfEndComment = jsonString.indexOf('*/', i + 2);
        i = (indexOfEndComment !== -1) ? indexOfEndComment + 1 : jsonString.length;
        continue;
      }
    }

    cleanedJSON += char;
  }

  return cleanedJSON;
}

export default removeCommentsFromJSON
