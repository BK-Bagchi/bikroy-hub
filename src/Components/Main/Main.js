import React from 'react';
import About from '../About/About';
import AdsHome from '../AdsHome/AdsHome';
import Bottom from '../Bottom/Bottom';
import Categories from '../Categories/Categories';
import MyAccount from '../MyAccount/MyAccount';
import Top from '../Top/Top';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostAd from '../PostAd/PostAd';
import Firebase from '../Sign/Firebase';

const Main = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Top/>
                        <AdsHome/>
                        <Categories/>
                        <About/>
                        <Bottom/>
                    </Route>
                    <Route path="/myAccount">
                        <MyAccount/>
                    </Route>
                    <Route path="/login">
                        <Firebase/>
                    </Route>
                    <Route path="/postAds">
                        <PostAd/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Main;