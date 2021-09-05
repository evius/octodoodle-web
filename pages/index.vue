<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :href="item.to"
          exact
          @click="$vuetify.goTo(`#${item.key}`, scrollOptions)"
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

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items v-show="!$vuetify.breakpoint.mobile">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          router
          @click="$vuetify.goTo(`#${item.key}`, scrollOptions)"
          >{{ item.navTitle ? item.navTitle : item.title }}</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-img
            aspect-ratio="1.7778"
            src="https://picsum.photos/id/11/1920/1080"
            style="min-height: calc(100vh - 100px)"
          >
            <v-container fill-height>
              <v-row justify="center" align="center">
                <v-col cols="12" sm="10" md="8">
                  <h1 class="grey--text text--darken-3 text-center col col-12">
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
          <v-col cols="12" sm="10" md="8">
            <div v-for="(item, i) in items" :key="i" :id="item.key">
              <div class="py-10"></div>
              <h1 class="text-center display-2 font-weight-bold mb-3">
                {{ item.title }}
              </h1>
              <v-divider class="mb-5" />
              <nuxt-content :document="content[item.key]" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer :absolute="false" app>
      <span>Made with ❤️ by the Cryptopi Crew Team</span>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-instagram</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-discord</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const content = await $content('index').fetch();
    return {
      content: Object.assign({}, ...content.map((x) => ({ [x.slug]: x }))),
    };
  },
  data() {
    return {
      drawer: false,
      isMobile: this.$vuetify.breakpoint.mdAndDown,
      items: [
        {
          icon: 'mdi-comment-text-outline',
          title: 'Introduction',
          navTitle: 'Intro',
          key: 'intro',
        },
        {
          icon: 'mdi-information',
          title: 'About Cryptopi',
          navTitle: 'About',
          key: 'about',
        },
        {
          icon: 'mdi-brush',
          title: 'Artists Trust',
          key: 'artists-trust',
        },
        {
          icon: 'mdi-wallet-membership',
          title: 'Member Benefits',
          navTitle: 'Membership',
          key: 'member-benefits',
        },
        {
          icon: 'mdi-ethereum',
          title: 'Specification',
          navTitle: 'Spec',
          key: 'specification',
        },
        {
          icon: 'mdi-key',
          title: 'Cryptopi Key Sale',
          navTitle: 'Key Sale',
          key: 'cryptopi-key-sale',
        },
        {
          icon: 'mdi-map',
          title: 'Roadmap',
          key: 'roadmap',
        },
        {
          icon: 'mdi-account-group',
          title: 'Team',
          key: 'team',
        },
      ],
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
