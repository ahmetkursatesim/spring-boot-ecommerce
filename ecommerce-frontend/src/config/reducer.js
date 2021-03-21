import {
  POST_CATEGORY,
  GET_CATEGORIES,
  GET_PRODUCTS,
  POST_USER,
  POST_PRODUCTS,
  GET_USER,
  GET_CURRENCY,
    POST_FILE,
    POST_CART,
    POST_WISH,
  POST_ORDERS,
    GET_ORDERS,
    POST_PRODUCT,
    POST_FILTERED_PRODUCT
} from "./values";

export default (state, action) => {
  switch (action.type) {
    case GET_CURRENCY:
      return {
        ...state,
        currency: action.payload
      };
    case POST_USER:
      return {
        ...state,
        user: action.payload
      };
    case POST_CATEGORY:
      return {
        ...state,
        categories: action.payload
      };
    case POST_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case POST_FILE:
      return {
        ...state,
        FILE: action.payload
      };
    case POST_CART:
      return {
        ...state,
        cart: action.payload
      };
    case POST_WISH:
      return {
        ...state,
        wish: action.payload
      };
    case POST_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case POST_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case POST_FILTERED_PRODUCT:
      return {
        ...state,
        searchedProducts: action.payload
      };

    default:
      return state;
  }
};
