# Vue3 Snippets for Visual Studio Code

This extension adds Vue3 Code Snippets into Visual Studio Code.

这个插件基于最新的 Vue3 的 API 添加了 Code Snippets。

<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.vue"><img src="https://img.shields.io/badge/Download-100+-orange" alt="Download" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.vue"><img src="https://img.shields.io/badge/Macketplace-v0.1-brightgreen" alt="Macketplace" /></a>
<a href="https://github.com/Wscats/vue-snippets"><img src="https://img.shields.io/badge/Github Page-Wscats-yellow" alt="Github Page" /></a>
<a href="https://github.com/Wscats"><img src="https://img.shields.io/badge/Author-Eno Yao-blueviolet" alt="Eno Yao" /></a>
<a href="https://github.com/Wscats"><img src="https://api.netlify.com/api/v1/badges/b652768b-1673-42cd-98dd-3fd807b2ebca/deploy-status" alt="Status" /></a>

<img src="./public/1.gif" />

# Snippets / 代码片段

Including most of the API of Vue3. You can type `reactive`, choose `reactive`, and press ENTER, then `const data = reactive({...})` appear on the screen.

插件的 Snippets 如下表格所示，比如你可以键入 `reactive` 然后按上下键选中 `reactive` 再按 Enter 键，就输入了`const data = reactive({...})`了。

| Prefix | JavaScript Snippet Content |
| ------ | ------------ |
| `import` | `import {...} from "@vue/composition-api"` |
| `import` | `import {...} from 'vue'` |
| `newVue` | `newVue({...})` |
| `createComponent` | `createComponent({...})` |
| `export` | `export default { ... }` |
| `setup` | `setup(${...}) {...}` |
| `reactive` | `const data = reactive({...})` |
| `watch` | `watch(..., ...)` |
| `watchFn` | `watch(() => {...})` |
| `computed` | `computed(() => { get: () => {...}, set: () => {...}})` |
| `toRefs` | `toRefs(...)` |
| `ref` | `ref(...)` |
| `props` | `props(...)` |
| `onBeforeMount` | `onBeforeMount(...)` |
| `onMounted` | `onMounted(...)` |
| `onBeforeUpdate` | `onBeforeUpdate(...)` |
| `onUpdated` | `onUpdated(...)` |
| `onBeforeUnmount` | `onBeforeUnmount(...)` |
| `onUnmounted` | `onUnmounted(...)` |
| `onErrorCaptured` | `onErrorCaptured(...)` |



# Vue Composition API

