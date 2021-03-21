<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Recursive:wght@800&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, p, a, a:visited, button, span {
  font-family: "Montserrat";
}

a, a:visited {
  text-decoration: none;
  color: rgb(38, 38, 168);
}

button:focus {
  outline: none;
}

button:hover, a:hover, input[type=submit]:hover {
  cursor: pointer;
}

.button-link {
  background: rgb(230, 153, 12) !important; 
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
}

html {
  overflow-x: hidden;
}

.spacer {
  height: 8vh;
}
</style>
