import { FaClock, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import './Contact.css'

export default function Contact() {
  return (
    <section className='contact'>
      <div className='contact-hero'>
        <p className='contact-eyebrow'>Contact</p>
        <h2>Parlons de votre air intérieur</h2>
        <p className='contact-intro'>
          Contactez-nous dès aujourd’hui par téléphone ou par courriel pour obtenir une soumission rapide et sans engagement.
        </p>
        
        <div className='contact-phones'>
          <h3><FaPhoneAlt className='contact-icon' /> Appeler FlowTech</h3>
          <div className='contact-buttons'>
            <a className='contact-button' href='tel:8733070314'>873-307-0314</a>
            <a className='contact-button contact-button--ghost' href='tel:8736602686'>873-660-2686</a>
          </div>
        </div>
      </div>

      <div className='contact-grid'>

        <div className='contact-card contact-card--hours'>
          <h3><FaClock className='contact-icon' /> Heures d’ouverture</h3>
          <ul className='contact-hours'>
            <li><span>Lundi au vendredi</span><strong>8h00 à 18h00</strong></li>
            <li><span>Samedi</span><strong>Sur rendez-vous</strong></li>
            <li><span>Dimanche</span><strong>Fermé</strong></li>
          </ul>
        </div>

        <div className='contact-card contact-card--form'>
          <h3><FaEnvelope className='contact-icon' /> Envoyez-nous un message</h3>
          <form className='contact-form' action=''>
            <input type='text' placeholder='Votre nom' />
            <input type='email' placeholder='Votre adresse courriel' />
            <textarea placeholder='Votre message' rows={5} />
            <button type='submit'>Envoyer</button>
          </form>
        </div>
      </div>
    </section>
  )
}
