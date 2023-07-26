<script setup>

</script>

<template>
    <div class="error_ctn">
        <h1> 
        <span class="txt">ERREUR</span>
        <span class="orange">4</span>
        <span class="red">0</span>
        <span class="orange">4</span>
      </h1>

      <p>Mot trouvé : <b>Erreur</b></p>
      <p>Nombre de lettres : <b>404</b></p>

      <p style="line-height: 115%;">Définition : La page que vous essayez d'atteindre n'<b>existe pas</b> encore, attendez la prochaine édition du Larousse 👩🏻‍🦰</p>
    </div>
</template>

<style scoped>

.error_ctn{
  padding-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
p{
  width: 70%;
  font-family: 'Montserrat', sans-serif;
}
h1{
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-size: 6rem;
  display: flex;
  width: 70%;
}
b{
  color: #E95838;
  font-variant: normal;
}

.txt{
  margin-right: 15px;
}
.orange{
  padding: 0px 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
  animation: OrangeChange infinite 9s ease-in-out;
}
.red{
  padding: 0px 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: RedChange infinite 4s ease-in-out;
}

@keyframes OrangeChange {
  0%{
    background:#DB3A34;
    border-radius: 107px;
  }
  50%{
    background:#E95838;
    border-radius: 8px;
  }
  100%{
    background:#DB3A34;
    border-radius: 107px;
  }
}

@keyframes RedChange {
  0%{
    background:#E95838;
    border-radius: 8px;
  }
  50%{
    background:#DB3A34;
    border-radius: 107px;
  }
  100%{
    background:#E95838;
    border-radius: 8px;
  }
}
</style>
