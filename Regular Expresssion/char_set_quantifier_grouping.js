// "[]"
var re = /h[eah...]llo/i; //either 'a' or 'a' or 'h or '.'
var str = "Hello World;"
var ans = re.test(str);
console.log(ans);//true

re = /^[ef]ello/i;//must start with e or f
ans = re.test(str);
console.log(ans);//false

re = /^[a-f]ello/i;//must start with a,b,,c,d,e,f jekono ekta
ans = re.test(str);
console.log(ans);//false


// "{}" -> quantify
re = /hel{2}o/i;//must be 2 consecutive l
ans = re.test(str);
console.log(ans);//true

re = /hel{2, 5}o/i;//must be {2, 3, 4, 5} jekono ekta shonghkok consecutive "l"
ans = re.test(str);
console.log(ans);//true

re = /hel{2, }o/i;//must be 2, 3, 4, 5...... jekono ekta shonghkok consecutive "l"
ans = re.test(str);
console.log(ans);//true

// "()" -> grouping
re = /^01([0-9]){5}$/i;// /^[0-9][0-9][0-9][0-9][0-9]/ similar 
str = "01794406966";
ans = re.test(str);
console.log(ans);//false

// bd phn number checker
re = /^01([0-9]){9}$/i;// 
str = "0179440696689"; //"01794406966" eta dile true hobe
ans = re.test(str);
console.log(ans);//false, cause number beshi


re = /^(\+)?(88)?01([0-9]){9}$/i;// (\+)? -> "+" thakbe nahoy kisui thakbena...88 thakbe nahoy kisui thakbena
str = "+8801794406966"; 
ans = re.test(str);
console.log(ans);//true