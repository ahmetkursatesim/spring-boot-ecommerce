import React, { useContext } from "react";
import { Card, Image, Header, Label, Grid } from "semantic-ui-react";

import Detail from "../components/detailProduct";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BarChartIcon from '@material-ui/icons/BarChart';
import Context from "../config/context";
import {IconButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useAlert} from "react-alert";
import {store} from "react-notifications-component";


export default function Product(props) {
  const context = useContext(Context);
  const {addCart,addWishList } = context;
  function handleShoppingCart(productRow){
      let countItemsCart=0
      addCart(productRow)
      if(localStorage.hasOwnProperty("cart")){
          var item=JSON.parse(localStorage.getItem("cart"))
          countItemsCart= Object.keys(item).length;

      }
      store.addNotification({
          title: "Süper!",
          message: "Ürününüz Sepete Eklendi",
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
    function HandleWishList(productRow){
        let countItemsCart=0
        addWishList(productRow)
        if(localStorage.hasOwnProperty("wish")){
            var item=JSON.parse(localStorage.getItem("wish"))
            countItemsCart= Object.keys(item).length;

        }
        store.addNotification({
            title: "Süper!",
            message: "Ürününüz İstek Listesine Eklendi",
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
  const pic = props.product.picture1 ? props.product.picture1 : "https://react.semantic-ui.com/images/avatar/large/matthew.png";

  return (
          <Card>
              <div className="swiper-slide swiper-slide-active" >
                  <div className="product-thumb transition  options " style={{display:"flex",justifyContent:"center"}}>
                      <Image src={pic}   style={{display:"flex",justifyContent:"center",width:300,height:300,borderRadius:150}}/>
                  </div>
                  <div style={{float:"left",display:"inline-block"}}>
                      <Card.Content>
                          <Card.Header style={{marginLeft:"1%",float:"left",marginRight:"1%"}}>
                              <Header floated="left" color="teal">
                                  {props.product.price}TL
                              </Header>
                          </Card.Header>
                          <Card.Description style={{marginLeft:"1%",width:"200px"}}>{props.product.name}</Card.Description>
                      </Card.Content>

                  </div>
                  <div  style={{display:"flex",justifyContent:"flex-end",marginRight:"1%",marginBottom:"1%"}}>
                      <Detail product={props.product}/>
                          <IconButton style={{backgroundColor:"#66a7fd",marginLeft:"1%"}} onClick={() => {handleShoppingCart(props.product)}} >
                              <ShoppingCartIcon/>
                          </IconButton>

                      <IconButton style={{backgroundColor:"#66a7fd",marginLeft:"1%"}}  onClick={() => {HandleWishList(props.product)}}>
                          <FavoriteBorderIcon/>

                      </IconButton>

                      <IconButton style={{backgroundColor:"#66a7fd",marginLeft:"1%"}}>
                          <BarChartIcon/>
                      </IconButton>
                  </div>

              </div>

          </Card>
  );
}
