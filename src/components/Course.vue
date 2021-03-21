<template>
    <article id="course" v-bind:class="{disappear: clicked}">
        <img class="course-thumbnail" :src="thumbnail" onerror="this.src = 'https://i.ibb.co/PtzKbPs/logo.png'" alt="Course thumbnail">
        <div class="course-right">
            <h3 class="course-title">{{title}}</h3>
            <p class="course-desc">{{desc}}</p>
            <div class="course-tags">
                <p v-for="(tag, index) in tags" :key="index">{{tag}}</p>
            </div>
            <div id="button-row">
                <button v-if="enrolled" @click="loadCourse" class="course-button">Learn</button>
                <button v-if="enrolled" @click="unenrollCourse" class="course-button">Unenroll</button>
                <button v-if="!enrolled" @click="enrollCourse" class="course-button">Enroll</button>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Course",
    props: ["title", "desc", "tags", "thumbnail", "enrolled"],
    data() {
        return {
            clicked: false
        }
    },
    methods: {
        unenrollCourse() {
            this.clicked = true
            this.$emit('unenrollCourse', this.title)
            setTimeout(() => {
                this.clicked = false
            }, 800)
        },
        enrollCourse() {
            this.clicked = true
            this.$emit('enrollCourse', this.title)
            setTimeout(() => {
                this.clicked = false
            }, 800)
        }
    }
});
</script>

<style lang="scss" scoped>
    #course {
        transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
    }
    .disappear {
        transform: scale(0.8, 0.8) !important;
        opacity: 0 !important;
    }
    .dark-gray {
        background: #dedede !important;
    }
    .course-text-block {
        min-height: 60vh !important;
    }
    .course-right > * {
        background: none;
    }
    .course-right > button {
        background: white;
    }
    .course-title {
        margin-bottom: 2vh;
        font-size: 26px;
    }
    .course-desc {
        font-size: 14px;
    }
    .course-title, .course-title > span {
        word-spacing: 2.5px;
        font-size: 2rem;
        font-weight: 500;
    }
    article {
        display: flex;
        flex-direction: row;
        text-align: left;
        padding-left: 1vw;
        background: white;
        border-radius: 0px;
        padding: 20px 0;
        margin: 0 2vw 2vh 2vw;
        border-radius: 4px;
    }
    .course-title, .course-desc, .course-tags, .course-header {
        margin-left: 2vw;
        margin-right: 2vw;
        overflow-wrap: break-word;
        white-space: normal;
    }
    .course-tags {
        display: flex;
        flex-direction: row;
        text-transform: capitalize;
        flex-wrap: wrap;
        font-size: 10px;
        justify-content: left;
        margin-top: 2vh;
    }
    .course-tags > p {
        margin-top: 3px;
    }
    .course-tags > *:before {
        content: "";
        display: inline-block;
        width: 1vh;
        height: 1vh;
        border-radius: 1vh;
        margin-right: 0.5vh;
        background: white;
    }
    .course-tags > * {
        background-color: rgb(80, 80, 80);
        border-radius: 8px;
        padding: 0.5vh 0.5vw;
        margin-right: 0.25vw;
        color: white;
    }
    .course-right {
        flex: 1;
    }
    .course-thumbnail {
        object-fit: cover;
        height: 180px;
        width: 180px;
        padding: 10px;
        margin: auto 0;
        background: white;
        margin-left: 2vw;
        margin-right: 2vw;
    }
    .course-button {
        background: white;
        letter-spacing: 0.5px;
        margin-top: 2vh;
        width: 8em;
        height: 3em;
        margin-right: 1vw;
    }
    #button-row {
        margin-left: 2vw;
        margin-right: 2vw;
    }
    .course-button:hover {
        cursor: pointer;
    }
    .course-button:focus {
        outline: none;
    }
    @media only screen and (min-width: 800px) {
        article {
            transition: transform 0.6s ease;
        }
        article:hover {
            transform: scale(1.01);
        }
    }
    @media only screen and (max-width: 500px) {
        .course-thumbnail {
            width: 160px;
            height: 160px;
        }
    }
    @media only screen and (max-width: 900px) {
        .course-button {
            width: 7em;
        }
    }
    @media only screen and (max-width: 500px) {
        article {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-left: 6vw;
            margin-right: 6vw;
            margin-bottom: 3vh;
        }
        .course-title {
            margin-top: 1vh;
            letter-spacing: 0.6px;
        }
        .course-title, .course-desc, .course-info, .course-tags, .course-header {
            margin-left: 3vw;
            margin-right: 3vw;
        }
        .course-tags {
            justify-content: center;
        }
        .course-tags > * {
            margin-left: 0.5vw;
            margin-right: 0.5vw;
        }
    }
</style>
