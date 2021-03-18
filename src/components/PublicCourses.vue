<template>
    <div id="section">
        <h2>Public Courses</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PublicCourses"
});
</script>

<style lang="scss" scoped>
    #section {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
</style>
