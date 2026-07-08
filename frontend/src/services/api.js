import axios from 'axios'

//instancia personalizada do axios, equivalente no react
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api