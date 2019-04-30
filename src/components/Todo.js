import React, { useState } from 'react';



const Todo = props => {
    // Hooks always has to be at the top of the component, at root level. No nesting.

    // anything can be passed into useState, that we want as state. In this case empty string makes sense for to do list.
    // useState returns an array, with two elements:
    //0. Current state - the full state 
    //1. inputState[1] - Reference to a function, that we can execute to update the state. that returns the full event object. - 

    // we use array destructuring. We can pull out elements of an array, and store them in separate variables.
    const [todoName, setTodoName] = useState('');
    // we can add as much new state as we want:
    // item 0 => curent state (todoList)
    // item 1 => function to update state with new value
    const [todoList, setTodoList] = useState([]);

    // We can also merge states into an object: 
    // But using separate is more readable, and managable.
    //const [todoState, setTodoState] = useState({ userInput: '', todoList: []});
    

    const inputChangeHandler = (event) => {
        // we execute this function to update the state with passing in the updated state
        setTodoName(event.target.value);
        // Need to set both, as it doesn't merge with the old state, but simply replacing it. 
        //setTodoState({userInput: event.target.value, todoList: todoState.todoList});
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        //setTodoState({userInput: todoState.userInput, todoList: todoState.todoList.concat(todoState.userInput)});
    }

    return <React.Fragment>
        <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
        <button type="button" onClick={todoAddHandler}>Add</button>
        <ul>
            {todoList.map(todo => (
                <li key={todo}>{todo}</li>
            ))}
        </ul>
    </React.Fragment>
};

export default Todo;