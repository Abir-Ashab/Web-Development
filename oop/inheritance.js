class person {
    constructor(fname, lname) {
        this.fname = fname;
        this.lname = lname;
    }
    greeting() {
        return `hello ${this.fname} ${this.lname}!`;
    }
}

class customer extends person {
    constructor(fname, lname, age, gender) {
        super(fname, lname);
        this.age = age;
        this.gender = gender;
    }
}
let amar_nam = new person("abir", "ashab");
console.log(amar_nam);
console.log(amar_nam.greeting());

let amar_porichoy = new customer("abir", "niloy", 21, "male");
console.log(amar_porichoy);
console.log(amar_porichoy.greeting());