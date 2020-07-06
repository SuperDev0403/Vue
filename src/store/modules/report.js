import serviceUtils from '../services/serviceUtils'

let services = new serviceUtils()
const Report = {
    name: 'report',
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
        gettingHistory(state) {
            state.status = 'gettingHistory'
        },
        gettingAccount(state) {
            state.status = 'gettingAccount'
        },
        loading(state) {
            state.status = 'loading'
        }
    },
    actions: {
        getStatementData({ commit }) {
            commit('loading')
            return services.ApiGET('report/getStatementData')
        },
        confirmWithraw({ commit }, data) {
            commit('gettingHistory')
            return services.ApiPOST('report/confirmWithraw', data)
        },
        getWithdraws({ commit }) {
            commit('gettingHistory')
            return services.ApiGET('report/getWithdraws')
        },
        createDeposit({ commit }, data) {
            commit('gettingHistory')
            return services.ApiPOST('report/createDeposit', data);
        },
        getDeposits({ commit }) {
            commit('gettingHistory')
            return services.ApiGET('report/getDeposits')
        },
        getAccounts({ commit }) {
            commit('gettingAccount')
            return services.ApiGET('report/getAccount')
        }
    },
    getters: {
        currentStatus: state => state.status,
    }
};


export default Report