import Services from "../components/Services";
import Contact from "../components/Contact";
import { useEffect } from 'react'
import './Home.css'
import { useI18n } from '../i18n'

export default function Home() {
  const { t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector('.bg-image');
      if (window.scrollY > 50) {
        bg?.classList.add('scrolled');
      } else {
        bg?.classList.remove('scrolled');
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <div className='home'>
      <div className='bg-image'></div>
      <div className='home-header'>
        <h1>
          {t.home.titlePrefix}{' '}
          <span className='cvac-tooltip'>
            {t.home.titleCvac}
          </span>
        </h1>
        <h3>{t.home.subtitle}</h3>
        
      </div>
      <div className='home-content'>
        <span>
          <h2>{t.home.qualityTitle}</h2>
        <p>{t.home.paragraph1}</p>
    <br />
        <p>{t.home.paragraph2}</p>
        </span>
        <img src="" alt="" />
      </div>

      <Services/>
      <Contact/>
    </div>
  )
}
