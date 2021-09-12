<template>
  <v-app dark :style="{ background: $vuetify.theme.themes['dark'].background }">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :href="item.to"
          exact
          @click="$vuetify.goTo(`#${item.slug}`, scrollOptions)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-show="$vuetify.breakpoint.mobile"
      />
      <v-avatar class="mr-4" size="48">
        <v-img src="/profile.jpg" />
      </v-avatar>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items v-show="!$vuetify.breakpoint.mobile">
        <v-btn
          v-for="(item, i) in menu"
          :key="i"
          router
          @click="$vuetify.goTo(`#${item.slug}`, scrollOptions)"
          >{{ item.navTitle ? item.navTitle : item.title }}</v-btn
        >
      </v-toolbar-items>
      <v-btn color="secondary">Members</v-btn>
    </v-app-bar>
    <v-main>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-img
            aspect-ratio="1.7778"
            src="/banner.jpg"
            style="min-height: calc(100vh - 100px)"
          >
            <v-container fill-height>
              <v-row justify="center" align="center">
                <v-col cols="12" sm="10" md="8">
                  <h1 class="white--text text--darken-3 text-center col col-12">
                    <span class="font-weight-light display-2">
                      Welcome To
                    </span>
                    <br />
                    <span class="font-weight-black display-4">
                      Cryptopi Crew
                    </span>
                  </h1>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="12" justify="center" align="center">
                  <v-btn large color="primary">Buy CryptoPi</v-btn>
                </v-col>
                <v-col cols="12" justify="center" align="center">
                  <v-btn
                    fab
                    outlined
                    rounded
                    class="align-self-end"
                    @click="$vuetify.goTo(`#about`, scrollOptions)"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-col>
      </v-row>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="10">
            <div v-for="(item, i) in menu" :key="i" :id="item.slug">
              <div class="py-10"></div>
              <h1 class="text-center display-2 font-weight-bold mb-3">
                {{ item.title }}
              </h1>
              <v-divider class="mb-5" />
              <nuxt-content
                v-if="item.content"
                :document="sections[item.content]"
              />
              <Roadmap :roadmap="roadmap" v-if="item.component === 'Roadmap'" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer :absolute="false" app>
      <span>Made with ❤️ by the Cryptopi Crew Team</span>
      <v-spacer />
      <v-btn icon href="https://twitter.com/CryptopiCrew" target="_blank">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>

      <v-btn
        icon
        href="https://www.instagram.com/cryptopicrew/"
        target="_blank"
      >
        <v-icon>mdi-instagram</v-icon>
      </v-btn>

      <v-btn icon href="http://discord.gg/mW6pNkR4zs" target="_blank">
        <v-icon>mdi-discord</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const sections = await $content('index/sections').fetch();
    const menu = await $content('index/menu').fetch();
    const roadmap = await $content('index/roadmap').fetch();

    return {
      menu,
      roadmap,
      sections: Object.assign({}, ...sections.map((x) => ({ [x.slug]: x }))),
    };
  },
  data() {
    return {
      drawer: false,
      isMobile: this.$vuetify.breakpoint.mdAndDown,
      title: 'Cryptopi Crew',
    };
  },
  computed: {
    scrollOptions() {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
      };
    },
  },
  methods: {},
};
</script>
