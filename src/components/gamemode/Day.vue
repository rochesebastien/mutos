<script>
import Grid from '../../components/Grid.vue';
import Repository from '../../data/Repository';
export default {
  components: {
    Grid
  },
  data(){
    return{
        day_word: null
    }
  },
  created() {
    this.fetchWordOftheDay();
  },
  methods: {
    fetchWordOftheDay() {
      // Assuming Repository.RandomWord() returns a Promise
     Repository.getDayWord()
        .then(word => {
          this.day_word = word;
          console.log(this.day_word);
        })
        .catch(error => {
          console.error('Impossible de récupérer le mot du jour', error);
        });
    },

  }
}
</script>

<template>
  <div class="rules_ctn">
        <h1>Mot du jour</h1>
        <Grid :word="day_word" v-if="day_word"/>
        <h2  v-else>Chargement</h2>
  </div>
</template>

<style scoped>
h1{
    margin-bottom: 1rem;
}
</style>
