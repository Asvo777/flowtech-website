export type Appointment = {
  id: string
  name: string
  email: string
  phoneNumber: string
  postalCode: string
  city: string
  apartmentNumber?: string
  address: string
  service: string
  message?: string
  acceptedPrivacy: boolean
  acceptedTexts: boolean
  datetime: string // ISO string
}

const STORAGE_KEY = 'flowtech_appointments'

function readAll(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Appointment[]
  } catch {
    return []
  }
}

function writeAll(list: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export function isSlotTaken(datetime: string, excludeId?: string) {
  return readAll().some((appointment) => appointment.datetime === datetime && appointment.id !== excludeId)
}

export function createAppointment(data: Omit<Appointment, 'id'>) {
  if (isSlotTaken(data.datetime)) {
    throw new Error('This appointment slot is already reserved')
  }

  const id = generateId()
  const item: Appointment = { id, ...data }
  const list = readAll()
  list.push(item)
  writeAll(list)
  return id
}

export function getAppointment(id: string) {
  return readAll().find((a) => a.id === id) || null
}

export function updateAppointment(id: string, patch: Partial<Appointment>) {
  const current = getAppointment(id)
  if (!current) return false

  const nextDatetime = patch.datetime ?? current.datetime
  if (isSlotTaken(nextDatetime, id)) {
    throw new Error('This appointment slot is already reserved')
  }

  const list = readAll()
  const idx = list.findIndex((a) => a.id === id)
  if (idx === -1) return false
  list[idx] = { ...list[idx], ...patch }
  writeAll(list)
  return true
}

export function deleteAppointment(id: string) {
  const list = readAll()
  const filtered = list.filter((a) => a.id !== id)
  writeAll(filtered)
  return list.length !== filtered.length
}

export function listAppointments() {
  return readAll()
}
