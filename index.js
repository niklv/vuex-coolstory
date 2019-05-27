import { runSaga, stdChannel } from 'redux-saga';

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap(map) {
    return Array.isArray(map)
        ? map.map(key => ({ key, val: key }))
        : Object.keys(map).map(key => ({ key, val: map[key] }));
}

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export function mapSagaActions(actions) {
    const res = {};
    normalizeMap(actions).forEach(({ key, val }) => {
        res[key] = function mappedSagaAction(...args) {
            // get saga dispatch function from store
            const { sagaDispatch } = this.$store;
            return typeof val === 'function'
                ? val.apply(this, [sagaDispatch].concat(args))
                : sagaDispatch.apply(this.$store, [val].concat(args));
        };
    });
    return res;
}

/**
 * Main plugin function
 *
 * @param {Array} sagas array of saga functions
 * @param args other parameters acceptable by rudux-saga runSaga function
 * @return {Function}
 */
export function VuexSaga({ sagas = [], ...args } = {}) {
    return store => {
        const channel = stdChannel();
        // eslint-disable-next-line no-param-reassign
        store.sagaDispatch = (type, payload) => channel.put({ type, payload });
        sagas.forEach(saga => {
            runSaga(
                {
                    channel,
                    dispatch: output => store.commit(output),
                    getState: () => store.state,
                    ...args
                },
                saga
            );
        });
    };
}
