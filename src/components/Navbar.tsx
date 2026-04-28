
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useI18n } from '../i18n'

export default function Navbar() {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false)
  const { t, toggleLocale } = useI18n()

  useEffect(() => {
      const onResize = () => {
        setIsNarrowScreen(window.innerWidth < 768)
      }

      const handleScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
          navbar?.classList.add('scrolled');
        } else {
          navbar?.classList.remove('scrolled');
        }
      }
  
      onResize()
      handleScroll()
      window.addEventListener('resize', onResize)
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])
  
  const logoSrc = isNarrowScreen ? '/flowtech_logo_no_bg.png' : '/FlowTech.png'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigate = useNavigate()

  const handleLogoClick = () => {
    // Navigate to home first, then scroll to top after route change
    navigate('/')
    // Give the router a moment to render the home route, then scroll
    setTimeout(() => scrollToTop(), 80)
  }

  return (
    <div className='navbar'>
      <div
      className='logo'
      aria-label={t.navbar.ariaBackToTop}
      onClick={handleLogoClick}
      >
        <img className='navbar-logo' src={logoSrc} alt='FlowTech' />
      </div>
      <div className='navbar-links'>
        <button onClick={() => { navigate('/services'); setTimeout(() => scrollToTop(), 80) }}>{t.services.title}</button>
        {/*   <span style={{ width: '700px' }}></span> */}
        <button
          onClick={() => {
            const contactSection = document.querySelector('.contact')
            const navbar = document.querySelector('.navbar') as HTMLElement | null

            if (contactSection instanceof HTMLElement) {
              const navbarHeight = navbar?.offsetHeight ?? 0
              const y = contactSection.getBoundingClientRect().top + window.scrollY - navbarHeight

              window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' })
            }
          }}
        >{t.navbar.contactUs}</button>
        <button onClick={toggleLocale}>{t.navbar.languageSwitch}</button>
      </div>
    </div>
    )
  }
