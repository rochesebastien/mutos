

<script>
import Grid from '../../components/Grid.vue';
import Repository from '../../data/Repository';
export default {
  components: {
    Grid
  },
  data(){
    return{
        day_suite: null,
        word : null,
        increment : 0,
        gamemode:"daysuite"
    }
  },
  created() {
    this.fetchSuiteOftheDay();
  },
  methods: {
    fetchSuiteOftheDay() {
      // Assuming Repository.RandomWord() returns a Promise
     Repository.getSuiteOfTheDay()
        .then(suite => {
          this.day_suite = suite;
          console.log(this.day_suite);
          this.word = this.day_suite[0]
        })
        .catch(error => {
          console.error('Impossible de récupérer la liste du jour', error);
        });
    },
    incrementWord(){
      this.increment++
      console.log(this.increment);
      this.word = this.day_suite[this.increment]
      console.log(this.day_suite[this.increment]);
    },

  }
}
</script>

<template>
  <div class="rules_ctn">
    <h1>Suite du jour</h1>
    <Grid :word="word" :mode="gamemode" v-if="day_suite" @statusGame="incrementWord"/>
    <h2  v-else>Chargement</h2>
  </div>
</template>

<style scoped>
</style>
