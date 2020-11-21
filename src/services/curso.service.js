import httpClient from './api.service'

const getTodosCursos = function() {
    return httpClient.get('/curso')
}

const salvarCurso = function(formData) {
    return httpClient.post('/curso', formData)
}

const atualizarCurso = function(id, formData) {
    return httpClient.put(`/curso/${id}`, formData)
}

const excluirCurso = function(id) {
    return httpClient.delete(`/curso/${id}`)
}

export {
    getTodosCursos,
    salvarCurso,
    atualizarCurso,
    excluirCurso
}