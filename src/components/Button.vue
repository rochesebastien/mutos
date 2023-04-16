<script setup>
defineProps({
    value: String,
    link: String,
  }); 
  
</script>

<template>
    <div v-if="link" class="form_btn">
            <router-link :to="link" class="btn">{{ value }}</router-link>
        </div>
    <div v-else class="form_btn">
            <button class="btn">{{ value }}</button>
    </div>
</template>


<style scoped>
.form_btn{
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
    border: none;
}

.btn:hover{
    color: #F1F1F1;
    background: #E95838;
    box-shadow: 0 4px #323031;
    margin-top:5px
}
</style>