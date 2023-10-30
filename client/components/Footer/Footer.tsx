import { Link } from 'react-router-dom'
import { baseURL } from '../../data'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © BNana Corp Ltd {new Date().getFullYear()}
      </p>
      <ul className="footer__list">
        <li>
          <Link to={`${baseURL}/`}>home</Link>
        </li>
        <li>
          <Link to={`${baseURL}/about`}>about</Link>
        </li>
        <li>
          <Link to={`${baseURL}/shop`}>shop</Link>
        </li>
        <li>
          <Link to={`${baseURL}/contact`}>contact</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
