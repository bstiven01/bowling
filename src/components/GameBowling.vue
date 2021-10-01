<template>
  <div id="GameBowling">
    <h2>BOWLING 2D</h2>
    <br />
    <br />

    <div class="tablero">
      <div class="bowl">
        <div>
          <div class="bowling"></div>
        </div>
        <div>
          <div class="bowling"></div>
        </div>
        <div>
          <div class="bowling"></div>
        </div>
        <div>
          <div class="bowling"></div>
        </div>
      </div>
      <div class="bowl">
        <div>
          <div class="bowling"></div>
        </div>
        <div>
          <div class="bowling"></div>
        </div>
        <div>
          <div class="bowling"></div>
        </div>
      </div>
      <div class="bowl">
        <div>
          <div class="bowling"></div>
        </div>
        <div>
          <div class="bowling"></div>
        </div>
      </div>
      <div class="bowl">
        <div>
          <div class="bowling"></div>
        </div>
      </div>
      <div class="contenedor">
        <div class="bowling-big"></div>
      </div>
      <button v-on:click="runPlay" class="button_play">PLAY</button>
    </div>

    <div id="tables" v-for="(player, i) in players" :key="i"  >
      <div id="name" :class="[current_player === i ? color_cyan : '' ]">
        {{ players[i] }}
      </div>

      <table v-for="(item, index) in score[i]" :key="index">
        <tr>
          <th colspan="2">{{ index + 1 }}</th>
        </tr>

        <tr>
          <td id="border-inivisible">
            {{ score[i][index] != null ? score[i][index].one : "" }}
          </td>
          <td>
            {{ score[i][index] != null ? score[i][index].two : "" }}
          </td>
        </tr>

        <tr>
          <td colspan="2">
            {{ score[i][index] != null ? score[i][index].three : "" }}
          </td>
        </tr>
      </table>
    </div>

    <!--<table>
        <tr>
          <th colspan="3">10</th>
        </tr>
        <tr>
          <td id="border-inivisible">300</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="3">12</td>
        </tr>
      </table>-->
  </div>
</template>

