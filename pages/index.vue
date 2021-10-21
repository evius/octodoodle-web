<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" app temporary>
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
    </v-navigation-drawer> -->
    <v-app-bar>
      <!-- <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-show="$vuetify.breakpoint.mobile"
      /> -->
      <v-toolbar-title>
        <v-img src="/images/logo.png" height="50" max-width="210" />
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
      <template v-slot:extension>
        <v-tabs>
          <v-tab
            v-for="(item, i) in menu"
            :key="i"
            router
            @click="$vuetify.goTo(`#${item.slug}`, scrollOptions)"
            >{{ item.navTitle ? item.navTitle : item.title }}</v-tab
          >
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main v-scroll="onScroll" class="grey lighten-4">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-img
            aspect-ratio="1.7778"
            src="/images/banner.jpg"
            style="min-height: calc(100vh - 100px)"
          >
          </v-img>
        </v-col>
      </v-row>

      <!--Intro Section-->
      <section :id="introSpec.slug" class="pb-10">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            class="text-center grey--text text--darken-4 text-h6 px-5"
          >
            <div class="py-10"></div>
            <v-img
              class="mb-3"
              :src="introSpec.titleImage"
              height="50"
              contain
            ></v-img>
            <v-divider class="mb-5" />
            <nuxt-content :document="sections[introSpec.content]" />
          </v-col>
        </v-row>
      </section>

      <!-- <img
        src="/images/rocket.png"
        class="rocket"
        :style="`top: ${3000 - offsetTop}px; right: ${offsetTop - 800}px`"
      /> -->

      <section>
        <v-card elevation="20">
          <v-img
            src="/images/octodoodles/tile_1.jpg"
            min-height="150px"
            :position="`-${offsetTop - 400}px 0px`"
          />
        </v-card>
      </section>

      <!--Artists Trust Section-->
      <section :id="artistsTrustSpec.slug" class="pb-10">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            class="grey--text text--darken-4 text-body-1 mb-5 px-5"
          >
            <div class="py-10"></div>
            <v-img
              class="mb-3"
              :src="artistsTrustSpec.titleImage"
              height="50"
              contain
            ></v-img>
            <v-divider class="mb-5" />
            <nuxt-content
              :document="sections[artistsTrustSpec.content]"
              class="black--text"
            />
          </v-col>
        </v-row>
      </section>

      <!--Roadmap Section-->
      <section :id="roadmapSpec.slug" class="doodle-background pb-10">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            md="10"
            class="
              text-center
              grey--text
              text--darken-4 text-body-1
              mb-5
              pl-5
              pr-10
            "
          >
            <div class="py-10"></div>
            <v-img
              class="mb-3"
              :src="roadmapSpec.titleImage"
              height="50"
              contain
            ></v-img>
            <v-divider class="mb-5" />
            <Roadmap :roadmap="roadmap" />
          </v-col>
        </v-row>
      </section>

      <!--Team Section-->
      <section :id="teamSpec.slug" class="pb-10">
        <v-row justify="center">
          <v-col
            sm="10"
            md="8"
            lg="6"
            class="grey--text text--darken-4 text-body-1 mb-5"
          >
            <div class="py-10"></div>
            <v-img
              class="mb-3"
              :src="teamSpec.titleImage"
              height="50"
              contain
            ></v-img>
            <v-divider class="mb-5" />
            <Team :members="team" />
          </v-col>
        </v-row>
      </section>
    </v-main>
    <v-footer>
      <span>Made with ❤️ by the Octodoodles Team</span>
      <v-spacer />
      <a href="https://www.freepik.com/vectors/cartoon"
        >Cartoon vector created by rawpixel.com - www.freepik.com</a
      >
    </v-footer>
  </v-app>
</template>

<script>
const sortRoadMap = (a, b) => {
  if (a.rank > b.rank) {
    return 1;
  }
  if (a.rank < b.rank) {
    return -1;
  }
  return 0;
};
export default {
  async asyncData({ $content }) {
    const sections = await $content('index/sections').fetch();
    const menu = await $content('index/menu').fetch();
    const roadmap = (await $content('index/roadmap').fetch()).sort(sortRoadMap);
    const team = await $content('index/team').fetch();

    return {
      menu,
      roadmap,
      team,
      sections: Object.assign({}, ...sections.map((x) => ({ [x.slug]: x }))),
    };
  },
  data() {
    return {
      drawer: false,
      isMobile: this.$vuetify.breakpoint.mdAndDown,
      title: 'Octodoodles',
      offsetTop: 0,
    };
  },
  methods: {
    onScroll(e) {
      console.info(e);
      this.offsetTop = e.target.scrollingElement.scrollTop;
    },
  },
  computed: {
    introSpec() {
      return this.menu.find((m) => m.slug === 'intro');
    },
    artistsTrustSpec() {
      return this.menu.find((m) => m.slug === 'artists-trust');
    },
    roadmapSpec() {
      return this.menu.find((m) => m.slug === 'roadmap');
    },
    teamSpec() {
      return this.menu.find((m) => m.slug === 'team');
    },
    scrollOptions() {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
      };
    },
  },
};
</script>
<style scoped>
.doodle-background {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/images/doodle-background.jpg') no-repeat center center fixed !important;
  background-size: cover;
}

.rocket {
  width: 75px;
  position: absolute;
  right: 20px;
  z-index: 0;
}
</style>
