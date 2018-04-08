import Vue from 'vue';
import Vuex from 'vuex';

//import * as actions from './actions';
//import * as getters from './getters';

import auth from './modules/auth';
import broadcast from './modules/broadcast';
import chat from './modules/chat';
import board from './modules/board';
import admin from './modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
    //actions,
    //getters,
    modules: {
        auth,
        broadcast,
        chat,
        board,
        admin,
    }
})