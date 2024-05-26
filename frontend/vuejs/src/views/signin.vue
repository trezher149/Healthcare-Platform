<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <body>
    <div class="edge flex">
      <div class="facebook-page flex">
        <div class="text">
          <h1>Evawel</h1>
        </div>
        <div class="container">
          <header>Sign In</header>
          <div class="form-outer">
            <form action="#">
              <div class="page slide-page">
                <div class="field">
                  <div class="label">Username</div>
                  <input type="text" />
                </div>
                <div class="field">
                  <div class="label">Password</div>
                  <input type="password" />
                </div>
                <div class="field">
                  <RouterLink to="/mainpage">
                    <button class="firstNext next">Sign in</button>
                  </RouterLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.flex {
  display: flex;
  align-items: center;
}

.edge {
  padding: 0 15px;
  min-height: 100vh;
  justify-content: center;
  background: linear-gradient(#ffdad5, #fff7f9);
}

.facebook-page {
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
}

.facebook-page .text {
  margin-bottom: 90px;
}

.facebook-page h1 {
  color: #ff9183;
  font-size: 4rem;
  margin-bottom: 10px;
}

.container {
  display: flex;
  z-index: 1000;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.container header{
  font-size: 35px;
  font-weight: 600;
  margin: 0 0 30px 0;
  color: #ff5454;
}

.container .form-outer{
  width: 100%;
  overflow: hidden;
  transform: translate(4%, 0%)
}

.container .form-outer form{
  display: flex;
  width: 400%;
}

.form-outer form .page{
  width: 25%;
  transition: margin-left 0.3s ease-in-out;
}
.form-outer form .page .title{
  text-align: left;
  font-size: 25px;
  font-weight: 500;
}

.form-outer form .page .field{
  width: 330px;
  height: 45px;
  margin: 45px 0;
  display: flex;
  position: relative;
}
form .page .field .label{
  position: absolute;
  top: -30px;
  font-weight: 500;
}

form .page .field input{
  height: 100%;
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding-left: 15px;
  font-size: 18px;
}

form .page .field select{
  width: 100%;
  padding-left: 10px;
  font-size: 17px;
  font-weight: 500;
}

form .page .field button{
  width: 470%;
  height: calc(100% + 5px);
  border: none;
  background: linear-gradient(270deg, #ff994f, #fa6d86);
  margin-top: -20px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.5s ease;
}

form .page .field button:hover{
  background: #000;
}

form .page .btns button{
  margin-top: -20px!important;
}

form .page .btns button.prev{
  margin-right: 3px;
  font-size: 17px;
}

form .page .btns button.next{
  margin-left: 3px;
}

.container .progress-bar{
  display: flex;
  margin: 40px 0;
  user-select: none;
}

.container .progress-bar .step{
  text-align: center;
  width: 100%;
  position: relative;
}
.container .progress-bar .step p{
  font-weight: 500;
  font-size: 18px;
  color: #000;
  margin-bottom: 8px;
}

.progress-bar .step .bullet{
  height: 25px;
  width: 25px;
  border: 2px solid #000;
  display: inline-block;
  border-radius: 50%;
  position: relative;
  transition: 0.2s;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
}

.progress-bar .step .bullet.active{
  border-color: #d43f8d;
  background: #d43f8d;
}

.progress-bar .step .bullet span{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.progress-bar .step .bullet.active span{
  display: none;
}

.progress-bar .step .bullet:before,
.progress-bar .step .bullet:after{
  position: absolute;
  content: '';
  bottom: 11px;
  right: -51px;
  height: 3px;
  width: 44px;
  background: #262626;
}

.progress-bar .step .bullet.active:after{
  background: #d43f8d;
  transform: scaleX(0);
  transform-origin: left;
  animation: animate 0.3s linear forwards;
}

@keyframes animate {
  100%{
    transform: scaleX(1);
  }
}

.progress-bar .step:last-child .bullet:before,
.progress-bar .step:last-child .bullet:after{
  display: none;
}

.progress-bar .step p.active{
  color: #d43f8d;
  transition: 0.2s linear;
}

.progress-bar .step .check{
  position: absolute;
  left: 50%;
  top: 70%;
  font-size: 15px;
  transform: translate(-50%, -50%);
  display: none;
}

.progress-bar .step .check.active{
  display: block;
  color: #fff;
}



@media (max-width: 900px) {
  .facebook-page {
    flex-direction: column;
    text-align: center;
  }

  .facebook-page .text {
    margin-bottom: 30px;
  }
}

@media (max-width: 460px) {
  .facebook-page h1 {
    font-size: 3.5rem;
  }

  .facebook-page p {
    font-size: 1.3rem;
  }

  form {
    padding: 15px;
  }

  .big-circle {
    bottom: 75%;
    transform: scale(0.9) translate(-40%, 30%);
    right: 50%;
  }

  .big-circle {
    display: none;
  }
}

</style>