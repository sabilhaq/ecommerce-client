import {
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  // ADD_PRODUCT_FAILURE,
  // REMOVE_PRODUCT_SUCCESS,
  // REMOVE_PRODUCT_FAILURE,
} from '../constant';

const products = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_SUCCESS:
      return action.products.map((item) => {
        item.sent = true;
        return item;
      });

    case LOAD_PRODUCT_SUCCESS:
      return [...state, action.product];

    // case ADD_PRODUCT_FAILURE:
    //   return state.map((item) => {
    //     if (action.id === item._id) item.sent = false;
    //     return item;
    //   });

    // case REMOVE_PRODUCT_SUCCESS:
    //   return state.filter((item) => action.id !== item._id);

    // case REMOVE_PRODUCT_FAILURE:
    case ADD_PRODUCT_SUCCESS:
    case LOAD_PRODUCTS_FAILURE:
    case LOAD_PRODUCT_FAILURE:
    default:
      return state;
  }
};

export default products;
