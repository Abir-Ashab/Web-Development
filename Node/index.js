const express = require('express')
const bodyParser = require('body-parser'); 
const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors()); 

const fruits = ['apel', 'komola', 'alu', 'aam']
const rootcall = (req, res) => {
    res.send("Thanks brother, grateful")
}
const bananacall = (req, res) => {
    res.send("kola khao, shokti barao")
}

const folchai = (req, res) => {
    const index = (req.params.fol);   
    const fruitsname = fruits[index]
    console.log(req.query);
    
    res.send({index, fruitsname})
}
const posts = (req, res)=> {
    console.log(req.body.content);
    res.send(req.body)
}

app.get('/', rootcall)
app.get('/fruits/banana', bananacall)
app.get('/fruits/:fol', folchai)
app.post('/posting', posts)
app.listen(3000, () => console.log('listening to 3000'))