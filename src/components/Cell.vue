<script setup>

defineProps({
    letter: String,
    type: String,
  });
  
</script>

<template>
    <div class="cell_val">
        {{ letter ? letter : '' }}
    </div>
</template>


<style scoped>

/* .cell_val{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    background: #E95838;
} */
</style>