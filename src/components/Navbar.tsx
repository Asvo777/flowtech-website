
import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

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

  return (
    <div className='navbar'>
      <div 
      className='logo'
      aria-label='Retour en haut de la page'
      onClick={scrollToTop}
      >
        <img className='navbar-logo' src={logoSrc} alt='FlowTech' />
      </div>
      <div className='navbar-links'>
        {/*   <span style={{ width: '700px' }}></span> */}
        <button
          onClick={() => {
            const contactSection = document.querySelector('.contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >Contactez-nous</button>
        <button>EN</button>
      </div>
    </div>
    )
  }
