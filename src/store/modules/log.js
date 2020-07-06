import serviceUtils from '../services/serviceUtils'

let services = new serviceUtils()
const Log = {
    name: 'log',
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
        getAdminHistory({ commit }, userID) {
            commit('loading')
            if (userID) {
                return services.ApiPOST('log/getAdminHistory', { userID });
            }
            else {
                return services.ApiGET('log/getAdminHistory');
            }

        }
    },
    getters: {
        currentStatus: state => state.status,
    }
};


export default Log