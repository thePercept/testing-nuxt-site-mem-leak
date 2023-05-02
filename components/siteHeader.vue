<template>
  <c-box
    as="header"
    width="100%"
    v-bind="mainStyles[colorMode]"
    display="flex"
    flex-direction="column"
    id="mainHeader"
  >
    <c-box class="preferences-container" id="pref-cont">
      <c-box pr="1rem">
        <CBox
          as="a"
          href="#main-content-section"
          title="Skip to main content section"
          aria-label="Skip to main content section"
          ><CText fontSize="sm">{{ $t("header_one['skip']") }}</CText></CBox
        >
      </c-box>

      <c-box d="flex" align-items="center">
        <c-box pr="1rem" pl="1rem">
          <CBox
            as="nuxt-link"
            aria-label="Switch Language Hindi or English"
            title="Switch Language Hindi or English"
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            ml="1rem"
            >{{ locale.name }}</CBox
          >
        </c-box>

        <CIconButton
          title="Switch website to High Contrast or Low Contrast Mode "
          ml="3"
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          :aria-label="`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } mode`"
          @click="toggleColorMode"
        />

        <c-box as="ul" class="font-cont-ul">
          <c-box as="li" id="icon-text-size">
            <c-box
              v-bind="mainStylesTwo[colorMode]"
              as="a"
              href="javascript:void(0);"
              title="Accessibility Links"
              aria-label="Control font size"
              border=""
            >
              <span class="font-size-control">T<sup>T</sup></span></c-box
            >
          </c-box>
          <c-box as="ul" class="font-cont-ul-items">
            <c-box
              as="li"
              :bg="
                selectedFontSize == 'minus2'
                  ? mainStyles[colorMode]['selectedFontSize']
                  : mainStyles[colorMode]['notSelectedFontSize']
              "
            >
              <c-box
                as="a"
                href="javascript:void(0);"
                aria-label="Decrease font size by twice of the standard base size"
                border=""
                @click.prevent="fontSizeControl('minus2')"
              >
                <span class="font-size-control">T--</span></c-box
              >
            </c-box>
            <c-box
              as="li"
              :bg="
                selectedFontSize == 'minus1'
                  ? mainStyles[colorMode]['selectedFontSize']
                  : mainStyles[colorMode]['notSelectedFontSize']
              "
            >
              <c-box
                as="a"
                href="javascript:void(0);"
                aria-label="Decrease font size one time of the standard base size"
                border=""
                @click.prevent="fontSizeControl('minus1')"
              >
                <span class="font-size-control">T-</span></c-box
              >
            </c-box>
            <c-box
              as="li"
              :bg="
                selectedFontSize == 'base'
                  ? mainStyles[colorMode]['selectedFontSize']
                  : mainStyles[colorMode]['notSelectedFontSize']
              "
            >
              <c-box
                as="a"
                href="javascript:void(0);"
                aria-label="Switch to standard font size"
                border=""
                @click.prevent="fontSizeControl('base')"
              >
                <span class="font-size-control">T</span></c-box
              >
            </c-box>
            <c-box
              as="li"
              :bg="
                selectedFontSize == 'plus1'
                  ? mainStyles[colorMode]['selectedFontSize']
                  : mainStyles[colorMode]['notSelectedFontSize']
              "
            >
              <c-box
                as="a"
                href="javascript:void(0);"
                aria-label="Increase font size one time of the standard base size"
                border=""
                @click.prevent="fontSizeControl('plus1')"
              >
                <span class="font-size-control">T+</span></c-box
              >
            </c-box>
            <c-box
              as="li"
              :bg="
                selectedFontSize == 'plus2'
                  ? mainStyles[colorMode]['selectedFontSize']
                  : mainStyles[colorMode]['notSelectedFontSize']
              "
            >
              <c-box
                as="a"
                href="javascript:void(0);"
                aria-label="Increase font size by twice of the standard base size"
                border=""
                @click.prevent="fontSizeControl('plus2')"
              >
                <span class="font-size-control">T++</span></c-box
              >
            </c-box>
          </c-box>
        </c-box>
      </c-box>
    </c-box>

    <CDivider mt="0" id="header-divider" />

    <c-box
      pl="4rem"
      pr="4rem"
      id="navigation-container-xl"
      d="flex"
      align-items="center"
      justify-content="space-between"
    >
      <c-box
        as="nav"
        aria-label="Secondary Navigation"
        d="flex"
        justify-content="space-between"
        w="100%"
      >
        <nuxt-link :to="localePath('/')">
          <c-box d="flex">
            <c-image
              class="ancorp-logo-type"
              :src="require('@/assets/imgs/ancorpofficiallogo.webp')"
              alt="ANCORP LOGO"
            ></c-image>
          </c-box>
        </nuxt-link>

        <c-box d="flex" id="nav-ul-container" v-bind="mainStyles[colorMode]">
          <c-box
            d="flex"
            list-style="none"
            align-items="center"
            v-if="innerWidth >= 1082 && innerWidth <= 1671"
          >
            <c-box class="call-center-phone-cont">
              <c-box as="span" class="call-icon-spn"
                ><c-icon name="phone"
              /></c-box>
              <c-box as="a" href="tel:0115402046">
                Call Center No. : 0115402046
              </c-box>
              &nbsp; , &nbsp;<c-box as="a" href="tel:0115402043">
                0115402043</c-box
              >
            </c-box>
          </c-box>

          <c-box
            as="ul"
            d="flex"
            list-style="none"
            align-items="center"
            v-bind="mainStyles[colorMode]"
            v-if="innerWidth >= 1671"
          >
            <c-pseudo-box
              as="li"
              class="link-li"
              v-bind="mainStyles[colorMode]"
              height="100%"
              v-bind:_hover="{
                bg: mainStyles[colorMode]['header_li_hover'],
                borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
              }"
              d="flex"
              align-items="center"
              pl="1rem"
              pr="1rem"
              cursor="pointer"
            >
              <c-box
                as="nuxt-link"
                :to="localePath('/')"
                tabIndex="0"
                aria-label="Home"
                cursor="pointer"
              >
                <c-box
                  as="label"
                  size="sm"
                  :class="
                    'index___en' == this.$route.name ||
                    'index___hi' == this.$route.name
                      ? 'active-link'
                      : 'default-link'
                  "
                  >{{ $t("primary_nav['link_zero']") }}</c-box
                >
              </c-box>
            </c-pseudo-box>

            <c-pseudo-box
              as="li"
              class="link-li"
              height="100%"
              v-bind:_hover="{
                bg: mainStyles[colorMode]['header_li_hover'],
                borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
              }"
              d="flex"
              align-items="center"
              pl="1rem"
              pr="1rem"
            >
              <c-box
                as="nuxt-link"
                aria-label="News & Events"
                :to="localePath('/news-and-events/')"
                tabIndex="0"
                cursor="pointer"
              >
                <c-box
                  as="label"
                  size="sm"
                  :class="
                    'news-and-events___en' == this.$route.name ||
                    'news-and-events___hi' == this.$route.name ||
                    'news-and-events-slug___en' == this.$route.name ||
                    'news-and-events-slug___hi' == this.$route.name
                      ? 'active-link'
                      : 'default-link'
                  "
                  >{{ $t("primary_nav['link_one']") }}</c-box
                >
              </c-box>
            </c-pseudo-box>

            <c-pseudo-box
              as="li"
              class="link-li"
              height="100%"
              v-bind:_hover="{
                bg: mainStyles[colorMode]['header_li_hover'],
                borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
              }"
              d="flex"
              align-items="center"
              pl="1rem"
              pr="1rem"
            >
              <c-box
                as="nuxt-link"
                :to="localePath('/letters-and-circulars/')"
                tabIndex="0"
                aria-label="Letters & Circulars"
                cursor="pointer"
              >
                <c-box
                  as="label"
                  size="sm"
                  :class="
                    'letters-and-circulars___en' == this.$route.name ||
                    'letters-and-circulars___hi' == this.$route.name ||
                    'letters-and-circulars-slug___en' == this.$route.name ||
                    'letters-and-circulars-slug___hi' == this.$route.name
                      ? 'active-link'
                      : 'default-link'
                  "
                  >{{ $t("primary_nav['link_two']") }}</c-box
                >
              </c-box>
            </c-pseudo-box>

            <c-pseudo-box
              as="li"
              class="link-li"
              height="100%"
              v-bind:_hover="{
                bg: mainStyles[colorMode]['header_li_hover'],
                borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
              }"
              d="flex"
              align-items="center"
              id="tender-menu-ul-id"
              pl="1rem"
              pr="1rem"
            >
              <c-box
                as="nuxt-link"
                to="#"
                tabIndex="0"
                cursor="pointer"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Tenders"
                aria-controls="menu"
              >
                <c-box
                  as="label"
                  size="sm"
                  id="tender-link"
                  :class="
                    'tenders-current-tenders___en' == this.$route.name ||
                    'tenders-current-tenders___hi' == this.$route.name ||
                    'tenders-current-tenders-slug___en' == this.$route.name ||
                    'tenders-current-tenders-slug___hi' == this.$route.name ||
                    'tenders-archived-tenders___en' == this.$route.name ||
                    'tenders-archived-tenders-slug___hi' == this.$route.name
                      ? 'active-link'
                      : 'default-link'
                  "
                >
                  {{ $t("primary_nav['link_three']") }}
                </c-box>
              </c-box>

              <c-box as="ul" id="tender-menu-ul" class="link-ul" role="menu">
                <c-pseudo-box
                  as="li"
                  v-bind:_hover="{
                    bg: mainStyles[colorMode]['header_li_hover'],
                  }"
                  v-bind="mainStyles[colorMode]"
                >
                  <c-pseudo-box
                    as="nuxt-link"
                    :to="localePath('/tenders/current-tenders/')"
                    aria-label="Current Tenders Link"
                    tabIndex="0"
                    cursor="pointer"
                    >{{ $t('primary_nav.current_tenders') }}</c-pseudo-box
                  >
                </c-pseudo-box>
                <c-pseudo-box
                  as="li"
                  v-bind:_hover="{
                    bg: mainStyles[colorMode]['header_li_hover'],
                  }"
                  v-bind="mainStyles[colorMode]"
                >
                  <c-box
                    aria-label="Archived Tenders Link"
                    as="nuxt-link"
                    v-bind="mainStyles[colorMode]"
                    :to="localePath('/tenders/archived-tenders/')"
                    @blur.native="listBlur('tender-li-last')"
                    tabIndex="0"
                    cursor="pointer"
                    >{{ $t('primary_nav.archived_tenders') }}</c-box
                  >
                </c-pseudo-box>
              </c-box>
            </c-pseudo-box>

            <c-pseudo-box
              as="li"
              class="link-li"
              height="100%"
              v-bind:_hover="{
                bg: mainStyles[colorMode]['header_li_hover'],
                borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
              }"
              d="flex"
              align-items="center"
              pl="1rem"
              pr="1rem"
            >
              <c-box
                as="nuxt-link"
                tabIndex="0"
                cursor="pointer"
                :to="localePath('/services/')"
              >
                <c-box
                  as="label"
                  size="sm"
                  :class="
                    'services-page___en' == this.$route.name ||
                    'services-page___hi' == this.$route.name
                      ? 'active-link'
                      : 'default-link'
                  "
                  >{{ $t("primary_nav['link_seven']") }}</c-box
                >
              </c-box>
            </c-pseudo-box>
          </c-box>

          <c-box d="flex" alignItems="center">
            <c-image
              tabIndex="0"
              class="state-logo"
              :src="require('@/assets/imgs/corp-logo.jpg')"
              alt="Corp logo"
              ml="1rem"
              mr="0"
            ></c-image>
          </c-box>
        </c-box>

        <input
          id="dropdown-sticky-ham"
          class="input-box"
          type="checkbox"
          style="display: none"
          ref="dropDownHamBtn"
        />
        <c-box
          as="label"
          for="dropdown"
          class="dropdown-sticky"
          @click.prevent="openHam()"
          v-if="innerWidth < 1012"
        >
          <c-box as="span" class="hamburger">
            <c-box
              as="span"
              :bg="mainStyles[colorMode]['downloadLinkColor']"
              class="icon-bar ham-top-bar"
            ></c-box>
            <c-box
              as="span"
              :bg="mainStyles[colorMode]['downloadLinkColor']"
              class="icon-bar ham-middle-bar"
            ></c-box>
            <c-box
              as="span"
              :bg="mainStyles[colorMode]['downloadLinkColor']"
              class="icon-bar ham-bottom-bar"
            ></c-box>
          </c-box>
        </c-box>
      </c-box>

      <c-box
        id="navigation-mobile"
        ref="navigationMobile"
        v-bind="mainStyles[colorMode]"
      >
        <c-box id="mob-nav" v-bind="mainStyles[colorMode]">
          <c-box
            class="preferences-container-ham-one"
            pb="0.5rem"
            pt="0.5rem"
            width="100%"
            d="flex"
            justify-content="space-between"
            align-items="center"
            pl="4rem"
            pr="4rem"
            v-bind="mainStyles[colorMode]"
          >
            <c-box d="flex">
              <c-image
                size="2.8rem"
                :src="require('@/assets/imgs/corp-logo.jpg')"
                alt=""
                mr="1rem"
              ></c-image>
              <c-image
                width="1.9rem"
                h="2.8rem"
                :src="require('@/assets/imgs/corp-emblem.jpg')"
                alt=""
              ></c-image>
            </c-box>

            <c-box
              as="label"
              for="dropdown"
              class="cross-ham"
              @click.native="closeHam"
            >
              <c-box as="span" class="hamburger">
                <c-box
                  as="span"
                  :bg="mainStyles[colorMode]['downloadLinkColor']"
                  class="icon-bar top-bar"
                ></c-box>
                <c-box
                  as="span"
                  :bg="mainStyles[colorMode]['downloadLinkColor']"
                  class="icon-bar middle-bar"
                ></c-box>
                <c-box
                  as="span"
                  :bg="mainStyles[colorMode]['downloadLinkColor']"
                  class="icon-bar bottom-bar"
                ></c-box>
              </c-box>
            </c-box>
          </c-box>

          <c-divider />

          <c-box as="nav" id="mobile-nav-list">
            <c-box
              as="nuxt-link"
              :to="localePath('/')"
              tabIndex="0"
              cursor="pointer"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'index___en' == this.$route.name ||
                  'index___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
                >{{ $t("primary_nav['link_zero']") }}</c-box
              >
            </c-box>

            <c-divider />

            <c-box
              as="nuxt-link"
              :to="localePath('/news-and-events/')"
              tabIndex="0"
              cursor="pointer"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'news-and-events___en' == this.$route.name ||
                  'news-and-events___hi' == this.$route.name ||
                  'news-and-events-slug___en' == this.$route.name ||
                  'news-and-events-slug___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
                >{{ $t("primary_nav['link_one']") }}</c-box
              >
            </c-box>

            <c-divider />

            <c-box
              as="nuxt-link"
              :to="localePath('/letters-and-circulars/')"
              tabIndex="0"
              cursor="pointer"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'letters-and-circulars___en' == this.$route.name ||
                  'letters-and-circulars___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
                >{{ $t("primary_nav['link_two']") }}</c-box
              >
            </c-box>

            <c-divider />

            <c-box as="ul" class="ul-mobile-nav">
              <c-pseudo-box
                as="li"
                v-bind:_hover="{ bg: mainStyles[colorMode]['header_li_hover'] }"
                v-bind="mainStyles[colorMode]"
              >
                <c-box as="a" tabIndex="0" cursor="pointer">
                  <c-box
                    as="label"
                    size="sm"
                    :class="
                      'tenders-current-tenders___en' == this.$route.name ||
                      'tenders-current-tenders___hi' == this.$route.name ||
                      'tenders-current-tenders-slug___en' == this.$route.name ||
                      'tenders-current-tenders-slug___hi' == this.$route.name ||
                      'tenders-archived-tenders___en' == this.$route.name ||
                      'tenders-archived-tenders-slug___hi' == this.$route.name
                        ? 'active-link-mobile'
                        : 'default-link'
                    "
                  >
                    {{ $t("primary_nav['link_three']") }}
                  </c-box>
                </c-box>
              </c-pseudo-box>
            </c-box>

            <c-box
              as="nuxt-link"
              :to="localePath('/tenders/current-tenders/')"
              tabIndex="0"
              cursor="pointer"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'tenders-current-tenders___en' == this.$route.name ||
                  'current-tenders___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
                >{{ $t('primary_nav.current_tenders') }}</c-box
              >
            </c-box>

            <c-box
              as="nuxt-link"
              :to="localePath('/tenders/archived-tenders/')"
              tabIndex="0"
              cursor="pointer"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'tenders-archived-tenders___en' == this.$route.name ||
                  'archived-tenders___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
                >{{ $t('primary_nav.archived_tenders') }}</c-box
              >
            </c-box>
            <c-divider />

            <c-box as="ul" class="ul-mobile-nav">
              <c-box as="li">
                <c-box as="a" tabIndex="0" cursor="pointer">
                  <c-box
                    as="label"
                    size="sm"
                    :class="
                      'procurement-eprocurement___en' == this.$route.name ||
                      'procurement-eprocurement___hi' == this.$route.name ||
                      'procurement-rate-contract___en' == this.$route.name ||
                      'procurement-rate-contract___hi' == this.$route.name
                        ? 'active-link-mobile'
                        : 'default-link'
                    "
                  >
                    {{ $t("primary_nav['link_four']") }}
                  </c-box>
                </c-box>
              </c-box>
            </c-box>
            <c-box
              as="nuxt-link"
              :to="localePath('/procurement/eprocurement/')"
              tabIndex="0"
              cursor="pointer"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'procurement-eprocurement___en' == this.$route.name ||
                  'eprocurement___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
              >
                {{ $t('primary_nav.eprocurement') }}</c-box
              >
            </c-box>

            <c-box
              as="nuxt-link"
              :to="localePath('/procurement/rate-contract/')"
              tabIndex="0"
              cursor="pointer"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'procurement-rate-contract___en' == this.$route.name ||
                  'rate-contract___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
                >{{ $t('primary_nav.rate_contract') }}</c-box
              >
            </c-box>
            <c-divider />

            <c-divider />

            <c-box
              as="nuxt-link"
              tabIndex="0"
              cursor="pointer"
              :to="localePath('/services/')"
              @click.native="closeHam"
            >
              <c-box
                as="label"
                size="sm"
                :class="
                  'services___en' == this.$route.name ||
                  'services___hi' == this.$route.name
                    ? 'active-link-mobile'
                    : 'default-link'
                "
                >{{ $t("primary_nav['link_seven']") }}</c-box
              >
            </c-box>
            <c-divider />
          </c-box>
        </c-box>
      </c-box>
    </c-box>

    <c-box
      pl="4rem"
      pr="4rem"
      id="navigation-container-xl-secondary"
      aria-label="Main Navigation"
      d="flex"
      as="nav"
      align-items="center"
      justify-content="space-between"
      v-bind="mainStyles[colorMode]"
      v-if="innerWidth > 1011 && innerWidth < 1671"
    >
      <c-box as="ul" d="flex" list-style="none" align-items="center">
        <c-pseudo-box
          as="li"
          class="link-li"
          v-bind="mainStyles[colorMode]"
          v-bind:_hover="{
            bg: mainStyles[colorMode]['header_li_hover'],
            borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
          }"
          height="100%"
          d="flex"
          align-items="center"
          pl="1rem"
          pr="1rem"
          cursor="pointer"
        >
          <c-box
            as="nuxt-link"
            :to="localePath('/')"
            tabIndex="0"
            aria-label="Home"
            cursor="pointer"
          >
            <c-box
              as="label"
              size="sm"
              :class="
                'index___en' == this.$route.name ||
                'index___hi' == this.$route.name
                  ? 'active-link'
                  : 'default-link'
              "
              >{{ $t("primary_nav['link_zero']") }}</c-box
            >
          </c-box>
        </c-pseudo-box>

        <c-pseudo-box
          as="li"
          class="link-li"
          height="100%"
          d="flex"
          v-bind:_hover="{
            bg: mainStyles[colorMode]['header_li_hover'],
            borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
          }"
          align-items="center"
          pl="1rem"
          pr="1rem"
        >
          <c-box
            as="nuxt-link"
            aria-label="News & Events"
            :to="localePath('/news-and-events/')"
            tabIndex="0"
            cursor="pointer"
          >
            <c-box
              as="label"
              size="sm"
              :class="
                'news-and-events___en' == this.$route.name ||
                'news-and-events___hi' == this.$route.name ||
                'news-and-events-slug___en' == this.$route.name ||
                'news-and-events-slug___hi' == this.$route.name
                  ? 'active-link'
                  : 'default-link'
              "
              >{{ $t("primary_nav['link_one']") }}</c-box
            >
          </c-box>
        </c-pseudo-box>

        <c-pseudo-box
          as="li"
          class="link-li"
          height="100%"
          d="flex"
          v-bind:_hover="{
            bg: mainStyles[colorMode]['header_li_hover'],
            borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
          }"
          align-items="center"
          pl="1rem"
          pr="1rem"
        >
          <c-box
            as="nuxt-link"
            aria-label="Letters & Circulars"
            :to="localePath('/letters-and-circulars/')"
            tabIndex="0"
            cursor="pointer"
          >
            <c-box
              as="label"
              size="sm"
              :class="
                'letters-and-circulars___en' == this.$route.name ||
                'letters-and-circulars___hi' == this.$route.name
                  ? 'active-link'
                  : 'default-link'
              "
              >{{ $t("primary_nav['link_two']") }}</c-box
            >
          </c-box>
        </c-pseudo-box>

        <c-pseudo-box
          as="li"
          class="link-li"
          v-bind:_hover="{
            bg: mainStyles[colorMode]['header_li_hover'],
            borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
          }"
          height="100%"
          d="flex"
          align-items="center"
          pl="1rem"
          pr="1rem"
        >
          <c-box
            as="nuxt-link"
            tabIndex="0"
            cursor="pointer"
            to="#"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Tenders"
          >
            <c-box
              as="label"
              size="sm"
              :id="colorMode == 'light' ? 'tender-link' : 'tender-link-white'"
              :class="
                'tenders-current-tenders___en' == this.$route.name ||
                'tenders-current-tenders___hi' == this.$route.name ||
                'tenders-current-tenders-slug___en' == this.$route.name ||
                'tenders-current-tenders-slug___hi' == this.$route.name ||
                'tenders-archived-tenders___en' == this.$route.name ||
                'tenders-archived-tenders-slug___hi' == this.$route.name
                  ? 'active-link'
                  : 'default-link'
              "
            >
              {{ $t("primary_nav['link_three']") }}
            </c-box>
          </c-box>

          <c-box
            as="ul"
            class="link-ul"
            v-bind="mainStyles[colorMode]"
            id="tenderMenu"
            aria-expanded="false"
          >
            <c-box
              as="li"
              id="tenderMenu-item1"
              v-bind:_hover="{ bg: mainStyles[colorMode]['header_li_hover'] }"
              v-bind="mainStyles[colorMode]"
            >
              <c-box
                as="nuxt-link"
                :to="localePath('/tenders/current-tenders/')"
                href="#"
                tabIndex="0"
                cursor="pointer"
                >{{ $t('primary_nav.current_tenders') }}</c-box
              >
            </c-box>
            <c-box
              as="li"
              id="tenderMenu-item2"
              v-bind:_hover="{ bg: mainStyles[colorMode]['header_li_hover'] }"
              v-bind="mainStyles[colorMode]"
            >
              <c-box
                as="nuxt-link"
                :to="localePath('/tenders/archived-tenders/')"
                href="#"
                tabIndex="0"
                cursor="pointer"
                >{{ $t('primary_nav.archived_tenders') }}</c-box
              >
            </c-box>
          </c-box>
        </c-pseudo-box>

        <c-pseudo-box
          as="li"
          class="link-li"
          v-bind:_hover="{
            bg: mainStyles[colorMode]['header_li_hover'],
            borderBottom: `2px solid ${mainStyles[colorMode]['header_li_hover_border']}`,
          }"
          height="100%"
          d="flex"
          align-items="center"
          pl="1rem"
          pr="1rem"
        >
          <c-box
            as="nuxt-link"
            aria-label="Services"
            tabIndex="0"
            cursor="pointer"
            :to="localePath('/services/')"
          >
            <c-box
              as="label"
              size="sm"
              :class="
                'services-page___en' == this.$route.name ||
                'services-page___hi' == this.$route.name
                  ? 'active-link'
                  : 'default-link'
              "
              >{{ $t("primary_nav['link_seven']") }}</c-box
            >
          </c-box>
        </c-pseudo-box>
      </c-box>
    </c-box>
  </c-box>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'siteHeader',

  inject: ['$chakraColorMode', '$toggleColorMode'],

  watch: {
    async $route(to, from) {},
  },
  scrollToTop: true,

  computed: {
    ...mapState({
      innerWidth: 'innerWidth',
      innerHeight: 'innerHeight',
      persistedState: 'persistedState',
    }),

    ...mapGetters(['getPersistedData']),

    toggleColorMode() {
      return this.$toggleColorMode;
    },

    colorMode() {
      return this.$chakraColorMode();
    },

    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },

  data() {
    return {
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'white',
          viewAllLinkColor: 'white',
          downloadLinkColor: 'white',
          smallTextColor: '#52FF94',
          notSelectedFontSize: 'gray.700',
          selectedFontSize: '#00be20',
          header_li_hover: '#1d2025',
          header_li_hover_border: '#C5283D',
        },
        light: {
          bg: 'white',
          color: 'gray.900',
          viewAllLinkColor: '#C5283D',
          downloadLinkColor: '#100072',
          smallTextColor: '#C5283D',
          notSelectedFontSize: 'white',
          // selectedFontSize:"#92cdff",
          selectedFontSize: '#00be20',
          header_li_hover: '#f5f5f5',
          header_li_hover_border: '#C5283D',
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

      selectedFontSize: 'base',
    };
  },

  mounted() {
    //
    //
    //

    this.$watch(
      () => {
        //
        //
        return this.$refs.tenderAnchor;
      },
      (value) => {}
    );
  },

  components: {},

  methods: {
    convertLink(link) {
      if (this.$i18n.locale == 'en') {
        return `${'en' + link}`;
      } else {
        return `${'hi' + link}`;
      }
    },
    fontSizeControl(value) {
      this.selectedFontSize = value;

      if (value == 'minus2') {
        window.document.querySelector('html').style.fontSize = '60%';
      }
      if (value == 'minus1') {
        window.document.querySelector('html').style.fontSize = '80%';
      }
      if (value == 'base') {
        window.document.querySelector('html').style.fontSize = '100%';
      }
      if (value == 'plus1') {
        window.document.querySelector('html').style.fontSize = '120%';
      }
      if (value == 'plus2') {
        window.document.querySelector('html').style.fontSize = '140%';
      }
    },

    listBlur(id) {
      if (id == 'tender-li-last') {
        document.getElementById('tender-menu-ul').style.display = 'none';
      }
      if (id == 'proc-li-last') {
        document.getElementById('proc-menu-ul').style.display = 'none';
      }
      if (id == 'erp-li-last') {
        document.getElementById('erp-menu-ul').style.display = 'none';
      }
    },

    closeHam() {
      this.$refs.dropDownHamBtn.checked = false;
      this.$refs.navigationMobile.$el.style.right = '100vw';
    },
    openHam() {
      //
      this.$refs.dropDownHamBtn.checked = true;

      this.$refs.navigationMobile.$el.style.right = '0';
      //
    },
  },

  beforeDestroy() {
    // Reset the font size before the component is unmounted
    window.document.querySelector('html').style.fontSize = 'inherit';
  },
};
</script>

