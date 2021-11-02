import {
  LOAD_PRODUCT,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  ADD_PRODUCT,
  ADD_PRODUCT_DRAWING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  // RESEND_PRODUCT,
  // RESEND_PRODUCT_SUCCESS,
  // RESEND_PRODUCT_FAILURE,
  // REMOVE_PRODUCT,
  // REMOVE_PRODUCT_SUCCESS,
  // REMOVE_PRODUCT_FAILURE,
} from "../constant";

export const loadProductSuccess = (products) => ({
  type: LOAD_PRODUCT_SUCCESS,
  products,
});

export const loadProductFailure = () => ({
  type: LOAD_PRODUCT_FAILURE,
});

export const loadProduct = () => ({
  type: LOAD_PRODUCT,
});

export const drawAddProduct = (id, title) => ({
  type: ADD_PRODUCT_DRAWING,
  id,
  title,
});

export const addProductSuccess = (oldId, product) => ({
  type: ADD_PRODUCT_SUCCESS,
  oldId,
  product,
});

export const addProductFailure = (id) => ({
  type: ADD_PRODUCT_FAILURE,
  id,
});

export const addProduct = (input) => ({
  type: ADD_PRODUCT,
  input,
});

// export const resendProductSuccess = (oldId, product) => ({
//   type: RESEND_PRODUCT_SUCCESS,
//   oldId,
//   product,
// });

// export const resendProductFailure = () => ({
//   type: RESEND_PRODUCT_FAILURE,
// });

// export const resendProduct = (oldId, title) => ({
//   type: RESEND_PRODUCT,
//   oldId,
//   title,
// });

// export const removeProductSuccess = (id) => ({
//   type: REMOVE_PRODUCT_SUCCESS,
//   id,
// });

// export const removeProductFailure = () => ({
//   type: REMOVE_PRODUCT_FAILURE,
// });

// export const removeProduct = (id) => ({
//   type: REMOVE_PRODUCT,
//   id,
// });
