import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ContextConnector from "./config/connector";
import Navbar2 from "./components/Navbar2";
import FooterPagePro from "./components/footerTab";
import PayPage from "./pages/PayPage";
import SideBar from "./components/ShoppingCart/sidebar";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import MyAccount from "./pages/Account"
import Signin from "./pages/Signin";
import Orders from "./pages/Orders"
import "./main.css"
import ShoppingCart from "./pages/ShoppingCart";
import ProductDetail from "./pages/ProductDetail"
import Search from "./pages/Search";

function App() {
    return (


        <ContextConnector >

            <Router>

                <Navbar2/>
                <Switch >
                    <Container id="page-wrap">

                        <Route exact path="/" component={Home} />
                        <Route exact path="/products" component={Products} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/myaccount" component={MyAccount} />
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/orders" component={Orders} />
                        <Route exact path="/shoppingcart" component={ShoppingCart} />
                        <Route exact path="/ProductDetail" component={ProductDetail} />
                        <Route exact path="/Search" component={Search} />
                        <Route exact path="/PayPage" component={PayPage} />

                    </Container>

                </Switch>

                <FooterPagePro/>
            </Router>
        </ContextConnector>
    );
}

export default App;
