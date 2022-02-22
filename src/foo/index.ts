import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
  },
});

export const bootstrap = (obj: any) => {
  console.log('foo bootstrap start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.bootstrap(obj);
    console.log('foo bootstrap end')
    return ret;
  });
}

export const mount = (obj: any) => {
  console.log('foo mount start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.mount(obj);
    console.log('foo mount end')
    return ret;
  });
}

export const unmount = (obj: any) => {
  console.log('foo unmount start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.unmount(obj);
    console.log('foo unmount end')
    return ret;
  });
};