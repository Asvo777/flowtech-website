import { RiCustomerServiceLine } from "react-icons/ri";
import { PiToolboxDuotone } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";  
import { RiMentalHealthLine } from "react-icons/ri";
import './Services.css'
import { useI18n } from '../i18n'


export default function Services() {
  const { t } = useI18n()

  return (
    <div className='services'>
      <div className='services-content'>
        <img id="service-img" src="/Air-Duct-Cleaning.png" alt="" />
        <span className='services-text'>
        <h2>{t.services.title}</h2>
          <ul className='services-list' id="services-name">
            {t.services.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        <button className="contact-button"
          onClick={() => {
            const contactSection = document.querySelector('.contact')
            const navbar = document.querySelector('.navbar') as HTMLElement | null

            if (contactSection instanceof HTMLElement) {
              const navbarHeight = navbar?.offsetHeight ?? 0
              const y = contactSection.getBoundingClientRect().top + window.scrollY - navbarHeight

              window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' })
            }
          }}
        >{t.services.learnMore}</button>
        </span>
      </div>
      <div id="why-choose" className='services-content'>
        <h2>{t.services.whyChoose}</h2>
        <ul className='services-list'>
          <li>
            <span className="icon-services"><RiCustomerServiceLine /></span> 
          {t.services.reasons[0]}</li>
          <li>
            <span className="icon-services"><PiToolboxDuotone /></span> 
          {t.services.reasons[1]}</li>
          <li>
            <span className="icon-services"><TbRulerMeasure /></span> 
          {t.services.reasons[2]}</li>
          <li>
            <span className="icon-services"><RiMentalHealthLine /></span> 
          {t.services.reasons[3]}
          </li>
        </ul>
      </div>
    </div> 
  )
}
