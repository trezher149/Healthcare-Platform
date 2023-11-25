<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

var numberhour = 8;
var numberminute = 24;
var xValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var yValues = [550, 490, 440, 512, 400, 824, 715];
const barColors = ["rgb(58, 117, 246)", "rgb(58, 117, 246)", "rgb(58, 117, 246)", "rgb(58, 117, 246)", "rgb(58, 117, 246)"];

await axios.post("http://localhost:14000/api/sleep/getSleep", {userId: "375d99cbcf2a"})
.then((res) => {
  const sleep_data = res.data
  xValues = []
  yValues = []
  sleep_data.series.forEach(cal_data => {
    yValues.push(cal_data.sleepDuration)
    var time = new Date(cal_data.timestamp)
    xValues.push(time.toISOString().slice(0, 10)) //.toLocaleString('en-GB', { timezone: "GMT+7"}))
  });
  yValues.reverse()
  xValues.reverse()
  numberhour = Math.floor(yValues[0] / 100)
  numberminute = yValues[0] % 100
})

onMounted(() => {
  const ctx = document.getElementById('sleepChart').getContext('2d');
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues,
        borderRadius: 10, // ค่าของมุม (border radius)
      }]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false // ปิดการแสดง grid lines ในแกน x
          }
        },
        y: {
          grid: {
            display: false // ปิดการแสดง grid lines ในแกน y
          }
        }
      },
      legend: { display: false },
      title: {
        display: true,
      }
    }
  });
});
</script>


<template>
  <body>
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

    <section class="homepage" id="home">
      <div class="content">
        <div class="text">
            <h2>การนอนคืนที่เเล้ว</h2>
            <div class="sleep-container">
                <div class="hour">
                    <h2 class="sleep-number">{{ numberhour }}</h2>
                    <h1 class="clock">ชั่วโมง</h1>
                </div>
                <div class="minute">
                    <h2 class="sleep-number">{{ numberminute }}</h2>
                    <h1 class="clock">นาที</h1>
                </div>
            </div>
        </div>
        <a href="#services">สถิติ</a>
      </div>
    </section>

    <section class="services" id="services">
      <h2>สถิติ</h2>
      <div class="graphsleep">
        <h2 class="graphsleep-h2">การนอนหลับ</h2>
        <div ref="graphContainer" class="graph-container">
            <canvas id="sleepChart"></canvas>
        </div>
    </div>
      
    </section>

    <footer>
      <div>
        <span>Evawell Project</span>
        <span class="link">
            <a href="#">หน้าหลัก</a>
            <a href="#contact">ติดต่อเรา</a>
        </span>
      </div>
    </footer>

  </body>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
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

.homepage {
  height: 100vh;
  width: 100%;
  position: relative;
  background: url("17541.jpg");
  background-position: center 65%;
  background-size: cover;
  background-attachment: fixed;
}

.homepage::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
}

.homepage .content {
  display: flex;
  height: 85%;
  z-index: 3;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.homepage .content h1 {
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 10px;
}

.homepage .content .text {
  margin-bottom: 50px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.content a {
  color: #000;
  display: block;
  text-transform: uppercase;
  font-size: 18px;
  margin: 0 10px;
  padding: 10px 30px;
  border-radius: 5px;
  background: #fff;
  border: 2px solid #fff;
  transition: 0.4s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  text-decoration: none;
}

.content a:hover {
  color: #fff;
  background: rgba(255,255,255,0.3);
}

section {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 80px 0 0;
}

section h2 {
  font-size: 2rem;
}

section > p {
  text-align: center;
}

section .cards {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin-top: 50px;
  padding: 0 10px;
  justify-content: space-between;
}

/* section.about {
  margin: 0 auto;
  max-width: 1200px;
}

.about .company-info {
  margin-top: 30px;
}

.about h3 {
  margin: 30px 0 10px;
}

.about .team {
  text-align: left;
  width: 100%;
}

.about .team ul {
  padding-left: 20px;
} */


.contact form button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 17px;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: #333;
  transition: 0.2s ease;
}

.contact form button:hover {
  background: #525252;
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



</style>