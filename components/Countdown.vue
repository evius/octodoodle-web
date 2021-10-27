<template>
  <div class="d-flex justify-center mb-7">
    <div
      class="d-flex align-center"
      v-for="(time, index) in timeLeft"
      :key="index"
    >
      <v-sheet
        rounded
        elevation="10"
        :width="$vuetify.breakpoint.mobile ? 65 : 75"
        :class="$vuetify.breakpoint.mobile ? 'pa-1' : 'pa-2'"
        color="secondary"
      >
        <h1>
          {{ time }}
        </h1>
      </v-sheet>
      <h1
        :class="$vuetify.breakpoint.mobile ? 'mx-1' : 'mx-3'"
        v-if="index < timeLeft.length - 1"
      >
        :
      </h1>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const Props = Vue.extend({
  props: {
    countDownDate: Object,
  },
});

@Component
export default class Countdown extends Props {
  now = new Date().getTime();
  countDownTimer: NodeJS.Timer | null = null;

  get timeLeft() {
    const countDownDate = (<Date>this.countDownDate).getTime();
    const timeLeft = countDownDate - this.now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft < 0) {
      if (this.countDownTimer) {
        clearInterval(this.countDownTimer);
      }
    }

    return [days, hours, minutes, seconds];
  }

  mounted() {
    this.countDownTimer = setInterval(() => {
      this.now = new Date().getTime();
    }, 1000);
  }
}
</script>
