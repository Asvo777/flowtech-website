import './Footer.css'
import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <div className='footer'>
      <div className='footer-inner'>
        <p className='footer-brand'>FlowTech</p>
        <p className='footer-tagline'>{t.footer.tagline}</p>
        <p className='footer-copy'>© {new Date().getFullYear()} FlowTech. {t.footer.copyright}</p>
      </div>
    </div>
  )
}
