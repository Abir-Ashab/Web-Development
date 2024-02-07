import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver'; // Import the saveAs function from file-saver

// Import the Bangla font file
import SolaimanLipi from './SolaimanLipi.ttf';

function Row({ row, headers }) {
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    let y = height - 50;

    // Register the custom font
    const fontBytes = await fetch(SolaimanLipi).then((res) => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);

    for (let i = 0; i < row.length; i++) {
      if (headers[i] === 'Number of students supervised for SPL') {
        const text = `${row[i]} জন এর SPL সুপারভাইজর`;
        page.drawText(text, { x: 50, y, size: 12, font: customFont }); // Use the custom font
        y -= 20;
      }
      if(headers[i] == 'Number of students supervised for SPL') {
        const text = `${row[i]} জন এর SPL সুপারভাইজর`;
        page.drawText(text, { x: 50, y, size: 12, font: customFont  });
        y -= 20;
    }
    if(headers[i] == 'Number of SPL Reports Checked') {
        const text = `${row[i]} জন এর SPL রিপোর্ট মূল্যায়ন`;
        page.drawText(text, { x: 50, y, size: 12, font: customFont  });
        y -= 20;
    }
    if(headers[i] == 'Number of Thesis Reports Checked') {
        const text = `${row[i]} জন এর MS thesis মূল্যায়ন `;
        page.drawText(text, { x: 50, y, size: 12, font: customFont  });
        y -= 20;
    }
    }

    const pdfBytes = await pdfDoc.save();

    // Save the PDF file
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'output.pdf');
  };

  return (
    <div className="row">
      {row.map((cell, index) => {
    let N;
    if (headers[index] === 'Number of students supervised for SPL') {
      // Assuming cell contains the value of students supervised
      N = parseInt(cell);
    }

    return (
      <div className={`cell ${headers[index] === 'Number of students supervised for SPL' ? 'spl-cell' : ''}`} key={index}>
        <span className="header">{headers[index]}:</span> {cell}
      </div>
    );
  })}
  <button className='mb-10 text-red-700' onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default Row;
