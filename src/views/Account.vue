<template>
  <div v-if="isLoading" id="loading-cover" />
  <div v-if="isLoading" id="loading-gif">
    <img src="../assets/loading.gif">
    <h3 style="color: white;">Downloading Content...</h3>
  </div>
  <div id="main">
    <CreditToolbar />
    <ProfileBubbles v-on:setSelected="setSelected" ref="bubbleSel" /> <!-- this.$refs.bubbleSel.selected -->
    <div id="current-ui">
      <MyInfo :style='{display: (selected == 0) ? "" : "none"}' />
      <MyCourses v-bind:courses="enrolledCourses" v-on:unenrollCourse="unenrollCourse" :style='{display: (selected == 1) ? "" : "none"}' />
      <PublicCourses v-bind:courses="courses" v-on:enrollCourse="enrollCourse" :style='{display: (selected == 2) ? "" : "none"}' />
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
        {
          title: "Test Course",
          description: "This is a dumb description",
          tags: "Beginner Python",
          thumbnail: "http://assets.stickpng.com/images/5848152fcef1014c0b5e4967.png"
        }
      ],
      enrolledCourses: [
        {
          title: "Other Test Course",
          description: "This is a dumb description",
          tags: "Beginner Javascript",
          thumbnail: "data:image/png;base64,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"
        }
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
    enrollCourse(title : string) {
      this.isLoading = true
      const idx = this.courses.findIndex((course) => course.title == title)
      axios.post("/enroll", { title })
      setTimeout(() => {
        this.enrolledCourses.push(this.courses.splice(idx, 1)[0])
        this.isLoading = false
      }, 800)
    },
    unenrollCourse(title : string) {
      this.isLoading = true
      const idx = this.enrolledCourses.findIndex((course) => course.title == title)
      axios.post("/unenroll", { title })
      setTimeout(() => {
        this.courses.push(this.enrolledCourses.splice(idx, 1)[0])
        this.isLoading = false
      }, 800)
    }
  },
  async created() {
    const allCourses = await axios.get("/courses", {
      responseType: 'json'
    });
    const enrolledCourses = await axios.get("/enrolled-courses", {
      responseType: 'json'
    });
    this.courses = allCourses.data.courses
    this.enrolledCourses = enrolledCourses.data.courses
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
    text-align: center;
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
    #loading-gif img {
      width: 10vw;
    }
  }
</style>