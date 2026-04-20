import './Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-inner'>
        <p className='footer-brand'>FlowTech</p>
        <p className='footer-tagline'>Nettoyage de conduits, thermopompes et systèmes CVAC.</p>
        <p className='footer-copy'>© {new Date().getFullYear()} FlowTech. Tous droits réservés.</p>
      </div>
    </div>
  )
}
