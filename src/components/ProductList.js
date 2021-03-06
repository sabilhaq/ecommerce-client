import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { loadMoreProducts, loadProducts } from '../actions';
import ProductItem from './ProductItem';
import './ProductList.scss';

export default function ProductList() {
  const { products } = useSelector(
    (state) => ({
      products: state.products,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem('search');
    dispatch(loadProducts({}));
  }, [dispatch]);

  // const remove = useCallback(
  //   (id) => {
  //     dispatch(removeProduct(id));
  //   },
  //   [dispatch]
  // );

  // const handleLoadMore = (e) => {
  const handleLoadMore = () => {
    if (!products.noData) {
      dispatch(loadMoreProducts({ page: products.page + 1 }));
    }
  };

  const nodeList = products.products.map((item) => (
    <ProductItem
      key={item.id}
      id={item.id}
      title={item.title}
      sent={item.sent}
      rate={item.rate}
      description={item.description}
      price={item.price}
      photos={item.photos}
      UserId={item.UserId}
    // resend={() => resend(item._id, item.title)}
    // remove={() => remove(item._id)}
    />
  ));

  if (nodeList.length === 0) {
    return (
      <div className='ProductList NoData'>
        <div className=''>Tidak ada data</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className='ProductList'>{nodeList}</div>

      <div className='More'>
        {!localStorage.getItem('search') && <button onClick={handleLoadMore}>Load more</button>}
      </div>
    </React.Fragment>
  );
}
