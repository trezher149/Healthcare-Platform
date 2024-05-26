<script setup>

</script>


<template>
  <body>

<section class="contact" id="contact">
  <h2>Edit Profile</h2>
  <div class="row">
    <div class="col information">
      <div class="contact-details">
        <h2>Pumpuy</h2>
        <p> supachai.msk12@gmail.com</p>
        <p> 12/04/1998</p>
        <p> อายุ 25 ปี</p>
        <p> ส่วนสูง 178 cm</p>
        <p> น้ำหนัก 85 cm</p>
      </div>          
    </div>
    <div class="col form">
      <form>
        <input type="text" placeholder="Edit Name" required>
        <input type="email" placeholder="Edit Email" required>
        <input type="number" placeholder="Edit Weight" required>
        <input type="number" placeholder="Edit Height" required>
        <input type="password" placeholder="Edit password" required>
        <input type="password" placeholder="confirm password" required>
        <button id="submit" type="submit">confirm</button>
      </form>
    </div>
  </div>
</section>

</body>
  </template>
  

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: #f3cbcb;
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

.contact form button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 17px;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: #f60f6f;
  transition: 0.2s ease;
}

.contact form button:hover {
  background: #d40d60;
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
  