<template>
    <div id="section">
        <div id="column">
            <Course v-for="course in courses" :enrolled="false" :key="course._id" :title="course.title" :desc="course.description" :thumbnail="course.thumbnail" :tags="course.tags.split(' ')" v-on:enrollCourse="enrollCourse" />
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
    },
    methods: {
        enrollCourse(value : string) {
            this.$emit("enrollCourse", value)
        }
    },
    props: ["courses"]
});
</script>

<style lang="scss" scoped>
    #section {
        width: 90%;
        height: 100%;
        text-align: center;
        margin-right: 5vw;
        margin-left: 5vw;
    }
    #column {
        background: rgb(134, 141, 134);
        padding-top: 3vh;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(10, 1fr);
        overflow-y: scroll;
        position: relative;
    }
    #column:empty::after {
        content: "You've enrolled in every course... Impressive.";
        color: white;
        font-family: "Montserrat";
        position: absolute;
        font-size: 24px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @media only screen and (max-width: 1100px) {
        #column {
            grid-template-columns: 1fr;
        }
    }
</style>
