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
<<<<<<< HEAD
        <Button :value="'Mot du jour'" :link="'/day'" />
        <Button :value="'Suite du jour'" :link="'/daysuite'" />
        <Button :value="'Mots infinis'" :link="'/infinite'" />
=======
        <Button :value="'Mot du jour'" :link="'/game/day'" />
        <Button :value="'Suite du jour'" :link="'/game/suite'" />
        <Button :value="'Mots infinis'" :link="'/game/infinite'" />
>>>>>>> f54e77d14a348e60512525fb4e67f2c1fbee1bcd
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
