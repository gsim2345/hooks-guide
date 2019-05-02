import React, {useState} from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = props => {

  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = (pageName) => {
    setPage(pageName);
  };

  const login = () => {
    setAuthStatus(true);
  };

  //onLoadTodos={switchPage.bind(this, 'todos')} is the same as  
  //onLoadTodos={() => switchPage('todos')}

  return (
    <div className="App">
    { /* we wrap everything that should be able to receive the context with the Provider, and now anywhere in these pages we can get this context without passing props */}
  { /* now our context is an object holding the current status (a boolian) and a reference to a function that allows us to change that boolian */}
    <AuthContext.Provider value={{status: authStatus, login: login}}>
      <Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')}/>
      <hr />
      {page === 'auth' ? <Auth/> : <Todo />}
    </AuthContext.Provider>
      
    </div>
  );
  }


export default App;
