<script setup>

</script>

<template>
  <body>
    <header>
      <div class="text-content">
      <h2>Evawel</h2><br><h3>เพื่อสุขภาพที่ดีของคุณอยู่เเค่ปลายนิ้ว</h3>
      </div>
    </header>
  </body>



    <section class="about" id="about">
      <h2>About Us</h2>
      <div class="row company-info">
        <h3>Our Story</h3>
        <p>สมาร์ทวอทช์ คือนาฬิกาข้อมือที่สามารถบันทึกและติดตามกิจกรรมต่างๆ ของผู้ใช้งานเช่น แคลอรี่ที่เผาผลาญ และระยะเวลาการนอนของผู้ใช้งาน แต่การดึงข้อมูลจากสมาร์ทวอทช์เพื่อนำไปคำนวณเป็นค่าอย่างอื่น [ต้องเพิ่มความ สำคัญตรงนี้] เป็นไปได้ยาก เนื่องจากต้องใช้แอพพลิเคชั่นมือถือเพื่อเชื่อมต่อรับข้อมูลจากสมาร์ทวอทช์รุ่นนั้นโดยเฉพาะ ซึ่งแสดงค่าดิบที่ได้มาจากสมาร์ทวอทช์เพียงอย่างเดียวเท่านั้น 
            โครงงานนี้จึงได้ออกแบบและสร้างระบบสำาหรับดึงข้อมูลจากสมาร์ทวอทช์ด้วยการส่งภาพถ่ายหน้าจอ
            สมาร์ทวอทช์ที่มีค่าแคลอรี่และค่าการนอนผ่าน LINE Official Account เพื่ออ่านค่าด้วยวิธีการ Object Detection และ OCR 
            แล้วประเมินเป็นคะแนนการดูแลตนเองและให้คำแนะนำผ่าน 
            LINE Official Account หรือแสดงเป็นกราฟและประเมิน 
            การดูแลสุขภาพจากค่าแคลอรี่และการนอนผ่านเว็บไซต์ 
            ซึ่งผู้ใช้สามารถตั้งเป้าหมายสำาหรับค่าแคลอรี่และจำนวนวันที่นอน 
            หลับที่เพียงพอในแต่ละคืนเพื่อเพิ่มคะแนนได้ </p>
      </div>
    </section>

    <section class="services" id="services">
      <h2>Our Team</h2>
      <ul class="cards">
        <li class="card">
          <img src="../assets/user.jpg" alt="img">
          <h3>ศุภชัย</h3>
        </li>
        <li class="card">
          <img src="../assets/user.jpg" alt="img">
          <h3>ธัญญวัฒน์</h3>
        </li>
        <li class="card">
          <img src="../assets/user.jpg" alt="img">
          <h3>จารย์ส้ม</h3>
        </li>
      </ul>
    </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body{
  height: 100vh;;
  width: 100%;
  display: flex;
  background-image: linear-gradient( 135deg, #ff9a9e  10%, #F6416C 100%);
}
::selection{
  color: #f2f2f2;
  background: #f86d8d;
}
body::before,
body::after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
body::before{
  clip-path: circle(30% at left 20%);
  opacity: 0.4;
  background-image: linear-gradient( 135deg, #F6416C 10%, #ff9a9e 100%);
}
body::after{
  opacity: 0.4;
  clip-path: circle(25% at right 80%);
  background-image: linear-gradient( 135deg, #F6416C 10%, #ff9a9e 100%);
}

header{
  height: 50vh;
  width: 90%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  z-index: 12;
  border-radius: 25px;
  top: 20px;
  margin:auto;
  position: relative;
}

 header .text-content{
   width: 100%;
   margin: 150px 0 0 50px ;
 }
.text-content h2{
  font-size: 57px;
  font-weight: 1000;
  color: #f5557a;
}

.company-info {
  background: #ffffff;
  width: 90%;
  border-radius: 12px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  height: 37vh;
}

.company-info p {
  margin: 30px 30px 0 50px ;
}

@media (max-width:850px) {
  header .navbar{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 5px;
  }
  .navbar .menu {
    margin: 10px 0 20px 0;
  }
  header .text-content{
    margin: 30px 0 0 20px ;
    width: 70%;
  }
  header .text-content h2{
    font-size: 20px;
  }
}
@media (max-width:410px) {
  header{
    height: 100vh;
    width: 100%;
    border-radius: 0px;
  }
  header .navbar{
    padding: 15px 10px;
}
}






.homepage {
  height: 80vh;
  width: 100%;
  position: relative;
  background: url("../assets/watch.jpg");
  background-position: center 65%;
  background-size: cover;
}

.homepage::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  /* background: rgba(255, 233, 233, 0.2); */
}

.homepage .content {
  display: flex;
  height: 85%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.homepage .content h1 {
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #ff5454;
}

.homepage .content .text {
  margin-bottom: 50px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

section {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 80px 0 0;
}

section h2 {
  font-size: 2rem;
  color: #ff5454;
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
  margin: 40px 20px 20px;
  /* color: #ff5454; */
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
  padding: 50px 70px;
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
  margin-right: 20px;
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
