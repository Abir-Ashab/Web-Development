import React from 'react';

const Details = (props) => {
    const {name, email, phone, website} = props.detail
    return (
        <div>
            <p>Name : {name} </p>
            <p>Email : {email} </p>
            <p>Phone number : {phone} </p>
            <p>Website : {website} </p>
        </div>
    );
};

export default Details;