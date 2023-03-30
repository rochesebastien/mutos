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
        letters_user:[],
        LetterGuessed:{letters:[],positions:[]},
        LetterFind:{letters:[],positions:[]},
        letters_guessed:[],
        try:5,
      },
      word: "test",
      length:0,
      numligne : 0,
      Error:{error:0,error_msg:"Erreur"},
    };
  },
  methods:{
    CheckLetter(){
      let lettersFound = [];
      let correctPosition = [];

      for (let i = 0; i < this.Game.letters_user[this.numligne].length; i++) {
        let letter = this.Game.letters_user[this.numligne][i];

        if (this.word.includes(letter)) {
          lettersFound.push(letter);
          if (this.word.indexOf(letter) === i) {
            correctPosition.push(letter);
          }
        }
      }
      console.log("Lettre(s) qui sont dans le mots : "+lettersFound,"Lettre(s) qui sont à la bonne position : "+correctPosition);
  // return {
  //   lettersFound,
  //   correctPosition
  // };
      // for (let i = 0; i < this.Game.letters_user[this.numligne].length; i++) {
      //   const letr = this.Game.letters_user[this.numligne][i];
      //   this.letter_find.push(letr)
      // }
      // console.log(this.letter_find);
    },
    async KeyboardListener(event){
      console.log(event);
      if(/^[a-z]$/.test(event.key)){
        if(!this.CheckRowIsFilled()){
          this.Game.letters_user[this.numligne].push(event.key); 
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
          if(await Repository.ExistInWords(this.Game.letters_user[this.numligne].join(''))){
            if(this.IfIsWord()){
                this.ShowError("Bien joué c'est gagné");
              }
               //Check les lettres
              this.CheckLetter();
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
      this.Game.letters_user[this.numligne].push(this.word.split('')[0]);
    },
    //Passe à la ligne suivante 
    IncrementRow(){
      this.numligne++;
    },
    CheckRowIsFilled(){
      if(this.Game.letters_user[this.numligne].length != this.length){
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
      console.log("Nettoyage de l'array "+this.numligne);
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
      console.log(this.Game.letters_user[this.numligne].join(''));
      if(this.Game.letters_user[this.numligne].join('') == this.word){
       return true;
      } else {
        return false;
      }
    }
    },

   mounted() {
    const word_splited = this.word.split('');
    this.length = this.word.split('').length
    for(let i = 0; i < this.Game.try; i++) {
      this.Game.letters_user.push([])
    }
    this.AddFirstLetter()

    // const cells = document.querySelectorAll('.cell')
    
    window.addEventListener("keypress", async (event) => {
      this.KeyboardListener(event)
    
      });
  },
};
</script>

<template>
  <Dialog :class="[this.Error.error != 0 ? 'dialog_see' : '']" :error_msg="this.Error.error_msg"/>
  {{  this.Game.letters_user }}
    <div class="grid" >
        <div class="row" v-for="row in this.Game.try">
            <div  v-for="(letter, index) in length" :key="index">     
              <Cell class="cell" :letter="this.Game.letters_user[row-1][index]" />
            </div>
            <!--:letter="letter[index]" :index="index" -->
        </div>
    </div>
</template>


<style scoped>
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

.find:before{
  content: "";
  position: absolute;
  z-index: -1;
  width: 72px;
  height: 72px;
  background:#E95838;
  border-radius: 8px;
}
</style>