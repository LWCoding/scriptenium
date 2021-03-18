<template>
  <div id="main">
    <Toolbar />
    <h1 style="text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">This is currently a work in progress. You are logged in as {{username}}.</h1>
    <button style="position: absolute; top: 70%; left: 50%; transform: translate(-50%, -50%);" @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Toolbar from "@/components/Toolbar.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "Account",
  components: {
    Toolbar, Footer
  },
  data() {
    return {
      username: ""
    }
  },
  methods: {
    logout: () => {
      axios.get("/logout").then(() => {
        window.location.href = "/"
      })
    }
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = "Account | Scriptenium";
        }
    },
  }
});
</script>

<style lang="scss">
  #pale-toolbar {
    background: rgba(0, 0, 0, 0.8) !important;
  }
</style>