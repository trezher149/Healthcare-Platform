<script setup>
import { ref, onMounted, onBeforeMount} from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios'

var numbercal = 900;
var xValues = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var yValues = [550, 490, 440, 512, 400, 824, 715];
var barColors = ["rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)"];

await axios.post("http://localhost:14000/api/calories/getCal", { "userId": "375d99cbcf2a"})
.then((res) => {
  const calories_data= res.data
  xValues = []
  yValues = []
  numbercal = calories_data.series[0].calories
  console.log(typeof(calories_data.series[0].timestamp))
  calories_data.series.forEach(cal_data => {
    yValues.push(cal_data.calories)
    var time = new Date(cal_data.timestamp)
    xValues.push(time.toISOString().slice(0, 10)) //.toLocaleString('en-GB', { timezone: "GMT+7"}))
  });
  yValues.reverse()
  xValues.reverse()
  console.log(yValues)
})

onMounted(() => {
  const ctx = document.getElementById('kcalChart').getContext('2d');
  console.log(yValues)
  console.log(xValues)
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
          },
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
    <h2 class="calories-h2">การเผาผลาญเเคลอรี่วันนี้</h2>
    <div class="calories-container">
      <h2 class="calories-number">{{ numbercal }}</h2>
      <h1 class="kcal">kcal</h1>
    </div>
    <h2 class="calories-h2or">หรือ</h2>
    <div class="firstfloor">
      <div class="firstpic1">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
      <div class="secondpic1">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
    </div>
    <div class="secondfloor">
      <div class="firstpic2">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
      <div class="secondpic2">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
    </div>
    <div class="thirdfloor">
      <div class="firstpic3">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
    </div>
    <h2 class="kcal-h2">สถิติ</h2>
  <div class="graphkcal">
    <h2 class="graphkcal-h2">การเผาผลาญเเคลอรี่</h2>
    <div ref="graphContainer" class="graph-container">
      <canvas id="kcalChart" class="small-chart"></canvas>
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
header {
  background: rgb(237, 175, 81);
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
}

.section-cal {
  height: 300vh;
  background: rgb(249, 207, 144);
  background-position: center;
  background-size: cover;
  display: flex;
  padding: 0 20px;
}

.section-cal .content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  color: #fff;
  
}

.section-cal .content h2 {
  font-size: 3rem;
  max-width: 600px;
  line-height: 70px;
}

.calories-h2 {
  justify-content: center;
  transform: translate(26%, 50%);
}

.calories-h2or {
  justify-content: center;
  transform: translate(66%, 60%);
}
.calories-container {
  display: flex;
  align-items: baseline; /* จัดตำแหน่งตาม baseline ของข้อความ */
  justify-content: center;
}

.calories-number {
  margin-right: 15px; /* ระยะห่างระหว่างตัวเลขกับ "kcal" */
  margin-top: 25px;
  transform: translate(0%, 50%);
}

.kcal {
  font-size: 0.8em; /* ปรับขนาดตัวอักษรของ "kcal" */
  transform: translate(50%, 200%);
}

.small-chart {
  width: 100px; /* ปรับขนาดความกว้างของกราฟ */
  height: 100px; /* ปรับขนาดความสูงของกราฟ */
}

.graph-container {
  width: 600px; /* Set your desired width */
  height: 320px; /* Set your desired height */
  transform: translate(22%, 130%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 10px #888888;
}

.kcal-h2 {
  justify-content: center;
  transform: translate(66%, 470%);
  border-radius: 15px;
}

.firstfloor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
}

.firstpic1 {
  margin-right: 15px; /* ระยะห่างระหว่างตัวเลขกับ "kcal" */
  margin-top: 25px;
  transform: translate(150%, 300%);
}

.secondpic1 {
  transform: translate(200%, 300%);
}

.secondfloor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
}

.firstpic2 {
  margin-right: 15px; /* ระยะห่างระหว่างตัวเลขกับ "kcal" */
  margin-top: 25px;
  transform: translate(150%, 500%);
}

.secondpic2 {
  transform: translate(200%, 500%);
}

.thirdfloor {
  justify-content: center;
  transform: translate(45%, 700%);
}

.firstpic3 {
  justify-content: center;
  transform: translate(0%, 50%);
}

.graphkcal-h2 {
  transform: translate(0%, 515%);
}

</style>