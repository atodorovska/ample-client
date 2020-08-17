import React from 'react';
import './App.css';
import {Router, Route, Redirect} from "react-router-dom";
import { createBrowserHistory } from "history";
import MyProvider from "./context-store/myProvider";
import {Switch} from "react-router";
import Home from "./component/home";
import SharedItems from "./component/sharedItems";
import Discounts from "./component/discounts";
import ItemDetails from "./component/itemDetails";
import DiscountDetails from "./component/discountDetails";
import Profile from "./component/profile";

function App() {

    const history = createBrowserHistory();

    return (
      <>
          <MyProvider>
              <Router history={history}>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route exact path="/shared-items" component={SharedItems}/>
                      <Route exact path="/discounts" component={Discounts}/>
                      <Route exact path="/item-details/:id" component={ItemDetails}/>
                      <Route exact path="/discount-details/:id" component={DiscountDetails}/>
                      <Route exact path="/profile" component={Profile}/>
                      <Route render={() => (<Redirect to="/" />)} path={"*"}/>
                  </Switch>
              </Router>
          </MyProvider>
      </>
  );
}

export default App;
