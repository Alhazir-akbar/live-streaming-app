<!-- src/components/Stream/StreamDetail.vue -->

<template>
  <div>
    <h1>{{ stream.title }}</h1>
    <p>{{ stream.description }}</p>
    <StreamPlayer :stream="stream" />
    <DonationList :streamId="stream.id" />
    <CommentList :streamId="stream.id" />
    <CommentForm :streamId="stream.id" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StreamPlayer from './StreamPlayer.vue'
import DonationList from '../Donation/DonationList.vue'
import CommentList from '../Comment/CommentList.vue'
import CommentForm from '../Comment/CommentForm.vue'

export default {
  components: {
    StreamPlayer,
    DonationList,
    CommentList,
    CommentForm
  },
  computed: {
    ...mapState({
      stream: (state) => state.streams.find((s) => s.id === Number(this.$route.params.id))
    })
  },
  created() {
    this.fetchStreams()
  },
  methods: {
    ...mapActions(['fetchStreams'])
  }
}
</script>

<!-- src/components/Stream/StreamDetail.vue -->

<script>
import io from 'socket.io-client'

export default {
  components: {
    StreamPlayer,
    DonationList,
    CommentList,
    CommentForm
  },
  computed: {
    ...mapState({
      stream: (state) => state.streams.find((s) => s.id === Number(this.$route.params.id))
    })
  },
  created() {
    this.fetchStreams()
    this.setupWebSocket()
  },
  methods: {
    ...mapActions(['fetchStreams']),
    setupWebSocket() {
      const socket = io(`ws://localhost:8000/ws/stream/${this.$route.params.id}/`)
      socket.on('connect', () => {
        console.log('Connected to WebSocket')
      })
      socket.on('message', (data) => {
        const message = JSON.parse(data)
        console.log('Received message:', message)
        // Handle real-time updates
      })
      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket')
      })
    }
  }
}
</script>
