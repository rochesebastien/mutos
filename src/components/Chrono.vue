
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
};
</script>

<template>
    <div class="chrono">
      <h2>Votre temps : <span>{{ formatTime }}</span></h2>
      <!-- <button @click="start" v-if="!isRunning">Start</button>
      <button @click="stop" v-if="isRunning">Stop</button>
      <button @click="reset" v-if="!isRunning">Reset</button> -->
    </div>
  </template>
  
 <style scoped>
 .chrono {
  margin-top: 0.7rem;
 }
 .chrono h2{
  font-family: 'Montserrat', sans-serif;
 }
 .chrono h2 > span{
  color: #E95838;
 }

</style>