# Vue3 Snippets Highlight Formatters For Visual Studio Code

Vue3 Snippets, Contains code highlighting, code snippets and formatting commonly used in vue2 and vue3.

<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.vue"><img src="https://img.shields.io/badge/Download-10k+-orange" alt="Download" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.vue"><img src="https://img.shields.io/badge/Macketplace-v1.x-brightgreen" alt="Macketplace" /></a>
<a href="https://github.com/Wscats/vue-snippets"><img src="https://img.shields.io/badge/Github Page-Wscats-yellow" alt="Github Page" /></a>
<a href="https://github.com/Wscats"><img src="https://img.shields.io/badge/Author-Eno Yao-blueviolet" alt="Eno Yao" /></a>
<!-- <a href="https://github.com/Wscats"><img src="https://api.netlify.com/api/v1/badges/b652768b-1673-42cd-98dd-3fd807b2ebca/deploy-status" alt="Status" /></a> -->

<!-- <img src="./public/1.gif" /> -->
![Demo](public/1.gif)

You can turn on the statusbar `Auto Format Vue` switch at the bottom of vscode, which allows you to automatically format the `vue` file when you write it.

Or right-click to display the drop-down menu panel, click the `Format Document` menu item to format.

<!-- <img src="./public/2.gif" /> -->
![Demo](public/2.gif)

# Snippets

## Vue 3 Snippets

Including most of the API of Vue3. You can type `reactive`, choose `reactive`, and press ENTER, then `const data = reactive({...})` appear on the screen.

| Prefix            | JavaScript Snippet Content                              |
| ----------------- | ------------------------------------------------------- |
| `import`          | `import {...} from "@vue/composition-api"`              |
| `import`          | `import {...} from 'vue'`                               |
| `newVue`          | `newVue({...})`                                         |
| `defineComponent` | `defineComponent({...})`                                |
| `export`          | `export default { ... }`                                |
| `setup`           | `setup(${...}) {...}`                                   |
| `reactive`        | `const data = reactive({...})`                          |
| `watch`           | `watch(..., ...)`                                       |
| `watchFn`         | `watch(() => {...})`                                    |
| `computed`        | `computed(() => { get: () => {...}, set: () => {...}})` |
| `toRefs`          | `toRefs(...)`                                           |
| `ref`             | `ref(...)`                                              |
| `props`           | `props(...)`                                            |
| `onBeforeMount`   | `onBeforeMount(...)`                                    |
| `onMounted`       | `onMounted(...)`                                        |
| `onBeforeUpdate`  | `onBeforeUpdate(...)`                                   |
| `onUpdated`       | `onUpdated(...)`                                        |
| `onBeforeUnmount` | `onBeforeUnmount(...)`                                  |
| `onUnmounted`     | `onUnmounted(...)`                                      |
| `onErrorCaptured` | `onErrorCaptured(...)`                                  |

## Vue 2 Snippets

All code snippets of Vue 2 Snippets are also included here.

<!-- <b><details><summary>Vue 2 Snippets</summary></b> -->

