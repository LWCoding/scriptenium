<template>
  <Header msg="We'll help you get there, one step at a time." content="With Scriptenium, you can learn how to program in a relaxing, filler-free, readily-available way!" />
  <div class="spacer" />
  <InfoRow />
  <div class="spacer" />
  <UI />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import InfoRow from "@/components/InfoRow.vue";
import UI from "@/components/UI.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header, UI, InfoRow
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