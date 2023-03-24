<script setup>

defineProps({
    letter: String,
    type: String,
  });
</script>

<template>
    <div class="cell">
        <p>{{ letter }}</p>     
    </div>
</template>


<style scoped>

p{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    background: #E95838;
}
</style>