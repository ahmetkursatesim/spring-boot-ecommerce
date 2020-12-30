import React, { useReducer } from "react";

import axiosClient from "./axios";
import currencyClient from "./apiCurrency";

// context
import userContext from "./context";

// reducer
import Reducer from "./reducer";

// type tags
import {
  GET_CURRENCY,
  GET_USER,
  GET_CATEGORIES,
  GET_PRODUCTS,
  POST_USER,
  POST_CATEGORY,
  POST_PRODUCTS,
  POST_FILE, POST_CART,
  POST_WISH, POST_ORDERS,GET_ORDERS
} from "./values";

const Context = props => {
  let initialStatetmp = {
    user: null,
    currency: null,
    products: [],
    categories: [],
    cart:[],
    wish:[],
    orders:[]
  };
  let initialState = localStorage.getItem('user') ? (
      {
        user: JSON.parse(localStorage.getItem('user')),
        currency:localStorage.getItem('currency'),
        products: [],
        categories: [],
        cart:localStorage.getItem('cart') ? localStorage.getItem('cart'):[],
        wish:localStorage.getItem('wish') ? localStorage.getItem('wish'):[],
        orders:[]
      }
  ): ({
    user: null,
    currency: null,
    products: [],
    categories: [],
    cart:localStorage.getItem('cart') ? localStorage.getItem('cart'):[],
    wish:localStorage.getItem('wish') ? localStorage.getItem('wish'):[],
    orders:[]

  });
  const [state, dispatch] = useReducer(Reducer, initialState);

  // API Currency
  const getCurrency = async () => {
    const res = await currencyClient.get("");

    dispatch({
      type: GET_CURRENCY,
      payload: res.data
    });
  };

  // POST Methods
  const addUser = async user => {
    const res = await axiosClient.post("/users/add", user);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({
      type: POST_USER,
      payload: res.data
    });
  };

  async function addCart(cart){
    var tmpCart2={}
    if(localStorage.hasOwnProperty("cart")){
      tmpCart2=JSON.parse(localStorage.getItem("cart"))
    }
    if(!tmpCart2.hasOwnProperty(cart.id)){
      tmpCart2[cart.id]=[cart,1]

    }else{
      tmpCart2[cart.id]=[cart,parseInt(tmpCart2[cart.id][1])+1]
    }
    localStorage.setItem("cart",JSON.stringify(tmpCart2))
    dispatch({
    type: POST_CART,
      payload: JSON.stringify(tmpCart2)
     });
  }
  async function removeCart(cart){
    var tmpCart2={}
    if(localStorage.hasOwnProperty("cart")){
      tmpCart2=JSON.parse(localStorage.getItem("cart"))
    }
    debugger;
    if(tmpCart2.hasOwnProperty(cart.id)){
      if(tmpCart2[cart.id][1]===1){
        delete tmpCart2[cart.id]
      }else{
        tmpCart2[cart.id]=[cart,parseInt(tmpCart2[cart.id][1])-1]
      }

    }
    localStorage.setItem("cart",JSON.stringify(tmpCart2))
    dispatch({
      type: POST_CART,
      payload: JSON.stringify(tmpCart2)
    });
  }

  async function removeInstantlyCart(cart){
    var tmpCart2={}
    debugger;
    if(localStorage.hasOwnProperty("cart")){
      tmpCart2=JSON.parse(localStorage.getItem("cart"))
    }
    if(tmpCart2.hasOwnProperty(cart.id)){
      delete tmpCart2[cart.id]
    }
    localStorage.setItem("cart",JSON.stringify(tmpCart2))
    dispatch({
      type: POST_CART,
      payload: JSON.stringify(tmpCart2)
    });
  }



  async function removeInstantlyWish(cart){
    var tmpCart2={}
    if(localStorage.hasOwnProperty("wish")){
      tmpCart2=JSON.parse(localStorage.getItem("wish"))
    }
    if(tmpCart2.hasOwnProperty(cart.id)){
      delete tmpCart2[cart.id]

    }
    localStorage.setItem("wish",JSON.stringify(tmpCart2))
    dispatch({
      type: POST_WISH,
      payload: JSON.stringify(tmpCart2)
    });
  }



  async function addWishList(cart){
    var tmpCart2={}
    if(localStorage.hasOwnProperty("wish")){
      tmpCart2=JSON.parse(localStorage.getItem("wish"))
    }
    if(!tmpCart2.hasOwnProperty(cart.id)){
      tmpCart2[cart.id]=[cart,1]

    }else{
      tmpCart2[cart.id]=[cart,parseInt(tmpCart2[cart.id][1])+1]
    }
    localStorage.setItem("wish",JSON.stringify(tmpCart2))
    dispatch({
      type: POST_WISH,
      payload: JSON.stringify(tmpCart2)
    });
  }

  const addCategory = async category => {
    const res = await axiosClient.post("/categories/add", category);

    dispatch({
      type: POST_CATEGORY,
      payload: res.data
    });
  };



  async function uploadFile(file){
    const file2 = new Blob([file], {type: 'text/plain'});
    var formData = new FormData();
    formData.append("file", file2);
    var pathCloud=await axiosClient.post("/file/upload",formData , {headers: {'Content-Type': 'multipart/form-data'}})
    return  pathCloud

  }
  const uploadProfilePhoto=async user => {
    const res = await axiosClient.post("/users/updatephoto", user);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({
      type: POST_USER,
      payload: res.data
    });
  };
  const addProduct = async product => {
    const res = await axiosClient.post("/products/add", product);
    dispatch({
      type: POST_PRODUCTS,
      payload: res.data
    });
  };

  const addOrder = async order => {
    const res = await axiosClient.post("/ordermaster/add", order);
    localStorage.setItem("orders", JSON.stringify(res.data));
    dispatch({
      type: POST_ORDERS,
      payload: res.data
    });
  };

  const editProduct = async product => {
    const res = await axiosClient.post("/products/edit", product);
    dispatch({
      type: POST_PRODUCTS,
      payload: res.data
    });
  };

  // GET Methods
  const getUser = async user => {
    const res = await axiosClient.get("/users/" + user.email);
    debugger;
    if (res.data.password === user.password) {
      var tmpdata=JSON.stringify(res.data)
      localStorage.setItem("user", tmpdata);
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    }else{
      dispatch({
        type: GET_USER,
        payload: ""
      });
    }


  };

  const changeAdress =async adress => {
    debugger;
    const res = await axiosClient.post("/adresses/add",adress);

    var tmpdata=JSON.stringify(res.data)
    localStorage.setItem("user", tmpdata);
    dispatch({
      type: POST_USER,
      payload: res.data
    });

  };


  const getCategories = async () => {
    const res = await axiosClient.get("/categories/all");
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  };
  async function getProducts(id){
    const res = await axiosClient.get("/products/all/"+id);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });

  }
  async function updateOrderStatus(order_id,user_id,status){
    const res = await axiosClient.post("/ordermaster/updateorderstatus/"+order_id+"/"+status+"/"+user_id);
    debugger;
    dispatch({
      type: POST_ORDERS,
      payload: res.data
    });
  }

  async function getOrders(id){
    const res = await axiosClient.get("/ordermaster/all/"+id);
    localStorage.setItem("orders", JSON.stringify(res));
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });

  }
  return (
    <userContext.Provider
      value={{
        user: state.user,
        currency: state.currency,
        categories: state.categories,
        products: state.products,
        cart:state.cart,
        orders:state.orders,
        wish:state.wish,
        addUser,
        addCategory,
        addProduct,
        getUser,
        getCategories,
        getProducts,
        getCurrency,
        uploadFile,
        uploadProfilePhoto,
        editProduct,
        addCart,
        addWishList,
        removeCart,
        removeInstantlyCart,
        addOrder,getOrders,
        updateOrderStatus,
        changeAdress,
        removeInstantlyWish
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default Context;
