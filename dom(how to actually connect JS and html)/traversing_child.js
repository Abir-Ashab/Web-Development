var li = document.querySelector('ol li:first-child');
//val = val.firstElementChild;
var val = document.querySelector('ol');
console.log(li);

let list = val;
list = val.childNodes;//console e text mane "enter"
list = val.children;//ekhn kono text dekhabe na

val.children[0].textContent = "Hello";

list = val.children[0];
list = val.firstChild;//text ashbe
list = val.lastElementChild;//last item ashbe

list = val.childElementCount;
list = val.parentElement;
list = val.parentElement.parentElement;
list = val.firstElementChild;
list = li.nextElementSibling.nextElementSibling;
list = li.previousElementSibling;
console.log(list);