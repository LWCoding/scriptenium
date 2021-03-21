<template>
  <div id="main">
    <Toolbar />
    <div id="image-overlay">
      <img src="../assets/database.jpg" id="bg-image">
      <div id="message">
        <div id="data-form">
            <h1>Register</h1>
            <form id="register" @submit="submitForm($event)">
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username" autocomplete="off">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" autocomplete="off">
                <label for="reenter">Reenter Password</label>
                <input v-model="reenter" type="password" id="reenter" autocomplete="off">
                <input type="submit" value="Sign In">
            </form>
            <p id="response" v-bind:class='{"isShowing": response != "", "isSuccess": success}'>{{response}}</p>
        </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Toolbar from "@/components/Toolbar.vue";

export default defineComponent({
  name: "Register",
  components: { 
    Toolbar
  },
  data() {
    return {
      username: "",
      password: "",
      reenter: "",
      response: "",
      success: false
    }
  },
  methods: {
    submitForm: async function(event : any) : Promise<void> {
      event.preventDefault()
      if (!this.username || !this.password || !this.reenter) {
        this.response = "Please fill out all required fields."
        this.success = false
        return
      }
      if (this.username.length < 6) {
        this.success = false
        this.response = "Username needs to be at least 4 characters."
        return
      } else if (this.username.length > 16) {
        this.success = false
        this.response = "Username must not be longer than 16 characters."
      } else if (this.password.length < 6) {
        this.success = false
        this.response = "Password needs to be at least 8 characters."
        return
      }
      this.response = "Creating account..."
      this.success = true
      const res = axios.post("/register", {
        username: this.username,
        password: this.password,
        reenter: this.reenter
      }).then((res) => {
        window.location.href = "/account"
      }).catch((error) => {
        this.success = false
        if (error.response.status == 404) {
          this.response = "Could not contact database."
          return
        }
        this.response = error.response.data.error
        return
      })

      return
    }
  },
  watch: {
    $route: {
        immediate: true,
        handler(to, from) {
            document.title = "Register | Scriptenium";
        }
    },
  }
});
</script>

<style lang="scss" scoped>
  .isShowing {
    display: block !important;
  }
  .isSuccess {
    color: green !important;
  }
  #main {
    height: 100vh;
  }
  #bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
  }
  #image-overlay {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  label {
    font-size: 16px;
    margin-bottom: 0.2em;
    font-family: "JetBrains Mono", "Roboto";
  }

  input[type=text], input[type=password] {
      padding: 0.25em;
      font-size: 14px;
      font-family: "Montserrat";
  }

  #data-form {
      background: rgba(255, 255, 255, 0.2);
      padding: 1.5em 2.2em;
      min-width: 375px;
      border-radius: 1em;
  }

  form {
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  input[type=submit] {
      margin-top: 1.2em;
      padding: 0.6em 1.2em;
      border: none;
      border-radius: 5em;
      background: rgb(44, 44, 44);
      color: white;
  }

  #username, #password, #reenter {
      margin-bottom: 0.6em;
  }

  h1 {
      margin-bottom: 12px;
  }

  #response {
      display: none;
      color: rgb(255, 46, 46);
      background: white;
      padding: 2px;
      border-radius: 2px;
      font-size: 16px;
      margin-top: 1em;
  }

  button:focus, input:focus, textarea:focus, input[type=submit]:focus {
      outline: none;
  }

  button, input[type=submit] {
      background: rgb(44, 44, 44);
      color: white;
      padding: 0.6em 1.2em;
      font-size: 16px;
      border-radius: 5em;
      border: none;
      font-family: "Montserrat", "Roboto", Arial, Helvetica, sans-serif;
      font-weight: 600;
      transition: transform 0.8s ease;
  }

  label {
    font-family: "Montserrat";
  }

  #message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: 700;
    font-size: 30px;
    color: white;
    z-index: 1;
  }

  @media only screen and (max-width: 450px) {
      #message {
        font-size: 24px !important;
        width: 80vw;
      }
      h1 {
        font-size: 46px;
      }
      #data-form {
        padding: 1em 0.2em;
        min-width: 200px;
      }
      input[type=text], input[type=password] {
        width: 13em;
      }
    }
</style>

