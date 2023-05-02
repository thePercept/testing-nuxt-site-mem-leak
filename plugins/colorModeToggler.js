export default ({ app }) => {
  app.mixins = app.mixins || [];

  app.mixins.push({
    computed: {
      colorMode() {
        return this.$chakraColorMode();
      },
      mainStyles() {
        return {
          dark: {
            bg: 'gray.700',
            color: 'white',
            viewAllLinkColor: 'white',
            downloadLinkColor: 'white',
            smallTextColor: '#52FF94',
          },
          light: {
            bg: 'white',
            color: 'gray.900',
            viewAllLinkColor: '#C5283D',
            downloadLinkColor: '#100072',
            smallTextColor: '#C5283D',
          },
        };
      },
      mainStylesTwo() {
        return {
          dark: {
            bg: 'gray.600',
            color: 'white',
          },
          light: {
            bg: '#f4f4f4',
            color: 'gray.900',
          },
        };
      },
    },
    methods: {
      toggleColorMode() {
        this.$toggleColorMode();
      },
    },
  });
};
