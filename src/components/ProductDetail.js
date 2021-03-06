import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import marked from 'marked';
import { loadProduct } from '../actions';
import Navbar from './Navbar';
import './ProductDetail.scss';

export default function ProductDetail() {
  let { id } = useParams();
  let history = useHistory();

  const { product } = useSelector(
    (state) => ({
      product: state.products.products[0],
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct(id));
  }, [dispatch, id]);

  const colorStyle = {
    backgroundColor: '#000000',
    width: '40px',
    height: '30px',
    borderRadius: '4px',
  };

  const [input, setInput] = useState({
    color: '',
    capacity: '',
    quantity: 1,
  });

  const [tabActive, setTabActive] = useState(1);

  const [capacitySelected, setCapacitySelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');

  const handleClickCapacity = (capacity) => {
    setCapacitySelected(capacity);
    setInput({ ...input, capacity });
  };
  const handleClickColor = (color) => {
    setColorSelected(color);
    setInput({ ...input, color });
  };

  const handleBuy = () => {
    const order = `Saya berminat dengan,  
    Nama barang: ${product.title}  
    Brand: ${product.brand}  
    Kapasitas: ${input.capacity}  
    Warna: ${input.color}  
    Harga: Rp${product.price.toLocaleString('id-ID')}  
    Jumlah: ${input.quantity}`;

    history.push({
      pathname: '/chats',
      search: '?message=abc',
      state: { order, receiver: product.UserId },
    });
  };

  if (!product) {
    return <div className='ProductDetail Loading'>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Navbar />

      <div className='ProductDetail'>
        <div className='Product'>
          <div className='PhotoContainer'>
            <img
              src={product.photos && `${process.env.REACT_APP_BASE_URL}${product.photos[0]}`}
              alt='Samsung'
              width='100%'
            />
          </div>

          <div className='Detail'>
            <h1 className='Title'>{product.title}</h1>

            <div className='Brand'>
              <span className='BrandWord'>Brand</span>
              <span className='TheBrand'>{product.brand}</span>
              <span className='Separator'>&#9642;</span>
              <span>({product.votes} votes)</span>
            </div>

            <div className='Price'>
              <p className='PriceWord'>PRICE</p>
              <p className='ThePrice'>
                Rp{product.price ? product.price.toLocaleString('id-ID') : 0}
              </p>
            </div>

            <div className='Variant'>
              <div className='ColorContainer'>
                <p className='ColorWord'>COLOR</p>
                {/* color picker */}
                <div className='Colors'>
                  <button
                    onClick={() => handleClickColor('Hitam')}
                    className={colorSelected === 'Hitam' ? 'Color active' : 'Color'}
                    style={colorStyle}
                  ></button>
                  <button
                    onClick={() => handleClickColor('Putih')}
                    className={colorSelected === 'Putih' ? 'Color active' : 'Color'}
                    style={{
                      backgroundColor: '#ffffff',
                      width: '40px',
                    }}
                  ></button>
                </div>
              </div>

              <div className='CapacityContainer'>
                <p className='CapacityWord'>CAPACITY</p>
                {/* capacity picker */}
                <div className='Capacities'>
                  <button
                    onClick={() => handleClickCapacity('16 GB')}
                    className={capacitySelected === '16 GB' ? 'Capacity active' : 'Capacity'}
                  >
                    16 GB
                  </button>
                  <button
                    onClick={() => handleClickCapacity('32 GB')}
                    className={capacitySelected === '32 GB' ? 'Capacity active' : 'Capacity'}
                  >
                    32 GB
                  </button>
                </div>
              </div>

              <div className='QuantityContainer'>
                <p className='QuantityWord'>QTY</p>
                <button
                  className='btn-decrease'
                  onClick={(e) => setInput({ ...input, quantity: input.quantity - 1 })}
                >
                  -
                </button>
                <input
                  type='number'
                  onChange={(e) => setInput({ ...input, quantity: Number(e.target.value) })}
                  value={input.quantity}
                ></input>
                <button
                  className='btn-add'
                  onClick={(e) => setInput({ ...input, quantity: input.quantity + 1 })}
                >
                  +
                </button>
              </div>

              <button onClick={() => handleBuy()} className='Buy'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-shopping-cart'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  stroke='currentColor'
                  fill='none'
                  // fill='#fff'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                  <circle cx={6} cy={19} r={2}></circle>
                  <circle cx={17} cy={19} r={2}></circle>
                  <path d='M17 17h-11v-14h-2'></path>
                  <path d='M6 5l14 1l-1 7h-13'></path>
                </svg>

                <span>Buy</span>
              </button>

              <div className='Like'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-heart'
                  width={16}
                  height={16}
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                  <path d='M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572'></path>
                </svg>

                <span>Like</span>
              </div>
            </div>
          </div>
        </div>

        <div className='DetailReview'>
          <div className='Tabs'>
            <button onClick={() => setTabActive(1)} className={tabActive === 1 ? 'active' : ''}>
              Product Detail
            </button>

            <button onClick={() => setTabActive(2)} className={tabActive === 2 ? 'active' : ''}>
              Testimonial
            </button>
          </div>

          <hr className='Separator' />

          {tabActive === 1 && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: marked(product.detail) }}></p>
            </div>
          )}

          {tabActive === 2 && <div>{product.variants}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}
