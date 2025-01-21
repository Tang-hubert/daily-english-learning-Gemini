# 每日英語學習

這個專案提供每日英語學習內容，使用 Gemini API 生成並透過電子郵件傳送。

## 概述

這個專案使用以下技術：

*   **Google 試算表：** 儲存每日內容和訂閱者資訊。
*   **Google Apps Script：** 自動化內容生成和電子郵件傳送流程。
*   **Google Cloud Platform/Google AI Studio：** 託管 Gemini API。
*   **Google Gmail：** 發送每日電子郵件給訂閱者。
*   **Gemini API：** 用於生成獨特且引人入勝的英語學習內容，包括詞彙、介詞、片語和寫作模式。

## 專案結構

1.  **資料來源：** 系統從 Google 試算表讀取資料，該試算表結構為 CSV 格式。請參閱 `DailyEnglishLearning-sheet1.csv` 以了解試算表結構的範例。
2.  **內容生成：** Google Apps Script 每天會被觸發。它透過 Google Cloud Platform 使用 Gemini API，根據系統指示和聊天紀錄生成新的學習內容。
3.  **內容儲存：** 生成的內容（以 JSON 字串格式）會附加到 Google 試算表中每個訂閱者的相關列。
4.  **電子郵件傳送：** Google Apps Script 透過 Google Gmail 將生成的內容發送給訂閱者。

## 操作步驟

以下是專案如何運作的詳細分解：

1.  **每日觸發：** 每日定時觸發器（在 Google Apps Script 中設定）會在每天設定的時間啟動 `generateDailyContent` 函數。
2.  **內容生成：**
    *   `generateDailyContent` 函數首先檢查是否已為當天生成內容（基於試算表第一欄的日期）。如果已生成，腳本將不會繼續。
    *   然後，它會檢索或為每個訂閱者生成一個唯一的 `chatId`（如果 Google 試算表中尚不存在）。
    *   腳本會使用 Google 試算表中的 `chatId`（來自第 8 欄）檢索訂閱者的聊天紀錄（如果有的話），它將返回所有具有相同 `chatId` 的先前歷史記錄行。
    *   腳本會為 Gemini API 構建詳細的提示（使用 `SYSTEM_INSTRUCTIONS`、`EXAMPLE_OUTPUT`、先前的聊天紀錄和目前的系統提示）。
    *   然後，腳本會呼叫 Gemini API，該 API 會根據系統指示、先前的聊天紀錄和範例輸出返回一個 JSON 物件，其中包含新的英語學習內容（詞彙、介詞、片語和寫作模式）。
    *   如果在生成內容時發生錯誤，程式將會停止。
    *   腳本會將此 JSON 物件附加到 Google 試算表，以及目前的日期，並將「Is Sent」欄標記為 false。
    *   腳本會將所有內容記錄在記錄器中，以幫助開發人員除錯。
3.  **電子郵件傳送：**
    *   在 Google 試算表中生成並儲存內容後，腳本會呼叫 `sendDailyEmail` 函數。
    *   `sendDailyEmail` 函數會檢索所有非空的訂閱者電子郵件（來自第 6 欄）。
    *   腳本會檢索生成的 JSON 資料並將其轉換為使用者友好的 HTML 格式。
    *   腳本使用 `GmailApp.sendEmail` 服務發送包含生成內容的 HTML 格式電子郵件。內容會發送到作者的電子郵件（來自第 9 欄），訂閱者會新增至密件副本欄位。
    *   如果在解析 JSON 資料時發生錯誤，程式將跳過該行。
    *   成功發送電子郵件後，腳本會將「Is Sent」欄標記為 true。
    *   腳本會將所有內容記錄在記錄器中，以幫助開發人員除錯。

## 運作方式

1.  腳本會檢索或為每個訂閱者生成一個唯一的聊天 ID。
2.  腳本會提取訂閱者的聊天紀錄。
3.  腳本會使用精心設計的提示和聊天紀錄呼叫 Gemini API。
4.  Gemini API 會返回一個 JSON 物件，其中包含新的英語學習內容。
5.  腳本會將此 JSON 物件儲存在 Google 試算表中。
6.  腳本會向訂閱者發送電子郵件，並以 HTML 格式呈現 JSON 內容。

## 用法

1.  設定一個 Google 試算表，其欄位如範例 CSV 檔案 `DailyEnglishLearning-sheet1.csv` 中所述。
2.  建立 Google Cloud 專案並啟用 Gemini API。
3.  取得 Gemini API 的 API 金鑰，並將其新增至 Google Apps Script 中，如常數 `API_KEY` 所指定。
4.  將提供的 Google Apps Script 程式碼複製並貼上到連結至 Google 試算表的新 Apps Script 專案中。
5.  設定每日定時觸發器，以執行 `generateDailyContent` 函數。

## 檔案

程式碼組織成幾個主要檔案：

*   `google_apps_script/main.js`：主要的 Google Apps Script 程式碼。
*   `.gitignore`：包含在提交到 Git 時要忽略的檔案模式。
*   `DailyEnglishLearning-sheet1.csv`：Google 試算表結構的範例，包含範例資料。

## 其他注意事項

*   **重要事項：** 這個專案依賴 Google Apps Script 環境，因此無法在其他環境中直接執行。
*   **API 金鑰安全性：**  **請勿** 直接將您的 Gemini API 金鑰提交到 GitHub 儲存庫。使用環境變數或 Google Apps Script 的屬性服務進行安全儲存。
*   **Google Apps Script 專案：** Google Apps Script 專案連結到 Google 試算表。程式碼應複製並貼上到新的 Google Apps Script 專案中。
*   **Google Cloud Platform 設定：** 您必須設定 Google Cloud 專案、啟用 Gemini API 並取得 API 金鑰。此設定是在 Google Apps Script 中使用 Gemini API 的先決條件。
*   **定時觸發器：** 請記住在 Google Apps Script 專案中設定定時觸發器，以確保 `generateDailyContent` 函數會按照您想要的排程自動執行。
*   **錯誤處理：** 提供的程式碼包含一些錯誤處理。請監控 Google Apps Script 編輯器中的執行記錄（「檢視」->「記錄」）以查看是否有任何錯誤。
*   **速率限制：** 請注意 Gemini API 的 API 速率限制。腳本具有指數退避的重試邏輯，但您仍應監控使用情況並實施錯誤處理。
*   **測試：** 在部署到生產環境之前，請在您的開發環境中徹底測試所有元件。

## 貢獻

歡迎提供貢獻！請隨時提出問題或提交提取請求。