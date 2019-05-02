import React, {useContext } from 'react';
import AuthContext from '../auth-context';

// we get access to our context here with a hook (useContext)
const Auth = props => {

    const auth = useContext(AuthContext);
    return <button onClick={auth.login}>Log in!</button>
}

export default Auth;