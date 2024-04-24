<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';



// await axios.post("http://localhost:14000/api/sleep/getSleep", {userId: "375d99cbcf2a"})
// .then((res) => {
//   const sleep_data = res.data
//   xValues = []
//   yValues = []
//   sleep_data.series.forEach(cal_data => {
//     yValues.push(cal_data.sleepDuration)
//     var time = new Date(cal_data.timestamp)
//     xValues.push(time.toISOString().slice(0, 10)) //.toLocaleString('en-GB', { timezone: "GMT+7"}))
//   });
//   yValues.reverse()
//   xValues.reverse()
//   numberhour = Math.floor(yValues[0] / 100)
//   numberminute = yValues[0] % 100
// })

</script>


<template>
<html lang="en">

  <body>
    <section class="homepage" id="home">
      <div class="content">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="home-details">
                <div class="home-text">
                  <div role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="--value: 33"></div>
                    <h4 class="homeSubtitle">คะเเนนของคุณวันนี้</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        <!-- BMR Section -->
        <section class="portfolio" id="portfolio">
      <ul class="cards">
        <li class="card1">
          <div class="color1"></div>
          <h1>85</h1>
          <p>น้ำหนัก</p>
        </li>
        <li class="card2">
          <div class="color2"></div>
          <h1>123</h1>
          <p>ค่า BMR</p>
        </li>
        <li class="card3">
          <div class="color3"></div>
          <h1>321</h1>
          <p>ค่า BMI</p>
        </li>


      </ul>
    </section>
  </body>
</html>
</template>

<style scoped>

section .cards .card1 h1 {
  font-size: 50px;
}

section .cards .card2 h1 {
  font-size: 50px;
}

section .cards .card3 h1 {
  font-size: 50px;
}

section .cards {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin-top: 50px;
  padding: 0 10px;
  justify-content: space-between;
}

.about .team ul {
  padding-left: 20px;
}

section .cards .card1 {
  background: #fff;
  padding: 0px 15px;
  list-style: none;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 40px;
  width: calc(100% / 3 - 30px);
  text-align: center;
}

section .cards .card2 {
  background: #fff;
  padding: 0px 15px;
  list-style: none;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 40px;
  width: calc(100% / 3 - 30px);
  text-align: center;
}

section .cards .card3 {
  background: #fff;
  padding: 0px 15px;
  list-style: none;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 40px;
  width: calc(100% / 3 - 30px);
  text-align: center;
}

.portfolio .cards .card {
  padding: 0 0 20px;
}

.portfolio .card1 .color1 {
  width: 100%;
  height: 2vh;
  background: #a1ebff;
  padding-bottom: 10px;
  object-fit: cover;
  border-radius: 7px;
}

.portfolio .card2 .color2 {
  width: 100%;
  height: 2vh;
  background: #fff1a1;
  padding-bottom: 10px;
  object-fit: cover;
  border-radius: 7px;
}

.portfolio .card3 .color3 {
  width: 100%;
  height: 2vh;
  background: #a1b4ff;
  padding-bottom: 10px;
  object-fit: cover;
  border-radius: 7px;
}

.portfolio .cards .card {
  padding: 0 0 20px;
}




.swiper-slide{
  position: relative;
  height: 60vh;
  width: 100%;
  border-radius: 20px;
  background: linear-gradient(#feafa4, #ffeaef);
}

.home-text {
  background-color:#ffffff;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  padding: 25px 50px;
}

.home-details{
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: var(--z-fixed);
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  width: 100%;
  row-gap: 4rem;
}

.homeSubtitle{
  text-align: center;
  font-size: var(--normal-font);
  color: rgb(191, 15, 15);
}
.homeTitle{
  text-align: center;
  font-size: var(--big-font);
  color: var(--white-color);
  font-weight: var(--font-semi-bold);
}

/*Progress Bar*/

@keyframes progress {
  0% { --percentage: 0; }
  100% { --percentage: var(--value); }
}

@property --percentage {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

[role="progressbar"] {
  --percentage: var(--value);
  --primary: rgb(191, 15, 15);
  --secondary: rgb(225, 125, 167);
  --size: 300px;
  animation: progress 2s 0.5s forwards;
  width: var(--size);
  aspect-ratio: 2 / 1;
  border-radius: 50% / 100% 100% 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

[role="progressbar"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0.75turn at 50% 100%, var(--primary) calc(var(--percentage) * 1% / 2), var(--secondary) calc(var(--percentage) * 1% / 2 + 0.1%));
  mask: radial-gradient(at 50% 100%, white 55%, transparent 55.5%);
  mask-mode: alpha;
  -webkit-mask: radial-gradient(at 50% 100%, #0000 55%, #000 55.5%);
  -webkit-mask-mode: alpha;
}

[role="progressbar"]::after {
  counter-reset: percentage var(--value);
  content: counter(percentage) /*'%'*/;
  font-family: Helvetica, Arial, sans-serif;
  font-size: calc(var(--size) / 5);
  color: var(--primary);
}

/* --------------------------------------------------------- */

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

  footer a {
    height: 0;
  }
}



html {
    scroll-behavior: smooth;
  }
</style>