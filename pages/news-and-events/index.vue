<template>
  <c-box>
    <c-box class="container">
      <c-box class="simplecard-ui">
        <c-box class="card-body pd-1" v-bind="mainStylesTwo[colorMode]">
          <c-box class="page-breadcrumb-container plr-4">
            <c-box> </c-box>
          </c-box>

          <c-box
            class="page-heading-container plr-4"
            v-bind="mainStylesTwo[colorMode]"
          >
            <c-box>
              <h3 class="mpw-preview-h2 mt-1 mb-1" style="display: inline-flex">
                News & Events
              </h3>
            </c-box>
          </c-box>

          <c-box
            class="pd-t-2 pd-b-2 plr-4 detail-view"
            id=""
            v-bind="mainStyles[colorMode]"
          >
            <vue-good-table
              :columns="this.columns"
              :rows="rows.results"
              class="datatable-cls"
              :theme="colorMode == 'light' ? 'polar-bear' : 'nocturnal'"
              :key="new Date().getMilliseconds()"
              :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: `PLACEHOLDER`,
              }"
            >
              <c-box slot="emptystate">
                <p style="text-align: center" v-if="!getFetchingDataFromServer">
                  No Data To Show
                </p>
                <c-box class="loading-table" v-if="getFetchingDataFromServer">
                  <c-box
                    class="loading-table-row fetching-table-data-p-container"
                  >
                    <p>Fetching from Server</p>
                  </c-box>

                  <c-box class="loading-table-row">
                    <c-box class="line line-left loading-shimmer"></c-box>
                    <c-box class="line line-mid loading-shimmer"></c-box>
                    <c-box class="line line-right loading-shimmer"></c-box>
                  </c-box>

                  <c-box class="loading-table-row">
                    <c-box class="line line-left loading-shimmer"></c-box>
                    <c-box class="line line-mid loading-shimmer"></c-box>
                    <c-box class="line line-right loading-shimmer"></c-box>
                  </c-box>
                </c-box>
              </c-box>

              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'sr_no'">
                  {{ props.row.originalIndex + 1 }}
                </span>

                <span v-if="props.column.field == 'content_title'">
                  <c-text
                    d="inherit"
                    class="item-p"
                    pr="2rem"
                    pt="1rem"
                    pb="1rem"
                    ><c-box
                      as="nuxt-link"
                      :to="'/news-and-events/' + props.row.slug"
                      class="download-link"
                    >
                      {{ props.row.content_title_hi }}
                    </c-box>
                  </c-text>

                  <c-badge
                    pt="3px"
                    mx="2"
                    variant="solid"
                    variant-color="red"
                    v-if="props.row.new_status === 'is_new'"
                    >NEW</c-badge
                  >
                </span>

                <span v-if="props.column.field == 'status'">
                  {{
                    props.row.new_status == 'is_new'
                      ? 'ACTIVE'
                      : props.row.new_status == 'is_active'
                      ? 'ACTIVE'
                      : 'INACTIVE'
                  }}
                </span>

                <span v-if="props.column.field == 'published_on'">
                  {{ dateTime(props.row.created_at) }}
                </span>
              </template>
            </vue-good-table>
          </c-box>
        </c-box>
      </c-box>
    </c-box>
  </c-box>
</template>
<script>
import moment from 'moment';
import 'moment/locale/hi';

