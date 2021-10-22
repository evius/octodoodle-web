<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="20" class="text-center pa-5">
          <div v-if="saleState === SaleState.Pending">
            <h2>Pre-sale starting on:</h2>
            <h4 class="mb-5">{{ formattedPreSaleStartDate }} UTC</h4>
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
            <div class="body1 mb-3">
              Jion our Discord server, follow us on social media or add it to
              your calendar to get a reminder.
            </div>
            <v-btn
              color="primary ma-2"
              href="http://discord.gg/mW6pNkR4zs"
              target="_blank"
            >
              <v-icon left>mdi-discord </v-icon>
              Join Discord</v-btn
            >
            <v-btn color="primary ma-2" @click="downloadICS">
              <v-icon left>mdi-calendar</v-icon>
              Add to Calendar</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { parseISO, format } from 'date-fns';
import icsFormatter from '../utils/icsFormatter';

enum SaleState {
  Pending,
  PreSaleOpen,
  SaleOpen,
  Paused,
  Closed,
}

@Component
export default class saleSate extends Vue {
  saleState: SaleState | null = SaleState.Pending;
  SaleState = SaleState;
  preSaleStartDate = parseISO('2021-10-31T18:00:00');
  now = new Date().getTime();
  countDownTimer: NodeJS.Timer | null = null;

  get formattedPreSaleStartDate() {
    return format(this.preSaleStartDate, 'dd MMMM yyyy HH:mm');
  }

  get timeLeft() {
    const countDownDate = this.preSaleStartDate.getTime();
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

  downloadICS() {
    const calEntry = icsFormatter();

    if (!calEntry) {
      return;
    }

    const title = 'Octodoodles Pre-sale Launch';
    var place = 'https://octodoodles.com';
    var begin = this.preSaleStartDate;
    var end = new Date(begin.getTime() + 30 * 60000);

    var description =
      'Hey doodler! Octodoodles pre-sale starts. The first 2000 Octodoodle tokens can be minted for 0.04 ETH. Join Discord or see website for more details. Thanks for the interest and hope you enjoy your Octodoodle(s)!';

    calEntry.addEvent(
      title,
      description,
      place,
      begin.toUTCString(),
      end.toUTCString()
    );
    calEntry.download('Octodoodle_Presale', 'ics');
  }

  mounted() {
    this.countDownTimer = setInterval(() => {
      this.now = new Date().getTime();
    }, 1000);
  }
}
</script>
<style lang="scss">
.mint {
  display: flex;
  justify-content: center;
}
</style>
