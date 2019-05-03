import React, { useState, useEffect, useReducer} from 'react';
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
    // useReducer is an alternative to that
    //const [todoList, setTodoList] = useState([]);

    // we add another state (solution for avoiding update issues)
    const [submittedTodo, setSubmittedTodo] = useState(null);

    const todoListReducer = (state, action) => {
        switch(action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo) => {
                    return todo.id !== action.payload
                });
            default: 
                return state;
        }
    }

    // 1. argument: reducer
    // 2. argument: starting state
    // 3. argument: might be an action we want to execute
    // we get back an array with two elements
    const [todoList, dispatch] = useReducer(todoListReducer, []);

    // We can also merge states into an object: 
    // But using separate is more readable, and managable.
    //const [todoState, setTodoState] = useState({ userInput: '', todoList: []});
    
    // best to use for callback functions with side effects, fx. ajax calls, adding event listeners
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
            
            //setTodoList(todos);
            // with useReducer we dispatch an action instead: 
            dispatch({type: "SET", payload: todos});

        });

        // We can add a cleanup , to clean up after the last useEffect call
        return () => {
            console.log('Cleanup');
        }
    }, [] );

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    }

    // example for cleanup
    // in this case useEffect will be called at every render cycle, and will add new event listeners at every render. 
    // results in really bad performance. 
    // we want to clean up the old listener before we attach a new one. 
    useEffect(() => {
        // listening to mouse movements
        document.addEventListener('mousemove', mouseMoveHandler);
        // add a cleanup function here:
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    // by adding [] 
    //=> adding event listener only when component gets loaded 
    //=> cleanup happens only at when component gets destroyed. (at componentWillUnmount())
    }, [] );


    useEffect(() => {
        //this will run on every render cycle and a render cycle will be triggered when we call set submitted todo here because whenever the state changes, React re-renders
        if (submittedTodo) {
            // we only want to setTodoList if submittedTodo has a value. (on reload there is no value)
            //setTodoList(todoList.concat(submittedTodo));
            // with useReducer we dispatch an action instead: 
            dispatch({type: 'ADD', payload: submittedTodo});
        }
        
        // we want to run this effect only when submittedTodo changes, so we check for that. 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submittedTodo]);

    const inputChangeHandler = (event) => {
        // we execute this function to update the state with passing in the updated state
        setTodoName(event.target.value);
        // Need to set both, as it doesn't merge with the old state, but simply replacing it. 
        //setTodoState({userInput: event.target.value, todoList: todoState.todoList});
    };

    const todoAddHandler = () => {
        
        //setTodoState({userInput: todoState.userInput, todoList: todoState.todoList.concat(todoState.userInput)});
        axios.post('https://test-hooks-7593f.firebaseio.com/todos.json', {name: todoName})
        .then(res => {
            setTimeout(() => {
                const todoItem = {id: res.data.name, name: todoName}
                console.log(res);
                // if we use this update, and we add new items very fast, not all of them will be rendered to the screen, as the state updates async, and doesn't allways have the correct state.
                //setTodoList(todoList.concat(todoItem));
                // To avoid update issues, needs to use with prevState: 
                //setTodoList(prevTodoList => prevTodoList.concat(todoItem))

                // We can fix this with hooks too. (But using prevTodoList is a much better solution)
                // not adding to the list first, but add to submittedTodo, and store there.
                setSubmittedTodo(todoItem);
            }, 3000);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const todoRemoveHandler = todoId => {
        // removes from the backend:
        // we use template literal to dynamically delete
        axios.delete(`https://test-hooks-7593f.firebaseio.com/todos/${todoId}.json`)
        .then(res => {
            // removes on the frontend
            dispatch({type: "REMOVE", payload: todoId})
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    return <React.Fragment>
        <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={todoName}/>
        <button type="button" onClick={todoAddHandler}>Add</button>
        <ul>
            {todoList.map(todo => (
                <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>
            ))}
        </ul>
    </React.Fragment>
};

export default Todo;