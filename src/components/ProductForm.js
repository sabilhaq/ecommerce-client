import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { addProduct } from '../actions';
import Navbar from './Navbar';
import './ProductForm.scss';

function ProductForm() {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState({
    title: '',
    rate: 0,
    description: '',
    price: 0,
    brand: '',
    detail: '',
    quantity: 0,
  });

  const toCurrency = (number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return formatter.format(number);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  let history = useHistory();

  const handleSubmit = (e) => {
    dispatch(addProduct(input));
    history.push('/');
    e.preventDefault();
  };

  const handleCancel = (e) => {
    history.push('/');
    e.preventDefault();
  }

  return (
    <React.Fragment>
      <Navbar />

      <div className="ProductForm">
        <div className="Header">Add Ads</div>

        <div className="Body">
          <form className="Form">
            <div className="Row">
              <div className="Label">
                <label htmlFor="title">Title</label>
              </div>
              <div className="Input">
                <input
                  onChange={(e) => setInput({ ...input, title: e.target.value })}
                  name="title"
                  value={input.title}
                  type="text"
                  placeholder="Title"
                ></input>
              </div>
            </div>

            <div className="Row">
              <div className="Label">Rate</div>
              <div className="Input">
                <input
                  onChange={(e) =>
                    setInput({ ...input, rate: Number(e.target.value) })
                  }
                  name="rate"
                  value={input.rate}
                  type="number"
                  placeholder="Rate"
                ></input>
              </div>
            </div>

            <div className="Row">
              <div className="Label">Description</div>
              <div className="Input">
                <textarea
                  name="description"
                  onChange={(e) =>
                    setInput({ ...input, description: e.target.value })
                  }
                  value={input.description}
                  cols="30"
                  rows="3"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>

            <div className="Row">
              <div className="Label">Price</div>
              <div className="Input">
                {isEditing ? (
                  <input
                    type="number"
                    name="price"
                    value={input.price}
                    onBlur={toggleEditing}
                    onChange={(e) =>
                      setInput({ ...input, price: parseInt(e.target.value) })
                    }
                  />
                ) : (
                  <input
                    type="text"
                    name="price"
                    value={toCurrency(input.price)}
                    onFocus={toggleEditing}
                    readOnly
                  />
                )}
              </div>
            </div>

            <div className="Row">
              <div className="Label">Brand</div>
              <div className="Input">
                <input
                  onChange={(e) => setInput({ ...input, brand: e.target.value })}
                  name="brand"
                  value={input.brand}
                  type="text"
                  placeholder="Brand"
                ></input>
              </div>
            </div>

            <div className="Row">
              <div className="Label">Stock</div>
              <div className="Input">
                <input
                  onChange={(e) =>
                    setInput({ ...input, quantity: Number(e.target.value) })
                  }
                  name="quantity"
                  value={input.quantity}
                  type="number"
                  placeholder="Stock"
                ></input>
              </div>
            </div>

            <div className="Row">
              <div className="Label">Detail Product</div>
              <div className="Input">
                <textarea
                  onChange={(e) => setInput({ ...input, detail: e.target.value })}
                  name="detail"
                  value={input.detail}
                  cols="30"
                  rows="15"
                  placeholder="Detail Product"
                ></textarea>
              </div>
            </div>

            <div className="Row">
              <div className="Label"></div>
              <div className="Input">
                <button onClick={handleSubmit} className="btn btn-add">
                  Add
                </button>
                <button
                  onClick={(e) => handleCancel(e)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(ProductForm);
