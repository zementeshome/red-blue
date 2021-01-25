import React  from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
