import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import './App.css';
import Row from './row'; // Import the Row component

function App() {
  const [excelData1, setExcelData1] = useState([]);

  const handleFileUpload = async (fileIndex, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);

      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(data);

        const sheetData = [];
        workbook.eachSheet((worksheet) => {
          const rows = [];
          worksheet.eachRow((row) => {
            rows.push(row.values);
          });
          sheetData.push(rows);
        });
        setExcelData1(sheetData[0]);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input type="file" onChange={(e) => handleFileUpload(1, e)} />

      {excelData1.length > 0 && (
        <div className="container">
          {excelData1.slice(1).map((row, rowIndex) => (
            <Row key={rowIndex} row={row} headers={excelData1[0]} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
