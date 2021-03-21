import React, {Component, useContext, useEffect, useState} from "react";
import "../main.css"
import Context from "../config/context";
import "semantic-ui-css/semantic.min.css";
import { Card, Header, Form,Image,Button } from "semantic-ui-react";
import {IconButton} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BarChartIcon from "@material-ui/icons/BarChart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {store} from "react-notifications-component";
import {POST_CART} from "../config/values";

export default function ProductDetail()  {
    const context = useContext(Context);
    const {product, getProductWithId,submitCart } = context;
    const { user } = context;
    const [count, setCount ]= useState(1);
    var url = window.location.href;
    var urlList=url.split("ProductDetail?id=");

    useEffect(() => {
       getProductWithId(urlList[1]);
    }, [])
    function minusCount(){
        if(count>1){
            setCount(count-1);
        }
    }
    function addCount(){
     setCount(count+1);
    }
    const handleSubmit = () => {
          submitCart(product,count)
    };


    return (
        <div style={{marginTop:"250px",minHeight:"875px"}}>
            <div  style={{backgroundColor:"white",minHeight:"875px",marginRight:"10%",marginLeft:"10%"}} >
                <div className="product-thumb transition  options " style={{display:"flex",justifyContent:"start",float:"left",marginLeft:"15%"}}>
                    <Image src={product!=null?product.picture1:""}   style={{width:500,height:500,marginTop:"25px",marginBottom:"25px",borderRadius:"10px"}}/>
                </div>
                <div className="product-right" style={{float:"left",marginLeft:"5%",marginTop:"5%"}}>
                    <div className="product-title" >
                        <h1>{product!=null?product.name:""}</h1>
                    </div>
                    <div className="product-price-container" style={{marginTop:"5px",fontSize:"2.5rem"}}>
                        <div className="product-price">
                            <div className="product-price-old">
                                {product!=null? product.price:""} TL
                            </div>
                        </div>
                    </div>
                    <div className="product-list-container" style={{marginTop:"15px"}}>
                        <div className="product-list-row product-categories">
                            <div className="product-list-title" style={{float:"left"}}>Kategori:&nbsp;   </div>
                            <div className="product-list-content">
                                {product!=null?product.category.name!=null?product.category.name:" Bütün Kategoriler":""}
                            </div>
                        </div>

                    </div>
                    <div className="product-cart-buttons" style={{marginTop:"15px"}}>
                        <div className="product-qty-wrapper">
                            <Form onSubmit={handleSubmit}>
                              <div>
                                  <IconButton type="button" color="primary" aria-label="upload picture" component="span" style={{float:"left"}} onClick={()=>{addCount()}} >
                                      <AddIcon style={{fontSize:"2rem"}}/>
                                  </IconButton>
                                  <div style={{float:"left",marginLeft:"10px",fontSize:"2rem",marginTop:"1px",marginRight:"10px"}} >
                                      {count}
                                  </div>

                                  <IconButton type="button" color="primary" aria-label="upload picture"  component="span"  onClick={()=>{minusCount()}}>
                                      <RemoveIcon style={{fontSize:"2rem"}}/>
                                  </IconButton>
                              </div>


                            <div className="product-buttons-wrapper" style={{marginTop:"5%",marginLeft:"0px"}}>
                                <div className="product-buttons-row">
                                    <div>
                                        <Button color="teal"  type="submit" style={{fontSize:"1.5rem"}}>Sepete Ekle</Button>
                                    </div>
                                </div>
                            </div>
                            </Form>
                        </div>

                    </div>

                    <div className="product-bottom-buttons">

                        <div>
                            <div id="product-user-buttons">
                                <div>
                                    <a href="javascript:void(0);" className="add-my-favorites"
                                       data-selector="add-my-favorites" data-product-id="8600"
                                       aria-label="Add To Favorites">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    );
}
