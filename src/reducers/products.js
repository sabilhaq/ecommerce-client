import {
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
  // ADD_PRODUCT_FAILURE,
  // REMOVE_PRODUCT_SUCCESS,
  // REMOVE_PRODUCT_FAILURE,
  LOAD_MORE_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_FAILURE,
} from '../constant';

const initialState = {
  products: [],
  page: 1,
  noData: false,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_SUCCESS:
      const products = action.products.map((item) => {
        item.sent = true;
        return item;
      });
      return { ...state, products };

    case LOAD_PRODUCT_SUCCESS:
      return { ...state, products: [action.product] };

    // case ADD_PRODUCT_FAILURE:
    //   return state.map((item) => {
    //     if (action.id === item._id) item.sent = false;
    //     return item;
    //   });

    // case REMOVE_PRODUCT_SUCCESS:
    //   return state.filter((item) => action.id !== item._id);

    case LOAD_MORE_PRODUCTS_SUCCESS:
      if (action.products.length === 0) {
        return { ...state, products: [...state.products], noData: true };
      }

      const moreProducts = action.products.map((item) => {
        item.sent = true;
        return item;
      });
      return { ...state, products: [...state.products, ...moreProducts], page: state.page + 1 };

    // case REMOVE_PRODUCT_FAILURE:
    case ADD_PRODUCT_SUCCESS:
    case LOAD_PRODUCTS_FAILURE:
    case LOAD_PRODUCT_FAILURE:
    case LOAD_MORE_PRODUCTS_FAILURE:
    default:
      return state;
  }
};

export default products;
