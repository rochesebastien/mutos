<script setup>
import Button from '../components/Button.vue';
</script>

<template>
<div class="home_ctn">
    <div class="home_form">
        <Button :value="'Mot du jour'" :link="'/game'"></Button>
        <Button :value="'Suite du jour'" :link="'/game'"></Button>
        <Button :value="'Mots infinis'" :link="'/game'"></Button>
        <Button :value="'Paramètres'" :link="'/settings'"></Button>
        <Button :value="'Règles du jeu'" :link="'/rules'"></Button>
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

/* .form_btn{
    width: 300px;
    display: flex;
    justify-content: center;
    height: 55px;
    margin-top:20px;
    height:70px;
}

.btn{
    text-decoration: none;
    background-color: #fff;
    font-family: 'Montserrat', sans-serif;
    border-radius: 8px;
    color: black;
    box-shadow: 0 9px black;
    margin-bottom: 20px;
    width: 300px;
    height:60px;
    transition: 0.1s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn:hover{
    color: #F1F1F1;
    background: #E95838;
    box-shadow: 0 4px #323031;
    margin-top:5px
} */

</style>
