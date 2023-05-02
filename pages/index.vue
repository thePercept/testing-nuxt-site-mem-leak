<template>
  <CBox class="mainHolder" v-bind="mainStylesTwo[colorMode]">
    <client-only placeholder="loading...">
      <newsTickr
        :latestUpdates="mainData['latest_updates']"
        v-if="mainData['latest_updates'].length > 0"
        ref="newsTickrComp"
        :key="Math.random() * 8998"
      />
      <imageCarousel
        :carouselData="mainData['carousel_items']"
        ref="imgCarouselComp"
        :key="Math.random() * 7654"
      />
    </client-only>

    <c-box
      as="section"
      class="primary-section"
      id="main-content-section"
      v-bind="mainStylesTwo[colorMode]"
    >
      <c-box class="" v-bind="mainStylesTwo[colorMode]">
        <c-box>
          <c-heading as="h2" class="ancorp-primary-heading" id="tender-heading">
            {{ $t('heading_tenders') }}
          </c-heading>
          <c-box>
            <c-box
              as="ul"
              aria-label="List of Published Tenders"
              class="ancorp-ul ul-l tender-ul"
              v-if="mainData['tenders'].length > 0"
              v-bind="mainStyles[colorMode]"
            >
              <c-box
                as="li"
                v-bind="mainStyles[colorMode]"
                class="ancorp-li"
                v-for="(item, index) in mainData['tenders']"
                :key="`${index}-${item['content_id']}`"
              >
                <c-text
                  as="p"
                  class="b-date"
                  aria-label="Tender published date "
                >
                  {{ $moment(item['created_at']).format('DD-MM-YYYY') }}
                </c-text>

                <c-box class="item-content-container">
                  <c-box
                    as="nuxt-link"
                    :to="localePath('/tenders/current-tenders/' + item.slug)"
                    class="item-content download-link"
                    :color="mainStyles[colorMode]['downloadLinkColor']"
                  >
                    {{
                      $i18n.locale == 'en'
                        ? item['content_title']
                        : item['content_title_hi']
                    }}
                  </c-box>
                  <c-box>
                    <c-badge
                      pt="3px"
                      mx="2"
                      variant="solid"
                      variant-color="red"
                      v-if="item.new_status === 'is_new'"
                      :class="getTenderItemClass(item)"
                    >
                      {{
                        `NEW ${
                          item.updated_at != null
                            ? `&nbsp;&nbsp;(DATE EXTENDED)`
                            : ''
                        }`
                      }}</c-badge
                    >
                  </c-box>
                </c-box>
                <c-box
                  class="tender-last-date-cont"
                  v-if="item['new_status'] != 'is_inactive'"
                >
                  <c-box
                    class="tender-last-date"
                    v-if="!bidClosed(item['bid_closing_datetime'])"
                  >
                    <c-text as="p" class="tender-last-date">
                      {{ $t('last_date_of_bid_submission') }}
                    </c-text>
                    <c-box class="tender-last-date-submission">
                      {{ dateTime(item['bid_closing_datetime']) }}
                    </c-box>
                  </c-box>
                  <c-box
                    v-if="showBidCriticalMessage(item['bid_closing_datetime'])"
                  >
                    <c-box
                      as="small"
                      class="tender-critical-msg"
                      v-if="!bidClosed(item['bid_closing_datetime'])"
                      :color="mainStyles[colorMode]['smallTextColor']"
                    >
                      {{ $t('bid_closing_soon') }}
                      {{
                        calculateBidClosingDaysLeft(
                          item['bid_closing_datetime']
                        )
                      }}
                      {{ $t('days_left') }}
                    </c-box>
                    <c-box
                      as="small"
                      class="tender-critical-msg"
                      v-if="bidClosed(item['bid_closing_datetime'])"
                      :color="mainStyles[colorMode]['smallTextColor']"
                    >
                      {{ $t('bidding_closed') }}
                    </c-box>
                  </c-box>
                </c-box>
              </c-box>
            </c-box>
            <c-box
              v-bind="mainStyles[colorMode]"
              v-if="mainData['tenders'].length > 0"
              class="ancorp-li viewable-link-cont"
              d="flex"
              justify-content="flex-start"
            >
              <c-box
                as="nuxt-link"
                class="view-all-link"
                :to="localePath('/tenders/current-tenders/')"
                font-weight="bold"
                :color="mainStyles[colorMode]['viewAllLinkColor']"
              >
                {{ $t('view_all_tenders') }}
              </c-box>
            </c-box>
          </c-box>

          <c-box
            v-bind="mainStyles[colorMode]"
            class="empty-ul-container"
            v-if="!mainData['tenders'].length > 0"
          >
            <c-box as="ul" class="ancorp-ul ul-l tender-ul empty-ul-tender">
              <c-box as="li" class="ancorp-li empty-tender-state">
                <p :color="mainStyles[colorMode]['viewAllLinkColor']">
                  {{ $t('no_new_tenders') }}
                </p>
              </c-box>
              <c-box
                as="li"
                class="ancorp-li viewable-link-cont"
                d="flex"
                justify-content="flex-start"
              >
                <c-box
                  as="nuxt-link"
                  class="view-all-link"
                  :to="localePath('/tenders/archived-tenders/')"
                  font-weight="bold"
                  v-bind="mainStyles[colorMode]"
                  :color="mainStyles[colorMode]['viewAllLinkColor']"
                >
                  {{ $t('view_all_archived_tenders') }}
                </c-box>
              </c-box>
            </c-box>
            <c-box class="" v-bind="mainStyles[colorMode]"> </c-box>
          </c-box>
        </c-box>
      </c-box>
      <c-box class="" v-bind="mainStylesTwo[colorMode]">
        <c-box>
          <c-heading
            as="h2"
            class="ancorp-primary-heading"
            id="esteemed-auth-heading"
          >
            {{ $t('heading_authorities') }}
          </c-heading>
          <c-box as="ul" v-bind="mainStyles[colorMode]" class="ancorp-ul ul-r">
            <c-box as="li" class="ancorp-authorities-li">
              <c-box class="authorities-item-cont">
                <c-box
                  as="img"
                  class="authority-img"
                  alt="Image of an important person in ANCorp"
                  :src="
                    mainData['esteemed_authorities'][0]['person_image'] ===
                    undefined
                      ? ''
                      : mainData['esteemed_authorities'][0]['person_image']
                  "
                ></c-box>
                <c-box class="authority-info-cont">
                  <c-text class="authority-name">{{
                    $i18n.locale == 'en'
                      ? mainData['esteemed_authorities'][0]['name']
                      : mainData['esteemed_authorities'][0]['name_hi']
                  }}</c-text>
                  <c-text class="authority-description">{{
                    $i18n.locale == 'en'
                      ? mainData['esteemed_authorities'][0]['description']
                      : mainData['esteemed_authorities'][0]['description_hi']
                  }}</c-text>
                </c-box>
              </c-box>
            </c-box>
            <c-box as="li" class="ancorp-authorities-li">
              <c-box class="authorities-item-cont">
                <c-box
                  as="img"
                  class="authority-img"
                  alt="Image of an important person in ANCorp"
                  :src="mainData['esteemed_authorities'][1]['person_image']"
                ></c-box>
                <c-box class="authority-info-cont">
                  <c-text class="authority-name">{{
                    $i18n.locale == 'en'
                      ? mainData['esteemed_authorities'][1]['name']
                      : mainData['esteemed_authorities'][1]['name_hi']
                  }}</c-text>
                  <c-text class="authority-description">{{
                    $i18n.locale == 'en'
                      ? mainData['esteemed_authorities'][1]['description']
                      : mainData['esteemed_authorities'][1]['description_hi']
                  }}</c-text>
                </c-box>
              </c-box>
            </c-box>

            <c-box as="li" class="ancorp-authorities-li">
              <c-box class="authorities-item-cont">
                <c-box
                  as="img"
                  class="authority-img"
                  alt="Image of an important person in ANCorp"
                  :src="mainData['esteemed_authorities'][2]['person_image']"
                ></c-box>
                <c-box class="authority-info-cont">
                  <c-text class="authority-name">{{
                    $i18n.locale == 'en'
                      ? mainData['esteemed_authorities'][2]['name']
                      : mainData['esteemed_authorities'][2]['name_hi']
                  }}</c-text>
                  <c-text class="authority-description">{{
                    $i18n.locale == 'en'
                      ? mainData['esteemed_authorities'][2]['description']
                      : mainData['esteemed_authorities'][2]['description_hi']
                  }}</c-text>
                </c-box>
              </c-box>
            </c-box>
          </c-box>
        </c-box>
      </c-box>
    </c-box>

    <c-box
      as="section"
      class="primary-section"
      id="main-content-section-two"
      v-bind="mainStylesTwo[colorMode]"
    >
      <c-box class="" v-bind="mainStylesTwo[colorMode]">
        <c-box class="">
          <c-heading
            as="h2"
            class="ancorp-primary-heading"
            id="news-event-heading"
          >
            {{ $t('heading_news_event') }}
          </c-heading>

          <c-box
            as="ul"
            class="ancorp-ul ul-r news-event-ul"
            v-bind="mainStyles[colorMode]"
          >
            <c-box
              as="li"
              class="ancorp-li"
              v-for="(item, index) in mainData['news_event_item']"
              :key="`${index}-${item['content_id']}`"
            >
              <c-text as="p" class="b-date">
                {{ $moment(item['created_at']).format('DD-MM-YYYY') }}
              </c-text>

              <c-box class="item-content-container">
                <c-box
                  as="nuxt-link"
                  :to="localePath('/news-and-events/' + item.slug)"
                  class="item-content download-link"
                  :color="mainStyles[colorMode]['downloadLinkColor']"
                >
                  {{
                    $i18n.locale == 'en'
                      ? item['content_title']
                      : item['content_title_hi']
                  }}
                </c-box>
                <c-box>
                  <c-badge
                    pt="3px"
                    mx="2"
                    variant="solid"
                    variant-color="red"
                    v-if="item.new_status === 'is_new'"
                    class="new-badge mg-8"
                    >NEW</c-badge
                  >
                </c-box>
              </c-box>
            </c-box>
          </c-box>
          <c-box
            v-bind="mainStyles[colorMode]"
            class="ancorp-li viewable-link-cont"
            d="flex"
            justify-content="flex-start"
          >
            <c-box
              as="nuxt-link"
              class="view-all-link"
              :to="localePath('/news-and-events/')"
              font-weight="bold"
              :color="mainStyles[colorMode]['viewAllLinkColor']"
            >
              {{ $t('view_all_news_events') }}
            </c-box>
          </c-box>
        </c-box>

        <c-box>
          <c-heading
            as="h2"
            class="ancorp-primary-heading"
            id="letter-circular-heading"
          >
            {{ $t('letter_circulars') }}
          </c-heading>
          <c-box as="ul" class="ancorp-ul" v-bind="mainStyles[colorMode]">
            <c-box
              as="li"
              class="ancorp-li"
              v-for="(item, index) in mainData['letter_circulars']"
              :key="`${index}-${item['content_id']}`"
            >
              <c-text as="p" class="b-date">
                {{ $moment(item['created_at']).format('DD-MM-YYYY') }}
              </c-text>

              <c-box class="item-content-container">
                <c-box
                  as="nuxt-link"
                  :to="localePath('/letters-and-circulars/' + item.slug)"
                  class="item-content download-link"
                  :color="mainStyles[colorMode]['downloadLinkColor']"
                >
                  {{
                    $i18n.locale == 'en'
                      ? item['content_title']
                      : item['content_title_hi']
                  }}
                </c-box>
                <c-box>
                  <c-badge
                    pt="3px"
                    mx="2"
                    variant="solid"
                    variant-color="red"
                    v-if="item.new_status === 'is_new'"
                    class="new-badge mg-8"
                    >NEW</c-badge
                  >
                </c-box>
              </c-box>
            </c-box>
          </c-box>
          <c-box
            v-bind="mainStyles[colorMode]"
            class="ancorp-li viewable-link-cont"
            d="flex"
            justify-content="flex-start"
          >
            <c-box
              as="nuxt-link"
              class="view-all-link"
              :to="localePath('/letters-and-circulars/')"
              font-weight="bold"
              :color="mainStyles[colorMode]['viewAllLinkColor']"
            >
              {{ $t('view_all_lnc') }}
            </c-box>
          </c-box>
        </c-box>
      </c-box>
    </c-box>

    <c-box as="section" class="flx-col" v-bind="mainStylesTwo[colorMode]">
      <c-box class="" width="100%">
        <c-heading
          as="h2"
          class="ancorp-primary-heading"
          id="about-ancorp-heading"
        >
          {{ $t('heading_about_ancorp') }}
        </c-heading>

        <c-box class="ancorp-details" v-bind="mainStyles[colorMode]">
          <c-text as="p" class="ancorp-page-paragraph pb-3">
            {{ $t('about_ancorp_one') }}
          </c-text>

          <c-box class="ancorp-msg-cont">
            <c-box class="ancorp-msg">
              <c-text as="h2">
                {{ $t('about_ancorp_two') }}
              </c-text>
            </c-box>
            <c-box class="ancorp-page-img">
              <c-box
                as="img"
                alt="An Corp Logo"
                class="ancorp-page-img-glyph"
                :src="require('@/assets/imgs/ancorp-page-glyph.png')"
              ></c-box>
            </c-box>
          </c-box>
        </c-box>
      </c-box>

      <c-box as="ul" class="ancorp-ul bg-unset pt-2 pb-1">
        <c-box as="li" class="usp-li">
          <c-box class="usp-img-cont">
            <c-box
              as="img"
              loading="lazy"
              alt="Image depicting the USP of AN Corp"
              class="usp-img"
              :src="require('@/assets/imgs/medal.png')"
            ></c-box>
            <c-text as="p">
              {{ $t('heading_excellence') }}
            </c-text>
          </c-box>
          <c-box class="usp-cont" v-bind="mainStyles[colorMode]">
            <c-text as="h3">
              {{ $t('about_ancorp_three') }}
            </c-text>
          </c-box>
        </c-box>

        <c-box as="li" class="usp-li">
          <c-box class="usp-img-cont">
            <c-box
              as="img"
              class="usp-img"
              loading="lazy"
              alt="Image depicting the USP of AN Corp"
              :src="require('@/assets/imgs/united.png')"
            ></c-box>
            <c-text as="p">
              {{ $t('heading_initiative') }}
            </c-text>
          </c-box>
          <c-box class="usp-cont" v-bind="mainStyles[colorMode]">
            <c-text as="h3">
              {{ $t('about_ancorp_four') }}
            </c-text>
          </c-box>
        </c-box>

        <c-box as="li" class="usp-li">
          <c-box class="usp-img-cont">
            <c-box
              as="img"
              loading="lazy"
              alt="Image depicting the USP of AN Corp"
              class="usp-img"
              :src="require('@/assets/imgs/coordinator.png')"
            ></c-box>
            <c-text as="p">
              {{ $t('heading_robust') }}
            </c-text>
          </c-box>
          <c-box class="usp-cont" v-bind="mainStyles[colorMode]">
            <c-text as="h3">
              {{ $t('about_ancorp_five') }}
            </c-text>
          </c-box>
        </c-box>
      </c-box>
    </c-box>

    <c-box
      as="section"
      class="primary-section flx-col"
      v-bind="mainStylesTwo[colorMode]"
    >
      <c-box class="" width="100%">
        <c-heading
          as="h2"
          class="ancorp-primary-heading"
          id="projects-services-heading"
        >
          {{ $t('heading_projects_services') }}
        </c-heading>

        <c-box class="projects-cont" v-bind="mainStyles[colorMode]">
          <c-box as="h3" class="projects-cont-sub-heading">
            {{ $t('heading_projects') }}
          </c-box>

          <c-text
            as="p"
            class="projects-cont-sub-heading"
            v-bind="mainStyles[colorMode]"
          >
            {{ $t('projects_msg') }}
          </c-text>

          <c-box class="projects-cont-sub-heading">
            <c-box
              class="pd-lr-one_plus project-thumb-container"
              v-if="mainData['projects'].length > 0"
            >
              <c-box
                v-for="(project, index) in mainData['projects']"
                :key="`${index}-${project['slug']}`"
                class="thumb-img-cont thumb-image-insertion-row-items"
              >
                <c-box class="proj-thumb">
                  <c-box class="thumb-overlay">
                    <c-box
                      as="nuxt-link"
                      :to="localePath('/projects/' + project.slug)"
                      >{{ $t('action_view') }}</c-box
                    >
                  </c-box>
                  <c-box class="img-dimensions">
                    <c-box
                      as="img"
                      :src="resolveImageSrc('', project, index)"
                      loading="lazy"
                      alt="AN Corp project picture"
                      class="img-dimensions proj-thumb-img"
                    />
                  </c-box>
                </c-box>

                <c-box class="proj-thumb-title">
                  <c-box
                    as="nuxt-link"
                    :color="mainStyles[colorMode]['downloadLinkColor']"
                    :to="localePath('/projects/' + project.slug)"
                    >{{
                      $i18n.locale == 'en'
                        ? project['content_title']
                        : project['content_title_hi']
                    }}
                  </c-box>
                </c-box>
              </c-box>
            </c-box>

            <c-box class="view-all-proj">
              <c-box
                as="nuxt-link"
                class="view-all-link"
                :to="localePath('/projects/')"
                font-weight="bold"
                :color="mainStyles[colorMode]['viewAllLinkColor']"
              >
                {{ $t('view_all_projects') }}
              </c-box>
            </c-box>
          </c-box>

          <hr />

          <c-box as="h3" class="projects-cont-sub-heading">
            {{ $t('heading_services') }}
          </c-box>

          <c-text as="p" class="projects-cont-sub-heading">
            {{ $t('services_msg') }}
          </c-text>

          <c-box class="all-services">
            <c-box class="services-container">
              <c-box class="service">
                <c-box
                  as="img"
                  class="service-img"
                  :src="require('@/assets/imgs/monitoring.png')"
                  alt="Image depicting  IT Consultancy"
                  loading="lazy"
                ></c-box>
                <c-text as="p" class="service-p">
                  {{ $t('heading_itc') }}
                </c-text>
              </c-box>

              <c-box class="service">
                <c-box
                  as="img"
                  loading="lazy"
                  alt="Image depicting the service"
                  class="service-img"
                  :src="require('@/assets/imgs/worker.png')"
                ></c-box>
                <c-text as="p" class="service-p">
                  {{ $t('heading_manpower') }}
                </c-text>
              </c-box>

              <c-box class="service">
                <c-box
                  as="img"
                  class="service-img"
                  loading="lazy"
                  alt="Image depicting the service"
                  :src="require('@/assets/imgs/government.png')"
                ></c-box>
                <c-text as="p" class="service-p">
                  {{ $t('heading_egov') }}
                </c-text>
              </c-box>
            </c-box>
            <c-box class="view-all-proj">
              <c-box
                as="nuxt-link"
                class="view-all-link"
                :to="localePath('/services/')"
                font-weight="bold"
                :color="mainStyles[colorMode]['viewAllLinkColor']"
              >
                {{ $t('view_all_services') }}
              </c-box>
            </c-box>
          </c-box>
        </c-box>
      </c-box>
    </c-box>

    <CBox>
      <CBox border-top="1px solid #CCCCCC" border-bottom="1px solid #CCCCCC">
        <CBox
          pl="4rem"
          pr="4rem"
          as="ul"
          list-style="none"
          d="flex"
          justify-content="center"
          v-bind="mainStyles[colorMode]"
          id="external-links-container"
        >
          <CBox
            as="li"
            pl="2.5rem"
            pr="2.5rem"
            pt="1.5rem"
            pb="1.5rem"
            border-right="1px solid #CCCCCC"
            border-left="1px solid #CCCCCC"
          >
            <CBox as="a" href="https://www.india.gov.in/">
              <CImage
                id="np_img"
                class="external-logos"
                w="auto"
                h="3rem"
                :src="require('@/assets/imgs/national_portal.png')"
                alt="Natinoal Portal Of India Logo"
              ></CImage>
            </CBox>
          </CBox>
          <CBox
            as="li"
            pl="2.5rem"
            pr="2.5rem"
            pt="1.5rem"
            pb="1.5rem"
            border-right="1px solid #CCCCCC"
            border-left="1px solid #CCCCCC"
          >
            <CBox as="a" href="https://dit.bihar.gov.in/">
              <CImage
                id="corp_dept"
                class="external-logos"
                w="auto"
                h="3rem"
                :src="require('@/assets/imgs/corp-logo.jpg')"
                alt="CORP Pic"
              ></CImage>
            </CBox>
          </CBox>

          <CBox
            as="li"
            pl="2.5rem"
            pr="2.5rem"
            pt="1.5rem"
            pb="1.5rem"
            border-right="1px solid #CCCCCC"
            border-left="1px solid #CCCCCC"
          >
            <CBox as="a" href="https://www.digitalindia.gov.in/">
              <CImage
                id="digital_india_img"
                class="external-logos"
                w="auto"
                h="3rem"
                :src="require('@/assets/imgs/digi_india.jpg')"
                alt="Digital India , Government of India, "
              ></CImage>
            </CBox>
          </CBox>

          <CBox
            as="li"
            pl="2.5rem"
            pr="2.5rem"
            pt="1.5rem"
            pb="1.5rem"
            border-right="1px solid #CCCCCC"
            border-left="1px solid #CCCCCC"
          >
            <CBox
              as="a"
              href="https://www.meity.gov.in
