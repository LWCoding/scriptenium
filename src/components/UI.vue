<template>
    <div>
        <div id="toolbar">
            <button class="tab" @click="activeTab = 1" v-bind:class="{'activeTab': activeTab == 1}">My Info</button>
            <button class="tab" @click="activeTab = 2" v-bind:class="{'activeTab': activeTab == 2}">My Courses</button>
            <button class="tab" @click="activeTab = 3" v-bind:class="{'activeTab': activeTab == 3}">Course Finder</button>
            <div />
        </div>
        <div id="gui">
            <MyInfo class="gui-section" v-bind:class="{'isShowing': activeTab == 1}" />
            <MyCourses class="gui-section" v-bind:class="{'isShowing': activeTab == 2}" />
            <PublicCourses  class="gui-section" v-bind:class="{'isShowing': activeTab == 3}" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyInfo from "@/components/MyInfo.vue";
import MyCourses from "@/components/MyCourses.vue";
import PublicCourses from "@/components/PublicCourses.vue";

export default defineComponent({
  name: "UI",
  components: {
    MyInfo, MyCourses, PublicCourses
  },
  data() {
      return {
          activeTab: 1
      }
  }
});
</script>

<style lang="scss" scoped>
    $uipadding: 8vw;
    $uiwidth: auto;

    #toolbar * {
        flex: 1;
    }
    .tab {
        font-size: 22px;
        text-align: center;
        width: 100%;
        height: 100%;
        background: rgba(119, 119, 119, 0.3);
        border-right: 2px solid black;
        border-left: 2px solid black;
        border-bottom: 4px solid black;
    }
    .tab:first-child {
        border-left: none;
    }
    .tab:nth-last-child(2) {
        border-right: none;
    }
    .gui-section {
        display: none;
    }
    .activeTab {
        background: rgba(119, 119, 119, 0.8) !important;
    }
    .isShowing {
        display: block;
    }
    #toolbar {
        margin: 0 $uipadding;
        height: 80px;
        width: $uiwidth;
        display: flex;
        flex-direction: row;
    }
    #gui {
        margin: 0 $uipadding;
        height: 600px;
        width: $uiwidth;
        background: darkgray;
    }
</style>
