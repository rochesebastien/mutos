<script>
<<<<<<< HEAD
import Day from '../components/gamemode/Day.vue';
import DaySuite from '../components/gamemode/DaySuite.vue';
import Infinte from '../components/gamemode/Infinite.vue';
=======
import Grid from '../components/Grid.vue';
import Repository from '../data/Repository';

export default {
  props: {
    mode: String,
  },
  components: {
    Grid
  },
  mounted(){
    // console.log(this.mode);
  }
}
>>>>>>> f54e77d14a348e60512525fb4e67f2c1fbee1bcd

export default {
  props: {
    mode: String
  },
  components: {
    Day,
    DaySuite,
    Infinte
  },
  data(){
    return{
      game_mode : this.mode,
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<template>
<<<<<<< HEAD
  <div class="game_ctn">
      
      <!-- Add a loading indicator or any other content to show during API call -->
      <Day v-if="game_mode=='day'" />
      <DaySuite v-if="game_mode=='daysuite'" />
      <Infinte v-if="game_mode=='infinite'" />
  </div>
=======
    <div class="game_ctn">
        <Grid :mode="this.mode"/>
    </div>
>>>>>>> f54e77d14a348e60512525fb4e67f2c1fbee1bcd
</template>

<style>
.game_ctn{
  padding-top: 100px;
  margin: 0 auto;
}

.game_ctn h1{
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  margin: 0 auto;
}
</style>
