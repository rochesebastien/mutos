<script>
import Button from '../components/Button.vue';

export default {
  components: {
    Button
  }
}

</script>

<template>
  <div class="rules_ctn">

    <p>Bienvenue sur   <b>Mutos</b>, la version en ligne de Motus (ou Wordle en anglais). Le but est simple, vous avez un mot et vous devez le <b>trouver</b> !</p>
    <p>Pour y arriver, vous devez écrire n’importe quel mot <b>existant</b>, qui comporte le   <b>même nombre de lettre</b>, et <b>qui commence par la même lettre</b> dans une grille. Le jeu vous donnera alors des <b>indices</b> pour accélérer le jeu : </p>

    
    <p>🔴 : Cette lettre <b>est un dans le mot</b>, mais elle <b>n’est pas à la même position</b>.</p>
    <p>🟧 : Cette lettre est dans le mot et <b>à la même position</b>. </p>
    <p>ℹ️ : La lettre  <b>n’est pas dans le mot</b>.</p>

    <p>⚠️ Mais attention, votre nombre d’essaie est <b>limité</b>, si vous n’avez pas trouvé le mot à la fin de la grille, vous avez <b>perdu</b> la partie …</p>
    <Button :value="`C'est compris !`" :link="'/'"></Button>
  </div>
</template>

<style scoped>
.rules_ctn{
  width: 80%;
  margin-top: 100px;
  background: rgba(255, 230, 218, 0.777);
  border: 1px solid #E95838;
  padding: 50px;
  border-radius: 8px;
}
p{
  width: 100%;
  margin: 10px auto;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
}

b{
  color: #E95838;
}

a{
  margin: 0 auto;
}
</style>
