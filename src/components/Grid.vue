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
      user_word: [],
      word: "test",
      length:0,
      numligne : 0,
      try:6,
      Error:{error:0,error_msg:"Erreur"},
    };
  },
  methods:{
    async KeyboardListener(event){
      if(/^[a-z]$/.test(event.key)){
        if(!this.checkRowIsFilled()){
          this.user_word[this.numligne].push(event.key); 
        }  
      }

      if (event.key == 'Backspace') {
        this.RemoveLast();
      } else if(event.key == 'Enter') {
          //Si la ligne est full
          // console.log("zdadz : "+await this.checkIfExist());
        if(this.checkRowIsFilled()){
          console.log(await this.checkIfExist());
          if(await this.checkIfExist()){

              this.IncrementRow();
              
              //Check les lettre
          } else {
            this.ShowError("Le mot n'existe pas");
            this.CleanRow();
          }
        } else {
          this.ShowError("Remplissez d'abord la ligne");
        }
          
        //   if (await this.checkIfExist()) {//Si le mot existe
        //       this.IncrementRow()
        //       this.AddFirstLetter()  
        //   if (this.CheckNoTry()) {
        //     this.ShowError("Plus d'essaies : vous avez perdu");
        //   }
        //   } else if(!this.checkRowIsFilled()){
        //     //
        //     // this.CleanRow();
        //     this.ShowError("Remplissez d'abord la ligne");
        //   }else{ 
        //     this.ShowError("Le mot existe pas");
        //   }
        // } else {
           
          
        }
    },
    //Regarde si le mot existe
    async checkIfExist(){
      console.log("entré");
      console.log(await Repository.getWords());
      // await Repository.getWords().then((wordArray) => {
      // const userWord = this.user_word[this.numligne].join('');
      // console.log("mot : "+userWord);
      // console.log(wordArray);

      // console.log(wordArray.includes(userWord))
      if(wordArray.includes(userWord)){
        console.log('aaa');
        return true;
      } else {
        return false;
      }
    },
    //Ajoute la premiere lettre du mot en début de ligne
    AddFirstLetter(){
      this.user_word[this.numligne].push(this.word.split('')[0]);
    },
    //Passe à la ligne suivante 
    IncrementRow(){
      this.numligne++;
    },
    checkRowIsFilled(){
      // console.log("Longueur du tap : "+this.user_word[this.numligne].length);
      // console.log("Longueur du mot : "+this.length);
      if(this.user_word[this.numligne].length != this.length){
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
      this.user_word[this.numligne].length = 0
      this.AddFirstLetter();
      console.log("Nettoyage de l'array "+this.numligne);
      console.log(this.user_word[this.numligne]);
    },
     //Si le nombre d'essaie est de 0 = perdu
    CheckNoTry(){
        if(this.numligne === this.try){
          return true;
        } else{
          return false;
        }
    },
    //Enleve la dernière lettre écrite
    RemoveLast(){
      if (this.user_word[this.numligne].length != 1) {
                this.user_word[this.numligne].pop();
        }
    }
    },

   mounted() {
    const word_splited = this.word.split('');
    this.length = this.word.split('').length
    for(let i = 0; i < this.try; i++) {
      this.user_word.push([])
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
  {{  this.user_word }}
    <div class="grid" >
        <div class="row" v-for="row in this.try">
            <div  v-for="(letter, index) in length" :key="index">     
              <Cell class="cell" :letter="this.user_word[row-1][index]" />
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