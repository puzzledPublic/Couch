import Vue from 'vue';
import Vuex from 'vuex';

//import * as actions from './actions';
//import * as getters from './getters';

import auth from './modules/auth';
import broadcast from './modules/broadcast';

Vue.use(Vuex);

export default new Vuex.Store({
    //actions,
    //getters,
    modules: {
        auth,
        broadcast
    }
})