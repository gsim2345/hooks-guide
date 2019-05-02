import React from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

function App() {
  return (
    <div className="App">
      <Header />
      <hr />
      <Todo />
      <Auth />
    </div>
  );
}

export default App;
