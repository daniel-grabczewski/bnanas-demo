import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top whenever pathname changes
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="page">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
