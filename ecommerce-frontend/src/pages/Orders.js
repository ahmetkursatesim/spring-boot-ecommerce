import React, {useContext, useEffect, useState} from "react";

import Context from "../config/context";

import {
    Form,
    Modal,
    Button,
    Header,
    Dropdown,
    Image,
    Grid
} from "semantic-ui-react";
import {IconButton} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import OrderDetail from "../components/Order/OrderDetail";
import Detail from "../components/detailProduct";
import Select from 'react-select';
import Moment from "react-moment";
import InfoIcon from "@material-ui/icons/Info";
import UpdateIcon from '@material-ui/icons/Update';
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

export default function Orders() {
    const context = useContext(Context);
    const { user,orders,getOrders,updateOrderStatus } = context;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    useEffect(() => {
        user? getOrders(user.id):getOrders(-1)

    }, []);
    debugger;
    const indexOfLastProduct2 = (page+1) * rowsPerPage;
    const indexOfFirstProduct2= indexOfLastProduct2- rowsPerPage;
    const currentProducts2 = orders.reverse().slice(
        indexOfFirstProduct2,
        indexOfLastProduct2
    );
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const optionsDrop = [
        {
            value: 'Preparing',
            label: 'Preparing'
        },
        {
            value: 'Reached',
            label: 'Reached'
        },
        {
            value: 'Shipped',
            label: 'Shipped'
        },
        {
            value: 'Receipt',
            label: 'Receipt'
        },
    ]
    const defaultOption = optionsDrop[3];


    let selectedValue=null
    const stateDrop = inputValue => { // whole object of selected option
        selectedValue=inputValue.value
    };

    function _onSelect(order_id,user_id) {
        if(selectedValue != null){
            updateOrderStatus(order_id,user_id,selectedValue)
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

        <div style={{width:"100%",marginTop:"200px",minHeight:"900px"}}>
            <TableContainer component={Paper} >
                <Table  aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Ürün Numarası</StyledTableCell>
                            <StyledTableCell  align="center">Müşteri</StyledTableCell>
                            <StyledTableCell  align="center">Sipariş Durumu</StyledTableCell>
                            <StyledTableCell  align="center">Sipariş Günü</StyledTableCell>
                            <StyledTableCell  align="center">İşlemler</StyledTableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {currentProducts2.map((row) => (
                            <StyledTableRow key={row.order_id}>
                                <StyledTableCell align="center">{ row.order_id }</StyledTableCell>
                                <StyledTableCell align="center">{
                                    user.admin?(row.user_id):(user.name)
                                }</StyledTableCell>
                                <StyledTableCell align="center">{
                                  row.order_status
                                }</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Moment format="DD/MM/YYYY HH:mm:ss" >
                                        {row.created_at}
                                    </Moment>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <OrderDetail orders={row.productsMasters} />
                                    {
                                       user.admin?(
                                               <div >
                                                   <Select defaultValue={defaultOption} options={optionsDrop}  style={{float:"left"}}   onChange={stateDrop}/>
                                                   <IconButton style={{backgroundColor:"#66a7fd",float:"left"}} onClick={()=>_onSelect(row.order_id,user.id)} >
                                                       <UpdateIcon/>
                                                   </IconButton>
                                               </div>
                                       ):( <div></div>)
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>


        </div>


    );
}




