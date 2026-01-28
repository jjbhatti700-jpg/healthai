import axios from 'axios'

const API_URL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
}

export const healthAPI = {
  analyzeSymptoms: (symptoms, conversationId) => api.post('/health/analyze', { symptoms, conversationId }),
  getHealthInfo: (topic) => api.post('/health/info', { topic }),
  chat: (message, history, conversationId) => api.post('/health/chat', { message, history, conversationId })
}

export const conversationAPI = {
  create: (title) => api.post('/conversation', { title }),
  getAll: () => api.get('/conversation'),
  getOne: (id) => api.get(`/conversation/${id}`),
  addMessage: (id, role, content) => api.post(`/conversation/${id}/message`, { role, content }),
  delete: (id) => api.delete(`/conversation/${id}`)
}

export default api