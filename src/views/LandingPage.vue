<template>
  <div class="landingPage">
      <img src="../assets/backgroundlp.png" alt="" style="width: 40%; margin-top:50px;margin-left:200px">
      <div id="join" style="width: 30%; margin-top:150px;">
        <h2>Are you ready?</h2>
        <form>
          <div class="form-group">
            <input type="text" class="form-control" id="name" placeholder="Please Enter Name">
          </div>
          <button type="submit" class="btn btn-dark">Join Game</button>
        </form>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.landingPage {
  display: flex;
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
