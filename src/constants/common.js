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
