<script setup>
import sleephistory from  '../views/sleephistory.vue'
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

var numbercal = 900;
var xValues = ["17/03", "18/03", "19/03", "21/03", "22/03", "23/03", "25/03"];
var yValues = [225, 400, 80, 125, 300, 289, 324];
var barColors = ["rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)"];

onMounted(() => {
  const ctx = document.getElementById('kcalChart').getContext('2d');
  console.log(yValues)
  console.log(xValues)
  new Chart(ctx, {
    type: "line", // Change chart type to "bar"
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false // Hide grid lines on x-axis
          }
        },
        y: {
          grid: {
            display: false // Hide grid lines on y-axis
          }
        }
      },
      legend: { display: false },
      title: {
        display: true
      }
    }
  });
});

</script>

<template>

        <section class="contact" id="contact">
      <div class="row">
        <div class="col information">
          <div class="contact-details">
            <div class="color1">
              <div class="graphsleep">
                <h2 class="graphsleep-h2"></h2>
                <div ref="graphContainer" class="graph-container">
                  <canvas id="kcalChart" class="small-chart"></canvas>
                </div>
              </div>
            </div>
          </div>          
        </div>
        <div class="col form">
            <main class="color2">
                <sleephistory />
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

  .graphsleep-h2 {
  margin: 0;
}

.graph-container {
    width: 1000px; /* Set your desired width */
    height: 500px; /* Set your desired height */
    margin: 70px; /* จัดตำแหน่ง container กลางหน้าจอ */
    background: #fff;
    /*margin-left: -600px;*/
    border-radius: 10px;
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
    height: 35vh;
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