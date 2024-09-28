<template>
  <Navbar />
  <router-view :key="$route.fullPath" />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style></style>
