/* eslint-disable import/no-extraneous-dependencies, no-new */
import Vue from 'vue';
import store from './store';
import App from './app.vue';

new Vue({
    el: 'body',
    store,
    render: h => h(App)
});
