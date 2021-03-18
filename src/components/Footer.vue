<template>
    <div id="footer">
        <h2 id="footer-name">Scriptenium™</h2>
        <h2 id="footer-info">Created 3/17/2021</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer"
});
</script>

<style scoped>
    #footer {
        width: 100vw;
        height: 70px;
        background: rgb(36, 36, 36);
        position: relative;
        color: rgb(230, 230, 230);
    }
    #footer-name {
        position: absolute;
        top: 50%;
        left: 2em;
        font-size: 18px;
        transform: translateY(-50%);
    }
    #footer-info {
        position: absolute;
        top: 50%;
        right: 2.5em;
        font-size: 18px;
        transform: translateY(-50%);
    }
    @media only screen and (max-width: 700px) {
        #footer-name, #footer-info {
            font-size: 16px;
        }
        #footer-name {
            left: 1em;
        }
        #footer-info {
            right: 1em;
        }
    }
</style>
