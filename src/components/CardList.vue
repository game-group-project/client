<template>
  <div class="row ml-5 mr-5 mt-5">
      <Card
      v-for="(card, i) in $store.state.cards" :key="i"
      :card="card"
      />
  </div>
</template>

<script>
import Card from './Card'

export default {
  data () {
    return {
      cards: [1, 2, 3, 4]
    }
  },
  components: {
    Card
  }
}
</script>

<style>

</style>
