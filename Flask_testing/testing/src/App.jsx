import { useState, useEffect } from 'react';

function App() {
  const [explanation, setExplanation] = useState('');  
  const [comment, setComment] = useState(''); 
  const [responseMessage, setResponseMessage] = useState(''); 

  const handleSubmit = () => {
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: comment }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setResponseMessage(data.sentiment);
      setExplanation(data.explanation); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter comment"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Response:</h3>
        <p>{responseMessage}</p>
        <h3>Explanation:</h3>
        <div dangerouslySetInnerHTML={{ __html: explanation }} />
      </div>
    </>
  );
}

export default App;
