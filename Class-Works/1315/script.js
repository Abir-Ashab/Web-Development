const alphabetSequence = '0ABCDEFGHI';

function getAlphabetLetter(index) {
    if(index <= 9) {
        return alphabetSequence[index % alphabetSequence.length];
    } else {
        let result = '';
        const tensPlace = Math.floor(index / 10);
        const onesPlace = index % 10;
        result += alphabetSequence[tensPlace % alphabetSequence.length];
        result += alphabetSequence[onesPlace % alphabetSequence.length];
        return result;
    }
}

function generateMultiplicationTable() {
    const table = document.createElement('table');
    table.setAttribute('cellpadding', '3px');
    table.setAttribute('cellspacing', '0px');

    for (let rowNumber = 1; rowNumber <= 6; rowNumber++) {
        const row = document.createElement('tr');

        for (let columnNumber = 1; columnNumber <= 5; columnNumber++) {
            const cell = document.createElement('td');
            let text = '';

            const letter1 = getAlphabetLetter(rowNumber);
            const letter2 = getAlphabetLetter(columnNumber);
            const multiplicationResult = getAlphabetLetter(rowNumber * columnNumber);
            const additionResult = getAlphabetLetter(rowNumber + columnNumber);
            
            text += `${letter1} * ${letter2} = ${multiplicationResult}, ${additionResult}`;

            cell.textContent = text;
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
    return table;
}

const containerElement = document.getElementById('niloy');
containerElement.appendChild(generateMultiplicationTable());
