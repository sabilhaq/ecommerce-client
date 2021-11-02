import {
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  // ADD_PRODUCT_DRAWING,
  // ADD_PRODUCT_SUCCESS,
  // ADD_PRODUCT_FAILURE,
  // RESEND_PRODUCT_FAILURE,
  // RESEND_PRODUCT_SUCCESS,
  // REMOVE_PRODUCT_SUCCESS,
  // REMOVE_PRODUCT_FAILURE,
} from "../constant";

const products = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCT_SUCCESS:
      return action.products.map((item) => {
        item.sent = true;
        return item;
      });

    // case ADD_PRODUCT_DRAWING:
    //   return [
    //     ...state,
    //     {
    //       _id: action.id,
    //       title: action.title,
    //       sent: true,
    //     },
    //   ];

    // case ADD_PRODUCT_SUCCESS:
    //   return state.map((item) => {
    //     if (action.oldId === item._id) item._id = action.product._id;
    //     return item;
    //   });

    // case ADD_PRODUCT_FAILURE:
    //   return state.map((item) => {
    //     if (action.id === item._id) item.sent = false;
    //     return item;
    //   });

    // case RESEND_PRODUCT_SUCCESS:
    //   return state.map((item) => {
    //     if (action.oldId === item._id) {
    //       item._id = action.product._id;
    //       item.sent = true;
    //     }
    //     return item;
    //   });

    // case REMOVE_PRODUCT_SUCCESS:
    //   return state.filter((item) => action.id !== item._id);

    // case REMOVE_PRODUCT_FAILURE:
    // case RESEND_PRODUCT_FAILURE:
    case LOAD_PRODUCT_FAILURE:
    default:
      return state;
  }
};

export default products;