"
            >
              <CImage
                id="meity_img"
                class="external-logos"
                w="auto"
                h="3rem"
                :src="require('@/assets/imgs/meity.png')"
                alt="Ministry of Electronics and Information Technology , Government of India"
              ></CImage>
            </CBox>
          </CBox>

          <CBox
            as="li"
            pl="2.5rem"
            pr="2.5rem"
            pt="1.5rem"
            pb="1.5rem"
            border-right="1px solid #CCCCCC"
            border-left="1px solid #CCCCCC"
          >
            <CBox as="a" href="https://www.telangana.gov.in/rti/act">
              <CImage
                id="jankari_img"
                class="external-logos"
                w="auto"
                h="3rem"
                :src="require('@/assets/imgs/rti_bihar.png')"
                alt="Telanagana Jaankari"
              ></CImage>
            </CBox>
          </CBox>

          <CBox
            as="li"
            pl="2.5rem"
            pr="2.5rem"
            pt="1.5rem"
            pb="1.5rem"
            border-right="1px solid #CCCCCC"
            border-left="1px solid #CCCCCC"
          >
            <CBox as="a" href="mgov.in">
              <CImage
                id="mygov_img"
                class="external-logos"
                w="auto"
                h="3rem"
                :src="require('@/assets/imgs/my_gov.png')"
                alt="My Government, Government of India"
              ></CImage>
            </CBox>
          </CBox>
        </CBox>
      </CBox>
    </CBox>

    <c-box
      as="section"
      class="primary-section flx-col contact-details-section"
      v-bind="mainStylesTwo[colorMode]"
    >
      <c-box class="contact-details-container" width="100%">
        <c-box class="contact-details">
          <c-box class="contact-container">
            <c-box class="ancorp-address-container">
              <c-box
                as="h3"
                class="ancorp-primary-heading pt-1"
                id="contact-us-heading"
                color="white"
              >
                {{ $t('heading_contact_us') }}
              </c-box>

              <c-box class="address-row">
                <c-box as="span" class="location-pin-spn" />
                <p>
                  {{ $t('ancorp_address') }}
                </p>
              </c-box>

              <c-box class="address-row">
                <c-box as="span" class="phone-spn" />
                <p>
                  <c-box as="a" href="tel:0115402046">
                    {{
                      mainData['ancorp_contact_details'][0]['phone_number_one']
                    }}
                  </c-box>
                  &nbsp; , &nbsp;<c-box as="a" href="tel:0115402046"
                    >{{
                      mainData['ancorp_contact_details'][0]['phone_number_two']
                    }}
                  </c-box>
                </p>
              </c-box>

              <c-box class="address-row">
                <c-box as="span" class="fax-spn" />
                <p>
                  {{ mainData['ancorp_contact_details'][0]['fax_number_one'] }}
                  ,
                  {{ mainData['ancorp_contact_details'][0]['fax_number_two'] }}
                </p>
              </c-box>

              <c-box class="address-row">
                <c-box as="span" class="email-spn" />
                <a href="mailto:mdancorp@ancorp.com">
                  mdancorp[at]ancorp.com
                </a>
              </c-box>
            </c-box>
            <c-box class="map-container">
              <c-box class="map-iframe-cont">
                <iframe
                  class="map-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d96272.53039226911!2d-86.13314!3d39.63784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886b5ce3951a30dd%3A0xe42f3bc72bf6c090!2sGreenwood%20Park%20Mall!5e1!3m2!1sen!2sus!4v1682850242482!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  style="border: 0"
                  allowfullscreen=""
                  name="ancorp geolocation on map"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </c-box>
            </c-box>
          </c-box>
        </c-box>
      </c-box>
    </c-box>
  </CBox>
</template>

<script>
import newsTickr from '../myComponents/newsTickr';
import imageCarousel from '../myComponents/imageCarousel.vue';
import { mapActions } from 'vuex';
import moment from 'moment';
import 'moment/locale/hi';

