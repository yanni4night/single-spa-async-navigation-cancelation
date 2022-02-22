<template>
  <div class="content">
    <ul>
      <li><a href="#" @click.prevent="toFoo">toFoo</a></li>
      <li><a href="#" @click.prevent="toBar">toBar</a></li>
      <li><a href="#" @click.prevent="toBaz">toBaz</a></li>
    </ul>
    <div class="root" ref="root"></div>
  </div>
</template>

<script lang="ts">
import {
  registerApplication,
  start,
  addErrorHandler,
  setMountMaxTime,
} from "single-spa";

import { defineComponent } from "vue";

export default defineComponent({
  async mounted() {
    await this.$nextTick();

    const root = this.$refs.root;

    setMountMaxTime(4000, true);

    registerApplication(
      "foo",
      () => import("./foo/index"),
      (location) => location.pathname.startsWith("/foo"),
      {
        domElement: root,
      }
    );

    registerApplication({
      name: "bar",
      app: () => import("./bar/index"),
      activeWhen: (location) => location.pathname.startsWith("/bar"),
      customProps: {
        domElement: root,
      },
    });

    registerApplication({
      name: "baz",
      app: () => import("./baz/index"),
      activeWhen: (location) => location.pathname.startsWith("/baz"),
      customProps: {
        domElement: root,
      },
    });

    addErrorHandler((err) => {
      console.error("SPA Error", err);
    });
    // @ts-ignore
    window.addEventListener(
      "single-spa:before-routing-event",
      (evt: { detail: any }) => {
        console.log(evt.detail);
        if (evt.detail.newUrl.endsWith("/bar")) {
          let t = 3000;
          evt.detail.cancelNavigation(
            new Promise((re) =>
              setTimeout(() => {
                console.log("do cancel", evt.detail.newUrl);
                re(true);
              }, t)
            )
          );
        }
      }
    );

    start();
  },
  methods: {
    toFoo() {
      console.log("toFoo");
      history.pushState(null, "foo", "/foo");
    },
    toBar() {
      console.log("toBar");
      history.pushState(null, "bar", "/bar");
    },
    toBaz() {
      console.log("toBaz");
      history.pushState(null, "baz", "/baz");
    },
  },
});
</script>