import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header__content">
              
              {/* header logo */}
              <Link to="/" className="header__logo">
                <img src="/img/logo.svg" alt="" />
              </Link>

              {/* header categories */}
              <div className="header__categories">
                <button
                  className="header__categories-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span></span>
                  <span></span>
                </button>

                <div className="dropdown-menu header__dropdown-menu header__dropdown-menu--categories">
                  <ul className="header__categories-list">
                    <li><Link to="/catalog1">Films</Link></li>
                    <li><Link to="/catalog2">TV Series</Link></li>
                    <li><Link to="/catalog1">Anime</Link></li>
                    <li><Link to="/catalog2">Cartoons</Link></li>
                  </ul>
                  <ul className="header__categories-list">
                    <li><Link to="/catalog1">Catalog Grid</Link></li>
                    <li><Link to="/catalog2">Catalog List</Link></li>
                    <li><Link to="/details1">Details Film</Link></li>
                    <li><Link to="/details2">Details TV Series</Link></li>
                  </ul>
                </div>
              </div>

              {/* header nav */}
              <ul className="header__nav">
  <li className="header__nav-item">
    <Link className="header__nav-link" to="/">
      Home
    </Link>
  </li>



                <li className="header__nav-item">
                  <a className="header__nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Catalog
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                    </svg>
                  </a>
                  <ul className="dropdown-menu header__dropdown-menu">
                    <li><Link to="/catalog1">Catalog Grid</Link></li>
                    <li><Link to="/catalog2">Catalog List</Link></li>
                    <li><Link to="/details1">Details Movie</Link></li>
                    <li><Link to="/details2">Details TV Series</Link></li>
                  </ul>
                </li>

                <li className="header__nav-item">
                  <Link to="/pricing" className="header__nav-link">Pricing plans</Link>
                </li>

                <li className="header__nav-item">
                  <a className="header__nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pages
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                    </svg>
                  </a>
                  <ul className="dropdown-menu header__dropdown-menu">
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/faq">Help center</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/actor">Actor</Link></li>
                    <li><Link to="/contacts">Contacts</Link></li>
                    <li><Link to="/privacy">Privacy policy</Link></li>
                  </ul>
                </li>

                <li className="header__nav-item">
                  <a className="header__nav-link header__nav-link--more" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" />
                    </svg>
                  </a>
                  <ul className="dropdown-menu header__dropdown-menu">
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/forgot">Forgot password</Link></li>
                    <li><Link to="/404">404 Page</Link></li>
                  </ul>
                </li>
              </ul>

              {/* header actions */}
              <div className="header__actions">
                <form onSubmit={handleSubmit} className="header__search">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                    </svg>
                  </button>
                </form>

                <div className="header__language">
                  <a className="header__nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    EN
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                    </svg>
                  </a>
                  <ul className="dropdown-menu header__dropdown-menu header__dropdown-menu--lang">
                    <li><a href="#">English</a></li>
                    <li><a href="#">Spanish</a></li>
                    <li><a href="#">French</a></li>
                  </ul>
                </div>

                <Link to="/signin" className="header__sign-in">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z" />
                  </svg>
                  <span>sign in</span>
                </Link>
              </div>

              <button className="header__btn" type="button">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
