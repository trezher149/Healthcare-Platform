<script setup>

</script>

<template>
  <body>

<section class="services" id="services">
  <h2>Set Calory</h2>
  <ul class="cards">
    <li class="card">
      <img src="../assets/plus.jpg" alt="img">
      <h3>ตั้งได้อีก 3 วัน</h3>
    </li>
    <li class="card">
        <h3>เป้าหมายเเคลอรี่ที่กำลังทำ</h3>
        <h1>3,511 / 6,600</h1> <a>Kcal</a>
        <h4>เหลือเวลาอีก 12 วัน</h4>
        <p>คะเเนนที่จะได้รับ 4,100 คะเเนน</p>
    </li>
  </ul>
</section>

<section class="services" id="services">
  <h2>Set Sleep</h2>
  <ul class="cards">
    <li class="card">
      <img src="../assets/plus.jpg" alt="img">
      <h3>ตั้งเป้าหมายใหม่</h3>
    </li>
    <li class="card">
        <h3>เป้าหมายเเคลอรี่ที่กำลังทำ</h3>
        <h1>3,511 / 6,600</h1> <a>Kcal</a>
        <h4>เหลือเวลาอีก 12 วัน</h4>
        <p>คะเเนนที่จะได้รับ 4,100 คะเเนน</p>
    </li>
  </ul>
</section>



</body>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
    background: linear-gradient(#ffdad5, #fff7f9);

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

.services .card img {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  border-radius: 100%;
  object-fit: cover;
}

@media screen and (max-width: 860px) {

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