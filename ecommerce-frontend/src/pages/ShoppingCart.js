import React, {useContext, useEffect, useState} from "react";
import "../main.css"
import {Button, Form, Image, Modal} from "semantic-ui-react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Context from "../config/context";
import {store} from "react-notifications-component";

export default function ShoppingCart() {
    const context = useContext(Context);
    const { user,addCart,cart,removeCart,removeInstantlyCart,addOrder } = context;
    /*const [page, setPage] = React.useState(0);
    const handleSubmit = () => {
        let resultCartList=[]
        if(localStorage.hasOwnProperty("cart")){
            var temp=JSON.parse(cart)
            for (var key in Object.keys(temp)) {
                debugger;
                var tmp=temp[parseInt(Object.keys(temp)[key])][0]
                var quantity=temp[parseInt(Object.keys(temp)[key])][1]
                var obj2 = {"orderQuantity":quantity}
                const result = Object.assign({}, tmp, obj2);
                resultCartList.push(result)
            }

        }
        var today = new Date();
        const order = {
            order_status:parseInt("3"),
            user_id:user.id,
            created_at:today,
            productsMasters:resultCartList
        };
        addOrder(order);
        localStorage.removeItem("cart")
    };*/

    function HandleShoppingCart(productRow){
        addCart(productRow)
        store.addNotification({
            title: "Süper!",
            message: "Başarılı",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }

    function HandleRemoveInstantlyCart(productRow){
        removeInstantlyCart(productRow)
        store.addNotification({
            title: "Süper!",
            message: "Ürün Sepetten Çıkarıldı",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });

    }

    function HandleRemoveShoppingCart(productRow){
        removeCart(productRow)
        store.addNotification({
            title: "Süper!",
            message: "Başarılı",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }
    function getTotalPrice(){
        let totalPrice=0.0
        if(localStorage.hasOwnProperty("cart")){
            var temp2=JSON.parse(cart)
            for (var key in Object.keys(temp2)) {
                totalPrice=totalPrice+(temp2[parseInt(Object.keys(temp2)[key])][1]*temp2[parseInt(Object.keys(temp2)[key])][0].price)
            }

        }
        return totalPrice

    }
    function getrowTotalPrice(rowTmp){
        let totalrowPrice=0.0
        if(localStorage.hasOwnProperty("cart")){
            var temp2=JSON.parse(cart)
            totalrowPrice=totalrowPrice+(temp2[parseInt(rowTmp.id)][1]*temp2[parseInt(rowTmp.id)][0].price)

        }
        return totalrowPrice

    }
    let cartList=[]
    if(localStorage.hasOwnProperty("cart")){
        var temp=JSON.parse(cart)
        for (var key in Object.keys(temp)) {
            cartList.push(temp[parseInt(Object.keys(temp)[key])][0])
        }

    }
    function redirectPayPage() {
        window.location.href = "/PayPage";
    }
    function rootHeight(){
        var e = document.getElementById("root");
        var t = document.getElementById("backgroundImageTemp");
        if(e.clientHeight>0){
            t.style.height=e.clientHeight-15+"px";
        }
    }
    rootHeight()
    return (
        cartList.length>0?(
            <div   style={{width:"75%",marginLeft:"10%",marginRight:"10%" ,minHeight:"550px",marginTop:"200px"}}>
                <section class="col-12">
                    <div id="cart-container" >
                        <div id="cart-container" >
                            <div class="row">
                               <div className="col-12 col-lg-9 col-md-8">
                            <div id="cart-content" className="cart-block">
                                <div className="contentbox-header">
                                    <h4>SEPET DETAYI</h4>
                                </div>
                                <div className="contentbox-body">
                                    <div id="cart-items">
                                        {cartList.map((row) => (
                                            <div className="cart-item">
                                                <div className="row">
                                                    <div className="col-4 col-lg-2">
                                                        <div className="cart-item-image">
                                                            <a target="_blank" >
                                                                <img src={row.picture1} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-8 col-lg-10 pl-0">
                                                        <div className="cart-item-detail">
                                                            <div className="row">
                                                                <div className="col-12 col-lg-5">
                                                                    <div className="cart-item-name">
                                                                        <div style={{paddingLeft:"30px"}}>
                                                                            <a  style={{fontSize:"2rem"}}>
                                                                                {row.name}
                                                                            </a>
                                                                        </div>

                                                                        <Button className="cart-list-item-delete"  style={{background:"aliceblue",fontSize:"2rem"}} onClick={()=>removeInstantlyCart(row)}>
                                                                            <i className="far fa-trash-alt"></i>
                                                                            <span style={{marginLeft:"5px"}}>Sepetten Sil</span>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6 col-lg-4">

                                                                        <div style={{marginTop:"50px"}}>
                                                                            <button type="button" class="increaseDecreaseCartItem" aria-label="upload picture" component="span"  onClick={()=>{HandleRemoveShoppingCart(row)}} style={{float:"left"}}>
                                                                                <i className="fas fa-minus"></i>
                                                                            </button>
                                                                            <div style={{float:"left",fontSize:"1.5rem",marginTop:"10px",marginLeft:"10px",marginRight:"10px"}}>
                                                                                <center>
                                                                                    {JSON.parse(cart)[row.id][1]}
                                                                                    &nbsp;&nbsp;
                                                                                    <span className="product-quantity-name">Adet</span>
                                                                                </center>

                                                                            </div>
                                                                            <button type="button" class="increaseDecreaseCartItem" aria-label="upload picture" component="span" onClick={()=>{HandleShoppingCart(row)}} >
                                                                                <i className="fas fa-plus"></i>
                                                                            </button>
                                                                        </div>
                                                                </div>
                                                                <div className="col-6 col-lg-3">
                                                                    <div className="cart-item-price-container">
                                                                        <div className="cart-item-price">
                                                                            <div className="item-rebate-price">{getrowTotalPrice(row)} TL</div>
                                                                            <div className="item-tax">+ KDV % 8</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="cart-item-delete-mobile btn btn-xs" data-id="132692"
                                                        data-selector="delete-cart-item"><i className="fas fa-times"></i></button>
                                            </div>

                                        ))}
                                    </div>
                                    <div className="cart-buttons">
                                        <button className="btn btn-sm btn-secondary" data-selector="return-back">
                                            <i className="fas fa-arrow-left"></i>
                                            <span>ALIŞVERİŞE DEVAM ET</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                                <div className="col-12 col-lg-3 col-md-4 pl-md-0">
                                    <div id="checkout-aside-fixed">
                                        <div id="cart-panel" className="cart-block">
                                            <div className="contentbox-header">
                                                <h4>SEPET ÖZETİ</h4>
                                            </div>
                                            <div className="contentbox-body">
                                                <div id="cart-summary">
                                                    <div className="cart-panel-amount-details">
                                                        <div className="cart-panel-row">
                                                            <span>Ara Toplam</span>
                                                            <span>{getTotalPrice()} TL</span>
                                                        </div>
                                                        <div className="cart-panel-row">
                                                            <span>KDV</span>
                                                            <span>{getTotalPrice()*8/100}TL</span>
                                                        </div>
                                                        <div className="cart-panel-row">
                                                            <span>KDV Dahil</span>
                                                            <span>{getTotalPrice()+getTotalPrice()*8/100} TL</span>
                                                        </div>
                                                        <div className="cart-panel-row cart-summary-total-price">
                                                            <span>Toplam</span>
                                                            <span id="cart-total-amount" data-general-amount="0,00" data-final-amount="24,90">
                                                               {getTotalPrice()+getTotalPrice()*8/100} TL
                                                            </span>
                                                        </div>

                                                    </div>
                                                    <div className="cart-panel-buttons form-group">

                                                        {user ?(
                                                            <Form >
                                                                <Button  className="btn btn-block btn-primary" style={{float:"right",marginTop:"2%",marginRight:"0px"}} onClick={redirectPayPage}> Alışverişi Tamamla </Button>
                                                            </Form>
                                                        ):(
                                                            <div >

                                                            </div>
                                                        )

                                                        }

                                                    </div>
                                                    <div className="cart-panel-secure-logo">
                                                        <img
                                                            src="sslsecure.png"
                                                            data-toggle="tooltip" data-placement="bottom" title=""
                                                            alt="Bu sitede yapacağınız alışveriş işlemleri 256bit SSL ile korunmaktadır"
                                                            data-original-title="Bu sitede yapacağınız alışveriş işlemleri 256bit SSL ile korunmaktadır"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



            </div>
        ):(
            <div style={{marginTop:"250px",minHeight:"875px"}}><h1>

                Sepetinizde Ürün Bulunmamaktadır


            </h1></div>
        )

    );
}
