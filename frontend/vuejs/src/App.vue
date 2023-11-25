<script setup>
import CaloriesGraph from './components/graphs/CaloriesGraph.vue'
import SleepGraph from './components/graphs/SleepGraph.vue'

</script>

<template>

<header>
      <nav class="navbar">
        <h2 class="logo"><a href="#">Evawell</a></h2>
        <input type="checkbox" id="menu-toggler">
        <label for="menu-toggler" id="hamburger-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18V11H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </label>
        <!-- <ul class="all-links">
          <li><a href="#home">หน้าหลัก</a></li>
          <li><a href="#services">การบริการ</a></li>
          <li><a href="#about">เกี่ยวกับเรา</a></li>
          <li><a href="#contact">ติดต่อเรา</a></li>
        </ul> -->
      </nav>
    </header>
  <Suspense>
    <CaloriesGraph />
  </Suspense>
  <Suspense>
        <SleepGraph />
  </Suspense>
  <footer>
      <div>
        <span>Evawell Project</span>
        <span class="link">
            <a href="#">หน้าหลัก</a>
            <a href="#contact">ติดต่อเรา</a>
        </span>
      </div>
    </footer>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #f2f2f2;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  display: flex;
  justify-content: center;
  background: rgb(150, 0, 0);
}

.navbar {
  display: flex;
  padding: 0 10px;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.navbar input#menu-toggler {
  display: none;
}

.navbar #hamburger-btn {
  cursor: pointer;
  display: none;
}

.navbar .all-links {
  display: flex;
  align-items: center;
}

.navbar .all-links li {
  position: relative;
  list-style: none;
}

.navbar .logo a {
  display: flex;
  align-items: center;
  margin-left: 0;
}

header a, footer a {
  margin-left: 40px;
  text-decoration: none;
  color: #fff;
  height: 100%;
  padding: 20px 0;
  display: inline-block;
}

header a:hover, footer a:hover {
  color: #ddd;
}

footer {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #000;
  padding: 20px 0;
}

footer div {
  padding: 0 10px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

footer span {
  color: #fff;
}

footer a {
  padding: 0;
}

</style>