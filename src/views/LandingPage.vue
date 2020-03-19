<template>
  <div class="landingPage">
    <img src="../assets/backgroundlp.png" alt="" style="width: 40%; margin-top:50px">
    <div id="join" style="width: 30%; margin-top:150px;">
      <h2>Are you ready?</h2>
      <form>
        <div class="form-group">
          <input v-model="name" type="text" class="form-control" id="name" placeholder="Please Enter Name">
        </div>
        <button type="submit" class="btn btn-dark"
        @click.prevent="setName">Join Game</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    setName () {
      localStorage.name = this.name
      this.$store.dispatch('setPlayerName', this.name)
      this.$router.push('/game')
    }
  }
}
</script>

<style scoped>
.landingPage {
  display: flex;
  justify-content: space-evenly;
}
#join, form{
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  display: flex;
  justify-content: center;
}
</style>
<style src="vue-flipper/dist/vue-flipper.css" />
