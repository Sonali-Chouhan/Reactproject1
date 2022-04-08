import "./App.css";
import TableComponent from "./TableComponent";
import FromComponent from "./FromComponent"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import React from "react";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/table" component={TableComponent} />
            <Route exact path="/test" component={FromComponent} />
            <Route exact path="/test/:id"  component={FromComponent} />
          </Switch>
        </Router>
      </div>
    );
  }
}


 
