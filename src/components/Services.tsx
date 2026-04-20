import { RiCustomerServiceLine } from "react-icons/ri";
import { PiToolboxDuotone } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";  
import { RiMentalHealthLine } from "react-icons/ri";
import './Services.css'


export default function Services() {
  return (
    <div className='services'>
      <div className='services-content'>
        <img id="service-img" src="/Air-Duct-Cleaning.png" alt="" />
        <span className='services-text'>
        <h2>Nos services</h2>
          <ul className='services-list'>
            <li>Nettoyage de conduits de ventilation résidentiels</li>
            <li>Nettoyage de thermopompes murales</li>
            <li>Inspection et entretien CVAC</li>
            <li>Amélioration de la qualité de l’air</li>
          </ul>
        </span>
      </div>
      <div id="why-choose" className='services-content'>
        <h2>Pourquoi choisir FlowTech ?</h2>
        <ul className='services-list'>
          <li>
            <span className="icon-services"><RiCustomerServiceLine /></span> 
          Service professionnel et fiable</li>
          <li>
            <span className="icon-services"><PiToolboxDuotone /></span> 
          Équipement à la fine pointe</li>
          <li>
            <span className="icon-services"><TbRulerMeasure /></span> 
          Résultats visibles et mesurables</li>
          <li>
            <span className="icon-services"><RiMentalHealthLine /></span> 
          Approche axée sur la santé et l’efficacité
          </li>
        </ul>
      </div>
    </div> 
  )
}
