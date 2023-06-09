const { getApiClient } = require('@/helpers/sos-diesel-api-client');
import LocalStorageService from '@/helpers/local-storage-service';
const api = getApiClient();

export const state = {
    user: sessionStorage.getItem('user'),
}

export const mutations = {
    SET_CURRENT_USER(state, newUser) {
        //LocalStorageService.setItem('user', newUser)
        sessionStorage.setItem("user", JSON.stringify(newUser)); 
        state.user = newUser
        saveState('user', newUser)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.user
    },
    loggedInUser(state) {
        return state.user
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },


    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return api.authenticate(
            email,
            password,
        )
        // eslint-disable-next-line no-unused-vars
        .then(token => {
            return api.post('/users/get-one-by-email', { email: email })
            .then(user => { 
                const USER = user?.fields;
                commit('SET_CURRENT_USER', USER);
                return user;
            }).catch(err => {
                dispatch('notification/error', err?.response?.data?.error, { root: true });
                console.error(err)
                throw err;
            });
        })
        .catch(err => {
            dispatch('notification/error', err?.response?.data?.error, { root: true });
            throw err;
        })
    },

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
        sessionStorage.setItem('user', null);
        LocalStorageService.clearSession();
    },

    // register the user
/*     register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().registerUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    }, */

    // register the user
    // eslint-disable-next-line no-unused-vars
/*     resetPassword({ commit, dispatch, getters }, { email } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().forgetPassword(email).then((response) => {
            const message = response.data
            return message
        });
    }, */

    setUser({ commit }, user ) {
        commit('SET_CURRENT_USER', user);
        return user;
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.user) return Promise.resolve(null)
        // TO-DO: FIX getAuthenticatedUser
        //const user = getFirebaseBackend().getAuthenticatedUser();
        const user = JSON.parse(sessionStorage.getItem('user'));
        commit('SET_CURRENT_USER', user)
        return user;
    },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}
