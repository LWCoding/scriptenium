<template>
    <img src="../assets/logo.png" id="bg-logo" onclick="window.location.href = '/'">
    <div id="account">
      <span id="level">Level {{level}} ({{xp}} / {{xpNeeded}})</span>
    </div>
    <div id="pale-toolbar"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "CreditToolbar",
  data() {
    return {
      level: 1,
      xp: 0,
      xpNeeded: 100
    }
  },
  created() {
    axios.get("/logged-in").then((res) => {
      let user = res.data.user
      this.level = user.level
      this.xp = user.xp
      this.xpNeeded = user.xpNeeded
      return
    }).catch((error) => {
      return
    })
  }
});
</script>

<style lang="scss" scoped>
  $background-offset: 76px;

  #level {
    color: white;
    font-size: 18px;
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
    top: 28px;
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
      right: 16px;
    }
    #signup {
      margin-right: 0.2em;
    }
  }
</style>