<style>
.preferences-container {
  padding: 0.5rem 4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.call-icon-spn {
  display: flex;
  align-items: center;
  padding-right: 0.5em;
}

#icon-text-size {
  width: 2.5rem;
}

.font-cont-ul:hover .font-cont-ul-items {
  display: block;
  position: absolute;
  list-style: none;
  z-index: 9999;
}
.font-cont-ul:focus-within .font-cont-ul-items {
  display: block;
  position: absolute;
  list-style: none;
  z-index: 9999;
}

#tender-menu-ul-id:focus-within > #tender-menu-ul {
  display: block;
}

.font-cont-ul-items {
  display: none;
}

.font-cont-ul {
  height: 2.5rem;
  margin-left: 1rem;
  list-style: none;
}
#icon-text-size {
}
.font-cont-ul li a {
  font-size: 1rem;
  border: 0.5px solid rgba(118, 118, 118, 0.295);
}
.font-cont-ul li a:hover {
  border: 0.5px solid black;
}

.font-size-control {
  font-weight: 601;
}

.font-cont-ul > li {
  height: 100%;
}
.font-cont-ul li a {
  height: 100%;
  width: auto;
  display: flex;
}

.font-size-control-cont-ul {
  list-style-type: none;
}

.font-size-control-cont {
  padding-left: 1rem;
}

