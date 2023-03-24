<script setup>
import Cell from './Cell.vue';
import { ref } from 'vue'
defineProps({
  word: Array,
})

const key_count = 0
const word = ref("test")
const length = word.value.length

for (let index = 0; index < length.length; index++) {
    const j = length[index];
    j.innerHTML
}
const letres = length



const letters = word.value.split('')
// console.log(letters);

// console.log(word.value.length);
// const rows_len = word.value.length
// console.log(word);
</script>
 
<template>
    <div class="row">
        <div v-for="(letter, index) in length" :key="index">
            <Cell class="test" :letter="letter[index]" :index="index" />
        </div>    
    </div>
</template>


<style scoped>
.row{
    display: flex;
    justify-content: center;
}
</style>