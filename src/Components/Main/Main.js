import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "../About/About";
import AdsHome from "../AdsHome/AdsHome";
import Top from "../Top/Top";
import Bottom from "../Bottom/Bottom";
import Categories from "../Categories/Categories";
import MyAccount from "../MyAccount/MyAccount";
import PostAd from "../PostAd/PostAd";
import MyProfile from "../MyProfile/MyProfile";
import EditProfile from "../MyProfile/EditProfile";
import Firebase from "../Sign/Firebase";
import ShowAds from "../ShowAds/ShowAds";
import ViewPostedAds from "../PostAd/ViewPostedAds";
import EditPostedAds from "../PostAd/EditPostedAds";
import Success from "../PaymentNotification/Success";
import Fail from "../PaymentNotification/Fail";
import ViewOrders from "../PostAd/ViewOrders";
import ViewGotOrders from "../PostAd/ViewGotOrders";
import SellerOrderDetails from "../PostAd/SellerOrderDetails";
import Search from "../Search/Search";
import Admin from "../Admin/Admin";
import BuyerOrderDetails from "../PostAd/BuyerOrderDetails";

const Main = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Top />
            <AdsHome />
            <Categories />
            <About />
            <Bottom />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/myAccount">
            <MyAccount />
          </Route>
          <Route path="/myProfile">
            <MyProfile />
          </Route>
          <Route path="/editProfile">
            <EditProfile />
          </Route>
          <Route path="/login">
            <Firebase />
          </Route>
          <Route path="/postAds">
            <PostAd />
          </Route>
          <Route path="/showAds/:addId">
            <ShowAds />
          </Route>
          <Route path="/viewPostedAds">
            <ViewPostedAds />
          </Route>
          <Route path="/editPostedAds/:adId">
            <EditPostedAds />
          </Route>
          <Route path="/paymentSuccess">
            <Success />
          </Route>
          <Route path="/paymentFailed">
            <Fail />
          </Route>
          <Route path="/cancelT">
            <ShowAds />
          </Route>
          <Route path="/viewMyOrders">
            <ViewOrders />
          </Route>
          <Route path="/viewGotOrders">
            <ViewGotOrders />
          </Route>
          <Route path="/buyerOrderDetails/:orderId">
            <BuyerOrderDetails />
          </Route>
          <Route path="/sellerOrderDetails/:orderId">
            <SellerOrderDetails />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Main;
