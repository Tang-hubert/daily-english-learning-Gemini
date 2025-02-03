const SENDER_EMAIL = "Enter sender email";
const API_KEY = "Enter Gemini API key";
const MODEL_NAME = "gemini-1.5-flash";

const SYSTEM_INSTRUCTIONS = `
You are an English learning content generator specializing in advanced English. Your task is to produce a JSON object containing a diverse range of language examples, structured into the following categories: vocabulary, preposition, phrase, and writing pattern. The overall tone of the response should be humorous.

For the vocabulary section, provide five entries, and for each entry, include the following properties:
    *   "text": A vocabulary word or phrase wrapped in <mark> tags, used in a complete sentence.
    *   "level": The CEFR level (either "C1" or "C2").
    *   "mandarin": The Mandarin translation of \`text\`, which should be a complete sentence.
    *   "example": A unique example sentence demonstrating its correct usage.

For each of the preposition, phrase, and writingPattern categories, provide one example, each including the following properties:
    *   "text": The preposition/phrase/pattern, used in a complete sentence, wrapped in <mark> tags.
    *   "level": The CEFR level (either "C1" or "C2").
    *   "mandarin": The Mandarin translation of \`text\`, which should be a complete sentence.
    *   "example": A unique example sentence demonstrating its correct usage.

Each example should be engaging and employ a mix of cold jokes, puns, regional humor, and popular memes. Each example must be unique with a unique tone. Highlight the target vocabulary, preposition, phrase, or writing pattern within each example using HTML <mark> tags. All the "text", "mandarin", and "example" properties must be a complete sentence. Ensure all examples have correct punctuations suitable for a JSON format.

Your output should be a single valid JSON object with four keys: "vocabulary" (whose value is a JSON array), "preposition", "phrase", and "writingPattern", each containing a single JSON object. All objects should have "text", "level", "mandarin", and "example" properties.

this is the basic structural JSON format string I want:
\`\`\`
{
  "vocabulary": [
    {
      "text": "string",
      "level": "string",
      "mandarin": "string",
      "example": "string"
    },
    {
      "text": "string",
      "level": "string",
      "mandarin": "string",
      "example": "string"
    },
    {
      "text": "string",
      "level": "string",
      "mandarin": "string",
      "example": "string"
    },
        {
      "text": "string",
      "level": "string",
      "mandarin": "string",
      "example": "string"
    },
        {
      "text": "string",
      "level": "string",
      "mandarin": "string",
      "example": "string"
    }
  ],
  "preposition": {
    "text": "string",
    "level": "string",
    "mandarin": "string",
    "example": "string"
  },
  "phrase": {
    "text": "string",
    "level": "string",
    "mandarin": "string",
    "example": "string"
  },
  "writingPattern": {
    "text": "string",
    "level": "string",
    "mandarin": "string",
    "example": "string"
  }
}
\`\`\`
`;

const EXAMPLE_OUTPUT = `
\`\`\`
{
    "vocabulary": [
      {
      "text": "The word <mark>serendipity</mark> perfectly describes finding a twenty dollar bill in your old jeans.",
      "level": "C1",
      "mandarin": "<mark>意外發現</mark>這個詞完美地描述了在你的舊牛仔褲裡找到一張二十美元鈔票。",
      "example": "Finding that twenty dollar bill was a moment of pure <mark>serendipity</mark>."
      },
      {
      "text": "<mark>Ubiquitous</mark> is a fancy word for 'it's everywhere,' like those darn squirrels.",
      "level": "C1",
      "mandarin": "<mark>無處不在</mark>是一個花哨的詞，表示「它無處不在」，就像那些該死的松鼠一樣。",
      "example": "The <mark>ubiquitous</mark> coffee shops made it easy to find a caffeine fix."
      },
      {
      "text": "His <mark>myriad</mark> excuses for being late were truly something to behold.",
      "level": "C1",
      "mandarin": "他遲到的<mark>無數</mark>藉口真是令人嘆為觀止。",
      "example": "The city lights created a <mark>myriad</mark> of shimmering reflections."
      },
    {
      "text": "The <mark>ephemeral</mark> nature of a summer vacation always makes you want more.",
      "level": "C2",
      "mandarin": "暑假的<mark>短暫</mark>性質總是讓你想要更多。",
      "example": "The joy of a perfect summer day is often <mark>ephemeral</mark>."
    },
    {
      "text": "Her <mark>eloquent</mark> speech moved the audience, but I was more impressed with the free snacks.",
      "level": "C1",
      "mandarin": "她<mark>雄辯</mark>的演講感動了觀眾，但我更欣賞免費的點心。",
      "example": "She delivered an <mark>eloquent</mark> argument that swayed the jury."
    }
    ],
    "preposition": {
      "text": "He was <mark>on</mark> the verge of giving up his dream, but decided to keep going.",
      "level": "C1",
      "mandarin": "他<mark>差點</mark>放棄他的夢想，但決定繼續前進。",
      "example": "She's always <mark>on</mark> time for her appointments, it's one of her traits."
      },
    "phrase": {
      "text": "The boss decided to <mark>call it a day</mark> after everyone is tired from the long meeting.",
      "level": "C2",
      "mandarin": "老闆在漫長的會議讓大家都很累後決定<mark>結束今天的工作</mark>。",
      "example": "After a long hike, we decided to <mark>call it a day</mark> and head back to the campsite."
      },
    "writingPattern": {
      "text": "While some may think it's a simple task, <mark>in reality</mark> it requires a lot of effort.",
      "level": "C1",
      "mandarin": "雖然有些人可能認為這是一個簡單的任務，但<mark>實際上</mark>它需要大量的努力。",
      "example":"<mark>In reality</mark>, the situation is much more complex than it appears at first."
      }
  }
\`\`\`
`;


