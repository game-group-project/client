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
    players: [],
    cards: [(Math.ceil(Math.random() * 9)), (Math.ceil(Math.random() * 9)), (Math.ceil(Math.random() * 9)), (Math.ceil(Math.random() * 9))]
  },
  mutations: {
    SET_SCORE (state, data) {
      state.players = [
        ...state.players.filter(element => element.name !== data.name),
        data
      ]
    },
    ADD_PLAYER (state, player) {
      state.players.push(player)
    },
    SET_NAME (state, data) {
      state.name = data
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
    onPlayerJoined ({ commit }, player) {
      commit('ADD_PLAYER', player)
    },
    setPlayerName ({ commit }, name) {
      commit('SET_NAME', name)
    },
    joinGame ({ commit, store }, player) {
      commit('ADD_PLAYER', player)
      store.socket.emit('join-game', player)
    }
  },
  getters: {
  }
})