> [Vue Composition API](https://vue-composition-api-rfc.netlify.com/)

`@vue/composition-api` 使开发者们可以在 `Vue 2.x` 中使用 `Vue 3.0` 引入的**基于函数**的**逻辑复用机制**。

[**English Version**](./README.md)

---

# Navigation 

- [Installation / 安装](#Installation)
- [Usage / 使用](#Usage)
- [TypeScript](#TypeScript)
  - [TSX](#tsx)
- [Limitations / 限制](#Limitations)
- [API](https://vue-composition-api-rfc.netlify.com/api.html)
- [Changelog / 更改日志](https://github.com/vuejs/composition-api/blob/master/CHANGELOG.md)

# Installation

**npm**

```bash
npm install @vue/composition-api --save
```

**yarn**

```bash
yarn add @vue/composition-api
```

**CDN**

```html
<script src="https://unpkg.com/@vue/composition-api/dist/vue-composition-api.umd.js"></script>
```

By using the global variable window.vueCompositionApi.

通过全局变量 `window.vueCompositionApi` 来使用。

# Usage

You must install @vue/composition-api via Vue.use() before using other APIs:

在使用任何 `@vue/composition-api` 提供的能力前，必须先通过 `Vue.use()` 进行安装:

```js
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);
```

After installing the plugin you can use the Composition API to compose your component.

安装插件后，您就可以使用新的 [Composition API](https://vue-composition-api-rfc.netlify.com/) 来开发组件了。

# TypeScript

**This plugin requires TypeScript version >3.5.1. If you are using `vetur`, make sure to set `vetur.useWorkspaceDependencies` to `true`.**

To let TypeScript properly infer types inside Vue component options, you need to define components with `createComponent`:

**请使用最新版的 TypeScript，如果你使用了 `vetur`，请将 `vetur.useWorkspaceDependencies` 设为 `true`。**

为了让 TypeScript 正确的推导类型，我们必须使用 `createComponent` 来定义组件:

```ts
import { createComponent } from '@vue/composition-api';

const Component = createComponent({
  // 启用类型推断
});

const Component = {
  // 无法进行选项的类型推断
  // TypeScript 无法知道这是一个 Vue 组件的选项对象
};
```

## TSX

🚀 An Example [Repository](https://github.com/liximomo/vue-composition-api-tsx-example) with TS and TSX support is provided to help you start.

To support TSX, create a declaration file with following content in your project.

🚀 这里有一个配置好 TS/TSX 支持的[示例仓库](https://github.com/liximomo/vue-composition-api-tsx-example)来帮助你快速开始.

要支持 TSX，请创建一个类型定义文件并提供正确的 JSX 定义。内容如下：

```ts
// file: shim-tsx.d.ts`
import Vue, { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

# Limitations

## `Ref` Unwrap

`Unwrap` is not working with Array index.

数组索引属性无法进行自动的`Unwrap`:

### **Should not** store `ref` as a direct child of `Array`:

### **不要**使用 `Array` 直接存取 `ref` 对象:

```js
const state = reactive({
  list: [ref(0)],
});
// no unwrap, `.value` is required
state.list[0].value === 0; // true

state.list.push(ref(1));
//  no unwrap, `.value` is required
state.list[1].value === 1; // true
```

### **Should not** use `ref` in a plain object when working with `Array`:

### **不要**在数组中使用含有 `ref` 的普通对象:

```js
const a = {
  count: ref(0),
};
const b = reactive({
  list: [a], // a.count will not unwrap!!
});

// no unwrap for `count`, `.value` is required
b.list[0].count.value === 0; // true
```

```js
const b = reactive({
  list: [
    {
      count: ref(0), // no unwrap!!
    },
  ],
});

// no unwrap for `count`, `.value` is required
b.list[0].count.value === 0; // true
```
### **Should** always use `ref` in a `reactive` when working with Array:

### **应该**总是将 `ref` 存放到 `reactive` 对象中:

```js
const a = reactive({
  count: ref(0),
});
const b = reactive({
  list: [a],
});
// unwrapped
b.list[0].count === 0; // true

b.list.push(
  reactive({
    count: ref(1),
  })
);
// unwrapped
b.list[1].count === 1; // true
```

### Using `reactive` will mutate the origin object

### `reactive` 会返回一个修改过的原始的对象

This is an limitation of using `Vue.observable` in Vue 2.

此行为与 Vue 2 中的 `Vue.observable` 一致

> Vue 3 will return an new proxy object.

> Vue 3 中会返回一个新的的代理对象.

---

## `watch()` API

`onTrack` and `onTrigger` are not available in WatchOptions.

不支持 `onTrack` 和 `onTrigger` 选项。

---

## Template Refs

> ✅ Support     ❌ Not Supported

✅ String ref && return it from `setup()`:

```html
<template>
  <div ref="root"></div>
</template>

<script>
  export default {
    setup() {
      const root = ref(null);

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(root.value); // <div/>
      });

      return {
        root,
      };
    },
  };
</script>
```

✅ String ref && return it from `setup()` && Render Function / JSX:

```jsx
export default {
  setup() {
    const root = ref(null);

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(root.value); // <div/>
    });

    return {
      root,
    };
  },
  render() {
    // with JSX
    return () => <div ref="root" />;
  },
};
```

❌ Function ref:

```html
<template>
  <div :ref="el => root = el"></div>
</template>

<script>
  export default {
    setup() {
      const root = ref(null);

      return {
        root,
      };
    },
  };
</script>
```

❌ Render Function / JSX in `setup()`:

```jsx
export default {
  setup() {
    const root = ref(null);

    return () =>
      h('div', {
        ref: root,
      });

    // with JSX
    return () => <div ref={root} />;
  },
};
```

If you really want to use template refs in this case, you can access `vm.$refs` via `SetupContext.refs`.

如果你依然选择在 `setup()` 中写 `render` 函数，那么你可以使用 `SetupContext.refs` 来访问模板引用，它等价于 Vue 2.x 中的 `this.$refs`:

> ⚠️ **Warning**: The `SetupContext.refs` won't exist in `Vue 3.0`. `@vue/composition-api` provide it as a workaround here.

> ⚠️ **警告**: `SetupContext.refs` 并不属于 `Vue 3.0` 的一部分, `@vue/composition-api` 将其曝光在 `SetupContext` 中只是临时提供一种变通方案。

```js
export default {
  setup(initProps, setupContext) {
    const refs = setupContext.refs;
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(refs.root); // <div/>
    });

    return () =>
      h('div', {
        ref: 'root',
      });

    // with JSX
    return () => <div ref="root" />;
  },
};
```

You may also need to augment the `SetupContext` when working with TypeScript:

如果项目使用了 TypeScript，你还需要扩展 `SetupContext` 类型:

```ts
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}
```

# SSR

Even if there is no definitive Vue 3 API for SSR yet, this plugin implements the onServerPrefetch lifecycle hook that allows you to use the serverPrefetch hook found in the classic API.

```js
import { onServerPrefetch } from '@vue/composition-api';

export default {
  setup (props, { ssrContext }) {
    const result = ref();

    onServerPrefetch(async () => {
      result.value = await callApi(ssrContext.someId);
    });

    return {
      result,
    };
  },
};
```

# License

[Vue3 Snippets](https://marketplace.visualstudio.com/items?itemName=Wscats.vue) is released under the [MIT](http://opensource.org/licenses/MIT).