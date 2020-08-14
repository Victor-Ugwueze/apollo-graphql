import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from './context/auth-context';
import Login from './Login';
import TodoList from './TodoList';

import 'semantic-ui-css/semantic.min.css';
import './styles.css';

export default function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <Switch>{user.isAuthenticated ? <TodoList /> : <Login />}</Switch>
    </div>
  );
}
