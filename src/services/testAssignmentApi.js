import axios from 'axios';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1';

const getUsers = (page = '1') => {
  return axios
    .get(`/users?page=${page}&count=6`)
    .then(response => response.data);
};

const getPositions = () => {
  return axios.get('/positions').then(response => response.data);
};

export { getUsers, getPositions };
