import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket,
    name: '',
    score: 0,
    players: []
  },
  mutations: {
    SET_SCORE (state, data) {
      state.players = [
        ...state.players.filter(element => element.name !== data.name),
        data
      ]
    },
    ADD_PLAYER (state, data) {
      state.players.push(data)
    }
  },
  actions: {
    sendScore ({ state, commit }, data) {
      commit('SET_SCORE', data)
      state.socket.emit(('send-score', data))
    },
    onBroadcastScore ({ commit }, data) {
      commit('SET_SCORE', data)
    },
    onPlayerJoined ({ commit }, data) {
      commit('ADD_PLAYER', data)
    }
  },
  getters: {
  }
})
