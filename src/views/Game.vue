<template>
  <div>
    <h1 style="text-align: center" v-if="gameFinished">Game Finished! Waiting other player to finish!</h1>
    <div class="d-flex align-items-center flex-column">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="d-flex justify-content-between mb-2">
      <h3 style="margin-right:100px">Players :</h3>
      <button class="btn btn-primary" v-if="isPlaying" @click="restartGame">Restart Game</button>
      <button v-if="playerCount >= 2 && !isPlaying" @click="startGame" class="btn btn-primary">Start Game</button>
    </div>
    <div class="d-flex flex-column">
      <ul class="list-group d-flex flex-row">
        <li class="list-group-item d-flex align-items-center mr-3 mb-1"
        v-for="player in players" :key="player.name"
        >
          {{ player.name }}
          <span class="badge badge-primary badge-pill ml-3"> {{ player.score }}</span>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col">
        <CardList v-if="isPlaying && !gameFinished"/>
      </div>
    </div>
    <div class="row" v-if="finishedPlayerCount === playerCount">
      <div class="col">
        <div v-if="typeof highestScore !== 'string'">
          <h1>Highest Score : </h1><br><br>
          <h2>Name : {{ highestScore.name }}</h2><br><br>
          <h2>Score : {{ highestScore.score }}</h2><br><br>
        </div>
        <div v-else>
          <h1>DRAW</h1>
        </div>
        <button class="btn btn-primary" @click="restartGame">Restart Game</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardList from '../components/CardList'
export default {
  components: {
    CardList
  },
  created () {
    const player = {
      name: this.name,
      score: 0,
      isFinished: false
    }
    this.$store.dispatch('joinGame', player)
    this.socket.on('on-player-joined', (data) => {
      this.$store.dispatch('onPlayerJoined', data)
    })
    this.socket.on('on-broadcast-score', (data) => {
      this.$store.dispatch('onBroadcastScore', data)
    })
    this.socket.on('on-start-game', () => {
      this.$store.dispatch('onStartGame')
    })
    this.socket.on('on-restart-game', () => {
      this.$store.dispatch('onRestartGame')
      this.$router.push('/')
    })
  },
  methods: {
    startGame () {
      this.$store.dispatch('startGame')
    },
    restartGame () {
      this.$store.dispatch('restartGame')
      this.$router.push('/')
    }
  },
  computed: {
    name () {
      return this.$store.state.name
    },
    score () {
      return this.$store.state.score
    },
    socket () {
      return this.$store.state.socket
    },
    players () {
      return this.$store.state.players
    },
    playerCount () {
      return this.$store.state.players.length
    },
    isPlaying () {
      return this.$store.state.isPlaying
    },
    finishedPlayerCount () {
      return this.$store.getters.finishedPlayerCount
    },
    highestScore () {
      return this.$store.getters.highestScore || {}
    },
    gameFinished () {
      return this.$store.state.gameFinished
    }
  }
}
</script>
