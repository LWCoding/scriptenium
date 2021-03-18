<template>
    <img src="../assets/logo.png" id="bg-logo" onclick="window.location.href = '/'">
    <div id="account">
    <a class="button-link" id="signup" href="/login">Sign Up</a> 
    <a class="button-link" href="/login">Log In</a>
    </div>
    <div id="pale-toolbar"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Toolbar"
});
</script>

<style lang="scss" scoped>
  $background-offset: 76px;

  #pale-toolbar {
    top: 0;
    left: 0;
    height: $background-offset;
    width: 100vw;
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    z-index: 1;
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
  @media only screen and (max-width: 670px) {
    #account {
      top: 32px;
      right: 16px;
    }
    #signup {
      margin-right: 0.2em;
    }
  }
</style>

