import React from 'react';

const Header = (props) => {
    const {count, setCount} = props
    return (
        <div>
            <h1>Count in Header : {count} </h1>
            <button onClick={() => setCount(count + 1)}>Increase by 1</button>
        </div>
    );
};

export default Header;