| Prefix                           | JavaScript Snippet Content                                         |
| -------------------------------- | ------------------------------------------------------------------ |
| `import`                         | `import ... from ...`                                              |
| `newVue`                         | `new Vue({...})`                                                   |
| `VueConfigSilent`                | `Vue.config.silent = true`                                         |
| `VueConfigOptionMergeStrategies` | `Vue.config.optionMergeStrategies`                                 |
| `VueConfigDevtools`              | `Vue.config.devtools = true`                                       |
| `VueConfigErrorHandler`          | `Vue.config.errorHandler = function (err, vm, info) {...}`         |
| `VueConfigWarnHandler`           | `Vue.config.warnHandler = function (msg, vm, trace) {...}`         |
| `VueConfigIgnoredElements`       | `Vue.config.ignoredElements = ['']` \                              |
| `VueConfigKeyCodes`              | `Vue.config.keyCodes`                                              |
| `VueConfigPerformance`           | `Vue.config.performance = true`                                    |
| `VueConfigProductionTip`         | `Vue.config.productionTip = false`                                 |
| `vueExtend`                      | `Vue.extend( options )`                                            |
| `VueNextTick`                    | `Vue.nextTick( callback, [context] )`                              |
| `VueNextTickThen`                | `Vue.nextTick( callback, [context] ).then(function(){ })`          |
| `VueSet`                         | `Vue.set( target, key, value )`                                    |
| `VueDelete`                      | `Vue.delete( target, key )`                                        |
| `VueDirective`                   | `Vue.directive( id, [definition] )`                                |
| `VueFilter`                      | `Vue.filter( id, [definition] )`                                   |
| `VueComponent`                   | `Vue.component( id, [definition] )`                                |
| `VueUse`                         | `Vue.use( plugin )`                                                |
| `VueMixin`                       | `Vue.mixin({ mixin })`                                             |
| `VueCompile`                     | `Vue.compile( template )`                                          |
| `VueVersion`                     | `Vue.version`                                                      |
| `data`                           | `data() { return {} }`                                             |
| `watchWithOptions`               | `key: { deep: true, immediate: true, handler: function () { } }`   |
| `vmData`                         | `${this, vm}.$data`                                                |
| `vmProps`                        | `${this, vm}.$props`                                               |
| `vmEl`                           | `${this, vm}.$el`                                                  |
| `vmOptions`                      | `${this, vm}.$options`                                             |
| `vmParent`                       | `${this, vm}.$parent`                                              |
| `vmRoot`                         | `${this, vm}.$root`                                                |
| `vmChildren`                     | `${this, vm}.$children`                                            |
| `vmSlots`                        | `${this, vm}.$slots`                                               |
| `vmScopedSlots`                  | `${this, vm}.$scopedSlots.default({})`                             |
| `vmRefs`                         | `${this, vm}.$refs`                                                |
| `vmIsServer`                     | `${this, vm}.$isServer`                                            |
| `vmAttrs`                        | `${this, vm}.$attrs`                                               |
| `vmListeners`                    | `${this, vm}.listeners`                                            |
| `vmWatch`                        | `${this, vm}.$watch( expOrFn, callback, [options] )`               |
| `vmSet`                          | `${this, vm}.$set( object, key, value )`                           |
| `vmDelete`                       | `${this, vm}.$delete( object, key )`                               |
| `vmOn`                           | `${this, vm}.$on( event, callback )`                               |
| `vmOnce`                         | `${this, vm}.$once( event, callback )`                             |
| `vmOff`                          | `${this, vm}.$off( [event, callback] )`                            |
| `vmEmit`                         | `${this, vm}.$emit( event, […args] )`                              |
| `vmMount`                        | `${this, vm}.$mount( [elementOrSelector] )`                        |
| `vmForceUpdate`                  | `${this, vm}.$forceUpdate()`                                       |
| `vmNextTick`                     | `${this, vm}.$nextTick( callback )`                                |
| `vmDestroy`                      | `${this, vm}.$destroy()`                                           |
| `renderer`                       | `const renderer = require('vue-server-renderer').createRenderer()` |
| `createRenderer`                 | `createRenderer({ })`                                              |
| `preventDefault`                 | `preventDefault();`                                                |
| `stopPropagation`                | `stopPropagation();`                                               |

<br />

