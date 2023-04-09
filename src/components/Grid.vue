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
        word: "test",
        try:5,
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
    CheckOneLetter(lettre,position){
      // console.log(position-1);
      if(lettre == this.Game.word.split('')[position]){
        this.User.letterFound.letters.push(lettre);
        this.User.letterFound.positions.push(position);
        console.log(this.User.letterFound.letters);
        console.log(this.User.letterFound.positions);
        return true;
      } else {
        return false;
      }      
      }
    ,
    Initialisation(){
      for (let i = 0; i < this.Game.try; i++) {
      this.Grid.rows.push({
        letters: []
      })
    } 
    this.AddFirstLetter()
    },
    async KeyboardListener(event){
      console.log("Lettre"+this.User.letterFound.letters);
      console.log("Positions"+this.User.letterFound.positions);
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
                this.ShowError("Bien joué c'est gagné");
                //Check les lettres
            }
              for (let l = 0; l < this.Grid.rows[this.Cursor.row].letters.length; l++) {
                const el = this.Grid.rows[this.Cursor.row].letters[l];
                this.CheckOneLetter(el,l)
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
            this.ShowError("C'est perdu");
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
    <div class="grid" >
        <div class="row" v-for="i in this.Game.try"> 
            <div  v-for="j in this.Game.word.length"> 
              <Cell :class="this.Grid.rows[i - 1].letters[j - 1] != ''  && this.User.letterFound.positions[j-1] === j-1 && this.User.letterFound.letters[j-1] != '' ? 'cell found' : 'cell'" :letter=' this.Grid.rows[i - 1].letters[j - 1]' />
              <!-- <Cell class="cell" :letter=' this.Grid.rows[i - 1].letters[j - 1]' /> -->
            </div>
        </div>
    </div>
    <div class="test" v-for="rauw in this.Game.try">
      <!-- {{ this.Grid.rows }} -->
    </div> 
    {{ this.Cursor.row }}
    <div class="test" v-for="rr in this.Game.try">
      <div class="" v-for="cc in this.Game.word.length">
        {{ this.Grid.rows[rr - 1].letters[cc - 1] }}
        <!-- {{ this.User.letterFound.letters[kk-1] }} -->
        
       <!-- {{  this.User.letterFound.positions[kk-1] }} -->
      </div>
    </div>
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
    font-size: 4rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    border-right: 3px solid black;
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