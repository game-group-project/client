<template>
  <div>
    <h1>This is the game page</h1>
    <div class="score">
      Players : 
      {{ players }}
    </div>
  </div>
</template>

<script>
export default {
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
  },
  methods: {
    addScore () {
      const data = {
        name: this.name,
        score: this.score
      }
      this.$store.dispatch('sendScore', data)
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
    }
  }
}
</script>
