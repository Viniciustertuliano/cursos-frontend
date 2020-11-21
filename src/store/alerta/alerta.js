
const state = () => ({
    showMessage: false,
    message: {
        messages: ['Mensagem de Teste'],
        type: 'success'
    },

})

const mutations = {
    limpaMensagem(state) {
        state.showMessage = false
        state.message = {}
    },
    mostraMensagem(state, message) {
        state.showMessage = true
        state.message = message
    }
}

const actions = {
    fechaMensagem({ commit }) {
        commit('limpaMensagem')
    },
    notificaErro({ commit }, data) {

        if (data.erros) {
            const messages = data.erros
            commit('mostraMensagem', {
                messages,
                type: 'error'
            })
        } else if (data.message) {
            commit('mostraMensagem', {
                messages: [data.message],
                type: 'error'
            })
        } else {
            commit('mostraMensagem', {
                messages: [data],
                type: 'error'
            })
        }
    },
    notificaSucesso({ commit }, data) {
        if (data.mensagem) {
            commit('mostraMensagem', {
                messages: [data.mensagem],
                type: 'success'
            })
        } else {
            commit('mostraMensagem', {
                messages: [data],
                type: 'success'
            })
        }
    }
}

const getters = {
    showMessage(state) {
        return state.showMessage
    },
    message(state) {
        return state.message
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}