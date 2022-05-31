<template>
  <div>
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
    <AppBar
      :menu="menu"
      v-on:nav-click="drawer = !drawer"
      v-on:tab-click="(slug) => $vuetify.goTo(`#${slug}`, scrollOptions)"
    />
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

      <v-row class="mt-5" justify="center" align="center">
        <v-btn
          color="primary"
          href="https://opensea.io/collection/octodoodles"
          target="_blank"
          >View on OpenSea</v-btn
        >
      </v-row>
      <v-row class="mt-8" justify="center" align="center">
        <div>
          Smart Contract:
          <a
            href="https://polygonscan.com/address/0x2fd7ecb85c2da1834293c62383c76311166a821f"
            target="_blank"
            >0x2fd7ecb85c2da1834293c62383c76311166a821f</a
          >
        </div>
      </v-row>

      <!--Buy Section-->
      <!-- <section :id="mintSpec.slug" class="pb-10">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            class="grey--text text--darken-4 text-body-1 mb-5 px-5"
          >
            <div :class="headerPadding"></div>
            <v-img
              class="mb-3"
              :src="mintSpec.titleImage"
              height="50"
              contain
            ></v-img>
            <v-divider class="mb-5" />
          </v-col>
        </v-row>
      </section> -->

      <!--Intro Section-->
      <section :id="introSpec.slug" class="pb-10">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            class="text-center grey--text text--darken-4 text-body-1 px-5"
          >
            <div :class="headerPadding"></div>
            <v-img
              class="mb-3"
              :src="introSpec.titleImage"
              height="50"
              contain
            ></v-img>
            <v-divider class="mb-5" />
            <v-row class="mt-2" align="center">
              <v-col xs="12" sm="12" md="8">
                <nuxt-content :document="sections[introSpec.content]" />
              </v-col>
              <v-col xs="12" sm="12" md="4">
                <v-card elevation="20" rounded="xl">
                  <v-img src="/images/octodoodles.gif" />
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>

      <!-- <img
        src="/images/rocket.png"
        class="rocket"
        :style="`top: ${3000 - offsetTop}px; right: ${offsetTop - 800}px`"
      /> -->

      <!--Artists Trust Section-->
      <section :id="artistsTrustSpec.slug">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            class="grey--text text--darken-4 text-body-1 mb-5 px-5"
          >
            <div :class="headerPadding"></div>
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

      <section>
        <v-card elevation="20">
          <v-img
            src="/images/octodoodles/tile_1.jpg"
            min-height="150px"
            :position="`-${offsetTop - 1600}px 0px`"
          />
        </v-card>
      </section>

      <!--Buy Section-->
      <!-- <section :id="mintSpec.slug" class="pb-10">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            class="grey--text text--darken-4 text-body-1 mb-5 px-5"
          >
            <div :class="headerPadding"></div>
            <v-img
              class="mb-3"
              :src="mintSpec.titleImage"
              height="50"
              contain
            ></v-img>
            <v-divider class="mb-5" />
          </v-col>
        </v-row>
      </section> -->

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
            <div :class="headerPadding"></div>
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
            <div :class="headerPadding"></div>
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
  </div>
</template>

<script>
import { Web3Helper, ContractState } from '../utils/Web3Helper';

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
      headerPadding: 'py-5',
    };
  },
  methods: {
    onScroll(e) {
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
    mintSpec() {
      return this.menu.find((m) => m.slug === 'mint');
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
  async mounted() {
    // this.web3 = new Web3Helper();
    // this.contractState = await this.web3.getContractState();
  },
  head() {
    const title = 'Octodoodles';
    const description =
      'Octodoodles is an NFT collection of 9001 beautiful, fun and artful "doodles" on the Ethereum Blockchain.';
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'nft nftart art ethereum digitalart cryptoart nftcollector crypto nftcommunity nftartists blockchain openseanft nftdrop cryptoinvester cryptoworld collectibles cryptocurrency nftcollection artwork octopus digital artist nfts digital art erc721 crypto investment art nftartgallery raredigitalart opensea eth',
        },
        { hid: 'og:type', name: 'og:type', content: 'article' },
        { hid: 'og:title', name: 'og:title', content: 'Octodoodles' },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://octodoodles.com/images/banner.jpg',
        },
      ],
    };
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
