<template>
  <div id="main">
    <Toolbar />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toolbar from "@/components/Toolbar.vue";
import InfoRow from "@/components/InfoRow.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "Home",
  components: {
    Toolbar, InfoRow, Footer
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