import serviceUtils from '../services/serviceUtils'

let services = new serviceUtils()
const Setting = {
    name: 'setting',
    namespaced: true,
    state: {
        status: '',
    },
    mutations: {
        error(state) {
            state.status = 'error'
        },
        success(state) {
            state.status = 'success'
        },
        loading(state) {
            state.status = 'loading'
        }
    },
    actions: {
        addStaff({ commit }, userInfo) {
            commit('loading')
            return services.ApiPOST('setting/addStaff', userInfo)
        },
        getStaff({ commit }) {
            commit('loading');
            return services.ApiGET('setting/getStaff')
        },
        saveUser({ commit }, userInfo) {
            commit('loading');
            return services.ApiPOST('setting/saveUser', userInfo);
        },
        deleteUser({ commit }, userID) {
            commit('loading');
            return services.ApiPOST('setting/deleteUser', { userID });
        }
    },
    getters: {
        currentStatus: state => state.status,
    }
};


export default Setting