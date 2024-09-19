// for video tutorial, watch : E:\COMPLETE WEB DEVELOPMENT COURSE (UPDATE)\Jm Update Part 2\jm-6\jm-6\34 SIMPLE REACT SPA WITH MULTIPLE COMPONENTS\34-11
import React from 'react';

const Test = (props) => {
    return (
        <div>
            <p>this is {props.addition}</p>
            {/* without "()=>" it means directly call the addition function, thats why without any button click it is getting executed(look at console, you will see 5) */}
            <button onClick={props.addition(1, 4)}> get sum </button>
            {/*Using "()=>" means calling a function inside another(the "()=>") function, so first the "()=>" function get called, and after click the addition function get called */}
            <button onClick={()=> props.addition(1, 4)}> get sum </button>
        </div>
    );
};

export default Test;