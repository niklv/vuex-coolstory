<template>
    <body>
        <br />
        <label for="newItem">New item:</label><input id="newItem" type="text" v-model="newItem" />
        <br />
        <br />
        <button @click="addItem({ item: newItem })">Add</button>
        <table>
            <tr>
                <th>moduleA</th>
                <th>moduleB</th>
            </tr>
            <tr>
                <td>
                    <ul v-for="item in itemsA">
                        <li>{{ item }}</li>
                    </ul>
                </td>
                <td>
                    <ul v-for="item in itemsB">
                        <li>{{ item }}</li>
                    </ul>
                </td>
            </tr>
        </table>
    </body>
</template>

<script>
import { mapState } from 'vuex';
import { mapSagaActions } from '../../../index';

export default {
    name: 'app',
    data() {
        return {
            newItem: ''
        };
    },
    computed: {
        ...mapState({ itemsA: state => state.moduleA.items, itemsB: state => state.moduleB.items })
    },
    methods: {
        ...mapSagaActions(['addItem'])
    }
};
</script>
