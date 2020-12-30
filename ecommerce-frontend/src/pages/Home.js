import React, {useContext, useEffect, useState} from "react";

import {Card, Container, Grid, Header, Image, Label, Segment} from "semantic-ui-react";
import AppsIcon from '@material-ui/icons/Apps';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Context from "../config/context";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import "../main.css"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Detail from "../components/detailProduct"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BarChartIcon from "@material-ui/icons/BarChart";
import {IconButton} from "@material-ui/core";
import Owldemo1 from "../components/Owldemo1";
import { useAlert } from 'react-alert'

import { store } from 'react-notifications-component';

function createData(src,drugName,drugDesc ,drugPrice) {
    return { src, drugName, drugDesc, drugPrice};
}

function pushItems(productList){
    rows=[]
    productList.map((item) => (rows.push( createData(item.picture1,item.name,item.description,item.price))
    ))


}
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#66a7fd",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

let rows = [];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});



export default function Home() {
    const context = useContext(Context);
    const { user, products, getProducts,addCart,cart,addWishList } = context;
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(4);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    useEffect(() => {
        user? getProducts(user.id):getProducts(-1)

    }, []);
    function HandleShoppingCart(productRow){
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
    const styleC={
        float: "left",
        display: "inline-block",
        width:"12% !important",
    }
    const indexOfLastProduct = currentPage * cardsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - cardsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const indexOfLastProduct2 = (page+1) * rowsPerPage;
    const indexOfFirstProduct2= indexOfLastProduct2- rowsPerPage;
    const currentProducts2 = products.slice(
        indexOfFirstProduct2,
        indexOfLastProduct2
    );
    debugger;
    pushItems(products)
    const views =
        products.length > 0 ? (
            currentProducts.map(product => <Product product={product} />)
        ) : (
            <Card>
                <Card.Content>
                    <h2>Nothing here!</h2>
                </Card.Content>
            </Card>
        );

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pagination =
        products.length > cardsPerPage ? (
            <Pagination cardsPerPage={cardsPerPage} totalCards={products.length} paginate={paginate}/>

        ) : null;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleClickTable() {
        var myElement = document.getElementById("tableProduct");
        myElement.style.display = "flex";
        var myElement2 = document.getElementById("cardView");
        myElement2.style.display = "none";
        var myElement3 = document.getElementById("grid-view");
        var myElement4= document.getElementById("list-view");
        myElement3.className="passive"
        myElement4.className="active"
    }
    function handleClickCard() {
        var myElement = document.getElementById("tableProduct");
        myElement.style.display = "none";
        var myElement2 = document.getElementById("cardView");
        myElement2.style.display = "block";

        var myElement3 = document.getElementById("grid-view");
        var myElement4= document.getElementById("list-view");
        myElement3.className="active"
        myElement4.className="passive"

    }
    return (
        <div   style={{width:"100%",marginLeft:"0",marginRight:"0" ,minHeight:"1000px"}}>
            <Owldemo1></Owldemo1>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 " style={styleC}>
                        <div className="box megamenu"  >
                            <div className="box-heading" style={{backgroundColor:"#66a7fd"}}>

                            </div>

                            <br/>
                            <ul className="sf-menu sf-js-enabled sf-arrows" >
                                    <li>
                                        <a href="" data-letters="Baby &amp; Child Care"><span>Bebek ve Çocuk Sağlığı</span></a>
                                    </li>
                                    <li>
                                        <a href="" data-letters="Gifts &amp; Specialty"><span>Kozmetik</span></a>
                                    </li>
                                    <li>
                                        <a href="" data-letters="Baby &amp; Child Care"><span>Diyet Ürünleri</span></a>
                                    </li>
                                    <li>
                                        <a href="" data-letters="Gifts &amp; Specialty"><span>Bitkisel Ürünler</span></a>
                                    </li>
                                    <li>
                                        <a href="" data-letters="Gifts &amp; Specialty"><span>Kişisel Bakım</span></a>
                                    </li>
                                    <li>
                                        <a href="" data-letters="Gifts &amp; Specialty"><span>Markaya Göre Alışveriş</span></a>
                                    </li>

                                </ul>
                        </div>
                </div>
            <div className="button-view"  style={{backgroundColor:"#66a7fd",height:60}}>
                <button type="button"  id="grid-view" data-toggle="tooltip" title="" className="active" data-original-title="Grid" style={{marginLeft:"1%",fontSize:"2rem",marginTop:"5px"}} onClick={
                    handleClickCard
                }>
                    <AppsIcon style={{fontSize:"2.5rem"}}/>
                </button>
                <button type="button" id="list-view" data-toggle="tooltip" title="" data-original-title="List" className="" style={{marginLeft:"1%",fontSize:"2rem",marginTop:"5px"}} onClick={
                    handleClickTable
                }>
                    <FormatListBulletedIcon style={{fontSize:"2.5rem"}}/>
                </button>
            </div>
            <br/>
            <div id="cardView"   >
                <Card.Group fluid itemsPerRow="3" >
                    {views}
                </Card.Group>
                <center>{pagination}</center>
            </div>
            <div style={{marginLeft:"1%",fontSize:"0.5rem"}}>
                <div id="tableProduct"  style={{display:"none"}} >
                    <TableContainer component={Paper} >
                        <Table  aria-label="customized table" >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Ürün Resmi</StyledTableCell>
                                    <StyledTableCell  align="center">Ürün Adı</StyledTableCell>
                                    <StyledTableCell  align="center">Ürün Açıklaması</StyledTableCell>
                                    <StyledTableCell  align="center">Fiyatı</StyledTableCell>
                                    <StyledTableCell  align="center">Adeti</StyledTableCell>
                                    <StyledTableCell  align="center">Üreten Firma</StyledTableCell>
                                    <StyledTableCell align="center" >İşlemler</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentProducts2.map((row) => (
                                    <StyledTableRow key={row.picture1}>
                                        <StyledTableCell align="center">{
                                            <Image src={row.picture1}  style={{width: 100, height:100,borderRadius:100/2,display:"inline"}}>
                                            </Image>
                                        }</StyledTableCell>
                                        <StyledTableCell  align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell  align="center">{row.description}</StyledTableCell>
                                        <StyledTableCell  align="center" >{row.price}</StyledTableCell>
                                        <StyledTableCell  align="center" >{row.piece}</StyledTableCell>
                                        <StyledTableCell  align="center" >{row.manufacturer_name}</StyledTableCell>
                                        <StyledTableCell align="center">{
                                            <div>
                                                <Detail product={row}/>
                                                    <IconButton style={{backgroundColor:"#66a7fd",marginLeft:"1%"}}  onClick={() => {HandleShoppingCart(row)}}>
                                                        <ShoppingCartIcon/>
                                                    </IconButton>

                                                <IconButton style={{backgroundColor:"#66a7fd",marginLeft:"1%"}} onClick={() => {HandleWishList(row)}}>
                                                    <FavoriteBorderIcon/>
                                                </IconButton>
                                                <IconButton style={{backgroundColor:"#66a7fd",marginLeft:"1%"}}>
                                                    <BarChartIcon/>
                                                </IconButton>


                                            </div>


                                        }</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>

            </div>
        </div>
    );
}
