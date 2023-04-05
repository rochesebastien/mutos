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
        try:2,
      },
      Cursor:{
        row:0,
        cell:0,
      },
      User:{
        Letters:[],
        LetterGuessed:{letters:[],positions:[]},
        LetterFound:{letters:[],positions:[]},
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

      // Boucler 5 fois pour créer 5 sous-arrays
      for (let i = 0; i < this.Game.try; i++) {
        // Créer un array vide pour chaque sous-array
        let arrayEnfant = [];
        // Boucler 2 fois pour ajouter 2 éléments à chaque sous-array
        for (let j = 0; j < this.Game.word.length; j++) {
          // Ajouter un élément à chaque sous-array
          arrayEnfant.push(' ');
        }
        // Ajouter le sous-array rempli au tableau parent
        this.User.Letters.push(arrayEnfant);
      }
      // Afficher le tableau parent et ses sous-arrays

      
    this.AddFirstLetter()
    console.log(this.User.Letters[0][1]);
    },
    async KeyboardListener(event){
      // console.log(this.User.Letters[this.Cursor.row]);
      console.log(event.key);
      if(/^[a-z]$/.test(event.key)){
        if(!this.CheckRowIsFilled()){
          // this.User.Letters[this.Cursor.row].push(); 
          this.User.Letters[this.Cursor.cell] = event.key;
          this.Cursor.cell++;
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
            const check_len = this.User.Letters[this.Cursor.row].length
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
      this.User.Letters[this.Cursor.row][0] = this.Game.word.split('')[0];
    },
    //Passe à la ligne suivante 
    IncrementRow(){
      this.Cursor.row++;
    },
    CheckRowIsFilled(){
      if(this.User.Letters[this.Cursor.row].length != this.Game.word.length){
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
    <div class="grid" >
        <!-- <div class="row" v-for="row in this.Game.try"> 
            <div  v-for="(letter, index) in this.Game.word.length" :key="index"> 
              <Cell class="cell" :letter='this.User.Letters[this.Cursor.row][index] ? this.User.Letters[this.Cursor.row][0][index] : "" ' />
            </div>
        </div> -->
    </div>
    <!-- {{ this.User.Letters[0] }}  -->
    <div class="test" v-for="row in this.User.">
      Ligne {{ row-1 }} :
      <div class="" v-for="(letter, index) in this.Game.word.length" :key="index">
         Lettre{{ index }} : {{ this.User.Letters[1] }}
      </div>
    </div> 

    <!-- <div class="test" v-for="row in this.Game.try">
      Mot de l'utilisateur :
      <div class="" v-for="(letter, index) in length" :key="index">
         {{ this.Game.letters_user[row-1][index] }}
      </div>
    </div>-->
</template>


<style scoped>

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