import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { KeyboardEvent } from 'react'

export default function Logo() {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onLogoKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      navigate('/')
      setTimeout(() => scrollToTop(), 80)
    }
  }

  useEffect(() => {
    const onResize = () => {
      setIsNarrowScreen(window.innerWidth < 520)
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const logoSrc = isNarrowScreen ? '/flowtech_logo_no_bg.png' : '/FlowTech.png'

  const navigate = useNavigate()

  return (
    <div
      className='logo'
      role='button'
      tabIndex={0}
      aria-label='Retour en haut de la page'
      onClick={() => {
        navigate('/')
        setTimeout(() => scrollToTop(), 80)
      }}
      onKeyDown={onLogoKeyDown}
    >
      <img className='navbar-logo' src={logoSrc} alt='FlowTech' />
    </div>
    )
  }
