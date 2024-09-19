import React from 'react';
import { useContext } from 'react';
import { detailContext } from '../App';
const Changer = () => {
    const [detail, setDetail] = useContext(detailContext)
    return (
        <div>
            <button onClick={() => setDetail(detail+2)}>Increase by 2</button>
        </div>
    );
};

export default Changer;