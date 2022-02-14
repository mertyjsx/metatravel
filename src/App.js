import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import * as nearAPI from "near-api-js";
import "./App.css";
import Room from "./components/room";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import { Buffer } from "buffer";
global.Buffer = Buffer;
const { connect, keyStores, WalletConnection } = nearAPI;
const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

export default function App() {
  const [near, setNear] = useState();
  const [wallet, setWallet] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    initNear();
  }, []);

  const initNear = async (data) => {
    const near = await connect(config);
    const wallet = new WalletConnection(near);
    setNear(near);
    setWallet(wallet);

    if (wallet.isSignedIn()) {
      setUser(wallet.getAccountId());
    }

  };

  const signOut = () => {
    wallet.signOut();
    setUser(null);
  };

  return (
    <Router>
      {near && wallet && (
        <div>
          {user && (
            <Navbar near={near} wallet={wallet} signOut={signOut}></Navbar>
          )}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Room near={near} wallet={wallet} user={wallet?.getAccountId()} />
            </Route>
            <Route exact path="/profile">
              {wallet?.isSignedIn() ? <Profile near={near}  user={wallet?.getAccountId()}/> : <Redirect to="/"></Redirect>}
            </Route>
            <Route exact path="/:id">
              <Room near={near} wallet={wallet} user={wallet?.getAccountId()} />
            </Route>
          </Switch>
        </div>
      )}
    </Router>
  );
}
