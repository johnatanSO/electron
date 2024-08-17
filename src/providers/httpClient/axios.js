const axios = require('axios')

const http = axios.create({ baseURL: "http://api.vendergas.com.br" })

module.exports = { http }