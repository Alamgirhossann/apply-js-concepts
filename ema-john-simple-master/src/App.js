import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NotFound from './components/NotFound/NotFound';
import LogIn from './components/LogIn/LogIn';
import { PrivateRoute } from './components/LogIn/useAuth';
import Shipment from './components/Shipment/Shipment';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import PrivetRout from './components/PrivateRoute/PrivetRout';

firebase.initializeApp(firebaseConfig);

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
   
      
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
        <Header></Header>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
          <PrivetRout path="/inventory">
              <Inventory></Inventory>
          </PrivetRout>
          <Route exact path="/">
            <Shop></Shop>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
            </Route>
            <Route path='/logIn'>
              <LogIn></LogIn>
            </Route>
            <PrivetRout path='/shipment'>
              <Shipment></Shipment>
            </PrivetRout>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          
          </Switch>
        </Router>
        </UserContext.Provider>
   
   
  );
}

export default App;
