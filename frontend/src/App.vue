<script setup>
import NavBar from './components/layout/NavBar.vue'
import ToastContainer from './components/common/ToastContainer.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <ToastContainer />
</template>