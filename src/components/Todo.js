import React, { useState } from 'react';



const Todo = props => {
    // anything can be passed into useState, that we want as state. In this case empty string makes sense for to do list.
    // useState returns an array, with two elements:
    //0. Current state - the full state 
    //1. inputState[1] - Reference to a function, that we can execute to update the state. that returns the full event object. - 

    const inputState = useState('');

    const inputChangeHandler = (event) => {
        // we execute this function to update the state with passing in the updated state
        inputState[1](event.target.value);
    };

    return <React.Fragment>
        <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={inputState[0]}/>
        <button type="button">Add</button>
        <ul></ul>
    </React.Fragment>
};

export default Todo;