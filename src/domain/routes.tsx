import React from "react";
import {Redirect, Route} from 'react-router-dom'
import {Switch} from "react-router";
import Home from "../component/home";
import SharedItems from "../component/sharedItems";
import Discounts from "../component/discounts";

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/shared-items" component={SharedItems}/>
                <Route exact path="/discounts" component={Discounts}/>
                <Route render={() => (<Redirect to="/" />)} path={"*"}/>
            </Switch>
        </>
    )
};

export default Routes;