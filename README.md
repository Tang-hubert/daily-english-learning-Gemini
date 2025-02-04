# Daily English Learning

This project provides daily English learning content, generated using the Gemini API and delivered via email.

[中文說明](https://github.com/Tang-hubert/daily-english-learning-Gemini/blob/main/README_CN.md)

## Overview

The project uses the following technologies:

*   **Google Sheets:** Stores daily content and subscriber information.
*   **Google Apps Script:** Automates the content generation and email sending process.
*   **Google Cloud Platform/Google AI Studio:** Hosts the Gemini API.
*   **Google Gmail:** Sends daily emails to subscribers.
*   **Gemini API:** For generating unique and engaging English learning content, including vocabulary, prepositions, phrases, and writing patterns.
    * **Model**: Gemini-1.5-flash

## Project Structure

1.  **Data Source**: The system reads data from a Google Sheet, structured as a CSV. See `DailyEnglishLearning-sheet1.csv` for an example of the sheet's structure.
2.  **Content Generation**: Google Apps Script is triggered daily. It uses the Gemini API via Google Cloud Platform to generate new learning content based on system instructions and the chat history.
3.  **Content Storage**: Generated content (as a JSON string) is appended to the Google Sheet for each subscriber.
4.  **Email Delivery**: Google Apps Script sends the generated content to subscribers via Google Gmail.

## Operation Steps

Here's a detailed breakdown of how the project operates:

1.  **Daily Trigger**: A time-driven trigger (set up in Google Apps Script) initiates the `generateDailyContent` function at a set time every day.
2.  **Content Generation**:
    *   The `generateDailyContent` function first checks if content has already been generated for the current day (based on the date in the first column of the sheet). If so, the script will not proceed.
    *   It then retrieves or generates a unique `chatId` for each subscriber (if it is not already in the google sheet).
    *   The script retrieves the subscriber's chat history (if there is any) by using the `chatId` (from column 8) in google sheet, it will return all previous history rows with the same `chatId`.
     *   The script constructs a detailed prompt (using `SYSTEM_INSTRUCTIONS`, `EXAMPLE_OUTPUT`,  previous chat history, and current system prompt) for the Gemini API.
    *   The script then calls the Gemini API, which returns a JSON object containing the new English learning content (vocabulary, preposition, phrase, and writing pattern) based on the system instructions, previous chat history and example output.
    *   If there are errors in generating content, the program will stop.
    *   The script appends this JSON object to the Google Sheet, along with the current date, and marks the "Is Sent" column as false.
    *    The script will record everything in the Logger, to help developers debug.
3.  **Email Sending**:
    *   After the content is generated and stored in the Google Sheet, the script will call the `sendDailyEmail` function.
    *   The `sendDailyEmail` function retrieves all the subscriber's emails (from column 6), which are non-empty.
    *   The script retrieves the generated JSON data and converts them into a user-friendly HTML format.
    *   The script uses the `GmailApp.sendEmail` service to send the HTML formatted email with the generated content. The content is sent to the author's email (from column 9), with the subscribers added to the bcc field.
    *   If there are errors in parsing JSON data, the program will skip that row.
    *  The script marks "Is Sent" column as true after the email is successfully sent.
    *    The script will record everything in the Logger, to help developers debug.

## How It Works

1.  The script retrieves or generates a unique chat ID for each subscriber
2.  The script fetches the chat history for the subscriber.
3.  The script calls the Gemini API with a carefully crafted prompt and chat history.
4.  Gemini API returns a JSON object with the new English learning content.
5.  The script stores this JSON object in the Google Sheet
6.  The script sends an email to the subscribers, rendering the JSON content in HTML format.

## Usage

1.  Set up a Google Sheet with columns as described in the example CSV file `DailyEnglishLearning-sheet1.csv`.
2.  Create a Google Cloud Project and enable the Gemini API.
3.  Obtain an API key for the Gemini API and add it to the Google Apps Script as specified by the constant `API_KEY`.
4.  Copy and paste the provided Google Apps Script code into a new Apps Script project linked to the Google Sheet.
5.  Set up a daily time-driven trigger to run the `generateDailyContent` function.

## Files

The code is organized into several key files:

*   `google_apps_script/main.js`: Main Google Apps Script code.
*   `.gitignore`: Contains file patterns to ignore when committing to Git.
*   `DailyEnglishLearning-sheet1.csv`: An example of the Google Sheet's structure, with sample data.

## Additional Notes

*   **Important:** This project relies on the Google Apps Script environment, so it's not directly runnable in other environments.
*   **API Key Security:**  **Do NOT** commit your Gemini API key to the GitHub repo directly. Use environment variables or Google Apps Script's Properties service for secure storage.
*   **Google Apps Script Project:** The Google Apps Script project is linked to a Google Sheet. The script code should be copied and pasted into a new Google Apps Script project.
*   **Google Cloud Platform Setup:** You must configure a Google Cloud project, enable the Gemini API, and obtain an API Key. This setup is a prerequisite for using the Gemini API in Google Apps Script.
*   **Time-Driven Trigger:** Remember to set up a time-driven trigger in your Google Apps Script project to ensure the `generateDailyContent` function runs automatically on your desired schedule.
*   **Error Handling:** The provided code has some error handling. Please monitor the execution logs (View -> Logs) within the Google Apps Script editor for any errors.
*   **Rate Limits:** Be mindful of API rate limits for the Gemini API. The script has retry logic with exponential backoff, but you should still monitor usage and implement error handling.
*   **Testing:** Test all components thoroughly in your development environment before deploying to production.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
