export const state = () => ({
  productionMode: true,
  rootUrl: '',
  persistedState: null,

  home_data: [],
  latest_updates: [],
  carousel_items: [],
  letter_circulars: [],
  tenders: [],
  news_event_item: [],
  esteemed_authorities: [],
  about_AnCorp: [],
  AnCorp_contact_details: [],
  projects: [],

  galleryData: [],

  innerWidth: 0,
  innerHeight: 0,
  widthName: 'md',
});

export const actions = {
  async nuxtServerInit({ commit }) {
    //
    // console.dir(this.state)
    this.state.productionMode == true
      ? commit('changeRootUrl', 'http://47.243.235.25/api/')
      : commit('changeRootUrl', 'http://47.243.235.25/api/');

    // const data  = await this.$axios.get(this.state.rootUrl+'/api/home/')

    // commit('changeLatestUpdates',data.data.latest_updates)
    // commit('changeCarouselItem',data.data.carousel_items)
    // commit('changeTenders',data.data.tenders)
    // commit('changeNewsAndEvents',data.data.news_event_item)
    // commit('changeEsteemedAuthorities',data.data.esteemed_authorities)
    // commit('changeAboutAnCorp',data.data.about_AnCorp)
    // commit('changeAnCorpContactDetails',data.data.AnCorp_contact_details)
    // commit('changeProjects',data.data.projects)
    // commit('changeLetterAndCircular',data.data.letter_circulars)
  },
  setPersisitingData({ commit }, data) {
    commit('changePersistedstate', data);
  },

  setWidthName({ commit }, status) {
    commit('changeWidthName', status);
  },

  setLatestUpdates({ commit }, arrayOfData) {
    commit('changeLatestUpdates', arrayOfData);
  },
  setCarouselItem({ commit }, arrayOfData) {
    commit('changeCarouselItem', arrayOfData);
  },
  setLetterAndCircular({ commit }, arrayOfData) {
    commit('changeLetterAndCircular', arrayOfData);
  },
  setTenders({ commit }, arrayOfData) {
    commit('changeTenders', arrayOfData);
  },
  setNewsAndEvents({ commit }, arrayOfData) {
    commit('changeNewsAndEvents', arrayOfData);
  },
  setEsteemedAuthorities({ commit }, arrayOfData) {
    commit('changeEsteemedAuthorities', arrayOfData);
  },
  setAboutAnCorp({ commit }, arrayOfData) {
    commit('changeAboutAnCorp', arrayOfData);
  },
  setAnCorpContactDetails({ commit }, arrayOfData) {
    commit('changeAnCorpContactDetails', arrayOfData);
  },
  setProjects({ commit }, arrayOfData) {
    commit('changeProjects', arrayOfData);
  },
  setInnerWidth({ commit }, value) {
    commit('changeInnerWidth', value);
  },
  setInnerHeight({ commit }, value) {
    commit('changeInnerHeight', value);
  },

  setGalleryData({ commit }, value) {
    commit('changeGalleryData', value);
  },
};

export const mutations = {
  changePersistedstate(state, data) {
    state.persistedState = data;
  },

  changeLatestUpdates(state, arrayOfData) {
    state.latest_updates = arrayOfData;
  },
  changeCarouselItem(state, arrayOfData) {
    state.carousel_item = arrayOfData;
  },
  changeLetterAndCircular(state, arrayOfData) {
    state.letter_circulars = arrayOfData;
  },
  changeTenders(state, arrayOfData) {
    state.tenders = arrayOfData;
  },
  changeNewsAndEvents(state, arrayOfData) {
    state.news_event_item = arrayOfData;
  },
  changeEsteemedAuthorities(state, arrayOfData) {
    state.esteemed_authorities = arrayOfData;
  },
  changeAboutAnCorp(state, arrayOfData) {
    state.about_AnCorp = arrayOfData;
  },
  changeAnCorpContactDetails(state, arrayOfData) {
    state.AnCorp_contact_details = arrayOfData;
  },
  changeProjects(state, arrayOfData) {
    state.projects = arrayOfData;
  },
  changeInnerWidth(state, value) {
    state.innerWidth = value;
  },
  changeInnerHeight(state, value) {
    state.innerHeight = value;
  },

  changeGalleryData(state, value) {
    state.galleryData = value;
  },

  changeRootUrl(state, value) {
    state.rootUrl = value;
  },

  changeWidthName(state, widthName) {
    state.widthName = widthName;
  },
};

export const getters = {
  isProductionMode: (state) => state.productionMode,
  getRootUrl: (state) => state.rootUrl,

  getLatesUpdates: (state) => state.latest_updates,
  getCarousel: (state) => state.carousel_item,
  getLetterAndCirculars: (state) => state.letter_circulars,
  getTenders: (state) => state.tenders,
  getNewsAndEvents: (state) => state.news_event_item,
  getEsteemedAuthorities: (state) => state.esteemed_authorities,
  getAboutAnCorp: (state) => state.about_AnCorp,
  getAnCorpContactDetails: (state) => state.AnCorp_contact_details,
  getProjects: (state) => state.projects,

  getPersistedData: (state) => state.persistedState,
};
