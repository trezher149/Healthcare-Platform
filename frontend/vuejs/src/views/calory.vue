<script setup>
import sleep from  '../views/sleepchart.vue'
// import Chart from 'chart.js/auto';

// var numbercal = 900;
// var xValues = ["17/03", "18/03", "19/03", "21/03", "22/03", "23/03", "25/03"];
// var yValues = [225, 400, 80, 125, 300, 289, 324];
// var barColors = ["rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)"];

// onMounted(() => {
//   const ctx = document.getElementById('kcalChart').getContext('2d');
//   console.log(yValues)
//   console.log(xValues)
//   new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: xValues,
//       datasets: [{
//         backgroundColor: barColors,
//         data: yValues,
//         // เพิ่มตัวเลือก tension
//         tension: 0.4 // ปรับค่า tension ตามต้องการ
//       }]
//     },
//     options: {
//       scales: {
//         x: {
//           grid: {
//             display: false // ปิดการแสดง grid lines ในแกน x
//           }
//         },
//         y: {
//           grid: {
//             display: false // ปิดการแสดง grid lines ในแกน y
//           }
//         }
//       },
//       legend: { display: false },
//       title: {
//         display: true,
//       }
//     }
//   });
// });
</script>

<template>
<!-- <h2>สถิติการเผาผลาญเเคลอรี่</h2>
    <div class="graphsleep">
        <h2 class="graphsleep-h2"></h2>
        <div ref="graphContainer" class="graph-container">
            <canvas id="kcalChart" class="small-chart"></canvas>
        </div>
    </div> -->
        <section class="contact" id="contact">
      <div class="row">
        <div class="col information">
          <div class="contact-details">
            <div class="color1">cal</div>
          </div>          
        </div>
        <div class="col form">
            <main class="color2">
                <sleep />
            </main>  
        </div>
      </div>
    </section>
</template>

<style scoped>

  .calories-container {
    display: flex;
    align-items: baseline; /* จัดตำแหน่งตาม baseline ของข้อความ */
    justify-content: center;
  }
  
  .calories-number {
    margin-right: 15px; /* ระยะห่างระหว่างตัวเลขกับ "kcal" */
    margin: 25px 0; /* ปรับระยะห่างเพื่อให้ได้ระยะทางที่ดีกว่า */
    color: #fff;
    font-size: 90px;
    font-weight: 700;
  }




.contact .row {
  margin: 60px 0 90px;
  display: flex;
  max-width: 3000px;
  width: 103%;
  align-items: center;
  margin: 0;
  
}

.contact .row .col {
  padding: 0 10px;
  width: calc(100% / 2 - 50px);
}

.color1 {
    background: #ffe993;
    border-radius: 12px;
    position: relative;
    min-height: 25vh;
    padding: 15px 14px;
    border-radius: 12px;
    width: 90%;
    margin: 0 auto;
    height: 60vh;
}

.color2 {
    background: #b286ff;
    border-radius: 12px;
    position: relative;
    min-height: 25vh;
    padding: 15px 14px;
    border-radius: 12px;
    width: 90%;
    margin: 0 auto;
    height: 60vh;
}



@media screen and (max-width: 860px) {
  .contact .row {
    flex-direction: column;
  }

  .contact .row .col {
    width: 104%;
  }

  .contact .row .col:last-child {
    margin-top: 40px;
  }

}

@media screen and (max-width: 560px) {
  section .cards .card {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>