<template>
    <div id="section">
        <div id="left-column">

        </div>
        <div id="right-column">
            <div style="height: 3vh;" />
            <Course />
            <Course />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Course from "@/components/Course.vue";

export default defineComponent({
    name: "PublicCourses",
    components: {
        Course
    }
});
</script>

<style lang="scss" scoped>
    #section {
        width: 90%;
        height: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        margin-right: 5vw;
        margin-left: 5vw;
    }
    #left-column {
        background: gray;
        width: 35%;
        height: 100%
    }
    #right-column {
        background: coral;
        width: 65%;
        height: 100%;
        overflow-y: scroll;
    }
    @media only screen and (max-width: 700px) {
        #section {
            flex-direction: column;
        }
        #left-column {
            width: 100%;
            height: 35%;
        }
        #right-column {
            width: 100%;
            height: 65%;
        }
    }
</style>
