import { useNavigate, useParams } from 'react-router-dom'
import { deleteAppointment, getAppointment } from '../lib/db'
import './Submitted.css'

export default function Submitted() {
  const { id } = useParams()
  const navigate = useNavigate()

  if (!id) {
    return <div className='submitted-page'>No submission id provided</div>
  }

  const appointment = getAppointment(id)

  const handleCancel = () => {
    deleteAppointment(id)
    navigate('/appointment')
  }

  return (
    <div className='submitted-page'>
      {appointment ? (
        <section className='submitted-card'>
          <h1>Appointment confirmed</h1>
          <p className='submitted-card__id'>Your appointment id: <strong>{appointment.id}</strong></p>
          <dl className='submitted-details'>
            <div><dt>Date/time</dt><dd>{new Date(appointment.datetime).toLocaleString()}</dd></div>
            <div><dt>Name</dt><dd>{appointment.name}</dd></div>
            <div><dt>Email</dt><dd>{appointment.email}</dd></div>
            <div><dt>Phone number</dt><dd>{appointment.phoneNumber}</dd></div>
            <div><dt>Home address</dt><dd>{appointment.address}</dd></div>
            <div><dt>Apartment number</dt><dd>{appointment.apartmentNumber || 'N/A'}</dd></div>
            <div><dt>Postal code</dt><dd>{appointment.postalCode}</dd></div>
            <div><dt>City</dt><dd>{appointment.city}</dd></div>
            <div><dt>Service</dt><dd>{appointment.service}</dd></div>
            <div><dt>Message</dt><dd>{appointment.message || 'N/A'}</dd></div>
          </dl>
          <div className='submitted-actions'>
            <button type='button' onClick={() => navigate('/')}>Back to home</button>
            <button type='button' onClick={() => navigate(`/appointment?id=${appointment.id}`)}>Modify appointment</button>
            <button type='button' onClick={handleCancel}>Cancel appointment</button>
          </div>
        </section>
      ) : (
        <section className='submitted-card'>
          <h1>Appointment not found</h1>
          <p>This appointment may have been canceled or does not exist.</p>
          <div className='submitted-actions'>
            <button type='button' onClick={() => navigate('/')}>Back to home</button>
            <button type='button' onClick={() => navigate('/appointment')}>Create new</button>
          </div>
        </section>
      )}
    </div>
  )
}
