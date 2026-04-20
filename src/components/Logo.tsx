import { useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'

export default function Logo() {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onLogoKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToTop()
    }
  }

  useEffect(() => {
    const onResize = () => {
      setIsNarrowScreen(window.innerWidth < 420)
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const logoSrc = isNarrowScreen ? '/flowtech_logo_no_bg.png' : '/FlowTech.png'

  return (
    <div
      className='logo'
      role='button'
      tabIndex={0}
      aria-label='Retour en haut de la page'
      onClick={scrollToTop}
      onKeyDown={onLogoKeyDown}
    >
      <img className='navbar-logo' src={logoSrc} alt='FlowTech' />
    </div>
    )
  }
