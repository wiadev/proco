import axios from 'axios';

const fbRequest = axios.create({
  baseURL: 'https://graph.facebook.com/v2.7/',
  params: {'access_token': '1169837529717559%7CNpUPQjrjLsUVJb-Lx2nm4n1qJBI'}
});

export default fbRequest;