<script setup>

</script>

<template>
    <section class="homepage" id="home">
      <div class="content">
        <div class="text">
          <h1>Evawel</h1>
          <p>
            เพื่อสุขภาพที่ดีของคุณ<br>อยู่เเค่ปลายนิ้ว</p>
        </div>
      </div>
    </section>



    <section class="about" id="about">
      <h2>About Us</h2>
      <p>Discover our story in project Evawel.</p>
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
      <div class="row team">
        <h3>Our Mission</h3>
        <ul>
          <li>เพื่อออกแบบและพัฒนาระบบการแบ่งประเภทและอ่านข้อมูลจากสมาร์ทวอทช์ด้วยรูปถ่ายหน้าจอสมาร์ทวอทช์ โดยไม่จำกัดรุ่น</li>
          <li>เพื่อออกแบบและพัฒนาแพลตฟอร์มดูแลสุขภาพด้วยข้อมูลสมาร์ทวอทช์ สำาหรับดูผลการเผาผลาญแคลอรี่และ ระยะเวลาในการนอนหลับในแต่ละวัน </li>
          <li>เพื่อนำข้อมูลแคลอรี่และเวลาการนอนหลับมาประมวลผลและนำเสนอผลลัพธ์ในรูปแบบที่เข้าใจง่ายและชัดเจนให้ กับผู้ใช้งาน </li>
        </ul>
      </div>
    </section>

    <section class="services" id="services">
      <h2>Our Team</h2>
      <p>นี่คือสมาชิกในทีมของเรา</p>
      <ul class="cards">
        <li class="card">
          <img src="../assets/watch.jpg" alt="img">
          <h3>ศุภชัย</h3>
          <p>6310530016</p>
        </li>
        <li class="card">
          <img src="../assets/watch.jpg" alt="img">
          <h3>ธัญญวัฒน์</h3>
          <p>6310682825</p>
        </li>
        <li class="card">
          <img src="../assets/watch.jpg" alt="img">
          <h3>จารย์ส้ม</h3>
          <p>ผู้ประเสริฐ</p>
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
  z-index: 3;
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
  margin: 30px 0 10px;
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
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  border-radius: 100%;
  object-fit: cover;
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
