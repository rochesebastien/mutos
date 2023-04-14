<script>
// import Row from './Row.vue';
import Cell from './Cell.vue';
import { ref } from 'vue';
import { createApp } from 'vue';
import Repository from '../data/Repository';
import Dialog from './Dialog.vue';

export default {
  components: {
    Cell,
    Dialog,
  },
  data() {
    return {
      Game:{
        word: "meler",
        try:5,
        status:"playing",
      },
      Cursor:{
        row:0,
        cell:0,
      },
      Grid:{
        rows:[],
      },
      User:{
        letterGuessed:{letters:[],positions:[]},
        letterFound:{letters:[],positions:[]},
      },
      
      Error:{error:0,error_msg:"Erreur"},
    };
  },
  methods:{
    CheckFoundLetter(lettre,position){
      const word_array =  this.Game.word.split('');
      // console.log(position-1);
      // Si la lettre est à la meme position dans le mot
      if(lettre == word_array[position]){
        // Si cette lettre a déjà été trouver au moins 1 fois dans le mot 
        if(this.User.letterFound.letters.includes(lettre)){
          console.log(this.User.letterFound.letters.indexOf(lettre));
          // Si la position de cette lettre a déja été trouvé
          if (this.User.letterFound.positions.includes(position)) {
            console.log("Lettre "+lettre+"déjà trouvée");
            // return false;
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
      CheckGuessedLetter(lettre,position){
        const word_array =  this.Game.word.split('');
        if(word_array.includes(lettre)){
          this.User.letterGuessed.letters.push(lettre);
          this.User.letterGuessed.positions.push(position);
        }
      },
    Initialisation(){
      for (let i = 0; i < this.Game.try; i++) {
      this.Grid.rows.push({
        letters: []
      })
    } 
    this.User.letterFound.letters.push(this.Game.word.charAt(0));
    this.User.letterFound.positions.push(0);
    this.AddFirstLetter();
    },
    async KeyboardListener(event){
      // console.log("Curseur : "+this.Cursor.cell);
      // console.log("Lettre"+this.User.letterFound.letters);
      // console.log("Positions"+this.User.letterFound.positions);
      if(/^[a-z]$/.test(event.key)){
        if(!this.CheckRowIsFilled()){
          this.Cursor.cell++;
          this.Grid.rows[this.Cursor.row].letters.push(event.key);
        }  
      }
      // Si la touche suppr est press
      if (event.key == 'Backspace' || event.key == 'Delete') {
        // Enlève la derniere lettre
        this.RemoveLast();
      // Si la touche entrée est press
      } else if(event.key == 'Enter') {
          //Si la ligne est full
          if (this.CheckNoTry()) {
            if(this.CheckRowIsFilled()){
           //Si le mot existe
          if(await Repository.ExistInWords(this.Grid.rows[this.Cursor.row].letters.join(''))){
            if(this.IfIsWord()){
                this.Game.status='won'
                //Check les lettres
            }
              for (let l = 0; l < this.Grid.rows[this.Cursor.row].letters.length; l++) {
                const el = this.Grid.rows[this.Cursor.row].letters[l];
                if(this.CheckFoundLetter(el,l) == false){
                  this.CheckGuessedLetter(el,l)
                }
                
              }
              this.IncrementRow();
              this.AddFirstLetter();
              
          } else {
            this.ShowError("Le mot n'existe pas");
            this.CleanRow();
          }
        } else {
          this.ShowError("Remplissez d'abord la ligne");
        }
          } else {
            this.Game.status='lost'
          }
      }          
    },
    //Ajoute la premiere lettre du mot en début de ligne
    AddFirstLetter(){
      this.Grid.rows[this.Cursor.row].letters.push(this.Game.word.charAt(0));
    },
    //Passe à la ligne suivante 
    IncrementRow(){
      this.Cursor.row++;
      this.Cursor.cell=1;
    },
    CheckRowIsFilled(){
      if(this.Grid.rows[this.Cursor.row].letters.length != this.Game.word.length){
        return false;
      } else {
        return true;
      }
    },
    //Affiche une erreur avec son message
    ShowError(msg){
      this.Error.error++;
      this.Error.error_msg=msg;
      setTimeout(() => {
        this.Error.error--
        this.Error.error_msg="";
      }, 2000);
    },
    //Nettoie la ligne actuelle et ajoute la premier lettre
    CleanRow(){
      this.Grid.rows[this.Cursor.row].letters.length = 0
      this.AddFirstLetter();
      this.Cursor.cell=1
    },
     //Si le nombre d'essaie est de 0 = perdu
    CheckNoTry(){
        if(this.Cursor.row === this.Game.try-1){
          return false;
        } else{
          return true;
        }
    },
    //Enleve la dernière lettre écrite
    RemoveLast(){
      if (this.Grid.rows[this.Cursor.row].letters.length != 1) {
        this.Grid.rows[this.Cursor.row].letters.pop();
        }
        this.Cursor.cell--;
    },
    IfIsWord(){
      if(this.Grid.rows[this.Cursor.row].letters.join('') == this.Game.word){
       return true;
      } else {
        return false;
      }
    }
    },
    created(){
      this.Initialisation();
    },
   mounted() {
    // const cells = document.querySelectorAll('.cell')
    window.addEventListener("keypress", async (event) => {
      this.KeyboardListener(event);
      });
  },
};
</script>

<template>
  <Dialog :class="[this.Error.error != 0 ? 'dialog_see' : '']" :error_msg="this.Error.error_msg"/>
    <div v-if="this.Game.status=='playing'" class="grid" >
        <div class="row" v-for="i in this.Game.try"> 
            <div  v-for="j in this.Game.word.length"> 
              <!-- <Cell :class="this.Grid.rows[i - 1].letters[j - 1]  && this.User.letterFound.letters[this.User.letterFound.positions.indexOf(j-1)] === this.Grid.rows[i - 1].letters[j - 1] ? 'cell found' : 'cell'" :letter=" this.Grid.rows[i - 1].letters[j - 1] ? this.Grid.rows[i - 1].letters[j - 1] + ' ' + this.User.letterFound.letters[this.User.letterFound.positions.indexOf(j-1)] : ''"/> -->
              <!-- <Cell :class="this.Grid.rows[i - 1].letters[j - 1]  && this.User.letterFound.letters[this.User.letterFound.positions.indexOf(j-1)] === this.Grid.rows[i - 1].letters[j - 1] ? 'cell found' : 'cell'" :letter=" this.Grid.rows[i - 1].letters[j - 1] ? this.Grid.rows[i - 1].letters[j - 1]  : ''"/> -->
              <Cell v-if="this.Grid.rows[i - 1].letters[j - 1]  && this.User.letterFound.letters[this.User.letterFound.positions.indexOf(j-1)] === this.Grid.rows[i - 1].letters[j - 1]" class="cell found" :letter=" this.Grid.rows[i - 1].letters[j - 1]"/>
              <Cell v-else-if="this.User.letterGuessed.letters.includes(this.Grid.rows[i - 1].letters[j - 1])" class="cell exist" :letter=" this.Grid.rows[i - 1].letters[j - 1]"/>
              <Cell v-else="!this.Grid.rows[i - 1].letters[j - 1]" class="cell" :letter=" this.Grid.rows[i - 1].letters[j - 1]"/>      
            </div>
        </div>
    </div>
    <div v-else-if="this.Game.status=='won'"> Bien joué c'est gagné</div>
    <div v-else>C'est perdu ;/</div>
    <!-- <div class="test" v-for="rauw in this.Game.try"> -->
      <!-- {{ this.Grid.rows }} -->
    <!-- </div>  -->
    <!-- {{ this.User.letterGuessed.letters }}
    {{ this.User.letterGuessed.positions   }} -->
    <!-- {{ this.User.letterFound.positions }} -->
    <!-- <div class="test" v-for="rr in this.Game.try"> -->
      <!-- <div class="test" v-for="cc in this.Game.word.length"> -->
        <!-- case {{ +cc-1 }} :  -->
        <!-- {{ this.User.letterFound.positions[cc-1] === cc+1 ? this.User.letterFound.positions[cc-1] : 'X  ' }} -->
        <!-- {{ this.User.letterFound.positions[cc-1] === cc+1 ? this.User.letterFound.positions[cc-1] : 'X  ' }} -->
         <!-- - ‎ -->
         <!-- {{ this.User.letterFound.positions[cc-1] }} -  -->
         <!-- {{ this.User.letterFound.positions.indexOf(cc-1) }} -->
         <!-- {{ cc - 1 }} :  -->
         <!-- {{ this.User.letterFound.letters[this.User.letterFound.positions.indexOf(cc-1)] }} -  -->
        <!-- {{ this.User.letterFound.letters[kk-1] }} -->
        
       <!-- {{  this.User.letterFound.positions[kk-1] }} -->
      <!-- </div> -->
    <!-- </div> -->
</template>


<style scoped>

.kk{
  display: flex;
  flex-direction: column;
}

.test{
  display: flex;
  background-color: brown;
}

.grid{
    margin: 0 auto;
    display: grid;
    /* font-size: 4rem; */
    font-size: 1rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    border-right: 3px solid black;
    border-top: 3px solid black;
}

.row{
    display: flex;
    justify-content: center;
}

.cell{
    border-left:3px solid black;
    border-bottom:3px solid black;
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.exist::before{
  content: "";
  position: absolute;
  z-index: -1;
  width: 72px;
  height: 72px;
  background:#DB3A34;
  border-radius: 107px;
}

.found:before{
  content: "";
  position: absolute;
  z-index: -1;
  width: 72px;
  height: 72px;
  background:#E95838;
  border-radius: 8px;
}
</style>