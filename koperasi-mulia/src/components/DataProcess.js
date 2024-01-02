import React from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";

function SpreadsheetProcess() {
    const spreadsheet_id = process.env.REACT_APP_SPREADSHEET_ID;
    const sheet_id = process.env.REACT_APP_SHEET_ID;
    const client_email = process.env.REACT_APP_CLIENT_EMAIL;
    const priv_key = process.env.REACT_APP_PRIV_KEY;
    const private_key = priv_key.replace(/\\n/g, '\n');

    const serviceAccountAuth = new JWT({
        email: client_email,
        key: private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

    const doc = new GoogleSpreadsheet(spreadsheet_id);

    const appendSpreadsheet = async (row) => {
        try {
          await doc.useServiceAccountAuth({
            client_email: client_email,
            private_key: private_key,
          });
          // loads document properties and worksheets
          await doc.loadInfo();
      
          const sheet = doc.sheetsById[sheet_id];
          const result = await sheet.addRow(row);
        } catch (e) {
          console.error('Error: ', e);
        }
    };
    const newRow = { Name: "new name", Value: "new value" };

    appendSpreadsheet(newRow);
}
export default SpreadsheetProcess;