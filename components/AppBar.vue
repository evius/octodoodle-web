<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      @click="navIconClick"
      v-show="$vuetify.breakpoint.mobile && !isMintPage"
    />
    <v-toolbar-title class="pl-0">
      <a href="/">
        <v-img src="/images/logo.png" height="50" max-width="210" />
      </a>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon href="https://twitter.com/octo_doodles" target="_blank">
      <v-icon>mdi-twitter</v-icon>
    </v-btn>

    <v-btn icon href="https://www.instagram.com/octo.doodle/" target="_blank">
      <v-icon>mdi-instagram</v-icon>
    </v-btn>

    <v-btn icon href="http://discord.gg/mW6pNkR4zs" target="_blank">
      <v-icon>mdi-discord</v-icon>
    </v-btn>
    <template v-slot:extension v-if="!$vuetify.breakpoint.mobile || isMintPage">
      <v-tabs v-if="!isMintPage">
        <v-tab
          v-for="(item, i) in menu"
          :key="i"
          router
          @click="tabClick(item.slug)"
          >{{ item.navTitle ? item.navTitle : item.title }}</v-tab
        >
      </v-tabs>
      <v-spacer />
    </template>
  </v-app-bar>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['menu', 'isMintPage', 'isConnected'],
  methods: {
    navIconClick() {
      this.$emit('nav-click');
    },
    tabClick(slug: string) {
      this.$emit('tab-click', slug);
    },
    connect() {
      this.$emit('connect');
    },
  },
});
</script>
