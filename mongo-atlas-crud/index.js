const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const uri = "mongodb+srv://niloy:1234@basic-crud.wh7yf.mongodb.net";
const port = 4000;
const app = express();

app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

const client = new MongoClient(uri);
client.connect();
console.log("Connected to MongoDB");

const productsCollection = client.db("product").collection("product");
const infoCollection = client.db("test").collection("info");

const newListing = {
    name: "niloy",
    age: 23,
    department: "iit"
};
infoCollection.insertOne(newListing);
console.log(`Initial info inserted: ${newListing.name}`);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post("/addProduct", async (req, res) => {
  const product = req.body;
  productsCollection.insertOne(product);
  console.log("Product added:", product);
  res.redirect('/'); // homepage e back jabe add korar por
});

app.get("/products", async (req, res) => {
    const products = await productsCollection.find({})
    .toArray() // find({}) means find all elements of the collection 
    res.send(products);
});

app.delete('/delete/:id', (req, res) => {
    const idd = req.params.id;
    productsCollection.deleteOne({_id : new ObjectId(idd)})
    .then(result => {
        console.log(result); 
        res.send(result.deletedCount > 0)
    })
    console.log("ID from backend: ", idd);
})

app.get('/product/:id', async (req, res) => {
    const idd = req.params.id;
    const product = await productsCollection.findOne({ _id: new ObjectId(idd) });
    res.send(product);
});
app.patch('/update/:id', async (req, res) => {
    const idd = req.params.id;
    productsCollection.updateOne({ _id: new ObjectId(idd) }, {
        $set : {
            price : req.body.price
        }
    })
    .then( result => {
        res.send(result.modifiedCount > 0)
    })
    // res.send(product);
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
