import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    crmUserName: '',
	crmpassword: '',
	wxType: '',
}

const mutations = {}

const actions = {}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})