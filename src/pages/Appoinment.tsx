import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  listAppointments,
  updateAppointment,
  type Appointment,
} from '../lib/db'
import { useI18n } from '../i18n'
import './Appoinment.css'

const SLOTS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']
const SERVICES = [
  'Residential air duct cleaning',
  'Wall-mounted heat pump cleaning',
  'HVAC inspection and maintenance',
  'Indoor air quality improvement',
]
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\-\s]{7,}$/
const POSTAL_PATTERN = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

function addDays(date: Date, days: number) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  nextDate.setHours(0, 0, 0, 0)
  return nextDate
}

function getUpcomingMonday(date: Date) {
  const current = new Date(date)
  current.setHours(0, 0, 0, 0)
  const day = current.getDay()
  if (day === 1) {
    return current
  }

  const daysUntilMonday = day === 0 ? 1 : 8 - day
  return addDays(current, daysUntilMonday)
}

function formatWeekday(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatSlotLabel(slot: string) {
  const hour = Number(slot.slice(0, 2))
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}${suffix}`
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function splitDatetime(datetime: string) {
  const [datePart, timePart] = datetime.split('T')
  return {
    datePart,
    timePart: timePart?.slice(0, 5) ?? '',
  }
}

export default function Appoinment() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const editingIdParam = params.get('id')

  const [appointmentsVersion, setAppointmentsVersion] = useState(0)
  const [loadedAppointment, setLoadedAppointment] = useState<Appointment | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [acceptedTexts, setAcceptedTexts] = useState(false)
  const [modifyId, setModifyId] = useState('')
  const [showModifyInput, setShowModifyInput] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [weekIndex, setWeekIndex] = useState(0)

  const weeks = useMemo(() => {
    const result: Date[][] = []
    const monday = getUpcomingMonday(new Date())

    for (let week = 0; week < 5; week += 1) {
      const currentWeek: Date[] = []
      for (let dayOffset = 0; dayOffset < 6; dayOffset += 1) {
        currentWeek.push(addDays(monday, week * 7 + dayOffset))
      }
      result.push(currentWeek)
    }

    return result
  }, [])

  useEffect(() => {
    if (!editingIdParam) {
      return
    }

    const appointment = getAppointment(editingIdParam)

    const hydrateAppointment = () => {
      if (!appointment) {
        setLoadedAppointment(null)
        setFeedback('Appointment not found.')
        return
      }

      setLoadedAppointment(appointment)
      setFeedback('')

      const { datePart, timePart } = splitDatetime(appointment.datetime)
      setSelectedDate(datePart)
      setSelectedTime(timePart)
      setName(appointment.name)
      setEmail(appointment.email)
      setPhoneNumber(appointment.phoneNumber)
      setAddress(appointment.address)
      setPostalCode(appointment.postalCode)
      setCity(appointment.city)
      setApartmentNumber(appointment.apartmentNumber ?? '')
      setService(appointment.service)
      setMessage(appointment.message ?? '')
      setAcceptedPrivacy(appointment.acceptedPrivacy)
      setAcceptedTexts(appointment.acceptedTexts)
    }

    queueMicrotask(hydrateAppointment)
  }, [editingIdParam])

  const visibleWeeks = weeks.slice(weekIndex, weekIndex + 1)
  const maxWeekIndex = Math.max(0, weeks.length - 1)
  const appointments = useMemo(() => {
    return appointmentsVersion >= 0 ? listAppointments() : []
  }, [appointmentsVersion])

  const reservedSlots = useMemo(() => {
    const blocked = new Set<string>()
    for (const appointment of appointments) {
      if (appointment.id !== loadedAppointment?.id) {
        blocked.add(appointment.datetime)
      }
    }
    return blocked
  }, [appointments, loadedAppointment?.id])

  const selectedDatetime = selectedDate && selectedTime ? `${selectedDate}T${selectedTime}:00` : ''
  const isEmailValid = EMAIL_PATTERN.test(email.trim())
  const isPhoneValid = PHONE_PATTERN.test(phoneNumber.trim())
  const isPostalValid = POSTAL_PATTERN.test(postalCode.trim())
  const isFormComplete = Boolean(
    selectedDate &&
    selectedTime &&
    name.trim() &&
    email.trim() &&
    phoneNumber.trim() &&
    address.trim() &&
    postalCode.trim() &&
    city.trim() &&
    service.trim() &&
    acceptedPrivacy &&
    acceptedTexts,
  )
  const canSubmit = isFormComplete && isEmailValid && isPhoneValid && isPostalValid && (!selectedDatetime || !reservedSlots.has(selectedDatetime))

  const setSlot = (dateIso: string, slot: string) => {
    const datetime = `${dateIso}T${slot}:00`

    if (reservedSlots.has(datetime) && loadedAppointment?.datetime !== datetime) {
      setFeedback('This slot is already reserved.')
      return
    }

    setFeedback('')
    setSelectedDate(dateIso)
    setSelectedTime(slot)
  }

  const goPrevWeek = () => setWeekIndex((current) => Math.max(current - 1, 0))
  const goNextWeek = () => setWeekIndex((current) => Math.min(current + 1, maxWeekIndex))

  const handleLoadModify = () => {
    const appointment = getAppointment(modifyId.trim())
    if (!appointment) {
      setFeedback('Appointment not found.')
      return
    }

    navigate(`/appointment?id=${appointment.id}`)
  }

  const handleCancelAppointment = () => {
    if (!loadedAppointment) {
      return
    }

    const confirmed = window.confirm('Are you sure you want to cancel this appointment?')
    if (!confirmed) {
      return
    }

    deleteAppointment(loadedAppointment.id)
    setAppointmentsVersion((current) => current + 1)
    navigate('/submitted/' + loadedAppointment.id)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback('')

    if (!canSubmit || !selectedDate || !selectedTime) {
      if (!isEmailValid) {
        setFeedback('Please enter a valid email address.')
      } else if (!isPhoneValid) {
        setFeedback('Please enter a valid phone number.')
      } else if (!isPostalValid) {
        setFeedback('Please enter a valid postal code.')
      } else {
        setFeedback('Please complete all required fields.')
      }
      return
    }

    const datetime = `${selectedDate}T${selectedTime}:00`

    try {
      if (loadedAppointment) {
        updateAppointment(loadedAppointment.id, {
          name,
          email,
          phoneNumber,
          address,
          postalCode,
          city,
          apartmentNumber: apartmentNumber.trim() || undefined,
          service,
          message: message.trim() || undefined,
          acceptedPrivacy,
          acceptedTexts,
          datetime,
        })
        setAppointmentsVersion((current) => current + 1)
        navigate(`/submitted/${loadedAppointment.id}`)
        return
      }

      const id = createAppointment({
        name,
        email,
        phoneNumber,
        address,
        postalCode,
        city,
        apartmentNumber: apartmentNumber.trim() || undefined,
        service,
        message: message.trim() || undefined,
        acceptedPrivacy,
        acceptedTexts,
        datetime,
      })
      setAppointmentsVersion((current) => current + 1)
      navigate(`/submitted/${id}`)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to save appointment.')
    }
  }

  return (
    <div className='appointment-page'>
      <section className='appointment-hero'>
        <h1>{t.navbar.takeAppointment}</h1>
        <p>Select one week at a time, then choose one available slot.</p>
      </section>

      <section className='appointment-carousel'>
        <div className='appointment-carousel__header'>
          <button type='button' onClick={goPrevWeek} disabled={weekIndex === 0} aria-label='Previous week'>
            ←
          </button>
          <div>
            <h2>Available slots</h2>
            <p>Week {weekIndex + 1} of {weeks.length}</p>
          </div>
          <button type='button' onClick={goNextWeek} disabled={weekIndex >= maxWeekIndex} aria-label='Next week'>
            →
          </button>
        </div>

        <div className='appointment-week-grid'>
          {visibleWeeks.map((week, weekOffset) => (
            <article key={`${weekIndex}-${weekOffset}`} className='appointment-week-card'>
              <h3>Week {weekIndex + weekOffset + 1}</h3>
              {week.map((date) => {
                const dateIso = toIsoDate(date)
                return (
                  <div key={dateIso} className='appointment-day-card'>
                    <div className='appointment-day-card__date'>{formatWeekday(date)}</div>
                    <div className='appointment-slot-grid'>
                      {SLOTS.map((slot) => {
                        const datetime = `${dateIso}T${slot}:00`
                        const taken = reservedSlots.has(datetime) && loadedAppointment?.datetime !== datetime
                        const active = selectedDate === dateIso && selectedTime === slot

                        return (
                          <button
                            key={slot}
                            type='button'
                            onClick={() => setSlot(dateIso, slot)}
                            disabled={taken}
                            className={active ? 'appointment-slot appointment-slot--active' : 'appointment-slot'}
                            data-taken={taken}
                          >
                            {taken ? 'Reserved' : formatSlotLabel(slot)}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </article>
          ))}
        </div>
      </section>

      <section className='appointment-form-section'>
        <h3>Book or update an appointment</h3>
        <form className='appointment-form' onSubmit={handleSubmit}>
          <div className='appointment-form__grid'>
            <input placeholder='Name' value={name} onChange={(event) => setName(event.target.value)} />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(email && !isEmailValid)}
            />
            <input
              placeholder='Phone number'
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              aria-invalid={Boolean(phoneNumber && !isPhoneValid)}
            />
            <input placeholder='Home address' value={address} onChange={(event) => setAddress(event.target.value)} />
            <input
              placeholder='Postal code'
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              aria-invalid={Boolean(postalCode && !isPostalValid)}
            />
            <input placeholder='City' value={city} onChange={(event) => setCity(event.target.value)} />
            <input placeholder='Apartment number (optional)' value={apartmentNumber} onChange={(event) => setApartmentNumber(event.target.value)} />
            <select value={service} onChange={(event) => setService(event.target.value)}>
              <option value=''>Select a service</option>
              {SERVICES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <textarea
            placeholder='Message (optional)'
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <label className='appointment-checkbox'>
            <input
              type='checkbox'
              checked={acceptedPrivacy}
              onChange={(event) => setAcceptedPrivacy(event.target.checked)}
            />
            <span>J’accepte et comprends que mes informations seront utilisées conformément à la politique de confidentialité de l’entreprise.</span>
          </label>

          <label className='appointment-checkbox'>
            <input
              type='checkbox'
              checked={acceptedTexts}
              onChange={(event) => setAcceptedTexts(event.target.checked)}
            />
            <span>En cochant cette case, je consens à recevoir des messages texte conversationnels</span>
          </label>

          <button type='submit' className='appointment-submit' disabled={!canSubmit}>
            {loadedAppointment ? 'Save changes' : 'Confirm appointment'}
          </button>
        </form>
      </section>

      <section className='appointment-modify-section'>
        <h3>Modify an appointment</h3>
        <button type='button' onClick={() => setShowModifyInput((current) => !current)}>
          Modify my appointment
        </button>

        {showModifyInput && (
          <div className='appointment-modify-section__row'>
            <input placeholder='Appointment ID' value={modifyId} onChange={(event) => setModifyId(event.target.value)} />
            <button type='button' onClick={handleLoadModify}>Load</button>
          </div>
        )}

        {loadedAppointment && (
          <div className='appointment-loaded-card'>
            <div>Loaded appointment ID: {loadedAppointment.id}</div>
            <div className='appointment-loaded-card__actions'>
              <button type='button' onClick={() => navigate(`/appointment?id=${loadedAppointment.id}`)}>Edit</button>
              <button type='button' onClick={handleCancelAppointment}>Cancel appointment</button>
            </div>
          </div>
        )}
      </section>

      {feedback && <p className='appointment-feedback' role='status'>{feedback}</p>}
    </div>
  )
}
