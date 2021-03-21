import React, {useContext} from "react";
import { slide as Menu } from "react-burger-menu";
import {Button} from "react-bootstrap";
import Context from "../../config/context";
import {Image, Tab} from "semantic-ui-react";
import ChangePhoto from "../Account/ChangePhoto";
import {Redirect} from "react-router-dom";
import {store} from "react-notifications-component";
import TableBody from "@material-ui/core/TableBody";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";







export default props => {

    const context = useContext(Context);
    const { user,cart,removeInstantlyCart } = context;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    let cartList=[]
    if(localStorage.hasOwnProperty("cart")){
        var temp=JSON.parse(cart)
        for (var key in Object.keys(temp)) {
            cartList.push(temp[parseInt(Object.keys(temp)[key])][0])
        }

    }
    function getrowTotalPrice(rowTmp){
        let totalrowPrice=0.0
        if(localStorage.hasOwnProperty("cart")){
            var temp2=JSON.parse(cart)
            totalrowPrice=totalrowPrice+(temp2[parseInt(rowTmp.id)][1]*temp2[parseInt(rowTmp.id)][0].price)

        }
        return totalrowPrice

    }

    function getrowTotal(rowTmp){
        let totalrow=0
        if(localStorage.hasOwnProperty("cart")){
            var temp2=JSON.parse(cart)
            totalrow=temp2[parseInt(rowTmp.id)][1]

        }
        return totalrow

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

    const cartTmp=(cartList.length>0) ?(

        <Button className="btn btn-primary btn-block"  onClick={buyProductBtn}>
            SATIN AL
        </Button>
    ):(
        <div>

        </div>
    )
    const productCartView=(cartList.length>0) ?(
        <div class="cart-content-title">
            <div className="cart-content-subtitle" >Sepetinizde {cartList.length} ürün  var.</div>

            <div className="cart-list">


                    {cartList.map((row) => (
                        <div className="cart-list-item">

                        <div className="cart-list-item-image"  style={{float:"left"}}>
                            <img style={{height:"50px",width:"50px"}} src={row.picture1} />
                        </div>
                        <div className="cart-list-item-content"  style={{float:"left"}}>
                            <a className="cart-list-item-title"> {row.name}</a>
                        <div className="cart-list-item-price">
                            <a className="cart-list-item-amount">{getrowTotal(row)} Adet - </a> {getrowTotalPrice(row)}
                        TL
                        </div>
                        </div>
                            <Button className="cart-list-item-delete"  style={{background:"aliceblue"}} onClick={()=>HandleRemoveInstantlyCart(row)}>
                                <i className="far fa-trash-alt"></i>
                            </Button>

                        </div>
                    ))}

            </div>


            <div className="cart-content-total-price"><span>Sepet Toplamı</span>
                <div>{getTotalPrice()} TL</div>
            </div>
        </div>

    ):(
        <div>
            <div className="cart-content-empty">
                <div className="cart-content-subtitle">Sepetiniz boş</div>
                <div className="cart-content-empty-icon"><img
                    src="cart.svg"/>
                </div>
            </div>
        </div>
    )


    function buyProductBtn(){
        if(user){
            window.location.href = "/shoppingcart";
        }else{
            window.location.href = "/login";
        }

    }

    function cBtn(){
            window.location.href = "/";
    }
    return (
        // Pass on our props
        <Menu {...props}>

            <div className="cart-content openbox-content" data-selector="cart-content">
                <div className="cart-content-title">ALIŞVERİŞ SEPETİ</div>
                {productCartView}
                <div className="cart-content-button">
                    {cartTmp}
                </div>
                <div className="cart-content-button">
                    <Button className="btn btn-block btn-secondary" onClick={cBtn}>
                        ALIŞVERİŞE DEVAM ET
                    </Button>
                </div>
            </div>


        </Menu>
    );
};
