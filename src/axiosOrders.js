import axios from 'axios';

const orderAxios = axios.create({
    baseURL: 'https://react-burger-builder-4ade0.firebaseio.com/'
});

export default orderAxios;