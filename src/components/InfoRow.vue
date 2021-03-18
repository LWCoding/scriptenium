<template>
    <div id="info">
        <div class="content-block">
          <h2>Work Efficiently</h2>
          <p>Learn programming content without the filler. Everything is structured so you make the most out of it.</p>
          <img src="../assets/gauge.png">
        </div>
        <div class="content-block">
          <h2>Train Your Brain</h2>
          <p>We don't cram our information. We balance everything for you, so you don't have to worry about anything.</p>
          <img src="../assets/dumbell.png">
        </div>
        <div class="content-block">
          <h2>Repeat Anytime</h2>
          <p>Our content is always readily available, and you can go back to courses you've enrolled in. No hassle here!</p>
          <img src="../assets/loop.png">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InfoRow"
});
</script>

<style scoped>
  #info {
    width: 100vw;
    height: 100%;
    padding: 0 8vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    text-align: center;
  }
  .content-block h2 {
    font-size: 30px;
  }
  .content-block p {
    font-size: 16px;
    max-width: 20em;
    line-height: 1.4em;
    margin: 10px auto 30px auto;
  }
  .content-block img {
    width: 40%;
  }
  @media only screen and (max-width: 1100px) {
    #info {
      padding: 0 3vw;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media only screen and (max-width: 1000px) {
    #info {
      padding: 0 4vw;
      grid-template-columns: 1fr 1fr;
    }
    .content-block img {
      margin-bottom: 2em;
      width: 150px;
    }
    .content-block:last-child {
      grid-column: span 2;
    }
    .content-block p {
      margin: 10px auto 15px auto;
    }
  }
  @media only screen and (max-width: 670px) {
    #info {
      padding: 0 4vw;
      grid-template-columns: 1fr;
    }
    .content-block img {
      width: 120px;
    }
  }
</style>
