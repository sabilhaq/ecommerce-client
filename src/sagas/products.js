import { all, takeEvery, put, call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../actions';
import {
  LOAD_PRODUCT,
  ADD_PRODUCT,
  // REMOVE_PRODUCT,
  // RESEND_PRODUCT,
} from '../constant';
// import * as API from "../services/products";
import * as GraphQL from '../services/graphql';

/*
return dispatch => {
    return request.get('products')
      .then(function (response) {
        dispatch(loadProductSuccess(response.data.products))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadProductFailure())
      });
  }
*/

function* loadProduct() {
  try {
    const products = yield call(GraphQL.loadProducts);
    yield put(actions.loadProductSuccess(products));
  } catch (error) {
    console.log(error);
    yield put(actions.loadProductFailure());
  }
}

/*
const id = uuidv4()
  return dispatch => {
    dispatch(drawAddProduct(id, title))
    return request.post('products', { title })
      .then(function (response) {
        dispatch(addProductSuccess(id, response.data.product))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(addProductFailure(id))
      });
  }
*/

function* addProduct(payload) {
  const { input } = payload;
  const id = uuidv4();
  try {
    yield put(actions.drawAddProduct(id, input));

    const product = yield call(GraphQL.addProduct, input);
    yield put(actions.addProductSuccess(id, product));
  } catch (error) {
    console.log(error);
    yield put(actions.addProductFailure(id));
  }
}

/*
return dispatch => {
    return request.post('products', { title })
      .then(response => {
        dispatch(resendProductSuccess(oldId, response.data.product))
      }).catch(err => {
        dispatch(resendProductFailure())
      })
  }
*/

// function* resendProduct(payload) {
//   const { oldId, title } = payload;
//   try {
//     const product = yield call(API.createProduct, title);
//     yield put(actions.resendProductSuccess(oldId, product));
//   } catch (error) {
//     console.log(error);
//     yield put(actions.resendProductFailure());
//   }
// }

/*
return dispatch => {
    return request.delete(`products/${id}`)
      .then(response => {
        dispatch(removeProductSuccess(id))
      }).catch(err => {
        dispatch(removeProductFailure())
      })
  }
*/

// function* removeProduct(payload) {
//   const { id } = payload;
//   try {
//     const product = yield call(API.removeProduct, id);
//     yield put(actions.removeProductSuccess(product._id));
//   } catch (error) {
//     console.log(error);
//     yield put(actions.removeProductFailure());
//   }
// }

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_PRODUCT, loadProduct),
    takeEvery(ADD_PRODUCT, addProduct),
    // takeEvery(RESEND_PRODUCT, resendProduct),
    // takeEvery(REMOVE_PRODUCT, removeProduct),
  ]);
}
