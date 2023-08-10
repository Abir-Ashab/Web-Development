document.getElementById('id').addEventListener('click', loadData);
function loadData() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'data.txt', true);

    xhr.onload = function() {
        // http responses
        // 200 = ok
        // 403 = forbidden
        // 404 = not found

        // readystate values
        // 0 = req not initialized
        // 1 = server connection established
        // 2 = req received
        // 3 = processing req
        // 4 = req finished and ready to response
        
        console.log(this.readyState);
        if(this.status == 200 && this.readyState == 4) {
            console.log(this.responseText);
        }
    }
    xhr.send();
    console.log(xhr);
}