.font-size-control {
  padding: 0.5rem;
  cursor: pointer;
  height: 100%;
}

.link-li {
  border-bottom: 2px solid white;
  position: relative;
  padding: 0 !important;
}
.link-li a {
  display: flex;
  height: 100%;
  align-items: center;
}

.link-li:hover {
  /* border-bottom: 2px solid red; */
}

.link-li:focus-within .link-ul {
  display: block !important;
}

.link-li:hover .link-ul {
  display: block !important;
}
.link-li a:hover .link-ul {
  display: block !important;
}

.ul-mobile-nav li {
  padding: 1rem;
  list-style: none;
}

.ul-mobile-nav li label {
  font-weight: 404;
  font-style: italic;
}

.link-ul {
  z-index: 900;
  display: none;
  position: absolute;
  transition: all 0.7s ease 0s;
  top: 3.9rem;
  min-width: 16rem;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  list-style: none;
  left: -1.2rem;
}

.link-ul li {
}

.link-ul li a {
  height: 100%;
  font-size: 0.875rem;
  padding: 12px 36px;
}
.link-li a label {
  padding: 0 1rem;
  height: inherit;
  display: flex;
  align-items: center;
}

#eproc-link::after {
  -webkit-transition: all 300ms 0s ease-in-out;
  transition: all 300ms 0s ease-in-out;

  content: '';
  background-image: url('../assets/imgs/down-arrow.png');
  background-size: 100% 100%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}
