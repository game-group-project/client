<template>
  <div class="row ml-5 mr-5 mt-5" v-if="isDisplay">
      <Card
      v-for="(card, i) in $store.state.cards" :key="i"
      :card="card" @randomCards="randomCards"
      />
  </div>
</template>

<script>
import Card from './Card'

export default {
  data () {
    return {
      isDisplay: true
    }
  },
  components: {
    Card
  },
  methods: {
    randomCards () {
      this.$store.dispatch('randomCards')
      this.isDisplay = false
      this.$nextTick(() => {
        this.isDisplay = true
      })
    }
  }
}
</script>

<style>

</style>
