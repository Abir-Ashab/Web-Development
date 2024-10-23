import React, { useState } from 'react';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/posting', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: inputValue }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setResponseMessage(data.name);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h1>Send Data to Backend API</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userInput">Enter something:</label>
                <input
                    type="text"
                    id="userInput"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Type here..."
                />
                <button type="submit">Send Data</button>
            </form>
            <p>Response: {responseMessage}</p>
        </div>
    );
}

export default App;
