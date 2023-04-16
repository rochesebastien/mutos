<script>
import Button from '../components/Button.vue';
export default {
  components: {
    Button,
  }
}
</script>

<template>
  <h1> Pas encore de Paramètres</h1>
  <Button :value="`C'est compris !`" :link="'/'"></Button>

</template>

<style scoped>
h1{
  font-family: 'Montserrat', sans-serif;

}
</style>
