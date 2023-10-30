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
    const hash = window.location.hash
    if (hash) {
      const path = hash.substring(1) // Remove the leading '#'
      navigate(path)
      // Clear the hash
      window.location.hash = ''
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
