import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './App.css';
import Home from "./pages/Home/Home"
import CreateWallet from "./pages/CreateWallet/CreateWallet"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create-wallet" component={CreateWallet} />
        <Route path="/" component={Home} />

      </Switch>
    </BrowserRouter>
  )
}

export default App;