#eproc-link:hover::after {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

#eproc-link-white::after {
  -webkit-transition: all 300ms 0s ease-in-out;
  transition: all 300ms 0s ease-in-out;

  content: '';
  background-image: url('../assets/imgs/chev-white.png');
  background-size: 100% 100%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}
#eproc-link-white:hover::after {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

#erp-link::after {
  -webkit-transition: all 300ms 0s ease-in-out;
  transition: all 300ms 0s ease-in-out;

  content: '';
  background-image: url('../assets/imgs/down-arrow.png');
  background-size: 100% 100%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}

#tender-link::after {
  -webkit-transition: all 300ms 0s ease-in-out;
  transition: all 300ms 0s ease-in-out;

  content: '';
  background-image: url('../assets/imgs/down-arrow.png');
  background-size: 100% 100%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}

#tender-link:hover::after {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

#tender-link-white::after {
  -webkit-transition: all 300ms 0s ease-in-out;
  transition: all 300ms 0s ease-in-out;

  content: '';
  background-image: url('../assets/imgs/chev-white.png');
  background-size: 100% 100%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}

#tender-link-white:hover::after {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.emblem {
  height: 3.8rem;
  width: 2.6rem;
  padding-bottom: 0.2rem;
}
.state-logo {
  width: 3.8rem;
  height: 3.8rem;
  padding-bottom: 0.2rem;
}
.ancorp-logo-type {
  width: 32rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.default-link {
  font-weight: initial !important;
}
.active-link {
  font-weight: bold;
}

#navigation-container-xl {
  border-bottom: 1px solid #cfcfcf;
}

