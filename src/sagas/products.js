import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as GraphQL from '../services/graphql';

export function* loadProducts({ queryStringObj }) {
  try {
    const products = yield call(GraphQL.loadProducts, queryStringObj);
    yield put(actions.loadProductsSuccess(products));
  } catch (error) {
    console.log(error);
    yield put(actions.loadProductsFailure());
  }
}

export function* loadMoreProducts({ queryStringObj }) {
  try {
    const products = yield call(GraphQL.loadProducts, queryStringObj);
    yield put(actions.loadMoreProductsSuccess(products));
  } catch (error) {
    console.log(error);
    yield put(actions.loadMoreProductsFailure());
  }
}

export function* loadProduct({ id }) {
  try {
    const product = yield call(GraphQL.loadProduct, id);
    yield put(actions.loadProductSuccess(product));
  } catch (error) {
    console.log(error);
    yield put(actions.loadProductFailure());
  }
}

export function* addProduct({ id, input }) {
  try {
    const product = yield call(GraphQL.addProduct, id, input);
    yield put(actions.addProductSuccess(product));
  } catch (error) {
    console.log(error);
    yield put(actions.addProductFailure(id));
  }
}

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
