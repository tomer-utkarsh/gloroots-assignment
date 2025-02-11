import axios from 'axios';

const API_URL = 'http://localhost:5000/records';

const apiService = {
  fetchRecords: (params = {}) => axios.get(API_URL, { params }),
  createRecord: (data) => axios.post(API_URL, data),
  updateRecord: (id, data) => axios.put(`${API_URL}/${id}`, data),
  deleteRecord: (id) => axios.delete(`${API_URL}/${id}`)
};

export default apiService;
