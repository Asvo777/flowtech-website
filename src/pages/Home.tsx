import Services from "../components/Services";
import Contact from "../components/Contact";
import { useEffect } from 'react'
import './Home.css'

export default function Home() {
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
          Experts en nettoyage de conduits et systèmes{' '}
          <span className='cvac-tooltip'>
            CVAC
          </span>
        </h1>
        <h3>Résidentiels et commerciaux</h3>
      </div>
      <div className='home-content'>
        <span>
          <h2>Améliorez la qualité de votre air intérieur</h2>
        <p>L'accumulation de poussière, moisissures, 
    allergènes et contaminants dans vos conduits peut nuire à votre santé et réduire l'efficacité 
    énergétique de vos systèmes. Un entretien régulier de vos conduits permet non seulement d'améliorer la qualité de l'air intérieur, 
    mais aussi de prolonger la durée de vie de vos installations.</p>
    <br />
        <p>Chez FlowTech, nous offrons des services spécialisés en nettoyage de conduits de ventilation et de thermopompes afin d’assurer un air plus sain, une meilleure performance de vos systèmes et une efficacité énergétique optimale. Nous utilisons des équipements professionnels et des techniques avancées pour éliminer poussière, moisissures, allergènes et contaminants accumulés dans vos conduits.</p>
        </span>
        <img src="" alt="" />
      </div>

      <Services/>
      <Contact/>
    </div>
  )
}
