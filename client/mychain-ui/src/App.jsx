import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import CreateWallet from "./pages/CreateWallet/CreateWallet";
import DashBoard from "./pages/Dashboard/Dashboard";
import Mine from "./pages/Mine/Mine";
import Send from "./pages/Send/Send";
import { SocketContext, socket } from "./context/socket";
import AccessWallet from "./pages/AccesWallet/AccessWallet";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route path="/send" component={Send} />
          <Route path="/mine" component={Mine} />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/access-wallet" component={AccessWallet} />
          <Route path="/create-wallet" component={CreateWallet} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
};

export default App;
