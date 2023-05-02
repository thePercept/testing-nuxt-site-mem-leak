<template>
  <div>
    <CBox class="image-carousel" tabindex="0" aria-label="Image carousel">
      <VueFlux
        :images="carouselData"
        ref="slider"
        :transitions="fluxTransitions"
        :options="fluxOptions"
      >
        <Pagination tabindex="0" slot="pagination"></Pagination>
        <template v-slot:controls>
          <flux-controls />
        </template>
      </VueFlux>
    </CBox>
  </div>
</template>

<script>
let VueFlux;
let Transitions;
let Pagination;
let Images;
let FluxControls;

if (process.browser) {
  const VF = require('vue-flux');
  //    console.log("FLUX-->",VF)
  VueFlux = VF.VueFlux;
  Transitions = VF.Transitions;
  Pagination = VF.FluxPagination;
  FluxControls = VF.FluxControls;
}

export default {
  name: 'imageCarousel',

  watch: {
    windowWidth(newWidth) {
      this.setCurrentWindowWidth(newWidth);

      // TODO : These breakpoints are still in test and are subject to change and will change depending on the final design--

      newWidth > 320 && newWidth < 576
        ? this.setWidthName('sm')
        : newWidth > 576 && newWidth < 768
        ? this.setWidthName('md')
        : newWidth > 768 && newWidth < 992
        ? this.setWidthName('lg')
        : newWidth > 992 && newWidth < 1200
        ? this.setWidthName('xl')
        : newWidth > newWidth > 1200 && newWidth < 3000
        ? this.setWidthName('xxl')
        : this.setWidthName('tv');
    },
    windowHeight(newHeight) {
      this.setCurrentWindowHeight(newHeight);
    },
  },

  props: {
    carouselData: Array,
  },
  methods: {},

  data() {
    return {
      widthName: 'md',

      items: [],

      imagesPresent: false,
      // beingPreviewed:false,
      calculatedStyle: 'height:calc(20vh + 25vw)',
      currentImg: 0,
      transitionName: 'slide-next',
      animated: true,
      imageSlideShowTimerStatus: true,

      fluxOptions: {
        autoplay: true,
        lazyLoad: true,
      },

      fluxTransitions: {
        transitionFade: Transitions.transitionFade,
        transitionBook: Transitions.transitionBook,
        transitionBlocks2: Transitions.transitionBlocks2,
      },
    };
  },

  computed: {},
  components: {
    VueFlux,
    //   FluxCaption,
    FluxControls,
    //   FluxIndex,
    Pagination,
    //   FluxPreloader,
  },

  beforeDestroy() {
    console.log('Before Destroy ... Image gallery');
    // clearInterval(this.timer)
  },
};
</script>

<style>
.image-carousel::before {
  content: '';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  z-index: 1;
}

.image-carousel {
  overflow-y: hidden;
  position: relative;
}

#image-ul {
  width: 100%;
}

.image-carousel ul {
  display: flex;
  position: relative;
  width: auto;
  left: 0;

  right: 0;
  overflow: hidden;
}

.image-carousel #image-ul > li {
  position: absolute;
  display: flex;
  width: 100%;
  /* height: calc(30rem + 8vh); */
  /* border:1px solid red; */
}
.card-img-set {
  width: 100%;
  height: inherit;
  object-fit: cover;
  position: absolute;
}

/* FADE IN */
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}

/* GO TO NEXT SLIDE */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 2s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREV SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 2s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

.carousel-actions {
  position: absolute;
  z-index: 22;
  height: calc(20vh + 25vw);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.prev,
.next {
  padding: 2rem;
  color: #0064c2;
  font-size: 1.5rem;
  cursor: pointer;
}

.prev:hover {
  outline: 1px solid rgba(243, 145, 34);
}
.next:hover {
  outline: 1px solid rgba(243, 145, 34);
}

.carousel-nav {
  height: 100%;
  /* position: absolute; */
  width: 100%;
  /* background: beige; */
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 33;
}

.carousel-nav ul {
  display: flex;
  width: auto;
  height: 6rem;
  justify-content: center;
}

.carousel-nav-outer {
  display: flex;
  width: 100% !important;
  justify-content: center;
  padding: 3px;
  cursor: pointer;
}

.carousel-nav-dots {
  height: 0.8rem;
  width: 0.8rem;
  background: #0064c2;
  border-radius: 150px;
  cursor: pointer;
}

.carousel-nav-dots:hover {
  outline: 1px solid rgba(243, 145, 34);
}

.carousel-nav .image-ul > li {
  border: none !important;
  padding: 2px;
  cursor: pointer;
}

#image-ul {
  position: absolute;
  display: block;
  overflow: hidden;
}

