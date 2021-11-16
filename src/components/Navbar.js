import { useHistory } from 'react-router';
import './Navbar.scss';

export default function Navbar() {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <nav className='NavbarContainer'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/projects'>
          E-Commerce
        </a>

        <div className='Navbars'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a
                className={`nav-link ${history.location.pathname === '/' ? 'active' : ''}`}
                aria-current='page'
                href='/'
              >
                Home
              </a>
            </li>

            <li className='nav-item'>
              <a
                className={`nav-link ${history.location.pathname === '/add' ? 'active' : ''}`}
                href={localStorage.getItem('token') ? '/add' : '/login'}
              >
                Add Ads
              </a>
            </li>

            <li className='nav-item'>
              <a
                className={`nav-link ${history.location.pathname === '/chats' ? 'active' : ''}`}
                href={localStorage.getItem('token') ? '/chats' : '/login'}
              >
                Inbox
              </a>
            </li>

            <form className='d-flex Search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              ></input>
              <button
                className='btn btn-outline-success btn-search'
                type='submit'
              >
                Search
              </button>
            </form>
          </ul>

          {localStorage.getItem('token') ? (
            <button
              onClick={() => handleLogout()}
              className='btn btn-outline-danger'
              type='submit'
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => history.push('/login')}
              className='btn btn-outline-success'
              type='submit'
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
