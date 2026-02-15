import axios from 'axios';

const API = axios.create({ baseURL: '/api/incidents' });

export function fetchIncidents(params) {
  return API.get('', { params });
}

export function fetchIncident(id) {
  return API.get(`/${id}`);
}

export function createIncident(data) {
  return API.post('', data);
}

export function updateIncident(id, data) {
  return API.put(`/${id}`, data);
}

export function deleteIncident(id) {
  return API.delete(`/${id}`);
}
