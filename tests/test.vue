<template>
  <header
    :style="{
      backgroundColor: color ? color : defaultColor,
    }"
  >
    {{ title }}
  </header>
  <a href="123"> 1 </a>
  <a href="123"> 1 </a>
  <a href="123"> 1 </a>
  <a href="123"> 1 </a><a href="123"> 1 </a><a href="123"> 1 </a> <a href="123"> 1 </a
  ><a href="123"> 1 </a><a href="123"> 1 </a> <a href="123"> 1 </a><a href="123"> 1 </a
  ><a href="123"> 1 </a> <a href="123"> 1 </a><a href="123"> 1 </a><a href="123"> 1 </a>
  <p>123</p>
</template>
<script>
import { reactive } from "@vue/composition-api";
console.log(123);
export default {
  // 父组件传递进来更改该头部组件的属性值
  props: {
    // 标题
    title: String,
    // 颜色
    color: String,
  },
  setup() {
    const state = reactive({
      defaultColor: "red",
    });
    return {
      ...state,
    };
  },
};
</script>
<style scoped>
p {
  color: red;
}
header {
  color: red;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: white;
}
</style>
