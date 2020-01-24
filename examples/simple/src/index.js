/* eslint-disable import/no-extraneous-dependencies, no-param-reassign, no-new */
import Vue from 'vue';
import Vuex from 'vuex';
import { take, put, race, delay } from 'redux-saga/effects';
import App from './app.vue';
import { VuexSaga } from '../../../index';

Vue.use(Vuex);

function* saga() {
    while (true) {
        const { newItem, timer } = yield race({
            newItem: take('addItem'),
            timer: delay(3000)
        });
        if (timer) {
            yield put({
                type: 'appendItem',
                item: 'TIMER'
            });
        } else if (newItem) {
            yield put({
                type: 'appendItem',
                item: newItem.payload.item
            });
        }
    }
}

const store = new Vuex.Store({
    state: {
        items: []
    },
    plugins: [
        VuexSaga({
            sagas: [saga]
        })
    ],
    mutations: {
        appendItem(state, { item }) {
            state.items = [...state.items, item];
        }
    }
});

new Vue({
    el: 'body',
    store,
    render: h => h(App)
});
