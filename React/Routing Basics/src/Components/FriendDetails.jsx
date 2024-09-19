import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Details from './Details';

const FriendDetails = () => {
    const {id} = useParams()
    const [detail, setDetail] = useState([])
    useEffect (() => {
        fetch("https://jsonplaceholder.typicode.com/users/" + id)
        // Or  fetch(`https://jsonplaceholder.typicode.com/users/${id}`) 
        .then(res => res.json())
        .then(data => setDetail(data))
    }, [])
    return (
        <div>
            <Details detail = {detail}></Details>
        </div>
    );
};

export default FriendDetails;