| Prefix                 | HTML Snippet Content                    |
| ---------------------- | --------------------------------------- |
| `template`             | `<template></template>`                 |
| `script`               | `<script></script>`                     |
| `style`                | `<style></style>`                       |
| `vText`                | `v-text=msg`                            |
| `vHtml`                | `v-html=html`                           |
| `vShow`                | `v-show`                                |
| `vIf`                  | `v-if`                                  |
| `vElse`                | `v-else`                                |
| `vElseIf`              | `v-else-if`                             |
| `vForWithoutKey`       | `v-for`                                 |
| `vFor`                 | `v-for="" :key=""`                      |
| `vOn`                  | `v-on`                                  |
| `vBind`                | `v-bind`                                |
| `vModel`               | `v-model`                               |
| `vPre`                 | `v-pre`                                 |
| `vCloak`               | `v-cloak`                               |
| `vOnce`                | `v-once`                                |
| `key`                  | `:key`                                  |
| `ref`                  | `ref`                                   |
| `slotA`                | `slot=""`                               |
| `slotE`                | `<slot></slot>`                         |
| `slotScope`            | `slot-scope=""`                         |
| `component`            | `<component :is=''></component>`        |
| `keepAlive`            | `<keep-alive></keep-alive>`             |
| `transition`           | `<transition></transition>`             |
| `transitionGroup`      | `<transition-group></transition-group>` |
| `enterClass`           | `enter-class=''`                        |
| `leaveClass`           | `leave-class=''`                        |
| `appearClass`          | `appear-class=''`                       |
| `enterToClass`         | `enter-to-class=''`                     |
| `leaveToClass`         | `leave-to-class=''`                     |
| `appearToClass`        | `appear-to-class=''`                    |
| `enterActiveClass`     | `enter-active-class=''`                 |
| `leaveActiveClass`     | `leave-active-class=''`                 |
| `appearActiveClass`    | `appear-active-class=''`                |
| `beforeEnterEvent`     | `@before-enter=''`                      |
| `beforeLeaveEvent`     | `@before-leave=''`                      |
| `beforeAppearEvent`    | `@before-appear=''`                     |
| `enterEvent`           | `@enter=''`                             |
| `leaveEvent`           | `@leave=''`                             |
| `appearEvent`          | `@appear=''`                            |
| `afterEnterEvent`      | `@after-enter=''`                       |
| `afterLeaveEvent`      | `@after-leave=''`                       |
| `afterAppearEvent`     | `@after-appear=''`                      |
| `enterCancelledEvent`  | `@enter-cancelled=''`                   |
| `leaveCancelledEvent`  | `@leave-cancelled=''`                   |
| `appearCancelledEvent` | `@appear-cancelled=''`                  |

<br />

| Prefix                       | Vue Router Snippet Content                     |
| ---------------------------- | ---------------------------------------------- |
| `routerLink`                 | `<router-link></router-link>`                  |
| `routerView`                 | `<router-view></router-view>`                  |
| `to`                         | `to=""`                                        |
| `tag`                        | `tag=""`                                       |
| `newVueRouter`               | `const router = newVueRouter({ })`             |
| `routerBeforeEach`           | `router.beforeEach((to, from, next) => { }`    |
| `routerBeforeResolve`        | `router.beforeResolve((to, from, next) => { }` |
| `routerAfterEach`            | `router.afterEach((to, from) => { }`           |
| `routerPush`                 | `router.push()`                                |
| `routerReplace`              | `router.replace()`                             |
| `routerGo`                   | `router.back()`                                |
| `routerBack`                 | `router.push()`                                |
| `routerForward`              | `router.forward()`                             |
| `routerGetMatchedComponents` | `router.getMatchedComponents()`                |
| `routerResolve`              | `router.resolve()`                             |
| `routerAddRoutes`            | `router.addRoutes()`                           |
| `routerOnReady`              | `router.onReady()`                             |
| `routerOnError`              | `router.onError()`                             |
| `routes`                     | `routes: []`                                   |
| `beforeEnter`                | `beforeEnter: (to, from, next) => { }`         |
| `beforeRouteEnter`           | `beforeRouteEnter (to, from, next) { }`        |
| `beforeRouteLeave`           | `beforeRouteLeave (to, from, next) { }`        |
| `scrollBehavior`             | `scrollBehavior (to, from, savedPosition) { }` |

<br />

| Prefix         | Vuex Snippet Content                |
| -------------- | ----------------------------------- |
| `newVuexStore` | `const store = new Vuex.Store({ })` |

| Prefix      | Nuxt.js Snippet Content |
| ----------- | ----------------------- |
| `nuxt`      | `<nuxt/>`               |
| `nuxtChild` | `<nuxt-child/>`         |
| `nuxtLink`  | `<nuxt-link to=""/>`    |
| `asyncData` | `asyncData() {}`        |

<!-- </details> -->


# Extension Settings

