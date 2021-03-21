import {Image, Menu} from "semantic-ui-react";
import React, {useContext, useEffect, useState} from "react";
import Context from "../config/context";
import IconButton from '@material-ui/core/IconButton';
import  '../stylesheet.css'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import AccountMenu from "./Account/AccountMenu";
import  './navbar.css'
import SideBar from "./ShoppingCart/sidebar";
import Navbar from "./Navbar";

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
            <IconButton  aria-label="upload picture" component="span" onClick={routeChange} style={{padding:"0px"}}>
                <AccountCircleOutlinedIcon style={{fontSize:"4rem",marginRight:"5px"}}></AccountCircleOutlinedIcon>
                <strong>Giriş Yap</strong>
            </IconButton>
        </div>
    );
    debugger;
    const userInfo2 = user ? (user.admin ? (
      <Navbar/>
    ) : (
        <div className="search">
            <form action="/Search?" data-selector="search-form">
                <input type="text" name="q" placeholder="Ne aramıştınız?" aria-label="Search"
                       className="auto-complete" autoComplete="off" style={{border:"2px solid red"}}/>
                <button>
                    <img src="/icon-search.svg"/></button>
            </form>
        </div>
    )):(
        <div className="search">
            <form action="/Search?" data-selector="search-form">
                <input type="text" name="q" placeholder="Ne aramıştınız?" aria-label="Search"
                       className="auto-complete" autoComplete="off" style={{border:"2px solid red"}}/>
                <button>
                    <img src="/icon-search.svg"/></button>
            </form>
        </div>

    );

    const menubar2 = (
                <div className="headerTabBar" style={{position:"fixed",zIndex:"1",width:"100%"}}>
                    <header  style={{marginLeft:"8%"}}>
                        <div className="row align-items-center" >
                            <div className="col-lg-4">
                                <div className="logo">
                                    <a href="/" aria-label="Logo">
                                        <img
                                            src="/logo.PNG"
                                            alt="E-çerez"/>
                                        <img
                                            src="/logo2.PNG"
                                            alt="E-çerez"/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                {userInfo2}
                            </div>
                            <div className="col-lg-2">
                                <div className="row align-items-center">
                                    <div className="col-4 d-block d-lg-none">
                                        <div className="toggle-bar" data-selector="toggle-bar">
                                            <i className="fas fa-bars"></i></div>
                                    </div>
                                    <div className="col-4 col-lg-4">
                                        {userInfo}
                                    </div>
                                    <div className="col-4 col-lg-3">
                                        <div  data-loading-text="Loading..." className="toggle" style={{float:"left",marginRight:"50px"}}>
                                            <SideBar  pageWrapId={"page-wrap"} outerContainerId={"App"} right noOverlay customBurgerIcon={ <img src="cart.svg" /> } />
                                            <div style={{float:"left",marginLeft:"50px"}}>
                                                <strong>Sepetim</strong>
                                                <br/>
                                                <span id="cart-total2" className="cart-total2">{cartListNavBar.length} items</span>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </header>

                    <nav className="navbar"  style={{zIndex:-1,marginTop:"0px"}}>
                        <ul className="menu">
                            <li>
                                <a className="hasDropdown" href="#" >Kuruyemiş</a>

                                <ul className="containerNavBar">
                                    <div className="container__list">
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=antep-fistigi" title="Antepfıstığı">
                                                <span>Antepfıstığı</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=ay-cekirdegi" title="Ay Çekirdek">
                                                <span>Ay Çekirdek</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=badem" title="Badem">
                                                <span>Badem</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=ceviz" title="Ceviz">
                                                <span>Ceviz</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=cerez" title="Çerez">
                                                <span>Çerez</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=findik" title="Fındık">
                                                <span>Fındık</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=fistik" title="Fıstık">
                                                <span>Fıstık</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=kabak-cekirdegi" title="Kabak Çekirdek">
                                                <span>Kabak Çekirdek</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=kaju" title="Kaju">
                                                <span>Kaju</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=karisik-kuruyemis" title="Karışık Kuruyemiş">
                                                <span>Karışık Kuruyemiş</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=karpuz-cekirdek" title="Karpuz Çekirdek">
                                                <span>Karpuz Çekirdek</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=kina-cerezi" title="Kına Çerezi">
                                                <span>Kına Çerezi</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=kuruyemis&par2=leblebi" title="Leblebi">
                                                Leblebi
                                            </a>
                                        </div>
                                    </div>
                                </ul>

                            </li>
                            <li>
                                <a className="hasDropdown" href="#">Kuru Meyve</a>
                                <ul className="containerNavBar has-multi">
                                    <div className="container__list container__list-multi">
                                        <div className="container__listItem">
                                            <a href={"/Search?par="+"kuru-meyve&par2=meyve-kurusu"}>Meyve kurusu</a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href={"/Search?par="+"kuru-meyve&par2=tropik-meyve-kurusu"}>Tropik Meyve kurusu</a>
                                        </div>


                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a className="hasDropdown" href="#">Baharat</a>

                                <ul className="containerNavBar">
                                    <div className="container__list">
                                        <div className="container__listItem" >
                                            <a href="/Search?par=baharat&par2=baharat-cesitleri" title="Baharat Çeşitleri">
                                                <span>Baharat Çeşitleri</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=baharat&par2=cay-kahve" title="Çay Kahve">
                                                <span>Çay Kahve</span>
                                            </a>
                                        </div>


                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a className="hasDropdown" href="#">Doğal Ürünler</a>

                                <ul className="containerNavBar">
                                    <div className="container__list">
                                        <div className="container__listItem" >
                                            <a href="/Search?par=dogal-urunler&par2=aktar" title="Aktar">
                                                <span>Aktar</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bebek-mamasi" title="Bebekler İçin">
                                                <span>Bebekler İçin</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bakim-urunleri"
                                               title="Bitkisel Bakım">
                                                <span>Bitkisel Bakım</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bitki-caylari" title="Bitkisel Çaylar">
                                                <span>Bitkisel Çaylar</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bitkisel-destek" title="Bitkisel Destek">
                                                <span>Bitkisel Destek</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bitkisel-enerji"
                                               title="Bitkisel Enerji">
                                                <span>Bitkisel Enerji</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bitkisel-sirkeler" title="Bitkisel Sirkeler">
                                                <span>Bitkisel Sirkeler</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bitkisel-sular" title="Bitkisel Sular">
                                                <span>Bitkisel Sular</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=bitkisel-yaglar" title="Bitkisel Yağlar">
                                                <span>Bitkisel Yağlar</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=dogal-gida" title="Doğal Gıda">
                                                <span>Doğal Gıda</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=dogal-icecekler" title="Doğal İçecek">
                                                <span>Doğal İçecek</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=glutensiz-unlar-sebze-meyve-tozlari"
                                               title="Glütensiz Ürünler">
                                                <span>Glütensiz Ürünler</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=dogal-urunler&par2=organik-gida" title="Organik Gıda">
                                                <span>Organik Gıda</span>
                                            </a>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                <a className="hasDropdown" href="#">Gurme</a>
                                <ul className="containerNavBar">
                                    <div className="container__list">
                                        <div className="container__listItem" >
                                            <a href="/Search?par=gurme&par2=cikolata-1" title="Çikolata">
                                                <span>Çikolata</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=gurme&par2=kurabiye-1" title="Kurabiye">
                                                <span>Kurabiye</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=gurme&par2=ozel-caylar" title="Özel Çaylar">
                                                <span>Özel Çaylar</span>
                                            </a>
                                        </div>
                                        <div className="container__listItem">
                                            <a href="/Search?par=gurme&par2=sos" title="Soslar">
                                                <span>Soslar</span>
                                            </a>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>





    );
    return  menubar2
}
