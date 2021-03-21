import React, { useContext } from "react";
import { Card, Image, Header, Label, Grid } from "semantic-ui-react";
import Context from "../config/context";
import Button from "@material-ui/core/Button";
import {store} from "react-notifications-component";
import "./sepet.css"
export default function Product(props) {
  const context = useContext(Context);
  const {addCart,addWishList } = context;
    const colorBtn={
        backgroundColor:"#66a7fd"
    }
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
          <Card >
              <div className="swiper-slide swiper-slide-active" >
                  <div className="product-thumb transition  options " style={{display:"flex",justifyContent:"center"}}>
                      <Image src={pic}  href={"/ProductDetail?id="+props.product.id}   style={{display:"flex",justifyContent:"center",width:280,height:280,marginTop:"25px",marginBottom:"25px",borderRadius:"10px"}}/>
                  </div>
                  <div >
                      <div className="showcase-content">
                          <div className="showcase-title" style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                              display: "flex",
                              justifyContent: "center"
                          }}>
                              <Header>
                                  {props.product.price}TL
                              </Header>
                          </div>
                          <div style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                              display: "flex",
                              justifyContent: "center"
                          }}>
                              {props.product.name}
                          </div>
                          <div className="showcase">
                          <div className="showcase-buttons">
                              <Button class="showcase-add-to-cart" onClick={() => {
                                  handleShoppingCart(props.product)
                              }}>
                                  Sepete Ekle
                              </Button>
                          </div>

                          </div>
                      </div>
                  </div>

              </div>

          </Card>
  );
}
