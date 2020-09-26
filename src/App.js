import React from 'react';

// React Router Components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './views/Home/Home';
import Users from './views/Users/Users';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home }></Route>
        <Route path="/user/:id" component={ Users }></Route>
      </Switch>
    </Router>
  );
}

export default App;
