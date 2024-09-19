import { useEffect, useState } from 'react';
import React from 'react';
import Friend from './Friend';

const Home = () => {
  const [Friends, setFriends] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/`)
      .then(res => res.json())
      .then(data => setFriends(data));
  }, []);

  return (
    <div>
      {
        Friends.map(friend => (
          <div
            key={friend.id} // Adding a unique key prop for each item
            style={{
              border: '1px solid black', // Adding border style
              padding: '10px', // Optional: Adding padding for better appearance
              margin: '10px 0' // Optional: Adding margin between items
            }}
          >
            <Friend friend={friend} />
          </div>
        ))
      }
    </div>
  );
};

export default Home;