#navigation-container-xl-secondary ul:nth-child(1) {
  height: inherit;
}

.dropdown-sticky {
  position: relative;
  padding-top: 1rem;
}

#dropdown-sticky-ham {
}

.ham-top-bar {
}

.ham-middle-bar {
}

.ham-bottom-bar {
}

#navigation-container {
  padding-left: 4rem;
  padding-right: 4rem;
}
#navigation-mobile {
  position: fixed;
  z-index: 999;
  height: 100%;
  width: 100%;
  right: -100vw;
  top: 0;
  display: none;
  flex-direction: column;
}

.dropdown {
  display: none;
  padding-right: 0.5rem;
}
.cross-ham {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
}
.hamburger {
  width: unset;
  height: unset;
  display: block;
}

#ham-icon {
  display: none;
  position: absolute;
  right: 1rem;
  z-index: 99999;
}

label {
  cursor: pointer;
}
.icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  margin: 4px;
  transition: all 0.2s;
}
.top-bar {
  transform: rotate(0);
}
.middle-bar {
  opacity: 1;
}
label .top-bar {
  transform: rotate(45deg);
  transform-origin: 10% 10%;
}
label .middle-bar {
  opacity: 0;
}
label .bottom-bar {
  transform: rotate(-45deg);
  transform-origin: 10% 90%;
}

