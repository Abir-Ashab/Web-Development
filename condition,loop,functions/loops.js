// while loop is same as c/c++
var t = 4;
while(t--) {
    // 
}

// for loop is also same as c/c++
for(var a = 1; a < 10; a++) {
    // 
}

// break, continue is also same


// string,array iteration
var b = "hello world";
for(var i = 0; i < b.length; ++i) {
    console.log(b[i]);
}

let Name = "hello world, i am niloy";
let student = {
    nam : "abir",
    age : 23,
    year : 3,
    location : "Dhaka"
};
//for in loop ---> we will get index by using "in" 
for( var x in Name ) {
   console.log(x); //it will output the index
}

//for of loop ---> we will get value by using "of" 
for( var x of Name ) {
    console.log(x); //it will output the value in each index
}
for( var x in student ) {
    console.log(x); //it will output the object name,cause object doesn't have any index
}
