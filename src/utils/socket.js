import { baseUrl } from '@/constants/common'
import { io } from 'socket.io-client'

const socket = io(baseUrl, {
  transports: ['websocket'],
  withCredentials: true,
})

export default socket
