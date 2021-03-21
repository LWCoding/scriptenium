<template>
    <div id="section">
        <div id="avatar-div">
            <img id="avatar" src="../assets/avatar.png">
            <h2 id="avatar-overlay">{{username}}</h2>
        </div>
        <div class="two-columns column">
            <h2 id="checkup-text">Check back regularly and see your stats change!</h2>
            <div class="text-spacer" />
            <div class="row">
                <h3 class="even-text">Level {{level}}</h3>
                <div class="bar">
                    <div :style="levelBar" id="level-bar" />
                </div>
            </div>
            <div class="text-spacer" />
            <div class="row">
                <h3 class="even-text large-media">XP ({{xp}}/{{xpNeeded}})</h3>
                <h3 class="even-text small-media">XP</h3>
                <div class="bar">
                    <div :style="xpBar" id="xp-bar" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "MyInfo",
  data() {
    return {
      username: "Hello",
      level: 1,
      xp: 0,
      xpNeeded: 100,
      levelProgress: "5%",
      xpProgress: "20%"
    }
  },
  created() {
    axios.get("/logged-in").then((res) => {
      let user = res.data.user
      this.username = user.username
      this.level = user.level
      this.xp = user.xp
      this.xpNeeded = user.xpNeeded
      return
    }).catch((error) => {
      return
    })
  },
  computed: {
    xpBar: function() : Object {
      return {
        width: (this.xp / this.xpNeeded * 100).toString() + "%"
      }
    },
    levelBar: function() : Object {
      return {
        width: (this.level / 20 * 100).toString() + "%"
      }
    }
  }
});
</script>

<style lang="scss" scoped>
    #section {
        width: 90%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        text-align: center;
        margin-right: 5vw;
        margin-left: 5vw;
    }
    #avatar-div {
        position: relative;
    }
    #avatar {
        width: 80%;
        max-width: 300px;
        border-radius: 30%;
        filter: brightness(80%);
    }
    #avatar-overlay {
        position: absolute;
        word-break: break-word;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.5vw;
        color: white;
    }
    #section > div {
        margin-left: 1vw;
        margin-right: 1vw;
    }
    .text-spacer {
        height: 0.8rem;
    }
    .two-columns {
        grid-column: span 2;
    }
    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .column {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .bar {
        width: 100%;
        height: 30px;
        margin-left: 20px;
        margin-right: 3.5vw;
        background: rgb(168, 168, 168);
        position: relative;
    }
    #xp-bar, #level-bar {
        width: 0%;
        height: 30px;
        background: rgb(0, 150, 0);
        position: absolute;
        top: 0;
    }
    .even-text {
        width: 9rem;
        font-size: 20px;
    }
    #checkup-text {
        font-size: 24px;
    }
    .small-media {
        display: none;
    }
    @media only screen and (max-width: 700px) {
        #section {
            grid-template-columns: repeat(1, 1fr);
        }
        #section > div {
            margin: 2vh 1vw;
        }
        .even-text {
            width: 6rem;
        }
        #checkup-text {
            font-size: 20px;
        }
        #avatar {
            max-width: 300px;
        }
        #avatar-overlay {
            font-size: 28px;
        }
        .two-columns {
            margin-left: 10vw;
        }
    }
    @media only screen and (max-width: 500px) {
        .large-media {
            display: none;
        }
        .small-media {
            display: block;
        }
    }
</style>
