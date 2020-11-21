import { login, signup } from '@/services/auth.service'
import router from '@/router'
import httpClient from '@/services/api.service'
import { userKey } from '@/global'


const state = () => ({
    user: null
})

const mutations = {
    setUser( state, user ) {

        state.user = {
            ...user
        }

        httpClient.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        localStorage.setItem( userKey, JSON.stringify(user))
    },

    limpaUsuario( state ) {
        state.user = null
        delete httpClient.defaults.headers.common['Authorization']
        localStorage.removeItem( userKey )

        console.log('logout')
    }
}

const actions = {

    async login( { commit }, user ) {
        try {
            const response = await login(user)

            console.log(response)

            commit('setUser', response.data)
            router.push({ name: 'Home' })
        } catch (err) {
            console.log(err)
        }

        // login(user)
        // .then( response => {
        //     console.log(response)
        //     commit('setUser', response.data)
        // })
        // .catch( err => {
        //     console.log(err)
        // })
    },

    async signup( context, user ) {
        try {
            const response = await signup(user)
            this.dispatch("notificaSucesso", "Usuário Cadastrado com sucesso")
            console.log('sucesso signup', response)
        } catch (err) {
            console.log(err)
        }
    },

    carregarUsuario( { commit }) {
        const usuarioLogado = localStorage.getItem(userKey)

        if (usuarioLogado)
            commit('setUser', JSON.parse(usuarioLogado) )
    },

    logout( { commit }) {
        commit('limpaUsuario')
        if (router.currentRoute.name != 'Home' )
            router.push({ name: 'Home' })
    }

}

const getters = {
    usuarioLogado( state ) {
        return state.user
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}