<template>
    <div id="wrapper">
        <div id="section">
            <div id="profile-bubble" class="bubble" v-bind:class="{selectedBubble: selected == 0, middleStack: lastSelected == 0}" @click="switchSelected(0);">
                <span>Profile</span>
            </div>
            <div id="my-courses" class="bubble" v-bind:class="{selectedBubble: selected == 1, middleStack: lastSelected == 1}" @click="switchSelected(1);">
                <span>My Courses</span>
            </div>
            <div id="all-courses" class="bubble" v-bind:class="{selectedBubble: selected == 2, middleStack: lastSelected == 2}" @click="switchSelected(2);">
                <span>All Courses</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileBubbles",
  data() {
      return {
          selected: 0,
          lastSelected: 0
      }
  },
  methods: {
      switchSelected: function(num : number) : void {
          this.lastSelected = this.selected
          this.selected = num
          this.$emit("setSelected", this.selected)
      }
  }
});
</script>

<style lang="scss" scoped>
    $circDiameter: 20vw;
    $circFont: 3.5vw;
    #wrapper {
        position: absolute;
        top: 140px;
        left: 50%;
        transform: translateX(-50%);
    }
    #section {
        display: flex;
        flex-direction: row;
    }
    .bubble {
        opacity: 0.5;
        transition: transform 1s ease-in-out, opacity 1s ease-in-out;
        position: relative;
        margin: 0 1.5vw;
    }
    .bubble:hover {
        cursor: pointer;
    }
    .selectedBubble {
        transform: scale(1.07, 1.07);
        opacity: 1;
        z-index: 3 !important;
    }
    .middleStack {
        z-index: 2 !important;
    }
    .bubble span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-align: center;
    }
    #profile-bubble {
        width: $circDiameter;
        height: $circDiameter;
        border-radius: $circDiameter / 2;
        background: rgb(235, 73, 73);
        font-size: $circFont;
        z-index: 1;
    }
    #my-courses {
        width: $circDiameter;
        height: $circDiameter;
        border-radius: $circDiameter / 2;
        background: rgb(73, 122, 235);
        font-size: $circFont;
        z-index: 1;
    }
    #all-courses {
        width: $circDiameter;
        height: $circDiameter;
        border-radius: $circDiameter / 2;
        background: rgb(28, 190, 42);
        font-size: $circFont;
        z-index: 1;
    }
    @media only screen and (max-width: 700px) {
        $circDiameter: 180px;
        $circFont: 30px;
        #section {
            width: $circDiameter;
            position: relative;
        }
        .bubble {
            position: absolute;
            transform: translateX(-7px);
        }
        #profile-bubble {
            width: $circDiameter;
            height: $circDiameter;
            border-radius: $circDiameter / 2;
            font-size: $circFont;
        }
        #my-courses {
            width: $circDiameter;
            height: $circDiameter;
            border-radius: $circDiameter / 2;
            font-size: $circFont;
            top: 120px;
            left: -80px;
        }
        #all-courses {
            width: $circDiameter;
            height: $circDiameter;
            border-radius: $circDiameter / 2;
            font-size: $circFont;
            top: 120px;
            left: 80px;
        }
    }
</style>
