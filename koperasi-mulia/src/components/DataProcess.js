import React from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import 
function SpreadsheetProcess() {
    const spreadsheet_id = '1jvpySR6dzDsOJ8h8rYtUp1Zshi4J7Tqq6gukc3vzvn4';
    const sheet_id = 0;
    const client_email = 'koperasi@koperasi-mulia.iam.gserviceaccount.com';
    const priv_key =   "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChwbL/gIoUBdNN\nsPX4TK/bGo/ta7L56QqlaQr+MKX2/7uIyCnqp4YuxsUvS9L3DkCswUvYBgiHqTJ4\nORapou3MjYAzi5Og9AzBXgfw87zFyP8SUhhm17Oy7/5j4tmp0S1gz2HaivU6nLoW\n4u6VQ/MyTU5p0eNckZdoVJShV1pcRNiidbnwYKNE/nMn1s2r4v7ibqnw78j5go5U\npd20hMMWiG2RzD7L5i9vG5wujcr1w54syE5QH+ca3ZVksygjM1J3C/AetA1v4QPI\nW9gBgDNgX/Os6Rl13OTHwBd0hnNFxp+oyyF6kp7Jei9RUaF7ZF+h7LEMJouneTZU\nSmGVAO+9AgMBAAECggEAAdplB8XozwxQb8yd/l3SirrZLBBWmPckgHsD/Z/mpte/\n+Q2VMI0B91M4bkkUfgp5wmdMf4l1W47pELUgUon9TQfQXWBoYCjeyvBRPJKhdpqa\nexLZslC4srOxJ5YxUpK4GsQ4pZCyxbZTidbIgolB8srHIf5qxMq3zO6Uuh+oEPQf\nfg47/hcR4h7KZx/uyv0ubxV03mestvOztBRt3TtAXgixZMlXW+Sn41XNw4NPX0FT\nOB2THlDqWAzfKVDXkoCnTw6UCuF6Z/NnXAk+f62+IjIIUGxk1SSqoFcugOZDgbAd\nKKrKS9xqecTQ7DQ81rs+2HGG8SV14tVQvFa5x7UP+QKBgQDUoiGDB1SkRkRPNDD5\n6qdeDC3mE5z+XqqGVaD7+7U9OEVfXladpyo3sLLzEqgkHuKcH/Huh0PGu19ccIC3\nmo/19Qe1sd0FRHIDZexs1Ue6xRs3z/CPBPQ7QyPe0VxFq0+JM1eJBKcbxytXJMtV\nAjjCl+qIQRY0e/VemO7sKIoBcwKBgQDCvzqOoiwOaQQoNWid+fqhs4Lt61KLygdF\nTwiVUvUqmHqfxJktVqWsu8lB9cBjizf/g1xLou65EifijnNUhmEBOgrPIs70lpAb\nK8+GrmN/T4RA0oAXWeTJFuIsVbUnwVQoDy2SpYybfu9o8ViGpz2f33b7ApKl5ulT\nasyevOs+DwKBgQCAIyxaz+IcFRQ5PtR85wHxVRmb2xny2I2e4p9e+vLfb7eunyVH\nYGO6p8tPXGDjU5FwUHf1LKKVcnknNcz72DMFH6KDxinRcMvcbGGrvGO7k+ixG6h2\nJ6AeznkhX71hZrlJjx0jPyCNRttBarT2B5649d+qOL7u5fyaA0OIIW35LQKBgAmC\nTNmqEXyipBFSikksa5B5s2rqkp1AwBoiQckIw+/QgixK7S/Ji01j3e/akApMQe+3\n+km3KvDechQd4IPAC/yDWQPEL1bCA0dQXFG3MiSFPW/s11RMj19CPsjrZm0Kg5Fx\nLEh8zODK0eXN4wSwJdIolyaqeX6gR8RK8rLNhq8BAoGBAJ986cRs4mW9NXxOAzWb\n5r62TLTPsN2wJAGwIofihY6m0dsawsImIoyOayXW1lJZXG00NS2xBX3HqjFJicni\nIrquRK8WpYwAaJ1gQCOWDglzAvf5ohnezwbWtaNhVsV7sqhgxpbdBgl9IMah5KZs\nXTfQJ4rET9XO4nm3cKdkMb+4\n-----END PRIVATE KEY-----\n";
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