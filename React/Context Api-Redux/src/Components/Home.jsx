import React from 'react';
import Details from './Details';

const Home = (props) => {
    const {count} = props
    return (
        <div>
            <h1>Count in home component : {count} </h1>
            <Details count = {count}></Details>
        </div>
    );
};

export default Home;