import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://asia-southeast2-sejutacita-app.cloudfunctions.net',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
    }
});