<template>
  <div class="" id="mq-holder" ref="mqHolder">
    <CBox>
      <CBox
        class="marquee-container marquee-container-entry"
        ref="marqueeContainerRef"
        @click="marqueeClick"
        key="just-a-key"
      >
        <CBox>
          <CBox
            as="p"
            ref="latestNewRef"
            class="latest-news-appear view-all-link"
            ><nuxt-link :to="'/latest-updates/'"
              ><CBox as="p" class="view-all-link" aria-label="Latest Updates"
                >Latest Update</CBox
              ></nuxt-link
            ></CBox
          >
        </CBox>
      </CBox>

      <CPseudoBox
        class="marquee-bg"
        @mouseenter="paused = !paused"
        @mouseleave="paused = false"
        tabindex="0"
        aria-label="All the latest updates published on the website. This portion is a maqrquee with links scrolling horizontally inside it. Press Tab to get inside it. "
        bg="gray.100"
        pt="1rem"
        pb="1rem"
        minH="1rem"
        h="4rem"
        d="flex"
        align-items="center"
      >
        <marqueeText :duration="150" :paused="paused">
          <CBox
            as="nuxt-link"
            :to="getUrlFromRowData(item)"
            v-for="item in latestUpdates"
            :key="item.content_id"
          >
            <CBox as="p" class="mq">
              {{ item['content_title'] }}
            </CBox>
          </CBox>
        </marqueeText>
      </CPseudoBox>
    </CBox>
  </div>
</template>

<script>
import { CBox, CPseudoBox } from '@chakra-ui/vue';

