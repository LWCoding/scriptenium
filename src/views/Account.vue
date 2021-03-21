<template>
  <div v-if="isLoading" id="loading-cover" />
  <div v-if="isLoading" class="loading" id="loading-gif">
    <img src="../assets/loading.gif">
    <h3 style="color: white;">Downloading Content...</h3>
  </div>
  <div id="main">
    <CreditToolbar />
    <ProfileBubbles v-on:setSelected="setSelected" ref="bubbleSel" /> <!-- this.$refs.bubbleSel.selected -->
    <div id="current-ui">
      <MyInfo :style='{display: (selected == 0) ? "" : "none"}' />
      <MyCourses v-on:loadScreen="loading" :style='{display: (selected == 1) ? "" : "none"}' />
      <PublicCourses v-on:loadScreen="loading" :style='{display: (selected == 2) ? "" : "none"}' />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import CreditToolbar from "@/components/CreditToolbar.vue";
import Footer from "@/components/Footer.vue";
import ProfileBubbles from "@/components/ProfileBubbles.vue";
import MyInfo from "@/components/MyInfo.vue";
import MyCourses from "@/components/MyCourses.vue";
import PublicCourses from "@/components/PublicCourses.vue";

export default defineComponent({
  name: "Account",
  components: {
    CreditToolbar, Footer, ProfileBubbles, MyInfo, MyCourses, PublicCourses
  },
  data() {
    return {
      selected: 0,
      isLoading: false,
      courses: [

      ]
    }
  },
  methods: {
    logout() {
      axios.get("/logout").then(() => {
        window.location.href = "/"
      })
    },
    setSelected(value : number) {
      this.selected = value
    },
    loading() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 800)
    }
  },
  async created() {
    const getProfile = await axios.get("/logged-in", {
      responseType: 'json'
    });
    console.log(getProfile)
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
  #loading-cover {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);  
    z-index: 10;
  }
  #loading-gif {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  #loading-gif img {
    margin-bottom: 1vh;
    width: 5vw;
  }
  #pale-toolbar {
    background: rgba(0, 0, 0, 0.8) !important;
  }
  #current-ui {
    margin-top: calc(155px + 25vw);
    width: 100vw;
    height: 65vh;
    margin-bottom: 10vh;
  }
  @media only screen and (max-width: 700px) {
    #current-ui {
      margin-top: 495px;
      height: 100vh;
    }
  }
</style>