import { useState, useEffect } from 'react'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'

function Nav() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 992
  const [pageTitle, setPageTitle] = useState('')
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname)
    setPageTitle(pageTitle)
  }, [location])

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Home'
      case '/about':
        return 'About'
      case '/contact':
        return 'Contact'
      case '/shop':
        return 'Shop'
      default:
        return ''
    }
  }

  function goTo(link: string) {
    navigate(link)
  }

  const toggleMenu = () => {
    setOpen((prev) => !prev)
  }

  return (
    <header className="header">
      <nav className="header__nav">
        {width < breakpoint && (
          <div className="mobile__nav-menu" onClick={toggleMenu}>
            {open ? (
              <IoClose className="mobile__icon" style={{ fontSize: '30px' }} />
            ) : (
              <GiHamburgerMenu
                className="mobile__icon"
                style={{ fontSize: '30px' }}
              />
            )}
          </div>
        )}
        {width < breakpoint && open && (
          <ul className="mobile__nav-list">
            <li>
              <NavLink to="/">home</NavLink>
            </li>
            <li>
              <NavLink to="/about">about</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
            <li>
              <NavLink to="/shop">shop</NavLink>
            </li>
            <li className="mobile__user-description">
              <img
                className="mobile__user-descrition-icon"
                src="/images/user-icon.svg"
                alt="icon"
              />
              <p>Guest</p>
            </li>

            <li>
              <button onClick={() => goTo('/cart')}>
                <img
                  className="header__cart-icon"
                  src="/images/icon-cart.svg"
                  alt=""
                />
              </button>
            </li>
          </ul>
        )}
        {width >= breakpoint && (
          <>
            <ul className="header__user-description-list">
              <li>
                <img
                  className="header__user-descrition-icon"
                  src="/images/user-icon.svg"
                  alt="icon"
                />
                <p>Guest</p>
              </li>
            </ul>
            <ul className="header__nav-list">
              <li
                className={
                  pageTitle === 'Home' || pageTitle === 'About'
                    ? 'border-white'
                    : ''
                }
              >
                <NavLink
                  to="/"
                  className={
                    pageTitle === 'Home' || pageTitle === 'About'
                      ? 'color-white'
                      : ''
                  }
                >
                  home
                </NavLink>
              </li>
              <li
                className={
                  pageTitle === 'Home' || pageTitle === 'About'
                    ? 'border-clear'
                    : ''
                }
              >
                <NavLink
                  to="/about"
                  className={
                    pageTitle === 'Home' || pageTitle === 'About'
                      ? 'color-white'
                      : ''
                  }
                >
                  about
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">contact</NavLink>
              </li>
              <li>
                <NavLink to="/shop">shop</NavLink>
              </li>
            </ul>
            <ul className="header__user-login-list">
              <li>
                <button onClick={() => goTo('/cart')}>
                  <img
                    className="header__cart-icon"
                    src="/images/icon-cart.svg"
                    alt=""
                  />
                </button>
              </li>
            </ul>
          </>
        )}
      </nav>
    </header>
  )
}

export default Nav
