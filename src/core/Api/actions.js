export function serverPromisedAction(payload) {
  return {
    type: 'SERVER_PROMISED_ACTION',
    payload
  }
}

export function serverAction(payload) {
  return {
    type: 'SERVER_ACTION',
    payload
  }
}
