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

const getToken = () => {
  return axios.get('/token').then(response => response.data.token);
};

const postForm = formattedData => {
  return getToken().then(token =>
    axios.post('/users', formattedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Token: 4243,
      },
    })
  );
};

export { getUsers, getPositions, postForm };
