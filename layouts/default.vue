<template>
  <div>
    <LoadSpinner v-if="showHideSpinner" />
    <CThemeProvider>
      <CColorModeProvider>
        <CBox font-family="body" as="main">
          <CReset />
          <siteHeader />
          <nuxt />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox,
  CText,
  CIconButton,
  CIcon,
  CDivider,
  CImage,
  CHeading,
  CPseudoBox,
} from '@chakra-ui/vue';

import siteHeader from '../components/siteHeader.vue';

import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',

  head() {
    return {
      title: 'AN Corp PVT Ltd',

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200&display=swap',
        },
      ],
    };
  },
  beforeCreate() {
    this.showHideSpinner = true;
  },

  mounted() {
    this.showHideSpinner = false;
    //
    this.setInnerWidth(window.innerWidth);
    this.setInnerHeight(window.innerHeight);

    this.onResize();

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);

      // alert("here")
    });
  },

  computed: {
    ...mapState({
      innerWidth: 'innerWidth',
      innerHeight: 'innerHeight',
      widthName: 'widthName',
    }),
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  data() {
    return {
      showHideSpinner: true,
    };
  },

  methods: {
    onResize() {
      this.setInnerWidth(window.innerWidth);
      this.setInnerHeight(window.innerHeight);

      let newWidth = window.innerWidth;

      // TODO : These breakpoints are still in test and are subject to change and will change depending on the final design--
      // alert(newWidth)
      newWidth > 320 && newWidth < 576
        ? this.setWidthName('sm')
        : newWidth > 576 && newWidth < 768
        ? this.setWidthName('md')
        : newWidth > 768 && newWidth < 992
        ? this.setWidthName('lg')
        : newWidth > 992 && newWidth < 1200
        ? this.setWidthName('xl')
        : newWidth > 1200 && newWidth < 3000
        ? this.setWidthName('xxl')
        : this.setWidthName('tv');

      // this.windowHeight = window.innerHeight;
      // this.windowWidth = window.innerWidth;
    },

    ...mapActions({
      setInnerWidth: 'setInnerWidth',
      setInnerHeight: 'setInnerHeight',
      setWidthName: 'setWidthName',
    }),
  },

  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    CText,
    siteHeader,
    CIconButton,
    CIcon,
    CDivider,
    CImage,
    CHeading,
    CPseudoBox,
  },
};
</script>
<style>
html,
h1,
h2,
h3,
h4,
p {
  font-family: 'Montserrat', sans-serif !important;
}
body {
  background-color: #f4f4f4;
}
#__nuxt {
  overflow-y: hidden;
}

.home-enter-active,
.home-leave-active {
  transition: opacity 0.5s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}

.view-all-link {
  text-decoration: underline;
}
</style>
