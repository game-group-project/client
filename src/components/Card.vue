<template>
  <div class="col-md-3">
    <Flip
    width="270px"
    height="300px"
    :flipped="flipped"
    @click="onClick">
      <div slot="back">
        <div class="card mb-3 shadow-sm text-center">
          <div class="card-img-overlay d-flex justify-content-center align-items-center">
            <h1 class="card-title">{{ card }}</h1>
          </div>
          <div class="p-3">
            <img class="img-fluid" src="../assets/cardFront.png" alt="">
          </div>
        </div>
      </div>
      <div slot="front">
        <div class="card mb-3 shadow-sm text-center">
          <div class="p-3">
            <img class="img-fluid" src="../assets/cardBack.png" alt="">
          </div>
        </div>
      </div>
    </Flip>
  </div>
</template>

<script>
import Flip from 'vue-flipper'

export default {
  data () {
    return {
      isClick: false,
      flipped: false
    }
  },
  components: {
    Flip
  },
  props: ['card'],
  methods: {
    changeCard () {
      this.isClick = true
    },
    onClick () {
      this.flipped = !this.flipped
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
.front {
  background-color: burlywood;
}
.back {
  background-color: rgb(135, 148, 222);
}
</style>
