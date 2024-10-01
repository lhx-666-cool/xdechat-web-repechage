import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            isInputOccupied: false,
        };
    },
    mutations: {
        SET_INPUT_OCCUPIED(state, isOccupied) {
            state.isInputOccupied = isOccupied;
        },
    },
    actions: {
        setInputOccupied({ commit }, isOccupied) {
            commit('SET_INPUT_OCCUPIED', isOccupied);
        },
    },
});
