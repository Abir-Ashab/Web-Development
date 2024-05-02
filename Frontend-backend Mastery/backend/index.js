import express from "express"; //module type e
const app = express();

app.get('/', (req, res) => {
    res.send("server is ready")
})

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
          'id': 1,
          "title": "First Item",
          "content": "This is the content of the first item."
        },
        {
          "id": 2,
          "title": "Second Item",
          "content": "This is the content of the second item."
        },
        {
          "id": 3,
          "title": "Third Item",
          "content": "This is the content of the third item."
        },
        {
          "id": 4,
          "title": "Fourth Item",
          "content": "This is the content of the fourth item."
        },
        {
          "id": 5,
          "title": "Fifth Item",
          "content": "This is the content of the fifth item."
        }
      ]
      
    res.send(jokes)
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server is running");
})