export default {
  name: 'IndexPage',
  inject: ['$chakraColorMode', '$toggleColorMode'],

  jsonld() {
    const homeJsonData = {
      '@context': 'http://schema.org',
      '@type': 'Corporation',
      '@id': 'https://github.com/',
      name: 'Automated Networks Corporation(AN Corp) PVT LTD',
      description:
        'An Corp is a private company in the construction business catering counstruction & engineeering products in the domain',
      email: 'info@ancorp.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2/70, Niti Nirikshan Marg,Chennai',
        addressLocality: 'Chenna',
        addressRegion: 'Tamil Nadu',
        postalCode: '800023',
      },
      url: 'https://github.com/',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00:00',
          closes: '18:00:00',
        },

        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '00:00',
          closes: '00:00',
        },
      ],
    };
    return homeJsonData;
  },

  components: {
    newsTickr,
    imageCarousel,
  },
  computed: {
    // mainData() {
    //   return {
    //     latest_updates: [
    //       {
    //         content_id: '5ffc419e-53f1-491c-8c95-cf262410f8c1',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: 'dbc243f5-0c4b-4561-b3c6-b27d504c3104',
    //         entry_type: 'others',
    //         update_type: 'newsevents',
    //         created_at: '2023-04-27 13:11:56.617511+0530',
    //         content_title:
    //           '4 of the hardest unsolved problems in philosophy — and some possible solutions',
    //         content_title_hi:
    //           'दर्शनशास्त्र में सबसे कठिन अनसुलझी समस्याओं में से 4 - और कुछ संभावित समाधान',
    //         slug: '4-of-the-hardest-unsolved-problems-in-philosophy-and-some-possible-solutions',
    //         main_content_slug:
    //           '4-of-the-hardest-unsolved-problems-in-philosophy-and-some-possible-solutions',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: '3c9c1b99-6acd-4024-8064-aea22f896f63',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: 'df3ec298-07da-458e-8a4c-51fc0fbf9ecf',
    //         entry_type: 'others',
    //         update_type: 'letterscirculars',
    //         created_at: '2023-04-27 13:09:32.584678+0530',
    //         content_title:
    //           'Drop it America and Canada: A corn clash with Mexico helps no one',
    //         content_title_hi:
    //           'इसे छोड़ दो अमेरिका और कनाडा: मेक्सिको के साथ एक मकई संघर्ष किसी की मदद नहीं करता है',
    //         slug: 'drop-it-america-and-canada-a-corn-clash-with-mexico-helps-no-one',
    //         main_content_slug:
    //           'drop-it-america-and-canada-a-corn-clash-with-mexico-helps-no-one',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: '5bf1aae4-83a0-4e7b-b7f4-b9c789c833d9',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: '362e9aff-5a51-421d-840e-481d7aa43c91',
    //         entry_type: 'others',
    //         update_type: 'letterscirculars',
    //         created_at: '2023-04-27 13:08:24.314917+0530',
    //         content_title: 'Fugees rapper found guilty in US over 1MDB case',
    //         content_title_hi:
    //           'अमेरिका में 1MDB मामले में भगोड़े रैपर को दोषी पाया गया',
    //         slug: 'fugees-rapper-found-guilty-in-us-over-1mdb-case',
    //         main_content_slug:
    //           'fugees-rapper-found-guilty-in-us-over-1mdb-case',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: '333bfc93-e811-4fff-b447-2316fb37ac86',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: '4ed43f4b-04f2-4ea6-b68b-e79a2caf708f',
    //         entry_type: 'others',
    //         update_type: 'newsevents',
    //         created_at: '2023-04-27 13:06:27.854673+0530',
    //         content_title: 'Russia-Ukraine war: List of key events, day 428',
    //         content_title_hi:
    //           'रूस-यूक्रेन युद्ध: प्रमुख घटनाओं की सूची, दिन 428',
    //         slug: 'russia-ukraine-war-list-of-key-events-day-428',
    //         main_content_slug: 'russia-ukraine-war-list-of-key-events-day-428',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: 'b468dfe8-c8ed-4a5e-b6c9-917b4d4c4e1c',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: '977728f0-c248-4237-8b21-65817958cf22',
    //         entry_type: 'others',
    //         update_type: 'newsevents',
    //         created_at: '2023-04-27 13:05:31.729314+0530',
    //         content_title:
    //           'Why the conflict in Sudan is worrying its neighbours',
    //         content_title_hi:
    //           'सूडान में संघर्ष अपने पड़ोसियों को क्यों चिंतित कर रहा है?',
    //         slug: 'why-the-conflict-in-sudan-is-worrying-its-neighbours',
    //         main_content_slug:
    //           'why-the-conflict-in-sudan-is-worrying-its-neighbours',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: 'bc6f29ed-a6c1-4f47-8483-8b067b721edb',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: 'bbb8f892-a762-4267-8e96-3ef03c54aafa',
    //         entry_type: 'others',
    //         update_type: 'tender',
    //         created_at: '2023-04-27 13:02:26.305623+0530',
    //         content_title:
    //           'Meet the men paying thousands for a blepharoplasty – the invasive surgery for younger, prettier eyes',
    //         content_title_hi:
    //           'ब्लेफेरोप्लास्टी के लिए हजारों भुगतान करने वाले पुरुषों से मिलें - युवा, सुंदर आंखों के लिए आक्रामक सर्जरी',
    //         slug: 'meet-the-men-paying-thousands-for-a-blepharoplasty-the-invasive-surgery-for-younger-prettier-eyes',
    //         main_content_slug:
    //           'meet-the-men-paying-thousands-for-a-blepharoplasty-the-invasive-surgery-for-younger-prettier-eyes',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: 'b9d064dc-4967-403d-ba0b-a90113badf55',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: 'a0ffa7b8-1f40-4060-a406-3243607edb69',
    //         entry_type: 'others',
    //         update_type: 'tender',
    //         created_at: '2023-04-27 13:01:22.113567+0530',
    //         content_title:
    //           'How Two Friends’ Impromptu Trip Brought Electricity to 100s of Homes in Rural Arunachal',
    //         content_title_hi:
    //           'कैसे दो दोस्तों की अचानक यात्रा ने ग्रामीण अरुणाचल में 100 घरों में बिजली लाई',
    //         slug: 'how-two-friends-impromptu-trip-brought-electricity-to-100s-of-homes-in-rural-arunachal',
    //         main_content_slug:
    //           'how-two-friends-impromptu-trip-brought-electricity-to-100s-of-homes-in-rural-arunachal',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: '1919a095-59ac-4f07-8ff4-926ff6f12c5d',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: 'f0a6ee18-03bf-4bd5-932b-cd4199b992c1',
    //         entry_type: 'others',
    //         update_type: 'projects',
    //         created_at: '2023-04-27 01:40:42.194735+0530',
    //         content_title:
    //           'AdChoices The Indian Express The Indian Express Why have Maoists killed again — and why do they repeatedly attack in Chhattisgarh?',
    //         content_title_hi:
    //           'माओवादी फिर से क्यों मारे गए हैं - और वे छत्तीसगढ़ में बार-बार हमला क्यों करते हैं?',
    //         slug: 'adchoices-the-indian-express-the-indian-express-why-have-maoists-killed-again-and-why-do-they-repeatedly-attack-in-chhattisgarh',
    //         main_content_slug:
    //           'adchoices-the-indian-express-the-indian-express-why-have-maoists-killed-again-and-why-do-they-repeatedly-attack-in-chhattisgarh',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: '815278f4-325a-4067-a6fb-07b30b004647',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: '3f2c2871-220b-4edd-a724-44da3087e840',
    //         entry_type: 'others',
    //         update_type: 'projects',
    //         created_at: '2023-04-15 19:13:43.928542+0530',
    //         content_title: 'The era of the tween icon is over as we know it',
    //         content_title_hi:
    //           'जैसा कि हम जानते हैं कि ट्वीन आइकन का युग समाप्त हो गया है',
    //         slug: 'the-era-of-the-tween-icon-is-over-as-we-know-it',
    //         main_content_slug:
    //           'the-era-of-the-tween-icon-is-over-as-we-know-it',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: 'dca8ff75-cfed-401e-9757-5f6bc261374a',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //         content_id_reference: '9942cb1d-26f7-46df-96fe-a42717a39595',
    //         entry_type: 'others',
    //         update_type: 'projects',
    //         created_at: '2023-03-27 15:41:15.888023+0530',
    //         content_title:
    //           'The Elephant Whisperers couple Bomman and Bellie receive a warm welcome on IndiGo flight',
    //         content_title_hi:
    //           'एलिफेंट व्हिस्परर्स युगल बोमन और बेली का इंडिगो की उड़ान में गर्मजोशी से स्वागत किया गया',
    //         slug: 'the-elephant-whisperers-couple-bomman-and-bellie-receive-a-warm-welcome-on-indigo-flight',
    //         main_content_slug:
    //           'the-elephant-whisperers-couple-bomman-and-bellie-receive-a-warm-welcome-on-indigo-flight',
    //         new_status: 'is_new',
    //       },
    //     ],
    //     carousel_items: [
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //       'https://picsum.photos/600/200',
    //     ],
    //     tenders: [
    //       {
    //         content_id: 'bbb8f892-a762-4267-8e96-3ef03c54aafa',
    //         updated_at: null,
    //         created_at: '2023-04-27 13:02:26.280413+0530',
    //         entry_type: 'tender',
    //         content_title:
    //           'Meet the men paying thousands for a blepharoplasty – the invasive surgery for younger, prettier eyes',
    //         content_title_hi:
    //           'ब्लेफेरोप्लास्टी के लिए हजारों भुगतान करने वाले पुरुषों से मिलें - युवा, सुंदर आंखों के लिए आक्रामक सर्जरी',
    //         slug: 'meet-the-men-paying-thousands-for-a-blepharoplasty-the-invasive-surgery-for-younger-prettier-eyes',
    //         tender_headings: [],
    //         tender_paras: [],
    //         tender_datetime: [],
    //         tender_pdfs: [],
    //         primary_attachment_pdf: 'api/sample-doc',
    //         primary_attachment_label: 'Download Tender Document',
    //         primary_attachment_label_hi: 'निविदा दस्तावेज़ डाउनलोड करें',
    //         bid_opening_datetime: '2023-04-30 13:02:00.000000+0530',
    //         bid_closing_datetime: '2023-04-12 18:02:00.000000+0530',
    //         prebid_datetime: null,
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: 'a0ffa7b8-1f40-4060-a406-3243607edb69',
    //         updated_at: null,
    //         created_at: '2023-04-27 13:01:22.083482+0530',
    //         entry_type: 'tender',
    //         content_title:
    //           'How Two Friends’ Impromptu Trip Brought Electricity to 100s of Homes in Rural Arunachal',
    //         content_title_hi:
    //           'कैसे दो दोस्तों की अचानक यात्रा ने ग्रामीण अरुणाचल में 100 घरों में बिजली लाई',
    //         slug: 'how-two-friends-impromptu-trip-brought-electricity-to-100s-of-homes-in-rural-arunachal',
    //         tender_headings: [],
    //         tender_paras: [],
    //         tender_datetime: [],
    //         tender_pdfs: [],
    //         primary_attachment_pdf: 'api/sample-doc',
    //         primary_attachment_label: 'Download Tender Document',
    //         primary_attachment_label_hi: 'निविदा दस्तावेज़ डाउनलोड करें',
    //         bid_opening_datetime: '2023-04-30 13:01:00.000000+0530',
    //         bid_closing_datetime: '2023-04-27 13:01:00.000000+0530',
    //         prebid_datetime: null,
    //         new_status: 'is_new',
    //       },
    //     ],
    //     news_event_item: [
    //       {
    //         content_id: 'dbc243f5-0c4b-4561-b3c6-b27d504c3104',
    //         created_at: '2023-04-27 13:11:56.594677+0530',
    //         entry_type: 'newsevents',
    //         content_title:
    //           '4 of the hardest unsolved problems in philosophy — and some possible solutions',
    //         content_title_hi:
    //           'दर्शनशास्त्र में सबसे कठिन अनसुलझी समस्याओं में से 4 - और कुछ संभावित समाधान',
    //         slug: '4-of-the-hardest-unsolved-problems-in-philosophy-and-some-possible-solutions',
    //         content:
    //           'Philosophy has come a long way since Thales argued the universe was made of water. Philosophers have produced new ideas that enrich the world around us, give us a better understanding of the universe we live in, and help us find the good life. However, philosophy is often more about the questions and methods than the answers — and in some cases, old problems remain unanswered.\n\nHere, we look at four unsolved problems in philosophy and for each we ask these questions: Why is the problem so difficult? And why are the proposed solutions so unsatisfying?\nThe hard problem of consciousness\n\nThe hard problem of consciousness asks why any physical state creates conscious mental states at all. While we can understand physical systems very well, the hard problem goes further than merely asking “how” questions: “Why is the performance of these functions accompanied by experience?” For example, we can understand how our bodies physically feel pain, but why those physical reactions create the personal, subjective experience we call pain is unsolved.\n\n    Not all philosophers are ready to accept that chairs can have experiences.\n\nWhile variations of this problem go back centuries in European, Indian, and Chinese philosophy, the current version of the problem (quoted above) was written by Australian philosopher David Chalmers in 1995. Several theories have been put forth or dusted off as possible solutions. None of them have proven decisive. \n\n“Weak reductionists” argue that consciousness is a phenomenon that cannot be broken down into more basic, non-conscious parts but that it can also be identified with physical activity if science backs it up. In other words, if a physical event causes brain states that reliably cause mental states to happen, then it can be argued that the brain state and the mental state are the same thing. While it has a certain simplicity, this solution avoids the problem of why (physical) brain states differ from all other physical states, in that they directly cause mental states. \n\nSome philosophers have argued for panpsychism, the idea that everything is at least a little conscious. If this view is correct, then all matter has consciousness or the potential for consciousness as an inherent part of being matter. The “why” in the problem becomes less concerning after that. However, the idea that everything is at least capable of consciousness is an unintuitive one, and not all philosophers are ready to accept that chairs can have experiences.\n\nThen there is the so-called “mysterian” proposition, that the problem is currently unsolvable and is perhaps permanently so for human beings. Philosopher Colin McGinn argues for the permanently unsolvable stance, holding that our minds are not built to answer the question. Thomas Nagel is more optimistic, arguing that science might get to a point where it could address the problem.',
    //         content_hi:
    //           'थेल्स के इस तर्क के बाद से कि ब्रह्मांड पानी से बना है, दर्शनशास्त्र ने एक लंबा सफर तय किया है। दार्शनिकों ने नए विचार उत्पन्न किए हैं जो हमारे आसपास की दुनिया को समृद्ध करते हैं, हमें उस ब्रह्मांड की बेहतर समझ देते हैं जिसमें हम रहते हैं, और हमें अच्छा जीवन खोजने में मदद करते हैं। क्या इन कार्यों का प्रदर्शन अनुभव के साथ है?" उदाहरण के लिए, हम समझ सकते हैं कि हमारे शरीर शारीरिक रूप से दर्द कैसे महसूस करते हैं, लेकिन उन शारीरिक प्रतिक्रियाओं से व्यक्तिगत, व्यक्तिपरक अनुभव क्यों होता है जिसे हम दर्द कहते हैं, यह अनसुलझा है।',
    //         primary_attachment_pdf: 'api/sample-doc',
    //         primary_attachment_url: null,
    //         primary_attachment_label: 'Download Document',
    //         primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: '4ed43f4b-04f2-4ea6-b68b-e79a2caf708f',
    //         created_at: '2023-04-27 13:06:27.831445+0530',
    //         entry_type: 'newsevents',
    //         content_title: 'Russia-Ukraine war: List of key events, day 428',
    //         content_title_hi:
    //           'रूस-यूक्रेन युद्ध: प्रमुख घटनाओं की सूची, दिन 428',
    //         slug: 'russia-ukraine-war-list-of-key-events-day-428',
    //         content:
    //           'Ukrainian President Volodymyr Zelenskyy held an hour-long call with Chinese President Xi Jinping. The two discussed “possible cooperation to reach a fair and sustainable peace deal for Ukraine” and Zelenskyy stressed there can be “no peace at the expense of territorial compromises”.',
    //         content_hi:
    //           'यूक्रेनी राष्ट्रपति वलोडिमिर ज़ेलेंस्की ने चीनी राष्ट्रपति शी जिनपिंग के साथ एक घंटे तक बातचीत की। दोनों ने "यूक्रेन के लिए एक निष्पक्ष और स्थायी शांति समझौते तक पहुंचने के लिए संभावित सहयोग" पर चर्चा की और ज़ेलेंस्की ने जोर देकर कहा कि "क्षेत्रीय समझौते की कीमत पर कोई शांति नहीं हो सकती"।',
    //         primary_attachment_pdf: 'api/sample-doc',
    //         primary_attachment_url: null,
    //         primary_attachment_label: 'Download Document',
    //         primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
    //         new_status: 'is_new',
    //       },
    //       {
    //         content_id: '977728f0-c248-4237-8b21-65817958cf22',
    //         created_at: '2023-04-27 13:05:31.706272+0530',
    //         entry_type: 'newsevents',
    //         content_title:
    //           'Why the conflict in Sudan is worrying its neighbours',
    //         content_title_hi:
    //           'सूडान में संघर्ष अपने पड़ोसियों को क्यों चिंतित कर रहा है?',
    //         slug: 'why-the-conflict-in-sudan-is-worrying-its-neighbours',
    //         content:
    //           'Five of Sudan’s seven neighbours – Ethiopia, Chad, the Central African Republic, Libya and South Sudan – have faced political upheaval or conflict themselves in recent years.\n\nThe fighting that erupted between the army and paramilitary Rapid Support Forces (RSF) on Saturday in Khartoum has derailed an internationally backed plan for a transition to civilian rule after the 2019 removal of Omar al-Bashir.\n\nThe conflict pits General Abdel Fattah al-Burhan, the head of Sudan’s ruling council and commander of its army, against the wealthy, one-time militia leader General Mohamed Hamdan Dagalo, better known as Hemedti, who is Burhan’s deputy on the council and leader of the irregular RSF forces.',
    //         content_hi:
    //           'सूडान के सात पड़ोसियों में से पांच - इथियोपिया, चाड, मध्य अफ्रीकी गणराज्य, लीबिया और दक्षिण सूडान - ने हाल के वर्षों में स्वयं राजनीतिक उथल-पुथल या संघर्ष का सामना किया है।\n\nखार्तूम में शनिवार को सेना और अर्धसैनिक रैपिड सपोर्ट फोर्सेज (RSF) के बीच शुरू हुई लड़ाई ने उमर अल-बशीर को 2019 में हटाने के बाद नागरिक शासन में संक्रमण के लिए अंतरराष्ट्रीय स्तर पर समर्थित योजना को पटरी से उतार दिया है।\n\nसूडान की सत्तारूढ़ परिषद के प्रमुख और उसकी सेना के कमांडर जनरल अब्देल फतह अल-बुरहान, धनी, एक समय के मिलिशिया नेता जनरल मोहम्मद हमदान दगालो के खिलाफ हैं, जिन्हें हेमेदती के नाम से जाना जाता है, जो परिषद और नेता में बुरहान के डिप्टी हैं। अनियमित RSF बलों की।',
    //         primary_attachment_pdf: 'api/sample-doc',
    //         primary_attachment_url: null,
    //         primary_attachment_label: 'Download Document',
    //         primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
    //         new_status: 'is_new',
    //       },
    //     ],
    //     esteemed_authorities: [
    //       {
    //         id: '4839431b-7a16-4c77-a8f0-458958cfab23',
    //         is_deleted: false,
    //         deleted_at: null,
    //         created_at: '2023-02-28 12:19:56.253583+0530',
    //         updated_at: null,
    //         entry_status: 'on',
    //         entry_type: 'others',
    //         name: 'Shri Jaiveer Nathan',
    //         name_hi: 'श्री जयवीर नाथन',
    //         authority_type: 'is_founder',
    //         description: 'Hon’ble Founder in Chief',
    //         description_hi: 'माननीय संस्थापक प्रमुख',
    //         person_image: 'https://picsum.photos/200',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //       },
    //       {
    //         id: 'ae3e27c9-eeda-4c5b-951f-55290e5002d7',
    //         is_deleted: false,
    //         deleted_at: null,
    //         created_at: '2023-02-28 12:19:56.258260+0530',
    //         updated_at: null,
    //         entry_status: 'on',
    //         entry_type: 'others',
    //         name: 'Shri Arubindo Kopika',
    //         name_hi: 'श्री अरबिंदो कोपिका',
    //         authority_type: 'is_director',
    //         description: 'Hon’ble Director',
    //         description_hi: 'माननीय निदेशक',
    //         person_image: 'https://picsum.photos/200',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //       },
    //       {
    //         id: 'e6cb39c7-eb00-4708-86c9-00402aba64c5',
    //         is_deleted: false,
    //         deleted_at: null,
    //         created_at: '2023-02-28 12:19:56.260810+0530',
    //         updated_at: null,
    //         entry_status: 'on',
    //         entry_type: 'others',
    //         name: 'Shri Madan Pillai',
    //         name_hi: 'श्री मदन पिल्लई',
    //         authority_type: 'is_md',
    //         description: 'Managing Director AN Corp, Chennai',
    //         description_hi: 'प्रबंध निदेशक एएन कॉर्प, चेन्नई',
    //         person_image: 'https://picsum.photos/200',
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //       },
    //     ],
    //     about_ancorp: [],
    //     ancorp_contact_details: [
    //       {
    //         id: 'a1bfeef1-ccff-4175-a2b2-c08477bbb177',
    //         is_deleted: false,
    //         deleted_at: '2023-02-28 12:26:31.000000+0530',
    //         created_at: '2023-02-28 12:24:18.000000+0530',
    //         updated_at: null,
    //         entry_status: 'on',
    //         entry_type: 'others',
    //         address_one: null,
    //         address_two: null,
    //         email_one: null,
    //         email_two: null,
    //         phone_number_one: '06122281856',
    //         phone_number_two: '06122281857',
    //         fax_number_one: '06122281856',
    //         fax_number_two: '06122281857',
    //         call_center_number_one: null,
    //         call_center_number_two: null,
    //         created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
    //       },
    //     ],
    //     letter_circulars: [
    //       {
    //         created_at: '2023-04-27 13:09:32.562708+0530',
    //         entry_type: 'letterscirculars',
    //         content_id: 'df3ec298-07da-458e-8a4c-51fc0fbf9ecf',
    //         slug: 'drop-it-america-and-canada-a-corn-clash-with-mexico-helps-no-one',
    //         content_title:
    //           'Drop it America and Canada: A corn clash with Mexico helps no one',
    //         content_title_hi:
    //           'इसे छोड़ दो अमेरिका और कनाडा: मेक्सिको के साथ एक मकई संघर्ष किसी की मदद नहीं करता है',
    //         content:
    //           'Adam Smith wrote “corn is a necessary, silver is only a superfluity” to contrast the centrality of food when compared with more commercial indulgences. It’s worth remembering that statement at a time when a new trade fight is brewing over corn, even as the Global South confronts multiple food crises.\n\nIn February, Mexico issued a decree banning genetically modified (GMO) corn — domestic or imported — for human consumption. This affects white corn, used in tortillas and dough. Mexico has justified its move as driven by a desire to ensure food security and biodiversity by preserving its diverse varieties of maize. Mexico, according to the decree, also wants to protect the interests and practices of traditional farmers.',
    //         content_hi:
    //           'एडम स्मिथ ने अधिक व्यावसायिक भोगों की तुलना में भोजन की केंद्रीयता के विपरीत "मकई एक आवश्यक है, चांदी केवल एक अतिप्रवाह है" लिखा है। यह कथन ऐसे समय में याद रखने योग्य है जब मकई पर एक नई व्यापार लड़ाई चल रही है, भले ही ग्लोबल साउथ कई खाद्य संकटों का सामना कर रहा हो।\n\nफरवरी में, मेक्सिको ने आनुवंशिक रूप से संशोधित (जीएमओ) मकई - घरेलू या आयातित - मानव उपभोग के लिए प्रतिबंध लगाने का एक फरमान जारी किया। यह सफेद मकई को प्रभावित करता है, जिसका उपयोग टॉर्टिला और आटे में किया जाता है। मेक्सिको ने मक्का की विविध किस्मों को संरक्षित करके खाद्य सुरक्षा और जैव विविधता सुनिश्चित करने की इच्छा से प्रेरित अपने कदम को सही ठहराया है। मेक्सिको, डिक्री के अनुसार, पारंपरिक किसानों के हितों और प्रथाओं की रक्षा भी करना चाहता है।',
    //         primary_attachment_pdf: 'api/sample-doc',
    //         primary_attachment_label: 'Download Letter & Circular Document',
    //         primary_attachment_label_hi:
    //           'पत्र और परिपत्र दस्तावेज़ डाउनलोड करें',
    //         new_status: 'is_new',
    //         lettercircular_headings: [],
    //         lettercircular_paras: [],
    //         lettercircular_datetime: [],
    //         lettercircular_pdfs: [],
    //       },
    //       {
    //         created_at: '2023-04-27 13:08:24.292349+0530',
    //         entry_type: 'letterscirculars',
    //         content_id: '362e9aff-5a51-421d-840e-481d7aa43c91',
    //         slug: 'fugees-rapper-found-guilty-in-us-over-1mdb-case',
    //         content_title: 'Fugees rapper found guilty in US over 1MDB case',
    //         content_title_hi:
    //           'अमेरिका में 1MDB मामले में भगोड़े रैपर को दोषी पाया गया',
    //         content:
    //           'Fugees rapper Prakazrel “Pras” Michel has been convicted in the United States of conspiring with the financier at the centre of Malaysia’s 1MDB scandal to illegally lobby the US government.',
    //         content_hi:
    //           'Fugees रैपर Prakazrel "Pras" मिशेल को संयुक्त राज्य अमेरिका में मलेशिया के 1MDB घोटाले के केंद्र में फाइनेंसर के साथ अवैध रूप से अमेरिकी सरकार की पैरवी करने की साजिश रचने का दोषी ठहराया गया है।',
    //         primary_attachment_pdf: 'api/sample-doc',
    //         primary_attachment_label: 'Download Letter & Circular Document',
    //         primary_attachment_label_hi:
    //           'पत्र और परिपत्र दस्तावेज़ डाउनलोड करें',
    //         new_status: 'is_new',
    //         lettercircular_headings: [],
    //         lettercircular_paras: [],
    //         lettercircular_datetime: [],
    //         lettercircular_pdfs: [],
    //       },
    //     ],
    //     projects: [
    //       {
    //         content_title:
    //           'AdChoices The Indian Express The Indian Express Why have Maoists killed again — and why do they repeatedly attack in Chhattisgarh?',
    //         content_title_hi:
    //           'माओवादी फिर से क्यों मारे गए हैं - और वे छत्तीसगढ़ में बार-बार हमला क्यों करते हैं?',
    //         slug: 'adchoices-the-indian-express-the-indian-express-why-have-maoists-killed-again-and-why-do-they-repeatedly-attack-in-chhattisgarh',
    //         content:
    //           "Ten personnel of the Chhattisgarh Police's District Reserve Guard (DRG) and the civilian driver of their vehicle were reported killed in an IED attack by Maoists in the state's Dantewada district on Wednesday (April 26).",
    //         content_hi:
    //           'बुधवार (26 अप्रैल) को राज्य के दंतेवाड़ा जिले में माओवादियों द्वारा किए गए एक आईईडी हमले में छत्तीसगढ़ पुलिस के जिला रिजर्व गार्ड (डीआरजी) के दस कर्मियों और उनके वाहन के असैन्य चालक के मारे जाने की खबर है।',
    //         new_status: 'is_new',
    //         project_primary_images: [],
    //         project_secondary_images: [
    //           {
    //             project: 'b516c85c-c8ae-4979-8814-36d56cd9c14d',
    //             project_image: 'https://picsum.photos/800/300',
    //             seq_no: 2,
    //           },
    //         ],
    //         project_headings: [
    //           {
    //             project: 'b516c85c-c8ae-4979-8814-36d56cd9c14d',
    //             content_title:
    //               'A good heading to display more content (Heading No.1)',
    //             content_title_hi:
    //               'अधिक सामग्री प्रदर्शित करने के लिए एक अच्छा शीर्षक  (Heading No.1)',
    //             seq_no: 0,
    //           },
    //         ],
    //         project_paras: [
    //           {
    //             project: 'b516c85c-c8ae-4979-8814-36d56cd9c14d',
    //             content:
    //               "The attack took place more than two years after the April 2021 ambush by Maoists in Chhattisgarh's Bijapur district, in which 22 security forces personnel were killed.",
    //             content_hi:
    //               'छत्तीसगढ़ के बीजापुर जिले में माओवादियों द्वारा अप्रैल 2021 में घात लगाकर किए गए हमले के दो साल से अधिक समय बाद यह हमला हुआ, जिसमें 22 सुरक्षा बल के जवान मारे गए थे।',
    //             seq_no: 1,
    //           },
    //         ],
    //         project_datetime: [],
    //         project_pdfs: [],
    //       },
    //       {
    //         content_title: 'The era of the tween icon is over as we know it',
    //         content_title_hi:
    //           'जैसा कि हम जानते हैं कि ट्वीन आइकन का युग समाप्त हो गया है',
    //         slug: 'the-era-of-the-tween-icon-is-over-as-we-know-it',
    //         content:
    //           "Social media's accelerated coming-of-age means the awkward, nostalgic, Y2K era when being sixteen felt like the peak of life is long gone.",
    //         content_hi:
    //           'सोशल मीडिया के तेजी से आने का मतलब अजीब, उदासीन, Y2K युग है जब सोलह साल की उम्र में ऐसा महसूस होता है कि जीवन का शिखर लंबा चला गया है।',
    //         new_status: 'is_new',
    //         project_primary_images: [],
    //         project_secondary_images: [
    //           {
    //             project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
    //             project_image: 'https://picsum.photos/800/300',
    //             seq_no: 3,
    //           },
    //         ],
    //         project_headings: [],
    //         project_paras: [
    //           {
    //             project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
    //             content:
    //               'Almost 20 years ago, nine young actresses gathered for a now infamous Vanity Fair cover shoot. The pull-out spread would be something of a magnum opus for the magazine: a stocktake on the best and brightest teen entertainers of the era, those for whom fame was already second-nature. For a publication whose hard-hitting journalism had long catered to a very specific consumer, it felt radical. Now, with the intention that its pages be ripped from their spine and taped to bedroom walls, Vanity Fair was embracing zine culture. And that, in turn, was tween culture. ',
    //             content_hi:
    //               'लगभग 20 साल पहले, नौ युवा अभिनेत्रियाँ अब कुख्यात वैनिटी फेयर कवर शूट के लिए एकत्रित हुई थीं। पुल-आउट प्रसार पत्रिका के लिए एक महान कृति होगा: युग के सर्वश्रेष्ठ और प्रतिभाशाली किशोर मनोरंजनकर्ताओं पर एक स्टॉकटेक, जिनके लिए प्रसिद्धि पहले से ही दूसरी प्रकृति थी। एक ऐसे प्रकाशन के लिए जिसकी कड़ी मेहनत वाली पत्रकारिता ने लंबे समय तक एक विशिष्ट उपभोक्ता को पूरा किया था, यह कट्टरपंथी लगा। अब, इस मंशा के साथ कि इसके पन्नों को उनकी रीढ़ से चीर कर बेडरूम की दीवारों पर टेप से चिपका दिया जाए, वैनिटी फेयर ज़ाइन संस्कृति को अपना रहा था। और वह बदले में, संस्कृति के बीच था।',
    //             seq_no: 0,
    //           },
    //           {
    //             project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
    //             content:
    //               "“I remember wanting to dress like Mary-Kate and Ashley,” says Ivana Rihter, a Los Angeles-based  entertainment journalist and co-host of the celebrity nostalgia podcast, (UN)COVER GIRL. “I wanted Miley's hair, and especially related to Lizzie McGuire. If you turned to TV, it felt like being 16 years old was the peak of life.”",
    //             content_hi:
    //               '"मुझे याद है कि मैं मैरी-केट और एशले की तरह कपड़े पहनना चाहती थी," इवाना रिहटर, लॉस एंजिल्स स्थित एक मनोरंजन पत्रकार और सेलिब्रिटी नॉस्टैल्जिया पॉडकास्ट, (यूएन) कवर गर्ल की सह-होस्ट कहती हैं। "मैं मिली के बाल चाहता था, और विशेष रूप से लिज़ी मैकगायर से संबंधित था। अगर आप टीवी की ओर रुख करते हैं, तो ऐसा लगता है कि 16 साल की उम्र जीवन का चरम था।',
    //             seq_no: 1,
    //           },
    //           {
    //             project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
    //             content:
    //               'Long before TikTok choreography or Instagram selfies, Vanity Fair’s 2003 “It’s Totally Raining Teens” portfolio served as one of the sole access points for millions of tweens to their idols. The likes of Mary-Kate and Ashley Olsen, Hilary Duff and Lindsay Lohan were probed for their celebrity crushes, favourite lip glosses and the “number of Juicy Couture outfits” (“No joke, probably 25,” revealed Mandy Moore) they owned. In-book, lesser stars Emma Watson and Solange Knowles also made an appearance. The publication had learned, along with Hollywood and every major label music exec, that pre-teens controlled the purse strings of their parents. And that was a market worth exploring.',
    //             content_hi:
    //               'टिकटॉक कोरियोग्राफी या इंस्टाग्राम सेल्फी से बहुत पहले, वैनिटी फेयर के 2003 "इट्स टोटली रेनिंग टीन्स" पोर्टफोलियो ने लाखों लोगों के लिए उनकी मूर्तियों के लिए एकमात्र एक्सेस पॉइंट के रूप में कार्य किया। मैरी-केट और एशले ओल्सन, हिलेरी डफ और लिंडसे लोहान की पसंद को उनके सेलिब्रिटी क्रश, पसंदीदा होंठ चमक और "रसदार वस्त्र संगठनों की संख्या" ("कोई मजाक नहीं, शायद 25," मैंडी मूर का पता चला) के लिए जांच की गई थी। इन-बुक, कम सितारों एम्मा वाटसन और सोलेंज नोल्स ने भी उपस्थिति दर्ज कराई। प्रकाशन ने हॉलीवुड और हर प्रमुख लेबल संगीत निष्पादन के साथ सीखा था कि पूर्व-किशोर अपने माता-पिता के बटुए को नियंत्रित करते हैं। और वह खोज के लायक बाजार था।',
    //             seq_no: 2,
    //           },
    //         ],
    //         project_datetime: [],
    //         project_pdfs: [],
    //       },
    //       {
    //         content_title:
    //           'The Elephant Whisperers couple Bomman and Bellie receive a warm welcome on IndiGo flight',
    //         content_title_hi:
    //           'एलिफेंट व्हिस्परर्स युगल बोमन और बेली का इंडिगो की उड़ान में गर्मजोशी से स्वागत किया गया',
    //         slug: 'the-elephant-whisperers-couple-bomman-and-bellie-receive-a-warm-welcome-on-indigo-flight',
    //         content:
    //           'The Elephant Whisperers’ couple, Bomman and Bellie, received a warm welcome from the IndiGo pilot and passengers on a flight to Ooty. The documentary featuring the indigenous couple won the Oscar in the Best Documentary Short Subject category this year. It is the first film by an Indian production to win an Academy Award.',
    //         content_hi:
    //           'द एलीफेंट व्हिस्परर्स कपल, बोमन एंड बेली का इंडिगो पायलट और यात्रियों ने ऊटी जाने वाली फ्लाइट में गर्मजोशी से स्वागत किया। स्वदेशी युगल पर बनी इस डॉक्यूमेंट्री ने इस साल बेस्ट डॉक्यूमेंट्री शॉर्ट सब्जेक्ट कैटेगरी में ऑस्कर जीता। यह अकादमी पुरस्कार जीतने वाली भारतीय प्रोडक्शन की पहली फिल्म है।',
    //         new_status: 'is_new',
    //         project_primary_images: [],
    //         project_secondary_images: [
    //           {
    //             project: 'f26da68a-548b-4e32-a4be-f050887bbf4b',
    //             project_image: 'https://picsum.photos/800/300',
    //             seq_no: 0,
    //           },
    //           {
    //             project: 'f26da68a-548b-4e32-a4be-f050887bbf4b',
    //             project_image: 'https://picsum.photos/800/300',
    //             seq_no: 0,
    //           },
    //         ],
    //         project_headings: [],
    //         project_paras: [],
    //         project_datetime: [],
    //         project_pdfs: [],
    //       },
    //       {
    //         content_title:
    //           'Why people dislike Anne Hathaway (and how she\'s dealt with the "Hathahate")',
    //         content_title_hi:
    //           'लोग ऐनी हैथवे को नापसंद क्यों करते हैं (और उसने "हथाटे" के साथ कैसे व्यवहार किया है)',
    //         slug: 'why-people-dislike-anne-hathaway-and-how-shes-dealt-with-the-hathahate',
    //         content:
    //           'The backlash against the actress peaked around 2013, after the Oscars, though it had been growing for some time. The feeling even inspired a hashtag on Twitter: #Hathahate.One of the early reasons given was the fact that Hathaway behaves like a "theater kid," AKA that kid from school who had an over-the-top personality, affected and dramatic.',
    //         content_hi:
    //           'ऑस्कर के बाद 2013 के आसपास अभिनेत्री के खिलाफ प्रतिक्रिया चरम पर थी, हालांकि यह कुछ समय से बढ़ रही थी। इस भावना ने ट्विटर पर एक हैशटैग को भी प्रेरित किया: #Hathahate. दिए गए शुरुआती कारणों में से एक यह तथ्य था कि हैथवे एक "थिएटर किड" की तरह व्यवहार करता है, उर्फ स्कूल का वह बच्चा, जिसके पास ओवर-द-टॉप व्यक्तित्व, प्रभावित और नाटकीय था।',
    //         new_status: 'is_new',
    //         project_primary_images: [],
    //         project_secondary_images: [
    //           {
    //             project: 'b6c71984-9a1d-49f7-a42b-bba819a6d662',
    //             project_image: 'https://picsum.photos/800/300',
    //             seq_no: 0,
    //           },
    //           {
    //             project: 'b6c71984-9a1d-49f7-a42b-bba819a6d662',
    //             project_image: 'https://picsum.photos/800/300',
    //             seq_no: 0,
    //           },
    //           {
    //             project: 'b6c71984-9a1d-49f7-a42b-bba819a6d662',
    //             project_image: 'https://picsum.photos/800/300',
    //             seq_no: 0,
    //           },
    //         ],
    //         project_headings: [],
    //         project_paras: [],
    //         project_datetime: [],
    //         project_pdfs: [],
    //       },
    //     ],
    //   };
    // },

    toggleColorMode() {
      return this.$toggleColorMode;
    },

    colorMode() {
      return this.$chakraColorMode();
    },
  },

  head() {
    return {
      title: 'Automated Networks Corporation(AN Corp) PVT LTD',
      meta: [
        {
          hid: 'og-title',
          property: 'og:title',
          content: 'Automated Networks Corporation(AN Corp) PVT LTD',
        },
        {
          hid: 'description',
          property: 'description',
          content: 'Automated Networks Corporation(AN Corp) PVT LTD',
        },
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://github.com',
        },
        {
          hid: 'structured-data',
          type: 'application/ld+json',
          innerHTML: this.tableData,
        },

        // other meta
      ],
    };
  },

  asyncData({ $config: { ROOT_URL }, $axios, error }) {
    return $axios
      .get('https://mocki.io/v1/286a552f-5642-4844-bdf0-38c0450e3da2')
      .then((response) => {
        console.log('Response is -->', response.data);
        return {
          mainData: response.data,
        };
      })
      .catch((e) => {
        // console.log("ERROR ??");
        // console.log(e);
        error({
          statusCode: e.response.status,
        });
      });
  },

  // async asyncData({ params, $http }) {
  //   const mainData = await $http.$get(
  //     `https://mocki.io/v1/286a552f-5642-4844-bdf0-38c0450e3da2`
  //   );
  //   return {
  //     mainData,
  //   };
  // },

  mounted() {},
  beforeDestroy() {
    console.log('Destroying INDEX..');
  },

  data() {
    return {
      // mainData: {
      //   latest_updates: [
      //     {
      //       content_id: '5ffc419e-53f1-491c-8c95-cf262410f8c1',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: 'dbc243f5-0c4b-4561-b3c6-b27d504c3104',
      //       entry_type: 'others',
      //       update_type: 'newsevents',
      //       created_at: '2023-04-27 13:11:56.617511+0530',
      //       content_title:
      //         '4 of the hardest unsolved problems in philosophy — and some possible solutions',
      //       content_title_hi:
      //         'दर्शनशास्त्र में सबसे कठिन अनसुलझी समस्याओं में से 4 - और कुछ संभावित समाधान',
      //       slug: '4-of-the-hardest-unsolved-problems-in-philosophy-and-some-possible-solutions',
      //       main_content_slug:
      //         '4-of-the-hardest-unsolved-problems-in-philosophy-and-some-possible-solutions',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: '3c9c1b99-6acd-4024-8064-aea22f896f63',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: 'df3ec298-07da-458e-8a4c-51fc0fbf9ecf',
      //       entry_type: 'others',
      //       update_type: 'letterscirculars',
      //       created_at: '2023-04-27 13:09:32.584678+0530',
      //       content_title:
      //         'Drop it America and Canada: A corn clash with Mexico helps no one',
      //       content_title_hi:
      //         'इसे छोड़ दो अमेरिका और कनाडा: मेक्सिको के साथ एक मकई संघर्ष किसी की मदद नहीं करता है',
      //       slug: 'drop-it-america-and-canada-a-corn-clash-with-mexico-helps-no-one',
      //       main_content_slug:
      //         'drop-it-america-and-canada-a-corn-clash-with-mexico-helps-no-one',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: '5bf1aae4-83a0-4e7b-b7f4-b9c789c833d9',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: '362e9aff-5a51-421d-840e-481d7aa43c91',
      //       entry_type: 'others',
      //       update_type: 'letterscirculars',
      //       created_at: '2023-04-27 13:08:24.314917+0530',
      //       content_title: 'Fugees rapper found guilty in US over 1MDB case',
      //       content_title_hi:
      //         'अमेरिका में 1MDB मामले में भगोड़े रैपर को दोषी पाया गया',
      //       slug: 'fugees-rapper-found-guilty-in-us-over-1mdb-case',
      //       main_content_slug:
      //         'fugees-rapper-found-guilty-in-us-over-1mdb-case',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: '333bfc93-e811-4fff-b447-2316fb37ac86',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: '4ed43f4b-04f2-4ea6-b68b-e79a2caf708f',
      //       entry_type: 'others',
      //       update_type: 'newsevents',
      //       created_at: '2023-04-27 13:06:27.854673+0530',
      //       content_title: 'Russia-Ukraine war: List of key events, day 428',
      //       content_title_hi:
      //         'रूस-यूक्रेन युद्ध: प्रमुख घटनाओं की सूची, दिन 428',
      //       slug: 'russia-ukraine-war-list-of-key-events-day-428',
      //       main_content_slug: 'russia-ukraine-war-list-of-key-events-day-428',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: 'b468dfe8-c8ed-4a5e-b6c9-917b4d4c4e1c',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: '977728f0-c248-4237-8b21-65817958cf22',
      //       entry_type: 'others',
      //       update_type: 'newsevents',
      //       created_at: '2023-04-27 13:05:31.729314+0530',
      //       content_title:
      //         'Why the conflict in Sudan is worrying its neighbours',
      //       content_title_hi:
      //         'सूडान में संघर्ष अपने पड़ोसियों को क्यों चिंतित कर रहा है?',
      //       slug: 'why-the-conflict-in-sudan-is-worrying-its-neighbours',
      //       main_content_slug:
      //         'why-the-conflict-in-sudan-is-worrying-its-neighbours',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: 'bc6f29ed-a6c1-4f47-8483-8b067b721edb',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: 'bbb8f892-a762-4267-8e96-3ef03c54aafa',
      //       entry_type: 'others',
      //       update_type: 'tender',
      //       created_at: '2023-04-27 13:02:26.305623+0530',
      //       content_title:
      //         'Meet the men paying thousands for a blepharoplasty – the invasive surgery for younger, prettier eyes',
      //       content_title_hi:
      //         'ब्लेफेरोप्लास्टी के लिए हजारों भुगतान करने वाले पुरुषों से मिलें - युवा, सुंदर आंखों के लिए आक्रामक सर्जरी',
      //       slug: 'meet-the-men-paying-thousands-for-a-blepharoplasty-the-invasive-surgery-for-younger-prettier-eyes',
      //       main_content_slug:
      //         'meet-the-men-paying-thousands-for-a-blepharoplasty-the-invasive-surgery-for-younger-prettier-eyes',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: 'b9d064dc-4967-403d-ba0b-a90113badf55',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: 'a0ffa7b8-1f40-4060-a406-3243607edb69',
      //       entry_type: 'others',
      //       update_type: 'tender',
      //       created_at: '2023-04-27 13:01:22.113567+0530',
      //       content_title:
      //         'How Two Friends’ Impromptu Trip Brought Electricity to 100s of Homes in Rural Arunachal',
      //       content_title_hi:
      //         'कैसे दो दोस्तों की अचानक यात्रा ने ग्रामीण अरुणाचल में 100 घरों में बिजली लाई',
      //       slug: 'how-two-friends-impromptu-trip-brought-electricity-to-100s-of-homes-in-rural-arunachal',
      //       main_content_slug:
      //         'how-two-friends-impromptu-trip-brought-electricity-to-100s-of-homes-in-rural-arunachal',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: '1919a095-59ac-4f07-8ff4-926ff6f12c5d',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: 'f0a6ee18-03bf-4bd5-932b-cd4199b992c1',
      //       entry_type: 'others',
      //       update_type: 'projects',
      //       created_at: '2023-04-27 01:40:42.194735+0530',
      //       content_title:
      //         'AdChoices The Indian Express The Indian Express Why have Maoists killed again — and why do they repeatedly attack in Chhattisgarh?',
      //       content_title_hi:
      //         'माओवादी फिर से क्यों मारे गए हैं - और वे छत्तीसगढ़ में बार-बार हमला क्यों करते हैं?',
      //       slug: 'adchoices-the-indian-express-the-indian-express-why-have-maoists-killed-again-and-why-do-they-repeatedly-attack-in-chhattisgarh',
      //       main_content_slug:
      //         'adchoices-the-indian-express-the-indian-express-why-have-maoists-killed-again-and-why-do-they-repeatedly-attack-in-chhattisgarh',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: '815278f4-325a-4067-a6fb-07b30b004647',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: '3f2c2871-220b-4edd-a724-44da3087e840',
      //       entry_type: 'others',
      //       update_type: 'projects',
      //       created_at: '2023-04-15 19:13:43.928542+0530',
      //       content_title: 'The era of the tween icon is over as we know it',
      //       content_title_hi:
      //         'जैसा कि हम जानते हैं कि ट्वीन आइकन का युग समाप्त हो गया है',
      //       slug: 'the-era-of-the-tween-icon-is-over-as-we-know-it',
      //       main_content_slug:
      //         'the-era-of-the-tween-icon-is-over-as-we-know-it',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: 'dca8ff75-cfed-401e-9757-5f6bc261374a',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //       content_id_reference: '9942cb1d-26f7-46df-96fe-a42717a39595',
      //       entry_type: 'others',
      //       update_type: 'projects',
      //       created_at: '2023-03-27 15:41:15.888023+0530',
      //       content_title:
      //         'The Elephant Whisperers couple Bomman and Bellie receive a warm welcome on IndiGo flight',
      //       content_title_hi:
      //         'एलिफेंट व्हिस्परर्स युगल बोमन और बेली का इंडिगो की उड़ान में गर्मजोशी से स्वागत किया गया',
      //       slug: 'the-elephant-whisperers-couple-bomman-and-bellie-receive-a-warm-welcome-on-indigo-flight',
      //       main_content_slug:
      //         'the-elephant-whisperers-couple-bomman-and-bellie-receive-a-warm-welcome-on-indigo-flight',
      //       new_status: 'is_new',
      //     },
      //   ],
      //   carousel_items: [
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //     'https://picsum.photos/600/200',
      //   ],
      //   tenders: [
      //     {
      //       content_id: 'bbb8f892-a762-4267-8e96-3ef03c54aafa',
      //       updated_at: null,
      //       created_at: '2023-04-27 13:02:26.280413+0530',
      //       entry_type: 'tender',
      //       content_title:
      //         'Meet the men paying thousands for a blepharoplasty – the invasive surgery for younger, prettier eyes',
      //       content_title_hi:
      //         'ब्लेफेरोप्लास्टी के लिए हजारों भुगतान करने वाले पुरुषों से मिलें - युवा, सुंदर आंखों के लिए आक्रामक सर्जरी',
      //       slug: 'meet-the-men-paying-thousands-for-a-blepharoplasty-the-invasive-surgery-for-younger-prettier-eyes',
      //       tender_headings: [],
      //       tender_paras: [],
      //       tender_datetime: [],
      //       tender_pdfs: [],
      //       primary_attachment_pdf: 'api/sample-doc',
      //       primary_attachment_label: 'Download Tender Document',
      //       primary_attachment_label_hi: 'निविदा दस्तावेज़ डाउनलोड करें',
      //       bid_opening_datetime: '2023-04-30 13:02:00.000000+0530',
      //       bid_closing_datetime: '2023-04-12 18:02:00.000000+0530',
      //       prebid_datetime: null,
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: 'a0ffa7b8-1f40-4060-a406-3243607edb69',
      //       updated_at: null,
      //       created_at: '2023-04-27 13:01:22.083482+0530',
      //       entry_type: 'tender',
      //       content_title:
      //         'How Two Friends’ Impromptu Trip Brought Electricity to 100s of Homes in Rural Arunachal',
      //       content_title_hi:
      //         'कैसे दो दोस्तों की अचानक यात्रा ने ग्रामीण अरुणाचल में 100 घरों में बिजली लाई',
      //       slug: 'how-two-friends-impromptu-trip-brought-electricity-to-100s-of-homes-in-rural-arunachal',
      //       tender_headings: [],
      //       tender_paras: [],
      //       tender_datetime: [],
      //       tender_pdfs: [],
      //       primary_attachment_pdf: 'api/sample-doc',
      //       primary_attachment_label: 'Download Tender Document',
      //       primary_attachment_label_hi: 'निविदा दस्तावेज़ डाउनलोड करें',
      //       bid_opening_datetime: '2023-04-30 13:01:00.000000+0530',
      //       bid_closing_datetime: '2023-04-27 13:01:00.000000+0530',
      //       prebid_datetime: null,
      //       new_status: 'is_new',
      //     },
      //   ],
      //   news_event_item: [
      //     {
      //       content_id: 'dbc243f5-0c4b-4561-b3c6-b27d504c3104',
      //       created_at: '2023-04-27 13:11:56.594677+0530',
      //       entry_type: 'newsevents',
      //       content_title:
      //         '4 of the hardest unsolved problems in philosophy — and some possible solutions',
      //       content_title_hi:
      //         'दर्शनशास्त्र में सबसे कठिन अनसुलझी समस्याओं में से 4 - और कुछ संभावित समाधान',
      //       slug: '4-of-the-hardest-unsolved-problems-in-philosophy-and-some-possible-solutions',
      //       content:
      //         'Philosophy has come a long way since Thales argued the universe was made of water. Philosophers have produced new ideas that enrich the world around us, give us a better understanding of the universe we live in, and help us find the good life. However, philosophy is often more about the questions and methods than the answers — and in some cases, old problems remain unanswered.\n\nHere, we look at four unsolved problems in philosophy and for each we ask these questions: Why is the problem so difficult? And why are the proposed solutions so unsatisfying?\nThe hard problem of consciousness\n\nThe hard problem of consciousness asks why any physical state creates conscious mental states at all. While we can understand physical systems very well, the hard problem goes further than merely asking “how” questions: “Why is the performance of these functions accompanied by experience?” For example, we can understand how our bodies physically feel pain, but why those physical reactions create the personal, subjective experience we call pain is unsolved.\n\n    Not all philosophers are ready to accept that chairs can have experiences.\n\nWhile variations of this problem go back centuries in European, Indian, and Chinese philosophy, the current version of the problem (quoted above) was written by Australian philosopher David Chalmers in 1995. Several theories have been put forth or dusted off as possible solutions. None of them have proven decisive. \n\n“Weak reductionists” argue that consciousness is a phenomenon that cannot be broken down into more basic, non-conscious parts but that it can also be identified with physical activity if science backs it up. In other words, if a physical event causes brain states that reliably cause mental states to happen, then it can be argued that the brain state and the mental state are the same thing. While it has a certain simplicity, this solution avoids the problem of why (physical) brain states differ from all other physical states, in that they directly cause mental states. \n\nSome philosophers have argued for panpsychism, the idea that everything is at least a little conscious. If this view is correct, then all matter has consciousness or the potential for consciousness as an inherent part of being matter. The “why” in the problem becomes less concerning after that. However, the idea that everything is at least capable of consciousness is an unintuitive one, and not all philosophers are ready to accept that chairs can have experiences.\n\nThen there is the so-called “mysterian” proposition, that the problem is currently unsolvable and is perhaps permanently so for human beings. Philosopher Colin McGinn argues for the permanently unsolvable stance, holding that our minds are not built to answer the question. Thomas Nagel is more optimistic, arguing that science might get to a point where it could address the problem.',
      //       content_hi:
      //         'थेल्स के इस तर्क के बाद से कि ब्रह्मांड पानी से बना है, दर्शनशास्त्र ने एक लंबा सफर तय किया है। दार्शनिकों ने नए विचार उत्पन्न किए हैं जो हमारे आसपास की दुनिया को समृद्ध करते हैं, हमें उस ब्रह्मांड की बेहतर समझ देते हैं जिसमें हम रहते हैं, और हमें अच्छा जीवन खोजने में मदद करते हैं। क्या इन कार्यों का प्रदर्शन अनुभव के साथ है?" उदाहरण के लिए, हम समझ सकते हैं कि हमारे शरीर शारीरिक रूप से दर्द कैसे महसूस करते हैं, लेकिन उन शारीरिक प्रतिक्रियाओं से व्यक्तिगत, व्यक्तिपरक अनुभव क्यों होता है जिसे हम दर्द कहते हैं, यह अनसुलझा है।',
      //       primary_attachment_pdf: 'api/sample-doc',
      //       primary_attachment_url: null,
      //       primary_attachment_label: 'Download Document',
      //       primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: '4ed43f4b-04f2-4ea6-b68b-e79a2caf708f',
      //       created_at: '2023-04-27 13:06:27.831445+0530',
      //       entry_type: 'newsevents',
      //       content_title: 'Russia-Ukraine war: List of key events, day 428',
      //       content_title_hi:
      //         'रूस-यूक्रेन युद्ध: प्रमुख घटनाओं की सूची, दिन 428',
      //       slug: 'russia-ukraine-war-list-of-key-events-day-428',
      //       content:
      //         'Ukrainian President Volodymyr Zelenskyy held an hour-long call with Chinese President Xi Jinping. The two discussed “possible cooperation to reach a fair and sustainable peace deal for Ukraine” and Zelenskyy stressed there can be “no peace at the expense of territorial compromises”.',
      //       content_hi:
      //         'यूक्रेनी राष्ट्रपति वलोडिमिर ज़ेलेंस्की ने चीनी राष्ट्रपति शी जिनपिंग के साथ एक घंटे तक बातचीत की। दोनों ने "यूक्रेन के लिए एक निष्पक्ष और स्थायी शांति समझौते तक पहुंचने के लिए संभावित सहयोग" पर चर्चा की और ज़ेलेंस्की ने जोर देकर कहा कि "क्षेत्रीय समझौते की कीमत पर कोई शांति नहीं हो सकती"।',
      //       primary_attachment_pdf: 'api/sample-doc',
      //       primary_attachment_url: null,
      //       primary_attachment_label: 'Download Document',
      //       primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
      //       new_status: 'is_new',
      //     },
      //     {
      //       content_id: '977728f0-c248-4237-8b21-65817958cf22',
      //       created_at: '2023-04-27 13:05:31.706272+0530',
      //       entry_type: 'newsevents',
      //       content_title:
      //         'Why the conflict in Sudan is worrying its neighbours',
      //       content_title_hi:
      //         'सूडान में संघर्ष अपने पड़ोसियों को क्यों चिंतित कर रहा है?',
      //       slug: 'why-the-conflict-in-sudan-is-worrying-its-neighbours',
      //       content:
      //         'Five of Sudan’s seven neighbours – Ethiopia, Chad, the Central African Republic, Libya and South Sudan – have faced political upheaval or conflict themselves in recent years.\n\nThe fighting that erupted between the army and paramilitary Rapid Support Forces (RSF) on Saturday in Khartoum has derailed an internationally backed plan for a transition to civilian rule after the 2019 removal of Omar al-Bashir.\n\nThe conflict pits General Abdel Fattah al-Burhan, the head of Sudan’s ruling council and commander of its army, against the wealthy, one-time militia leader General Mohamed Hamdan Dagalo, better known as Hemedti, who is Burhan’s deputy on the council and leader of the irregular RSF forces.',
      //       content_hi:
      //         'सूडान के सात पड़ोसियों में से पांच - इथियोपिया, चाड, मध्य अफ्रीकी गणराज्य, लीबिया और दक्षिण सूडान - ने हाल के वर्षों में स्वयं राजनीतिक उथल-पुथल या संघर्ष का सामना किया है।\n\nखार्तूम में शनिवार को सेना और अर्धसैनिक रैपिड सपोर्ट फोर्सेज (RSF) के बीच शुरू हुई लड़ाई ने उमर अल-बशीर को 2019 में हटाने के बाद नागरिक शासन में संक्रमण के लिए अंतरराष्ट्रीय स्तर पर समर्थित योजना को पटरी से उतार दिया है।\n\nसूडान की सत्तारूढ़ परिषद के प्रमुख और उसकी सेना के कमांडर जनरल अब्देल फतह अल-बुरहान, धनी, एक समय के मिलिशिया नेता जनरल मोहम्मद हमदान दगालो के खिलाफ हैं, जिन्हें हेमेदती के नाम से जाना जाता है, जो परिषद और नेता में बुरहान के डिप्टी हैं। अनियमित RSF बलों की।',
      //       primary_attachment_pdf: 'api/sample-doc',
      //       primary_attachment_url: null,
      //       primary_attachment_label: 'Download Document',
      //       primary_attachment_label_hi: 'दस्तावेज़ डाउनलोड करें',
      //       new_status: 'is_new',
      //     },
      //   ],
      //   esteemed_authorities: [
      //     {
      //       id: '4839431b-7a16-4c77-a8f0-458958cfab23',
      //       is_deleted: false,
      //       deleted_at: null,
      //       created_at: '2023-02-28 12:19:56.253583+0530',
      //       updated_at: null,
      //       entry_status: 'on',
      //       entry_type: 'others',
      //       name: 'Shri Jaiveer Nathan',
      //       name_hi: 'श्री जयवीर नाथन',
      //       authority_type: 'is_founder',
      //       description: 'Hon’ble Founder in Chief',
      //       description_hi: 'माननीय संस्थापक प्रमुख',
      //       person_image: 'https://picsum.photos/200',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //     },
      //     {
      //       id: 'ae3e27c9-eeda-4c5b-951f-55290e5002d7',
      //       is_deleted: false,
      //       deleted_at: null,
      //       created_at: '2023-02-28 12:19:56.258260+0530',
      //       updated_at: null,
      //       entry_status: 'on',
      //       entry_type: 'others',
      //       name: 'Shri Arubindo Kopika',
      //       name_hi: 'श्री अरबिंदो कोपिका',
      //       authority_type: 'is_director',
      //       description: 'Hon’ble Director',
      //       description_hi: 'माननीय निदेशक',
      //       person_image: 'https://picsum.photos/200',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //     },
      //     {
      //       id: 'e6cb39c7-eb00-4708-86c9-00402aba64c5',
      //       is_deleted: false,
      //       deleted_at: null,
      //       created_at: '2023-02-28 12:19:56.260810+0530',
      //       updated_at: null,
      //       entry_status: 'on',
      //       entry_type: 'others',
      //       name: 'Shri Madan Pillai',
      //       name_hi: 'श्री मदन पिल्लई',
      //       authority_type: 'is_md',
      //       description: 'Managing Director AN Corp, Chennai',
      //       description_hi: 'प्रबंध निदेशक एएन कॉर्प, चेन्नई',
      //       person_image: 'https://picsum.photos/200',
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //     },
      //   ],
      //   about_ancorp: [],
      //   ancorp_contact_details: [
      //     {
      //       id: 'a1bfeef1-ccff-4175-a2b2-c08477bbb177',
      //       is_deleted: false,
      //       deleted_at: '2023-02-28 12:26:31.000000+0530',
      //       created_at: '2023-02-28 12:24:18.000000+0530',
      //       updated_at: null,
      //       entry_status: 'on',
      //       entry_type: 'others',
      //       address_one: null,
      //       address_two: null,
      //       email_one: null,
      //       email_two: null,
      //       phone_number_one: '06122281856',
      //       phone_number_two: '06122281857',
      //       fax_number_one: '06122281856',
      //       fax_number_two: '06122281857',
      //       call_center_number_one: null,
      //       call_center_number_two: null,
      //       created_by_user: '7b6d2b48-2c55-4a25-a7ae-8ab32b654a84',
      //     },
      //   ],
      //   letter_circulars: [
      //     {
      //       created_at: '2023-04-27 13:09:32.562708+0530',
      //       entry_type: 'letterscirculars',
      //       content_id: 'df3ec298-07da-458e-8a4c-51fc0fbf9ecf',
      //       slug: 'drop-it-america-and-canada-a-corn-clash-with-mexico-helps-no-one',
      //       content_title:
      //         'Drop it America and Canada: A corn clash with Mexico helps no one',
      //       content_title_hi:
      //         'इसे छोड़ दो अमेरिका और कनाडा: मेक्सिको के साथ एक मकई संघर्ष किसी की मदद नहीं करता है',
      //       content:
      //         'Adam Smith wrote “corn is a necessary, silver is only a superfluity” to contrast the centrality of food when compared with more commercial indulgences. It’s worth remembering that statement at a time when a new trade fight is brewing over corn, even as the Global South confronts multiple food crises.\n\nIn February, Mexico issued a decree banning genetically modified (GMO) corn — domestic or imported — for human consumption. This affects white corn, used in tortillas and dough. Mexico has justified its move as driven by a desire to ensure food security and biodiversity by preserving its diverse varieties of maize. Mexico, according to the decree, also wants to protect the interests and practices of traditional farmers.',
      //       content_hi:
      //         'एडम स्मिथ ने अधिक व्यावसायिक भोगों की तुलना में भोजन की केंद्रीयता के विपरीत "मकई एक आवश्यक है, चांदी केवल एक अतिप्रवाह है" लिखा है। यह कथन ऐसे समय में याद रखने योग्य है जब मकई पर एक नई व्यापार लड़ाई चल रही है, भले ही ग्लोबल साउथ कई खाद्य संकटों का सामना कर रहा हो।\n\nफरवरी में, मेक्सिको ने आनुवंशिक रूप से संशोधित (जीएमओ) मकई - घरेलू या आयातित - मानव उपभोग के लिए प्रतिबंध लगाने का एक फरमान जारी किया। यह सफेद मकई को प्रभावित करता है, जिसका उपयोग टॉर्टिला और आटे में किया जाता है। मेक्सिको ने मक्का की विविध किस्मों को संरक्षित करके खाद्य सुरक्षा और जैव विविधता सुनिश्चित करने की इच्छा से प्रेरित अपने कदम को सही ठहराया है। मेक्सिको, डिक्री के अनुसार, पारंपरिक किसानों के हितों और प्रथाओं की रक्षा भी करना चाहता है।',
      //       primary_attachment_pdf: 'api/sample-doc',
      //       primary_attachment_label: 'Download Letter & Circular Document',
      //       primary_attachment_label_hi:
      //         'पत्र और परिपत्र दस्तावेज़ डाउनलोड करें',
      //       new_status: 'is_new',
      //       lettercircular_headings: [],
      //       lettercircular_paras: [],
      //       lettercircular_datetime: [],
      //       lettercircular_pdfs: [],
      //     },
      //     {
      //       created_at: '2023-04-27 13:08:24.292349+0530',
      //       entry_type: 'letterscirculars',
      //       content_id: '362e9aff-5a51-421d-840e-481d7aa43c91',
      //       slug: 'fugees-rapper-found-guilty-in-us-over-1mdb-case',
      //       content_title: 'Fugees rapper found guilty in US over 1MDB case',
      //       content_title_hi:
      //         'अमेरिका में 1MDB मामले में भगोड़े रैपर को दोषी पाया गया',
      //       content:
      //         'Fugees rapper Prakazrel “Pras” Michel has been convicted in the United States of conspiring with the financier at the centre of Malaysia’s 1MDB scandal to illegally lobby the US government.',
      //       content_hi:
      //         'Fugees रैपर Prakazrel "Pras" मिशेल को संयुक्त राज्य अमेरिका में मलेशिया के 1MDB घोटाले के केंद्र में फाइनेंसर के साथ अवैध रूप से अमेरिकी सरकार की पैरवी करने की साजिश रचने का दोषी ठहराया गया है।',
      //       primary_attachment_pdf: 'api/sample-doc',
      //       primary_attachment_label: 'Download Letter & Circular Document',
      //       primary_attachment_label_hi:
      //         'पत्र और परिपत्र दस्तावेज़ डाउनलोड करें',
      //       new_status: 'is_new',
      //       lettercircular_headings: [],
      //       lettercircular_paras: [],
      //       lettercircular_datetime: [],
      //       lettercircular_pdfs: [],
      //     },
      //   ],
      //   projects: [
      //     {
      //       content_title:
      //         'AdChoices The Indian Express The Indian Express Why have Maoists killed again — and why do they repeatedly attack in Chhattisgarh?',
      //       content_title_hi:
      //         'माओवादी फिर से क्यों मारे गए हैं - और वे छत्तीसगढ़ में बार-बार हमला क्यों करते हैं?',
      //       slug: 'adchoices-the-indian-express-the-indian-express-why-have-maoists-killed-again-and-why-do-they-repeatedly-attack-in-chhattisgarh',
      //       content:
      //         "Ten personnel of the Chhattisgarh Police's District Reserve Guard (DRG) and the civilian driver of their vehicle were reported killed in an IED attack by Maoists in the state's Dantewada district on Wednesday (April 26).",
      //       content_hi:
      //         'बुधवार (26 अप्रैल) को राज्य के दंतेवाड़ा जिले में माओवादियों द्वारा किए गए एक आईईडी हमले में छत्तीसगढ़ पुलिस के जिला रिजर्व गार्ड (डीआरजी) के दस कर्मियों और उनके वाहन के असैन्य चालक के मारे जाने की खबर है।',
      //       new_status: 'is_new',
      //       project_primary_images: [],
      //       project_secondary_images: [
      //         {
      //           project: 'b516c85c-c8ae-4979-8814-36d56cd9c14d',
      //           project_image: 'https://picsum.photos/800/300',
      //           seq_no: 2,
      //         },
      //       ],
      //       project_headings: [
      //         {
      //           project: 'b516c85c-c8ae-4979-8814-36d56cd9c14d',
      //           content_title:
      //             'A good heading to display more content (Heading No.1)',
      //           content_title_hi:
      //             'अधिक सामग्री प्रदर्शित करने के लिए एक अच्छा शीर्षक  (Heading No.1)',
      //           seq_no: 0,
      //         },
      //       ],
      //       project_paras: [
      //         {
      //           project: 'b516c85c-c8ae-4979-8814-36d56cd9c14d',
      //           content:
      //             "The attack took place more than two years after the April 2021 ambush by Maoists in Chhattisgarh's Bijapur district, in which 22 security forces personnel were killed.",
      //           content_hi:
      //             'छत्तीसगढ़ के बीजापुर जिले में माओवादियों द्वारा अप्रैल 2021 में घात लगाकर किए गए हमले के दो साल से अधिक समय बाद यह हमला हुआ, जिसमें 22 सुरक्षा बल के जवान मारे गए थे।',
      //           seq_no: 1,
      //         },
      //       ],
      //       project_datetime: [],
      //       project_pdfs: [],
      //     },
      //     {
      //       content_title: 'The era of the tween icon is over as we know it',
      //       content_title_hi:
      //         'जैसा कि हम जानते हैं कि ट्वीन आइकन का युग समाप्त हो गया है',
      //       slug: 'the-era-of-the-tween-icon-is-over-as-we-know-it',
      //       content:
      //         "Social media's accelerated coming-of-age means the awkward, nostalgic, Y2K era when being sixteen felt like the peak of life is long gone.",
      //       content_hi:
      //         'सोशल मीडिया के तेजी से आने का मतलब अजीब, उदासीन, Y2K युग है जब सोलह साल की उम्र में ऐसा महसूस होता है कि जीवन का शिखर लंबा चला गया है।',
      //       new_status: 'is_new',
      //       project_primary_images: [],
      //       project_secondary_images: [
      //         {
      //           project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
      //           project_image: 'https://picsum.photos/800/300',
      //           seq_no: 3,
      //         },
      //       ],
      //       project_headings: [],
      //       project_paras: [
      //         {
      //           project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
      //           content:
      //             'Almost 20 years ago, nine young actresses gathered for a now infamous Vanity Fair cover shoot. The pull-out spread would be something of a magnum opus for the magazine: a stocktake on the best and brightest teen entertainers of the era, those for whom fame was already second-nature. For a publication whose hard-hitting journalism had long catered to a very specific consumer, it felt radical. Now, with the intention that its pages be ripped from their spine and taped to bedroom walls, Vanity Fair was embracing zine culture. And that, in turn, was tween culture. ',
      //           content_hi:
      //             'लगभग 20 साल पहले, नौ युवा अभिनेत्रियाँ अब कुख्यात वैनिटी फेयर कवर शूट के लिए एकत्रित हुई थीं। पुल-आउट प्रसार पत्रिका के लिए एक महान कृति होगा: युग के सर्वश्रेष्ठ और प्रतिभाशाली किशोर मनोरंजनकर्ताओं पर एक स्टॉकटेक, जिनके लिए प्रसिद्धि पहले से ही दूसरी प्रकृति थी। एक ऐसे प्रकाशन के लिए जिसकी कड़ी मेहनत वाली पत्रकारिता ने लंबे समय तक एक विशिष्ट उपभोक्ता को पूरा किया था, यह कट्टरपंथी लगा। अब, इस मंशा के साथ कि इसके पन्नों को उनकी रीढ़ से चीर कर बेडरूम की दीवारों पर टेप से चिपका दिया जाए, वैनिटी फेयर ज़ाइन संस्कृति को अपना रहा था। और वह बदले में, संस्कृति के बीच था।',
      //           seq_no: 0,
      //         },
      //         {
      //           project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
      //           content:
      //             "“I remember wanting to dress like Mary-Kate and Ashley,” says Ivana Rihter, a Los Angeles-based  entertainment journalist and co-host of the celebrity nostalgia podcast, (UN)COVER GIRL. “I wanted Miley's hair, and especially related to Lizzie McGuire. If you turned to TV, it felt like being 16 years old was the peak of life.”",
      //           content_hi:
      //             '"मुझे याद है कि मैं मैरी-केट और एशले की तरह कपड़े पहनना चाहती थी," इवाना रिहटर, लॉस एंजिल्स स्थित एक मनोरंजन पत्रकार और सेलिब्रिटी नॉस्टैल्जिया पॉडकास्ट, (यूएन) कवर गर्ल की सह-होस्ट कहती हैं। "मैं मिली के बाल चाहता था, और विशेष रूप से लिज़ी मैकगायर से संबंधित था। अगर आप टीवी की ओर रुख करते हैं, तो ऐसा लगता है कि 16 साल की उम्र जीवन का चरम था।',
      //           seq_no: 1,
      //         },
      //         {
      //           project: '4d518e81-bdd7-4871-99c5-8831d0a93e6e',
      //           content:
      //             'Long before TikTok choreography or Instagram selfies, Vanity Fair’s 2003 “It’s Totally Raining Teens” portfolio served as one of the sole access points for millions of tweens to their idols. The likes of Mary-Kate and Ashley Olsen, Hilary Duff and Lindsay Lohan were probed for their celebrity crushes, favourite lip glosses and the “number of Juicy Couture outfits” (“No joke, probably 25,” revealed Mandy Moore) they owned. In-book, lesser stars Emma Watson and Solange Knowles also made an appearance. The publication had learned, along with Hollywood and every major label music exec, that pre-teens controlled the purse strings of their parents. And that was a market worth exploring.',
      //           content_hi:
      //             'टिकटॉक कोरियोग्राफी या इंस्टाग्राम सेल्फी से बहुत पहले, वैनिटी फेयर के 2003 "इट्स टोटली रेनिंग टीन्स" पोर्टफोलियो ने लाखों लोगों के लिए उनकी मूर्तियों के लिए एकमात्र एक्सेस पॉइंट के रूप में कार्य किया। मैरी-केट और एशले ओल्सन, हिलेरी डफ और लिंडसे लोहान की पसंद को उनके सेलिब्रिटी क्रश, पसंदीदा होंठ चमक और "रसदार वस्त्र संगठनों की संख्या" ("कोई मजाक नहीं, शायद 25," मैंडी मूर का पता चला) के लिए जांच की गई थी। इन-बुक, कम सितारों एम्मा वाटसन और सोलेंज नोल्स ने भी उपस्थिति दर्ज कराई। प्रकाशन ने हॉलीवुड और हर प्रमुख लेबल संगीत निष्पादन के साथ सीखा था कि पूर्व-किशोर अपने माता-पिता के बटुए को नियंत्रित करते हैं। और वह खोज के लायक बाजार था।',
      //           seq_no: 2,
      //         },
      //       ],
      //       project_datetime: [],
      //       project_pdfs: [],
      //     },
      //     {
      //       content_title:
      //         'The Elephant Whisperers couple Bomman and Bellie receive a warm welcome on IndiGo flight',
      //       content_title_hi:
      //         'एलिफेंट व्हिस्परर्स युगल बोमन और बेली का इंडिगो की उड़ान में गर्मजोशी से स्वागत किया गया',
      //       slug: 'the-elephant-whisperers-couple-bomman-and-bellie-receive-a-warm-welcome-on-indigo-flight',
      //       content:
      //         'The Elephant Whisperers’ couple, Bomman and Bellie, received a warm welcome from the IndiGo pilot and passengers on a flight to Ooty. The documentary featuring the indigenous couple won the Oscar in the Best Documentary Short Subject category this year. It is the first film by an Indian production to win an Academy Award.',
      //       content_hi:
      //         'द एलीफेंट व्हिस्परर्स कपल, बोमन एंड बेली का इंडिगो पायलट और यात्रियों ने ऊटी जाने वाली फ्लाइट में गर्मजोशी से स्वागत किया। स्वदेशी युगल पर बनी इस डॉक्यूमेंट्री ने इस साल बेस्ट डॉक्यूमेंट्री शॉर्ट सब्जेक्ट कैटेगरी में ऑस्कर जीता। यह अकादमी पुरस्कार जीतने वाली भारतीय प्रोडक्शन की पहली फिल्म है।',
      //       new_status: 'is_new',
      //       project_primary_images: [],
      //       project_secondary_images: [
      //         {
      //           project: 'f26da68a-548b-4e32-a4be-f050887bbf4b',
      //           project_image: 'https://picsum.photos/800/300',
      //           seq_no: 0,
      //         },
      //         {
      //           project: 'f26da68a-548b-4e32-a4be-f050887bbf4b',
      //           project_image: 'https://picsum.photos/800/300',
      //           seq_no: 0,
      //         },
      //       ],
      //       project_headings: [],
      //       project_paras: [],
      //       project_datetime: [],
      //       project_pdfs: [],
      //     },
      //     {
      //       content_title:
      //         'Why people dislike Anne Hathaway (and how she\'s dealt with the "Hathahate")',
      //       content_title_hi:
      //         'लोग ऐनी हैथवे को नापसंद क्यों करते हैं (और उसने "हथाटे" के साथ कैसे व्यवहार किया है)',
      //       slug: 'why-people-dislike-anne-hathaway-and-how-shes-dealt-with-the-hathahate',
      //       content:
      //         'The backlash against the actress peaked around 2013, after the Oscars, though it had been growing for some time. The feeling even inspired a hashtag on Twitter: #Hathahate.One of the early reasons given was the fact that Hathaway behaves like a "theater kid," AKA that kid from school who had an over-the-top personality, affected and dramatic.',
      //       content_hi:
      //         'ऑस्कर के बाद 2013 के आसपास अभिनेत्री के खिलाफ प्रतिक्रिया चरम पर थी, हालांकि यह कुछ समय से बढ़ रही थी। इस भावना ने ट्विटर पर एक हैशटैग को भी प्रेरित किया: #Hathahate. दिए गए शुरुआती कारणों में से एक यह तथ्य था कि हैथवे एक "थिएटर किड" की तरह व्यवहार करता है, उर्फ स्कूल का वह बच्चा, जिसके पास ओवर-द-टॉप व्यक्तित्व, प्रभावित और नाटकीय था।',
      //       new_status: 'is_new',
      //       project_primary_images: [],
      //       project_secondary_images: [
      //         {
      //           project: 'b6c71984-9a1d-49f7-a42b-bba819a6d662',
      //           project_image: 'https://picsum.photos/800/300',
      //           seq_no: 0,
      //         },
      //         {
      //           project: 'b6c71984-9a1d-49f7-a42b-bba819a6d662',
      //           project_image: 'https://picsum.photos/800/300',
      //           seq_no: 0,
      //         },
      //         {
      //           project: 'b6c71984-9a1d-49f7-a42b-bba819a6d662',
      //           project_image: 'https://picsum.photos/800/300',
      //           seq_no: 0,
      //         },
      //       ],
      //       project_headings: [],
      //       project_paras: [],
      //       project_datetime: [],
      //       project_pdfs: [],
      //     },
      //   ],
      // },

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

      fluxImages: [],
      responseData: null,
      isSwitch: false,
      home_data: [],
      latest_updates: [],
      carousel_items: [],
      letter_circulars: [],
      tenders: [],
      news_event_item: [],
      esteemed_authorities: [],
      about_ancorp: [],
      ancorp_contact_details: [],
      projects: [],
    };
  },

  methods: {
    // ...mapActions({
    //   setPersisitingData: 'setPersisitingData',
    // }),
    getFinalHeaderHeight() {
      if (process.client) {
        this.$nextTick(() => {
          // console.log("MAIN HEADER---->",document.getElementById("mainHeader").offsetHeight)
          return document.getElementById('mainHeader').offsetHeight;
        });
      }
    },
    getTenderItemClass(item) {
      // console.log("getTenderItemClass-->",item)
      var cls = 'new-badge mg-8';

      item.updated_at != null
        ? (cls = 'new-badge-extended mg-8')
        : 'new-badge mg-8';

      return cls;
    },
    resolveImageSrc(url, project, index) {
      // console.log("URL is",url,project,index);
      // ['project_secondary_images'][0]['project_image']
      //

      var remainingUrl = '';

      if (project['project_secondary_images'] != undefined) {
        if (project.project_secondary_images.length > 0) {
          //
          remainingUrl = `${project['project_secondary_images'][0]['project_image']}`;
        }
      } else {
        //
        remainingUrl = '';
      }

      return `${remainingUrl}`;
    },

    bidClosed(date) {
      return this.$moment(date).isBefore();
    },

    dateTime(value) {
      let x = '';
      this.$i18n.locale == 'hi'
        ? (x = moment(value).format('LLLL'))
        : (x = this.$moment(value).format('LLLL'));
      return x;
    },

    showBidCriticalMessage(date) {
      //

      if (this.$moment(date).diff(this.$moment.now(), 'days') <= 10) {
        return true;
      } else {
        return false;
      }
    },

    calculateBidClosingDaysLeft(date) {
      return moment(date).locale(this.$i18n.locale).diff(moment.now(), 'days');
    },
  },
};
</script>