export default {
  name: 'newsTickrComponent',

  props: {
    latestUpdates: Array,
    finalHeaderHeight: String,
  },
  data() {
    return {
      showHeader: false,
    };
  },

  methods: {
    marqueeClick() {
      this.$refs.marqueeContainerRef.$el.classList.toggle(
        'marquee-container-entry'
      );
      this.$refs.marqueeContainerRef.$el.classList.toggle(
        'marquee-container-exit'
      );

      this.$refs.latestNewRef.$el.classList.toggle('latest-news-appear');
      this.$refs.latestNewRef.$el.classList.toggle('latest-news-reverse');
    },

    getUrlFromRowData(data) {
      // ("newsevents","News & Events"),
      // ("letterscirculars","Letters & Circulars"),
      // ("tender","Tender"),
      // ("eprocurement","E-Procurement"),
      // ("erp","ERP"),
      // ("ratecontract","Rate Contract"),
      // ("projects","Projects"),
      // ("services","Services"),
      // ("gallery","Gallery"),
      // ("others","Others"),

      if (data['update_type'] == 'newsevents') {
        // return this.localePath('/news-and-events/'+data['main_content_slug'])
      }
      if (data['update_type'] == 'letterscirculars') {
        // return this.localePath('/letters-and-circulars/'+data['main_content_slug'])
      }
      if (data['update_type'] == 'tender') {
        // return this.localePath('/tenders/current-tenders/'+data['main_content_slug'])
      }
      if (data['update_type'] == 'eprocurement') {
        // return this.localePath('/procurement/eprocurement/'+data['main_content_slug'])
      }
      if (data['update_type'] == 'ratecontract') {
        // return this.localePath('/procurement/rate-contract/'+data['main_content_slug'])
      }
      if (data['update_type'] == 'projects') {
        // return this.localePath('/projects/'+data['main_content_slug'])
      }
      if (data['update_type'] == 'services') {
        // return this.localePath('/services/'+data['main_content_slug'])
      }
    },
  },

  data() {
    return {
      paused: false,
      finalHeaderHT: '',

      items: [],

      mqClass: 'marquee-container ',
    };
  },
  watch: {
    items(newData, oldData) {
      this.$emit('itemsEmitted', newData);
      //
    },
  },

  mounted() {},
  components: {
    marqueeText: () => {
      if (process.client) {
        return import('vue-marquee-text-component');
      }
    },

    CBox,
    CPseudoBox,
  },

  async fetch() {
    //
    // const data = await this.$axios.get(

    // this.$store.getters.isProductionMode == true ? `https://mypoweredweb.com/api/gettickr/?ps=4` : `http://localhost:8000/api/gettickr/?ps=4`
    // );
    // //
    // this.items = data.data.results;
    this.items = {
      count: 15,
      next: null,
      previous: null,
      results: [
        {
          url: 'https://mypoweredweb.com/media/carousel/abc-1.webp',
          option_info: '',
          content_id: 'e2847f5d-7269-4b73-b8f1-488ec229aaa3',
          content:
            'Covid 19 Alert: पटना में कोरोना डेडिकेटेड अस्पताल शुरू, 80 बेड के इस सेंटर पर मिलेगी ये सुविधाएं पटना सिटी के कंगन घाट स्थित पर्यटक सूचना केंद्र में कोरोना डेडिकेटेड अस्पताल खोला गया है. पटना सिटी के कंगन घाट स्थित पर्यटक सूचना केंद्र में कोरोना डेडिकेटेड अस्पताल खोला गया है. Patna Covid Hospital: पटना जिला प्रशासन द्वारा पटना सिटी के कंगन घाट स्थित पर्यटक सूचना केंद्र में कोरोना डेडिकेटेड अस्पताल (Corona dedicated hospital) खोला गया है. अत्याधुनिक सुविधाओं से लैस यह अस्पताल फिलहाल 80 बेड का बनाया गया है. आवश्यकता पड़ने पर इसे 200 बेड का अस्पताल बनाया जाएगा. अधिक पढ़ें ...      News18 Bihar     Last Updated : January 16, 2022, 10:30 IST      reported by :मनोज सिन्हा     edited by :Vineeta Mandal   संबंधित खबरें      Omicron से पीड़ित व्यक्ति 24 घंटे के अंदर फैलाने लगता है कोरोना, ये है वजह      Omicron से पीड़ित व्यक्ति 24 घंटे के अंदर फैलाने लगता है कोरोना, ये है वजह     कोरोना के बढ़ते मामलों के बीच भारत की R Value में कमी, जानें क्या है इसका मतलब      कोरोना के बढ़ते मामलों के बीच भारत की R Value में कमी, जानें क्या है इसका मतलब     बीजिंग में ओमिक्रॉन की दस्तक, क्या विंटर ओलंपिक पर पड़ेगा असर?      बीजिंग में ओमिक्रॉन की दस्तक, क्या विंटर ओलंपिक पर पड़ेगा असर?     1 साल 157 करोड़ डोज और दो वैक्सीन, देश में अब तक ऐसा रहा कोरोना टीकाकरण का सफर      1 साल 157 करोड़ डोज और दो वैक्सीन, देश में अब तक ऐसा रहा कोरोना टीकाकरण का सफर   पटना. कोरोना (Coronavirus) के बढ़ते संक्रमण को देखते हुए जिला प्रशासन द्वारा पटना सिटी के कंगन घाट स्थित पर्यटक सूचना केंद्र में कोरोना डेडिकेटेड अस्पताल (Corona dedicated hospital) खोला गया है. अत्याधुनिक सुविधाओं से लैस यह अस्पताल फिलहाल 80 बेड का बनाया गया है.आवश्यकता पड़ने पर इसे 200 बेड का अस्पताल बनाया जाएगा',
          new_status: 'is_new',
          created_at: '2022-01-12T19:11:56.148592+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/004_0zg5G74.jpg',
          option_info: '',
          content_id: 'd1f0a34c-7d7a-4aad-b85b-b0b49006703e',
          content:
            'Corona Cases In Delhi: 13 जनवरी को रिकॉर्ड केस आने के बाद आज लगातार तीसरे दिन राष्ट्रीय राजधानी में कोरोना के दैनिक मामलों में कमी देखी गई. स्वास्थ्य विभाग की तरफ से रात के करीब साढ़े 9 बजे जारी आंकड़ों के मुताबिक, पिछले 24 घंटे में कोरोना के 18,286 मामलों की पुष्टि हुई है और 28 मरीजों की जान चली गई. इतने ही समय में 65621 नमूनों की जांच की गई. विभाग ने बताया कि शहर में संक्रमण दर 27.87 फीसदी है और 89819 मरीजों का इलाज चल रहा है.  दिल्ली में शनिवार (15 जनवरी) को 67624 नमूनों की जांच की गई थी और 20718 मामले आए थे. शुक्रवार (14 जनवरी) को 79578 नमूनों की जांच की गई थी और 24383 मामले आए थे. वहीं गुरुवार को 98832 नमूनों की जांच की गई थी. इसमें से 28,867 लोग संक्रमित पाए गए थे जो महामारी शुरू होने के बाद से अबतक एक दिन में संक्रमण के आने वाले मामलों की सबसे अधिक संख्या थी.  दिल्ली के स्वास्थ्य मंत्री सत्येंद्र जैन ने कोविड-19 की कम जांच की चिंताओं को दूर करने की कोशिश के तहत दावा किया कि यहां पर आईसीएमआर की सिफारिश से तीन गुना अधिक नमूनों की जांच की जा रही है. उन्होंने कहा कि जिनकी जांच करने की जरूरत है उनकी जांच की जा रही है.',
          new_status: 'is_new',
          created_at: '2022-01-12T19:11:56.148592+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/002_bIPzMG0.jpg',
          option_info: '',
          content_id: '0ab1c999-40ac-4a6f-b246-9df6bc0eb266',
          content:
            'COVID 19 Cases In Delhi: दिल्ली में कल के मुकाबले कोरोना के नए मामलों में आई कमी, 18286 केस की हुई पुष्टि',
          new_status: 'is_new',
          created_at: '2022-01-12T19:11:56.148592+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/001_AQ2faaW.jpeg',
          option_info: '',
          content_id: 'd54ed1b6-4ff0-4f37-afc8-fd754e78adfb',
          content:
            'ओमिक्रॉन के बढ़ते मामलों के बीच भारत की R Value गिरकर 2.2 हुई, जानें क्या है इसका मतलब',
          new_status: 'is_new',
          created_at: '2022-01-12T19:11:56.148592+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/letter_circulars/LNC.pdf',
          option_info: '',
          content_id: '1fbd467e-4f5e-4a7b-904c-009c3a60d52c',
          content:
            'COVID-19 की रोकथाम हेतु जिला स्तर पर Dedicated COVID Healthcare Centre(DCHC) के बेड की संख्या वृद्धि करने के संबंध में ।',
          new_status: 'is_new',
          created_at: '2022-01-19T11:08:36.583828+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/forms/Order_No-7274_Dated-21-01-2022-Working.pdf',
          option_info: '',
          content_id: '05ae74bf-3453-45a4-95ad-741f91e54f2f',
          content: 'Order No 7223 dated 21.01.2022',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/Screenshot_from_2022-05-14_13-09-12.png',
          option_info: '',
          content_id: '754c2c17-31ba-4dbe-92d6-864a9aabd7c3',
          content: '',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/impinfo/LNC.pdf',
          option_info: '',
          content_id: 'e5756ac8-bde3-46ea-a0d2-6bfc7a04b904',
          content:
            'How ambitious are Russia’s foreign policy objectives, and how much force does Moscow believe it must employ to achieve them? Moscow has submitted various ultimatums, but the most critical and pressing issue is that the Kremlin now regards Ukraine as a permanently hostile country continuing to increase its defense capabilities. Russian hopes for improved relations with President Volodymyr Zelensky were dashed in 2021, and Moscow is now focused on reducing the long-term security risk posed by Ukraine, including halting its expanding defense cooperation with NATO. However, this is one of the most unrealistic and difficult demands for NATO to satisfy, particularly because Ukraine is developing long-range missiles domestically. This diplomatic impasse suggests a significant risk of a Russian military escalation in Ukraine with few obvious offramps',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/notification/00000-Letter_No-9796_Dated_30.03.2020.pdf',
          option_info: '',
          content_id: '655d142f-4432-480e-b2a5-41e43ed89ae5',
          content:
            'कोरोना वायरस (कोविड-19) के मद्देनजर समुचित प्रबंधन हेतु सभी जिला अस्पताल एवं अनुमंडलीय अस्पताल में संपूर्ण चिकित्सा व्यवस्था के साथ-साथ आइसोलेशन फैसिलिटी/वार्ड पूर्णत: क्रियाशील करने के संबंध में - letter no. 9796',
          new_status: 'is_new',
          created_at: '2022-01-19T11:08:36.583828+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com',
          option_info: '',
          content_id: '1a588b8f-9d47-4f86-882c-f654aaa487b1',
          content: 'Hey Abhishek',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/Screenshot_from_2022-05-14_12-16-54.png',
          option_info: '',
          content_id: '7ff9eb66-5758-47ea-a8ed-281404fc4963',
          content: '',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/Screenshot_from_2022-05-11_00-31-59.png',
          option_info: '',
          content_id: '8e73020f-a1bd-4042-a42d-2fcc8aa0368b',
          content: '',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/Screenshot_from_2022-05-09_22-41-05.png',
          option_info: '',
          content_id: '6bcae6c9-8a37-49b0-af13-50787b9ad929',
          content: '',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/Screenshot_from_2022-05-09_03-13-06.png',
          option_info: '',
          content_id: '552e7d7b-494b-4939-b9b3-faa5380bc1cc',
          content: '',
          new_status: 'is_new',
          created_at: '2022-01-17T14:23:22.579170+05:30',
          updated_at: null,
        },
        {
          url: 'https://mypoweredweb.com/media/carousel/2018-07-05_1.png',
          option_info: '',
          content_id: '68fc9b62-e7c7-47fb-8a5d-bf6e266e0277',
          content: '',
          new_status: 'is_new',
          created_at: '2022-01-19T11:08:36.583828+05:30',
          updated_at: null,
        },
      ],
    };
  },
};
</script>

