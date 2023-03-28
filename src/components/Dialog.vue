<script setup>
defineProps({
  error_msg:String,
})
</script>

<template>
    <div class="dialog_ctn">
        <div class="dialog">
            {{ error_msg }}
        </div>
    </div>
</template>


<style scoped>

.dialog_ctn{
    position: fixed;
    width: 100vw;
    z-index: 1;
    display: flex;
    justify-content: center;
    /* margin-top: 200px; */
    align-items: center;
    top: 30px;
    opacity: 0;
    transition: 0.1s ease-in;
    transform: translateY(0px);
}
.dialog{
    background-color: #e958388a;
    text-align: center;
    padding: 20px 10px;
    min-width: 500px;
    border-radius: 8px;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.33);
    font-family: 'Montserrat', sans-serif;

}

.dialog_see{
    transform: translateY(10px);
    opacity: 1;
}
</style>