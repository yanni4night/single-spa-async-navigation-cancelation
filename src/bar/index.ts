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
  console.log('bar bootstrap start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.bootstrap(obj);
    console.log('bar bootstrap end')
    return ret;
  });
}

export const mount = (obj: any) => {
  console.log('bar mount start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.mount(obj);
    console.log('bar mount end')
    return ret;
  });
}

export const unmount = (obj: any) => {
  console.log('bar unmount start');
  return new Promise(resolve => setTimeout(resolve, 0)).then(() => {
    const ret = vueLifecycles.unmount(obj);
    console.log('bar unmount end')
    return ret;
  });
};