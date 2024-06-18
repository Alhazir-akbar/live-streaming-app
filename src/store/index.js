// src/store/index.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    streams: [],
    donations: [],
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setStreams(state, streams) {
      state.streams = streams
    },
    setDonations(state, donations) {
      state.donations = donations
    },
    setComments(state, comments) {
      state.comments = comments
    }
  },
  actions: {
    async fetchStreams({ commit }) {
      const response = await axios.get('/api/stream/')
      commit('setStreams', response.data)
    },
    async fetchDonations({ commit }, streamId) {
      const response = await axios.get(`/api/donation/?stream=${streamId}`)
      commit('setDonations', response.data)
    },
    async fetchComments({ commit }, streamId) {
      const response = await axios.get(`/api/comment/comments/?stream_id=${streamId}`)
      commit('setComments', response.data)
    }
  },
  modules: {}
})
