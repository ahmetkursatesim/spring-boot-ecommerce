import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Form, Image, Menu, Modal} from "semantic-ui-react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Context from "../../config/context";
import TableCell from "@material-ui/core/TableCell";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {store} from "react-notifications-component";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));
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


export default function ShoppingCartMenu() {
    const classes = useStyles();
    const context = useContext(Context);
    const { user,wish,removeInstantlyWish} = context;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const path = "home";
    const [activeItem, setActiveItem] = useState(path);
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
        setOpen(false);

    }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);

    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    function getTotalPrice(){
        let totalPrice=0.0
        if(localStorage.hasOwnProperty("wish")){
            var temp2=JSON.parse(wish)
            for (var key in Object.keys(temp2)) {
                totalPrice=totalPrice+(temp2[parseInt(Object.keys(temp2)[key])][1]*temp2[parseInt(Object.keys(temp2)[key])][0].price)
            }

        }
        return totalPrice

    }
    function getrowTotalPrice(rowTmp){
        let totalrowPrice=0.0
        if(localStorage.hasOwnProperty("wish")){
            var temp2=JSON.parse(wish)
            totalrowPrice=totalrowPrice+(temp2[parseInt(rowTmp.id)][1]*temp2[parseInt(rowTmp.id)][0].price)

        }
        return totalrowPrice

    }

    function HandleRemoveInstantlywish(productRow){
        removeInstantlyWish(productRow)
        store.addNotification({
            title: "Süper!",
            message: "Ürün İstek Listesinden Çıkarıldı",
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

    const Totalprice=getTotalPrice()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    let cartList=[]

    if(localStorage.hasOwnProperty("wish")){
        var temp=JSON.parse(wish)
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




    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root} style={{float:"left",borderRadius:"1000px"}}>
            <div style={{float:"left"}}>
                    <FavoriteBorderIcon style={{fontSize:"2.5rem",float:"left",marginRight:"15px"}} ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}/>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    {cartList.length>0?(
                                            <div>
                                                <TableContainer>
                                                    <Table  aria-label="customized table" >
                                                        <TableHead>
                                                            <TableRow>
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
                                                                        <div >
                                                                            <center>
                                                                                <div >
                                                                                    {JSON.parse(wish)[row.id][1]}
                                                                                </div>
                                                                            </center>
                                                                        </div>
                                                                    }</StyledTableCell>
                                                                    <StyledTableCell align="center">{
                                                                        getrowTotalPrice(row)
                                                                    }</StyledTableCell>
                                                                    <StyledTableCell align="center">{
                                                                        <IconButton type="button" color="primary" aria-label="upload picture" component="span" onClick={()=>{HandleRemoveInstantlywish(row)}} >
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
                                            </div>

                                        ):(<div>İstek Listenizde Ürün Bulunmamaktadır</div>)
                                    }



                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
