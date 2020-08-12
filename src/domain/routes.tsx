import React from "react";
import {Redirect, Route} from 'react-router-dom'
import {Switch} from "react-router";
import SharedItems from "../component/sharedItems";
import Discounts from "../component/discounts";
import ItemDetails from "../component/itemDetails";
import DiscountDetails from "../component/discountDetails";
import Home from "../component/home";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/shared-items" component={SharedItems}/>
            <Route exact path="/discounts" component={Discounts}/>
            <Route exact path="/item-details/:id" component={ItemDetails}/>
            <Route exact path="/discount-details/:id" component={DiscountDetails}/>
            <Route render={() => (<Redirect to="/" />)} path={"*"}/>
        </Switch>
    )
};

export default Routes;