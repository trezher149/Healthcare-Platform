<script setup>
import CaloriesGraph from './components/graphs/CaloriesGraph.vue'
import SleepGraph from './components/graphs/SleepGraph.vue'

</script>

<template>
<header>
  <nav class="navbar">
    <a class="logo" href="#">Evawell<span>.</span></a>
  </nav>
</header>

<Suspense>
  <CaloriesGraph /> <!-- เรียกใช้ CaloriesGraph.vue ในนี้ -->
</Suspense>
<Suspense>
  <SleepGraph />
</Suspense>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

header {
  background: rgb(237, 175, 81);
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
}

header .navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar .logo {
  color: #fff;
  font-weight: 600;
  font-size: 2.1rem;
  text-decoration: none;
}

.navbar .logo span {
  color: #C06B3E;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  transition: 0.2s ease;
}

.navbar a:hover {
  color: #C06B3E;
}

header .navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}
</style>