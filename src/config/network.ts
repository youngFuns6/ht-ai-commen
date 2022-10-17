export default {
  // BASE_URL_HOST: '39.97.180.72:8084',
  BASE_URL_HOST: process.env.NODE_ENV === 'development' ? '192.168.110.161:8200' : window.location.host,
}