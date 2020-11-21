import Vue from 'vue'
import Vuex from 'vuex'

import { getTodosCursos } from '../services/curso.service'
import Auth from './auth/auth'
import Alerta from './alerta/alerta'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: [],
    cursosCarrinho: []
  },

  mutations: {
    setCursos( state, cursos ) {
      state.cursos = cursos
    },
    adicionaCursoAoCarrinho( state, { id } ) {
      state.cursosCarrinho.push({
        id,
        quantidade: 1
      })
    },
    incrementaQuantidade( state, { id }) {
      const cursoCarrinho = state.cursosCarrinho.find(item => item.id == id)
      cursoCarrinho.quantidade++
    }
  },

  actions: {
    carregarCursos( { commit } ) {

      getTodosCursos()
      .then( response => {
        console.log(response)
        commit('setCursos', response.data)
      })
      .catch( err => {
        console.log(err)
      })
    },

    adicionarAoCarrinho( { state, commit }, curso ) {
      const cursoCarrinho = state.cursosCarrinho.find(item => item.id == curso.id)

      if (cursoCarrinho) {
        commit('incrementaQuantidade', cursoCarrinho)
      } else {
        commit('adicionaCursoAoCarrinho', curso)
      }
    },

    alterarQuantidade( { state }, { id, quantidade } ) {
      const cursoCarrinho = state.cursosCarrinho.find(item => item.id === id)
      cursoCarrinho.quantidade = quantidade
    }
  },

  getters: {
    cursosAVenda(state) {
      return state.cursos.map(( curso ) => {
        return {
          ...curso
        }
      })
    },

    cursosCarrinho( state ) {
      return state.cursosCarrinho.map( ( {id, quantidade} ) => {
        const curso = state.cursos.find(item => item.id == id)
        return {
          ...curso,
          quantidade
        }
      })
    },

    valorTotal( state, getters ) {
      return getters.cursosCarrinho.reduce( ( total, curso ) => {
        return total + curso.preco * curso.quantidade
      }, 0)
    },


    cursosEdicao(state) {
      return state.cursos.map(( curso ) => {
        return {
          ...curso
        }
      })
    },

  },
  modules: {
    Auth,
    Alerta
  }
})
