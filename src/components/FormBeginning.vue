<template>
  <div id="FormBeginning">
    <h2>BOWLING 2D</h2>
    <br>
    <br>
    <label for="fname">Player 1</label>
    <input type="text" id="fname" name="firstname" placeholder="Player 1" v-model="player_one">

    <br>
    <br>
    <label for="fname">Player 2</label>
    <input type="text" id="fname" name="firstname" placeholder="Player 2" v-model="player_two">
    <br>
    <br>
    <button class="button_start" v-on:click="start">Start</button>
    <br>
    <br>
    <button class="button_back" v-on:click="back">Back</button>
  </div>
</template>

<script>
export default {
  name: 'FormBeginning',
  data () {
    return {
      player_one: '',
      player_two: ''
    }
  },
  methods: {
    start () {
      this.$router.push({name: 'GameBowling', params: {player_one: this.player_one, player_two: this.player_two}})
    },
    back () {
      this.$router.push('Beginning')
    }
  }
}
</script>

<style>
#FormBeginning {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
input[type=text], select {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

label {
  display: block;
}

#FormBeginning {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.button_start {
  width: 30%;
  background-color: #004d33; /* Green */
  border: none;
  color: white;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.button_back {
  width: 30%;
  background-color: #ff3333; /* Green */
  border: none;
  color: white;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