import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'news-and-events-list',

  inject: ['$chakraColorMode', '$toggleColorMode'],
  computed: {
    getFetchingDataFromServer() {
      return false;
    },
    rows() {
      return {
        count: 3,
        next: null,
        previous: null,
        results: [
          {
            content_id: 'dbc243f5-0c4b-4561-b3c6-b27d504c3104',
            created_at: '2023-04-27 13:11:56.594677+0530',
            entry_type: 'newsevents',
            content_title:
              '4 of the hardest unsolved problems in philosophy — and some possible solutions',
            content_title_hi:
              'दर्शनशास्त्र में सबसे कठिन अनसुलझी समस्याओं में से 4 - और कुछ संभावित समाधान',
            slug: '4-of-the-hardest-unsolved-problems-in-philosophy-and-some-possible-solutions',
            content:
              'Philosophy has come a long way since Thales argued the universe was made of water. Philosophers have produced new ideas that enrich the world around us, give us a better understanding of the universe we live in, and help us find the good life. However, philosophy is often more about the questions and methods than the answers — and in some cases, old problems remain unanswered.\n\nHere, we look at four unsolved problems in philosophy and for each we ask these questions: Why is the problem so difficult? And why are the proposed solutions so unsatisfying?\nThe hard problem of consciousness\n\nThe hard problem of consciousness asks why any physical state creates conscious mental states at all. While we can understand physical systems very well, the hard problem goes further than merely asking “how” questions: “Why is the performance of these functions accompanied by experience?” For example, we can understand how our bodies physically feel pain, but why those physical reactions create the personal, subjective experience we call pain is unsolved.\n\n    Not all philosophers are ready to accept that chairs can have experiences.\n\nWhile variations of this problem go back centuries in European, Indian, and Chinese philosophy, the current version of the problem (quoted above) was written by Australian philosopher David Chalmers in 1995. Several theories have been put forth or dusted off as possible solutions. None of them have proven decisive. \n\n“Weak reductionists” argue that consciousness is a phenomenon that cannot be broken down into more basic, non-conscious parts but that it can also be identified with physical activity if science backs it up. In other words, if a physical event causes brain states that reliably cause mental states to happen, then it can be argued that the brain state and the mental state are the same thing. While it has a certain simplicity, this solution avoids the problem of why (physical) brain states differ from all other physical states, in that they directly cause mental states. \n\nSome philosophers have argued for panpsychism, the idea that everything is at least a little conscious. If this view is correct, then all matter has consciousness or the potential for consciousness as an inherent part of being matter. The “why” in the problem becomes less concerning after that. However, the idea that everything is at least capable of consciousness is an unintuitive one, and not all philosophers are ready to accept that chairs can have experiences.\n\nThen there is the so-called “mysterian” proposition, that the problem is currently unsolvable and is perhaps permanently so for human beings. Philosopher Colin McGinn argues for the permanently unsolvable stance, holding that our minds are not built to answer the question. Thomas Nagel is more optimistic, arguing that science might get to a point where it could address the problem.',
            content_hi:
              'थेल्स के इस तर्क के बाद से कि ब्रह्मांड पानी से बना है, दर्शनशास्त्र ने एक लंबा सफर तय किया है। दार्शनिकों ने नए विचार उत्पन्न किए हैं जो हमारे आसपास की दुनिया को समृद्ध करते हैं, हमें उस ब्रह्मांड की बेहतर समझ देते हैं जिसमें हम रहते हैं, और हमें अच्छा जीवन खोजने में मदद करते हैं। क्या इन कार्यों का प्रदर्शन अनुभव के साथ है?" उदाहरण के लिए, हम समझ सकते हैं कि हमारे शरीर शारीरिक रूप से दर्द कैसे महसूस करते हैं, लेकिन उन शारीरिक प्रतिक्रियाओं से व्यक्तिगत, व्यक्तिपरक अनुभव क्यों होता है जिसे हम दर्द कहते हैं, यह अनसुलझा है।',
            primary_attachment_pdf: 'http://47.243.235.25/api/sample-doc',
            primary_attachment_url: null,
            primary_attachment_label: 'Download Document',
            primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
            new_status: 'is_new',
          },
          {
            content_id: '4ed43f4b-04f2-4ea6-b68b-e79a2caf708f',
            created_at: '2023-04-27 13:06:27.831445+0530',
            entry_type: 'newsevents',
            content_title: 'Russia-Ukraine war: List of key events, day 428',
            content_title_hi:
              'रूस-यूक्रेन युद्ध: प्रमुख घटनाओं की सूची, दिन 428',
            slug: 'russia-ukraine-war-list-of-key-events-day-428',
            content:
              'Ukrainian President Volodymyr Zelenskyy held an hour-long call with Chinese President Xi Jinping. The two discussed “possible cooperation to reach a fair and sustainable peace deal for Ukraine” and Zelenskyy stressed there can be “no peace at the expense of territorial compromises”.',
            content_hi:
              'यूक्रेनी राष्ट्रपति वलोडिमिर ज़ेलेंस्की ने चीनी राष्ट्रपति शी जिनपिंग के साथ एक घंटे तक बातचीत की। दोनों ने "यूक्रेन के लिए एक निष्पक्ष और स्थायी शांति समझौते तक पहुंचने के लिए संभावित सहयोग" पर चर्चा की और ज़ेलेंस्की ने जोर देकर कहा कि "क्षेत्रीय समझौते की कीमत पर कोई शांति नहीं हो सकती"।',
            primary_attachment_pdf: 'http://47.243.235.25/api/sample-doc',
            primary_attachment_url: null,
            primary_attachment_label: 'Download Document',
            primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
            new_status: 'is_new',
          },
          {
            content_id: '977728f0-c248-4237-8b21-65817958cf22',
            created_at: '2023-04-27 13:05:31.706272+0530',
            entry_type: 'newsevents',
            content_title:
              'Why the conflict in Sudan is worrying its neighbours',
            content_title_hi:
              'सूडान में संघर्ष अपने पड़ोसियों को क्यों चिंतित कर रहा है?',
            slug: 'why-the-conflict-in-sudan-is-worrying-its-neighbours',
            content:
              'Five of Sudan’s seven neighbours – Ethiopia, Chad, the Central African Republic, Libya and South Sudan – have faced political upheaval or conflict themselves in recent years.\n\nThe fighting that erupted between the army and paramilitary Rapid Support Forces (RSF) on Saturday in Khartoum has derailed an internationally backed plan for a transition to civilian rule after the 2019 removal of Omar al-Bashir.\n\nThe conflict pits General Abdel Fattah al-Burhan, the head of Sudan’s ruling council and commander of its army, against the wealthy, one-time militia leader General Mohamed Hamdan Dagalo, better known as Hemedti, who is Burhan’s deputy on the council and leader of the irregular RSF forces.',
            content_hi:
              'सूडान के सात पड़ोसियों में से पांच - इथियोपिया, चाड, मध्य अफ्रीकी गणराज्य, लीबिया और दक्षिण सूडान - ने हाल के वर्षों में स्वयं राजनीतिक उथल-पुथल या संघर्ष का सामना किया है।\n\nखार्तूम में शनिवार को सेना और अर्धसैनिक रैपिड सपोर्ट फोर्सेज (RSF) के बीच शुरू हुई लड़ाई ने उमर अल-बशीर को 2019 में हटाने के बाद नागरिक शासन में संक्रमण के लिए अंतरराष्ट्रीय स्तर पर समर्थित योजना को पटरी से उतार दिया है।\n\nसूडान की सत्तारूढ़ परिषद के प्रमुख और उसकी सेना के कमांडर जनरल अब्देल फतह अल-बुरहान, धनी, एक समय के मिलिशिया नेता जनरल मोहम्मद हमदान दगालो के खिलाफ हैं, जिन्हें हेमेदती के नाम से जाना जाता है, जो परिषद और नेता में बुरहान के डिप्टी हैं। अनियमित RSF बलों की।',
            primary_attachment_pdf: 'http://47.243.235.25/api/sample-doc',
            primary_attachment_url: null,
            primary_attachment_label: 'Download Document',
            primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
            new_status: 'is_new',
          },
        ],
      };
    },

    toggleColorMode() {
      return this.$toggleColorMode;
    },

    colorMode() {
      return this.$chakraColorMode();
    },
  },
  mounted() {
    //
    window.scrollTo(0, 0);
  },

  methods: {
    dateTime(value) {
      let x = '';
      this.$i18n.locale == 'hi'
        ? (x = moment(value).format('LLLL'))
        : (x = this.$moment(value).format('LLLL'));
      return x;
    },
  },
  components: {
    'vue-good-table': VueGoodTable,
  },

  data() {
    return {
      selected: '',
      mainStyles: {
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
      },
      mainStylesTwo: {
        dark: {
          bg: 'gray.600',
          color: 'white',
        },
        light: {
          bg: '#f4f4f4',
          color: 'gray.900',
        },
      },

      currentDate: new Date(),
      yearsArray: [],

      columns: [
        {
          label: '#',
          field: 'sr_no',
        },

        {
          label: 'Headline',
          label_hi: 'मुख्य बातें',
          field: 'content_title',
          field_hi: 'content_title_hi',
        },

        {
          label: 'News/Event Status',
          label_hi: 'समाचार / घटना की स्थिति',
          field: 'status',
        },

        {
          label: 'Published On',
          label_hi: 'पर प्रकाशित',
          field: 'published_on',
        },
      ],

      // rows: [ ],
    };
  },

  // async asyncData({ $config: { ROOT_URL }, $axios, error, params }) {
  //   return $axios
  //     .get(ROOT_URL + `/getnewsevent`)
  //     .then((response) => {
  //       //

  //       return {
  //         getFetchingDataFromServer: false,
  //         rows: response.data.results,
  //       };
  //     })
  //     .catch((e) => {
  //       error({
  //         statusCode: e.response.status,
  //       });
  //     });
  // },

  head() {
    return {
      title: 'News & Events',
      meta: [
        {
          hid: 'og-title',
          property: 'og:title',
          content: 'News & Events',
        },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: 'News & Events published on AN Corp website',
        },
        // other meta
      ],
    };
  },
};
</script>

<style>
.vgt-global-search__input {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.vgt-global-search__input input {
  height: 2.5rem;
}

.item-p {
  font-weight: 401;
}
</style>
