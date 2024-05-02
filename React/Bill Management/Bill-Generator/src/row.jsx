import React from 'react';
import jsPDF from 'jspdf';
import './index.css';
import banglaFont from './BanglaFont.ttf'; // Import your Bangla font

function Row({ row, headers }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Register Bangla font
    doc.addFileToVFS(banglaFont, 'BanglaFont');
    doc.addFont('BanglaFont', 'Bangla', 'normal');
    doc.setFont('Bangla');

    // Encode Bengali text as Unicode
    const bengaliText = 'জন';

    row.forEach((cell, index) => {
      doc.text(`${bengaliText}: ${cell}`, 10, 10 + index * 10);
    });

    doc.save('output.pdf');
  };

  return (
    <div className="row">
      {row.map((cell, index) => (
        <div key={index}>
          <span className="header">{headers[index]}:</span> {cell}
        </div>
      ))}
      <button className="bg-color bg-red-200" onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default Row;
