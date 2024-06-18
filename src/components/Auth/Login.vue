<!-- src/components/Auth/Login.vue -->

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async login() {
      try {
        const response = await axios.post('/api/account/login/', {
          username: this.username,
          password: this.password
        })
        this.setUser(response.data.user)
        // Simpan token di local storage atau Vuex store
        localStorage.setItem('token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        this.$router.push('/')
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
  }
}
</script>
