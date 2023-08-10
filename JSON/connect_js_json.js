var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var data = this.responseText;
        console.log(data);
        jsonData(data);
    }
}
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

function jsonData(json_obj) {
    console.log(json_obj);
    var js_obj = JSON.parse(json_obj);
    console.log(js_obj);
    for(x in js_obj.student) {
        console.log(x);//index of student array's elements
        let persons = js_obj.student;
        console.log(persons[x]);//values in array formate

        for(y in persons[x]) {
            let persons_element = persons[x][y];
            console.log(persons_element);//values
        }
    }
}