/**
 * Handles and logs errors from the Gemini API.
 * @param {string} errorMessage The error message to log.
 * @param {string} [responseText] The response text from the Gemini API, if available.
 * @returns {object} A standardized error object.
 */
function handleGeminiError(errorMessage, responseText) {
  Logger.log(errorMessage);
  if (responseText) {
      Logger.log(`Response Text: ${responseText}`);
  }
    return {
        vocabulary: [{ text: errorMessage, level: "Error", mandarin: errorMessage },{ text: errorMessage, level: "Error", mandarin: errorMessage },{ text: errorMessage, level: "Error", mandarin: errorMessage },{ text: errorMessage, level: "Error", mandarin: errorMessage },{ text: errorMessage, level: "Error", mandarin: errorMessage }],
        preposition: { text: errorMessage, level: "Error", mandarin: errorMessage },
        phrase: { text: errorMessage, level: "Error", mandarin: errorMessage },
        writingPattern: { text: errorMessage, level: "Error", mandarin: errorMessage },
    };
}


/**
 * Generates content using the Gemini API with retry logic and error handling.
 * @param {string} chatId The chat ID to maintain conversation context.
 * @param {boolean} isNewChat Indicates if it's a new chat ID.
 * @returns {object} The generated content or an error object.
 */
function generateContentWithGemini(chatId, isNewChat) {
  if (!API_KEY) {
    return handleGeminiError("API key is missing. Please set the API_KEY constant.");
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("sheet1");
  const chatHistory = getChatHistory(chatId);

  const prompt= `
You are an expert in generating humorous English learning content. Your task is to produce a single JSON object containing examples of advanced English vocabulary, prepositions, phrases, and a writing pattern, all tailored for learners at the C1-C2 CEFR level. The overall tone should be humorous.

Specifically, you must:

1.  Generate five distinct vocabulary entries. Each entry should include the following properties:
    *   "text": A vocabulary word or phrase wrapped in <mark> tags, used in a complete sentence.
    *   "level": A String of The CEFR level (either "C1" or "C2").
    *   "mandarin": The Mandarin translation of \`text\`, which should be a complete sentence.
    *   "example": A unique, complete sentence demonstrating the vocabulary word or phrase in context, also wrapping the target word or phrase in <mark> tags.

2.  Generate one example each for "preposition", "phrase", and "writingPattern", each with the following properties:
    *   "text": The preposition/phrase/pattern, used in a complete sentence, wrapped in <mark> tags.
    *   "level": A String of The CEFR level (either "C1" or "C2").
    *   "mandarin": A complete Mandarin translation of \`text\`, which should be a complete sentence.
    *   "example": A unique, complete sentence demonstrating the usage, also wrapping the target element in <mark> tags.

3.  Make all examples engaging, employing a mix of cold jokes, puns, regional humor, and popular memes. Each example must be distinct in both content and tone, and should not be highly similar to examples previously generated. "Previous examples" are considered as the examples in the chat history provided and the provided example output.

4.  Format your output as a single, valid JSON object with four keys: "vocabulary" (whose value is an array of objects), "preposition", "phrase", and "writingPattern" (each containing a single JSON object). Ensure that all objects have "text", "level", "mandarin", and "example" properties. Use correct punctuations appropriate for a JSON format, including quotation marks when necessary.

5. Consider all given system instructions, previous chat history and example output in generating this response. Ensure the response aligns with system instructions and is structurally the same as the example output.

Your output should be a single JSON object, do not include any additional text or formatting.

Please keep your response different from previous responses in history. Below is your previous chat history, it is a JSON format string:
            \`\`\`
            ${chatHistory}
            \`\`\`
        Here are my system instructions:
            \`\`\`
            ${SYSTEM_INSTRUCTIONS}
            \`\`\`
        Example output should be:
            ${EXAMPLE_OUTPUT}
  `;

    const data = {
        contents: [{
            role: "user",
            parts: [{
                text: prompt
            }]
        }]
    };

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
        },
        payload: JSON.stringify(data),
        muteHttpExceptions: true,
    };

  let response;
  let retryCount = 0;
  const maxRetries = 3;
  let content = {};

  while (retryCount < maxRetries) {
        let response;
        let responseText;
        try {
          response = UrlFetchApp.fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`,
            options
          );
          responseText = response.getContentText();

          const responseJson = JSON.parse(responseText);
          if (responseJson.candidates && responseJson.candidates.length > 0) {
            let text = responseJson.candidates[0].content.parts[0].text;
            text = text.trim();
            // Extract JSON part
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if(jsonMatch){
              text = jsonMatch[0];
            }

            content = JSON.parse(text);
            //check if the content is a valid object
            if(typeof content !== 'object' || content === null) {
              throw new Error(`Invalid JSON from Gemini: Content is not a valid JSON object`);
            }
            //check for vocabulary
            if (!Array.isArray(content.vocabulary) || content.vocabulary.length !== 5) {
              throw new Error(`Invalid JSON from Gemini: Vocabulary is not an array of 5`);
            }

            for(let i = 0; i < content.vocabulary.length; i++) {
              const vocab = content.vocabulary[i];
              if (typeof vocab !== 'object' || !vocab || !vocab.text || typeof vocab.text !== 'string' || !vocab.level || typeof vocab.level !== 'string' || !vocab.mandarin || typeof vocab.mandarin !== 'string' ) {
                throw new Error(`Invalid JSON from Gemini: Invalid vocabulary object at index ${i}`);
              }
            }
            // check for preposition
            if (typeof content.preposition !== 'object' || !content.preposition || !content.preposition.text || typeof content.preposition.text !== 'string'|| !content.preposition.level|| typeof content.preposition.level !== 'string' || !content.preposition.mandarin|| typeof content.preposition.mandarin !== 'string') {
              throw new Error(`Invalid JSON from Gemini: Invalid preposition object`);
            }
            // check for phrase
            if (typeof content.phrase !== 'object' || !content.phrase || !content.phrase.text  || typeof content.phrase.text !== 'string' || !content.phrase.level || typeof content.phrase.level !== 'string'  || !content.phrase.mandarin || typeof content.phrase.mandarin !== 'string') {
              throw new Error(`Invalid JSON from Gemini: Invalid phrase object`);
            }
            // check for writingPattern
            if (typeof content.writingPattern !== 'object' || !content.writingPattern || !content.writingPattern.text || typeof content.writingPattern.text !== 'string' || !content.writingPattern.level || typeof content.writingPattern.level !== 'string' || !content.writingPattern.mandarin || typeof content.writingPattern.mandarin !== 'string') {
              throw new Error(`Invalid JSON from Gemini: Invalid writingPattern object`);
            }

            return content;
          } else {
            throw new Error("Invalid response from Gemini");
            }
        } catch (e) {
            Logger.log(`Error during content generation: ${e} - responseText: ${responseText}`);
              if (retryCount >= maxRetries -1) { // retry until maxRetries -1
                return handleGeminiError(`Error after ${maxRetries} retries: ${e}`, responseText);
              }
          } finally {
              retryCount++;
              Utilities.sleep(1000 * (2 ** retryCount));
            }
}
return content;
}

/**
 * Generates daily English learning content and sends it via email.
 */
function generateDailyContent() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("sheet1");
  const lastRow = sheet.getLastRow();

  // Check if content has already been generated for today
  if (sheet.getRange(lastRow, 1).getValue() === Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd")) {
    Logger.log("Content already generated for today.");
    return;
  }

  // Get or create chat ID
  let chatId = sheet.getRange(2, 8).getValue();
  const isNewChat = !chatId;
  if (!chatId) {
    chatId = Utilities.getUuid();
    sheet.getRange(2, 8).setValue(chatId);
    Logger.log(`Generated new chat ID: ${chatId}`);
  }
  
  // Generate learning content
  const content = generateContentWithGemini(chatId, isNewChat);
   if(content.vocabulary && content.vocabulary[0] && content.vocabulary[0].level === "Error") {
     Logger.log(`Error during content generation, skipping email send: ${JSON.stringify(content)}`);
        return;
    }
  Logger.log(`Generated content: ${JSON.stringify(content)}`);

  // Get today's date
  const today = Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd");

  // Append the content to the spreadsheet
  sheet.appendRow([today, JSON.stringify(content.vocabulary), JSON.stringify(content.preposition), JSON.stringify(content.phrase), JSON.stringify(content.writingPattern), null, false, chatId]);
  const appendedRow = sheet.getRange(sheet.getLastRow(),1,1,8).getValues()[0];
   Logger.log(`Appended row: ${JSON.stringify(appendedRow)}`);

  // Send daily email
  sendDailyEmail();
}


/**
 * Sends a daily email with the generated content.
 */
function sendDailyEmail() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("sheet1");
    const today = Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd");
    const lastRow = sheet.getLastRow();

    // Check if the email has already been sent for the current row
    if (sheet.getRange(lastRow, 7).getValue() !== true) {
       const data = sheet.getRange(lastRow, 1, 1, 5).getValues()[0];
        Logger.log(`Data in sendDailyEmail: ${JSON.stringify(data)}`); // Log data in sendDailyEmail

       const author = sheet.getRange(2, 9).getValues()[0];

       const subscriberEmails = sheet.getRange(2, 6, lastRow - 1, 1).getValues()
                  .filter(row => row[0] !== "")
                  .map(row => row[0]);
        const subject = "English Learning Time";
        let vocabularyContent = "";
        try {
          const vocabularyArray = JSON.parse(data[1]);
            if(Array.isArray(vocabularyArray)) {
              vocabularyArray.forEach(vocab => {
                vocabularyContent += `
                  <p class="category-title">
                  <span class="highlight">Vocabulary</span> (Level: <strong>${vocab.level}</strong>)
                  </p>
                  <p class="example-text">${vocab.text}</p>
                  <p class="mandarin-text">${vocab.mandarin}</p>
                  <p class="example-text">Illustrative sentence: ${vocab.example}</p>
                `;
              });
            } else {
              vocabularyContent =  `
                <p class="category-title">
                <span class="highlight">Vocabulary</span> (Level: <strong>Error</strong>)
                </p>
                <p class="example-text">Invalid Vocabulary Data</p>
                <p class="mandarin-text">Invalid Vocabulary Data</p>
              `;
             }
        } catch (e) {
            vocabularyContent =  `
              <p class="category-title">
              <span class="highlight">Vocabulary</span> (Level: <strong>Error</strong>)
              </p>
              <p class="example-text">Invalid Vocabulary Data</p>
              <p class="mandarin-text">Invalid Vocabulary Data</p>
              `;
            Logger.log(`Error parsing vocabulary data ${e} - data: ${data[1]}`);
            return;
        }


        const body = `
        <html>
        <head>
        <style>
          .highlight {
            background-color: #fff2a8; /* Highlight color for <mark> tag */
            padding: 2px;
            }
          .category-title {
            font-size: 1.2em;
            font-weight: bold;
            }
          .example-text {
            font-size: 1.1em;
            margin-left: 10px;
            }
          .mandarin-text {
            font-size: 1em;
            color: #777;
            margin-left: 10px;
            }
          mark {
            background-color: #f0ad4e; /* A more visible highlight color */
            padding: 2px 5px;
            border-radius: 3px;
            font-weight: bold;
            }
        </style>
        </head>
        <body>
          <p>
            LOTTERY (<span class="highlight">${today}</span>):
          </p>
          ${vocabularyContent}
          <p class="category-title">
            <span class="highlight">Preposition</span> (Level: <strong>${extractLevelFromJSON(data[2])}</strong>)
          </p>
          <p class="example-text">${extractTextFromJSON(data[2])}</p>
          <p class="mandarin-text">${extractMandarinFromJSON(data[2])}</p>
          <p class="example-text">Illustrative sentence: ${extractExampleFromJSON(data[2])}</p>
          <p class="category-title">
            <span class="highlight">Phrase</span> (Level: <strong>${extractLevelFromJSON(data[3])}</strong>)
          </p>
          <p class="example-text">${extractTextFromJSON(data[3])}</p>
          <p class="mandarin-text">${extractMandarinFromJSON(data[3])}</p>
          <p class="example-text">Illustrative sentence: ${extractExampleFromJSON(data[3])}</p>
          <p class="category-title">
            <span class="highlight">Sentence structure</span> (Level: <strong>${extractLevelFromJSON(data[4])}</strong>)
          </p>
          <p class="example-text">${extractTextFromJSON(data[4])}</p>
          <p class="mandarin-text">${extractMandarinFromJSON(data[4])}</p>
          <p class="example-text">Illustrative sentence: ${extractExampleFromJSON(data[4])}</p>
        </body>
        </html>
      `;
  
       subscriberEmails.forEach(email => GmailApp.sendEmail(author, subject, body, // author = Recipient email, email = all subscribers
       {
        htmlBody: body,
        bcc: email
       }));
        sheet.getRange(lastRow, 7).setValue(true); // Mark email sent
    }
}


/**
 * Extracts the example from the JSON string.
 * @param {string} jsonString The JSON string containing level and example.
 * @returns {string} The extracted example or "Error" if extraction fails.
 */
function extractExampleFromJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed.example || "Error";
  } catch (e) {
    Logger.log(`Error extracting example from JSON: ${e} - jsonString: ${jsonString}`);
    return "Error";
  }
}

/**
 * Extracts the level from the JSON string.
 * @param {string} jsonString The JSON string containing level and text.
 * @returns {string} The extracted level or "Error" if extraction fails.
 */
function extractLevelFromJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed.level || "Error";
  } catch (e) {
    Logger.log(`Error extracting level from JSON: ${e} - jsonString: ${jsonString}`);
    return "Error";
  }
}

/**
 * Extracts the text from the JSON string.
 * @param {string} jsonString The JSON string containing level and text.
 * @returns {string} The extracted text or "Error" if extraction fails.
 */
function extractTextFromJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed.text || "Error";
  } catch (e) {
    Logger.log(`Error extracting text from JSON: ${e} - jsonString: ${jsonString}`);
    return "Error";
  }
}

/**
 * Extracts the mandarin from the JSON string.
 * @param {string} jsonString The JSON string containing level and mandarin.
 * @returns {string} The extracted mandarin or "Error" if extraction fails.
 */
function extractMandarinFromJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed.mandarin || "Error";
  } catch (e) {
    Logger.log(`Error extracting mandarin from JSON: ${e} - jsonString: ${jsonString}`);
    return "Error";
  }
}


/**
 * Retrieves chat history from the spreadsheet.
 * @param {string} chatId The chat ID to retrieve history for.
 * @returns {string} The chat history in JSON format.
 */
function getChatHistory(chatId) {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName("sheet1");
      // Get headers
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

      // Get all data
      const data = sheet.getDataRange().getValues();

      // Find the column indexes based on headers
      const dateIndex = headers.indexOf("Date");
      const vocabularyIndex = headers.indexOf("vocabulary");
      const prepositionIndex = headers.indexOf("preposition");
      const phraseIndex = headers.indexOf("phrase");
      const writingPatternIndex = headers.indexOf("writingPattern");
      const chatIdIndex = headers.indexOf("chatId");

      // Filter and map the chat history
      const history = data.filter(row => row[chatIdIndex] === chatId)
          .map(row => {
              return {
                  vocabulary: row[vocabularyIndex] || "",
                  preposition: row[prepositionIndex] || "",
                  phrase: row[phraseIndex] || "",
                  writingPattern: row[writingPatternIndex] || ""
              };
          });
      if (!history) return "";
      return JSON.stringify(history);
    } catch (e) {
        Logger.log(`getChatHistory 錯誤 ${e}`);
        return "";
    }
}