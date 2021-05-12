import React from "react"
import {BrowserRouter,Route, Switch } from "react-router-dom"
import './App.css';
import Home from "./pages/Home/Home"
import SignIn from "./pages/SignIn/SignIn"

const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={SignIn} />
      <Route path="/home" component={Home} />
    </Switch>
    </BrowserRouter>
  )
}

export default App;
