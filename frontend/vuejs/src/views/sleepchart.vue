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
    type: "bar",
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
    <div class="color2 p-min-4 p-5">
      <h2 class="text-center text-xl md:text-1xl font-bold mb-4">แคลอรี่ที่เผาผลาญ</h2>
      <div ref="graphContainer" class="graph-container w-1/2">
        <canvas id="sleepChart"></canvas>
      </div>
    </div>

</template>

<style>
.graph-container {
    background: #fff;
    border-radius: 10px;
    /*margin-left: -600px;*/
    border-radius: 10px;
    width: auto;
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

.color2 {
    background: #b286ff;
    border-radius: 12px;
}

.clock {
    color: #fff;
    transform: translate(15%, -200%);
    font-size: 20px;
}
</style>