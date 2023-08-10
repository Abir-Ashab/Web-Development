//structure
function amare_dak() {
    console.log("Hello world");
}
amare_dak();

//parameterized function
function tk_poysha_gun_kore_de(taka, poysha) {
    return taka*poysha;
}
var tk = 10, py = 14;
var gun_korsi = tk_poysha_gun_kore_de(tk, py);
console.log(gun_korsi);


//function expression
//another way of declaring function
var f1 = function(shei) { 
    console.log(shei);
}
f1("shei");


//arrow function
//another way of declaring function
var f2 = (shera) => { 
    console.log(shera);
}
f2("shera");

var foods = ["am", "jam", "kathal"];
//iterate array elements through function
//1st parameter : value
//2nd parameter : index
//3rd parameter : whole array
foods.forEach(function(value, i, array) {
    console.log(`Index : ${i} and value : ${value}`);
    console.log(`${array}`);
});



//function in object where it work as object's method
let info = {
    nam1 : "abir",
    nam2 : "ashab",
    age : 23,
    year : 3,
    location : "Dhaka",
    fullnam : function() {
        return `${this.nam1} ${this.nam2}`;
    }
};
console.log(info.fullnam());
