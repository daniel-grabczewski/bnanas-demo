import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © BNana Corp Ltd {new Date().getFullYear()}
      </p>
      <ul className="footer__list">
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/shop">shop</Link>
        </li>
        <li>
          <Link to="/contact">contact</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
