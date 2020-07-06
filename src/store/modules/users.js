import serviceUtils from '../services/serviceUtils'

let services = new serviceUtils()
const User = {
    name: 'user',
    namespaced: true,
    state: {
        status: '',
        edit: false,
        backList: [],
        subData: {
            userName: '',
            data: [],
        },
        loading: false,
    },
    mutations: {
        setUserName(state, userName) {
            state.subData.userName = userName;
        },
        setData(state, data) {
            state.subData.data = data;
        },
        error(state) {
            state.loading = false
            state.status = 'error'
        },
        success(state) {
            state.status = 'success'
            state.loading = false
        },
        loading(state) {
            state.loading = true
            state.status = 'loading'
        },
        toggle(state) {
            state.test = ':)'
        },
        edit(state) {
            state.edit = true
        },
        edited(state) {
            state.edit = false
        },
        getttingReport(state) {
            state.status = 'report'
        },
        addBackList(state, data) {
            state.backList.push(data)
        },
        removeBackList(state) {
            state.backList.splice(state.backList.length-1)
        },
        clearBackList(state) {
            state.backList = [];
        }
    },
    actions: {
        getSummary({ commit }, data) {
            commit('loading');
            return services.ApiPOST('getSummary', data);
        },
        exportData({ commit }, userID) {
            commit('loading');
            return services.ApiPOST('exportData', { userID });
        },
        getUserWinLoseReport({ commit }, userID) {
            commit('getttingReport');
            return services.ApiPOST('getUserWinLoseReport', { userID });
        },
        savePercentage({ commit }, data) {
            commit('loading');
            return services.ApiPOST('savePercentage', data);
        },
        getProviders({ commit }) {
            commit('loading');
            return services.ApiGET('getProviders');
        },
        getCustomerInfo({ commit }, data) {
            commit('loading');
            return services.ApiPOST('getCustomerInfo', data);
        },
        editUserInfo({ commit }, data) {
            commit('loading');
            return services.ApiPOST('editUserInfo', data);
        },
        editUser({ commit }, data) {
            commit('loading');
            return services.ApiPOST('editUser', data);
        },
        getGameList({ commit }) {
            commit('loading');
            return services.ApiGET('getGameList');
        },
        getUserLevel({ commit }) {
            commit('loading');
            return services.ApiGET('getUserLevel');
        },
        getAgentUsers() {
            return services.ApiGET('getAgentUsers');
        },
        getUserLevelsAndBanks() {
            return services.ApiGET('getUserLevelsAndBanks');
        },
        getAgentByUserLevel({ commit }, userLevel) {
            commit('loading');
            return services.ApiPOST('getAgentByUserLevel', { userLevel });
        },
        getUsers({ commit }, userID) {
            commit('loading');
            if (userID) {
                return services.ApiPOST('getUsers', { userID });
            } else {
                return services.ApiGET('getUsers');
            }
        },
        createUser({ commit }, user) {
            commit('loading')
            return services.ApiPOST('createUser', user);
        },
        applyAgent({ commit }, data) {
            commit('loading');
            return services.ApiPOST('applyAgent', data);
        },
        test({ commit }) {
            commit('toggle');
        }
    },
    getters: {
        test: state => state.test,
        currentStatus: state => state.status,
        editStatus: state => state.edit,
        userName: state => state.subData.userName,
        subData: state => state.subData.data,
        isLoading: state => state.loading,
        backList: state => state.backList
    }
};


export default User