<style>
html {
  overflow-x: hidden;
}

/* p{
  text-align: justify;
} */

.mt-1 {
  margin-top: 1rem;
}

.mt-2 {
  margin-top: 2rem;
}

.mt-3 {
  margin-top: 3rem;
}

.pb-1 {
  padding-bottom: 1rem;
}

.pb-2 {
  padding-bottom: 2rem;
}

.pb-3 {
  padding-bottom: 3rem;
}

.pb-4 {
  padding-bottom: 4rem;
}

.pb-5 {
  padding-bottom: 5rem;
}

.pt-3 {
  padding-top: 3rem;
}

.mb-1 {
  margin-bottom: 1rem;
}

.mb-2 {
  margin-bottom: 2rem;
}

.mb-3 {
  margin-bottom: 3rem;
}

.pd-lr-8 {
  padding: 0 8%;
}

.pd-t-2 {
  padding-top: 2rem;
}

.pd-b-2 {
  padding-bottom: 2rem;
}

.pd-b-6 {
  padding-bottom: 6rem !important;
}

.v-gap {
  min-height: 4rem;
  width: 100%;
}

.attachments-and-insertions {
  width: 50%;
}

.pt-1 {
  padding-top: 1rem;
}

.plr-1 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.plr-4 {
  padding-left: 4rem;
  padding-right: 4rem;
}

