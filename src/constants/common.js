import audio from '@/assets/audios/audio.mp3'

export const STATUS = {
  IDLE: 'idle',
  LOGGED_IN: 'logged-in',
  VERIFIED: 'verified',
  LOADING: 'loading',
  LOADED: 'loaded',
  CREATED: 'created',
  UPDATED: 'updated',
  REMOVED: 'removed',
  FAILED: 'failed',
}

export function debug(title, data) {
  return console.log(`[DEBUG] ${title}: `, data)
}

export const OTP_TTL_SECONDS = 120

export const ASSIGN_STATUS = {
  DRAFT: 'draft',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELED: 'canceled',
}

export const ASSIGN_STATUS_OPTIONS = [
  { label: 'Draft', value: ASSIGN_STATUS.DRAFT },
  { label: 'Assigned', value: ASSIGN_STATUS.ASSIGNED },
  { label: 'In Progress', value: ASSIGN_STATUS.IN_PROGRESS },
  { label: 'Done', value: ASSIGN_STATUS.DONE },
  { label: 'Canceled', value: ASSIGN_STATUS.CANCELED },
]

export const notificationSound = new Audio(audio)
export const baseUrl = `${import.meta.env.VITE_API_BASE_URL}` //http://localhost:3000
