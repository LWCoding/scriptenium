<template>
  <div id="main">
    <img src="../assets/logo.png" id="bg-logo" onclick="window.location.href = '/'">
    <div id="account">
      <a class="button-link" id="signup" href="/about">Sign Up</a> 
      <a class="button-link" href="/about">Log In</a>
    </div>
    <div id="pale-toolbar"></div>
    <div id="image-overlay">
      <img src="../assets/keyboard.jpg" id="bg-image">
      <div id="bg-text">
        <h2 id="bg-text-msg">{{ msg }}</h2>
        <p id="bg-text-content">{{ content }}</p>
        <a class="button-link" href="/" style="padding: 0.6em 2.5em;">Check It Out!</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    msg: String,
    content: String
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  #pale-toolbar {
    top: 0;
    left: 0;
    height: $background-offset;
    width: 100vw;
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    z-index: 1;
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
  #bg-logo {
    position: absolute;
    width: 65px;
    top: 4px;
    left: 8px;
    transition: transform 0.7s ease-in-out;
    z-index: 2;
  }
  #account {
    position: absolute;
    top: 30px;
    right: 24px; 
    font-size: 16px;
    z-index: 2;
  }
  #signup {
    margin-right: 0.6rem;
    background: none !important;
  }
  #bg-logo:hover {
    transform: scale(1.08, 1.08);
    cursor: pointer;
  }
</style>

