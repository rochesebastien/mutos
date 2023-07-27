<script>
import Button from '../components/Button.vue';
import Chrono from '../components/Chrono.vue';
export default {
  components: {
    Button,
    Chrono
  }
}

</script>

<template>
<div class="home_ctn">
    
    <div class="home_form">
        <Button :value="'Mot du jour'" :link="'/game/day'" />
        <Button :value="'Suite du jour'" :link="'/game/daysuite'" />
        <Button :value="'Mots infinis'" :link="'/game/infinite'" />
        <Button :value="'Paramètres'" :link="'/settings'" />
        <Button :value="'Règles du jeu'" :link="'/rules'" />
    </div>
</div>
</template>

<style>
.home_ctn{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.home_form{
    padding-top: 100px;
}

</style>
