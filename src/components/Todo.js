import React, { useState, useEffect } from 'react';
import axios from 'axios';



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
    

    // pass a function that needs to be executed
    // will be executed when this component runs for the first time
    // if we call a function just out of useEffect that effects state, will be called during the render cycle, and it's bad for performance reasons. 
    // instead call as a callback function passed to useEffect
    // it runs after every render cycle, not only once like componentDidMount
    // after result arrived, and we change state => rerenders again, ==> sends new request ==> infinite loop
    // can add a second argument to solve this ==> an array of values
    // we can look at those values, and only if one of the values of the array has changed, should the effect run. 
    // if you want to run an effect only on mounting, pass an empty array []
    // passing in empty array ==> like replicating componentDidMount
    useEffect(() => {
        axios.get('https://test-hooks-7593f.firebaseio.com/todos.json')
        .then(result => {
            console.log(result);
            const todoData = result.data;
            const todos = [];
            for (const key in todoData) {
                todos.push({id: key, name: todoData[key].name})
            }
            console.log(todos);
            setTodoList(todos);
        })
    }, [todoName] );

    const inputChangeHandler = (event) => {
        // we execute this function to update the state with passing in the updated state
        setTodoName(event.target.value);
        // Need to set both, as it doesn't merge with the old state, but simply replacing it. 
        //setTodoState({userInput: event.target.value, todoList: todoState.todoList});
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        //setTodoState({userInput: todoState.userInput, todoList: todoState.todoList.concat(todoState.userInput)});
        axios.post('https://test-hooks-7593f.firebaseio_.com/todos.jso', {name: todoName})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return <React.Fragment>
        <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
        <button type="button" onClick={todoAddHandler}>Add</button>
        <ul>
            {todoList.map(todo => (
                <li key={todo.id}>{todo.name}</li>
            ))}
        </ul>
    </React.Fragment>
};

export default Todo;