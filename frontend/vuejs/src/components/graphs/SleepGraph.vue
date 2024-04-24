<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

var numbercal = 900;
var xValues = ["17/03", "18/03", "19/03", "21/03", "22/03", "23/03", "25/03"];
var yValues = [550, 490, 440, 512, 400, 824, 715];
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

</script>


<template>
<html lang="en">
  <body>

    <section class="services" id="services">
      <h2>เป้าหมายการนอนหลับต่อสัปดาห์</h2> 
	<div class="container"> 
		<div class="skill html">80 %</div> 
	</div> 
      <h2>สถิติการนอนหลับ</h2>
      <div class="graphsleep">
        <h2 class="graphsleep-h2"></h2>
        <div ref="graphContainer" class="graph-container">
            <canvas id="sleepChart"></canvas>
        </div>
    </div>
      
    </section>

  </body>
</html>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

h2 { 
  font-size: 2rem;
		} 

		.container { 
			background-color: rgb(192, 192, 192); 
			width: 80%; 
			border-radius: 15px; 
      margin-top: 20px;
      margin-bottom: 20px;
		} 

		.skill { 
			background-color: rgb(161, 137, 228); 
			color: white; 
			padding: 1%; 
			text-align: right; 
			font-size: 20px; 
			border-radius: 15px; 
		} 

		.html { 
			width: 80%; 
		} 

		.php { 
			width: 60%; 
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
  background: #fff;
}

.graph-container {
    width: 1000px; /* Set your desired width */
    height: 520px; /* Set your desired height */
    margin: 40px; /* จัดตำแหน่ง container กลางหน้าจอ */
    background: #fff;
    border-radius: 10px;
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
  color: #ddd;
}

.homepage {
  height: 80vh;
  width: 100%;
  position: relative;
  background: linear-gradient(#605483, #9d9aa8);
  /*background-position: center 65%;*/
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
 /* background: rgba(0, 0, 0, 0.2);*/
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



html {
    scroll-behavior: smooth;
  }
</style>