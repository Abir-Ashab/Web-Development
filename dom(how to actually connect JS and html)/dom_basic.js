let list = document.getElementsByClassName('sample-class');
console.log(list[0]);
list[0].style.background = 'blue';
list[0].style.color = 'red';

let list2 = document.getElementsByTagName('li');
console.log(list2[0]);
list2[0].style.background = 'blue';
list2[0].style.color = 'red';

let l = document.querySelector('ol').getElementsByTagName('li');
let k = Array.from(l);
k.forEach(function(item) {
    console.log(item);
});
l = document.querySelectorAll('ol li');//querySelectorAll dile eta auto array hoye jay,conversion lagenba
console.log(l);
//querySelectorAll er joto natok
//document.querySelectorAll()
// class -> .
// id -> #
// tag -> nothing
l = document.querySelectorAll('.sample-class');
console.log(l);


//even-odd iteration
let liodd = document.querySelectorAll('li:nth-child(odd)');
console.log(liodd);
liodd[0].style.background = 'grey';

let lieven = document.querySelectorAll('li:nth-child(even)');
console.log(lieven);
lieven.forEach(function(item) {
    console.log(item);
});