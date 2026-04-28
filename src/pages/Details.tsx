import Contact from '../components/Contact'
import { useI18n } from '../i18n'
import './Details.css'

export default function Details() {

    const { t } = useI18n();

    const services = [
        {
            name: t.details.service1.name,
            description: t.details.service1.description,
            price: t.details.service1.price
        },
        {
            name: t.details.service2.name,
            description: t.details.service2.description,
            price: t.details.service2.price
        },
        {
            name: t.details.service3.name,
            description: t.details.service3.description,
            price: t.details.service3.price
        }
    ];

  return (
    <div className='details'>
        
        <h1>{t.details.title}</h1>

        <div className='details-info'>
            <p className='details-p'>{t.details.paragraph1}</p>

            <div className='grid'>
                {services.map((service) => (
                    <div key={service.name} className='details-card'>
                        <h2>{service.name}</h2>
                        <p>{service.description}</p>
                        <strong>{service.price}</strong>
                    </div>
                ))}
            </div>

            <p className='details-discount'>{t.details.discountNote}</p>
        </div>

        <Contact/>
    </div>
  )
}
