import { useHistory } from 'react-router';
import './Navbar.scss';

export default function Navbar() {
  let history = useHistory();

  return (
    <nav className="NavbarContainer">
      <div className="container-fluid">
        <a className="navbar-brand" href="/projects">
          E-Commerce
        </a>

        <div className="Navbars">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link false" href="/add">
                Add Ads
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link false" href="/chats">
                Inbox
              </a>
            </li>

            <form className="d-flex Search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success btn-search" type="submit">
                Search
              </button>
            </form>
          </ul>

          <button
            onClick={() => history.push('/login')}
            className="btn btn-outline-success"
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
