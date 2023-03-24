<script >
export default {
  props: {
    title: String,
    message: String
  },
  created() {
    console.log('Props passées :', this.title, this.message);
  }
}
</script>

<template>
    <div class="cell_val">
        {{ letter ? letter : '.' }}
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