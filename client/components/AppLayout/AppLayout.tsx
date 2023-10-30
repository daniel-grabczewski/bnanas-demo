import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

function AppLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Scroll to top whenever pathname changes
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    function hashChangeHandler() {
      const hash = window.location.hash.substring(1)
      navigate(hash)
      window.location.hash = ''
    }

    // Initial navigation
    if (window.location.hash) {
      hashChangeHandler()
    }

    window.addEventListener('hashchange', hashChangeHandler)

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [navigate])

  return (
    <div className="page">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
