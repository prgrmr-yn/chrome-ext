document.addEventListener('DOMContentLoaded', function() {
  // Get from Clipboard button click event
  document.getElementById('getFromClipboardBtn').addEventListener('click', function() {
    getClipboardData();
  });
  // Copy to Clipboard button click event
  document.getElementById('copyToClipboardBtn').addEventListener('click', function() {
    copyToClipboard();
  });
  document.getElementById('descriptionField').addEventListener('keyup', function(event) {
    // Check if Enter key is pressed
    if (event.key === 'Enter') {
      copyToClipboard();
    }
  });
  document.getElementById('inputField').addEventListener('keyup', function(event) {
    // Check if Enter key is pressed
    if (event.key === 'Enter') {
      copyToClipboard();
    }
  });
});


function updateResultBox(content) {
  var resultBox = document.getElementById('resultBox');
  resultBox.innerText = content;
}

var clipboardContent = null; // Variable to store the clipboard content

function getClipboardData() {
  // Step 1: Read the content from the clipboard
  navigator.clipboard.readText().then(function(text) {
    // Step 2: Check if the clipboard content is a valid JSON object
    var parsedJSON;
    try {
      parsedJSON = JSON.parse(text);
    } catch (error) {
      parsedJSON = null;
    }

    // Step 3: Update the clipboard content if it's not empty and different from previous content
    if (text.trim() !== "") {
      if (parsedJSON) {
        // Clipboard content is already a JSON object, update the title directly
        clipboardContent = parsedJSON.embeds[0].title;
      } else if (text !== clipboardContent) {
        // Clipboard content is a plain text, update the clipboardContent variable
        clipboardContent = text;
      }
    }

    // Step 4: Construct the JSON object
    var json = {
      "content": null,
      "embeds": [
        {
          "title": clipboardContent,
          "description": "",
          "color": 4303392
        }
      ],
      "attachments": []
    };

    // Convert the JSON to a string
    var jsonString = JSON.stringify(json, null, 2); // Use null, 2 to format the JSON with indentation

    // Step 5: Copy the JSON to the clipboard
    navigator.clipboard.writeText(jsonString).then(function() {
      console.log('JSON copied to clipboard:', jsonString);
      updateResultBox(`${json.embeds[0].title}
      ${json.embeds[0].description}`); // Update the result box with the title
    }).catch(function(error) {
      console.error('Failed to copy JSON to clipboard:', error);
    });
  }).catch(function(error) {
    console.error('Failed to get data from clipboard:', error);
  });
}

function copyToClipboard() {
  var inputFieldValue = document.getElementById('inputField').value;
  var descriptionFieldValue = document.getElementById('descriptionField').value;

  if (!clipboardContent) {
    clipboardContent = inputFieldValue;
  }

  var json = {
    "content": null,
    "embeds": [
      {
        "title": inputFieldValue,
        "description": descriptionFieldValue,
        "color": 4303392
      }
    ],
    "attachments": []
  };

  var jsonString = JSON.stringify(json, null, 2);

  navigator.clipboard.writeText(jsonString).then(function() {
    console.log('JSON copied to clipboard:', jsonString);
    updateResultBox(`${json.embeds[0].title}
    ${json.embeds[0].description}`); // Update the result box with the title
  }).catch(function(error) {
    console.error('Failed to copy JSON to clipboard:', error);
  });
}
