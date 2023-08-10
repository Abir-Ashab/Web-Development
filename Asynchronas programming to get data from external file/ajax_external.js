document.getElementById('id').addEventListener('click', loadData);
function loadData() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.chucknorris.io/jokes/random/', true);//importing data(joke) from external file

    xhr.onload = function() {
        if(this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            var joke = data.value;
            console.log(joke);
        }
    }
    xhr.send();
    console.log(xhr);
}