<style>
/* .marquee-text-content{
  height: 2rem;
  display: flex;
  align-items: center;    
} */
header {
  position: inherit !important;
}

.marquee-text-text a:nth-child(1) {
  margin-left: 40rem !important;
}

.tb-border-tickr {
  border-bottom: 1px solid #cfcfcf;
}

.marquee-container {
  display: flex;
  align-items: center;
  padding-left: 4rem;
  padding-right: 1rem;
  position: absolute;
  background-color: #c5283d;
  z-index: 222;
  height: 4rem;
}

.marquee-bg a::before {
  width: 6rem;
  display: inline-block;
  height: 1rem;
  border-radius: 1rem;
}
.marquee-bg a::after {
  content: '';
}
.marquee-bg a:hover p {
  text-decoration: underline;
}
.marquee-bg a {
  text-decoration: none;
  color: #100072;
  padding-left: 2.8rem;
  padding-right: 2.8rem;
}
.marquee-bg a:active {
  color: #100072;
}
.marquee-bg a:visited {
  color: #100072;
}

.marquee-container p {
  /* font-family: Roboto; */
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  color: white;
  /* padding: 0.5rem; */
}

.marquee-bg {
  background-color: #ebebeb;
}

.tickr-item-action {
  width: 1.5rem;
  height: 1.5rem;
}

