<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const numberhour = 8;
const numberminute = 24;
const xValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const yValues = [550, 490, 440, 512, 400, 824, 715];
const barColors = ["rgb(58, 117, 246)", "rgb(58, 117, 246)", "rgb(58, 117, 246)", "rgb(58, 117, 246)", "rgb(58, 117, 246)"];

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
<section class="section-cal">
  <div class="content">
    <h2 class="sleep-h2">การนอนคืนที่เเล้ว</h2>
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
    <h2 class="sleep-h2stat">สถิติ</h2>
    <div class="graphsleep">
        <h2 class="graphsleep-h2">การนอนหลับ</h2>
        <div ref="graphContainer" class="graph-container">
            <canvas id="sleepChart"></canvas>
        </div>
    </div>
  </div>
</section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

/* ควบคุมการวาง Layout ของหน้าจอ */


.section-cal {
  height: 185vh;
  background: rgb(122, 125, 255);
  background-position: center;
  background-size: cover;
  display: flex;
  padding: 0 20px;
}

.section-cal .content {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  color: #fff;
  
}

.section-cal .content h2 {
  font-size: 3rem;
  max-width: 600px;
  line-height: 70px;
}

.sleep-h2 {
  justify-content: center;
  transform: translate(45%, 60%);
}

.sleep-h2stat {
  justify-content: center;
  transform: translate(67%, 60%);
}
.sleep-container {
  display: flex;
  align-items: baseline; /* จัดตำแหน่งตาม baseline ของข้อความ */
  justify-content: center;
  transform: translate(5%, 0%);
}

.sleep-number {
  margin-right: 80px; /* ระยะห่างระหว่างตัวเลขกับ "kcal" */
  margin-top: 25px;
  transform: translate(0%, 50%);
}

.clock {
  font-size: 0.8em; /* ปรับขนาดตัวอักษรของ "kcal" */
  transform: translate(50%, 10%);
}

.graphsleep-h2 {
    transform: translate(0%, 90%);
}

.graph-container {
  width: 600px; /* Set your desired width */
  height: 320px; /* Set your desired height */
  transform: translate(22%, 30%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 10px #888888;
}


</style>