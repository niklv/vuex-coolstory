/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { take, put, race, delay } from 'redux-saga/effects';
import { VuexSaga } from '../../..';

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
                item: 'TIMER_A'
            });
            yield put({
                type: 'moduleB/appendItem',
                item: 'TIMER_B'
            });
        } else if (newItem) {
            yield put({
                type: 'appendItem',
                item: newItem.payload.item
            });
            yield put({
                type: 'moduleB/appendItem',
                item: [...newItem.payload.item].reverse().join('')
            });
        }
    }
}

export default new Vuex.Store({
    modules: {
        moduleA: {
            namespaced: false,
            state: {
                items: []
            },
            mutations: {
                appendItem(state, { item }) {
                    state.items = [...state.items, item];
                }
            }
        },
        moduleB: {
            namespaced: true,
            state: {
                items: []
            },
            mutations: {
                appendItem(state, { item }) {
                    state.items = [...state.items, item];
                }
            }
        }
    },
    plugins: [
        VuexSaga({
            sagas: [saga]
        })
    ]
});