.mt-4 {
  margin-top: 4rem;
}

.publish-date-cont {
  display: flex;
  color: #c5283d;
  font-weight: 604;
}

.empty-ul-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#main-content-section,
#main-content-section-two {
  height: inherit;
}

#main-content-section-two {
  display: flex;
}

#main-content-section-two > div {
  display: inherit;
}

#main-content-section > div:nth-child(1),
#main-content-section > div:nth-child(2),
#main-content-section-two > div > div:nth-child(1),
#main-content-section-two > div > div:nth-child(2) {
  flex: 1 0 0;
}

#main-content-section > div:nth-child(1) > div > div > ul,
#main-content-section > div:nth-child(1) > div > div > div {
  margin-left: 0.5rem;
}

#main-content-section > div:nth-child(1),
#main-content-section-two > div:nth-child(1) {
  margin-bottom: 2rem;
  height: inherit;
  width: 100%;
}

.ul-l,
.ul-r,
#main-content-section-two > div > div:nth-child(1) > ul {
  height: inherit;
  overflow-y: scroll;
  height: inherit;
}

#main-content-section > div:nth-child(1) {
  /* background-color:green; */
}

#main-content-section > div:nth-child(1) > div > div {
  height: inherit;
}

#main-content-section-two > div > div:nth-child(2) > ul {
  overflow-y: scroll;
}

