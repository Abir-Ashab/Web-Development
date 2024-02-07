const fs = require('fs');

fs.writeFileSync('myfile.txt', 'hello guys')
fs.appendFileSync('myfile.txt', ' how are you') //it will be appended
fs.writeFileSync('myfile.txt', 'how are you') //it will be replaced


const data = fs.readFileSync('myfile.txt');
console.log(data); 
console.log(data.toString());