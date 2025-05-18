<template>
  <Navbar />
  <router-view :key="$route.fullPath" />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";

</script>

<style Lang="sass" >
:root {
  --primary: #ebebeb;
  --dark: #101014;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: var(--light);
  overflow-x: hidden;
  overflow-y: hidden;
}

.dark body {
  background-color: var(--dark);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
</style>
