<template>
  <div class="col-md-3">
    <div class="card mb-3 shadow-sm text-center"
    v-if="isClick"
    >
      <div class="card-img-overlay d-flex justify-content-center align-items-center">
        <h1 class="card-title">{{ card }}</h1>
      </div>
      <div class="p-3">
        <img class="img-fluid" src="../assets/CardTemplate.png" alt="">
      </div>
    </div>
    <div class="card mb-3 shadow-sm text-center"
    v-else
    @click="changeCard()"
    >
      <div class="p-3">
        <img class="img-fluid" src="../assets/backCard.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isClick: false
    }
  },
  props: ['card'],
  methods: {
    changeCard () {
      this.isClick = true
    }
  }
}
</script>

<style>
h1 {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bolder;
  font-size: 80px;
  color: #852222;
}
</style>