#dropdown:checked ~ #navigation-mobile {
  right: 0;
}

#navigation-container-xl {
  width: inherit;
}

@media only screen and (min-width: 320px) and (max-width: 530px) {
  header {
    z-index: 999990999;
    position: absolute;
  }
  .cross-ham {
    align-items: center;
  }

  .dropdown-sticky {
    padding-top: unset;
  }
  .ancorp-logo-type {
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
    padding-right: calc(1rem + 2vw);
  }

  #navigation-container-xl nav {
    display: flex;
    align-items: center;
  }

  #navigation-container-xl {
    top: 0;
    /* position: fixed;    */
    max-height: calc(3.2rem + 3vw);
    height: calc(3.2rem + 2vw);
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  #navigation-container-xl {
  }

  .call-center-phone-cont {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .dropdown {
    padding-right: 0.5rem;
    display: inherit;
    position: absolute;
    right: 0;
    z-index: 9999;
  }

  #logo {
    width: 2.7rem;
    height: 2.7rem;
  }

  .logo-text {
    font-size: 0.5rem;
    padding-left: 0.5rem;
  }

  #punch-line {
    font-size: 0.9rem;
  }

  #navigation-container {
    padding: 0 1rem;
  }

  #navigation-mobile {
    display: inherit;
  }

  .preferences-container {
    padding-left: 16px;
    padding-right: 16px;
  }
  #ham-icon {
    display: unset;
    /* right: 100vw; */
    top: 21px;
  }

  .pref-container-mobile {
  }

  .preferences-container-ham-one {
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .preferences-container-ham-two {
    padding-left: 16px;
    padding-right: 16px;
  }

  .preferences-container-ham-two {
    background-color: rebeccapurple;
    height: inherit;
  }

  #nav-ul-container {
    display: none;
  }

  #mob-nav {
    flex-grow: 1;
    /* overflow-y: scroll; */
    height: 100%;
    z-index: 9999999;
  }

  #mobile-nav-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    height: 100%;
  }

  #mobile-nav-list a {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
  }
  #mobile-nav-list hr {
    width: 100%;
    margin: 0;
  }
}

