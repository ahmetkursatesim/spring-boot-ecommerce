import React, { useContext, useEffect } from "react";

import Context from "../../config/context";

import {
    Form,
    Modal,
    Button,
    Header,
    Dropdown,
    Image,
    Grid
} from "semantic-ui-react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import InfoIcon from "@material-ui/icons/Info";
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
export default function OrderDetail(props) {
    const colorBtn={
        backgroundColor:"#66a7fd"
    }
    const context = useContext(Context);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const indexOfLastProduct2 = (page+1) * rowsPerPage;
    const indexOfFirstProduct2= indexOfLastProduct2- rowsPerPage;
    const currentProducts2 = props.orders.slice(
        indexOfFirstProduct2,
        indexOfLastProduct2
    );

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const Totalprice= getTotalPrice()
    function getTotalPrice(){
        let totalPrice=0.0
        for(var i=0;i<props.orders.length;i++){
            totalPrice=totalPrice+(props.orders[i].orderQuantity*props.orders[i].price)

        }
        return totalPrice
    }

    return (
        <Modal trigger={
            <IconButton style={{backgroundColor:"#66a7fd",float:"left",marginRight:"15px"}}>
                <InfoIcon/>
            </IconButton>
        }>
            <Modal.Content>
                <Modal.Header>
                    <h1>Sipariş Detayı</h1>
                </Modal.Header>
                <TableContainer component={Paper} >
                    <Table  aria-label="customized table" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Ürün Resmi</StyledTableCell>
                                <StyledTableCell  align="center">Adı</StyledTableCell>
                                <StyledTableCell  align="center">Fiyatı</StyledTableCell>
                                <StyledTableCell align="center" >Adeti</StyledTableCell>
                                <StyledTableCell align="center" >Toplam</StyledTableCell>
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
                                    <StyledTableCell  align="center" >{row.price}</StyledTableCell>
                                    <StyledTableCell align="center">{
                                       row.orderQuantity
                                    }</StyledTableCell>
                                    <StyledTableCell align="center">{
                                        row.orderQuantity*row.price
                                    }</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 16]}
                        component="div"
                        count={props.orders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableContainer>
                <div style={{width:"100%",backgroundColor:"#66a7fd",height:"30px",borderRadius:1000}}>
                    <p style={{float:"left",marginTop:"0.5%",marginLeft:"2%"}}>Sipariş Toplamı</p>
                    <p style={{float:"left",marginTop:"0.5%",marginLeft:"35%"}}>Ürün sayısı:{props.orders.length}</p>
                    <p style={{float:"right",marginTop:"0.5%",marginRight:"2%"}}>{Totalprice} TL</p>
                    <strong style={{float:"right",marginTop:"0.5%",marginRight:"2%"}} >Toplam Fiyatı: </strong>

                </div>

            </Modal.Content>
        </Modal>
    );
}
