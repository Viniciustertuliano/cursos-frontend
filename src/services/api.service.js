import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8081/curso-web'
})

export default httpClient