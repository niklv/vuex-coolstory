# vuex-coolstory [![NPM version](https://img.shields.io/npm/v/vuex-coolstory.svg?style=flat-square)](https://www.npmjs.com/package/vuex-coolstory)

Use [redux-saga](https://github.com/redux-saga/redux-saga) with [Vuex](https://vuex.vuejs.org).

## Overview
[redux-saga](https://github.com/redux-saga/redux-saga) is an awesome library that aims to make side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier and better.

While originally targetting [Redux](https://github.com/reactjs/redux), `redux-saga` is actually not strictly tied to `redux` and do not rely on any internals of it's implementation. Actually `redux-saga` could be used with Vuex with `put` effect commiting mutations

This library wraps `redux-saga` so it can be used as [Vuex](https://vuex.vuejs.org/) plugin. It's external interface is similar to middleware provided by `redux-saga`.

## Differences from [vuex-saga](https://github.com/xanf/vuex-redux-saga)  

This package works fine and support latest version of redux-saga, plus also have `mapSagaAction()` function.  

## Installation

```bash
$ npm install --save vuex-coolstory redux-saga
```

## Usage

```js
import Vue from 'vue';
import Vuex from 'vuex';
import { VuexSaga } from 'vuex-saga';
import { take, put, race, delay } from 'redux-saga/effects';

// simple saga
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

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: []
    },
    plugins: [
        VuexSaga({
            sagas: [saga] // pass your sagas to plugin
        })
    ],
    mutations: {
        appendItem(state, { item }) {
            state.items = [...state.items, item];
        }
    }
});
```

## API
### `VuexSaga(options)`

Creates a Vuex plugin and connects the Sagas to the Vuex Store

- `options: Object` - A list of options to pass to the plugin. Currently supported options are:

  - `sagas` : Array of saga generator functions.
  
  - `sagaMonitor` : SagaMonitor - see docs for [`createSagaMiddleware(options)`](https://redux-saga.js.org/docs/api/)

  - `onError` : Function - see docs for [`createSagaMiddleware(options)`](https://redux-saga.js.org/docs/api/)

  - `context` : Object - see docs for [`createSagaMiddleware(options)`](https://redux-saga.js.org/docs/api/)

  - `effectMiddlewares` : Function[] - see docs for [`createSagaMiddleware(options)`](https://redux-saga.js.org/docs/api/)


### `mapSagaActions(args)`

Similar to `mapActions` or `mapMutations`.
See usage in `examples/simple/src/app.vue`


## Run example

```sh
npm i
cd examples/simple
webpack
# check dist/index.html 
```
