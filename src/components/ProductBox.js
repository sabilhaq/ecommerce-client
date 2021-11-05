import { useHistory, withRouter } from 'react-router';
import ProductList from './ProductList';
import './ProductBox.scss';

function ProductBox() {
  let history = useHistory();

  return (
    <div className='ProductBox'>
      <nav></nav>
      <button onClick={() => history.push('/add')} className='btn-add'>
        Add Ads
      </button>

      <ProductList />
    </div>
  );
}

export default withRouter(ProductBox);
