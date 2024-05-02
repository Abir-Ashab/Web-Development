import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [people, setPeople] = useState([]);
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=15')
      .then(res => res.json())
      .then(data => setUsers(data.results));
  }, []);
  const addPeople = (man) => {
    setPeople([...people, man])
    // ()...people, man) means people += man
  } 
  return (
    <>
      {
        people.map(m => <p> He is {m.first}</p>)
      }
      {users.map((user) => (
        <User user={user} addPeople = {addPeople}></User>
      ))}
    </>
    // if you are encountering error, and its because of no index then use the following
    // <>
    //   {users.map((user, index) => (
    //     <User key={index} user={user}></User>
    //   ))}
    // </>
  );
}
const addPhone = (phone) => {
  console.log(phone);
} 
function User(props) {
  const { name, email, phone } = props.user;
  return (
    <>
      <p>{name.title} {name.first} {name.last}</p>
      <p>Her email is "{email}"</p>
      <button onClick={() =>props.addPeople(name)}>Add name</button> 
      <button onClick={addPhone(phone)}>Add Phone</button> 
      {/* uporer eta dile jokhon dom "()" ei type kichhu dekhe she bhabe je ekhon e hoyto call korte hobe, tai button e click chhara o button er kaaj hoye jay */}
      <button onClick={() => addPhone(phone)}>Add Phone</button>
      {/* ekhane tai age ekta arrow function diye dise jaate eta call hoy oi time e and onclick e ami jeta chaitesi shetai call hoy */}
    </>
  );
}

export default App;
