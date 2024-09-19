import React, { useContext } from 'react';
import { detailContext } from '../App';
import Changer from './Changer';

const ShowDetails = (props) => {
    const count = props.count
    const [detail, setDetail] = useContext(detailContext)
    return (
        <div>
            <h1>Count in ShowDetails : {count}</h1>
            <h1>Count using context api in ShowDetails : {detail} </h1>
            <Changer></Changer>
        </div>
    );
};

export default ShowDetails;