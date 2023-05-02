const myIcons = {
  increaseFontSize: {
    path: `
              <path fill="currentColor" d="M 24.984375 1.9863281 A 1.0001 1.0001 0 0 0 24 3 L 24 6 L 21 6 A 1.0001 1.0001 0 1 0 21 8 L 24 8 L 24 11 A 1.0001 1.0001 0 1 0 26 11 L 26 8 L 29 8 A 1.0001 1.0001 0 1 0 29 6 L 26 6 L 26 3 A 1.0001 1.0001 0 0 0 24.984375 1.9863281 z M 14.369141 4.0019531 A 1.50015 1.50015 0 0 0 13.054688 4.9492188 L 5.5332031 24 L 5 24 A 1.0001 1.0001 0 1 0 5 26 L 9 26 A 1.0001 1.0001 0 1 0 9 24 L 8.7578125 24 L 10.339844 19.990234 A 1.0001 1.0001 0 0 0 10.5 20 L 19.347656 20 L 21.152344 24 L 21 24 A 1.0001 1.0001 0 1 0 21 26 L 25 26 A 1.0001 1.0001 0 1 0 25 24 L 24.445312 24 L 15.816406 4.8828125 A 1.50015 1.50015 0 0 0 14.369141 4.0019531 z M 14.541016 9.3515625 L 18.445312 18 L 11.126953 18 L 14.541016 9.3515625 z"></path>
          `,

    viewBox: '0 0 30 30',
  },
  siteMap: {
    path: `
      <path fill="currentColor" d="M40.875,28.344v8.375c0,0.828-0.674,1.5-1.5,1.5H31c-0.828,0-1.5-0.672-1.5-1.5v-8.375c0-0.828,0.672-1.5,1.5-1.5h2.188
  v-4.438h-11.25v4.438h2.688c0.828,0,1.5,0.672,1.5,1.5v8.375c0,0.828-0.672,1.5-1.5,1.5H16.25c-0.828,0-1.5-0.672-1.5-1.5v-8.375
  c0-0.828,0.672-1.5,1.5-1.5h2.687v-4.438H7.687v4.438h2.188c0.827,0,1.5,0.672,1.5,1.5v8.375c0,0.828-0.673,1.5-1.5,1.5H1.5
  c-0.828,0-1.5-0.672-1.5-1.5v-8.375c0-0.828,0.672-1.5,1.5-1.5h3.188v-5.938c0-0.826,0.672-1.5,1.5-1.5h12.75v-5.375H16.25
  c-0.828,0-1.5-0.672-1.5-1.5V4.156c0-0.827,0.672-1.5,1.5-1.5h8.375c0.828,0,1.5,0.673,1.5,1.5v8.375c0,0.828-0.672,1.5-1.5,1.5
  h-2.688v5.375h12.75c0.826,0,1.5,0.674,1.5,1.5v5.938h3.188C40.201,26.844,40.875,27.516,40.875,28.344z"/>            
      
      `,
    viewBox: '0 0 40.875 40.875',
  },
  callIcon: {
    path: `
      <path fill="currentColor" d="M127 833 c-12 -12 -7 -126 8 -193 44 -185 188 -368 355 -448 103 -50 201 -74 284 -70 l61 3 3 99 c1 55 -1 103 -6 108 -4 4 -39 12 -78 18 -38 5 -81 12 -96 16 -23 5 -35 -2 -81 -45 l-54 -51 -45 30 c-58 38 -140 120 -178 178 l-30 45 51 54 c43 46 50 58 45 81 -4 15 -11 58 -16 95 -5 38 -12 72 -15 78 -7 10 -198 13 -208 2z"
      `,
    viewBox: '0 0 30 30',
  },
};

export default {
  // components: true,

  server: {
    port: 3000,
    // host: '0'
  },

  ssr: true,

  // Added to decrease page size, load time -- experiments
  optimization: {
    splitChunks: {
      maxSize: 300000,
    },
  },

  modules: ['@chakra-ui/nuxt', '@nuxtjs/emotion'],

  chakra: {
    icons: {
      // ...
      extend: {
        ...myIcons,
      },
    },
  },

  // target: 'static',
  crawler: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'website_sourcecode',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        size: '192x192',
        type: 'image/png',
        href: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        size: '512x512',
        type: 'image/png',
        href: '/android-chrome-512x512.png',
      },
    ],
  },

  publicRuntimeConfig: {
    // ROOT_URL:
    //   process.env.NODE_ENV === 'production'
    //     ? 'http://47.243.235.25/api'
    //     : 'http://47.243.235.25/api',
  },
  privateRuntimeConfig: {},

  image: {
    // Options
  },

  router: {
    middleware: 'scrollBehavior',
    // prefetchLinks: false
  },

  loading: {
    color: '#DC0000',
    height: '3px',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/customThemes.js', ssr: true },
    { src: '@/plugins/colorModeToggler.js', ssr: true },

    // { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/node_modules/vue-flux', ssr: false },

    '~/plugins/jsonld',
  ],
  // serverMiddleware: [
  //   '~/serverMiddleware/rateLimiter.js'
  // ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/image'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    hostname: 'https://ancorp.com',
    gzip: true,
    exclude: ['/loading'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    vendor: ['vue-flux'],
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true,
      },
    },

    filenames: {},

    publicPath: '/ancorp/',
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en-US.json',
      },
      {
        code: 'hi',
        name: 'हिंदी',
        file: 'hi-IN.json',
      },
    ],
    lazy: true,
    langDir: 'lang/',

    vueI18n: {},
  },
};
