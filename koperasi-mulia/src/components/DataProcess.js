import React, { useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from 'google-auth-library';

async function SpreadsheetProcess( dataFromAnotherFunction ) {
    // Environment variables for Google Sheets API
    console.log('Formatted Data:', dataFromAnotherFunction);
    console.log(typeof dataFromAnotherFunction);
    const spreadsheet_id = process.env.REACT_APP_SPREADSHEET_ID;
    const sheet_id = process.env.REACT_APP_SHEET_ID;
    const client_email = process.env.REACT_APP_CLIENT_EMAIL;
    const priv_key = process.env.REACT_APP_PRIV_KEY;
    const private_key = priv_key.replace(/\\n/g, '\n');

    // Google Spreadsheet document initialization
    const serviceAuth = new JWT ({
        email: client_email,
        key: private_key,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
          ],
    });
    const doc = new GoogleSpreadsheet(spreadsheet_id, serviceAuth);

    // Function to append data to the spreadsheet
    const appendSpreadsheet = async (row) => {
        try {
            await doc.loadInfo();

            const sheet = doc.sheetsById[sheet_id];
            await sheet.addRow(row);
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    // Function to handle the addition of new data
    const handleNewData = async () => {
        for (let rowData of dataFromAnotherFunction) {
            await appendSpreadsheet(rowData);
        }
    };

    await handleNewData();

    // Effect to trigger adding data when dataFromAnotherFunction changes
    useEffect(() => {
        if (dataFromAnotherFunction && dataFromAnotherFunction.length > 0) {
            handleNewData();
        }
    }, [dataFromAnotherFunction]);

    return null;
}

export default SpreadsheetProcess;
