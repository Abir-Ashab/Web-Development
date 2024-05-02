import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([]) //just an array
  useEffect(() => {
    axios.get('/api/jokes') //we could use fetch here
    .then((response) => { //if successful, then response er data array te rakho
      setJokes(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  })
  // useEffect(() => {
  //   fetch('/api/jokes')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => setJokes(data))
  //     .catch(error => {
  //       console.error('Fetch error:', error);
  //     });
  // });
  return (
    <>
     <h1>Chai Aur Fullstack</h1>
     <p>Jokes are : {jokes.length} </p>
      {
      /* ekhane mainly amra html niye kaaj kori, jodi js proiyojon hoy then you must do it inside {} */
      }
     {
      jokes.map((joke, index) => ( //if I use {} instead of () we must return something
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))
    }
    </>
  )
}
export default App
