import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import PrivateRoute from './utils/privateRoute'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
          <PrivateRoute path='/bubbles' component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