#main-content-section > div:nth-child(1) > div > div > div,
#main-content-section-two > div > div:nth-child(1) > div,
#main-content-section-two > div > div:nth-child(2) > div {
  margin-right: 0.5rem;
  border-top: 1px solid #c7c7c7cc;
  box-shadow: 0px 12px 23px rgba(0, 0, 0, 0.05);
}

#main-content-section-two > div > div:nth-child(2) > ul {
  margin-right: 0.5rem !important;
}

#main-content-section > div:nth-child(2) > div > ul {
  overflow: hidden !important;
}

#main-content-section > div:nth-child(2) > div {
  height: 27.2rem;
}

/* This has to be improved in all breakpoints */
#main-content-section > div:nth-child(1) > div > div > ul,
#main-content-section-two > div > div:nth-child(1) > ul,
#main-content-section-two > div > div:nth-child(2) > ul {
  /* background-color: #7e2b2c; */
  height: 22.8rem;
  display: flex;
  flex-direction: column;
  /* background-color:red; */
}

#main-content-section > div:nth-child(1) > div > div:nth-child(1) {
  height: auto;
  overflow-y: scroll;
}

.empty-ul-container div:nth-child(2) {
  /* background-color: #7E2B2C;
  padding: 1rem;;
  background-color: #ffffff;
  opacity: 0.2;
  background-size: 4px 4px;
  background-image: repeating-linear-gradient(45deg, #000000 0, #000000 0.4px, #ffffff 0, #ffffff 50%);   */
}

.empty-ul-tender {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80%;
}

