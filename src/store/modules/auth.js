import axios from 'axios'
import env from '../env';
const Auth = {
    name: 'auth',
    namespaced: true,
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        cookie: '',
        user: {}
    },
    mutations: {
        rgst(state) {
            state.status = 'loading'
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        error(state) {
            state.status = 'error'
        },
        success(state) {
            state.status = 'success'
        }
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: `${env.BASE_URL}/login`, data: user, method: 'POST' })
                    .then((result) => {
                        let { token, user, agentDetail } = result.data
                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))
                        localStorage.setItem('agentDetail', JSON.stringify(agentDetail))
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve()
                    }).catch((err) => {
                        // console.log('e', err)
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    });
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: `${env.BASE_URL}/register`, data: user, method: 'POST' })
                    .then((res) => {
                        const token = res.data.token
                        let user = res.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Autorization'] = token
                        commit('auth_success', token, user)
                        resolve(res)
                    }).catch((err) => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    });
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve();
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        currentStatus: state => state.status,
        getUser: state => state.user
    }
};


export default Auth