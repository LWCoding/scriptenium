<template>
  <div id="main">
    <Toolbar />
    <div id="image-overlay">
      <img src="../assets/keyboard.jpg" id="bg-image">
      <div id="bg-text">
        <h2 id="bg-text-msg">We'll help you get there, one step at a time.</h2>
        <p id="bg-text-content">With Scriptenium, you can learn how to program in a relaxing, filler-free, readily-available way!</p>
        <a class="button-link" @click="checkout" style="padding: 0.6em 2.5em;">Check It Out!</a>
      </div>
    </div>
  </div>
  <div class="spacer" />
  <InfoRow />
  <div style="height: 11vh;" />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import InfoRow from "@/components/InfoRow.vue";
import Footer from "@/components/Footer.vue";
import Toolbar from "@/components/Toolbar.vue";

export default defineComponent({
  name: "Home",
  components: {
    InfoRow, Footer, Toolbar
  },
  methods: {
    checkout: () => {
      axios.get("/logged-in").then(() => {
        window.location.href = "/account"
      }).catch(() => {
        window.location.href = "/register"
      })
    }
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = "Homepage | Scriptenium";
        }
    },
  }
});
</script>

<style lang="scss" scoped>
  $background-offset: 76px;

  #main {
    height: 100vh;
  }
  #bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(70%);
  }
  #image-overlay {
    width: 100vw;
    height: 95vh;
    position: relative;
  }
  #bg-text {
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    max-width: 38rem;
    width: 70%;
    transform: translate(-50%, -50%);
  }
  #bg-text-msg {
    margin-top: $background-offset;
    font-size: 48px;
    color: white;
    margin-bottom: 0.4em;
  }
  #bg-text-content {
    font-size: 20px;
    color: rgb(207, 207, 207);
    margin-bottom: 2em;
  }
  @media only screen and (max-width: 670px) {
    #bg-text-msg {
      font-size: 40px;
      margin-top: 0 !important;
    }
    #bg-text-content {
      font-size: 18px;
    }
    #bg-text {
      width: 85%;
    }
  }
  @media only screen and (max-height: 400px) {
    #bg-text {
      width: 100%;
    }
    #bg-text-msg {
      font-size: 34px;
      margin-bottom: 0.2em;
    }
    #bg-text-content {
      margin-bottom: 1.6em;
    }
  }
</style>