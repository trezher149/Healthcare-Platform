<script setup>
import { ref, onMounted, onBeforeMount} from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios'
import jwt from 'jsonwebtoken'
const {generateBearer, tokenDecode} = require('../tokenManager.js')

const pub_key = "-----BEGIN PUBLIC KEY----- \
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl+VNzdShEP2xc2sUxUUH\
5zO8Kuq9Kb+EFsXMbPeN0Bneu+79Y/AeqoyA2qygFpkS3cxR4FGg1uOl4Gt692Dn\
hmQY9fJMzyCdFctVdnWVCyzIJsJPkWbJWmot+F/GPAyu3QlXBDZltGvjXU+vucSn\
8eUu3s55sohkV9rlDECG7+2pbFrmoZ4+llFcnaTf3v2Br00FJp5BRbAerEo3Uusq\
MRn+HiDpEnsNyXzKwFZM4av2fbBSCE4a36rHQjL08z05mAcAgHMJYu56At7pS3d7\
Udn+dN+bMhcWBakdCXvhFtJ4Wfa7rnKebuAD6oEblc8zkO1rtJYdZGMmHd3u/FhE\
KwIDAQAB\
-----END PUBLIC KEY-----"

var numbercal = 900;
var xValues = ["17/03", "18/03", "19/03", "21/03", "22/03", "23/03", "25/03"];
var yValues = [550, 490, 440, 512, 400, 824, 715];
var barColors = ["rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)"];

// const auth = generateBearer("", {"userId": "de5d59dd"})

const config = {headers: {
  "Authorization": "auth"
}}
await axios.post("http://localhost:14000/api/calories/getCal", {}, config)
.then((res) => {
  // const calories_data= tokenDecode("", res.data.data)
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

var numbercal = 900;
var xValues = ["17/03", "18/03", "19/03", "21/03", "22/03", "23/03", "25/03"];
var yValues = [550, 490, 440, 512, 400, 824, 715];
var barColors = ["rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)", "rgb(255, 162, 24)"];

onMounted(() => {
  const ctx = document.getElementById('kcalChart').getContext('2d');
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
      <h2>เป้าหมายเเคลอรี่ต่อสัปดาห์</h2> 
	<div class="container"> 
		<div class="skill html">80 %</div> 
	</div> 
      <h2>สถิติการเผาผลาญเเคลอรี่</h2>
      <div class="graphsleep">
        <h2 class="graphsleep-h2"></h2>
        <div ref="graphContainer" class="graph-container">
        <canvas id="kcalChart" class="small-chart"></canvas>
      </div>
    </div>
      
    </section>

  </body>
</html>

</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

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
			background-color: rgb(255, 186, 90); 
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

.graph-container {
    width: 1000px; /* Set your desired width */
    height: 520px; /* Set your desired height */
    margin: 40px; /* จัดตำแหน่ง container กลางหน้าจอ */
    background: #fff;
    /*margin-left: -600px;*/
    border-radius: 10px;
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
  background: #fff;
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

.graphsleep-h2 {
  margin: 0;
}
.homepage {
  height: 80vh;
  width: 100%;
  position: relative;
  background: linear-gradient(#feafa4, #ffeaef);
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

section.about {
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
}

section .cards .card {
  background: #fff;
  padding: 40px 15px;
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

.services .card img {
    width: 100%;
    padding-bottom: 10px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 7px;
}

.portfolio .card img {
  width: 100%;
  padding-bottom: 10px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 7px;
}

.cards .card p {
  padding: 0 15px;
  margin-top: 5px;
}

.about .row {
  padding: 0 10px;
}

.contact .row {
  margin: 60px 0 90px;
  display: flex;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.contact .row .col {
  padding: 0 10px;
  width: calc(100% / 2 - 50px);
}

.contact .col p {
  margin-bottom: 10px;
}

.contact .col p i {
  color: #7a7a7a;
  margin-right: 10px;
}

.contact form input {
  height: 45px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  outline: none;
  border: 1px solid #bfbfbf;
}

.contact form textarea {
  padding: 10px;
  width: 100%;
  font-size: 16px;
  height: 150px;
  outline: none;
  resize: vertical;
  border: 1px solid #bfbfbf;
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
  
  h1.kcal {
    color: #fff;
    transform: translate(8%, 0%);
    font-size: 20px;
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