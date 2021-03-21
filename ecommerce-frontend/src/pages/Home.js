import React, {useContext, useEffect, useState} from "react";

import {Card, Container, Grid, Header, Image, Label, Segment} from "semantic-ui-react";
import Context from "../config/context";
import Product from "../components/Product";
import "../main.css"
import Owldemo1 from "../components/Owldemo1";
import Paginate from "../components/Paginate";

export default function Home() {
    const context = useContext(Context);
    const { user, products, getProducts } = context;
    const [currentP,setCurrentP]=useState([])
    const [currentP2,setCurrentP2]=useState([])
    useEffect(() => {
        user? getProducts(user.id):getProducts(-1)

    }, []);
    const onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = products.slice(offset, offset + pageLimit);
        setCurrentP(currentCountries)
    };
    const onPageChanged2 = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = products.slice(offset, offset + pageLimit);
        setCurrentP2(currentCountries)
    };

    const viewMostProduct=products.length>0?(
        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">


            <div id="cardView" style={{marginTop:"1%",width:"100%"}}>

                <div className="default-products popular-products">
                    <div className="products-header">
                        <span>EN ÇOK SATAN ÜRÜNLER</span>
                    </div>
                </div>
                <Card.Group fluid itemsPerRow="3" >
                    {currentP.map( product => (
                        <Product  product={product} />
                    ))}
                </Card.Group>

            </div>
            <div style={{width:"100%"}}>
                <Paginate totalRecords={products.length} totalPages={Math.round(products.length/3)}  pageLimit={3} pageNeighbours={1} onPageChanged={onPageChanged} />
            </div>
        </div>
    ):(
        <div>

        </div>
    )

    const viewMostPopular =products.length>0?(
        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">


            <div id="cardView" style={{marginTop:"1%",width:"100%"}}>

                <div className="default-products popular-products">
                    <div className="products-header">
                        <span>ÖNE ÇIKANLAR ÜRÜNLER</span>
                    </div>
                </div>
                <Card.Group fluid itemsPerRow="3" >
                    {currentP2.map( product => (
                        <Product  product={product} />
                    ))}
                </Card.Group>

            </div>
            <div style={{width:"100%"}}>
                <Paginate totalRecords={products.length} totalPages={Math.round(products.length/3)}  pageLimit={3} pageNeighbours={1} onPageChanged={onPageChanged2} />
            </div>
        </div>
    ):(
        <div>

        </div>
    )

    function rootHeight(){
        var e = document.getElementById("root");
        var t = document.getElementById("backgroundImageTemp");
        if(e.clientHeight>0){
            t.style.height=e.clientHeight+"px";
        }

    }
    rootHeight()
    return (
        <div   style={{width:"100%",marginLeft:"0",marginRight:"0"}}>
            <div style={{marginLeft:"10%",marginRight:"10%"}}>
                <Owldemo1></Owldemo1>
                {viewMostProduct}
                {viewMostPopular}

            </div>


        </div>
    );
}
