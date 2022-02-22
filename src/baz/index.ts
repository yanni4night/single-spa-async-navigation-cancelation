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
  console.log('baz bootstrap start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.bootstrap(obj);
    console.log('baz bootstrap end')
    return ret;
  });
}

export const mount = (obj: any) => {
  console.log('baz mount start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.mount(obj);
    console.log('baz mount end')
    return ret;
  });
}

export const unmount = (obj: any) => {
  console.log('baz unmount start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.unmount(obj);
    console.log('baz unmount end')
    return ret;
  });
};