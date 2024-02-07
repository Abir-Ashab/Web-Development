import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';



function Row({ row, headers }) {
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const N = null, M = null;
    let y = height - 50;
    for (let i = 0; i < row.length; i++) {
        if(headers[i] == 'Number of students supervised for SPL') {
            const text = `Number of students supervised for SPL is : ${row[i]} জন`;
            console.log(text);
            page.drawText(text, { x: 50, y, size: 12 });
            y -= 20;
        }
        if(headers[i] == 'Number of SPL Reports Checked') {
            const text = `Number of SPL Reports Checked is : ${row[i]}`;
            page.drawText(text, { x: 50, y, size: 12 });
            y -= 20;
        }
        if(headers[i] == 'Number of Thesis Reports Checked') {
            const text = `Number of Thesis Reports Checked is : ${row[i]}`;
            page.drawText(text, { x: 50, y, size: 12 });
            y -= 20;
        }
        if(headers[i] ==  'Number of students supervised for Thesis') {
            const text = `Number of students supervised for MS thesis is :  : ${row[i]}`;
            page.drawText(text, { x: 50, y, size: 12 });
            y -= 20;
        }
    }

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