- Use [js-beautify](https://github.com/beautify-web/js-beautify)'s config. 
- Use [pug-beautify](https://github.com/vingorius/pug-beautify)'s config.
- Indent Size: default use the `editor.tabSize`.

```json
{
    "html_indent_root": false, // If need to indent the root tag of template in ".vue" file
    "break_attr_limit": -1, // when attributes.length > the value，break attributes force; keep inline when -1.
    "attr_end_with_gt": true, // when "break_attr_limit" works, if don't use "\n" before tag's ">"，default "true"
    "format_need": ["html", "js", "css"], // the list of need to format, default ["html", "js", "css"]. delete anyone if you don't need format.
    "js-beautify": {
        "indent_size": "editor.tabSize",
        "indent_char": " ",
        "indent_with_tabs": false,
        "brace-style": "collapse",
        "space_after_anon_function": true,
        "css": {},
        "js": {},
        "html": {
            // "force_format": ["template"],
            "wrap_attributes": "auto"
        }
    },
    "pug-beautify": {
        "fill_tab": false
    }
}

```

| Key                           | Example                   | Default                   |
| ----------------------------- | ------------------------- | ------------------------- |
| vue3snippets.html_indent_root | false                     | false                     |
| vue3snippets.break_attr_limit | 2                         | -1                        |
| vue3snippets.attr_end_with_gt | true                      | true                      |
| vue3snippets.format_need      | ["html"]                  | ["html", "js", "css"]     |
| vue3snippets.js-beautify      | (See the config at front) | (See the config at front) |
| vue3snippets.pug-beautify     | {fill_tab: false}         | {fill_tab: false}         |

# Thanks

| [<img src="https://avatars1.githubusercontent.com/u/17243165?s=460&v=4" width="60px;"/><br /><sub>Eno Yao</sub>](https://github.com/Wscats) | [<img src="https://avatars2.githubusercontent.com/u/5805270?s=460&v=4" width="60px;"/><br /><sub>Aaron Xie</sub>](https://github.com/aaron-xie) | [<img src="https://avatars3.githubusercontent.com/u/12515367?s=460&v=4" width="60px;"/><br /><sub>DK Lan</sub>](https://github.com/dk-lan) | [<img src="https://avatars1.githubusercontent.com/u/30917929?s=460&v=4" width="60px;"/><br /><sub>Yong</sub>](https://github.com/flowerField) | [<img src="https://avatars3.githubusercontent.com/u/33544236?s=460&v=4" width="60px;"/><br /><sub>Li Ting</sub>](https://github.com/Liting1) | <img src="https://avatars2.githubusercontent.com/u/50255537?s=400&u=cfd51a5f46862d14e92e032a5b7ec073b67a904b&v=4" width="60px;"/><br /><sub>Xin</sub> | [<img src="https://avatars0.githubusercontent.com/u/39754159?s=400&v=4" width="60px;"/><br /><sub>Lemon</sub>](https://github.com/lemonyyye) | [<img src="https://avatars3.githubusercontent.com/u/31915459?s=400&u=11ea9bc9baa62784208a29dddcd0a77789e9620f&v=4" width="60px;"/><br /><sub>Jing</sub>](https://github.com/vickySC) | [<img src="https://avatars2.githubusercontent.com/u/24653988?s=400&u=76227871dea8d4b57162093fde63b7d52910145d&v=4" width="60px;"/><br /><sub>Lin</sub>](https://github.com/shirley3790) | [<img src="https://avatars2.githubusercontent.com/u/23230108?s=460&v=4" width="60px;"/><br /><sub>Tian Fly</sub>](https://github.com/tiantengfly) |
| - | - | - | - | - | - | - | - | - | - |

If you enjoy front end, you should have it! xie, yao, yong, ting, jing, lin, tian, xin, xia, dk and lemon ~ Waiting for you in our heart！

If you think it's useful, you can leave us a [message and like it](https://marketplace.visualstudio.com/items?itemName=Wscats.vue&ssr=false#review-details), Your support is our driving force😀


# Requirements

- [Prettier](https://github.com/prettier/prettier)
- [Vue2 Snippets](https://github.com/sdras/vue-vscode-snippets)
- [Vue Syntax Highlight](https://github.com/vuejs/vue-syntax-highlight)

# License

[Vue3 Snippets](https://marketplace.visualstudio.com/items?itemName=Wscats.vue) is released under the [MIT](http://opensource.org/licenses/MIT).