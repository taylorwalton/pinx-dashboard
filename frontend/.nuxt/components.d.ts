
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'Icon': typeof import("../components/common/Icon.vue")['default']
    'ImageCropper': typeof import("../components/common/ImageCropper.vue")['default']
    'LayoutSettings': typeof import("../components/common/LayoutSettings.vue")['default']
    'LocaleSelect': typeof import("../components/common/LocaleSelect.vue")['default']
    'LtrContext': typeof import("../components/common/LtrContext.vue")['default']
    'List': typeof import("../components/common/Notifications/List.vue")['default']
    'Toolbar': typeof import("../components/common/Notifications/Toolbar.vue")['default']
    'PasswordStrengthMeter': typeof import("../components/common/PasswordStrengthMeter.vue")['default']
    'SearchDialog': typeof import("../components/common/SearchDialog.vue")['default']
    'TestScope': typeof import("../components/common/TestScope.vue")['default']
    'SvgoBrainIcon2': typeof import("../assets/icons/brain-icon-2")['default']
    'SvgoBrainIcon': typeof import("../assets/icons/brain-icon")['default']
    'SvgoNuxtIcon': typeof import("../assets/icons/nuxt-icon")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtLinkLocale': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'NuxtIcon': typeof import("../node_modules/.pnpm/nuxt-svgo@4.1.0_magicast@0.3.5_vue@3.5.13_typescript@5.8.3_/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyIcon': LazyComponent<typeof import("../components/common/Icon.vue")['default']>
    'LazyImageCropper': LazyComponent<typeof import("../components/common/ImageCropper.vue")['default']>
    'LazyLayoutSettings': LazyComponent<typeof import("../components/common/LayoutSettings.vue")['default']>
    'LazyLocaleSelect': LazyComponent<typeof import("../components/common/LocaleSelect.vue")['default']>
    'LazyLtrContext': LazyComponent<typeof import("../components/common/LtrContext.vue")['default']>
    'LazyList': LazyComponent<typeof import("../components/common/Notifications/List.vue")['default']>
    'LazyToolbar': LazyComponent<typeof import("../components/common/Notifications/Toolbar.vue")['default']>
    'LazyPasswordStrengthMeter': LazyComponent<typeof import("../components/common/PasswordStrengthMeter.vue")['default']>
    'LazySearchDialog': LazyComponent<typeof import("../components/common/SearchDialog.vue")['default']>
    'LazyTestScope': LazyComponent<typeof import("../components/common/TestScope.vue")['default']>
    'LazySvgoBrainIcon2': LazyComponent<typeof import("../assets/icons/brain-icon-2")['default']>
    'LazySvgoBrainIcon': LazyComponent<typeof import("../assets/icons/brain-icon")['default']>
    'LazySvgoNuxtIcon': LazyComponent<typeof import("../assets/icons/nuxt-icon")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyNuxtIcon': LazyComponent<typeof import("../node_modules/.pnpm/nuxt-svgo@4.1.0_magicast@0.3.5_vue@3.5.13_typescript@5.8.3_/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const Icon: typeof import("../components/common/Icon.vue")['default']
export const ImageCropper: typeof import("../components/common/ImageCropper.vue")['default']
export const LayoutSettings: typeof import("../components/common/LayoutSettings.vue")['default']
export const LocaleSelect: typeof import("../components/common/LocaleSelect.vue")['default']
export const LtrContext: typeof import("../components/common/LtrContext.vue")['default']
export const List: typeof import("../components/common/Notifications/List.vue")['default']
export const Toolbar: typeof import("../components/common/Notifications/Toolbar.vue")['default']
export const PasswordStrengthMeter: typeof import("../components/common/PasswordStrengthMeter.vue")['default']
export const SearchDialog: typeof import("../components/common/SearchDialog.vue")['default']
export const TestScope: typeof import("../components/common/TestScope.vue")['default']
export const SvgoBrainIcon2: typeof import("../assets/icons/brain-icon-2")['default']
export const SvgoBrainIcon: typeof import("../assets/icons/brain-icon")['default']
export const SvgoNuxtIcon: typeof import("../assets/icons/nuxt-icon")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtLinkLocale: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const NuxtIcon: typeof import("../node_modules/.pnpm/nuxt-svgo@4.1.0_magicast@0.3.5_vue@3.5.13_typescript@5.8.3_/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyIcon: LazyComponent<typeof import("../components/common/Icon.vue")['default']>
export const LazyImageCropper: LazyComponent<typeof import("../components/common/ImageCropper.vue")['default']>
export const LazyLayoutSettings: LazyComponent<typeof import("../components/common/LayoutSettings.vue")['default']>
export const LazyLocaleSelect: LazyComponent<typeof import("../components/common/LocaleSelect.vue")['default']>
export const LazyLtrContext: LazyComponent<typeof import("../components/common/LtrContext.vue")['default']>
export const LazyList: LazyComponent<typeof import("../components/common/Notifications/List.vue")['default']>
export const LazyToolbar: LazyComponent<typeof import("../components/common/Notifications/Toolbar.vue")['default']>
export const LazyPasswordStrengthMeter: LazyComponent<typeof import("../components/common/PasswordStrengthMeter.vue")['default']>
export const LazySearchDialog: LazyComponent<typeof import("../components/common/SearchDialog.vue")['default']>
export const LazyTestScope: LazyComponent<typeof import("../components/common/TestScope.vue")['default']>
export const LazySvgoBrainIcon2: LazyComponent<typeof import("../assets/icons/brain-icon-2")['default']>
export const LazySvgoBrainIcon: LazyComponent<typeof import("../assets/icons/brain-icon")['default']>
export const LazySvgoNuxtIcon: LazyComponent<typeof import("../assets/icons/nuxt-icon")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.5.4_@vue+compiler-dom@3.5.13_eslint@9.26.0_jiti@2.4.2__magicast@0.3.5_ro_c9f2078d9167fe3953b702a46d2b8738/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyNuxtIcon: LazyComponent<typeof import("../node_modules/.pnpm/nuxt-svgo@4.1.0_magicast@0.3.5_vue@3.5.13_typescript@5.8.3_/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.17.1_@parcel+watcher@2.5.1_@types+node@22.15.3_db0@0.3.2_eslint@9.26.0_jiti@2.4._cb341af8693ffaa2f524b82799857ceb/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
