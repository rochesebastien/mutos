<script>
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

</script>

<template>
    <div class="game_ctn">
        <Grid :mode="this.mode"/>
    </div>
</template>

<style>
.game_ctn{
  padding-top: 100px;
}
</style>
