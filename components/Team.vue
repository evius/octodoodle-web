<template>
  <div>
    <v-row v-for="(row, i) of rows" :key="i" justify="center">
      <v-col xs="12" sm="6" v-for="(member, i) of row" :key="i">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="member.image"></v-img>

          <v-card-title> {{ member.slug }} </v-card-title>

          <v-card-subtitle> {{ member.role }} </v-card-subtitle>

          <v-card-text>
            <div class="text-overline">Likes/Dislikes</div>
            <div class="d-flex align-center">
              <v-btn text icon color="blue lighten-2">
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              <div class="text-subtitle-2">{{ member.likes }}</div>
            </div>

            <div class="d-flex align-center">
              <v-btn text icon color="red lighten-2">
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
              <div class="text-subtitle-2">{{ member.dislikes }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    members: Array,
  },
  methods: {
    firstRowMembers(): Array<any> {
      return (<any>this).members.filter(
        (m: any) => (<any>this).members.indexOf(m) < 2
      );
    },
    secondRowMembers(): Array<any> {
      return (<any>this).members.filter(
        (m: any) => (<any>this).members.indexOf(m) >= 2
      );
    },
  },
  computed: {
    rows() {
      return [(<any>this).firstRowMembers(), (<any>this).secondRowMembers()];
    },
  },
});
</script>
