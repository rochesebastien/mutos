<script setup>

defineProps({
    letter: String,
    type: String,
  });  
</script>

<template>
    <div class="cell_val">
        {{        letter ? letter : ''       }}
    </div>
</template>


<style scoped>
</style>