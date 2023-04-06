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
        word: "tg",
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
      // console.log(position);
     
      if(lettre == this.word.split('')[position]){
        console.log(lettre +" : "+ position);
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
    // console.log(this.Grid.rows);
    this.AddFirstLetter()
    },
    async KeyboardListener(event){
      // console.log(this.User.Letters[this.Cursor.row]);
      console.log(event.key);
      if(/^[a-z]$/.test(event.key)){
        if(!this.CheckRowIsFilled()){
          // this.Grid.rows[this.Cursor.row].letters[this.Cursor.cell].push(); 
          // this.Grid.ro[this.Cursor.cell] = event.key;
          // this.Cursor.cell++;
          console.log(this.Grid.rows);
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
          // if(await Repository.ExistInWords(this.Game.letters_user[this.numligne].join(''))){
             if(true){
            if(this.IfIsWord()){
                this.ShowError("Bien joué c'est gagné");
                //Check les lettres
            }
            // const check_len = this.User.Letters[this.Cursor.row].length
            // console.log(this.CheckOneLetter(this.Game.letters_user[this.numligne][0],0));
              // for (let index = 0; index < this.Game.letters_user[this.numligne].length; index++) { 
              //     if(this.CheckOneLetter(this.Game.letters_user[this.numligne][index],index)){
              //       this.Game.LetterFound.letters.push(this.Game.letters_user[this.numligne][index]);
              //       this.Game.LetterFound.positions.push(index);
              //     }
              //   }
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
      this.Grid.rows[0].letters.push('t');
    },
    //Passe à la ligne suivante 
    IncrementRow(){
      this.Cursor.row++;
    },
    CheckRowIsFilled(){
      return false;
      // if(this.User.Letters[this.Cursor.row].length != this.Game.word.length){
      //   return false;
      // } else {
      //   return true;
      // }
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
      this.Game.letters_user[this.numligne].length = 0
      this.AddFirstLetter();
      console.log(this.Game.letters_user[this.numligne]);
    },
     //Si le nombre d'essaie est de 0 = perdu
    CheckNoTry(){
        if(this.numligne+1 === this.Game.try){
          return false;
        } else{
          return true;
        }
    },
    //Enleve la dernière lettre écrite
    RemoveLast(){
      if (this.Game.letters_user[this.numligne].length != 1) {
                this.Game.letters_user[this.numligne].pop();
        }
    },
    IfIsWord(){
      if(this.User.Letters[this.Cursor.row].join('') == this.Game.word){
       return true;
      } else {
        return false;
      }
    }
    },

   mounted() {
    // const cells = document.querySelectorAll('.cell')
    this.Initialisation();
    window.addEventListener("keypress", async (event) => {
      this.KeyboardListener(event);
      });
  },
};
</script>

<template>
  <Dialog :class="[this.Error.error != 0 ? 'dialog_see' : '']" :error_msg="this.Error.error_msg"/>
   <!-- {{ [this.Cursor.cell] }} 
  {{ [this.Cursor.row] }}  -->
  
  <!-- {{ [this.User.Letters][0][0] }}  -->
  <!-- {{ [this.User.Letters[this.Cursor.row]][0][this.Cursor.cell] }} -->
  <!-- {{  this.User.Letters[this.Cursor.row][this.Cursor.cell] }} -->
    <!-- <div class="grid" >
        <div class="row" v-for="row in this.Game.try"> 
            <div  v-for="index in this.Game.word.length" :key="index"> 
              <Cell class="cell" :letter='this.Grid.rows[row].letters[index]' />
            </div>
        </div>
    </div> -->
    <!-- {{ this.User.Letters }}  -->
    <div class="test" v-for="rauw in this.Game.try">
      <!-- {{ rauw - 1 }} -->
      {{ this.Grid.rows }}
      <!-- <div class="kk" v-for="cel in this.Game.word.length" :key="index"> -->
        <!-- <p>{{ this.User.Letters[0] }}</p> -->
         <!-- {{ index }} -->
         <!-- {{ a = this.User.Letters[0] }} -->
      <!-- </div> -->
    </div> 

    <!-- <div class="test" v-for="row in this.Game.try">
      Mot de l'utilisateur :
      <div class="" v-for="(letter, index) in length" :key="index">
         {{ this.Game.letters_user[row-1][index] }}
      </div>
    </div>-->
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