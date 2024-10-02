<template>
  <Navbar />
  <router-view :key="$route.fullPath"/>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";

</script>

<style Lang="sass" scoped>
:root {
  --primary: #ebebeb;
  --dark: #1e293b;
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

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}


</style>
