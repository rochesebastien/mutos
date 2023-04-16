
<script>
export default {
  data() {
    return {
      time: 0,
      intervalId: null,
      isRunning: false,
    };
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
    <div>
      <h2>{{ formatTime }}</h2>
      <button @click="start" v-if="!isRunning">Start</button>
      <button @click="stop" v-if="isRunning">Stop</button>
      <button @click="reset" v-if="!isRunning">Reset</button>
    </div>
  </template>
  
 <style>
 /* Create a class for a button */

</style>