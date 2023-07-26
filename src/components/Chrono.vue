
<script>
export default {
  data() {
    return {
      time: 0,
      intervalId: null,
      isRunning: false,
    };
  },
  created() {
    this.start()
  },
  computed: {
    formatTime() {
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
  },
  
  methods: {
    start() {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.time++;
      }, 1000);
    },
    stop() {
      this.isRunning = false;
      clearInterval(this.intervalId);
    },
    reset() {
      this.isRunning = false;
      clearInterval(this.intervalId);
      this.time = 0;
    },
  },
  mounted(){
    this.start();
  }
};
</script>

<template>
<<<<<<< HEAD
    <div class="chrono">
      <h2>Votre temps : <span>{{ formatTime }}</span></h2>
      <!-- <button @click="start" v-if="!isRunning">Start</button>
      <button @click="stop" v-if="isRunning">Stop</button>
      <button @click="reset" v-if="!isRunning">Reset</button> -->
=======
    <div>
      
      <h2 class="chrono"><span>Temps écoulé : </span>{{ formatTime }}</h2>
      <button @click="start" v-if="!isRunning">Start</button>
      <!-- <button @click="stop" v-if="isRunning">Stop</button> -->
      <button @click="reset" v-if="!isRunning">Reset</button>
>>>>>>> f54e77d14a348e60512525fb4e67f2c1fbee1bcd
    </div>
  </template>
  
 <style scoped>
<<<<<<< HEAD
 .chrono {
  margin-top: 0.7rem;
 }
 .chrono h2{
  font-family: 'Montserrat', sans-serif;
 }
 .chrono h2 > span{
  color: #E95838;
 }
=======
.chrono {
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  background: #F1F1F1;
  width: 300px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-radius: 8px;
}

span{
  margin-right: 10px;
  color: #DB3A34;
}
>>>>>>> f54e77d14a348e60512525fb4e67f2c1fbee1bcd

</style>