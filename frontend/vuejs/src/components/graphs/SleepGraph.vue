<script setup>
const number = 2
const numbercal = 900;
console.log(number)
</script>

<template>
<section class="section-cal">
  <div class="content">
    <h2 class="calories-h2">การเผาผลาญเเคลอรี่วันนี้</h2>
    <div class="calories-container">
      <h2 class="calories-number">{{ numbercal }}</h2>
      <h1 class="kcal">kcal</h1>
    </div>
    <h2 class="calories-h2">หรือ</h2>
    <div class="firstfloor">
      <div class="firstpic">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
      <div class="secondtpic">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
    </div>
    <div class="secondfloor">
      <div class="firstpic">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
      </div>
      <div class="secondtpic">
        <img src="">
        <p>ซื้ออาหาร X จาน</p>
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
  height: 100vh;
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

</style>