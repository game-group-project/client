<template>
  <div>
    <h1>This is the game page</h1>
    <div class="score">
      Players :
      <ul>
        <li v-for="player in players" :key="player.name">{{ `${player.name} | ${player.score}` }}</li>
      </ul>
    </div>
    <div class="row">
      <button v-if="playerCount >= 2 && !isPlaying" @click="startGame" class="btn btn-primary">Start Game</button>
    </div>
    <div class="row">
      <!-- Ini untuk card -->
      <CardList v-if="isPlaying"/>
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
      score: this.score,
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
  },
  methods: {
    startGame () {
      this.$store.dispatch('startGame')
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
    }
  }
}
</script>
