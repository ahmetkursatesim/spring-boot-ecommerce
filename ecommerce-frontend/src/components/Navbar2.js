import {Image, Menu} from "semantic-ui-react";
import React, {useContext, useEffect, useState} from "react";
import Context from "../config/context";
import IconButton from '@material-ui/core/IconButton';
import  '../stylesheet.css'
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AccountMenu from "./Account/AccountMenu";
import ShoppingCartMenu from "./ShoppingCart/ShoppingCartMenu";
import WishListMenu from "./WishList/WishListMenu";

function shoppingCartCount(){
    let countItemsCart=0
    if(localStorage.hasOwnProperty("cart")){
        var item=JSON.parse(localStorage.getItem("cart"))
        countItemsCart= Object.keys(item).length;
    }
    return countItemsCart
}

function wishListCount(){
    let countItemsCart=0
    if(localStorage.hasOwnProperty("wish")){
        var item=JSON.parse(localStorage.getItem("wish"))
        countItemsCart= Object.keys(item).length;
    }
    return countItemsCart
}


export default function Navbar2() {
    const history = useHistory();
    const routeChange = () =>{
        let path = `login`;
        history.push(path);
    }
    const context = useContext(Context);
    const { user,cart,wish} = context;
    let cartListNavBar=[]
    let wishListNavBar=[]
    debugger;
    if(localStorage.hasOwnProperty("cart")){
            var temp=JSON.parse(cart)
            for (var key in Object.keys(temp)) {
                cartListNavBar.push(temp[parseInt(Object.keys(temp)[key])][0])
            }

    }
    if(localStorage.hasOwnProperty("wish")){
            var temp=JSON.parse(wish)
            for (var key in Object.keys(temp)) {
                wishListNavBar.push(temp[parseInt(Object.keys(temp)[key])][0])
            }
    }

    const userInfo = user ? (
        <AccountMenu/>
    ) : (
        <div id="cart" className="cart toggle-wrap pull-right " >
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={routeChange} >
                <VpnKeyIcon/>
            </IconButton>
            <button type="button" data-loading-text="Loading..." className="toggle"  name="login"  onClick={routeChange}>
                <strong>Giriş Yap</strong><br/>
            </button>
        </div>
    );
    const menubar2 = (
            <header style={{backgroundColor:"#d0e2f7",position:"fixed",zIndex:"1",width:"100%"}}>
                <div className="col-xs-4 col-md-4"  style={{display:"flex",float:"left"}}>
                    <h1 className="logo">
                        <a href="/">
                            <Image src="https://livedemo00-opencart.template-help.com/opencart_prod-23526/image/cache/catalog/logo-255x46.png" title="Drug Store" alt="Drug Store" className="img-responsive"/>
                        </a>
                    </h1>
                </div>
                <div className="col-xs-4 col-md-4"  style={{display:"flex",float:"left"}}>
                        <Navbar/>
                </div>
                <div className="col-xs-4 col-md-4 col-md-push-4 pull-right"  style={{float:"right"}}>

                   <div style={{float:"right"}}>
                           <div  data-loading-text="Loading..." className="toggle" style={{float:"left"}}>
                              <ShoppingCartMenu/>
                               <div style={{float:"left"}}>
                               <strong>Sepetim</strong>
                                   <br/>
                               <span id="cart-total2" className="cart-total2">{cartListNavBar.length} items</span>
                               </div>
                           </div>

                       <div  data-loading-text="Loading..." className="toggle" style={{float:"left"}} >

                               <WishListMenu/>
                               <div style={{float:"left"}}>
                                   <strong>Beğendiklerim</strong>
                                   <br/>
                                   <span id="wishlist-total3" className="cart-total2">{wishListNavBar.length} items</span>
                               </div>

                       </div>

                       {userInfo}
                   </div>



                </div>
            </header>


    );
    return  menubar2
}