.empty-ul-tender li {
  position: relative;
}

.empty-ul-tender li:nth-child(1) {
  top: 10%;
}

.empty-ul-tender li:nth-child(2) {
  border: none;
  top: 12%;
}

.empty-ul-tender li:nth-child(2) a {
  padding-left: 0;
}

.empty-tender-state {
}

.newsevents-cont {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mpw-page-para {
  font-family: 'Montserrat';
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2.2rem;
  margin-bottom: 3rem;
}

.mpw-page-para-note {
  font-family: 'Montserrat';
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2.2rem;
}

.mpw-page-ul {
  font-size: 1.5rem;
}

.mpw-h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  /* color: #3e3e3e; */
  margin-top: 4rem;
}

.page-preview {
  /* background-color: white; */
  padding: 3rem unset;
}

.detail-view {
  /* background-color: white; */
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 6rem;
  padding-bottom: 6rem;

  display: flex;
  flex-direction: column;
}

.mpw-preview-h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 701;
  /* color: #3e3e3e; */
  margin-top: 1rem;
}

.mpw-preview-paragraph {
  font-family: Montserrat;
  font-weight: 400;
  font-size: 1.53em;
  line-height: 2.6rem;
  margin-bottom: 1.5rem;
}

.bid-closing-p {
  font-weight: 550;
}

.page-heading-container {
  padding-left: 4rem;
  padding-right: 4rem;
  border-top: 2px solid #ededed;
}

.page-breadcrumb-container {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.mpw-preview-h2 {
  font-size: 1.8rem;
  font-family: 'Montserrat';

  font-weight: 400;
}

.mpw-preview-h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 301;
  font-family: 'Montserrat';
}

.mpw-preview-h3-proj {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 601;
  font-family: 'Montserrat';
}

.pdf-comp-preview-container {
  padding: 1rem 0;
  display: flex;
  border-bottom: 2px solid #ededed;
}

.pdf-comp-preview-container:hover {
  /* background-color: #ededed94; */
  cursor: pointer;
}

.pdf-preview-link {
  border-right: 1px solid #dcdbe1;
  padding: 0 1rem;
  flex: 1 0 0;
  display: flex;
  align-items: center;
}

.pdf-preview-link a {
  font-family: Montserrat;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  /* color: #3e3e3e; */
  font-size: 1.5rem;
}

.pdf-preview-icon-cont {
  flex: 0 0 0;
  cursor: pointer;
}

.pdf-preview-icon-cont::after {
  border-bottom: 2px solid #ededed;
}

.pdf-preview-icon {
  background: url('~assets/imgs/pdf-prev-icon.png') no-repeat;
  width: 3rem;
  background-position: center;
  display: inline-block;
  height: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  background-size: contain;
}

.mpw-preview-h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 701;
  /* color: #3e3e3e; */
  margin-top: 1rem;
}

.tender-last-date-cont {
  padding: 0.5rem 4rem;
  display: flex;
  font-weight: 514;
  flex-direction: column;
}

.tender-last-date {
  display: flex;
}

.tender-critical-msg {
  font-weight: 401;
  /* color: #c9272a; */
}

.news-event-ul {
  height: 100%;
  margin-bottom: 0 !important;
}

.tender-last-date-submission {
  padding-left: 2rem;
}

.tender-ul {
  height: 100%;
}

.bottom-portion {
  margin-top: 3rem;
}

.map-iframe-cont {
  height: 100%;
}

.map-iframe {
  border: 0px none;
  width: 100%;
  height: inherit;
}

.contact-details-section {
  padding-bottom: 3rem;
}

.contact-details {
  background: url('~assets/imgs/contact_us.png') no-repeat;
  background-size: cover;
  display: flex;
  width: inherit;
}

.contact-details-container {
  width: 100%;
}

.ancorp-address-container {
  padding-top: 1rem;
  background-color: #000000a3;
  color: white;
  width: 50%;
}

.contact-container {
  width: inherit;
  display: flex;
}

.ancorp-address-cont {
  width: 50%;
}

.map-container {
  padding: 1rem;
  width: 50%;
}

.address-row {
  display: flex;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
}

.address-row p {
  padding-left: 1.5rem;
  display: flex;
}

div.address-row:nth-child(5) > a:nth-child(2) {
  padding-left: 1.5rem;
  display: flex;
}

.active-link-mobile {
  font-weight: 501 !important;
  font-size: 1.3rem;
}

#external-links-container {
  /* background-color: white; */
}

.call-center-phone-cont {
  display: flex;
  padding-left: 4rem;
  padding-right: 4rem;
}

.call-center-phone-cont p {
  padding-left: 1.5rem;
  display: flex;
}

.call-center-phone-cont {
  text-align: center;
}

.location-pin-spn {
  background: url('~assets/imgs/location.png') no-repeat;

  width: 2.2rem;
  display: flex;
  background-size: contain;
}

.carousel-play-spn {
  background: url('~assets/imgs/play.png') no-repeat;
  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  background-size: contain;
  cursor: pointer;
}

.carousel-pause-spn {
  background: url('~assets/imgs/pause.png') no-repeat;

  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  background-size: contain;
  cursor: pointer;
}

.play-pause-cont {
  height: 4.5rem;
  cursor: pointer;
}

.phone-spn {
  background: url('~assets/imgs/phone-call.png') no-repeat;

  width: 2.2rem;
  display: flex;
  background-size: contain;
}

.call-center-phone-spn {
  background: url('~assets/imgs/call-center.png') no-repeat;

  width: 2.2rem;
  display: flex;
  background-size: contain;
}

.web-info-manager-spn {
  background: url('~assets/imgs/globe.png') no-repeat;

  width: 2.2rem;
  display: flex;
  background-size: contain;
}

.fax-spn {
  background: url('~assets/imgs/fax.png') no-repeat;

  width: 2.2rem;
  display: flex;
  background-size: contain;
}

.email-spn {
  background: url('~assets/imgs/email.png') no-repeat;
  width: 2.2rem;
  display: flex;
  background-size: contain;
}

.view-all-proj {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.services-container {
  display: flex;
  justify-content: space-between;
}

.service {
  background-color: #ab1e20;
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;
  margin-bottom: 1rem;
  border-radius: 6px;
  flex: 1 0 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.service-p {
  font-size: 2.2rem !important;
  text-align: center !important;
  font-weight: bold !important;
  color: white;
}

.services-container div:nth-child(2) {
  margin-left: 1rem;
  margin-right: 1rem;
}

.service-img {
  width: 10rem;
  align-self: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding-bottom: 1rem;
}

.boardmember-thumb-container {
  display: flex;
  flex-wrap: wrap;
}

.boardmember-thumb {
  width: inherit;
  height: calc(25rem + 1vw);
  position: relative;
  /* background: #f8f8f8; */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}

.boardmember-img-cont {
  width: calc(18rem + 1vw);
  margin-bottom: 1rem;
}

.boardmember-img-cont {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdbe1;
}

.boardmember-thumb-img {
  display: flex;
  object-fit: contain;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  height: 50%;
  border-bottom: 1px solid #ededed;
  background-color: #eaeaea;
}

.member-info {
  /* color: #3e3e3e; */
}

.member-name {
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.28rem;
}

.member-designation {
  padding-top: 1.5rem;
  font-weight: 500;
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
}

.member-email {
  padding-top: 1.5rem;
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
}

.member-additional-designation {
  text-align: center;
  margin-top: 1.8rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
}

.proj-thumb-title {
  border: 1px solid #dcdbe1;
  border-top: none;
  font-weight: 401;
  text-decoration: underline;
  min-height: 6.5rem;
  height: 6.5rem;
}

.proj-thumb-title a {
  display: block;
  text-align: center;
  padding: 1.5rem 0.8rem;
}

.img-dimensions {
  /* width: inherit;
  height: inherit; */
}

.project-thumb-container {
  /* display: flex;
    flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-auto-rows: auto;
  grid-gap: 0.5rem;
}

.proj-thumb {
  /* width: inherit;
  height: calc(22rem + 1vw);
  position: relative;
  cursor: pointer; */
  position: relative;
}

.thumb-overlay {
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: #000000ad;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.projects-cont {
  /* background-color: white; */
}

.projects-cont h3 {
  font-size: 1.5rem;
  font-weight: 550;
  padding-top: 2.5rem;
  padding-bottom: 1rem;
}

.projects-cont p {
  font-size: 1.3rem;
  font-weight: 400;
  padding-bottom: 2.5rem;
}

.thumb-img-cont {
  /* margin-right: 0.5rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column; */
}

.thumb-img-cont,
.thumb-image-insertion-row-items {
  /* max-width: calc(24.6rem + 1vw);
  width: calc(24.6rem + 1vw);
  min-width: calc(24.6rem + 1vw); */
}

.proj-thumb:hover .thumb-overlay {
  display: flex;
}

.thumb-overlay a {
  color: white;
  border: 1px solid white;
  padding: 1rem 5rem;
  text-decoration: none;
}

.proj-thumb {
  /* width: inherit;
height: calc(22rem + 1vw);
position: relative;
cursor: pointer;   */
}

.proj-thumb-img {
  /* display: flex; */
  object-fit: cover;
  border: 1px solid #dcdbe1;
  min-height: 10rem;
  height: 20rem;
  width: 100%;
}

.pt-2 {
  padding-top: 2rem !important;
}

.pb-1 {
  padding-bottom: 1rem;
}

.plr-4 {
  padding-left: 4rem;
  padding-right: 4rem;
}

.usp-img-cont p {
  text-align: center;
  padding-top: 3rem;
  font-weight: 700;
  color: white;
  font-size: 1.5rem;
}

.ancorp-page-paragraph {
  font-size: 1.3rem;
}

.pb-3 {
  padding-bottom: 3rem;
}

.flx-col {
  display: flex;
  flex-direction: column;
}

.usp-cont {
  display: flex;
  width: 70%;
  align-items: center;
  /* background-color: white; */
  margin-bottom: 1rem;
}

.usp-cont h3 {
  margin-left: 1rem;
  font-size: 1.3rem;
  font-weight: 400;
}

.usp-img-cont {
  background-color: #ab1e20;
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;
  margin-bottom: 1rem;
}

.bg-unset {
  background-color: unset !important;
}

.usp-li {
  display: flex;
  padding-left: 4rem;
  padding-right: 4rem;
}

.usp-img {
  width: 10rem;
  align-self: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.ancorp-msg-cont {
  display: flex;
  background-color: #ab1e20;
}

.ancorp-msg {
  width: 50%;
  display: flex;
  align-items: center;
  background-color: #7e2b2c;
}

.ancorp-msg h2 {
  padding-left: 4rem;
  padding-right: 4rem;
  font-weight: 400;
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-align: center;
}

.ancorp-page-img {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ancorp-page-img-glyph {
  width: calc(50% + 3vw);
  padding: 2rem 0;
}

.download-link {
  text-decoration: underline;
  /* color: #100072 !important; */
}

.view-all-link {
  padding: 0.5rem;
}

.primary-section {
  display: flex;
}

.authorities-item-cont {
  display: flex;
}

.authority-img {
  width: 6rem;
  height: 5rem;
  object-fit: contain;
}

.authority-name {
  font-size: 1.5rem;
  font-weight: 300;
  padding-bottom: 0.5rem;
}

.authority-description {
  font-size: 1rem;
  font-weight: 300;
  padding-bottom: 0.5rem;
}

.mg-8 {
  margin-right: 4rem !important;
}

.right-div-cont {
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  margin-right: 1rem;
}

.left-div-cont {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
}

.ul-l {
  margin-right: 0.5rem;
}

.ul-r {
  margin-right: 0.5rem;
  margin-bottom: 2rem;
  padding-top: 0.5rem !important;
}

.item-content-container {
  display: flex;
  padding-bottom: 1rem;
}

.ancorp-ul {
  padding-top: 1rem;
  /* background-color: white; */
  box-shadow: 0px 12px 23px rgba(0, 0, 0, 0.05);
}

.contact-details {
  margin-right: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px 12px 23px rgba(0, 0, 0, 0.05);
}

.ancorp-details {
  margin-right: 0;
  width: 100%;
  padding-top: 3rem;
  /* background-color: white; */
  box-shadow: 0px 12px 23px rgba(0, 0, 0, 0.05);
}

.ancorp-details p {
  padding-left: 4rem;
  padding-right: 4rem;
  font-weight: 400;
  line-height: 2.2rem;
}

.ul-full {
  margin-right: 0;
  width: 100%;
}

.authority-info-cont {
  padding-left: 1rem;
}

.ancorp-authorities-li {
  list-style: none;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  border-bottom: 1px solid #ededed;
  margin-top: 1rem;
  word-wrap: anywhere;
  padding-bottom: 1.5rem;
}

.ancorp-li {
  list-style: none;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #ededed;
  padding-top: 1rem;
  word-wrap: anywhere;
}

.ancorp-li a {
  padding-left: 4rem;
}

.b-date {
  font-size: 1rem;
  font-weight: 301;
  padding-bottom: 0.5rem;
  padding-left: 4rem;
  padding-right: 4rem;
}

.ancorp-primary-heading {
  font-weight: 400 !important;
  font-size: 2rem !important;
  padding-bottom: 1.5rem !important;
  word-wrap: anywhere !important;
}

.primary-section {
  margin-top: 3rem;
}

#navigation-container-xl-secondary {
  height: 4rem;
  /* background-color: white; */
  display: flex;
  justify-content: center;
}

#tender-heading,
#esteemed-auth-heading,
#news-event-heading,
#letter-circular-heading,
#about-ancorp-heading,
.ancorp-page-paragraph,
.ancorp-msg h2,
.usp-li,
.projects-services-heading,
.projects-cont-sub-heading,
#projects-services-heading,
#contact-us-heading {
  padding-left: 4rem;
  padding-right: 4rem;
}

.footer-row {
  padding-left: 4rem;
  padding-right: 4rem;
}

#contact-us-heading,
.address-row,
.services-container {
  padding-left: 4rem;
  padding-right: 4rem;
}

@media only screen and (min-width: 300px) and (max-width: 1200px) {
  #external-links-container {
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
    padding-left: 0;
    padding-right: 0;
  }
  #external-links-container li {
    display: flex;
    justify-content: center;
  }

  #external-links-container li a {
    width: 12rem !important;
    justify-content: center;
    display: flex;
  }

  .external-logos {
  }

  #np_img {
  }

  #corp_dept {
  }

  #digital_india_img {
  }

  #meity_img {
  }
  #jankari_img {
  }
  #mygov_img {
  }
}

@media only screen and (min-width: 320px) and (max-width: 530px) {
  .container {
    top: 0;
    position: relative;
  }

  .primary-section {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  #main-content-section > div:nth-child(2) > div {
    height: auto;
  }

  #main-content-section > div:nth-child(2) > div > ul,
  #main-content-section > div:nth-child(1) > div > div > ul,
  #main-content-section > div:nth-child(1) > div > div > div,
  #main-content-section-two > div > div:nth-child(1) > ul,
  #main-content-section-two > div > div:nth-child(1) > div {
    margin-left: 0.5rem !important;
    margin-right: 0.5rem !important;
  }

  .ul-r {
    margin-bottom: 2rem !important;
  }

  .ul-l {
    margin-right: 0 !important;
  }

  .empty-ul-tender li:nth-child(2) {
    top: unset !important;
  }

  .project-thumb-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-auto-rows: auto;
    grid-gap: 0.5rem;
  }

  .proj-thumb {
  }

  .thumb-overlay {
  }

  .proj-thumb-img {
    min-height: 10rem;
    height: 8rem;
    width: 100%;
  }
}

@media only screen and (min-width: 360px) and (max-width: 530px) {
  .project-thumb-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    grid-auto-rows: auto;
    grid-gap: 0.5rem;
  }

  .proj-thumb {
  }

  .thumb-overlay {
  }

  .proj-thumb-img {
    min-height: 20rem;
    height: 20rem;
    width: 100%;
  }
}

@media only screen and (min-width: 531px) and (max-width: 1011px) {
  .mainHolder {
    display: flex;
    flex-direction: column;
  }

  .container {
    top: 0;
    position: relative;
  }

  .gallery-thumb {
    /* height: calc(24rem + 1vw) !important; */
  }

  .gallery-img-cont {
    /* width: 100% !important; */
  }

  .project-thumb-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-auto-rows: auto;
    grid-gap: 0.5rem;
  }

  .proj-thumb {
  }

  .thumb-overlay {
  }

  .proj-thumb-img {
    min-height: 20rem;
    height: 20rem;
    width: 100%;
  }
}

