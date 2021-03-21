import React, {Component, useContext, useEffect, useState} from "react";
import "../main.css"
import Context from "../config/context";
import "semantic-ui-css/semantic.min.css";
import { Card, Header, Form,Image,Button } from "semantic-ui-react";
import Product from "../components/Product";
import "./menuproduct.css"
import "./global.css"
import Paginate from "../components/Paginate";
let rows = [];
function createData(src,drugName,drugDesc ,drugPrice) {
    return { src, drugName, drugDesc, drugPrice};
}

function pushItems(productList){
    rows=[]
    productList.map((item) => (rows.push( createData(item.picture1,item.name,item.description,item.price))
    ))


}
export default function Search()  {
    const context = useContext(Context);
    const { user, searchedProducts, getFilteredProductList,getFilteredProductSearchList } = context;
    const [currentPS,setCurrentPS]=useState([])
    const [currentPS2,setCurrentPS2]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(8);
    const [keyText, setkeyText] = useState("");
    const handlekeyText= (e, { value }) => setkeyText({ value });

    var url = window.location.href;
    if(url.includes("Search?q=")){
        var urlSearch=url.split("Search?q=");
    }else{
        var urlpar1=url.split("Search?par=");
        var urlpar2=urlpar1[1].split("&par2=")
    }


    useEffect(() => {
        if(url.includes("Search?q=")){
            var urlSearch=url.split("Search?q=");
            var temp=urlSearch[1].split("&category=")
            if(temp.length<1){
                getFilteredProductSearchList(urlSearch[1],"")
            }else{
                getFilteredProductSearchList(urlSearch[1],temp[1])
            }
        }else{
            if(urlpar2[0]==""){
                getFilteredProductList("","")
            }
            else if(urlpar2.length>0 && urlpar2.length<=1){
                getFilteredProductList(urlpar2[0],"")
            }
            else if(urlpar2.length>1){
                getFilteredProductList(urlpar2[0],urlpar2[1])
            }
        }



    }, []);

    function searchProduct(){
        var e = document.getElementById("ddlViewBy");
        var strUser = e.value;
        getFilteredProductSearchList(keyText.value,strUser)
    }

    const onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = searchedProducts.slice(offset, offset + pageLimit);
        setCurrentPS(currentCountries)
    };
    const onPageChanged2 = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = searchedProducts.slice(offset, offset + pageLimit);
        setCurrentPS2(currentCountries)
    };

    const viewSearchedDetail=searchedProducts.length>0?(
        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">


            <div id="cardView" style={{marginTop:"1%",width:"100%"}}>

                <Card.Group fluid itemsPerRow="3" >
                    {currentPS.map( product => (
                        <Product  product={product} />
                    ))}
                </Card.Group>

            </div>
            <div style={{width:"100%"}}>
                <Paginate totalRecords={searchedProducts.length} totalPages={Math.round(searchedProducts.length/2)}  pageLimit={2} pageNeighbours={1} onPageChanged={onPageChanged} />
            </div>
        </div>
    ):(
        <div>

        </div>
    )


    const viewSearchedDetail2=searchedProducts.length>0?(
        <div >
            <div id="cardView" style={{marginTop:"1%",width:"100%"}}>

                <Card.Group fluid itemsPerRow="3" >
                    {currentPS2.map( product => (
                        <Product  product={product} />
                    ))}
                </Card.Group>

            </div>
            <div style={{width:"80%"}}>
                <Paginate totalRecords={searchedProducts.length} totalPages={Math.round(searchedProducts.length/3)}  pageLimit={3} pageNeighbours={1} onPageChanged={onPageChanged2} />
            </div>
        </div>
    ):(
        <div>

        </div>
    )

    const productRightMenu = () => {
        if(url.includes("Search?q=")){
            return <div>
                <div className="block-item-content">
                    <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                        <div className="filter-menu-box filter-menu-main-category">
                            <a href="/Search?par=kuruyemis">
                                <i className="fas fa-chevron-right"></i>
                                <span>KURUYEMİŞ</span>
                            </a>
                            <a href="/Search?par=kuru-meyve">
                                <i className="fas fa-chevron-right"></i>
                                <span>KURU MEYVE</span>
                            </a>
                            <a href="/Search?par=baharat">
                                <i className="fas fa-chevron-right"></i>
                                <span>BAHARAT</span>
                            </a>
                            <a href="/Search?par=dogal-urunler">
                                <i className="fas fa-chevron-right"></i>
                                <span>DOĞAL ÜRÜNLER</span>
                            </a>
                            <a href="/Search?par=gurme">
                                <i className="fas fa-chevron-right"></i>
                                <span>GURME</span>
                            </a>
                            <a href="/Search?par=lokum-sekerleme">
                                <i className="fas fa-chevron-right"></i>
                                <span>LOKUM &amp; ŞEKERLEME</span>
                            </a>
                        </div>
                    </div>

                </div>

            </div>

        }else{
            switch(urlpar2[0].toLowerCase()) {

                case "kuruyemis":   return <div><div className="block-item-content">
                    <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                        <div className="filter-menu-box filter-menu-category">
                            <div className="filter-menu-category-title">

                                <span>KURUYEMİŞ</span>
                            </div>
                            <div className="filter-menu-category-content">
                                <a href="/Search?par=kuruyemis&par2=antep-fıstığı" title="Antepfıstığı">
                                    <i className="fas fa-minus"></i>
                                    <span>Antepfıstığı</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=ay-çekirdegi" title="Ay Çekirdek">
                                    <i className="fas fa-minus"></i>
                                    <span>Ay Çekirdek</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=badem" title="Badem">
                                    <i className="fas fa-minus"></i>
                                    <span>Badem</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=ceviz" title="Ceviz">
                                    <i className="fas fa-minus"></i>
                                    <span>Ceviz</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=cerez" title="Çerez">
                                    <i className="fas fa-minus"></i>
                                    <span>Çerez</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=findik" title="Fındık">
                                    <i className="fas fa-minus"></i>
                                    <span>Fındık</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=fistik" title="Fıstık">
                                    <i className="fas fa-minus"></i>
                                    <span>Fıstık</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=kabak-çekirdegi" title="Kabak Çekirdek">
                                    <i className="fas fa-minus"></i>
                                    <span>Kabak Çekirdek</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=kaju" title="Kaju">
                                    <i className="fas fa-minus"></i>
                                    <span>Kaju</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=karışık-kuruyemiş" title="Karışık Kuruyemiş">
                                    <i className="fas fa-minus"></i>
                                    <span>Karışık Kuruyemiş</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=karpuz-çekirdek" title="Karpuz Çekirdek">
                                    <i className="fas fa-minus"></i>
                                    <span>Karpuz Çekirdek</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=kına-çerezi" title="Kına Çerezi">
                                    <i className="fas fa-minus"></i>
                                    <span>Kına Çerezi</span>
                                </a>
                                <a href="/Search?par=kuruyemis&par2=leblebi" title="Leblebi">
                                    <i className="fas fa-minus"></i>
                                    <span>Leblebi</span>
                                </a>
                            </div>
                            <div className="filter-menu-category-top">
                                <a href="/Search?par=">
                                    <i className="fas fa-chevron-left"></i>
                                    <span>Tüm Kategoriler</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div></div>;
                case "kuru-meyve":  return  <div>
                    <div className="block-item-content">
                        <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                            <div className="filter-menu-box filter-menu-category">
                                <div className="filter-menu-category-title">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>KURU MEYVE</span>
                                </div>
                                <div className="filter-menu-category-content">
                                    <a href="/Search?par=kuru-meyve&par2=meyve-kurusu" title="Meyve kurusu">
                                        <i className="fas fa-minus"></i>
                                        <span>Meyve kurusu</span>
                                    </a>
                                    <a href="/Search?par=kuru-meyve&par2=tropik-meyve-kurusu" title="Tropik Meyve kurusu">
                                        <i className="fas fa-minus"></i>
                                        <span>Tropik Meyve kurusu</span>
                                    </a>
                                </div>
                                <div className="filter-menu-category-top">
                                    <div className="filter-menu-category-top">

                                        <a href="/Search?par=">
                                            <i className="fas fa-chevron-left"></i>
                                            <span>Tüm Kategoriler</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                case "baharat":    return <div>
                    <div className="block-item-content">
                        <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                            <div className="filter-menu-box filter-menu-category">
                                <div className="filter-menu-category-title">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>BAHARAT</span>
                                </div>
                                <div className="filter-menu-category-content">
                                    <a href="/Search?par=baharat&par2=baharat-çesitleri" title="Baharat Çeşitleri">
                                        <i className="fas fa-minus"></i>
                                        <span>Baharat Çeşitleri</span>
                                    </a>
                                    <a href="/Search?par=baharat&par2=çay-kahve" title="Çay Kahve">
                                        <i className="fas fa-minus"></i>
                                        <span>Çay Kahve</span>
                                    </a>
                                </div>
                                <div className="filter-menu-category-top">

                                    <a href="/Search?par=">
                                        <i className="fas fa-chevron-left"></i>
                                        <span>Tüm Kategoriler</span>
                                    </a>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
                case "dogal-urunler":return <div>
                    <div className="block-item-content">
                        <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                            <div className="filter-menu-box filter-menu-category">
                                <div className="filter-menu-category-title">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>DOĞAL ÜRÜNLER</span>
                                </div>
                                <div className="filter-menu-category-content">
                                    <a href="/Search?par=dogal-urunler&par2=aktar" title="Aktar">
                                        <i className="fas fa-minus"></i>
                                        <span>Aktar</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bebek-mamasi" title="Bebekler İçin">
                                        <i className="fas fa-minus"></i>
                                        <span>Bebekler İçin</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bakim-ürünleri" title="Bitkisel Bakım">
                                        <i className="fas fa-minus"></i>
                                        <span>Bitkisel Bakım</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bitki-çaylari" title="Bitkisel Çaylar">
                                        <i className="fas fa-minus"></i>
                                        <span>Bitkisel Çaylar</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bitkisel-destek" title="Bitkisel Destek">
                                        <i className="fas fa-minus"></i>
                                        <span>Bitkisel Destek</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bitkisel-enerji" title="Bitkisel Enerji">
                                        <i className="fas fa-minus"></i>
                                        <span>Bitkisel Enerji</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bitkisel-sirkeler" title="Bitkisel Sirkeler">
                                        <i className="fas fa-minus"></i>
                                        <span>Bitkisel Sirkeler</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bitkisel-sular" title="Bitkisel Sular">
                                        <i className="fas fa-minus"></i>
                                        <span>Bitkisel Sular</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=bitkisel-yaglar" title="Bitkisel Yağlar">
                                        <i className="fas fa-minus"></i>
                                        <span>Bitkisel Yağlar</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=dogal-gida" title="Doğal Gıda">
                                        <i className="fas fa-minus"></i>
                                        <span>Doğal Gıda</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=glutensiz-unlar-sebze-meyve-tozlari" title="Glütensiz Ürünler">
                                        <i className="fas fa-minus"></i>
                                        <span>Glütensiz Ürünler</span>
                                    </a>
                                    <a href="/Search?par=dogal-urunler&par2=organik-gida" title="Organik Gıda">
                                        <i className="fas fa-minus"></i>
                                        <span>Organik Gıda</span>
                                    </a>
                                </div>
                                <div className="filter-menu-category-top">
                                    <a href="/Search?par=">
                                        <i className="fas fa-chevron-left"></i>
                                        <span>Tüm Kategoriler</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                case "gurme": return <div>
                    <div className="block-item-content">
                        <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                            <div className="filter-menu-box filter-menu-category">
                                <div className="filter-menu-category-title">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>GURME</span>
                                </div>
                                <div className="filter-menu-category-content">
                                    <a href="/Search?par=gurme&par2=çikolata-1" title="Çikolata">
                                        <i className="fas fa-minus"></i>
                                        <span>Çikolata</span>
                                    </a>
                                    <a href="/Search?par=gurme&par2=kurabiye-1" title="Kurabiye">
                                        <i className="fas fa-minus"></i>
                                        <span>Kurabiye</span>
                                    </a>
                                    <a href="/Search?par=gurme&par2=özel-çaylar" title="Özel Çaylar">
                                        <i className="fas fa-minus"></i>
                                        <span>Özel Çaylar</span>
                                    </a>
                                    <a href="/Search?par=gurme&par2=sos" title="Soslar">
                                        <i className="fas fa-minus"></i>
                                        <span>Soslar</span>
                                    </a>
                                </div>
                                <div className="filter-menu-category-top">
                                    <a href="/Search?par=">
                                        <i className="fas fa-chevron-left"></i>
                                        <span>Tüm Kategoriler</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                case "lokum-sekerleme" :return <div>
                    <div className="block-item-content">
                        <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                            <div className="filter-menu-box filter-menu-category">
                                <div className="filter-menu-category-title">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>LOKUM &amp; ŞEKERLEME</span>
                                </div>
                                <div className="filter-menu-category-content">
                                    <a href="/Search?par=lokum-sekerleme&par2=çikolata" title="Çikolata">
                                        <i className="fas fa-minus"></i>
                                        <span>Çikolata</span>
                                    </a>
                                    <a href="/Search?par=lokum-sekerleme&par2=lokum" title="Lokum">
                                        <i className="fas fa-minus"></i>
                                        <span>Lokum</span>
                                    </a>
                                    <a href="/Search?par=lokum-sekerleme&par2=pestil" title="Pestil">
                                        <i className="fas fa-minus"></i>
                                        <span>Pestil</span>
                                    </a>
                                    <a href="/Search?par=lokum-sekerleme&par2=şekerleme" title="Şekerleme">
                                        <i className="fas fa-minus"></i>
                                        <span>Şekerleme</span>
                                    </a>
                                    <a href="/Search?par=lokum-sekerleme&par2=gofret" title="Gofret">
                                        <i className="fas fa-minus"></i>
                                        <span>Gofret</span>
                                    </a>
                                </div>
                                <div className="filter-menu-category-top">
                                    <a href="/Search?par=">
                                        <i className="fas fa-chevron-left"></i>
                                        <span>Tüm Kategoriler</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                default:      return <div>
                    <div className="block-item-content">
                        <div className="filter-menu openbox-content" data-filter-menu-delay="0">
                            <div className="filter-menu-box filter-menu-main-category">
                                <a href="/Search?par=kuruyemis">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>KURUYEMİŞ</span>
                                </a>
                                <a href="/Search?par=kuru-meyve">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>KURU MEYVE</span>
                                </a>
                                <a href="/Search?par=baharat">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>BAHARAT</span>
                                </a>
                                <a href="/Search?par=dogal-urunler">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>DOĞAL ÜRÜNLER</span>
                                </a>
                                <a href="/Search?par=gurme">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>GURME</span>
                                </a>
                                <a href="/Search?par=lokum-sekerleme">
                                    <i className="fas fa-chevron-right"></i>
                                    <span>LOKUM &amp; ŞEKERLEME</span>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            }
        }

    }

    const productMenu=()=>{
        if(url.includes("Search?q=")){

            return    <aside className="col-md-10" style={{float:"left"}}>
            <section className="col-12 col-md-8 col-lg-9">
                <div className="contentbox-header">
                    <h4>Detaylı Arama</h4>
                </div>
                <div className="contentbox-body">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <form className="form-horizontal"  >
                                <div className="contentbox-block">
                                        <div className="form-group row" style={{marginBottom:"25px"}}>
                                            <label className="col-12 col-lg-4 control-label">Anahtar Kelime</label>
                                            <div style={{marginLeft:"10px"}}>
                                                <Form.Input
                                                    name="q"
                                                    placeholder="Anahtar kelime"
                                                    type="text"
                                                    onChange={handlekeyText}
                                                    value={keyText.value}
                                                />
                                            </div>

                                        </div>
                                        <div className="form-group row"  style={{marginBottom:"25px"}}>
                                            <label className="col-12 col-lg-4 control-label">Kategoriler</label>
                                            <div className="col-12 col-lg-8">
                                                <select className="form-control" name="category"  data-selector="change-category" id="ddlViewBy">
                                                    <option value="3">BAHARAT</option>
                                                    <option value="4">DOĞAL ÜRÜNLER</option>
                                                    <option value="5">GURME</option>
                                                    <option value="2">KURU MEYVE</option>
                                                    <option value="1">KURUYEMİŞ</option>
                                                    <option value="6">LOKUM &amp; ŞEKERLEME</option>

                                                </select>
                                            </div>
                                        </div>
                                </div>
                                <div className="contentbox-block">
                                    <div className="form-group row">
                                        <div className="col-12 col-lg-3 offset-lg-4">
                                            <button  className="btn btn-block btn-primary mr-2" onClick={searchProduct}> Ara</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="results-page">
                    <div className="information-content">
                        <i className="fas fa-clipboard-list"></i>
                        <div>
                   <span>
                       {
                           viewSearchedDetail
                       }
                   </span>
                        </div>
                    </div>
                </div>
            </section>
            </aside>
        }else{
            return <aside className="col-md-10" style={{float:"left"}}>
            <div id="cardView" style={{marginTop:"1%"}}>
                {viewSearchedDetail2}
                </div>
            </aside>
        }
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
        <div style={{marginTop:"150px",minHeight:"1000px",display:"flex"}}>

            <aside className="col-md-3" style={{float:"left"}}>
                <div id="left-block">
                    <div className="block-item" data-type="filter-product-groups">
                        <div className="block-item-title">
                            <span>Ürün Grupları</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        {
                            productRightMenu()
                        }
                    </div>

                </div>
            </aside>



                    {
                        productMenu()
                    }








        </div>

    );
}
