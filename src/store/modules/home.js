import serviceUtils from '../services/serviceUtils'

let services = new serviceUtils()
const Home = {
    name: 'home',
    namespaced: true,
    state: {
        status: '',
        loading: false
    },
    mutations: {
        error(state) {
            state.loading = false
            state.status = 'error'
        },
        success(state) {
            state.status = 'success'
            state.loading = false
        },
        loading(state) {
            state.status = 'loading'
            state.loading = true
        }
    },
    actions: {
        getSummary({ commit }) {
            commit('loading');
            return services.ApiGET('getSummary');
        }
    },
    getters: {
        currentStatus: state => state.status,
        isLoading: state => state.loading
    }
};


export default Home