@media only screen and (min-width: 320px) and (max-width: 530px) {
  .image-carousel {
    height: calc(20vh + 10vw) !important;
  }

  .primary-section {
    padding-top: 1.5rem !important;
  }
}

@media only screen and (min-width: 531px) and (max-width: 576px) {
  .image-carousel {
    height: calc(28vh + 10vw) !important;
  }
  #image-ul {
    height: calc(28vh + 10vw) !important;
  }

  #image-ul > li {
    height: calc(28vh + 10vw) !important;
  }
  #image-ul > li > img {
    height: calc(28vh + 10vw) !important;
  }
}

@media only screen and (min-width: 300px) and (max-width: 576px) {
  header {
    height: 3.6rem;
    top: 0;
  }

  .image-carousel {
    height: calc(23vh + 10vw) !important;
  }

  #image-ul {
    height: calc(23vh + 10vw) !important;
  }

  #image-ul > li {
    height: calc(23vh + 10vw) !important;
  }
  #image-ul > li > img {
    height: calc(23vh + 10vw) !important;
  }

  .carousel-actions {
    height: calc(20vh + 10vw) !important;
  }
  .carousel-nav {
    height: calc(20vh + 10vw) !important;
  }
  .carousel-nav ul {
    height: 4rem;
  }

  .prev,
  .next {
    padding: 1rem 0;
  }
}

@media only screen and (min-width: 577px) and (max-width: 768px) {
  .carousel-actions {
    height: calc(53vh + 10vw) !important;
  }
  .carousel-nav {
    height: calc(53vh + 10vw) !important;
  }
  .carousel-nav ul {
    height: 4rem;
  }

  .image-carousel {
    height: calc(53vh + 10vw) !important;
  }

  #image-ul {
    height: calc(53vh + 10vw) !important;
  }

  #image-ul > li {
    height: calc(53vh + 10vw) !important;
  }
  #image-ul > li > img {
    height: calc(53vh + 10vw) !important;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .carousel-actions {
    height: calc(53vh + 10vw) !important;
  }
  .carousel-nav {
    height: calc(53vh + 10vw) !important;
  }
  .carousel-nav ul {
    height: 4rem;
  }

  .image-carousel {
    height: calc(53vh + 10vw) !important;
  }

  #image-ul {
    height: calc(53vh + 10vw) !important;
  }

  #image-ul > li {
    height: calc(53vh + 10vw) !important;
  }
  #image-ul > li > img {
    height: calc(53vh + 10vw) !important;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .carousel-actions {
    height: calc(53vh + 10vw) !important;
  }
  .carousel-nav {
    height: calc(53vh + 10vw) !important;
  }
  .carousel-nav ul {
    height: 4rem;
  }

  .image-carousel {
    height: calc(53vh + 10vw) !important;
  }

  #image-ul {
    height: calc(53vh + 10vw) !important;
  }

  #image-ul > li {
    height: calc(53vh + 10vw) !important;
  }
  #image-ul > li > img {
    height: calc(53vh + 10vw) !important;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 8000px) {
  .carousel-actions {
    height: calc(38vh + 10vw) !important;
  }
  .carousel-nav {
    height: calc(38vh + 10vw) !important;
  }
  .carousel-nav ul {
    height: 4rem;
  }

  .image-carousel {
    height: calc(38vh + 10vw) !important;
  }

  #image-ul {
    height: calc(38vh + 10vw) !important;
  }

  #image-ul > li {
    height: calc(38vh + 10vw) !important;
  }
  #image-ul > li > img {
    height: calc(38vh + 10vw) !important;
  }
}
</style>
