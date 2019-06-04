import React from 'react';
import AddBook from './Compoents/addBook';
import ViewBooks from './Compoents/viewBooks';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route path="/" exact strict render={() => {
                    return (<Redirect push to="/viewBook" />);
                }} />
                <Route path="/viewBook" exact strict render={(props) => {
                    return (<ViewBooks {...props} />);
                }} />
                <Route path="/addBook" exact strict render={(props) => {
                    return (<AddBook {...props} />);
                }} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
