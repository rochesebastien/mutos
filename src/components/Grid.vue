<script>
import Cell from './Cell.vue';
import { ref } from 'vue';
import { createApp } from 'vue';
import Repository from '../data/Repository';
import Dialog from './Dialog.vue';
import Chrono from './Chrono.vue';

export default {
  props: {
    mode: String,
    word: String,
  },
  components: {
    Cell,
    Dialog,
    Chrono,
  },
  // emits: ['statusGame'],
  data() {
    return {
      Game: {
        mode: this.mode,
        status: "playing",
        word: this.word,
        try: 6,
      },
      Cursor: {
        row: 0,
        cell: 0,
      },
      Grid: {
        rows: [],
      },
      User: {
        letterGuessed: { letters: [], positions: [] },
        letterFound: { letters: [], positions: [] },
      },

      Error: { error: 0, error_msg: "Erreur" },
    };
  },
  methods: {
    async Reset() {
      console.log("Reset en cours");
      this.Cursor.row = 0
      this.Cursor.cell = 0
      this.Grid.rows = []
      this.User.letterFound.letters = []
      this.User.letterFound.positions = []
      this.User.letterGuessed.letters = []
      this.User.letterGuessed.positions = []
      //   for (let i = 0; i < this.Game.try; i++) {
      //   this.Grid.rows.push({
      //     letters: []
      //   })
      // }
    },
    CheckFoundLetter(lettre, position) {
      const word_array = this.Game.word.split('');
      // Si la lettre est à la meme position dans le mot
      if (lettre == word_array[position]) {
        // Si cette lettre a déjà été trouver au moins 1 fois dans le mot 
        if (this.User.letterFound.letters.includes(lettre)) {
          // Si la position de cette lettre a déja été trouvé
          if (this.User.letterFound.positions.includes(position)) {
            return false;
          } else {
            this.User.letterFound.letters.push(lettre);
            this.User.letterFound.positions.push(position);
            return true;
          }
        } else {
          this.User.letterFound.letters.push(lettre);
          this.User.letterFound.positions.push(position);
          return true;
        }
      } else {
        return false;
      }
    },
    CheckGuessedLetter(lettre, position) {
      const word_array = this.Game.word.split('');

      // Nombre de fois que la lettre est présente dans le mot 
      let nbLetterInWord = 0
      word_array.forEach(el => {
        if (lettre === el) {
          nbLetterInWord++
        }
      })
      // Si la lettre est présente une fois ou plus
      if (nbLetterInWord >= 1) {
        let nbLetterFound = 0
        // Je vérifie si la lettre a été trouvé dans le mot 
        for (let i = 0; i < word_array.length; i++) {
          if (this.User.letterFound.positions.includes(i)) {
            if (this.User.letterFound.letters[this.User.letterFound.positions.indexOf(i)] === lettre) {
              nbLetterFound++
            }
          }
        }
        // Si le nombre de lettre trouvé est >= au nombre de lettre dans le mot alors toutes les lettres sont trouvées
        if (nbLetterFound >= nbLetterInWord) {
          return false
        }
        // Je récup le nombre fois que la lettre a été écrite avant la lettre trouvé
        let Poscount = 0
        for (let i = 0; i < position; i++) {
          if (this.Grid.rows[this.Cursor.row].letters[i] === lettre) {
            Poscount++
          }
        }
        // Et je regarde si le nombre de fois trouvé est < à au nombre de lettres de lettres dans le mot
        if (Poscount < nbLetterInWord) {
          this.User.letterGuessed.letters.push(lettre)
          this.User.letterGuessed.positions.push(position)
        }
      }
    },
    Initialisation() {
      this.Game.word = this.word;
      console.log(this.Game.word);
      for (let i = 0; i < this.Game.try; i++) {
        this.Grid.rows.push({
          letters: []
        })
      }
      this.User.letterFound.letters.push(this.Game.word.charAt(0));
      this.User.letterFound.positions.push(0);
      this.AddFirstLetter();
    },
    async KeyboardListener(event) {
      if (/^[a-z-]$/.test(event.key)) {
        if (!this.CheckRowIsFilled()) {
          this.Cursor.cell++;
          this.Grid.rows[this.Cursor.row].letters.push(event.key);
        }
      }

      // Si la touche suppr est press
      if (event.key == 'BACKSPACE' || event.key == 'Delete' || event.key == 'Backspace') {
        // Enlève la derniere lettre
        this.RemoveLast();
        // Si la touche entrée est press
      } else if (event.key == 'Enter') {
        //Si la ligne est full
        if (this.CheckNoTry()) {
          if (this.CheckRowIsFilled()) {
            // if(true){
            //Si le mot existe
            if (await Repository.getWordExist(this.Grid.rows[this.Cursor.row].letters.join(''))) {
              // if(true){
              if (this.IfIsWord()) {
                // alert(this.Game.mode)
                if (this.Game.mode == "day") {
                  alert("gagné")
                  this.Game.status = "won"
                  alert(this.Game.status);
                } else if (this.Game.mode == "daysuite") {
                  this.Game.status = "playing"
                  this.$emit('statusGame', "wordfound");
                  this.ShowError("Vous aves trouvé le mot !");
                }
              }
              for (let l = 0; l < this.Grid.rows[this.Cursor.row].letters.length; l++) {
                const el = this.Grid.rows[this.Cursor.row].letters[l];
                this.CheckFoundLetter(el, l)
              }
              for (let l = 0; l < this.Grid.rows[this.Cursor.row].letters.length; l++) {
                const el = this.Grid.rows[this.Cursor.row].letters[l];
                this.CheckGuessedLetter(el, l)
              }

            } else {
              this.ShowError("Le mot n'existe pas");
              this.CleanRow();
            }
          } else {
            this.ShowError("Remplissez d'abord la ligne");
          }
        } else {
          this.Game.status = 'lost'
        }
      }
    },
    //Ajoute la premiere lettre du mot en début de ligne
    AddFirstLetter() {
      this.Grid.rows[this.Cursor.row].letters.push(this.Game.word.charAt(0));
    },
    //Passe à la ligne suivante 
    IncrementRow() {
      this.Cursor.row++;
      this.Cursor.cell = 1;
    },
    CheckRowIsFilled() {
      if (this.Grid.rows[this.Cursor.row].letters.length != this.Game.word.length) {
        return false;
      } else {
        return true;
      }
    },
    //Affiche une erreur avec son message
    ShowError(msg) {
      this.Error.error++;
      this.Error.error_msg = msg;
      setTimeout(() => {
        this.Error.error--
        this.Error.error_msg = "";
      }, 2000);
    },
    //Nettoie la ligne actuelle et ajoute la premier lettre
    CleanRow() {
      this.Grid.rows[this.Cursor.row].letters.length = 0
      this.AddFirstLetter();
      this.Cursor.cell = 1
    },
    //Si le nombre d'essaie est de 0 = perdu
    CheckNoTry() {
      if (this.Cursor.row === this.Game.try - 1) {
        return false;
      } else {
        return true;
      }
    },
    //Enleve la dernière lettre écrite
    RemoveLast() {
      if (this.Grid.rows[this.Cursor.row].letters.length != 1) {
        this.Grid.rows[this.Cursor.row].letters.pop();
      }
      this.Cursor.cell--;
    },
    // Vérifie si c'est le bon mot
    IfIsWord() {
      if (this.Grid.rows[this.Cursor.row].letters.join('') == this.Game.word) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    word(new_word) {
      this.Reset()
      this.Game.word = new_word;
      this.Initialisation();
    }
  },
  created() {
    this.Initialisation();
  },
  mounted() {
    window.addEventListener("keydown", async (event) => {
      this.KeyboardListener(event);
    });
  },
};
</script>

<template>
  <Dialog :class="[this.Error.error != 0 ? 'dialog_see' : '']" :error_msg="this.Error.error_msg" />
  <div v-if="this.Game.status == 'playing'" class="grid">
    <div class="row" v-for="i in this.Game.try">
      <div v-for="j in this.Game.word.length">
        <Cell
          v-if="this.Grid.rows[i - 1].letters[j - 1] && this.User.letterFound.letters[this.User.letterFound.positions.indexOf(j - 1)] === this.Grid.rows[i - 1].letters[j - 1]"
          class="cell found" :letter="this.Grid.rows[i - 1].letters[j - 1]" />
        <Cell
          v-else-if="this.User.letterGuessed.letters.includes(this.Grid.rows[i - 1].letters[j - 1]) && this.Cursor.row >= i"
          class="cell exist" :letter="this.Grid.rows[i - 1].letters[j - 1]" />
        <Cell v-else="!this.Grid.rows[i - 1].letters[j - 1]" class="cell"
          :letter="this.Grid.rows[i - 1].letters[j - 1]" />
      </div>
    </div>
  </div>
  <div v-else-if="this.Game.status == 'won'"> Bien joué c'est gagné</div>
  <div v-else>C'est perdu ;/</div>
  <Chrono />
</template>


<style scoped>
.kk {
  display: flex;
  flex-direction: column;
}

.test {
  display: flex;
  background-color: brown;
}

.grid {
  margin: 0 auto;
  display: grid;
  font-size: 4rem;
  /* font-size: 1rem; */
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  border-right: 3px solid black;
  border-top: 3px solid black;
}

.row {
  display: flex;
  justify-content: center;
}

.cell {
  border-left: 3px solid black;
  border-bottom: 3px solid black;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.exist::before {
  content: "";
  position: absolute;
  z-index: -1;
  width: 72px;
  height: 72px;
  background: #DB3A34;
  border-radius: 107px;
}

.found:before {
  content: "";
  position: absolute;
  z-index: -1;
  width: 72px;
  height: 72px;
  background: #E95838;
  border-radius: 8px;
}</style>