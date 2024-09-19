import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Friend = (props) => {
  const { name, email, id } = props.friend;
  console.log(name, email);
  
  const navigate = useNavigate(); 

  const handleClick = () => {
    const url = `/friend/${id}`; 
    navigate(url); 
  };

  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <button onClick={handleClick}>Click me</button> 
      {/* Or use it where it doesn't require any extra function <Link to={`/friend/${id}`}>Show details of: {id}</Link> */}
    </div>
  );
};

export default Friend;
