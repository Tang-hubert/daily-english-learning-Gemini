# Daily English Learning

This project provides daily English learning content, generated using the Gemini API and delivered via email.

## Overview

The project uses the following technologies:

*   **Google Sheets:** Stores daily content and subscriber information.
*   **Google Apps Script:** Automates the content generation and email sending process.
*   **Google Cloud Platform/Google AI Studio:** Hosts the Gemini API.
*   **Google Gmail:** Sends daily emails to subscribers.
*   **Gemini API:** For generating unique and engaging English learning content, including vocabulary, prepositions, phrases, and writing patterns.
    
## Structure

1.  **Data Source**: The system reads data from a Google Sheet, structured as a CSV.
2.  **Content Generation**: Google Apps Script is triggered daily. It uses the Gemini API via Google Cloud Platform to generate new learning content based on system instructions and the chat history.
3.  **Content Storage**: Generated content is stored back in the Google Sheet
4.  **Email Delivery**: Google Apps Script sends the generated content to subscribers via Google Gmail.

## How It Works

1.  The script retrieves or generates a unique chat ID for each subscriber
2.  The script fetches the chat history for the subscriber.
3.  The script calls the Gemini API with a carefully crafted prompt and chat history.
4.  Gemini API returns a JSON object with the new English learning content.
5.  The script stores this JSON object in the Google Sheet
6.  The script sends an email to the subscribers, rendering the JSON content in HTML format.

## Usage

1.  Set up a Google Sheet with columns as described in the example CSV file.
2.  Create a Google Cloud Project and enable the Gemini API.
3.  Obtain an API key for the Gemini API and add it to the Google Apps Script as specified by the constant `API_KEY`.
4.  Copy and paste the provided Google Apps Script code into a new Apps Script project linked to the Google Sheet.
5.  Set up a daily time-driven trigger to run the `generateDailyContent` function.

## Files

The code is organized into several key files:
  - `google_apps_script/main.js`: Main Google Apps Script code.
  - `.gitignore`: Contains file patterns to ignore when committing to Git.

## Additional Info

-   This project relies on the Google Apps Script environment, so it's not directly runnable in other environments.
-   Error handling and logging have been implemented using the Logger service.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
