import React, { useState } from 'react';



const Todo = props => {
    // anything can be passed into useState, that we want as state. In this case empty string makes sense for to do list.
    // useState returns an array, with two elements:
    //0. Current state - the full state 
    //1. inputState[1] - Reference to a function, that we can execute to update the state. that returns the full event object. - 

    // we use array destructuring. We can pull out elements of an array, and store them in separate variables.
    const [todoName, setTodoName] = useState('');
    

    const inputChangeHandler = (event) => {
        // we execute this function to update the state with passing in the updated state
        setTodoName(event.target.value);
    };

    return <React.Fragment>
        <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
        <button type="button">Add</button>
        <ul></ul>
    </React.Fragment>
};

export default Todo;