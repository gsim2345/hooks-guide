import React from 'react';

// context API :  API which allows you to pass state or values around your component tree without having to pass props all the time
// we pass the default value/values, in this case false status, and an empty function
const authContext = React.createContext({status: false, login: () => {}});

export default authContext;