<script>
export default {
  name: "GameBowling",
  data() {
    return {
      players: this.getPlayers(),
      score: this.getScore(),
      variables: this.getVariables(),
      current_player: 0,
      color_cyan: 'color_cyan'
    };
  },
  methods: {
    getPlayers() {
      let result = [];
      result.push(this.$route.params.player_one);
      result.push(this.$route.params.player_two);
      //result.push("Stiven", "Diego");
      return result;
    },

    getScore() {
      let result = [];
      this.getPlayers().forEach(element => {
        result.push([]);
      });
      return result;
    },

    getVariables() {
      let result = [];

      this.getPlayers().forEach(element => {
        let object = new Object();
        object.repeat = false;
        object.turn = 0;
        object.strike = 0;
        object.spare = false; // bandera usada para saber cuando derriba los bolos en dos turns
        object.knocked_down_pins = undefined;
        result.push(object);
      });
      return result;
    },

    changePlayer() {
      let size = this.players.length - 1;
      this.current_player++;

      if (this.current_player > size) {
        this.current_player = 0;
      }
    },

    setTurn(score) {
      debugger;
      if (!this.variables[this.current_player].repeat) {
        score[this.current_player].push({
          one: this.variables[this.current_player].knocked_down_pins,
          two: undefined,
          three: undefined
        });
      } else {
        score[this.current_player][
          this.variables[this.current_player].turn
        ].two = this.variables[this.current_player].knocked_down_pins;

        if (score[this.current_player].length > 1) {
          score[this.current_player][
            this.variables[this.current_player].turn
          ].three =
            score[this.current_player][
              this.variables[this.current_player].turn - 1
            ].three +
            score[this.current_player][this.variables[this.current_player].turn]
              .one +
            score[this.current_player][this.variables[this.current_player].turn]
              .two;
        } else {
          score[this.current_player][
            this.variables[this.current_player].turn
          ].three =
            score[this.current_player][this.variables[this.current_player].turn]
              .one +
            score[this.current_player][this.variables[this.current_player].turn]
              .two;
        }
      }

      return score;
    },

    isStrike(score) {
      if (this.variables[this.current_player].strike == 1) {
        if (score[this.current_player].length == 2) {
          score[this.current_player][
            this.variables[this.current_player].turn - 1
          ].three = this.variables[this.current_player].knocked_down_pins + 10;
        } else if (score[this.current_player].length > 2) {
          score[this.current_player][
            this.variables[this.current_player].turn - 1
          ].three =
            this.variables[this.current_player].knocked_down_pins +
            10 +
            score[this.current_player][
              this.variables[this.current_player].turn - 2
            ].three;
        }
      } else if (this.variables[this.current_player].strike == 2) {
        if (score[this.current_player].length > 2) {
          score[this.current_player][
            this.variables[this.current_player].turn - 2
          ].three =
            score[this.current_player][
              this.variables[this.current_player].turn - 3
            ].three + 20;

          score[this.current_player][
            this.variables[this.current_player].turn - 1
          ].three =
            score[this.current_player][
              this.variables[this.current_player].turn - 2
            ].three + this.variables[this.current_player].knocked_down_pins;
        }
      } else if (this.variables[this.current_player].strike == 3) {
        if (score[this.current_player].length == 2) {
          score[this.current_player][
            this.variables[this.current_player].turn - 2
          ].three = 30;
        } else {
          score[this.current_player][
            this.variables[this.current_player].turn - 2
          ].three =
            score[this.current_player][
              this.variables[this.current_player].turn - 3
            ].three + 30;
        }
      }

      return score;
    },

    run(value) {
      let result = 0;
      if (value == undefined) {
        result = Math.floor(Math.random() * 11);
      } else {
        result = Math.floor(Math.random() * (11 - value));
      }
      console.log(result);
      return result;
    },

    randomCalculate() {
      // Lanzamiento de la bola
      if (!this.variables[this.current_player].repeat) {
        this.variables[this.current_player].knocked_down_pins = this.run(
          undefined
        );
      } else {
        this.variables[this.current_player].knocked_down_pins = this.run(
          this.variables[this.current_player].knocked_down_pins
        );
      }

      // Validacion el lanzamiento es menor a 10
      if (this.variables[this.current_player].knocked_down_pins < 10) {
        if (!this.variables[this.current_player].repeat) {
          // primer turno

          if (this.variables[this.current_player].strike > 0) {
            // Validacion si hay Strikes

            this.score = this.isStrike(this.score);
          } else {
            if (this.variables[this.current_player].spare) {
              this.variables[this.current_player].strike = 1;
              this.score = this.isStrike(this.score);
              this.variables[this.current_player].spare = false;
            }
          }

          this.score = this.setTurn(this.score);
          this.variables[this.current_player].repeat = true;
          this.variables[this.current_player].strike = 0;
        } else {
          //Segundo turno

          if (
            this.score[this.current_player][
              this.variables[this.current_player].turn
            ].one +
              this.variables[this.current_player].knocked_down_pins ==
            10
          ) {
            // la suma es 10
            this.variables[this.current_player].spare = true;
          }

          this.score = this.setTurn(
            this.score,
            this.variables[this.current_player].repeat
          );
          this.variables[this.current_player].repeat = false;
          this.variables[this.current_player].turn++;
          this.changePlayer();
        }
      } else {
        //es mayor a 10

        this.variables[this.current_player].strike++;

        if (
          this.variables[this.current_player].strike == 1 &&
          this.variables[this.current_player].spare == true
        ) {
          this.score = this.isStrike(this.score);
          this.variables[this.current_player].spare == false;
        } else if (this.variables[this.current_player].strike > 2) {
          this.score = this.isStrike(this.score);
          this.variables[this.current_player].strike = 2;
        }

        this.variables[this.current_player].repeat = false;
        this.score = this.setTurn(
          this.score,
          this.variables[this.current_player].repeat
        );
        this.variables[this.current_player].turn++;

        this.changePlayer();
      }

      return this.score;
    },

    runPlay() {
      console.log("JUGADOR ACTUAL" + this.current_player);
      console.log(
        "this.variabless inicio turn" +
          this.variables[0].turn +
          this.variables[1].turn
      );

      console.log(
        "this.variabless inicio repeat" +
          this.variables[0].repeat +
          this.variables[1].repeat
      );

      let result = this.randomCalculate();
      console.log(result);

      console.log(
        "this.variabless FIN turn" +
          this.variables[0].turn +
          this.variables[1].turn
      );

      console.log(
        "this.variabless FIN repeat" +
          this.variables[0].repeat +
          this.variables[1].repeat
      );

      console.log(
        "----------------------------------------------------------------------------------------------"
      );
    }
  }
};
</script>

<style>
#GameBowling {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table,
th,
td {
  border: 0.55px solid black;
  border-collapse: collapse;
  height: 22px;
}
table {
  width: 72px;
  height: 67px;
  margin-right: 0.5px;
  margin-left: 0.5px;
}
td {
  width: 24px;
}
#border-inivisible {
  border-bottom: hidden;
}

#tables {
  display: flex;
}
#name {
  width: 72px;
  margin-right: 0.5px;
}

.bowling {
  height: 20px;
  width: 20px;
  border-radius: 25px;
  display: inline-block;
  background: white;
}

.tablero {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 116, 95, 1) 0%,
    rgba(9, 103, 121, 1) 94%,
    rgba(7, 122, 145, 1) 99%
  );
  display: flex;
}

.bowl {
  align-self: center;
}

.bowling-big {
  height: 30px;
  width: 30px;
  border-radius: 25px;
  background: aqua;
  display: inline-block;
  margin-right: 10px;
  align-self: center;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
}

@keyframes example {
  0% {
    left: 0px;
    top: 0px;
  }

  100% {
    left: -960px;
    top: 0px;
  }
}

.contenedor {
  width: 1000px;
  align-self: center;
  text-align-last: end;
}

.button_play {
  width: 200px;
  background-color: cyan;
}

.color_cyan{
  background-color: cyan;
}
</style>
