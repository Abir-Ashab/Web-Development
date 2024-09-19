import React from 'react';
import ShowDetails from './ShowDetails';

const Details = (props) => {
    const count = props.count
    return (
        <div>
            <h1>Count in details : {count}</h1>
            <ShowDetails count = {count}> </ShowDetails>
        </div>
    );
};

export default Details;