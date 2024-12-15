function doGet() {
    return HtmlService.createHtmlOutputFromFile('index');
  }
  
  function getDataFromSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
    const data = sheet.getRange('A1:I' + sheet.getLastRow()).getValues();
    Logger.log(data);
    return data;
  }
  
  function getCenterValues() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Center');
    const values = sheet.getRange('A2:A' + sheet.getLastRow()).getValues();
    const uniqueValues = [...new Set(values.flat())];
    Logger.log(uniqueValues);
    return uniqueValues;
  }
  
  function saveResponse(details) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Response');
    const timestamp = new Date();
    sheet.appendRow([
      details.regNumber,
      details.rowNumber,
      details.seatNumber,
      timestamp,
      details.eligibility,
      details.center,
      details.userName,
      details.invigilationType,
      details.roomAllotted
    ]);
    return 'Registration successful!';
  }
  
  function saveDeletion(details) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Response');
    const timestamp = new Date();
    sheet.appendRow([
      details.regNumber,
      details.rowNumber,
      details.seatNumber,
      timestamp,
      'Deleted', // Mark as Deleted
      details.center,
      details.userName,
      details.invigilationType,
      details.roomAllotted
    ]);
    return 'Previous entry deleted and marked as Deleted.';
  }
  
  function authenticateUser(username, password) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Authentication');
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === username && data[i][1] === password) {
        return true;
      }
    }
    return false;
  }
  