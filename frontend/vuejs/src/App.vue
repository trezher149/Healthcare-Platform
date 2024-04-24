<script setup>
import CaloriesGraph from './components/graphs/CaloriesGraph.vue'
import SleepGraph from './components/graphs/SleepGraph.vue'
import Summary from './components/Summary.vue'
// import SignUp from './components/graphs/SignUp.vue'
// import SignIn from './components/graphs/SignIn.vue'

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
        <ul class="all-links">
          <li><a href="#home">หน้าหลัก</a></li>
          <li><a href="#services">การเผาผลาญ</a></li>
          <li><a href="#portfolio">การนอนหลับ</a></li>
          <li><a href="#about">ประวัติส่วนตัว</a></li>
        </ul>
      </nav>
    </header>
  <!-- <Suspense>
    <SignUp />
  </Suspense>
  <Suspense>
    <SignIn />
  </Suspense> -->
  <Suspense>
    <Summary />
  </Suspense>
  <Suspense>
    <CaloriesGraph />
  </Suspense>
  <Suspense>
        <SleepGraph />
  </Suspense>
<!-- <footer>
      <div>
        <span>Evawell Project</span>
        <span class="link">
            <a href="#">หน้าหลัก</a>
            <a href="#contact">ติดต่อเรา</a>
        </span>
      </div>
    </footer> -->

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
  background: #ffffff;
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
  color: #000000;
  height: 100%;
  padding: 20px 0;
  display: inline-block;
}

header a:hover, footer a:hover {
  color: #606060;
}

/*Hamburger-btn*/

@media screen and (max-width: 860px) {
  .navbar .all-links {
    position: fixed;
    left: -100%;
    width: 300px;
    display: block;
    height: 100vh;
    top: 75px;
    background: #333;
    transition: left 0.3s ease;
  }

  .navbar #menu-toggler:checked~.all-links {
    left: 0;
  }

  .navbar .all-links li {
    font-size: 18px;
  }

  .navbar #hamburger-btn {
    display: block;
  }

  section > p {
    text-align: center;
  }

  section .cards .card {
    width: calc(100% / 2 - 15px);
    margin-bottom: 30px;
  }

  .homepage .content h1 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .homepage .content .text {
    font-size: 17px;
  }

  .content a {
    font-size: 17px;
    padding: 9px 20px;
  }

  .contact .row {
    flex-direction: column;
  }

  .contact .row .col {
    width: 100%;
  }

  .contact .row .col:last-child {
    margin-top: 40px;
  }

  footer a {
    height: 0;
  }
}

@media screen and (max-width: 560px) {
  section .cards .card {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>