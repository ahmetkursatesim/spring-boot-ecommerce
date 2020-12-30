import React, {useContext, useEffect, useState} from "react";
import "../main.css"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {Button, Form, Image, Modal} from "semantic-ui-react";
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import Context from "../config/context";
import TableCell from "@material-ui/core/TableCell";
import {store} from "react-notifications-component";
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

export default function ShoppingCart() {
    const context = useContext(Context);
    const { user,addCart,cart,removeCart,removeInstantlyCart,addOrder } = context;
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
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
    };

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
    const Totalprice=getTotalPrice()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    let cartList=[]

    if(localStorage.hasOwnProperty("cart")){
        var temp=JSON.parse(cart)
        for (var key in Object.keys(temp)) {
            cartList.push(temp[parseInt(Object.keys(temp)[key])][0])
        }

    }

    const indexOfLastProduct2 = (page+1) * rowsPerPage;
    const indexOfFirstProduct2= indexOfLastProduct2- rowsPerPage;
    const currentProducts2 = cartList.slice(
        indexOfFirstProduct2,
        indexOfLastProduct2
    );

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        cart.length>0?(
            <div   style={{width:"100%",marginLeft:"0",marginRight:"0" ,minHeight:"550px",marginTop:"50px"}}>
                <TableContainer component={Paper} >
                    <Table  aria-label="customized table" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Ürün Resmi</StyledTableCell>
                                <StyledTableCell  align="center">Ürün Adı</StyledTableCell>
                                <StyledTableCell  align="center">Fiyatı</StyledTableCell>
                                <StyledTableCell align="center" >Ürün Adeti</StyledTableCell>
                                <StyledTableCell align="center" >Toplam</StyledTableCell>
                                <StyledTableCell align="center" ></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentProducts2.map((row) => (
                                <StyledTableRow key={row.picture1}>
                                    <StyledTableCell align="center">{
                                        <Image src={row.picture1}  style={{width: 50, height:50,borderRadius:100/2,display:"inline"}}>
                                        </Image>
                                    }</StyledTableCell>
                                    <StyledTableCell  align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell  align="center" >{row.price}</StyledTableCell>
                                    <StyledTableCell align="center">{
                                        <div >
                                            <center>
                                                <IconButton type="button" color="primary" aria-label="upload picture" component="span" onClick={()=>{HandleShoppingCart(row)}} >
                                                    <AddIcon style={{fontSize:"2rem"}}/>
                                                </IconButton>
                                                <div >
                                                    {JSON.parse(cart)[row.id][1]}
                                                </div>

                                                <IconButton type="button" color="primary" aria-label="upload picture" component="span"  onClick={()=>{HandleRemoveShoppingCart(row)}}>
                                                    <RemoveIcon style={{fontSize:"2rem"}}/>
                                                </IconButton>
                                            </center>


                                        </div>


                                    }</StyledTableCell>
                                    <StyledTableCell align="center">{
                                        getrowTotalPrice(row)
                                    }</StyledTableCell>
                                    <StyledTableCell align="center">{
                                        <IconButton type="button" color="primary" aria-label="upload picture" component="span" onClick={()=>{HandleRemoveInstantlyCart(row)}} >
                                            <DeleteIcon style={{fontSize:"2rem"}}/>
                                        </IconButton>
                                    }</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 16]}
                        component="div"
                        count={cartList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableContainer>

                <br/>
                <center>
                    <header> <strong>  Sepet Toplamı  </strong>  </header>

                </center>

                <br/>
                <div style={{width:"100%",backgroundColor:"#66a7fd",height:"40px",borderRadius:1000}}>

                    <strong style={{marginLeft:"1%",float:"left",marginTop:"0.5%"}}>Sepet Toplamı</strong>

                    <div style={{marginLeft:"42%",display:"flex",marginTop:"0.5%",float:"left"}}>
                        <strong>Ürün Sayısı:{cartList.length}</strong>
                    </div>
                    <div style={{float:"right",marginTop:"0.5%",marginRight:"1%"}}>
                        <strong >Fiyat Toplamı:{Totalprice} TL </strong>
                    </div>



                </div>
                <br/>
                {user ?(  <Form onSubmit={handleSubmit}>
                    <Button  primary style={{float:"right",marginTop:"2%",marginRight:"0px"}}> Ödeme Sayfası </Button>
                </Form>):(
                    <div>
                        <div> Sepetinizde Ürün Bulunmamaktadır</div>
                    </div>
                )

                }


            </div>
        ):(
            <div style={{marginTop:"125px",minHeight:"475px"}}><h1>

                Sepetinizde Ürün Bulunmamaktadır


            </h1></div>
        )

    );
}
