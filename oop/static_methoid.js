class student {
    constructor(fname, lname, dob) {
        this.fname = fname;
        this.lname = lname;
        this.dob = dob;
    }
    greetings() {
        console.log("hello world");
    }
    static greet() {
        console.log("shera world");
    }
}
let p1 = new student("abir", "ashab", "12/29/2001");
//to call non static method i need to call it by an object
console.log(p1.greetings());
//need to call it by its class name
console.log(student.greet());