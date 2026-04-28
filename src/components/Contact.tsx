import { FaClock, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './Contact.css'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showSentPopover, setShowSentPopover] = useState(false)

  const isFormValid = name.trim() !== '' && email.trim() !== '' && message.trim() !== ''

  useEffect(() => {
    if (!showSentPopover) {
      return
    }

    const timer = window.setTimeout(() => {
      setShowSentPopover(false)
    }, 2500)

    return () => {
      window.clearTimeout(timer)
    }
  }, [showSentPopover])

  const getOpeningStatus = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()

    if (day >= 1 && day <= 5 && hour >= 8 && hour < 20) {
      return { label: t.contact.status.open, className: 'contact-open' }
    } else if (day === 6 && hour >= 8 && hour < 20) {
      return { label: t.contact.status.appointmentOnly, className: 'contact-open' }
    } else {
      return { label: t.contact.status.closed, className: 'contact-closed' }
    }
  }

  const openingStatus = getOpeningStatus()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) {
      return
    }

    const subject = `FlowTech Contact - ${name.trim()}`
    const body = `${message.trim()}\n\nReply to: ${email.trim()}`
    const mailtoLink = `mailto:asvo777second@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink

    setName('')
    setEmail('')
    setMessage('')
    setShowSentPopover(true)
  }


  return (
    <section className='contact'>
      <div className='contact-hero'>
        <h2>{t.contact.title}</h2>
        <p className='contact-intro'>
          {t.contact.intro}
        </p>
        
        <div className='contact-phones'>
          <h3><FaPhoneAlt className='contact-icon phone' /> {t.contact.callFlowTech}</h3>
          <div className='contact-buttons'>
            <a className='contact-button' href='tel:8733070314'>873-307-0314</a>
            <a className='contact-button' href='tel:8736602686'>873-660-2686</a>
          </div>
        </div>
      </div>

      <div className='contact-grid'>

        <div className='contact-card contact-card--hours'>
          <div className='contact-card-header--hours'>
            <h3><FaClock className='contact-icon' /> {t.contact.hoursTitle}</h3>
            <h4 className={`contact-opening-info ${openingStatus.className}`}>{openingStatus.label}</h4>
          </div>
          <ul className='contact-hours'>
            <li><span>{t.contact.days.mondayToFriday}</span><strong>{t.contact.hours.weekday}</strong></li>
            <li><span>{t.contact.days.saturday}</span><strong>{t.contact.hours.saturday}</strong></li>
            <li><span>{t.contact.days.sunday}</span><strong>{t.contact.hours.sunday}</strong></li>
          </ul>
        </div>

        <div className='contact-card contact-card--form'>
          <h3><FaEnvelope className='contact-icon' /> {t.contact.messageTitle}</h3>
          <form className='contact-form' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder={t.contact.form.name}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type='email'
              placeholder={t.contact.form.email}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <textarea
              placeholder={t.contact.form.message}
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type='submit' disabled={!isFormValid}>{t.contact.form.send}</button>
          </form>
        </div>
      </div>
      {showSentPopover && createPortal(
        <p className='contact-sent-popover' role='status'>{t.contact.messageSent}</p>,
        document.body,
      )}
    </section>
  )
}
