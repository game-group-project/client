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
    isPlaying: false,
    players: [],
    playCount: 0, // digunakan untuk menghitung berapa kali sudah memilih kartu. ketika sudah mencapai 5 kali. maka rubah player isFinished jadi true
    cards: []
  },
  mutations: {
    SET_SCORE (state, data) {
      state.players = [
        ...state.players.filter(element => element.name !== data.name),
        data
      ]
      state.score = data.score
    },
    ADD_PLAYER (state, player) {
      state.players.push(player)
    },
    SET_NAME (state, data) {
      state.name = data
    },
    START_GAME (state) {
      state.isPlaying = true
    },
    RANDOM_CARDS (state) {
      state.cards = [(Math.ceil(Math.random() * 9)), (Math.ceil(Math.random() * 9)), (Math.ceil(Math.random() * 9)), (Math.ceil(Math.random() * 9))]
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
    joinGame ({ commit, state }, player) {
      commit('ADD_PLAYER', player)
      state.socket.emit('join-game', player)
    },
    startGame ({ commit, state }) {
      commit('START_GAME')
      commit('RANDOM_CARDS')
      state.socket.emit('start-game')
    },
    onStartGame ({ commit }) {
      commit('START_GAME')
    },
    randomCards ({ commit }) {
      commit('RANDOM_CARDS')
    }
  },
  getters: {
    finishedPlayerCount (state) {
      const finishedPlayers = state.players.filter(element => element.isFinished === true)
      return finishedPlayers.length
    }
  }
})
