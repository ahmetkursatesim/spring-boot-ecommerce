import React, { useContext, useState, useEffect } from "react";

import {Grid, Card, Segment, Image} from "semantic-ui-react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddProductForm from "../components/AddProductForm";
import Context from "../config/context";
import  "../stylesheet.css"
import "../main.css"
import Detail from "../components/detailProduct";
import EditProdutDetail from "../components/Product/EditProdutDetail";

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
        fontSize: 18,
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
export default function Products() {
  const context = useContext(Context);
  const { user, products, getProducts } = context;

  useEffect(() => {getProducts(user.id);}, []);
  pushItems(products)

  const add = user ? user.admin ? <AddProductForm /> : null : null;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const indexOfLastProduct = (page+1)* rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
  );

  const handleChangePage = (event, newPage) => {
        setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
  };

    function rootHeight(){
        var e = document.getElementById("root");
        var t = document.getElementById("backgroundImageTemp");
        if(e.clientHeight>0){
            t.style.height=e.clientHeight-15+"px";
        }

    }
    rootHeight()
  return (
      <div style={{width:"100%",marginLeft:"0",marginRight:"0",marginTop:"200px",minHeight:"750px"}}>
          <TableContainer component={Paper}>
              {add}
              <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell align="center">Ürün Resmi</StyledTableCell>
                          <StyledTableCell  align="center">Ürün Adı</StyledTableCell>
                          <StyledTableCell  align="center">Ürün Açıklaması</StyledTableCell>
                          <StyledTableCell  align="center">Fiyatı</StyledTableCell>
                          <StyledTableCell  align="center">Adeti</StyledTableCell>
                          <StyledTableCell  align="center">Üreten Firma</StyledTableCell>
                          <StyledTableCell  align="center">İşlemler</StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {currentProducts.map((row) => (
                          <StyledTableRow key={row.picture1}>
                              <StyledTableCell  align="center">{
                                  <Image src={row.picture1}  style={{width: 100, height:100,borderRadius:50,display:"inline"}}>
                                  </Image>
                              }</StyledTableCell>
                              <StyledTableCell  align="center">{row.name}</StyledTableCell>
                              <StyledTableCell  align="center">{row.description}</StyledTableCell>
                              <StyledTableCell  align="center">{row.price}</StyledTableCell>
                              <StyledTableCell  align="center">{row.piece}</StyledTableCell>
                              <StyledTableCell  align="center">{row.manufacturer_name}</StyledTableCell>
                              <StyledTableCell  align="center">{
                                  <div>
                                      <Detail product={row}/>
                                      <EditProdutDetail product={row} />
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

  );



}
