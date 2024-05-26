<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

var numbercal = 900;
var xValues = ["17/03", "18/03", "19/03", "21/03", "22/03", "23/03", "25/03"];
var yValues = [326, 245, 128, 89, 163, 198, 234];
var barColors = ["rgb(161, 137, 228)", "rgb(161, 137, 228)", "rgb(161, 137, 228)", "rgb(161, 137, 228)", "rgb(161, 137, 228)"];

onMounted(() => {
  const ctx = document.getElementById('sleepChart').getContext('2d');
  console.log(yValues)
  console.log(xValues)
  new Chart(ctx, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues,
        // เพิ่มตัวเลือก tension
        tension: 0.4 // ปรับค่า tension ตามต้องการ
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
</script >

<template>
<div class="graphsleep">
    <h2 class="graphsleep-h2"></h2>
    <div ref="graphContainer" class="graph-container">
        <canvas id="sleepChart"></canvas>
    </div>
</div>
</template>

<style>
.graph-container {
    width: 1000px; /* Set your desired width */
    height: 520px; /* Set your desired height */
    margin: 40px; /* จัดตำแหน่ง container กลางหน้าจอ */
    background: #fff;
    border-radius: 10px;
  }

.sleep-container {
    display: flex;
    align-items: baseline; /* จัดตำแหน่งตาม baseline ของข้อความ */
    justify-content: center;
    transform: translate(7%, 0%);
}
    
h1.sleep-number {
    margin-right: 100px; /* ระยะห่างระหว่างตัวเลขกับ "kcal" */
    margin-top: 25px;
    color: #fff;
    font-size: 90px;
    font-weight: 700;
}
    
.clock {
    color: #fff;
    transform: translate(15%, -200%);
    font-size: 20px;
}
</style>