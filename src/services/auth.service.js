import httpClient from './api.service'

const login = function( user ) {
    return httpClient.post('/api/auth/signin', user)
}

const signup = function( user ) {
    return httpClient.post('/api/auth/signup', user)
} 

export {
    login,
    signup
}