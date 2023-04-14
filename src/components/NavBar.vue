<script setup>


</script>

<template>
    <nav class="navbar">
        <router-link to="/">
            <img id="NavLogo" src="/Logo.svg" alt="" srcset="">
        </router-link> 
    </nav>
</template>



<style scoped>
nav{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 130px;
   position: absolute;
   top: 80px;
}

#NavLogo{
    width: 300px;
}
</style>