var student = {
    name : "Abir",
    Roll : 1315,
    Year : "third"
};

var JS_to_JSON = JSON.stringify(student);
console.log(JS_to_JSON);//JSON formate

var JSON_to_JS = JSON.parse(JS_to_JSON);
console.log(JSON_to_JS);//JS formate

var student = {
    "name" : "Abir",
    "Roll" : 1315,
    "Year" : "third"
};//dekhe mone hocche json formate e likhechhi but js will treat it as its object
console.log(student);
// nicher moto kore print hobe
// var student = {
//     name : "Abir",
//     Roll : 1315,
//     Year : "third"
// };