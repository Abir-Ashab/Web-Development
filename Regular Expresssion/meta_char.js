var met = /hello/i;
var str = "Hello world";
var ans = met.test(str);
console.log(ans);

// ^
met = /^hello/i; //^ means after that which contains that must be in the first position
str = "hello bd";
ans = met.test(str);
console.log(ans);//true

str = "bd hello";
ans = met.test(str);
console.log(ans);//false

// $
met = /hello$/i; //$ means before that which contains that must be in the last position
str = "hello bd";
ans = met.test(str);
console.log(ans);//false

str = "bd hello";
ans = met.test(str);
console.log(ans);//true

// .
met = /^h.llo$/i; //"."(dot)diye bujhay oi position e ekta char boshte pare
str = "hello";
ans = met.test(str);
console.log(ans);//true

// *
met = /h*llo/i; //"*"(star)diye bujhay oi position e any char boshte pare o or more times
str = "h339948939e......llo";
ans = met.test(str);
console.log(ans);//true

// ?
met = /he?llo/i; //"?" diye bujhay oi position er ager position e je char achhe str e oi position  e either ota thakbe nahole null thakbe,onno kisu dile false
str = "hallo";
ans = met.test(str);
console.log(ans);//false


// +
met = /hello+/i; //one or more times "hello" thakbe
str = "hello hello";
ans = met.test(str);
console.log(ans);//true