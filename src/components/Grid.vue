<script>
// import Row from './Row.vue';
import Cell from './Cell.vue';
import { ref } from 'vue';
import { createApp } from 'vue';

export default {
  components: {
    Cell,
  },
  data() {
    return {
      user_word: [],
      word: "test",
      numligne : 5,
      count:0,
    };
  },
  mounted() {
    const length = this.word.split('');
    this.user_word.push(length[0]);
    const cells = document.querySelectorAll('.cell')
    
    window.addEventListener("keypress", (event) => {

        let CellInstance = createApp(Cell);
        let instance = CellInstance.mount(cells[this.count],{letter:event.key,index:this.count})
        this.count++;

        if (event.key == 'Backspace') {
            if (this.user_word.length != 1) {
                this.user_word.pop();
            }
   
        } else if(event.key == 'Enter') {
            if (this.user_word.join('') == this.word) {
                console.log("C'est gagné");
            }
        } else {

            this.user_word.push(event.key);
        }
        console.log(this.user_word);
    });
  },
  computed: {
    length() {
      return this.word.split('');
    },
  },
};
</script>

<template>
    <div class="grid" >
        <div class="row" v-for="i in numligne">
            <div  v-for="(letter, index) in length" :key="index">
                <div class="cell">

                </div>
                <!---<Cell class="test"/>-->
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
}

.row{
    display: flex;
    justify-content: center;
}

.cell{
    border:2px solid black;
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>