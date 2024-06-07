import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://7b3c-2401-4900-6344-85a0-1dc6-5b0c-263b-744b.ngrok-free.app'
});

export default instance;