@media only screen and (min-width: 320px) and (max-width: 767px) {
  .b-date {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* This has to be improved in all breakpoints */

  #main-content-section-two > div {
    display: flex;
    flex-direction: column;
  }

  #main-content-section-two > div > div:nth-child(2) > ul,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-left: 0.5rem !important;
  }

  #main-content-section > div:nth-child(1) > div > div > div,
  #main-content-section-two > div > div:nth-child(1) > div,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  #news-event-heading,
  #about-ancorp-heading,
  #projects-services-heading {
    padding-top: 0 !important;
  }

  #main-content-section-two > div > div:nth-child(2) > ul,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-right: 0.5rem !important;
  }

  .primary-section {
    margin-top: 0;
  }

  .tender-ul,
  .ul-r {
    margin-bottom: 0 !important;
  }

  #main-content-section > div:nth-child(1) > div > div > ul,
  #main-content-section-two > div > div:nth-child(1) > ul,
  #main-content-section-two > div > div:nth-child(2) > ul {
    /* background-color: #7e2b2c; */
    height: 22.8rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 0 !important;
    /* background-color:red; */
  }

  .ancorp-page-img-glyph {
    width: calc(30% + 3vw);
  }

  h2 {
    padding-top: 2rem;
  }

  /* Above ones has to be improved in all breakpoints */

  .ancorp-li a {
    padding-left: 1rem;
  }

  .tender-last-date-cont {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .primary-section {
    flex-direction: column-reverse;
  }

  .tender-ul {
    margin-bottom: 1rem;
  }

  .img-prv-cont {
    padding: 1rem 0;
  }

  .tender-last-date {
    flex-direction: column;
  }

  .tender-last-date-submission {
    padding-left: 0;
  }

  .ancorp-li a {
    padding: 0;
  }

  .item-content-container {
    display: block;
    padding-bottom: 1rem;
    padding-left: 1rem;
  }

  .authority-img {
    width: 4rem;
    height: 4rem;
  }

  .authority-name {
    font-size: 1.2rem;
  }

  .authority-description {
    font-size: 1rem;
  }

  #tender-heading,
  #esteemed-auth-heading,
  #news-event-heading,
  #letter-circular-heading,
  #about-ancorp-heading,
  .ancorp-page-paragraph,
  .ancorp-msg h2,
  .usp-li,
  .projects-services-heading,
  .projects-cont-sub-heading,
  #projects-services-heading,
  #contact-us-heading,
  .address-row,
  .services-container {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .ancorp-primary-heading {
    font-size: 1.4rem !important;
    font-weight: 401;
  }

  .ancorp-msg-cont {
    flex-direction: column;
  }

  .ancorp-msg {
    width: 100%;
  }

  .ancorp-msg h2 {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .ancorp-page-img {
    width: 100%;
  }

  .usp-li {
    flex-direction: column;
    padding: 0 !important;
  }

  .usp-img-cont {
    width: 100%;
    margin-bottom: 0;
  }

  .usp-img {
    width: 5rem;
  }

  .usp-cont {
    width: 100%;
  }

  .usp-cont h3 {
    margin: 0;
    padding: 4rem 2rem;
    text-align: center;
  }

  .ancorp-li {
  }

  .viewable-link-cont {
    display: flex;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
  }

  .contact-container {
    flex-direction: column;
  }

  .ancorp-address-container {
    width: 100%;
  }

  .services-container {
    flex-direction: column;
  }

  .services-container div {
    margin: 1rem;
  }

  .service {
    width: unset;
  }

  .service-p {
    text-align: center;
    padding-top: 3rem;
    font-weight: 700;
    color: white;
    font-size: 1.3rem !important;
  }

  .projects-cont h3 {
    font-size: 1.2rem !important;
  }

  .right-div-cont {
    margin-right: unset;
  }

  .empty-ul-container {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  .ul-r {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 2rem;
    padding-top: 0.5rem !important;
  }

  .ul-full {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    width: unset;
  }

  .item-content-container {
    padding-right: 1rem;
  }

  .thumb-img-cont,
  .thumb-image-insertion-row-items {
    /* max-width: unset;
    width: unset;
    min-width: unset; */
  }

  .thumb-img-cont {
    /* margin-right: unset;
    width: 100%; */
  }

  .thumb-overlay {
    width: 100%;
  }

  .ancorp-msg h2 {
    text-align: center;
    font-weight: 700;
    color: white;
    font-size: 1.3rem;
  }

  .usp-img-cont p {
    text-align: center;
    padding-top: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: 700;
    color: white;
    font-size: 1.3rem;
  }

  .service-p {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .service-img {
    width: 5rem;
  }

  .ancorp-address-container {
    width: 100%;
  }

  .address-row p {
    padding-right: 0.5rem !important;
    padding-right: 0.5rem !important;
    overflow-wrap: anywhere;
  }

  .location-pin-spn,
  .phone-spn,
  .fax-spn,
  .email-spn {
    min-width: 2rem !important;
  }

  .map-container {
    width: 100%;
    height: 30rem;
  }

  .project-thumb-container {
    justify-content: center;
  }

  .page-preview,
  .page-breadcrumb-container,
  .page-heading-container,
  .detail-view {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mpw-preview-h2 {
    font-size: 1.4rem !important;
  }

  .page-breadcrumb-container > div > ol > li > a > span {
    font-size: 1rem;
  }

  .publish-date-cont {
    flex-direction: column;
  }

  .mpw-bid-row,
  .pdf-comp-preview-container {
    flex-direction: column;
  }

  .attachments-and-insertions {
    width: 100%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1011px) {
  /* This has to be improved in all breakpoints */

  .primary-section {
    margin-top: 0;
  }

  .tender-ul,
  .ul-r {
    margin-bottom: 0 !important;
  }

  /* This has to be improved in all breakpoints */

  #main-content-section-two > div {
    display: flex;
    flex-direction: column;
  }

  #main-content-section-two > div > div:nth-child(2) > ul,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-left: 0.5rem !important;
  }

  #main-content-section > div:nth-child(1) > div > div > div,
  #main-content-section-two > div > div:nth-child(1) > div,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  #news-event-heading,
  #about-ancorp-heading,
  #projects-services-heading {
    padding-top: 0 !important;
  }

  #main-content-section-two > div > div:nth-child(2) > ul,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-right: 0.5rem !important;
  }

  .primary-section {
    margin-top: 0;
  }

  .tender-ul,
  .ul-r {
    margin-bottom: 0 !important;
  }

  #main-content-section > div:nth-child(1) > div > div > ul,
  #main-content-section-two > div > div:nth-child(1) > ul,
  #main-content-section-two > div > div:nth-child(2) > ul {
    /* background-color: #7e2b2c; */
    height: 22.8rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 0 !important;
    /* background-color:red; */
  }

  .ancorp-page-img-glyph {
    width: calc(30% + 3vw);
  }

  h2 {
    padding-top: 2rem;
  }

  /* Above ones has to be improved in all breakpoints */

  .b-date {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .ancorp-li a {
    padding-left: 2rem;
  }

  .tender-last-date-cont {
    padding-left: 2rem;
  }

  .primary-section {
    flex-direction: column-reverse;
  }

  .tender-ul {
    margin-bottom: 2rem;
  }

  .tender-last-date {
    flex-direction: row;
  }

  .tender-last-date-submission {
    padding-left: 2rem;
  }

  #tender-heading,
  #esteemed-auth-heading,
  #news-event-heading,
  #letter-circular-heading,
  #about-ancorp-heading,
  .ancorp-page-paragraph,
  .ancorp-msg h2,
  .usp-li,
  .projects-services-heading,
  .projects-cont-sub-heading,
  #projects-services-heading,
  #contact-us-heading {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .img-prv-cont {
    padding: 1rem 0;
  }

  .ul-l,
  .ul-r,
  .ul-full {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    width: unset;
  }

  .right-div-cont {
    margin-right: 0;
  }

  .tender-ul,
  .ul-r {
    margin-bottom: 3rem !important;
  }

  .all-services {
    display: flex;
    flex-direction: column;
  }

  .services-container {
    flex-direction: column;
  }

  .service {
    width: unset;
  }

  .services-container div {
    margin: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .ancorp-msg-cont {
    flex-direction: column;
  }

  .ancorp-msg {
    width: 100%;
  }

  .ancorp-msg h2 {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .ancorp-page-img {
    width: 100%;
  }

  .project-thumb-container {
    justify-content: center;
  }

  .thumb-img-cont,
  .thumb-image-insertion-row-items {
    /* max-width: unset;
    width: 100%;
    min-width: unset; */
  }

  .services-container div:nth-child(2) {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .thumb-img-cont {
    /* margin-right: unset; */
  }

  .thumb-overlay {
    width: 100%;
  }

  .service-img {
    width: 8rem;
  }

  .service-p {
    font-size: 1.5rem !important;
  }

  .usp-li {
    flex-direction: column;
    padding: 0 !important;
  }

  .usp-img-cont {
    width: 100%;
    margin-bottom: 0;
  }

  .usp-img {
    width: 5rem;
  }

  .usp-cont {
    width: 100%;
  }

  .usp-cont h3 {
    margin: 0;
    padding: 4rem 2rem;
    text-align: center;
  }

  .contact-container {
    flex-direction: column;
  }

  .ancorp-address-container {
    width: 100%;
  }

  .map-container {
    width: 100%;
    height: 30rem;
  }

  .address-row {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .footer-cont {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .footer-row {
  }

  .footer-back-to-top-cont {
  }

  .footer-back-to-top-cont h3 {
    text-align: right;
  }

  .project-thumb-container {
    justify-content: center;
  }

  .page-preview,
  .page-breadcrumb-container,
  .page-heading-container,
  .detail-view {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mpw-preview-h2 {
    font-size: 1.4rem !important;
  }

  .page-breadcrumb-container > div > ol > li > a > span {
    font-size: 1rem;
  }

  .publish-date-cont {
    flex-direction: column;
  }

  .mpw-bid-row,
  .pdf-comp-preview-container {
    flex-direction: column;
  }

  .attachments-and-insertions {
    width: 100%;
  }
}

@media only screen and (min-width: 1012px) and (max-width: 1082px) {
  .container {
    top: 0;
    position: relative;
  }

  /* This has to be improved in all breakpoints */

  #main-content-section > div:nth-child(1) > div > div > div,
  #main-content-section-two > div > div:nth-child(1) > div,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  #main-content-section-two > div > div:nth-child(2) > div {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  #main-content-section-two > div > div:nth-child(2) > ul,
  #main-content-section-two > div > div:nth-child(2) > div {
    margin-right: 0.5rem !important;
  }

  .primary-section {
    margin-top: 0;
  }

  .tender-ul,
  .ul-r {
    margin-bottom: 0 !important;
  }

  #main-content-section > div:nth-child(1) > div > div > ul,
  #main-content-section-two > div > div:nth-child(1) > ul,
  #main-content-section-two > div > div:nth-child(2) > ul {
    /* background-color: #7e2b2c; */
    height: 22.8rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 0 !important;
    /* background-color:red; */
  }

  .ancorp-page-img-glyph {
    width: calc(30% + 3vw);
  }

  h2 {
    padding-top: 2rem;
  }

  /* Above ones has to be improved in all breakpoints */

  .primary-section {
    flex-direction: column-reverse;
  }

  .gallery-thumb {
    /* height: calc(24rem + 1vw) !important; */
  }

  .gallery-img-cont {
    /* width: calc(27rem + 3vw); */
  }

  .b-date {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .ancorp-li a {
    padding-left: 2rem;
  }

  .tender-last-date-cont {
    padding-left: 2rem;
  }

  .tender-ul {
    margin-bottom: 2rem;
  }

  .tender-last-date {
    flex-direction: row;
  }

  .tender-last-date-submission {
    padding-left: 2rem;
  }

  .ul-l,
  .ul-r,
  .ul-full {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    width: unset;
  }

  .right-div-cont {
    margin-right: 0;
  }

  .tender-ul,
  .ul-r {
    margin-bottom: 3rem !important;
  }

  #tender-heading,
  #esteemed-auth-heading,
  #news-event-heading,
  #letter-circular-heading,
  #about-ancorp-heading,
  .ancorp-page-paragraph,
  .ancorp-msg h2,
  .usp-li,
  .projects-services-heading,
  .projects-cont-sub-heading,
  #projects-services-heading,
  #contact-us-heading,
  .page-breadcrumb-container,
  .page-heading-container,
  .detail-view {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .img-prv-cont {
    padding: 1rem 0;
  }

  .all-services {
    display: flex;
    flex-direction: column;
  }

  .services-container {
    flex-direction: column;
  }

  .service {
    width: unset;
  }

  .services-container div {
    margin: 1rem;
  }

  .ancorp-msg-cont {
    flex-direction: column;
  }

  .ancorp-msg {
    width: 100%;
  }

  .ancorp-msg h2 {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .ancorp-page-img {
    width: 100%;
  }

  .usp-li {
    flex-direction: column;
    padding: 0 !important;
  }

  .usp-img-cont {
    width: 100%;
    margin-bottom: 0;
  }

  .usp-img {
    width: 5rem;
  }

  .usp-cont {
    width: 100%;
  }

  .usp-cont h3 {
    margin: 0;
    padding: 4rem 2rem;
    text-align: center;
  }

  .contact-container {
    flex-direction: column;
  }

  .ancorp-address-container {
    width: 100%;
  }

  .map-container {
    width: 100%;
    height: 30rem;
  }

  .address-row {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .footer-cont {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .footer-row {
  }

  .footer-back-to-top-cont {
  }

  .footer-back-to-top-cont h3 {
    text-align: right;
  }

  .project-thumb-container {
    justify-content: center;
  }

  .page-preview,
  .page-breadcrumb-container,
  .page-heading-container,
  .detail-view {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mpw-preview-h2 {
    font-size: 1.4rem !important;
  }

  .page-breadcrumb-container > div > ol > li > a > span {
    font-size: 1rem;
  }

  .publish-date-cont {
    flex-direction: column;
  }

  .mpw-bid-row,
  .pdf-comp-preview-container {
    flex-direction: column;
  }

  .attachments-and-insertions {
    width: 100%;
  }
}

@media only screen and (min-width: 1083px) and (max-width: 1220px) {
  .container {
    top: 0;
    position: relative;
  }

  #main-content-section > div:nth-child(2) > div > ul,
  #main-content-section > div:nth-child(1) > div > div > ul,
  #main-content-section > div:nth-child(1) > div > div > div,
  #main-content-section-two > div > div:nth-child(1) > ul,
  #main-content-section-two > div > div:nth-child(1) > div {
    margin-left: 0.5rem !important;
  }

  .b-date {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .ancorp-li a {
    padding-left: 2rem;
  }

  .tender-last-date-cont {
    padding-left: 2rem;
  }

  .primary-section {
    flex-direction: column-reverse;
  }

  .news-event-ul {
    margin-bottom: 2rem !important;
  }

  .tender-ul {
    margin-bottom: 2rem;
  }

  .tender-last-date {
    flex-direction: row;
  }

  .tender-last-date-submission {
    padding-left: 2rem;
  }

  .primary-section {
    margin-top: 0;
  }

  #main-content-section > div:nth-child(2) > div {
    height: auto;
  }

  .tender-ul,
  .news-event-ul,
  .ul-r {
    margin-bottom: 0 !important;
  }

  /* This has to be improved in all breakpoints */

  #main-content-section > div:nth-child(1) > div > div > ul,
  #main-content-section-two > div > div:nth-child(1) > ul,
  #main-content-section-two > div > div:nth-child(2) > ul {
    /* background-color: #7e2b2c; */
    height: 22.8rem;
    display: flex;
    flex-direction: column;
    /* background-color:red; */
  }

  .ancorp-page-img-glyph {
    width: calc(30% + 3vw);
  }

  h2 {
    padding-top: 2rem;
  }

  #tender-heading,
  #esteemed-auth-heading,
  #news-event-heading,
  #letter-circular-heading,
  #about-ancorp-heading,
  .ancorp-page-paragraph,
  .ancorp-msg h2,
  .usp-li,
  .projects-services-heading,
  .projects-cont-sub-heading,
  #projects-services-heading,
  #contact-us-heading,
  .page-breadcrumb-container,
  .page-heading-container,
  .detail-view {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .all-services {
    display: flex;
    flex-direction: column;
  }

  .services-container {
    flex-direction: column;
  }

  .service {
    width: unset;
  }

  .services-container div {
    margin: 1rem;
  }

  .ancorp-msg-cont {
    flex-direction: column;
  }

  .ancorp-msg {
    width: 100%;
  }

  .ancorp-msg h2 {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .ancorp-page-img {
    width: 100%;
  }

  .usp-li {
    flex-direction: column;
    padding: 0 !important;
  }

  .usp-img-cont {
    width: 100%;
    margin-bottom: 0;
  }

  .usp-img {
    width: 5rem;
  }

  .usp-cont {
    width: 100%;
  }

  .usp-cont h3 {
    margin: 0;
    padding: 4rem 2rem;
    text-align: center;
  }

  .service-p {
    font-size: 1.24rem !important;
  }

  .contact-container {
    flex-direction: column;
  }

  .ancorp-address-container {
    width: 100%;
  }

  .map-container {
    width: 100%;
    height: 30rem;
  }

  .address-row {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .footer-cont {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .footer-row {
  }

  .footer-back-to-top-cont {
  }

  .footer-back-to-top-cont h3 {
    text-align: right;
  }

  .project-thumb-container {
    justify-content: center;
  }

  .gallery-thumb {
    /* height: calc(24rem + 1vw) !important; */
  }

  .gallery-img-cont {
    /* width: calc(28rem + 4vw); */
  }

  .page-preview,
  .page-breadcrumb-container,
  .page-heading-container,
  .detail-view {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mpw-preview-h2 {
    font-size: 1.4rem !important;
  }

  .page-breadcrumb-container > div > ol > li > a > span {
    font-size: 1rem;
  }

  .publish-date-cont {
    flex-direction: column;
  }

  .mpw-bid-row,
  .pdf-comp-preview-container {
    flex-direction: column;
  }

  .attachments-and-insertions {
    width: 100%;
  }
}

@media only screen and (min-width: 1221px) and (max-width: 1335px) {
  #esteemed-auth-heading {
    padding-right: 0;
  }

  .ancorp-primary-heading {
    font-size: 1.8rem !important;
    font-weight: 401;
  }

  .projects-cont h3 {
    font-size: 1.24rem;
  }

  .all-services,
  .address-row {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .service-p {
    font-size: 1.8rem !important;
  }

  .footer-row {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .external-logos {
    height: 2rem;
  }

  .gallery-thumb {
    /* height: calc(24rem + 1vw) !important; */
  }

  .gallery-img-cont {
    /* width: calc(30rem + 4vw); */
  }
}

@media screen and (min-width: 1336px) and (max-width: 1366px) {
  .gallery-thumb {
    /* height: calc(24rem + 1vw) !important; */
  }

  .gallery-img-cont {
    /* width: calc(30rem + 6vw); */
  }

  .ancorp-primary-heading {
    font-size: 1.8rem !important;
  }
}

@media screen and (min-width: 1366px) and (max-width: 1519px) {
  .gallery-thumb {
    /* height: calc(19rem + 1vw) !important; */
  }

  .gallery-img-cont {
    /* width: calc(24rem + 2vw) !important; */
  }
}

@media screen and (min-width: 1520px) and (max-width: 1858px) {
  .gallery-thumb {
    /* height: calc(19rem + 1vw) !important; */
  }

  .gallery-img-cont {
    /* width: calc(18vw + 10rem) !important; */
  }
}

.new-badge {
  position: relative;
  display: block;
  width: 3rem;
  overflow-x: clip;
}

.new-badge-extended {
  position: relative;
  display: block;
  width: 10rem;
  overflow-x: clip;
}

.new-badge:before,
.new-badge-extended:before {
  content: '';
  top: 0;
  transform: translateX(100%);
  width: 100%;
  height: 1.8rem;
  position: absolute;
  z-index: 1;
  -webkit-animation: slide 1s infinite;
  animation: slide 1s infinite;
  animation-iteration-count: 30;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(128, 186, 232, 0) 99%,
    rgba(125, 185, 232, 0) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#007db9e8', GradientType=1);
  display: block;
}

/* animation */

@keyframes slide {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
