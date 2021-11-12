import React from 'react';
import { useHistory, withRouter } from 'react-router';
import ProductList from './ProductList';
import './ProductBox.scss';
import Navbar from './Navbar';

function ProductBox() {
  let history = useHistory();

  return (
    <React.Fragment>
      <Navbar />

      <div className='ProductBox'>
        <button onClick={() => history.push('/add')} className='btn-add'>
          Add Ads
        </button>

        <ProductList />
      </div>
    </React.Fragment>
  );
}

export default withRouter(ProductBox);
