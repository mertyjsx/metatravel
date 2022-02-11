import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css"
import Room from "./components/room"
import Navbar from "./components/navbar"
import { Buffer } from 'buffer';
global.Buffer = Buffer;
export default function App() {
  return (
    <Router>
      <div>
        
<Navbar></Navbar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route  path="/">
          <Room></Room>
          </Route>
          <Route exact path="/my-bookings">
        users
          </Route>
          <Route exact path="/:id">
        <Room></Room>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}