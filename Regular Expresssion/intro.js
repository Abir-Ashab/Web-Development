let k = /hello/;//case insensitive,mane big letter ke big small ke small bhabe


let str = "Hello Reshmi";


//exec() 
let result = k.exec(str); //chech whether any string of str match with k or not
console.log(result);
k = /hello/i; // i = to make the expression case insensitive
str = "sjcdcnnhello jdjckjd";//konobhabe hello pailei holo,tar first index jekhane match kore oitake return korbe and array(char,int) return korbe
result = k.exec(str);
console.log(result);



// test()
var ans = k.test(str);//return true-false, if match return true else false
console.log(ans);


// match() -> same as exec()...just place vinno
ans = str.match(k);
console.log(ans);

// search() -> return first match or -1
ans = str.match(k);
console.log(ans);

// replace() ->replace regular expression in another string or array
str = "deshe hello hello kortese shobai";//fist ta count e nibe
var stored_string = str.replace(k, "Hi");//first e jekhane k or hello pabe shekhane hi boshiye dibe
console.log(stored_string);