.tickr-item-container {
  display: flex;
  justify-content: center;
}

.mq {
  display: inline-block;
  padding-bottom: 0 !important;
}
.mq::before {
  content: attr(content_type);
  display: inline-block;
  background-color: #00d58f;
  border-radius: 1rem;
  padding: 0.2rem 1.8rem;
  font-size: 0.8rem;
  color: #100072;
  font-weight: 520;
}

@media only screen and (min-width: 320px) and (max-width: 530px) {
  header {
    height: auto !important;
  }

  .marquee-container {
    padding-left: 2rem;
  }

  .tb-border-tickr {
    margin-top: calc(5.4rem + 2vw);
  }
}

@media only screen and (min-width: 531px) and (max-width: 1011px) {
  header {
    height: auto !important;
  }

  .marquee-container {
    padding-left: 2rem;
  }

  .tb-border-tickr {
    padding-top: calc(9.1rem + 2vw);
  }
}

@media only screen and (min-width: 1012px) and (max-width: 1082px) {
  .tb-border-tickr {
    padding-top: calc(12.7rem + 2vw);
  }
}

@media only screen and (min-width: 1083px) and (max-width: 1220px) {
  .tb-border-tickr {
    padding-top: calc(12.6em + 2vw);
  }
}

@media only screen and (min-width: 300px) and (max-width: 576px) {
  header {
    z-index: 999990999;
    position: absolute;
  }

  .latest-news-appear {
    /* animation: disappear-animate 2s ease-in 1 forwards; */
  }

  .latest-news-reverse {
    /* animation: appear-animate 2s ease-in 1 backwards; */
  }

  .marquee-container {
    padding-left: unset;
    padding-right: unset;
    width: unset;
  }
  .marquee-container p {
    font-size: 0.8rem;
  }

  /* .marquee-container-entry{
       animation: entry-animate 1s ease-in 1 forwards;
  }
  .marquee-container-exit{
       animation: exit-animate 1s ease-in 1 forward;
  }     */
  @keyframes entry-animate {
    /* 
      0% {
          width:320px
      } */
    50% {
      width: 320px;
    }

    100% {
      width: 10px;
    }
  }
  @keyframes exit-animate {
    0% {
    }
    50% {
      width: 320px;
    }

    100% {
      width: 10px;
    }
  }

  @keyframes disappear-animate {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100vw);
    }
  }
  @keyframes swipe-animate {
    0% {
    }

    50% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(20vw);
    }
  }
}
</style>
