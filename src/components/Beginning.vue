<template>
  <div id="Beginning">
    <h2>BOWLING 2D</h2>
    <br />
    <br />
    <button v-on:click="redirect">New Game</button>
  </div>
</template>

<script>
export default {
  name: "Beginning",
  methods: {
    redirect () {
      this.$router.push('FormBeginning')
    }
  }
};
</script>

<style>
#Beginning {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  background-color: #004d33; /* Green */
  border: none;
  color: white;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
