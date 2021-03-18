<template>
  <div id="main">
    <Toolbar />
    <div id="image-overlay">
      <img src="../assets/database.jpg" id="bg-image">
      <h1 style="position: absolute; top: 50%; left: 50%; transform: translateX(-50%); color: white;">This is currently a work in progress.</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";

export default defineComponent({
  name: "Header",
  components: { 
    Toolbar
  },
  props: {
    msg: String,
    content: String
  },
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
    filter: brightness(50%);
  }
  #image-overlay {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
</style>

