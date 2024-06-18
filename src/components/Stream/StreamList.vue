<!-- src/components/Stream/StreamList.vue -->

<template>
  <div>
    <h1>Streams</h1>
    <ul>
      <li v-for="stream in streams" :key="stream.id">
        <router-link :to="{ name: 'Stream', params: { id: stream.id } }">{{ stream.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['streams'])
  },
  created() {
    this.fetchStreams()
  },
  methods: {
    ...mapActions(['fetchStreams'])
  }
}
</script>