@media only screen and (min-width: 531px) and (max-width: 1011px) {
  header {
    z-index: 999990999;
    position: absolute;
  }

  .cross-ham {
    align-items: center;
  }

  .dropdown-sticky {
    padding-top: unset;
  }
  .ancorp-logo-type {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-right: calc(1rem + 2vw);
  }

  #navigation-container-xl nav {
    display: flex;
    align-items: center;
  }

  #navigation-container-xl {
    top: 0;
    /* position: fixed;    */
    max-height: calc(3.2rem + 5vw);
    height: calc(5.2rem + 2vw);
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .call-center-phone-cont {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .dropdown {
    padding-right: 0.5rem;
    display: inherit;
    position: absolute;
    right: 0;
    z-index: 9999;
  }

  #logo {
    width: 2.7rem;
    height: 2.7rem;
  }

  .logo-text {
    font-size: 0.5rem;
    padding-left: 0.5rem;
  }

  #punch-line {
    font-size: 0.9rem;
  }

  #navigation-container {
    padding: 0 1rem;
  }

  #navigation-mobile {
    display: inherit;
  }

  .preferences-container {
    padding-left: 16px;
    padding-right: 16px;
  }
  #ham-icon {
    display: unset;
    /* right: 100vw; */
    top: 21px;
  }

  .pref-container-mobile {
  }

  .preferences-container-ham-one {
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .preferences-container-ham-two {
    padding-left: 16px;
    padding-right: 16px;
  }

  .preferences-container-ham-two {
    background-color: rebeccapurple;
    height: inherit;
  }

  #nav-ul-container {
    display: none;
  }

  #mob-nav {
    flex-grow: 1;
    overflow-y: auto;
    height: 100%;
    z-index: 9999999;
  }

  #mobile-nav-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    height: 100%;
  }

  #mobile-nav-list a {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
  }
  #mobile-nav-list hr {
    width: 100%;
    margin: 0;
  }
}

@media only screen and (min-width: 1012px) and (max-width: 1082px) {
  header {
    z-index: 999990999;
    position: absolute;
  }
}
@media only screen and (min-width: 1083px) and (max-width: 1220px) {
  header {
    z-index: 999990999;
    position: absolute;
  }

  .call-center-phone-cont {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  #navigation-container-xl {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
}

@media only screen and (min-width: 1012px) and (max-width: 1082px) {
  #navigation-container-xl {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
  #navigation-container-xl-secondary {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
  .call-center-phone-cont {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

@media only screen and (min-width: 300px) and (max-width: 576px) {
  header {
    position: fixed;
    z-index: 9999;
  }
  #header-divider {
    margin: 0;
    padding: 0;
  }
}
</style>
