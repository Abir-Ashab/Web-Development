class student {
    constructor(fname, lname, dob) {
        this.fname = fname;
        this.lname = lname;
        this.dob = dob;
    }
    getAge() {
        let bday = new Date(this.dob);
        let diff = Date.now() - bday.getTime();
        let agedate = new Date(diff);
        return Math.abs(agedate.getUTCFullYear() - 1970);
    }
}
let p1 = new student("abir", "ashab", "12/29/2001");
console.log(p1);
console.log(p1.getAge());