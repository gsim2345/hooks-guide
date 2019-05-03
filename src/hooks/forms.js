import {useState} from 'react';

// we can create our own Hooks. It allows to extract functionality from a component, and share it across multiple components. (like a mixin)
// example: we create our own hook , that validates input.
// functions that we want to use as hooks has to start with 'use'
// same rules apply as to other hooks, needs to use at the top level of a functional component. (not in blocks , if statements, etc)

export const useFormInput = () => {
    // input value
    const [value, setValue] = useState('');
    // validity
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = event => {
        setValue(event.target.value);

        if (event.target.value.trim() === '') {
            setValidity(false);
        } else {
            setValidity(true);
        }
    }

    // validity: ES6 shortcut. It means validity: validity
    // if both key and value are the same, it's enough to write it once
    return {value: value, onChange: inputChangeHandler, validity};
}