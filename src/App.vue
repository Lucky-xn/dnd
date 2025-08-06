<template>
  <div class="bg-neutral-900 w-screen min-h-screen overflow-x-hidden">
    <NavBar />
    <router-view class="">
      
    </router-view>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>
