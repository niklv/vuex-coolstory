<template>
    <body>
        <br />
        <label for="newItem">New item:</label><input id="newItem" type="text" v-model="newItem" />
        <br />
        <br />
        <button @click="addItem({ item: newItem })">Add</button>
        <ul v-for="item in items">
            <li>{{ item }}</li>
        </ul>
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
        ...mapState(['items'])
    },
    methods: {
        ...mapSagaActions(['addItem'])
    }
};
</script>
